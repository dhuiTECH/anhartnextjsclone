/**
 * TDCE (Total Development Cost Estimate) type definitions
 */

export interface UnitMixItem {
  bedrooms: number;
  count: number;
  sqFtPerUnit?: number;
  affordableCount?: number;
  affordableRentPerUnit?: number;
  rentPerSqFt?: number;
}

export type GrantStatus = 'target' | 'applied' | 'confirmed';

export interface GrantItem {
  name?: string;
  amount: number;
  status?: GrantStatus;
}

export interface AffordabilityMix {
  shelterPercent: number;
  hilsPercent: number;
  marketPercent: number;
}

export interface TdceMetaPartners {
  developer?: string;
  architect?: string;
  generalContractor?: string;
  lender?: string;
  equityPartner?: string;
  propertyManager?: string;
}

export interface TdceMeta {
  projectTitle?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  date?: Date;
  partners?: TdceMetaPartners;
  zoning?: string;
  zoningNote?: string;
  tdceCategory?: string;
  tdceClass?: string;
  tdceStatus?: string;
  ownerDuringDev?: string;
  ownerAtOccupancy?: string;
  operator?: string;
  designPartner?: string;
  builder?: string;
  constructionType?: string;
  primaryCostBenchmark?: string;
  contactName?: string;
  contactEmail?: string;
  description?: string;
  scenarioName?: string;
  costAssumptionNote?: string;
  estimatePrecisionClass?: 'C' | 'D';
}

export type GfaSource = 'from_fsr' | 'declared';
export type CommercialInputMode = 'sqft' | 'fsr';
export type RentIncomeSource = 'cost_per_sqft' | 'market_by_unit';

export interface TdcePhysicals {
  siteAreaSqFt?: number;
  grossFloorAreaSqFt?: number;
  grossBuildableSqFt?: number;
  targetFSR?: number;
  gfaSource?: GfaSource;
  efficiencyRatio?: number;
  totalUnits?: number;
  stories?: number;
  parkingSpaces?: number;
  siteDimensionsLengthFt?: number;
  siteDimensionsWidthFt?: number;
  unitMix?: UnitMixItem[];
  commercialInputMode?: CommercialInputMode;
  commercialFsr?: number;
  sizeStudio?: number;
  size1Bed?: number;
  size2Bed?: number;
}

export interface TdceFinancials {
  landCost?: number;
  hardCostPerSqFt?: number;
  softCostPercent?: number;
  commercialSqFt?: number;
  commercialRentPerSqFt?: number;
  grants?: GrantItem[];
  sponsorEquity?: number;
  constructionBenchmarkId?: string;
  escalationUpliftPercent?: number;
  complexityUpliftPercent?: number;
  buildingPermitIssued?: boolean;
  hardCostContingencyPercent?: number;
  softCostContingencyPercent?: number;
  developmentFeePercent?: number;
  financingCosts?: number;
  capitalizedReserves?: number;
  constructionInterestRate?: number;
  constructionPeriodMonths?: number;
  averageDrawFactor?: number;
}

export interface TdceOperations {
  residentialRentPerSqFt?: number;
  marketRentStudio?: number;
  marketRent1Bed?: number;
  marketRent2Bed?: number;
  marketRent3Bed?: number;
  marketRent4Bed?: number;
  vacancyRate?: number;
  operatingExpenseRatio?: number;
  debtServiceConstant?: number;
  interestRate?: number;
  amortizationYears?: number;
  dscrTarget?: number;
  rentIncomeSource?: RentIncomeSource;
  replacementReservePerUnitPerYear?: number;
  marketCapRate?: number;
  rentGrowthRate?: number;
  expenseGrowthRate?: number;
  analysisPeriodYears?: number;
  targetInvestorReturnPercent?: number;
  mortgageSizingMode?: 'dscr' | 'fixed';
  fixedMortgageAmount?: number;
}

export interface TdceInput {
  meta: TdceMeta;
  physicals: TdcePhysicals;
  financials: TdceFinancials;
  operations: TdceOperations;
  affordabilityMix?: AffordabilityMix;
}

export interface DevelopmentCosts {
  landCost: number;
  hardCosts: number;
  hardCostContingency: number;
  softCosts: number;
  softCostContingency: number;
  developmentFees: number;
  financingCosts: number;
  reserves: number;
  totalDevelopmentCost: number;
}

export interface CostMetrics {
  costPerUnit: number;
  costPerSqFt: number;
  hardCostPerGsf: number;
  hardCostPerResidentialSqFt: number;
}

export interface RentalIncome {
  residentialNetRentableArea: number;
  residentialGrossRent: number;
  commercialGrossRent: number;
  grossPotentialRent: number;
  effectiveGrossIncome: number;
}

export interface DebtAssumptions {
  interestRate: number;
  amortYears: number;
  dscrTarget: number;
  debtConst: number;
  program?: string;
  mortgageSizingMode?: string;
}

export interface OperatingMetrics {
  operatingExpenses: number;
  replacementReserves: number;
  noi: number;
  annualDebtService: number;
  dscr: number;
  capRate: number;
  maxMortgage?: number;
  totalGrants?: number;
  fundingGap?: number;
  loanToCost?: number;
  loanToValue?: number;
  annualOperatingSurplus?: number;
  stabilizedValue?: number;
  projectedNoiAtEndOfPeriod?: number;
  projectedStabilizedValueAtEndOfPeriod?: number;
  debtAssumptions?: DebtAssumptions;
}

export interface AreaMetrics {
  floorSpaceRatio: number;
  avgUnitSize: number;
  netToGrossRatio?: number;
  resolvedGsf?: number;
  resolvedTotalUnits?: number;
  residentialFSR?: number;
  commercialFSR?: number;
}

export interface UnitMixBreakdown {
  bedrooms: number;
  count: number;
  sqFtPerUnit?: number;
  totalSqFt: number;
  percentOfTotal: number;
  annualRent: number;
}

export interface TdceOutput {
  costs: DevelopmentCosts;
  costMetrics: CostMetrics;
  income: RentalIncome;
  operations: OperatingMetrics;
  areas: AreaMetrics;
  unitMix?: UnitMixBreakdown[];
}

export interface TdceDocument {
  input: TdceInput;
  output: TdceOutput;
  generatedAt: Date;
  version: string;
}

// Default values used across the TDCE form and calculator
export const DEFAULT_PHYSICAL_INPUTS: Partial<TdcePhysicals> = {
  efficiencyRatio: 0.85,
};

export const DEFAULT_FINANCIAL_INPUTS: Partial<TdceFinancials> = {
  softCostPercent: 0.25,
  commercialSqFt: 0,
  commercialRentPerSqFt: 0,
};

export const DEFAULT_OPERATING_INPUTS: Partial<TdceOperations> = {
  vacancyRate: 0.03,
  operatingExpenseRatio: 0.35,
  debtServiceConstant: 0.05,
  interestRate: 0.049,
  amortizationYears: 40,
  dscrTarget: 1.1,
};

export const DEFAULT_AFFORDABILITY_MIX: AffordabilityMix = {
  shelterPercent: 20,
  hilsPercent: 10,
  marketPercent: 70,
};
