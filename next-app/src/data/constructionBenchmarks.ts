/**
 * Construction cost benchmark ranges ($/sq ft GFA) by region and building type.
 * When "city dense uplift" is applied: add 10% to the upper end of the selected range.
 */

export interface BenchmarkRange {
  label: string;
  low: number;
  high: number;
  note?: string;
}

/** Building type keys used in the region matrix */
export const BUILDING_TYPE_KEYS = [
  'single_family', 
  'row_townhouse', 
  'wood_frame', 
  'mid_rise_concrete',
  'condo_apart'
] as const;
export type BuildingTypeKey = (typeof BUILDING_TYPE_KEYS)[number];

/** Human-readable labels for building types */
export const BUILDING_TYPE_LABELS: Record<BuildingTypeKey, string> = {
  single_family: 'Single Family (Standard)',
  row_townhouse: 'Row/Townhouse (Stacked)',
  wood_frame: 'Wood-frame (Up to 6-Storey)',
  mid_rise_concrete: 'Concrete Mid-rise (Up to 6-Storey)', 
  condo_apart: 'Condo/Apart. (13-39 Storey)',
};

/** Region keys */
export const REGION_KEYS = ['vancouver', 'toronto', 'ottawa', 'calgary', 'edmonton', 'montreal', 'halifax', 'winnipeg'] as const;
export type RegionKey = (typeof REGION_KEYS)[number];

/** Human-readable region names */
export const REGION_LABELS: Record<RegionKey, string> = {
  vancouver: 'Vancouver',
  toronto: 'Toronto (GTA)',
  ottawa: 'Ottawa',
  calgary: 'Calgary',
  edmonton: 'Edmonton',
  montreal: 'Montreal',
  halifax: 'Halifax',
  winnipeg: 'Winnipeg',
};

/**
 * Build Canada Homes (BCH) max rent caps — Low Income (26–50% AMI) by Census Subdivision.
 * Used to recommend affordable rent in the TDCE unit mix. Source: BCH / local AMI.
 */
export const BCH_MAX_RENT_26_50_AMI: Record<RegionKey, number> = {
  vancouver: 838,
  toronto: 803,
  ottawa: 791,
  calgary: 785,
  edmonton: 762,
  montreal: 683,
  halifax: 695,
  winnipeg: 721,
};

/** Cost range for one building type in one region: low and high $/sq ft */
export interface RegionBuildingRange {
  low: number;
  high: number;
}

/** Matrix: region -> building type -> { low, high } */
export const REGION_BENCHMARK_MATRIX: Record<RegionKey, Record<BuildingTypeKey, RegionBuildingRange>> = {
  vancouver: {
    single_family: { low: 200, high: 320 },
    row_townhouse: { low: 225, high: 315 },
    wood_frame: { low: 275, high: 365 },
    mid_rise_concrete: { low: 310, high: 400 }, // +~10-12% over wood
    condo_apart: { low: 360, high: 455 },
  },
  toronto: {
    single_family: { low: 200, high: 275 },
    row_townhouse: { low: 230, high: 270 },
    wood_frame: { low: 245, high: 330 },
    mid_rise_concrete: { low: 280, high: 365 },
    condo_apart: { low: 310, high: 395 },
  },
  ottawa: {
    single_family: { low: 140, high: 225 },
    row_townhouse: { low: 175, high: 230 },
    wood_frame: { low: 220, high: 300 },
    mid_rise_concrete: { low: 255, high: 340 },
    condo_apart: { low: 285, high: 365 },
  },
  calgary: {
    single_family: { low: 175, high: 265 },
    row_townhouse: { low: 195, high: 255 },
    wood_frame: { low: 235, high: 345 },
    mid_rise_concrete: { low: 265, high: 365 },
    condo_apart: { low: 275, high: 345 },
  },
  edmonton: {
    single_family: { low: 165, high: 250 },
    row_townhouse: { low: 185, high: 235 },
    wood_frame: { low: 225, high: 315 },
    mid_rise_concrete: { low: 255, high: 340 },
    condo_apart: { low: 265, high: 325 },
  },
  montreal: {
    single_family: { low: 145, high: 205 },
    row_townhouse: { low: 170, high: 205 },
    wood_frame: { low: 215, high: 280 },
    mid_rise_concrete: { low: 245, high: 320 },
    condo_apart: { low: 275, high: 350 },
  },
  halifax: {
    single_family: { low: 140, high: 215 },
    row_townhouse: { low: 165, high: 215 },
    wood_frame: { low: 240, high: 310 },
    mid_rise_concrete: { low: 270, high: 345 },
    condo_apart: { low: 280, high: 355 },
  },
  winnipeg: {
    single_family: { low: 155, high: 215 },
    row_townhouse: { low: 175, high: 225 },
    wood_frame: { low: 215, high: 285 },
    mid_rise_concrete: { low: 245, high: 320 },
    condo_apart: { low: 265, high: 325 },
  },
};

