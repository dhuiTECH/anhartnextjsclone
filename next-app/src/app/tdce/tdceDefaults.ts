import type { TdceInput } from '@/src/types/tdce';
import {
  DEFAULT_OPERATING_INPUTS,
  DEFAULT_AFFORDABILITY_MIX,
  DEFAULT_FINANCIAL_INPUTS,
  DEFAULT_PHYSICAL_INPUTS,
} from '@/src/types/tdce';

/**
 * Empty TDCE input for a plain sheet — no pre-filled data.
 * All user-editable fields are blank/zero; only minimal defaults needed for calculations.
 */
export function getEmptyTdceInput(): TdceInput {
  return {
    meta: {
      projectTitle: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      date: new Date(),
      partners: {
        developer: '',
        architect: '',
        generalContractor: '',
        lender: '',
        equityPartner: '',
        propertyManager: '',
      },
      zoning: '',
      tdceCategory: '',
      tdceClass: '',
      tdceStatus: '',
      ownerDuringDev: '',
      ownerAtOccupancy: '',
      operator: '',
      designPartner: '',
      builder: '',
      constructionType: '',
      primaryCostBenchmark: '',
      contactName: '',
      contactEmail: '',
      zoningNote: '',
      description: '',
      scenarioName: '',
      costAssumptionNote: '',
      estimatePrecisionClass: 'D',
    },
    physicals: {
      siteAreaSqFt: 0,
      grossFloorAreaSqFt: 0,
      grossBuildableSqFt: 0,
      targetFSR: undefined,
      efficiencyRatio: DEFAULT_PHYSICAL_INPUTS.efficiencyRatio ?? 0.85,
      totalUnits: 0,
      stories: undefined,
      parkingSpaces: undefined,
      siteDimensionsLengthFt: undefined,
      siteDimensionsWidthFt: undefined,
      unitMix: [],
    },
    financials: {
      landCost: 0,
      hardCostPerSqFt: 0,
      softCostPercent: DEFAULT_FINANCIAL_INPUTS.softCostPercent ?? 0.25,
      commercialSqFt: DEFAULT_FINANCIAL_INPUTS.commercialSqFt ?? 0,
      commercialRentPerSqFt: DEFAULT_FINANCIAL_INPUTS.commercialRentPerSqFt ?? 0,
      grants: [],
    },
    operations: {
      ...DEFAULT_OPERATING_INPUTS,
      residentialRentPerSqFt: 0,
      marketRentStudio: 0,
      marketRent1Bed: 0,
      marketRent2Bed: 0,
    },
    affordabilityMix: DEFAULT_AFFORDABILITY_MIX,
  };
}

/**
 * Default TDCE input matching the 1024 Main Class D example (for reference/demo).
 * Prefer getEmptyTdceInput() for a plain sheet.
 */
export function getDefaultTdceInput(): TdceInput {
  return {
    meta: {
      projectTitle: '1024 Main SRO Replacement High Rise',
      address: '1024 Main Street',
      city: 'Vancouver',
      province: 'BC',
      postalCode: '',
      date: new Date(),
      partners: {
        developer: 'Anhart Affordable Housing Corporation',
        architect: 'GWA Architecture',
        generalContractor: 'Anhart Construction CCC Ltd. (assumed)',
        propertyManager: 'Community Builders Benevolence Group',
      },
      zoning: 'FC-1',
      zoningNote: 'as-of-right with minimum 20% social housing',
      tdceCategory: 'Affordable Rental Housing',
      tdceClass: 'Class D (Concept & Feasibility)',
      tdceStatus: 'Feasibility',
      ownerDuringDev: 'Anhart Community Housing Society',
      ownerAtOccupancy: 'Anhart Affordable Homes Limited Partnership (LP)',
      operator: 'Community Builders Benevolence Group',
      designPartner: 'GWA Architecture',
      builder: 'Anhart Construction CCC Ltd. (assumed)',
      constructionType: 'High-rise concrete residential tower with ground-floor commercial',
      primaryCostBenchmark: 'Altus Group – 2025 Canadian Cost Guide (Vancouver CMA)',
    },
    physicals: {
      siteAreaSqFt: 5000,
      grossFloorAreaSqFt: 64688,
      // keep legacy field populated so older consumers continue to work
      grossBuildableSqFt: 64688,
      targetFSR: 11,
      efficiencyRatio: 0.85,
      totalUnits: 104,
      stories: 14,
      siteDimensionsLengthFt: 50,
      siteDimensionsWidthFt: 100,
      unitMix: [
        { bedrooms: 0, count: 26, sqFtPerUnit: 400 },
        { bedrooms: 1, count: 52, sqFtPerUnit: 525 },
        { bedrooms: 2, count: 26, sqFtPerUnit: 760 },
      ],
    },
    financials: {
      landCost: 6_000_000,
      hardCostPerSqFt: 490,
      softCostPercent: 0.25,
      commercialSqFt: 2214.9,
      commercialRentPerSqFt: 0,
      grants: [
        { name: 'BC Housing - capital / forgivable loan', amount: 7_000_000 },
        { name: 'City of Vancouver - capital & development cost waivers', amount: 1_800_000 },
        { name: 'FCM - Green Municipal Fund', amount: 1_250_000 },
      ],
    },
    operations: {
      ...DEFAULT_OPERATING_INPUTS,
      operatingExpenseRatio: 0.35,
      vacancyRate: 0.03,
      dscrTarget: 1.2,
      interestRate: 0.05,
      amortizationYears: 50,
      marketRentStudio: 2125,
      marketRent1Bed: 2490,
      marketRent2Bed: 3525,
    },
    affordabilityMix: DEFAULT_AFFORDABILITY_MIX,
  };
}
