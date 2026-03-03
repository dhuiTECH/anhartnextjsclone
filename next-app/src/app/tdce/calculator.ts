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
} from '@/src/types/tdce';

export const CMHC_MLI_INTEREST_RATE = 0.049; // 4.9% — mid-range insured affordable
export const CMHC_MLI_AMORT_YEARS = 40;      // 40yr max for insured affordable
export const CMHC_MLI_DSCR_TARGET = 1.1;     // 1.10x minimum for highest affordability score

// Conventional (non-insured) reference — shown as a note, not used by default
export const CONVENTIONAL_INTEREST_RATE = 0.07; // ~7% conventional construction/perm
export const CONVENTIONAL_AMORT_YEARS = 25;     // 25yr conventional amortization
export const CONVENTIONAL_DSCR_TARGET = 1.25;   // 1.25x typical conventional

// Legacy fallback (kept so nothing breaks if debtServiceConstant path is hit)
const DEFAULT_DEBT_SERVICE_CONSTANT = 0.05;

/**
 * Resolve Gross Floor Area (GFA) from physical inputs, preferring the new
 * grossFloorAreaSqFt field but falling back to legacy grossBuildableSqFt.
 */
function getGrossFloorAreaSqFtFromPhysicals(
  physicals: TdceInput['physicals']
): number {
  if (physicals.grossFloorAreaSqFt != null && physicals.grossFloorAreaSqFt > 0) {
    return physicals.grossFloorAreaSqFt;
  }
  return physicals.grossBuildableSqFt ?? 0;
}

/**
 * Calculate GSF and Total Units from Unit Mix
 * If unit mix is provided, calculates more precise values
 */
function calculateFromUnitMix(
  unitMix: TdceInput['physicals']['unitMix'],
  efficiencyRatio: number,
  commercialSqFt: number
): { totalUnits: number; netRentableArea: number; grossSqFt: number } {
  if (!unitMix || unitMix.length === 0) {
    return { totalUnits: 0, netRentableArea: 0, grossSqFt: 0 };
  }

  // Calculate total units and net rentable area from unit mix
  let totalUnits = 0;
  let totalNetRentable = 0;

  for (const unit of unitMix) {
    totalUnits += unit.count;
    totalNetRentable += unit.count * unit.sqFtPerUnit;
  }

  // Calculate GSF from net rentable: Net = (GSF - Commercial) × Efficiency
  // Therefore: GSF = (Net / Efficiency) + Commercial
  const grossSqFt = totalNetRentable / efficiencyRatio + commercialSqFt;
  return {
    totalUnits,
    netRentableArea: totalNetRentable,
    grossSqFt,
  };
}

/**
 * Max net rentable area allowed by geometry: (GFA - Commercial) × Efficiency.
 * Efficiency represents usable share after circulation (stairs, elevators, hallways).
 */
function maxNetRentableFromEfficiency(
  grossSqFt: number,
  commercialSqFt: number,
  efficiencyRatio: number
): number {
  const residentialGross = Math.max(0, grossSqFt - commercialSqFt);
  return residentialGross * efficiencyRatio;
}

/**
 * Calculate Residential Net Rentable Area
 * Formula: (GSF - Commercial SqFt) × Efficiency Ratio
 * OR: Sum of (Unit Count × Unit SqFt) from unit mix, CAPPED by the efficiency limit
 * so that geometry (stairs, elevators, hallways) is never exceeded.
 */
function calculateNetRentableArea(
  grossSqFt: number,
  commercialSqFt: number,
  efficiencyRatio: number,
  unitMix?: TdceInput['physicals']['unitMix']  // ← param can be removed too
): number {
  // GFA → net residential. Full stop. Unit mix is irrelevant here.
  return maxNetRentableFromEfficiency(grossSqFt, commercialSqFt, efficiencyRatio);
}

/** Effective site area: length×width when both set, else siteAreaSqFt */
export function getEffectiveSiteAreaSqFt(physicals: TdceInput['physicals']): number {
  const len = physicals.siteDimensionsLengthFt;
  const wid = physicals.siteDimensionsWidthFt;
  if (
    len != null &&
    wid != null &&
    len > 0 &&
    wid > 0
  ) {
    return len * wid;
  }
  return physicals.siteAreaSqFt ?? 0;
}

