/**
 * Anhart TDCE Financial Calculator
 * Performs "Pro Forma" calculations for Class D estimates (±25% accuracy)
 */

import type {
  TdceInput,
  TdceOutput,
  DevelopmentCosts,
  CostMetrics,
  RentalIncome,
  OperatingMetrics,
  AreaMetrics,
  TdceDocument,
  UnitMixItem,
  UnitMixBreakdown,
} from '@/types/tdce';

export const CMHC_MLI_INTEREST_RATE = 0.049;
export const CMHC_MLI_AMORT_YEARS = 40;
export const CMHC_MLI_DSCR_TARGET = 1.1;

export const CONVENTIONAL_INTEREST_RATE = 0.07;
export const CONVENTIONAL_AMORT_YEARS = 25;
export const CONVENTIONAL_DSCR_TARGET = 1.25;

function getGrossFloorAreaSqFtFromPhysicals(physicals: TdceInput['physicals']): number {
  if (physicals.grossFloorAreaSqFt != null && physicals.grossFloorAreaSqFt > 0) {
    return physicals.grossFloorAreaSqFt;
  }
  return physicals.grossBuildableSqFt ?? 0;
}

function maxNetRentableFromEfficiency(
  grossSqFt: number,
  commercialSqFt: number,
  efficiencyRatio: number
): number {
  const residentialGross = Math.max(0, grossSqFt - commercialSqFt);
  return residentialGross * (efficiencyRatio ?? 0.85);
}

function calculateNetRentableArea(
  grossSqFt: number,
  commercialSqFt: number,
  efficiencyRatio: number | undefined
): number {
  return maxNetRentableFromEfficiency(grossSqFt, commercialSqFt ?? 0, efficiencyRatio ?? 0.85);
}

export function getEffectiveSiteAreaSqFt(physicals: TdceInput['physicals']): number {
  const len = physicals.siteDimensionsLengthFt;
  const wid = physicals.siteDimensionsWidthFt;
  if (len != null && wid != null && len > 0 && wid > 0) {
    return len * wid;
  }
  return physicals.siteAreaSqFt ?? 0;
}

export function getMaxNetResidentialSqFt(input: TdceInput): number {
  const { physicals, financials } = input;
  const site = getEffectiveSiteAreaSqFt(physicals);
  let gfa: number;
  if (physicals.gfaSource === 'declared' && (physicals.grossBuildableSqFt ?? physicals.grossFloorAreaSqFt ?? 0) > 0) {
    gfa = getGrossFloorAreaSqFtFromPhysicals(physicals);
  } else if (physicals.targetFSR != null && physicals.targetFSR > 0 && site > 0) {
    gfa = site * physicals.targetFSR;
  } else {
    gfa = getGrossFloorAreaSqFtFromPhysicals(physicals);
  }
  const commercial = financials.commercialSqFt ?? 0;
  const efficiency = physicals.efficiencyRatio ?? 0.85;
  return Math.max(0, (gfa - commercial) * efficiency);
}

function resolveGsf(input: TdceInput): number {
  const { physicals } = input;
  const siteArea = getEffectiveSiteAreaSqFt(physicals);

  if (physicals.gfaSource === 'declared' && (physicals.grossBuildableSqFt ?? 0) > 0) {
    return getGrossFloorAreaSqFtFromPhysicals(physicals);
  }
  if (physicals.targetFSR != null && physicals.targetFSR > 0 && siteArea > 0) {
    return siteArea * physicals.targetFSR;
  }
  return getGrossFloorAreaSqFtFromPhysicals(physicals);
}

function calculateDevelopmentCosts(input: TdceInput): DevelopmentCosts {
  const { financials } = input;
  const gsf = resolveGsf(input);

  const hardCosts = gsf * (financials.hardCostPerSqFt ?? 0);
  const softCosts = hardCosts * (financials.softCostPercent ?? 0.25);

  const hardContingencyPercent = financials.hardCostContingencyPercent ?? 0;
  const softContingencyPercent = financials.softCostContingencyPercent ?? 0;
  const developmentFeePercent = financials.developmentFeePercent ?? 0;

  const hardCostContingency = hardCosts * hardContingencyPercent;
  const softCostContingency = softCosts * softContingencyPercent;

  const baseForFees = hardCosts + softCosts + hardCostContingency + softCostContingency;
  const developmentFees = baseForFees * developmentFeePercent;

  const explicitFinancingCosts = financials.financingCosts ?? 0;
  const reserves = financials.capitalizedReserves ?? 0;

  const interestRate = financials.constructionInterestRate ?? 0;
  const constructionMonths = financials.constructionPeriodMonths ?? 0;
  const avgDrawFactor = financials.averageDrawFactor ?? 0;
  let constructionInterestCarry = 0;
  if (interestRate > 0 && constructionMonths > 0 && avgDrawFactor > 0) {
    const years = constructionMonths / 12;
    const costBaseForCarry = hardCosts + softCosts + hardCostContingency + softCostContingency + developmentFees;
    constructionInterestCarry = costBaseForCarry * interestRate * years * avgDrawFactor;
  }

  const financingCosts = explicitFinancingCosts > 0 ? explicitFinancingCosts : constructionInterestCarry;

  const totalDevelopmentCost =
    (financials.landCost ?? 0) +
    hardCosts +
    hardCostContingency +
    softCosts +
    softCostContingency +
    developmentFees +
    financingCosts +
    reserves;

  return {
    landCost: financials.landCost ?? 0,
    hardCosts,
    hardCostContingency,
    softCosts,
    softCostContingency,
    developmentFees,
    financingCosts,
    reserves,
    totalDevelopmentCost,
  };
}

