'use client';

/**
 * @file TdceSheet.tsx
 * @description On-screen digest of the Total Development Cost Estimate (TDCE).
 *
 * Renders letter-size "pages" with clickable section blocks covering:
 *   - Project identification & contact info
 *   - Built form & development summary
 *   - Benchmarks & cost assumptions
 *   - TDC summary
 *   - Capital stack (sources & uses)
 *   - Financing uses breakdown
 *   - Stabilized operating pro forma
 *
 * Clicking any section block fires `onEditSection` with that section's ID,
 * opening the corresponding edit panel in the parent layout.
 */

import Image from 'next/image';
import type { TdceInput, TdceOutput } from '@/types/tdce';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  truncateTo1Decimal,
} from '@/lib/tdce-calculator';
import {
  parseRegionBuildingId,
  getBaseHighForRegionBuilding,
  getUpliftBreakdown,
} from '@/data/constructionBenchmarks';
import { getBedroomLabel } from './UnitMixInput';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Conversion factor from square feet to square metres. */
const SQFT_TO_M2 = 0.09290304;

/**
 * Default affordability mix percentages used when no override is supplied.
 * Values must sum to 100.
 */
const DEFAULT_AFFORDABILITY_MIX = {
  shelterPercent: 20,
  hilsPercent: 10,
  marketPercent: 70,
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Union of all editable section identifiers on the TDCE sheet.
 * `null` means no section is actively selected (i.e. the user clicked outside
 * a section block).
 */
export type TdceSectionId =
  | 'contact'
  | 'project'
  | 'overview'
  | 'built-form'
  | 'benchmarks'
  | 'tdc-summary'
  | 'financing-sources'
  | 'financing-uses'
  | 'pro-forma'
  | null;

/** Props for the top-level TdceSheet component. */
interface TdceSheetProps {
  /** All user-supplied inputs driving the estimate. */
  input: TdceInput;
  /** Calculated output values; may be null while inputs are incomplete. */
  output: TdceOutput | null;
  /** Called whenever the user clicks a section block or the page background. */
  onEditSection: (section: TdceSectionId) => void;
  /** The currently open/active section (highlights that block with a blue ring). */
  activeSection: TdceSectionId;
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/**
 * Formats a square-footage value with its metric equivalent in parentheses.
 *
 * @example
 * formatSqFtWithM2(1000) // "1,000 sq ft (92.9 m²)"
 *
 * @param sqFt - Area in square feet.
 * @returns Formatted string, or "—" if the value is null/undefined.
 */
function formatSqFtWithM2(sqFt: number): string {
  if (!sqFt && sqFt !== 0) return '—';
  const m2 = sqFt * SQFT_TO_M2;
  return `${formatNumber(sqFt)} sq ft (${m2.toFixed(1)} m²)`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

// ---- SectionBlock ----------------------------------------------------------

/** Props for SectionBlock. */
interface SectionBlockProps {
  /** Unique section identifier used when notifying the parent of a click. */
  id: TdceSectionId;
  /** Human-readable heading rendered at the top of the block. */
  title: string;
  /** Section content rendered below the heading. */
  children: React.ReactNode;
  /** Callback fired when the block is clicked or activated via keyboard. */
  onEdit: (id: TdceSectionId) => void;
  /** When `true` the block receives a blue highlight ring. */
  isActive: boolean;
}

/**
 * A styled, keyboard-accessible card that wraps a single TDCE section.
 *
 * Clicking the card notifies the parent to open the edit panel for that
 * section.  The active state (blue ring) is controlled by the parent.
 */
function SectionBlock({
  id,
  title,
  children,
  onEdit,
  isActive,
}: SectionBlockProps) {
  /** Propagates the click event to the parent without bubbling to the Page. */
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(id);
  };

  /** Allows keyboard users to activate the block via Enter. */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onEdit(id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative rounded-xl border transition-all cursor-pointer py-4 px-5 min-h-[44px] touch-manipulation group mt-4
        ${
          isActive
            ? 'border-red-500 bg-white ring-2 ring-red-500 shadow-md'
            : 'border-transparent hover:border-gray-200 hover:bg-gray-50 bg-white'
        }
      `}
    >
      <div className="flex justify-between items-center mb-5 px-2">
        <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-500 pl-3">
          {title}
        </h3>
        <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.158 3.71 3.71 1.159-1.158a2.625 2.625 0 000-3.71zm-2.925 5.158L15.096 3.717 4.26 14.553a5.25 5.25 0 00-1.425 2.59l-.82 3.692a.75.75 0 00.92.92l3.692-.82a5.25 5.25 0 002.59-1.425L18.806 7.427z" />
          </svg>
          Edit
        </button>
      </div>
      <div className="px-4">
        {children}
      </div>
    </div>
  );
}

// ---- Page ------------------------------------------------------------------

/** Props for the Page layout component. */
interface PageProps {
  /** Section blocks and other content to render inside the page. */
  children: React.ReactNode;
  /** When `true` the Anhart logo and estimate class header are displayed. */
  showHeader: boolean;
  /**
   * Called when the user clicks the page background (outside any section block).
   * The parent uses this to deselect the active section.
   */
  onClick: () => void;
  /**
   * Estimate precision class displayed in the header.
   * - `'C'` → Class C (±15%)
   * - `'D'` → Class D (±30%)
   * Defaults to `'D'` when omitted.
   */
  estimatePrecisionClass?: 'C' | 'D';
}

/**
 * A single letter-size (8.5" × 11") page with a centred watermark.
 *
 * On mobile the page fills full viewport width with flexible height.
 * On desktop it snaps to the letter dimensions.
 */
function Page({
  children,
  showHeader,
  onClick,
  estimatePrecisionClass,
}: PageProps) {
  const precisionClass = estimatePrecisionClass ?? 'D';
  const isClassC = precisionClass === 'C';

  return (
    <div
      className="tdce-page relative bg-white flex flex-col overflow-hidden w-full min-w-0 min-h-[70vh] max-w-full"
      onClick={onClick}
      role="presentation"
    >
      {/* Watermark — decorative only, hidden from assistive technology */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]"
        aria-hidden
      >
        <Image
          src="/tdceAssets/anhart_watermark.png"
          alt=""
          width={960}
          height={960}
          className="object-contain max-w-[98%] max-h-[98%] min-w-[85%] min-h-[85%]"
        />
      </div>

      {/* Page content */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 pt-6 pb-8 sm:px-8 md:pt-8 md:pb-10">
        {showHeader && (
          <header className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-slate-200 shrink-0">
            <Image
              src="/tdceAssets/anhart-logo-text.webp"
              alt="Anhart Affordable Housing"
              width={140}
              height={42}
              className="h-10 w-auto object-contain"
            />
            <p className="text-right text-s font-medium text-slate-600 leading-tight">
              {isClassC ? 'Class C' : 'Class D'} Total Development Cost Estimate (
              {isClassC ? '±15%' : '±30%'})
              <br />
              <span className="text-slate-400">Subject to Change</span>
            </p>
          </header>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section renderers
// Broken out into dedicated functions to keep TdceSheet readable and to allow
// future unit-testing of individual sections in isolation.
// ---------------------------------------------------------------------------

// ---- ProjectSection --------------------------------------------------------

/** Props consumed by ProjectSection. */
interface ProjectSectionProps {
  meta: TdceInput['meta'];
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

/**
 * Renders the "Project identification" section block.
 *
 * Displays project title, location, cost benchmark source, contact details,
 * and a free-text description / notes field.
 */
function ProjectSection({ meta, onEdit, isActive }: ProjectSectionProps) {
  /** Builds a comma-separated location string from whichever parts are defined. */
  const locationParts = [meta.address, meta.city, meta.province]
    .filter(Boolean)
    .join(', ');

  return (
    <SectionBlock
      id="project"
      title="Project identification"
      onEdit={onEdit}
      isActive={isActive}
    >
      <div className="text-slate-700 text-sm space-y-3 min-w-0">
        {/* Project basics */}
        <div>
          <p>
            <strong>Project title:</strong>{' '}
            {meta.projectTitle || '—'}
            {meta.scenarioName ? ` (${meta.scenarioName})` : ''}
          </p>
          <p>
            <strong>Location:</strong> {locationParts || '—'}
          </p>
          <p>
            <strong>Cost benchmark:</strong> Altus Group Canadian Cost Guide
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-s font-semibold text-slate-700 uppercase tracking-wide mb-1">
            Contact
          </p>
          <p>
            <strong>Name:</strong> {meta.contactName || '—'}
          </p>
          <p>
            <strong>Email:</strong> {meta.contactEmail || '—'}
          </p>
        </div>

        {/* Description / notes */}
        <div>
          <p className="text-s font-semibold text-slate-700 uppercase tracking-wide mb-1">
            More Details
          </p>
          <div className="rounded border border-slate-200 bg-slate-50/50 p-3 min-h-[4rem] max-h-[12rem] overflow-y-auto text-slate-700 whitespace-pre-wrap break-words min-w-0">
            {meta.description || '—'}
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}

// ---- BuiltFormSection ------------------------------------------------------

/** Props consumed by BuiltFormSection. */
interface BuiltFormSectionProps {
  physicals: TdceInput['physicals'];
  financials: TdceInput['financials'];
  meta: TdceInput['meta'];
  output: TdceOutput | null;
  /** Resolved gross square footage (may come from output or fall back to physicals). */
  gsf: number | undefined;
  /** Resolved total unit count (may come from output or fall back to physicals). */
  totalUnits: number | undefined;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

/**
 * Renders the "Development summary & built form" section block.
 *
 * Shows site dimensions, zoning, GFA, net residential area, unit mix,
 * density (FSR), and commercial area when applicable.
 */
function BuiltFormSection({
  physicals,
  financials,
  meta,
  output,
  gsf,
  totalUnits,
  onEdit,
  isActive,
}: BuiltFormSectionProps) {
  const hasCommercial = (financials.commercialSqFt ?? 0) > 0;
  const hasDimensions =
    physicals.siteDimensionsLengthFt != null &&
    physicals.siteDimensionsWidthFt != null &&
    physicals.siteDimensionsLengthFt > 0 &&
    physicals.siteDimensionsWidthFt > 0;

  /** FSR display string — appends residential/commercial splits when commercial area exists. */
  const fsrDisplay = (): string => {
    if (output?.areas?.floorSpaceRatio == null) return '—';
    let result = output.areas.floorSpaceRatio.toFixed(1);
    if (hasCommercial) {
      if (output.areas.residentialFSR != null) result += ` residential ${output.areas.residentialFSR.toFixed(2)}`;
      if (output.areas.commercialFSR != null) result += `, commercial ${output.areas.commercialFSR.toFixed(2)}`;
    }
    return result;
  };

  return (
    <SectionBlock
      id="built-form"
      title="1. Development summary & built form"
      onEdit={onEdit}
      isActive={isActive}
    >
      <ul className="text-slate-700 space-y-0.5 text-sm">
        <li>
          <strong>Site area:</strong>{' '}
          {physicals.siteAreaSqFt ? formatSqFtWithM2(physicals.siteAreaSqFt) : '—'}
        </li>

        {hasDimensions && (
          <li>
            <strong>Site dimensions:</strong>{' '}
            {physicals.siteDimensionsLengthFt} ft × {physicals.siteDimensionsWidthFt} ft
          </li>
        )}

        {(meta.zoning || meta.zoningNote) && (
          <li>
            <strong>Zoning:</strong>{' '}
            {meta.zoning && meta.zoningNote
              ? `${meta.zoning} (${meta.zoningNote})`
              : meta.zoning || meta.zoningNote}
          </li>
        )}

        <li>
          <strong>Gross floor area (GFA):</strong>{' '}
          {gsf ? formatNumber(Math.round(gsf)) : '—'} sq ft
        </li>

        <li>
          <strong>Net residential area:</strong>{' '}
          {output?.income?.residentialNetRentableArea != null
            ? `${formatNumber(Math.round(output.income.residentialNetRentableArea))} sq ft (${
                physicals.efficiencyRatio != null
                  ? Math.round((physicals.efficiencyRatio ?? 0) * 100)
                  : '—'
              }%)`
            : '—'}
        </li>

        {hasCommercial && (
          <li>
            <strong>Commercial area:</strong> {formatNumber(financials.commercialSqFt)} sq ft
          </li>
        )}

        <li>
          <strong>Total units:</strong> {totalUnits || '—'} residential units
        </li>

        <li>
          <strong>Density (FSR):</strong> {fsrDisplay()}
        </li>

        {/* Unit mix breakdown (sorted from studio → largest bedroom count) */}
        {physicals.unitMix && physicals.unitMix.length > 0 && (
          <li className="mt-1.5">
            <strong>Unit mix:</strong>
            <ul className="list-disc list-inside ml-2 mt-0.5 text-sm">
              {[...physicals.unitMix]
                .sort((a, b) => a.bedrooms - b.bedrooms)
                .map((unit, i) => (
                  <li key={i}>
                    {getBedroomLabel(unit.bedrooms)}: {unit.count} units
                    {(unit.affordableCount ?? 0) > 0 && (
                      <span className="text-slate-600"> ({unit.affordableCount} affordable)</span>
                    )}
                  </li>
                ))}
            </ul>
            {/* Net residential space declared by unit mix */}
            {(() => {
              const totalDeclared = physicals.unitMix.reduce(
                (sum, unit) => sum + unit.count * (unit.sqFtPerUnit ?? 0),
                0
              );
              return totalDeclared > 0 ? (
                <p className="ml-2 mt-1 text-sm text-slate-600">
                  Net residential declared:{' '}
                  <strong className="text-slate-800">{formatNumber(Math.round(totalDeclared))} sq ft</strong>
                  {' '}({physicals.unitMix.reduce((s, u) => s + u.count, 0)} units ×avg{' '}
                  {formatNumber(
                    Math.round(
                      totalDeclared / physicals.unitMix.reduce((s, u) => s + u.count, 0)
                    )
                  )}{' '}
                  sq ft)
                </p>
              ) : null;
            })()}
          </li>
        )}
      </ul>
    </SectionBlock>
  );
}

// ---- BenchmarksSection -----------------------------------------------------

/** Props consumed by BenchmarksSection. */
interface BenchmarksSectionProps {
  input: TdceInput;
  output: TdceOutput | null;
  gsf: number | undefined;
  totalUnits: number | undefined;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

/**
 * Derives the construction cost uplift breakdown from the benchmark inputs.
 *
 * @param financials - The financial inputs containing benchmark ID and uplift percents.
 * @returns The breakdown object if uplifts are present and the benchmark ID is valid,
 *          otherwise `null`.
 */
function resolveUpliftBreakdown(financials: TdceInput['financials']) {
  const parsed = financials.constructionBenchmarkId
    ? parseRegionBuildingId(financials.constructionBenchmarkId)
    : null;

  if (!parsed) return null;

  const uplifts = {
    escalationPercent: financials.escalationUpliftPercent ?? 0,
    complexityPercent: financials.complexityUpliftPercent ?? 0,
    locationUplift: false,
  };

  const hasAnyUplift = uplifts.escalationPercent > 0 || uplifts.complexityPercent > 0;
  if (!hasAnyUplift) return null;

  return getUpliftBreakdown(
    getBaseHighForRegionBuilding(parsed.region, parsed.buildingType),
    uplifts,
  );
}

/**
 * Renders the "Benchmarks & cost assumptions" section block.
 *
 * Contains sub-sections for construction cost, soft costs, operating expenses,
 * rent & affordability assumptions, DSCR target, and a reference comparison
 * table of other project types.
 */
function BenchmarksSection({
  input,
  output,
  gsf,
  totalUnits,
  onEdit,
  isActive,
}: BenchmarksSectionProps) {
  const { physicals, financials, operations, meta } = input;
  const breakdown = resolveUpliftBreakdown(financials);

  /**
   * Builds the inline annotation after the applied hard-cost rate, e.g.
   * "(escalation 5%, complexity 3%)" or "(benchmark only, no uplift)".
   */
  const hardCostAnnotation = (): React.ReactNode => {
    if (breakdown) {
      const parts: string[] = [];
      if (breakdown.hasEscalation) parts.push(`escalation ${financials.escalationUpliftPercent}%`);
      if (breakdown.hasComplexity) parts.push(`complexity ${financials.complexityUpliftPercent}%`);
      return <> ({parts.join(', ')})</>;
    }
    if (!financials.escalationUpliftPercent && !financials.complexityUpliftPercent) {
      return ' (benchmark only, no uplift)';
    }
    return null;
  };

  /**
   * Returns a bedrooms-count-to-unit-size mapping, preferring the explicit
   * `sqFtPerUnit` from the unit mix and falling back to the top-level size fields.
   */
  const sqFtForBedrooms = (bedrooms: number): number => {
    const fromMix = physicals.unitMix?.find((u) => u.bedrooms === bedrooms)?.sqFtPerUnit;
    if (fromMix != null && fromMix > 0) return fromMix;
    if (bedrooms === 0) return physicals.sizeStudio ?? 0;
    if (bedrooms === 1) return physicals.size1Bed ?? 0;
    if (bedrooms === 2) return physicals.size2Bed ?? 0;
    return physicals.size2Bed ?? 0;
  };

  /**
   * Derives the distinct bedroom types present in the unit mix (or uses a
   * default Studio / 1-Bed / 2-Bed set when no mix is provided).
   */
  const uniqueBedroomTypes: number[] =
    physicals.unitMix && physicals.unitMix.length > 0
      ? [...new Set(physicals.unitMix.map((u) => u.bedrooms))].sort((a, b) => a - b)
      : [0, 1, 2];

  /** Maps a bedroom count to a human-readable label for table rows. */
  const bedroomLabel = (b: number): string =>
    b === 0 ? 'Studio' : b === 1 ? '1-Bedroom' : `${b}-Bedroom`;

  return (
    <SectionBlock
      id="benchmarks"
      title="2. Benchmarks & cost assumptions"
      onEdit={onEdit}
      isActive={isActive}
    >
      <div className="text-slate-700 text-sm space-y-4">

        {/* ---- 3.1 Construction cost ---- */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">3.1 Construction cost benchmark</h4>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>
              Altus Group Canadian Cost Guide. Applied rate may include escalation and complexity
              uplifts.
            </li>
            <li>
              Applied:{' '}
              <strong>
                {financials.hardCostPerSqFt ? `$${financials.hardCostPerSqFt}` : '—'} / sq ft (GFA)
              </strong>
              {hardCostAnnotation()}
            </li>

            {/* Step-by-step uplift derivation */}
            {breakdown && (
              <li>
                Uplift build-up: base ${breakdown.base}/sf
                {breakdown.hasEscalation && <> → ${breakdown.afterEscalation} (escalation)</>}
                {breakdown.hasComplexity && <> → ${breakdown.afterComplexity} (complexity)</>}
                {' '}→ <strong>${breakdown.final}/sf</strong> applied.
              </li>
            )}

            {/* Total hard cost confirmation */}
            {output?.costs && gsf && gsf > 0 && (
              <li>
                Hard cost estimate:{' '}
                <strong>{formatCurrency(output.costs.hardCosts)}</strong>{' '}
                ({formatNumber(Math.round(gsf))} sf × ${financials.hardCostPerSqFt}/sf)
              </li>
            )}

            {/* Contextual note on the rate applied */}
            {financials.hardCostPerSqFt && (
              <li>
                {financials.hardCostPerSqFt === 490
                  ? '$490/sf (Anhart-adjusted for Vancouver feasibility).'
                  : `$${financials.hardCostPerSqFt}/sf applied for this Class D estimate.`}
              </li>
            )}
          </ul>

          {/* Optional free-text cost assumption note from the meta section */}
          {meta.costAssumptionNote && (
            <p className="mt-2 text-slate-600 text-sm whitespace-pre-wrap border-l-2 border-slate-200 pl-3">
              {meta.costAssumptionNote}
            </p>
          )}
        </div>

        {/* ---- 3.2 Soft costs ---- */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">3.2 Soft costs</h4>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Benchmark: 15–30% of hard costs (lower when building permit issued)</li>
            <li>
              Soft costs are assumed at{' '}
              <strong>{formatPercent(financials.softCostPercent ?? 0.25)}</strong>
              {financials.buildingPermitIssued ? ' (permit issued)' : ''}
            </li>
          </ul>
        </div>

        {/* ---- 3.3 Operating expenses ---- */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">3.3 Operating expenses</h4>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Benchmark: 30–40% of EGI</li>
            <li>
              Operating expenses are assumed at{' '}
              <strong>{formatPercent(operations.operatingExpenseRatio ?? 0.35)}</strong> of
              Effective Gross Income (EGI).
            </li>
          </ul>
        </div>

        {/* ---- 3.4 Market rents & affordability ---- */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">
            3.4 Market rents &amp; affordability assumptions
          </h4>

          {/* Render differently based on rent income source mode */}
          {operations.rentIncomeSource === 'market_by_unit' ? (
            <>
              <p className="mb-1">
                Location-adjusted market rents (planning-level), by unit type in mix:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 mb-2">
                {uniqueBedroomTypes.map((bedrooms) => {
                  /**
                   * Map bedroom count to the corresponding market rent field.
                   * Only Studio (0), 1-Bed (1), and 2-Bed (2) have explicit fields;
                   * larger units fall back to undefined.
                   */
                  const rent =
                    bedrooms === 0
                      ? operations.marketRentStudio
                      : bedrooms === 1
                      ? operations.marketRent1Bed
                      : bedrooms === 2
                      ? operations.marketRent2Bed
                      : undefined;

                  const value =
                    rent != null && rent >= 0 ? `$${formatNumber(rent, 1)}` : '—';

                  return (
                    <li key={bedrooms}>
                      {bedroomLabel(bedrooms)}: <strong>{value} / month</strong>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <p className="mb-1">
                Cost rent per residential sq ft (planning-level), by unit type in mix:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 mb-2">
                {uniqueBedroomTypes.map((bedrooms) => {
                  const rate = operations.residentialRentPerSqFt ?? 0;
                  const sqFt = sqFtForBedrooms(bedrooms);
                  const rentPerMonth = rate > 0 && sqFt > 0 ? sqFt * rate : 0;
                  const value =
                    rentPerMonth > 0
                      ? `$${formatNumber(truncateTo1Decimal(rentPerMonth), 1)}`
                      : '—';
                  const sub =
                    rate > 0 && sqFt > 0
                      ? ` (${formatNumber(sqFt, 1)} sf × $${formatNumber(rate, 1)}/sf)`
                      : '';

                  return (
                    <li key={bedrooms}>
                      {bedroomLabel(bedrooms)}: <strong>{value} / month</strong>
                      {sub}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {/* ---- 3.5 DSCR target ---- */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">3.5 DSCR target</h4>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>
              Target DSCR:{' '}
              <strong>
                {operations.dscrTarget != null && operations.dscrTarget > 0
                  ? operations.dscrTarget.toFixed(2)
                  : '1.20'}
              </strong>
            </li>
          </ul>
        </div>

        {/* ---- Reference benchmarks table ---- */}
        <div className="border-t border-slate-200 pt-4 mt-3">
          <h4 className="font-semibold text-slate-800 mb-1">
            Reference benchmarks (other projects)
          </h4>
          <p className="text-s text-slate-600 mb-2">
            Compare your inputs to other projects by building type.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-s border border-slate-200 rounded overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="text-left p-2 font-medium">Metric</th>
                  <th className="text-right p-2 font-medium">Other (mid-rise)</th>
                  <th className="text-right p-2 font-medium">Other (low-rise)</th>
                  <th className="text-right p-2 font-medium">Other (purpose-built)</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-200">
                  <td className="p-2">Hard cost / SF</td>
                  <td className="p-2 text-right">$300</td>
                  <td className="p-2 text-right">$245</td>
                  <td className="p-2 text-right">$225</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-2">Soft cost %</td>
                  <td className="p-2 text-right">18%</td>
                  <td className="p-2 text-right">20%</td>
                  <td className="p-2 text-right">20%</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-2">OpEx % of EGI</td>
                  <td className="p-2 text-right">35%</td>
                  <td className="p-2 text-right">32%</td>
                  <td className="p-2 text-right">30%</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-2">TDC per unit</td>
                  <td className="p-2 text-right">$276,638</td>
                  <td className="p-2 text-right">$277,250</td>
                  <td className="p-2 text-right">~$266,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}

// ---- TdcSummarySection -----------------------------------------------------

/** Props consumed by TdcSummarySection. */
interface TdcSummarySectionProps {
  output: TdceOutput;
  financials: TdceInput['financials'];
  meta: TdceInput['meta'];
  gsf: number | undefined;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

/**
 * Renders the "Total development cost summary" section block.
 *
 * Lists each cost line (land, hard, soft, contingencies, fees, financing,
 * reserves) with its share of TDC, followed by per-unit and per-SF metrics.
 */
function TdcSummarySection({
  output,
  financials,
  meta,
  gsf,
  onEdit,
  isActive,
}: TdcSummarySectionProps) {
  const tdc = output.costs.totalDevelopmentCost;

  /**
   * Returns the TDC percentage string for a cost value, or an empty string if
   * TDC is zero to avoid division-by-zero.
   */
  const tdcShare = (value: number): string =>
    tdc > 0 ? ` (${((value / tdc) * 100).toFixed(1)}% of TDC)` : '';

  return (
    <SectionBlock
      id="tdc-summary"
      title="3. Total development cost summary"
      onEdit={onEdit}
      isActive={isActive}
    >
      <div className="text-slate-700 text-sm space-y-4">

        {/* Hard and soft cost line items */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-2">Hard and soft cost estimates</h4>
          <ul className="space-y-1.5">

            {/* Land */}
            <li className="flex justify-between gap-4">
              <span>Land value</span>
              <span>
                <strong>{formatCurrency(output.costs.landCost)}</strong>
                {tdcShare(output.costs.landCost)}
              </span>
            </li>

            {/* Hard construction */}
            <li className="flex justify-between gap-4">
              <span>
                Hard construction ({formatNumber(Math.round(gsf ?? 0))} sf ×
                ${financials.hardCostPerSqFt}/sf)
              </span>
              <span>
                <strong>{formatCurrency(output.costs.hardCosts)}</strong>
                {tdcShare(output.costs.hardCosts)}
              </span>
            </li>

            {/* Hard cost contingency (only shown when non-zero) */}
            {output.costs.hardCostContingency > 0 && (
              <li className="flex justify-between gap-4">
                <span>Hard cost contingency</span>
                <span>
                  <strong>{formatCurrency(output.costs.hardCostContingency)}</strong>
                  {tdcShare(output.costs.hardCostContingency)}
                </span>
              </li>
            )}

            {/* Soft costs */}
            <li className="flex justify-between gap-4">
              <span>Soft costs ({formatPercent(financials.softCostPercent)} of hard costs)</span>
              <span>
                <strong>{formatCurrency(output.costs.softCosts)}</strong>
                {tdcShare(output.costs.softCosts)}
              </span>
            </li>

            {/* Soft cost contingency (only shown when non-zero) */}
            {output.costs.softCostContingency > 0 && (
              <li className="flex justify-between gap-4">
                <span>Soft cost contingency</span>
                <span>
                  <strong>{formatCurrency(output.costs.softCostContingency)}</strong>
                  {tdcShare(output.costs.softCostContingency)}
                </span>
              </li>
            )}

            {/* Development fees (only shown when non-zero) */}
            {output.costs.developmentFees > 0 && (
              <li className="flex justify-between gap-4">
                <span>Development fees</span>
                <span>
                  <strong>{formatCurrency(output.costs.developmentFees)}</strong>
                  {tdcShare(output.costs.developmentFees)}
                </span>
              </li>
            )}

            {/* Financing costs (only shown when non-zero) */}
            {output.costs.financingCosts > 0 && (
              <li className="flex justify-between gap-4">
                <span>Financing costs</span>
                <span>
                  <strong>{formatCurrency(output.costs.financingCosts)}</strong>
                  {tdcShare(output.costs.financingCosts)}
                </span>
              </li>
            )}

            {/* Capitalized reserves (only shown when non-zero) */}
            {output.costs.reserves > 0 && (
              <li className="flex justify-between gap-4">
                <span>Reserves (capitalized)</span>
                <span>
                  <strong>{formatCurrency(output.costs.reserves)}</strong>
                  {tdcShare(output.costs.reserves)}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* TDC totals and per-unit / per-SF metrics */}
        <div className="border-t border-slate-200 pt-2">
          <ul className="space-y-0.5">
            <li>
              <strong>Total development cost (TDC):</strong>{' '}
              {formatCurrency(tdc)}{' '}
              ({meta.estimatePrecisionClass === 'C' ? 'Class C ±15%' : 'Class D ±30%'})
            </li>
            <li>
              TDC per unit: ≈{' '}
              <strong>{formatCurrency(output.costMetrics.costPerUnit)}</strong>
            </li>
            <li>
              TDC per GSF: ≈{' '}
              <strong>{formatCurrency(output.costMetrics.costPerSqFt)}</strong>
            </li>
            <li>
              Hard cost per residential SF: ≈{' '}
              <strong>{formatCurrency(output.costMetrics.hardCostPerResidentialSqFt)}</strong>
            </li>
            <li>
              Hard cost per buildable SF: ≈{' '}
              <strong>{formatCurrency(output.costMetrics.hardCostPerGsf)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </SectionBlock>
  );
}

// ---- FinancingSourcesSection ------------------------------------------------

/** Props consumed by FinancingSourcesSection. */
interface FinancingSourcesSectionProps {
  output: TdceOutput;
  financials: TdceInput['financials'];
  operations: TdceInput['operations'];
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

/**
 * Extracts debt-sizing assumptions from the output (if available) or falls
 * back to the user-supplied operations inputs.  Returns a consistent shape
 * used across the financing and pro-forma sections.
 */
function resolveDebtAssumptions(
  output: TdceOutput,
  operations: TdceInput['operations'],
): {
  interestRate: number;
  amortYears: number;
  dscrTarget: number;
  program: string;
  debtConst: number;
} {
  const da = (output.operations as any).debtAssumptions;
  return {
    interestRate: da?.interestRate ?? operations.interestRate ?? 0.049,
    amortYears: da?.amortYears ?? operations.amortizationYears ?? 40,
    dscrTarget: da?.dscrTarget ?? operations.dscrTarget ?? 1.1,
    program: da?.program ?? 'CMHC MLI Select (insured affordable)',
    debtConst: da?.debtConst ?? 0,
  };
}

/**
 * Renders the "Capital stack – sources & uses" section block.
 *
 * Shows the debt-sizing methodology note, lists all identified sources
 * (mortgage, grants, sponsor equity), contrasts against TDC, and highlights
 * any remaining funding gap (or surplus) with an appropriate colour callout.
 */
function FinancingSourcesSection({
  output,
  financials,
  operations,
  onEdit,
  isActive,
}: FinancingSourcesSectionProps) {
  const da = resolveDebtAssumptions(output, operations);
  const grants = financials.grants ?? [];
  const totalGrants = grants.reduce((sum, g) => sum + (g.amount ?? 0), 0);
  const sponsorEquity = financials.sponsorEquity ?? 0;
  const totalIdentified = totalGrants + sponsorEquity;
  const tdc = output.costs.totalDevelopmentCost;
  const maxMortgage = output.operations.maxMortgage ?? 0;

  /**
   * Funding gap = TDC − max mortgage − identified grants − sponsor equity.
   * A positive gap means more patient capital / subsidy is needed.
   */
  const gap =
    output.operations.fundingGap ??
    tdc - maxMortgage - totalIdentified;

  const balanced = Math.abs(gap) < 1;

  return (
    <SectionBlock
      id="financing-sources"
      title="4. Capital stack – sources & uses"
      onEdit={onEdit}
      isActive={isActive}
    >
      <div className="text-slate-700 text-sm space-y-3">

        {/* Debt sizing methodology explanation */}
        <div className="rounded bg-slate-50 border border-slate-200 p-3 text-s text-slate-600 space-y-1">
          <p className="font-semibold text-slate-700">Debt sizing methodology</p>
          <p>
            Max loan is sized by DSCR:{' '}
            <strong>Max Debt Service = NOI ÷ {da.dscrTarget.toFixed(2)}x</strong>, then
            converted to a loan amount using the mortgage constant for{' '}
            <strong>{(da.interestRate * 100).toFixed(1)}% interest</strong> over{' '}
            <strong>{da.amortYears} years</strong>.
          </p>
          <p>
            Program assumed: <strong>{da.program}</strong>. Conventional (non-insured) would use
            ~7%, 25yr — producing a smaller loan and larger gap.
          </p>
          <p className="text-slate-500">
            Debt constant: {(da.debtConst * 100).toFixed(3)}% — meaning every $1 of annual
            debt service supports ~$
            {da.debtConst > 0
              ? Math.round(1 / da.debtConst).toLocaleString('en-CA')
              : '—'}{' '}
            of loan proceeds.
          </p>
        </div>

        {/* Mortgage derivation (presented as an annotation line) */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">Sources</h4>
          <ul className="space-y-0.5">
            <li className="flex flex-col gap-0.5">
              <span className="text-s text-slate-500 ml-2">
                NOI {formatCurrency(output.operations.noi)} ÷ {da.dscrTarget.toFixed(2)}x DSCR ={' '}
                {formatCurrency(output.operations.noi / da.dscrTarget)} max debt service ÷{' '}
                {(da.debtConst * 100).toFixed(3)}% constant = {formatCurrency(maxMortgage)} loan
              </span>
            </li>

            {/* Grant lines (or placeholder) */}
            {grants.length > 0 ? (
              grants.map((grant, i) => (
                <li key={i}>
                  {grant.name || 'Grant'}
                  {grant.status ? ` (${grant.status})` : ''}:{' '}
                  <strong>{formatCurrency(grant.amount)}</strong>
                </li>
              ))
            ) : (
              <li className="text-slate-400 text-s italic">
                No grants entered — add in Financing &amp; grants panel
              </li>
            )}

            {/* Sponsor equity */}
            {sponsorEquity > 0 && (
              <li>
                Sponsor equity: <strong>{formatCurrency(sponsorEquity)}</strong>
              </li>
            )}

            {/* Subtotals */}
            <li className="pt-1 mt-0.5 border-t border-slate-200">
              Total identified sources (excl. mortgage):{' '}
              <strong>{formatCurrency(totalIdentified)}</strong>
            </li>
            <li>
              Total identified sources (incl. mortgage):{' '}
              <strong>{formatCurrency(totalIdentified + maxMortgage)}</strong>
            </li>
          </ul>
        </div>

        {/* Uses summary */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">Uses</h4>
          <ul className="space-y-0.5">
            <li>
              Total development cost: <strong>{formatCurrency(tdc)}</strong>
            </li>
          </ul>
        </div>

        {/* Gap / surplus callout */}
        <div
          className={`rounded p-3 border text-sm ${
            balanced
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : gap > 0
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          {balanced ? (
            <p className="font-medium">✓ Fully funded — sources cover TDC.</p>
          ) : gap > 0 ? (
            <>
              <p className="font-medium">
                Funding gap (patient equity / subsidy needed):{' '}
                <strong>{formatCurrency(gap)}</strong>
              </p>
              <p className="text-s mt-1">
                = TDC {formatCurrency(tdc)} − mortgage {formatCurrency(maxMortgage)}
                {totalGrants > 0 ? ` − grants ${formatCurrency(totalGrants)}` : ''}
                {sponsorEquity > 0 ? ` − equity ${formatCurrency(sponsorEquity)}` : ''}
              </p>
              <p className="text-s mt-1 text-amber-700">
                This gap represents the portion of TDC that debt and identified grants cannot
                cover. In affordable housing it is typically filled by patient equity, municipal
                land contribution, BC Housing capital, or CMHC seed funding.
              </p>
            </>
          ) : (
            <p className="font-medium">
              Surplus: <strong>{formatCurrency(Math.abs(gap))}</strong>
            </p>
          )}
        </div>

        <p className="text-s text-slate-400 pt-1 border-t border-slate-200">
          Class D estimate (±30%). Debt sizing is indicative only — actual loan proceeds depend on
          lender underwriting, LTV limits, and CMHC application score.
        </p>
      </div>
    </SectionBlock>
  );
}

// ---- FinancingUsesSection --------------------------------------------------

/** Props consumed by FinancingUsesSection. */
interface FinancingUsesSectionProps {
  output: TdceOutput;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

/**
 * Renders the "Financing structure – uses" section block.
 *
 * Mirrors the TDC summary cost lines but formatted as a simple uses list
 * appropriate for a capital stack presentation.
 */
function FinancingUsesSection({ output, onEdit, isActive }: FinancingUsesSectionProps) {
  const { costs } = output;

  return (
    <SectionBlock
      id="financing-uses"
      title="5. Financing structure – uses"
      onEdit={onEdit}
      isActive={isActive}
    >
      <ul className="text-slate-700 space-y-0.5 text-sm">
        <li>Land: <strong>{formatCurrency(costs.landCost)}</strong></li>
        <li>Hard construction: <strong>{formatCurrency(costs.hardCosts)}</strong></li>

        {costs.hardCostContingency > 0 && (
          <li>
            Hard cost contingency: <strong>{formatCurrency(costs.hardCostContingency)}</strong>
          </li>
        )}

        <li>Soft costs: <strong>{formatCurrency(costs.softCosts)}</strong></li>

        {costs.softCostContingency > 0 && (
          <li>
            Soft cost contingency: <strong>{formatCurrency(costs.softCostContingency)}</strong>
          </li>
        )}

        {costs.developmentFees > 0 && (
          <li>
            Development fees: <strong>{formatCurrency(costs.developmentFees)}</strong>
          </li>
        )}

        {costs.financingCosts > 0 && (
          <li>
            Financing costs: <strong>{formatCurrency(costs.financingCosts)}</strong>
          </li>
        )}

        {costs.reserves > 0 && (
          <li>
            Reserves (capitalized): <strong>{formatCurrency(costs.reserves)}</strong>
          </li>
        )}

        <li className="pt-1 border-t border-slate-200">
          <strong>Total uses:</strong> {formatCurrency(costs.totalDevelopmentCost)}
        </li>
      </ul>
    </SectionBlock>
  );
}

// ---- ProFormaSection -------------------------------------------------------

/** Props consumed by ProFormaSection. */
interface ProFormaSectionProps {
  output: TdceOutput;
  financials: TdceInput['financials'];
  operations: TdceInput['operations'];
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

/**
 * Renders the "Operating pro forma summary (stabilized)" section block.
 *
 * Walks through the NOI waterfall (gross rents → vacancy → EGI → OpEx →
 * replacement reserves → NOI → debt service → residual), then optionally
 * shows a patient capital return calculation and a projected year-N value.
 */
function ProFormaSection({
  output,
  financials,
  operations,
  onEdit,
  isActive,
}: ProFormaSectionProps) {
  const da = resolveDebtAssumptions(output, operations);
  const annualDebtService = output.operations.annualDebtService;

  /**
   * Annual operating surplus = NOI − debt service.
   * Falls back to a direct calculation when the output field is absent.
   */
  const surplus =
    output.operations.annualOperatingSurplus ??
    output.operations.noi - annualDebtService;

  /**
   * Total equity capital = funding gap + sponsor equity.
   * Used to size the patient capital return calculation.
   */
  const equityNeeded =
    (output.operations.fundingGap ?? 0) + (financials.sponsorEquity ?? 0);

  const targetReturnPct = operations.targetInvestorReturnPercent ?? 0;
  const equityReturnAmount = equityNeeded * (targetReturnPct / 100);
  const residualAfterEquity = surplus - equityReturnAmount;

  return (
    <SectionBlock
      id="pro-forma"
      title="6. Operating pro forma summary (stabilized)"
      onEdit={onEdit}
      isActive={isActive}
    >
      <div className="space-y-3">

        {/* Assumption legend */}
        <div className="rounded bg-slate-50 border border-slate-200 p-3 text-s text-slate-600 space-y-0.5">
          <p className="font-semibold text-slate-700 mb-1">Pro forma assumptions</p>
          <p>
            Vacancy:{' '}
            <strong>{formatPercent(operations.vacancyRate)}</strong> of gross rent
          </p>
          <p>
            Operating expenses:{' '}
            <strong>{formatPercent(operations.operatingExpenseRatio)}</strong> of EGI
            <span className="text-slate-400">
              {' '}
              (benchmark: 30–40%; includes mgmt, maintenance, insurance, property tax)
            </span>
          </p>
          <p>
            Debt service: NOI ÷{' '}
            <strong>{da.dscrTarget.toFixed(2)}x DSCR</strong>
            <span className="text-slate-400">
              {' '}
              — lender requires ${da.dscrTarget.toFixed(2)} of NOI per $1.00 of debt service
            </span>
          </p>
          <p>
            Loan sizing:{' '}
            <strong>
              {(da.interestRate * 100).toFixed(1)}% interest, {da.amortYears}-year amortization
            </strong>
            <span className="text-slate-400"> (CMHC MLI Select insured affordable)</span>
          </p>
        </div>

        {/* NOI waterfall */}
        <ul className="space-y-0.5 text-sm">
          {/* Gross potential rent */}
          <li className="text-emerald-700">
            Gross potential rental income (annual):{' '}
            <strong>{formatCurrency(output.income.grossPotentialRent)}</strong>
          </li>

          {/* Vacancy deduction */}
          <li className="text-red-700">
            Less vacancy ({formatPercent(operations.vacancyRate)}):{' '}
            <strong>
              ({formatCurrency(output.income.grossPotentialRent - output.income.effectiveGrossIncome)})
            </strong>
          </li>

          {/* EGI */}
          <li className="text-emerald-700 border-t border-slate-100 pt-0.5">
            Effective gross income (EGI):{' '}
            <strong>{formatCurrency(output.income.effectiveGrossIncome)}</strong>
          </li>

          {/* Operating expenses */}
          <li className="text-red-700">
            Less operating expenses ({formatPercent(operations.operatingExpenseRatio)} of EGI):{' '}
            <strong>({formatCurrency(output.operations.operatingExpenses)})</strong>
          </li>

          {/* Replacement reserves (only when non-zero) */}
          {output.operations.replacementReserves != null &&
            output.operations.replacementReserves > 0 && (
              <li className="text-red-700">
                Less replacement reserves (
                {operations.replacementReservePerUnitPerYear != null
                  ? `${formatCurrency(operations.replacementReservePerUnitPerYear)} per unit / year`
                  : 'replacement reserves'}
                ):{' '}
                <strong>({formatCurrency(output.operations.replacementReserves)})</strong>
              </li>
            )}

          {/* NOI */}
          <li className="text-emerald-700 border-t border-slate-100 pt-0.5 font-medium">
            Net operating income (NOI):{' '}
            <strong>{formatCurrency(output.operations.noi)}</strong>
          </li>

          {/* Debt service */}
          <li className="text-red-700">
            Less annual debt service (NOI ÷ {da.dscrTarget.toFixed(2)}x DSCR or fixed mortgage):{' '}
            <strong>({formatCurrency(annualDebtService)})</strong>
            <span className="text-s text-slate-400 ml-1">
              — supports {formatCurrency(output.operations.maxMortgage ?? 0)} loan @{' '}
              {(da.interestRate * 100).toFixed(1)}% / {da.amortYears}yr
            </span>
          </li>

          {/* Residual cash flow */}
          <li className="text-emerald-700 font-medium border-t border-slate-200 pt-1">
            Residual cash flow: <strong>{formatCurrency(surplus)}</strong>
            <span className="text-s text-slate-400 ml-1">
              — available for reserves, equity return, or reinvestment
            </span>
          </li>
        </ul>

        {/* Patient capital return (only when a target return and equity are provided) */}
        {targetReturnPct > 0 && equityNeeded > 0 && (
          <div className="border-t border-slate-200 pt-2 text-sm">
            <h4 className="font-semibold text-slate-800 mb-1">Patient capital return</h4>
            <p className="text-s text-slate-500 mb-2">
              Equity capital = funding gap + sponsor equity. Return is applied as a simple annual
              yield on that equity — not a leveraged IRR.
            </p>
            <ul className="space-y-0.5">
              <li>
                Equity capital (gap + sponsor):{' '}
                <strong>{formatCurrency(equityNeeded)}</strong>
              </li>
              <li>
                Target annual return ({targetReturnPct}% of equity):{' '}
                <strong>{formatCurrency(equityReturnAmount)}</strong>
              </li>
              <li
                className={`font-medium ${
                  residualAfterEquity >= 0 ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                Residual after equity return:{' '}
                <strong>{formatCurrency(residualAfterEquity)}</strong>
                {residualAfterEquity < 0 && (
                  <span className="text-s text-red-600 ml-1">
                    — NOI insufficient to support this return target
                  </span>
                )}
              </li>
            </ul>
          </div>
        )}

        {/* Cap rate and projected value notes */}
        <div className="border-t border-slate-200 pt-2 space-y-1.5">
          {output.operations.capRate > 0 && (
            <p className="text-s text-slate-500">
              Implied cap rate on cost:{' '}
              <strong>{(output.operations.capRate * 100).toFixed(2)}%</strong>
              <span className="text-slate-400"> (NOI ÷ TDC — unlevered yield on cost)</span>
            </p>
          )}

          {/* Projected stabilized value at end of analysis period */}
          {operations.analysisPeriodYears &&
            operations.analysisPeriodYears > 0 &&
            output.operations.projectedNoiAtEndOfPeriod != null &&
            output.operations.projectedNoiAtEndOfPeriod > 0 &&
            output.operations.projectedStabilizedValueAtEndOfPeriod != null &&
            output.operations.projectedStabilizedValueAtEndOfPeriod > 0 && (
              <p className="text-s text-slate-500">
                At year {operations.analysisPeriodYears}: projected NOI{' '}
                <strong>
                  {formatCurrency(output.operations.projectedNoiAtEndOfPeriod)}
                </strong>
                {operations.marketCapRate != null && operations.marketCapRate > 0 && (
                  <>
                    {' '}→ projected stabilized value{' '}
                    <strong>
                      {formatCurrency(output.operations.projectedStabilizedValueAtEndOfPeriod)}
                    </strong>{' '}
                    (using market cap rate {formatPercent(operations.marketCapRate)}).
                  </>
                )}
              </p>
            )}
        </div>
      </div>
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// TdceSheet — Main component
// ---------------------------------------------------------------------------

function LockedSummaryBlock({ id, title, subtitle, onEdit, isActive }: { id: TdceSectionId; title: string; subtitle: string; onEdit: (id: TdceSectionId) => void; isActive: boolean }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(id);
      }}
      className={`rounded-xl p-6 border-2 border-dashed border-gray-200 transition-all cursor-pointer mt-4 ${
        isActive ? 'ring-2 ring-red-500 bg-white border-transparent shadow-md' : 'bg-gray-50 hover:bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-400">
          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
        </svg>
        <div>
          <h3 className="text-lg font-bold text-gray-500">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * TdceSheet is the top-level render component for the TDCE document view.
 *
 * It assembles four letter-size pages:
 *   1. Project identification + built form
 *   2. Benchmarks & cost assumptions
 *   3. TDC summary + capital stack (sources)
 *   4. Financing uses + operating pro forma + scenario summary + footer
 *
 * @param input        - All user-supplied inputs for the estimate.
 * @param output       - Calculated outputs; null while inputs are incomplete.
 * @param onEditSection - Callback fired with the clicked section ID (or null
 *                        when the user clicks outside a section block).
 * @param activeSection - Highlights the corresponding section block.
 */
export function TdceSheet({ input, output, onEditSection, activeSection }: TdceSheetProps) {
  const { meta, physicals, financials, operations } = input;

  /**
   * Merge user-supplied affordability mix with the default values.
   * This ensures all three slices are always defined.
   */
  const affordability = input.affordabilityMix ?? DEFAULT_AFFORDABILITY_MIX;

  /**
   * Resolved gross square footage.  Prefers the area computed from the output
   * (which may incorporate unit-mix calculations) over raw physicals inputs.
   */
  const gsf =
    output?.areas?.resolvedGsf ??
    physicals.grossFloorAreaSqFt ??
    physicals.grossBuildableSqFt;

  /**
   * Resolved total unit count.  Same preference as gsf — output first.
   */
  const totalUnits = output?.areas?.resolvedTotalUnits ?? physicals.totalUnits;

  return (
    <div
      className="tdce-sheet flex flex-col items-center gap-6 md:gap-8 px-2 md:pb-12"
      style={{ background: 'transparent' }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* PAGE 1 — Project identification & built form                        */}
      {/* ------------------------------------------------------------------ */}
      <Page
        showHeader={false}
        estimatePrecisionClass={meta.estimatePrecisionClass}
        onClick={() => onEditSection(null)}
      >
        <ProjectSection
          meta={meta}
          onEdit={onEditSection}
          isActive={activeSection === 'project'}
        />
        <BuiltFormSection
          physicals={physicals}
          financials={financials}
          meta={meta}
          output={output}
          gsf={gsf}
          totalUnits={totalUnits}
          onEdit={onEditSection}
          isActive={activeSection === 'built-form'}
        />
      </Page>

      {/* ------------------------------------------------------------------ */}
      {/* PAGE 2 — Benchmarks & cost assumptions                              */}
      {/* ------------------------------------------------------------------ */}
      <Page showHeader={false} onClick={() => onEditSection(null)}>
        <BenchmarksSection
          input={input}
          output={output}
          gsf={gsf}
          totalUnits={totalUnits}
          onEdit={onEditSection}
          isActive={activeSection === 'benchmarks'}
        />
      </Page>

      {/* ------------------------------------------------------------------ */}
      {/* PAGE 3 — TDC summary + Capital stack                               */}
      {/* ------------------------------------------------------------------ */}
      <Page showHeader={false} onClick={() => onEditSection(null)}>
        {output ? (
          <TdcSummarySection
            output={output}
            financials={financials}
            meta={meta}
            gsf={gsf}
            onEdit={onEditSection}
            isActive={activeSection === 'tdc-summary'}
          />
        ) : (
          <LockedSummaryBlock
            id="tdc-summary"
            title="3. Total development cost summary"
            subtitle="Complete built form and cost inputs to see TDC summary."
            onEdit={onEditSection}
            isActive={activeSection === 'tdc-summary'}
          />
        )}

        {output ? (
          <FinancingSourcesSection
            output={output}
            financials={financials}
            operations={operations}
            onEdit={onEditSection}
            isActive={activeSection === 'financing-sources'}
          />
        ) : (
          <LockedSummaryBlock
            id="financing-sources"
            title="4. Capital stack – sources & uses"
            subtitle="Complete inputs to see capital stack."
            onEdit={onEditSection}
            isActive={activeSection === 'financing-sources'}
          />
        )}
      </Page>

      {/* ------------------------------------------------------------------ */}
      {/* PAGE 4 — Financing uses, Pro forma, Scenario summary, Footer        */}
      {/* ------------------------------------------------------------------ */}
      <Page showHeader={false} onClick={() => onEditSection(null)}>
        {output ? (
          <FinancingUsesSection
            output={output}
            onEdit={onEditSection}
            isActive={activeSection === 'financing-uses'}
          />
        ) : (
          <LockedSummaryBlock
            id="financing-uses"
            title="5. Financing structure – uses"
            subtitle="Complete inputs to see uses."
            onEdit={onEditSection}
            isActive={activeSection === 'financing-uses'}
          />
        )}

        {output ? (
          <ProFormaSection
            output={output}
            financials={financials}
            operations={operations}
            onEdit={onEditSection}
            isActive={activeSection === 'pro-forma'}
          />
        ) : (
          <LockedSummaryBlock
            id="pro-forma"
            title="6. Operating pro forma summary (stabilized)"
            subtitle="Complete inputs to see pro forma."
            onEdit={onEditSection}
            isActive={activeSection === 'pro-forma'}
          />
        )}

       {/* Scenario summary callout — only rendered when output is available */}
        {output && (
          <div className="mt-4 rounded-2xl border-2 border-slate-100 overflow-hidden shadow-lg transition-all">
            {/* Header bar - Using Anhart Dark Slate & Bold Typography */}
            <div className="bg-[#1a1a1a] px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white tracking-tight uppercase">
                Scenario Summary
              </h3>
              <span className="text-[14px] text-slate-400 font-bold bg-white/5 px-2 py-1 rounded-md border border-white/10">
                Class D Estimate ±30%
              </span>
            </div>

            {/* KPI row - High visibility fonts */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 bg-white">
              {/* Hard cost basis */}
              <div className="px-5 py-5 flex flex-col gap-1">
                <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Hard Cost Basis</span>
                <span className="text-2xl font-black text-slate-900 leading-none">
                  ${financials.hardCostPerSqFt}
                  <span className="text-s font-bold text-slate-400 ml-1">/sq ft</span>
                </span>
              </div>

              {/* TDC */}
              <div className="px-5 py-5 flex flex-col gap-1">
                <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Total Dev. Cost</span>
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {formatCurrency(output.costs.totalDevelopmentCost)}
                </span>
              </div>

              {/* Gap / surplus - Drapped in Anhart Brand Colors */}
              <div className="px-5 py-5 flex flex-col gap-1">
                <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">
                  {(output.operations.fundingGap ?? 0) <= 0 ? 'Surplus' : 'Funding Gap'}
                </span>
                <span className={`text-2xl font-black leading-none ${(output.operations.fundingGap ?? 0) <= 0 ? 'text-emerald-600' : 'text-[#e57373]'}`}>
                  {formatCurrency(Math.abs(output.operations.fundingGap ?? 0))}
                </span>
              </div>
            </div>

            {/* Status banner - Emotional signaling using brand accents */}
            <div className={`px-5 py-4 flex items-center gap-3 border-t ${(output.operations.fundingGap ?? 0) <= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
              <div className={`w-3 h-3 rounded-full shrink-0 animate-pulse ${(output.operations.fundingGap ?? 0) <= 0 ? 'bg-emerald-500' : 'bg-[#e57373]'}`} />
              <p className={`text-sm font-bold leading-tight ${(output.operations.fundingGap ?? 0) <= 0 ? 'text-emerald-900' : 'text-rose-900'}`}>
                {(output.operations.fundingGap ?? 0) <= 0
                  ? 'Gap filled — project viable at current assumptions via LP equity.'
                  : `Remaining gap of ${formatCurrency(output.operations.fundingGap ?? 0)} requires patient capital or additional grants.`}
              </p>
            </div>

            {/* CTA footer - Styled like the landing page "Connect With Us" button */}
            <div className="bg-slate-50 border-t border-slate-200 px-5 py-4 flex items-center justify-between">
              <p className="text-s font-medium text-slate-500">
                Interested in scaling affordable housing?
              </p>
              <div className="text-sm font-bold">
                Contact <span className="px-2 py-1 bg-[#e57373] text-white rounded-md ml-1 shadow-sm tracking-tighter">Anhart</span>
              </div>
            </div>
          </div>
        )}
      </Page>
    </div>
  );
}

export default TdceSheet;