/** Legacy Altus-based benchmark ranges (kept for reference / fallback). */
export const CONSTRUCTION_BENCHMARKS: { category: string; ranges: BenchmarkRange[] }[] = [
  {
    category: '1. High-rise concrete residential',
    ranges: [
      { label: 'Up to 12 storeys', low: 290, high: 390 },
      { label: '13–39 storeys', low: 295, high: 385, note: 'Vancouver often trends higher, $360–$455' },
      { label: '13–39 storeys (Vancouver typical)', low: 360, high: 455, note: 'Anhart $490/sf with uplift' },
      { label: '40–60 storeys', low: 330, high: 410 },
      { label: '60+ storeys', low: 365, high: 480 },
    ],
  },
  {
    category: '2. Wood-frame residential',
    ranges: [
      { label: 'Mid-rise (4–6 storeys)', low: 275, high: 365 },
      { label: 'Low-rise (under 4 storeys)', low: 240, high: 320, note: 'Generally cheaper than mid-rise' },
    ],
  },
  {
    category: '3. Townhomes & single family',
    ranges: [
      { label: 'Custom luxury homes', low: 500, high: 1200 },
      { label: 'Single-family (standard)', low: 190, high: 320, note: 'Usually excludes land and unfinished basements' },
      { label: 'Townhomes (stacked or row)', low: 210, high: 310, note: 'Varies with underground parking' },
    ],
  },
  {
    category: '4. Specialized residential',
    ranges: [
      { label: 'Seniors housing (independent/supportive)', low: 290, high: 395 },
      { label: 'Assisted living residences', low: 310, high: 420, note: 'Higher due to medical infrastructure' },
    ],
  },
  {
    category: '5. Mid-rise concrete residential', // New Category
    ranges: [
      { label: 'Up to 6 storeys', low: 280, high: 375, note: 'Often 12-15% more expensive than wood-frame' },
      { label: '7–12 storeys', low: 290, high: 390 },
    ],
  },
];

/** Location/site uplift: +10% when applied (downtown, dense site, difficult access) */
export const LOCATION_UPLIFT_PERCENT = 10;

/** Params for applying Altus-style uplifts to a benchmark high ($/sq ft). */
export interface UpliftParams {
  /** Escalation: inflation from guide date to construction start. Typical 3–6% per year. */
  escalationPercent?: number;
  /** Complexity/specification: Step Code, seismic, geotech. Typical 5–12%. */
  complexityPercent?: number;
  /** Location/site: apply +10% for downtown/dense/difficult sites. */
  locationUplift?: boolean;
  /** Secondary market: apply +10% for secondary market (e.g. condo/apartments). */
  isSecondaryMarket?: boolean;
}

/**
 * Apply escalation, complexity, and location uplifts to a base benchmark high.
 * Formula: base × (1 + escalation/100) × (1 + complexity/100) × (1 + location/100).
 * Location adds 10% when true.
 */
export function getUpliftAdjustedCost(baseHigh: number, uplifts: UpliftParams = {}): number {
  const e = Math.max(0, uplifts.escalationPercent ?? 0) / 100;
  const c = Math.max(0, uplifts.complexityPercent ?? 0) / 100;
  const loc = uplifts.locationUplift ? 1.10 : 1.0;
  
  // Apply a 0.90 multiplier (10% discount) for secondary markets
  const marketAdjustment = uplifts.isSecondaryMarket ? 0.90 : 1.0;

  return Math.round(baseHigh * (1 + e) * (1 + c) * loc * marketAdjustment);
}

/** Breakdown of applied uplifts for display (base, then each step). */
export interface UpliftBreakdown {
  base: number;
  afterEscalation: number;
  afterComplexity: number;
  afterLocation: number;
  final: number;
  hasEscalation: boolean;
  hasComplexity: boolean;
  hasLocation: boolean;
}

export function getUpliftBreakdown(baseHigh: number, uplifts: UpliftParams = {}): UpliftBreakdown {
  const e = Math.max(0, uplifts.escalationPercent ?? 0) / 100;
  const c = Math.max(0, uplifts.complexityPercent ?? 0) / 100;
  const loc = uplifts.locationUplift ? LOCATION_UPLIFT_PERCENT / 100 : 0;
  const afterEscalation = baseHigh * (1 + e);
  const afterComplexity = afterEscalation * (1 + c);
  const afterLocation = afterComplexity * (1 + loc);
  return {
    base: baseHigh,
    afterEscalation: Math.round(afterEscalation * 100) / 100,
    afterComplexity: Math.round(afterComplexity * 100) / 100,
    afterLocation: Math.round(afterLocation * 100) / 100,
    final: Math.round(afterLocation),
    hasEscalation: (uplifts.escalationPercent ?? 0) > 0,
    hasComplexity: (uplifts.complexityPercent ?? 0) > 0,
    hasLocation: uplifts.locationUplift === true,
  };
}