function calculateCostMetrics(
  costs: DevelopmentCosts,
  resolvedGsf: number,
  resolvedTotalUnits: number,
  residentialNetRentableArea: number
): CostMetrics {
  return {
    costPerUnit: resolvedTotalUnits > 0 ? costs.totalDevelopmentCost / resolvedTotalUnits : 0,
    costPerSqFt: resolvedGsf > 0 ? costs.totalDevelopmentCost / resolvedGsf : 0,
    hardCostPerGsf: resolvedGsf > 0 ? costs.hardCosts / resolvedGsf : 0,
    hardCostPerResidentialSqFt: residentialNetRentableArea > 0 ? costs.hardCosts / residentialNetRentableArea : 0,
  };
}

function getMarketRentByBedrooms(operations: TdceInput['operations'], bedrooms: number): number {
  if (bedrooms === 0) return operations.marketRentStudio ?? 0;
  if (bedrooms === 1) return operations.marketRent1Bed ?? 0;
  if (bedrooms === 2) return operations.marketRent2Bed ?? 0;
  if (bedrooms === 3) return operations.marketRent3Bed ?? 0;
  if (bedrooms === 4) return operations.marketRent4Bed ?? 0;
  return operations.marketRent4Bed ?? operations.marketRent3Bed ?? operations.marketRent2Bed ?? 0;
}

function calculateRentalIncome(input: TdceInput): RentalIncome {
  const { physicals, financials, operations } = input;

  const residentialNetRentableArea = calculateNetRentableArea(
    getGrossFloorAreaSqFtFromPhysicals(physicals),
    financials.commercialSqFt ?? 0,
    physicals.efficiencyRatio
  );

  const useMarketByUnit =
    operations.rentIncomeSource === 'market_by_unit' &&
    physicals.unitMix &&
    physicals.unitMix.length > 0;

  let residentialGrossRent = 0;

  if (useMarketByUnit && physicals.unitMix) {
    for (const unit of physicals.unitMix) {
      const marketCount = unit.count - (unit.affordableCount ?? 0);
      const affCount = unit.affordableCount ?? 0;
      const monthlyMarket = getMarketRentByBedrooms(operations, unit.bedrooms);
      const monthlyAffordable = unit.affordableRentPerUnit ?? monthlyMarket;
      residentialGrossRent += (marketCount * monthlyMarket + affCount * monthlyAffordable) * 12;
    }
  } else if (physicals.unitMix && physicals.unitMix.length > 0) {
    let unitMixNetArea = 0;
    for (const unit of physicals.unitMix) {
      const marketCount = unit.count - (unit.affordableCount ?? 0);
      const affCount = unit.affordableCount ?? 0;
      const rentPerSqFt = unit.rentPerSqFt ?? operations.residentialRentPerSqFt ?? 0;
      const sqFt = unit.sqFtPerUnit ?? 0;
      const marketPart = marketCount * sqFt * rentPerSqFt * 12;
      const affordablePart =
        affCount *
        (unit.affordableRentPerUnit != null ? unit.affordableRentPerUnit * 12 : sqFt * rentPerSqFt * 12);
      residentialGrossRent += marketPart + affordablePart;
      unitMixNetArea += unit.count * sqFt;
    }
    if (unitMixNetArea > 0 && residentialNetRentableArea < unitMixNetArea) {
      residentialGrossRent *= residentialNetRentableArea / unitMixNetArea;
    }
  } else {
    residentialGrossRent =
      residentialNetRentableArea * (operations.residentialRentPerSqFt ?? 0) * 12;
  }

  const commercialGrossRent = (financials.commercialSqFt ?? 0) * (financials.commercialRentPerSqFt ?? 0) * 12;
  const grossPotentialRent = residentialGrossRent + commercialGrossRent;
  const effectiveGrossIncome = grossPotentialRent * (1 - (operations.vacancyRate ?? 0.03));

  return {
    residentialNetRentableArea,
    residentialGrossRent,
    commercialGrossRent,
    grossPotentialRent,
    effectiveGrossIncome,
  };
}