/** Max net residential = (GFA − commercial) × efficiency. Used for residential space limit display. */
export function getMaxNetResidentialSqFt(input: TdceInput): number {
  const { physicals, financials } = input;
  const site = getEffectiveSiteAreaSqFt(physicals);
  // Use same GFA resolution as resolveGsf: declared → FSR×site → stored
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

/**
 * Resolve GSF: declared GFA (when gfaSource is 'declared') → targetFSR × site → unit mix → grossBuildableSqFt
 */
function resolveGsf(input: TdceInput): number {
  const { physicals, financials } = input;
  const siteArea = getEffectiveSiteAreaSqFt(physicals);

  // 1. Declared GFA
  if (physicals.gfaSource === 'declared' && 
      (physicals.grossBuildableSqFt ?? 0) > 0) {
    return getGrossFloorAreaSqFtFromPhysicals(physicals);
  }

  // 2. FSR × site
  if (physicals.targetFSR != null && 
      physicals.targetFSR > 0 && 
      siteArea > 0) {
    return siteArea * physicals.targetFSR;
  }

  // 3. ← DELETE the unit mix branch entirely

  // 4. Fall back to stored GFA
  return getGrossFloorAreaSqFtFromPhysicals(physicals);
}
/**
 * Calculate Development Costs
 * - Hard Costs = GSF × Hard Cost per SqFt
 * - Hard Cost Contingency = Hard Costs × Hard Contingency %
 * - Soft Costs = Hard Costs × Soft Cost %
 * - Soft Cost Contingency = Soft Costs × Soft Contingency %
 * - Development Fees = (Hard + Soft) × Development Fee %
 * - Financing Costs = explicit financingCosts OR construction interest carry (when configured)
 * - Reserves = capitalized reserves
 * - TDC = Land + Hard + Hard Contingency + Soft + Soft Contingency + Dev Fees + Financing + Reserves
 */
function calculateDevelopmentCosts(input: TdceInput): DevelopmentCosts {
  const { financials } = input;
  const gsf = resolveGsf(input);

  const hardCosts = gsf * financials.hardCostPerSqFt;
  const softCosts = hardCosts * financials.softCostPercent;

  const hardContingencyPercent = financials.hardCostContingencyPercent ?? 0;
  const softContingencyPercent = financials.softCostContingencyPercent ?? 0;
  const developmentFeePercent = financials.developmentFeePercent ?? 0;

  const hardCostContingency = hardCosts * hardContingencyPercent;
  const softCostContingency = softCosts * softContingencyPercent;

  const baseForFees = hardCosts + softCosts + hardCostContingency + softCostContingency;
  const developmentFees = baseForFees * developmentFeePercent;

  const explicitFinancingCosts = financials.financingCosts ?? 0;
  const reserves = financials.capitalizedReserves ?? 0;

  // Construction interest carry (optional) – simple straight-line approximation
  const interestRate = financials.constructionInterestRate ?? 0;
  const constructionMonths = financials.constructionPeriodMonths ?? 0;
  const avgDrawFactor = financials.averageDrawFactor ?? 0;
  let constructionInterestCarry = 0;
  if (interestRate > 0 && constructionMonths > 0 && avgDrawFactor > 0) {
    const years = constructionMonths / 12;
    const costBaseForCarry = hardCosts + softCosts + hardCostContingency + softCostContingency + developmentFees;
    constructionInterestCarry = costBaseForCarry * interestRate * years * avgDrawFactor;
  }

  const financingCosts =
    explicitFinancingCosts > 0 ? explicitFinancingCosts : constructionInterestCarry;

  const totalDevelopmentCost =
    financials.landCost +
    hardCosts +
    hardCostContingency +
    softCosts +
    softCostContingency +
    developmentFees +
    financingCosts +
    reserves;

  return {
    landCost: financials.landCost,
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

/**
 * Calculate Cost Metrics
 * - Cost per Unit = TDC / Total Units
 * - Cost per SqFt = TDC / GSF
 */
function calculateCostMetrics(
  costs: DevelopmentCosts,
  resolvedGsf: number,
  resolvedTotalUnits: number,
  residentialNetRentableArea: number
): CostMetrics {
  return {
    costPerUnit:
      resolvedTotalUnits > 0
        ? costs.totalDevelopmentCost / resolvedTotalUnits
        : 0,
    costPerSqFt: resolvedGsf > 0 ? costs.totalDevelopmentCost / resolvedGsf : 0,
    hardCostPerGsf: resolvedGsf > 0 ? costs.hardCosts / resolvedGsf : 0,
    hardCostPerResidentialSqFt:
      residentialNetRentableArea > 0
        ? costs.hardCosts / residentialNetRentableArea
        : 0,
  };
}

/** Market rent per month by bedroom count (0=studio, 1=1-bed, 2=2-bed). */
function getMarketRentByBedrooms(
  operations: TdceInput['operations'],
  bedrooms: number
): number {
  if (bedrooms === 0) return operations.marketRentStudio ?? 0;
  if (bedrooms === 1) return operations.marketRent1Bed ?? 0;
  if (bedrooms === 2) return operations.marketRent2Bed ?? 0;
  if (bedrooms === 3) return operations.marketRent3Bed ?? 0;  // add
  if (bedrooms === 4) return operations.marketRent4Bed ?? 0;  // add
  // fallback: use largest defined rent rather than silently using 2-bed
  return operations.marketRent4Bed 
    ?? operations.marketRent3Bed 
    ?? operations.marketRent2Bed 
    ?? 0;
}

/**
 * Calculate Rental Income
 * - Gross Potential Rent = (Net Rentable Area × Res Rent) + (Comm SqFt × Comm Rent)
 * - Effective Gross Income = Gross Potential Rent × (1 - Vacancy Rate)
 * - When rentIncomeSource is market_by_unit: use market rent $/mo by unit type × count × 12.
 *   Rent is computed purely from unit counts × monthly rents — no area scaling applied,
 *   because the rent is already fully determined by the unit mix itself.
 * - When rentIncomeSource is cost_per_sqft (or default): use net rentable × rent per sq ft × 12.
 *   Area scaling IS applied here because rent is area-derived.
 */
function calculateRentalIncome(input: TdceInput): RentalIncome {
  const { physicals, financials, operations } = input;

  const residentialNetRentableArea = calculateNetRentableArea(
    getGrossFloorAreaSqFtFromPhysicals(physicals), 
    financials.commercialSqFt,
    physicals.efficiencyRatio,
    physicals.unitMix
  );

  const useMarketByUnit =
    operations.rentIncomeSource === 'market_by_unit' &&
    physicals.unitMix &&
    physicals.unitMix.length > 0;

  let residentialGrossRent = 0;

  if (useMarketByUnit) {
    // market_by_unit: rent is fully determined by unit count × monthly rent.
    // Do NOT scale by net rentable area — that would silently reduce income
    // whenever the resolved GFA differs from physicals.grossBuildableSqFt.
    for (const unit of physicals.unitMix!) {
      const marketCount = unit.count - (unit.affordableCount ?? 0);
      const affCount = unit.affordableCount ?? 0;
      const monthlyMarket = getMarketRentByBedrooms(operations, unit.bedrooms);
      const monthlyAffordable = unit.affordableRentPerUnit ?? monthlyMarket;
      residentialGrossRent +=
        (marketCount * monthlyMarket + affCount * monthlyAffordable) * 12;
    }
  } else if (physicals.unitMix && physicals.unitMix.length > 0) {
    // cost_per_sqft with unit mix: rent is area-derived, so scaling is valid
    // to cap income at the geometry-allowed net rentable area.
    let unitMixNetArea = 0;
    for (const unit of physicals.unitMix) {
      const marketCount = unit.count - (unit.affordableCount ?? 0);
      const affCount = unit.affordableCount ?? 0;
      const rentPerSqFt =
        unit.rentPerSqFt ?? operations.residentialRentPerSqFt;
      const marketPart = marketCount * unit.sqFtPerUnit * rentPerSqFt * 12;
      const affordablePart =
        affCount *
        (unit.affordableRentPerUnit != null
          ? unit.affordableRentPerUnit * 12
          : unit.sqFtPerUnit * rentPerSqFt * 12);
      residentialGrossRent += marketPart + affordablePart;
      unitMixNetArea += unit.count * unit.sqFtPerUnit;
    }
    // Cap to geometry: only scale down if unit mix exceeds net rentable area
    if (unitMixNetArea > 0 && residentialNetRentableArea < unitMixNetArea) {
      residentialGrossRent *= residentialNetRentableArea / unitMixNetArea;
    }
  } else {
    // Fallback: no unit mix, use net rentable area × rent per sq ft
    residentialGrossRent =
      residentialNetRentableArea * operations.residentialRentPerSqFt * 12;
  }

  const commercialGrossRent =
    financials.commercialSqFt * financials.commercialRentPerSqFt * 12;

  const grossPotentialRent = residentialGrossRent + commercialGrossRent;
  const effectiveGrossIncome =
    grossPotentialRent * (1 - operations.vacancyRate);

  return {
    residentialNetRentableArea,
    residentialGrossRent,
    commercialGrossRent,
    grossPotentialRent,
    effectiveGrossIncome,
  };
}

/**
 * Annual debt constant: payment per $1 of loan.
 * Formula: r(1+r)^n / ((1+r)^n - 1)
 * This is the standard mortgage constant used by lenders to size loans.
 *
 * Example:
 *   annualDebtConstant(0.049, 40) ≈ 0.05876  → $1M loan costs ~$58,760/yr
 *   annualDebtConstant(0.05,  50) ≈ 0.05478  → $1M loan costs ~$54,780/yr (unrealistic)
 *   annualDebtConstant(0.07,  25) ≈ 0.08581  → $1M loan costs ~$85,810/yr (conventional)
 */
function annualDebtConstant(annualRate: number, years: number): number {
  if (annualRate <= 0) return 1 / years;
  const r = annualRate;
  const n = years;
  return (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
/**
 * Calculate Operating Metrics
 *
 * DEBT SIZING METHODOLOGY (DSCR-based, standard Canadian lender approach):
 *
 *   Step 1: NOI = EGI × (1 - opExRatio)
 *   Step 2: Max Annual Debt Service = NOI ÷ DSCR target
 *   Step 3: Debt Constant = f(interest rate, amortization)
 *   Step 4: Max Loan (Mortgage) = Max Annual Debt Service ÷ Debt Constant
 *   Step 5: Funding Gap = TDC - Max Loan - Grants - Sponsor Equity
 *
 * The debt constant converts an annual payment into a loan amount.
 * A lower rate or longer amortization → lower constant → larger loan for same NOI.
 * We use CMHC MLI Select assumptions (4.9%, 40yr) as the planning default
 * because most affordable housing in Canada uses insured financing.
 *
 * IMPORTANT: The funding gap already assumes the DSCR-sized mortgage is in place.
 * It represents the equity/grant capital still needed AFTER the mortgage.
 */
function calculateOperatingMetrics(
  income: RentalIncome,
  costs: DevelopmentCosts,
  operations: TdceInput['operations'],
  financials: TdceInput['financials'],
  totalUnits: number
): OperatingMetrics {
  const operatingExpenses =
    income.effectiveGrossIncome * operations.operatingExpenseRatio;

  const replacementReservePerUnitPerYear =
    operations.replacementReservePerUnitPerYear ?? 0;
  const totalReplacementReserves =
    replacementReservePerUnitPerYear > 0 && totalUnits > 0
      ? replacementReservePerUnitPerYear * totalUnits
      : 0;

  const noi =
    income.effectiveGrossIncome - operatingExpenses - totalReplacementReserves;

  const dscrTarget = operations.dscrTarget ?? CMHC_MLI_DSCR_TARGET;

  // Use realistic CMHC MLI Select defaults if not explicitly set
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
    maxMortgage =
      annualDebtServiceAtTarget > 0 ? annualDebtServiceAtTarget / debtConst : 0;
    annualDebtService = annualDebtServiceAtTarget;
    dscr = dscrTarget;
  }

  const capRate =
    costs.totalDevelopmentCost > 0 ? noi / costs.totalDevelopmentCost : 0;

  const marketCapRate = operations.marketCapRate;
  const stabilizedValue =
    marketCapRate != null && marketCapRate > 0 ? noi / marketCapRate : 0;

  const totalGrants = (financials.grants ?? []).reduce(
    (sum, g) => sum + g.amount,
    0
  );
  const sponsorEquity = financials.sponsorEquity ?? 0;

  // Gap = TDC minus all identified sources (mortgage + grants + equity)
  // This is the remaining capital that must come from patient equity / subsidy
  const fundingGap =
    costs.totalDevelopmentCost - maxMortgage - totalGrants - sponsorEquity;

  const loanToCost =
    costs.totalDevelopmentCost > 0 && maxMortgage > 0
      ? maxMortgage / costs.totalDevelopmentCost
      : 0;

  const loanToValue =
    stabilizedValue > 0 && maxMortgage > 0 ? maxMortgage / stabilizedValue : 0;

  const annualOperatingSurplus = noi - annualDebtService;

  // Multi-year projection (simple compound growth approximation)
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
      projectedStabilizedValueAtEndOfPeriod =
        projectedNoiAtEndOfPeriod / marketCapRate;
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

/**
 * Calculate Area Metrics
 * - FSR = GSF / Site Area
 * - Average Unit Size = Net Rentable / Total Units
 */
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
    avgUnitSize:
      resolvedTotalUnits > 0 ? netRentableArea / resolvedTotalUnits : 0,
    netToGrossRatio: physicals.efficiencyRatio,
    resolvedGsf,
    resolvedTotalUnits,
    residentialFSR: siteArea > 0 ? residentialGsf / siteArea : 0,
    commercialFSR: siteArea > 0 ? commercialSqFt / siteArea : 0,
  };
}

/**
 * Calculate Unit Mix Breakdown
 * Creates detailed breakdown of unit mix for display
 */
function calculateUnitMixBreakdown(
  unitMix: TdceInput['physicals']['unitMix'],
  operations: TdceInput['operations']
): import('@/src/types/tdce').UnitMixBreakdown[] | undefined {
  if (!unitMix || unitMix.length === 0) {
    return undefined;
  }

  const totalUnits = unitMix.reduce((sum, unit) => sum + unit.count, 0);

  const useMarketByUnit = operations.rentIncomeSource === 'market_by_unit';

  return unitMix.map((unit) => {
    const totalSqFt = unit.count * unit.sqFtPerUnit;
    const annualRent = useMarketByUnit
      ? unit.count * getMarketRentByBedrooms(operations, unit.bedrooms) * 12
      : totalSqFt * (unit.rentPerSqFt ?? operations.residentialRentPerSqFt) * 12;

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

/**
 * Resolve total units: from unit mix or physicals.totalUnits
 */
function resolveTotalUnits(input: TdceInput): number {
  if (input.physicals.unitMix && input.physicals.unitMix.length > 0) {
    return input.physicals.unitMix.reduce((s, u) => s + u.count, 0);
  }
  return input.physicals.totalUnits;
}

/**
 * Main calculation function
 * Takes TdceInput and returns complete TdceOutput with all calculated metrics
 */
export function calculateFinancials(input: TdceInput): TdceOutput {
  const resolvedGsf = resolveGsf(input);
  const resolvedTotalUnits = resolveTotalUnits(input);
  // Sync resolved GSF/units back into physicals for cost/income calcs that read them
  const physicalsForCalc = {
    ...input.physicals,
    grossFloorAreaSqFt: resolvedGsf,
    // keep legacy field in sync for backwards compatibility
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
  const unitMix = calculateUnitMixBreakdown(
    input.physicals.unitMix,
    input.operations
  );

  return {
    costs,
    costMetrics,
    income,
    operations,
    areas,
    unitMix,
  };
}

/**
 * Generate complete TDCE Document with inputs, outputs, and metadata
 */
export function generateTdceDocument(input: TdceInput): TdceDocument {
  const output = calculateFinancials(input);

  return {
    input,
    output,
    generatedAt: new Date(),
    version: '1.0.0',
  };
}

// ============================================================================
// BUILT-FORM YIELD (Site + FSR + Design Mix → GFA, Net Res, Unit Counts)
// ============================================================================

export interface BuiltFormYieldInput {
  siteAreaSqFt: number;
  totalFsr: number;
  commercialFsr: number;
  efficiencyFactor: number;
  mixRatioStudio: number;
  mixRatio1Bed: number;
  mixRatio2Bed: number;
  sizeStudio: number;
  size1Bed: number;
  size2Bed: number;
}

export interface BuiltFormYieldResult {
  siteAreaSqFt: number;
  grossFloorAreaSqFt: number;
  commercialAreaSqFt: number;
  residentialGfaSqFt: number;
  residentialFsr: number;
  netResidentialAreaSqFt: number;
  avgUnitSizeSqFt: number;
  totalUnits: number;
  studioCount: number;
  oneBedCount: number;
  twoBedCount: number;
  unitMix: UnitMixItem[];
}

function getSiteStats(
  siteAreaSqFt: number,
  totalFsr: number,
  commercialFsr: number
): {
  grossFloorAreaSqFt: number;
  commercialAreaSqFt: number;
  residentialGfaSqFt: number;
  residentialFsr: number;
} {
  const grossFloorAreaSqFt = siteAreaSqFt * totalFsr;
  const commercialAreaSqFt = siteAreaSqFt * commercialFsr;
  const residentialGfaSqFt = grossFloorAreaSqFt - commercialAreaSqFt;
  const residentialFsr = totalFsr - commercialFsr;
  return {
    grossFloorAreaSqFt,
    commercialAreaSqFt,
    residentialGfaSqFt,
    residentialFsr,
  };
}

function getNetResidentialArea(
  residentialGfaSqFt: number,
  efficiencyFactor: number
): number {
  return residentialGfaSqFt * efficiencyFactor;
}

function getUnitStats(
  netResAreaSqFt: number,
  mix: { studio: number; oneBed: number; twoBed: number },
  sizes: { studio: number; oneBed: number; twoBed: number }
): {
  avgUnitSizeSqFt: number;
  totalUnits: number;
  studioCount: number;
  oneBedCount: number;
  twoBedCount: number;
} {
  const avgUnitSizeSqFt =
    mix.studio * sizes.studio + mix.oneBed * sizes.oneBed + mix.twoBed * sizes.twoBed;
  if (avgUnitSizeSqFt <= 0) {
    return { avgUnitSizeSqFt: 0, totalUnits: 0, studioCount: 0, oneBedCount: 0, twoBedCount: 0 };
  }
  const totalUnits = Math.floor(netResAreaSqFt / avgUnitSizeSqFt);
  const studioCount = Math.round(totalUnits * mix.studio);
  const oneBedCount = Math.round(totalUnits * mix.oneBed);
  const twoBedCount = Math.round(totalUnits * mix.twoBed);
  return {
    avgUnitSizeSqFt,
    totalUnits,
    studioCount,
    oneBedCount,
    twoBedCount,
  };
}

/**
 * Compute full built-form yield from site + FSR + efficiency + design mix.
 * Use this to auto-fill GFA, commercial area, net residential area, total units, and unit mix.
 */
export function computeBuiltFormYield(input: BuiltFormYieldInput): BuiltFormYieldResult | null {
  const {
    siteAreaSqFt,
    totalFsr,
    commercialFsr,
    efficiencyFactor,
    mixRatioStudio,
    mixRatio1Bed,
    mixRatio2Bed,
    sizeStudio,
    size1Bed,
    size2Bed,
  } = input;

  if (
    siteAreaSqFt <= 0 ||
    totalFsr <= 0 ||
    efficiencyFactor <= 0 ||
    efficiencyFactor > 1
  ) {
    return null;
  }

  const mixSum = mixRatioStudio + mixRatio1Bed + mixRatio2Bed;
  if (Math.abs(mixSum - 1) > 0.01) return null;

  const site = getSiteStats(siteAreaSqFt, totalFsr, commercialFsr);
  const netRes = getNetResidentialArea(
    site.residentialGfaSqFt,
    efficiencyFactor
  );
  const mix = { studio: mixRatioStudio, oneBed: mixRatio1Bed, twoBed: mixRatio2Bed };
  const sizes = { studio: sizeStudio, oneBed: size1Bed, twoBed: size2Bed };
  const units = getUnitStats(netRes, mix, sizes);

  const unitMix: UnitMixItem[] = [];
  if (units.studioCount > 0) unitMix.push({ bedrooms: 0, count: units.studioCount, sqFtPerUnit: sizeStudio });
  if (units.oneBedCount > 0) unitMix.push({ bedrooms: 1, count: units.oneBedCount, sqFtPerUnit: size1Bed });
  if (units.twoBedCount > 0) unitMix.push({ bedrooms: 2, count: units.twoBedCount, sqFtPerUnit: size2Bed });

  return {
    siteAreaSqFt,
    grossFloorAreaSqFt: site.grossFloorAreaSqFt,
    commercialAreaSqFt: site.commercialAreaSqFt,
    residentialGfaSqFt: site.residentialGfaSqFt,
    residentialFsr: site.residentialFsr,
    netResidentialAreaSqFt: netRes,
    avgUnitSizeSqFt: units.avgUnitSizeSqFt,
    totalUnits: units.totalUnits,
    studioCount: units.studioCount,
    oneBedCount: units.oneBedCount,
    twoBedCount: units.twoBedCount,
    unitMix,
  };
}

// ============================================================================
// UTILITY FORMATTERS
// ============================================================================

/**
 * Format number as currency (CAD)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format number as currency with cents (CAD)
 */
export function formatCurrencyPrecise(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number with commas (Canadian format)
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-CA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Truncate to 1 decimal place (no rounding). */
export function truncateTo1Decimal(value: number): number {
  return Math.floor(value * 10) / 10;
}

/**
 * Format as percentage
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format ratio (e.g., DSCR)
 */
export function formatRatio(value: number): string {
  return value.toFixed(2) + 'x';
}