/** Legacy: single "city dense" uplift (+10%). With city dense uplift: high × 1.10 */
export function getAnhartAdjustedFromRange(high: number): number {
  return Math.round(high * (1 + LOCATION_UPLIFT_PERCENT / 100));
}

/** Option for one building type in a region (used in UI) */
export interface RegionBuildingOption {
  id: string;
  region: RegionKey;
  buildingType: BuildingTypeKey;
  label: string;
  low: number;
  high: number;
  benchmarkHigh: number;
  anhartPerSqFt: number;
}

/** Build option id from region and building type */
export function getRegionBuildingId(region: RegionKey, buildingType: BuildingTypeKey): string {
  return `${region}_${buildingType}`;
}

/** Parse option id into region and building type, or null if not a region_building id */
export function parseRegionBuildingId(id: string): { region: RegionKey; buildingType: BuildingTypeKey } | null {
  const idx = id.indexOf('_');
  if (idx <= 0) return null;
  const region = id.slice(0, idx) as RegionKey;
  const buildingType = id.slice(idx + 1) as BuildingTypeKey;
  if (!REGION_KEYS.includes(region) || !BUILDING_TYPE_KEYS.includes(buildingType)) return null;
  return { region, buildingType };
}

/** Get all building-type options for a region */
export function getOptionsForRegion(region: RegionKey): RegionBuildingOption[] {
  const row = REGION_BENCHMARK_MATRIX[region];
  return BUILDING_TYPE_KEYS.map((buildingType) => {
    const { low, high } = row[buildingType];
    const id = getRegionBuildingId(region, buildingType);
    return {
      id,
      region,
      buildingType,
      label: BUILDING_TYPE_LABELS[buildingType],
      low,
      high,
      benchmarkHigh: high,
      anhartPerSqFt: high === 455 ? 490 : getAnhartAdjustedFromRange(high),
    };
  });
}

/** Get base benchmark high for region + building type ($/sq ft). */
export function getBaseHighForRegionBuilding(region: RegionKey, buildingType: BuildingTypeKey): number {
  const { high } = REGION_BENCHMARK_MATRIX[region][buildingType];
  return high;
}

/**
 * Get cost $/sq ft for region + building type with full uplift params.
 * Use this when escalation and/or complexity uplifts are set.
 */
export function getCostForRegionBuildingWithUplifts(
  region: RegionKey,
  buildingType: BuildingTypeKey,
  uplifts: UpliftParams
): number {
  let base = getBaseHighForRegionBuilding(region, buildingType);
  if (base === 455 && uplifts.locationUplift && !uplifts.escalationPercent && !uplifts.complexityPercent) {
    return 490;
  }
  return getUpliftAdjustedCost(base, uplifts);
}

/** Get cost $/sq ft for a selected region+building type (legacy: location uplift only, boolean). */
export function getCostForRegionBuilding(
  region: RegionKey,
  buildingType: BuildingTypeKey,
  applyLocationUplift: boolean
): number {
  return getCostForRegionBuildingWithUplifts(region, buildingType, {
    locationUplift: applyLocationUplift,
  });
}

/** All benchmark options for dropdown (from region matrix). Used when UI needs a flat list. */
export interface BenchmarkOption {
  id: string;
  category: string;
  label: string;
  rangeText: string;
  benchmarkHigh: number;
  anhartPerSqFt: number;
}

/** Vancouver 13–39 conservative Anhart (documented as ~10% uplift in narrative) */
export const ANHART_13_39_VANCOUVER = 490;

export function getBenchmarkOptions(): BenchmarkOption[] {
  const options: BenchmarkOption[] = [];
  REGION_KEYS.forEach((region) => {
    getOptionsForRegion(region).forEach((o) => {
      options.push({
        id: o.id,
        category: REGION_LABELS[region],
        label: o.label,
        rangeText: `$${o.low}–$${o.high}/sf`,
        benchmarkHigh: o.benchmarkHigh,
        anhartPerSqFt: o.anhartPerSqFt,
      });
    });
  });
  return options;
}

export function getBenchmarkOptionById(id: string): BenchmarkOption | null {
  const parsed = parseRegionBuildingId(id);
  if (!parsed) return null;
  const opts = getOptionsForRegion(parsed.region);
  const o = opts.find((x) => x.buildingType === parsed.buildingType);
  if (!o) return null;
  return {
    id: o.id,
    category: REGION_LABELS[o.region],
    label: o.label,
    rangeText: `$${o.low}–$${o.high}/sf`,
    benchmarkHigh: o.benchmarkHigh,
    anhartPerSqFt: o.anhartPerSqFt,
  };
}

/** Default high-rise 13–39 (Vancouver $360–$455): use 490 as standard */
export const DEFAULT_ANHART_HIGH_RISE = 490;