function annualDebtConstant(annualRate: number, years: number): number {
  if (annualRate <= 0) return 1 / years;
  const r = annualRate;
  const n = years;
  return (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calculateOperatingMetrics(
  income: RentalIncome,
  costs: DevelopmentCosts,
  operations: TdceInput['operations'],
  financials: TdceInput['financials'],
  totalUnits: number
): OperatingMetrics {
  const operatingExpenses = income.effectiveGrossIncome * (operations.operatingExpenseRatio ?? 0.35);
  const replacementReservePerUnitPerYear = operations.replacementReservePerUnitPerYear ?? 0;
  const totalReplacementReserves =
    replacementReservePerUnitPerYear > 0 && totalUnits > 0
      ? replacementReservePerUnitPerYear * totalUnits
      : 0;

  const noi = income.effectiveGrossIncome - operatingExpenses - totalReplacementReserves;
  const dscrTarget = operations.dscrTarget ?? CMHC_MLI_DSCR_TARGET;
  const interestRate = operations.interestRate ?? CMHC_MLI_INTEREST_RATE;
  const amortYears = operations.amortizationYears ?? CMHC_MLI_AMORT_YEARS;

  let debtConst = annualDebtConstant(interestRate, amortYears);
  const overrideDebtConst = operations.debtServiceConstant;
  if (overrideDebtConst != null && overrideDebtConst > 0) {
    debtConst = overrideDebtConst;
  }

  const sizingMode = operations.mortgageSizingMode ?? 'dscr';

  let maxMortgage = 0;
  let annualDebtService = 0;
  let dscr = 0;

  if (sizingMode === 'fixed' && (operations.fixedMortgageAmount ?? 0) > 0) {
    maxMortgage = operations.fixedMortgageAmount ?? 0;
    annualDebtService = maxMortgage * debtConst;
    dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  } else {
    const annualDebtServiceAtTarget = noi / dscrTarget;
    maxMortgage = annualDebtServiceAtTarget > 0 ? annualDebtServiceAtTarget / debtConst : 0;
    annualDebtService = annualDebtServiceAtTarget;
    dscr = dscrTarget;
  }

  const capRate = costs.totalDevelopmentCost > 0 ? noi / costs.totalDevelopmentCost : 0;
  const marketCapRate = operations.marketCapRate;
  const stabilizedValue = marketCapRate != null && marketCapRate > 0 ? noi / marketCapRate : 0;

  const totalGrants = (financials.grants ?? []).reduce((sum, g) => sum + (g.amount ?? 0), 0);
  const sponsorEquity = financials.sponsorEquity ?? 0;
  const fundingGap = costs.totalDevelopmentCost - maxMortgage - totalGrants - sponsorEquity;

  const loanToCost =
    costs.totalDevelopmentCost > 0 && maxMortgage > 0 ? maxMortgage / costs.totalDevelopmentCost : 0;
  const loanToValue = stabilizedValue > 0 && maxMortgage > 0 ? maxMortgage / stabilizedValue : 0;
  const annualOperatingSurplus = noi - annualDebtService;

  let projectedNoiAtEndOfPeriod: number | undefined;
  let projectedStabilizedValueAtEndOfPeriod: number | undefined;
  const rentGrowthRate = operations.rentGrowthRate ?? 0;
  const expenseGrowthRate = operations.expenseGrowthRate ?? 0;
  const analysisYears = operations.analysisPeriodYears ?? 0;

  if (analysisYears > 0 && (rentGrowthRate !== 0 || expenseGrowthRate !== 0)) {
    const egi0 = income.effectiveGrossIncome;
    const opex0 = operatingExpenses + totalReplacementReserves;
    const egiN = egi0 * Math.pow(1 + rentGrowthRate, analysisYears);
    const opexN = opex0 * Math.pow(1 + expenseGrowthRate, analysisYears);
    projectedNoiAtEndOfPeriod = egiN - opexN;
    if (marketCapRate != null && marketCapRate > 0) {
      projectedStabilizedValueAtEndOfPeriod = projectedNoiAtEndOfPeriod / marketCapRate;
    }
  }

  return {
    operatingExpenses,
    replacementReserves: totalReplacementReserves,
    noi,
    annualDebtService,
    dscr,
    capRate,
    maxMortgage,
    totalGrants,
    fundingGap,
    loanToCost,
    loanToValue,
    annualOperatingSurplus,
    stabilizedValue,
    projectedNoiAtEndOfPeriod,
    projectedStabilizedValueAtEndOfPeriod,
    debtAssumptions: {
      interestRate,
      amortYears,
      dscrTarget,
      debtConst,
      program: 'CMHC MLI Select (insured affordable)',
      mortgageSizingMode: sizingMode,
    },
  };
}

function calculateAreaMetrics(
  physicals: TdceInput['physicals'],
  netRentableArea: number,
  financials: TdceInput['financials'],
  resolvedGsf: number,
  resolvedTotalUnits: number
): AreaMetrics {
  const siteArea = getEffectiveSiteAreaSqFt(physicals);
  const commercialSqFt = financials.commercialSqFt ?? 0;
  const residentialGsf = Math.max(0, resolvedGsf - commercialSqFt);
  return {
    floorSpaceRatio: siteArea > 0 ? resolvedGsf / siteArea : 0,
    avgUnitSize: resolvedTotalUnits > 0 ? netRentableArea / resolvedTotalUnits : 0,
    netToGrossRatio: physicals.efficiencyRatio,
    resolvedGsf,
    resolvedTotalUnits,
    residentialFSR: siteArea > 0 ? residentialGsf / siteArea : 0,
    commercialFSR: siteArea > 0 ? commercialSqFt / siteArea : 0,
  };
}

function calculateUnitMixBreakdown(
  unitMix: TdceInput['physicals']['unitMix'],
  operations: TdceInput['operations']
): UnitMixBreakdown[] | undefined {
  if (!unitMix || unitMix.length === 0) return undefined;

  const totalUnits = unitMix.reduce((sum, unit) => sum + unit.count, 0);
  const useMarketByUnit = operations.rentIncomeSource === 'market_by_unit';

  return unitMix.map((unit) => {
    const totalSqFt = unit.count * (unit.sqFtPerUnit ?? 0);
    const annualRent = useMarketByUnit
      ? unit.count * getMarketRentByBedrooms(operations, unit.bedrooms) * 12
      : totalSqFt * (unit.rentPerSqFt ?? operations.residentialRentPerSqFt ?? 0) * 12;

    return {
      bedrooms: unit.bedrooms,
      count: unit.count,
      sqFtPerUnit: unit.sqFtPerUnit,
      totalSqFt,
      percentOfTotal: totalUnits > 0 ? unit.count / totalUnits : 0,
      annualRent,
    };
  });
}

function resolveTotalUnits(input: TdceInput): number {
  if (input.physicals.unitMix && input.physicals.unitMix.length > 0) {
    return input.physicals.unitMix.reduce((s, u) => s + u.count, 0);
  }
  return input.physicals.totalUnits ?? 0;
}

export function calculateFinancials(input: TdceInput): TdceOutput {
  const resolvedGsf = resolveGsf(input);
  const resolvedTotalUnits = resolveTotalUnits(input);
  const physicalsForCalc = {
    ...input.physicals,
    grossFloorAreaSqFt: resolvedGsf,
    grossBuildableSqFt: resolvedGsf,
    totalUnits: resolvedTotalUnits,
  };
  const inputWithResolved = { ...input, physicals: physicalsForCalc };

  const income = calculateRentalIncome(inputWithResolved);
  const costs = calculateDevelopmentCosts(inputWithResolved);
  const costMetrics = calculateCostMetrics(
    costs,
    resolvedGsf,
    resolvedTotalUnits,
    income.residentialNetRentableArea
  );
  const operations = calculateOperatingMetrics(
    income,
    costs,
    input.operations,
    input.financials,
    resolvedTotalUnits
  );
  const areas = calculateAreaMetrics(
    input.physicals,
    income.residentialNetRentableArea,
    input.financials,
    resolvedGsf,
    resolvedTotalUnits
  );
  const unitMix = calculateUnitMixBreakdown(input.physicals.unitMix, input.operations);

  return {
    costs,
    costMetrics,
    income,
    operations,
    areas,
    unitMix,
  };
}

export function generateTdceDocument(input: TdceInput): TdceDocument {
  const output = calculateFinancials(input);
  return {
    input,
    output,
    generatedAt: new Date(),
    version: '1.0.0',
  };
}

// Re-export formatters for components
export {
  formatCurrency,
  formatCurrencyPrecise,
  formatNumber,
  formatPercent,
  formatRatio,
  truncateTo1Decimal,
  truncateTo4Decimals,
} from '@/lib/tdce-formatters';
