'use client';

/**
 * @file TdceSheet.tsx
 * @description On-screen digest of the Total Development Cost Estimate (TDCE).
 */

import Image from 'next/image';
import type { TdceInput, TdceOutput } from '@/types/tdce';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  truncateTo1Decimal,
  getEffectiveSiteAreaSqFt,
} from '@/lib/tdce-calculator';
import {
  parseRegionBuildingId,
  getBaseHighForRegionBuilding,
  getUpliftBreakdown,
} from '@/data/constructionBenchmarks';
import { getBedroomLabel } from './UnitMixInput';

const SQFT_TO_M2 = 0.09290304;

const DEFAULT_AFFORDABILITY_MIX = {
  shelterPercent: 20,
  hilsPercent: 10,
  marketPercent: 70,
} as const;

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

interface TdceSheetProps {
  input: TdceInput;
  output: TdceOutput | null;
  onEditSection: (section: TdceSectionId) => void;
  activeSection: TdceSectionId;
}

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

function formatSqFtWithM2(sqFt: number): string {
  if (!sqFt && sqFt !== 0) return '—';
  const m2 = sqFt * SQFT_TO_M2;
  return `${formatNumber(sqFt)} sq ft (${m2.toFixed(1)} m²)`;
}

/** Two-column ledger row with optional dot leader, indent, total, and colour states. */
function Row({
  label,
  value,
  sub,
  indent = false,
  total = false,
  positive = false,
  negative = false,
  muted = false,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  sub?: React.ReactNode;
  indent?: boolean;
  total?: boolean;
  positive?: boolean;
  negative?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`
        flex items-baseline gap-2 py-1.5
        ${total ? 'border-t border-slate-200 mt-1 pt-2' : 'border-t border-slate-100/70'}
        ${indent ? 'pl-5' : ''}
      `}
    >
      <span
        className={`
          flex-1 min-w-0 leading-snug text-sm
          ${total ? 'font-semibold text-slate-800' : muted ? 'text-slate-600' : 'text-slate-700'}
        `}
      >
        {label}
      </span>
      <span className="hidden sm:block flex-shrink-0 border-b border-dotted border-slate-200 w-8 mb-[3px]" />
      <span
        className={`
          text-sm tabular-nums text-right font-medium shrink-0
          ${total ? 'font-bold text-slate-900' : ''}
          ${positive ? 'text-emerald-700' : ''}
          ${negative ? 'text-rose-600' : ''}
          ${muted ? 'text-slate-600' : ''}
          ${!total && !positive && !negative && !muted ? 'text-slate-800' : ''}
        `}
      >
        {value}
      </span>
      {sub && (
        <span className="text-xs text-slate-600 shrink-0 ml-0.5 font-normal">{sub}</span>
      )}
    </div>
  );
}

/** Inline micro-rule divider that separates sub-sections without competing with the section title. */
function SubHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3 mt-6 first:mt-0">
      <span className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-600 shrink-0 font-serif">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

/** Thin left-rule note block — replaces alert-style callout boxes. */
function Note({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-slate-200 pl-4 py-0.5 my-4 space-y-1">
      {label && (
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-600 mb-1.5 font-serif">
          {label}
        </p>
      )}
      <div className="text-sm text-slate-700 leading-relaxed space-y-1">{children}</div>
    </div>
  );
}

/** Spec grid — 2-column key/value display for metadata and assumptions. */
function SpecGrid({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
      {items.map(({ label, value }) => (
        <div key={label}>
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 mb-0.5 font-serif">
            {label}
          </p>
          <p className="text-sm text-slate-800 font-medium leading-snug">{value || '—'}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SectionBlock
// ---------------------------------------------------------------------------

interface SectionBlockProps {
  id: TdceSectionId;
  title: string;
  children: React.ReactNode;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

function SectionBlock({ id, title, children, onEdit, isActive }: SectionBlockProps) {
  const handleClick = (e: React.MouseEvent) => { e.stopPropagation(); onEdit(id); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') onEdit(id); };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative group cursor-pointer transition-all duration-150
        border-l-2 pl-6 py-5 mt-8 first:mt-2 min-h-[44px] touch-manipulation
        ${isActive ? 'border-red-400' : 'border-slate-200 hover:border-slate-300'}
      `}
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-600 font-serif">
          {title}
        </p>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-slate-600 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.158 3.71 3.71 1.159-1.158a2.625 2.625 0 000-3.71zm-2.925 5.158L15.096 3.717 4.26 14.553a5.25 5.25 0 00-1.425 2.59l-.82 3.692a.75.75 0 00.92.92l3.692-.82a5.25 5.25 0 002.59-1.425L18.806 7.427z" />
          </svg>
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface PageProps {
  children: React.ReactNode;
  showHeader: boolean;
  onClick: () => void;
  estimatePrecisionClass?: 'C' | 'D';
}

function Page({ children, showHeader, onClick, estimatePrecisionClass }: PageProps) {
  const precisionClass = estimatePrecisionClass ?? 'D';
  const isClassC = precisionClass === 'C';

  return (
    <div
      className="tdce-page relative bg-white flex flex-col overflow-hidden w-full min-w-0 min-h-[70vh] max-w-full"
      onClick={onClick}
      role="presentation"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
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

      <div className="relative z-10 flex flex-col flex-1 min-h-0 pt-6 pb-8 sm:px-8 md:pt-8 md:pb-10">
        {showHeader && (
          <header className="flex items-start justify-between gap-4 mb-8 pb-5 border-b border-slate-100 shrink-0">
            <Image
              src="/tdceAssets/anhart-logo-text.webp"
              alt="Anhart Affordable Housing"
              width={140}
              height={42}
              className="h-10 w-auto object-contain"
            />
            <div className="text-right">
              <p className="text-sm font-semibold tracking-[0.14em] uppercase text-slate-700">
                {isClassC ? 'Class C' : 'Class D'} Estimate &nbsp;{isClassC ? '±15%' : '±30%'}
              </p>
              <p className="text-sm text-slate-600 mt-0.5">Subject to Change</p>
            </div>
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
// ProjectSection
// ---------------------------------------------------------------------------

interface ProjectSectionProps {
  meta: TdceInput['meta'];
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

function ProjectSection({ meta, onEdit, isActive }: ProjectSectionProps) {
  const locationParts = [meta.address, meta.city, meta.province].filter(Boolean).join(', ');

  return (
    <SectionBlock id="project" title="Project Identification" onEdit={onEdit} isActive={isActive}>
      <SpecGrid
        items={[
          {
            label: 'Project Title',
            value: meta.projectTitle
              ? `${meta.projectTitle}${meta.scenarioName ? ` — ${meta.scenarioName}` : ''}`
              : '—',
          },
          { label: 'Location', value: locationParts || '—' },
          { label: 'Cost Benchmark', value: 'Altus Group Canadian Cost Guide' },
          { label: 'Contact', value: meta.contactName || '—' },
          { label: 'Email', value: meta.contactEmail || '—' },
        ]}
      />

      {meta.description && (
        <>
          <SubHeading label="Notes" />
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words max-h-36 overflow-y-auto">
            {meta.description}
          </div>
        </>
      )}
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// BuiltFormSection
// ---------------------------------------------------------------------------

interface BuiltFormSectionProps {
  physicals: TdceInput['physicals'];
  financials: TdceInput['financials'];
  meta: TdceInput['meta'];
  output: TdceOutput | null;
  gsf: number | undefined;
  totalUnits: number | undefined;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

function BuiltFormSection({
  physicals, financials, meta, output, gsf, totalUnits, onEdit, isActive,
}: BuiltFormSectionProps) {
  const hasCommercial = (financials.commercialSqFt ?? 0) > 0;
  const hasDimensions =
    physicals.siteDimensionsLengthFt != null &&
    physicals.siteDimensionsWidthFt != null &&
    physicals.siteDimensionsLengthFt > 0 &&
    physicals.siteDimensionsWidthFt > 0;

  const fsrDisplay = (): string => {
    if (output?.areas?.floorSpaceRatio == null) return '—';
    let result = output.areas.floorSpaceRatio.toFixed(1);
    if (hasCommercial) {
      if (output.areas.residentialFSR != null) result += ` res. ${output.areas.residentialFSR.toFixed(2)}`;
      if (output.areas.commercialFSR != null) result += `, comm. ${output.areas.commercialFSR.toFixed(2)}`;
    }
    return result;
  };

  const effectiveSiteArea = getEffectiveSiteAreaSqFt(physicals);
  const specItems: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Site Area',
      value: effectiveSiteArea > 0 ? formatSqFtWithM2(effectiveSiteArea) : '—',
    },
    ...(hasDimensions
      ? [{ label: 'Site Dimensions', value: `${physicals.siteDimensionsLengthFt} ft × ${physicals.siteDimensionsWidthFt} ft` }]
      : []),
    ...((meta.zoning || meta.zoningNote)
      ? [{
          label: 'Zoning',
          value: meta.zoning && meta.zoningNote
            ? `${meta.zoning} (${meta.zoningNote})`
            : meta.zoning || meta.zoningNote,
        }]
      : []),
    { label: 'Gross Floor Area', value: gsf ? `${formatNumber(Math.round(gsf))} sq ft` : '—' },
    {
      label: 'Net Residential Area',
      value: output?.income?.residentialNetRentableArea != null
        ? `${formatNumber(Math.round(output.income.residentialNetRentableArea))} sq ft (${physicals.efficiencyRatio != null ? Math.round((physicals.efficiencyRatio ?? 0) * 100) : '—'}%)`
        : '—',
    },
    ...(hasCommercial
      ? [{ label: 'Commercial Area', value: `${formatNumber(financials.commercialSqFt)} sq ft` }]
      : []),
    { label: 'Total Units', value: totalUnits ? `${totalUnits} residential` : '—' },
    { label: 'Density (FSR)', value: fsrDisplay() },
  ];

  return (
    <SectionBlock id="built-form" title="1. Development Summary & Built Form" onEdit={onEdit} isActive={isActive}>
      <SpecGrid items={specItems} />

      {physicals.unitMix && physicals.unitMix.length > 0 && (
        <>
          <SubHeading label="Unit Mix" />
          <div className="space-y-0">
            {[...physicals.unitMix]
              .sort((a, b) => a.bedrooms - b.bedrooms)
              .map((unit, i) => (
                <Row
                  key={i}
                  label={
                    <span>
                      {getBedroomLabel(unit.bedrooms)}
                      {(unit.affordableCount ?? 0) > 0 && (
                        <span className="text-slate-600 font-normal ml-1.5">
                          ({unit.affordableCount} affordable)
                        </span>
                      )}
                    </span>
                  }
                  value={`${unit.count} units`}
                />
              ))}
            {(() => {
              const totalDeclared = physicals.unitMix.reduce(
                (sum, unit) => sum + unit.count * (unit.sqFtPerUnit ?? 0), 0
              );
              const totalCount = physicals.unitMix.reduce((s, u) => s + u.count, 0);
              return totalDeclared > 0 ? (
                <Row
                  label="Net residential declared"
                  value={`${formatNumber(Math.round(totalDeclared))} sq ft`}
                  sub={`avg ${formatNumber(Math.round(totalDeclared / totalCount))} sf/unit`}
                  total
                />
              ) : null;
            })()}
          </div>
        </>
      )}
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// BenchmarksSection
// ---------------------------------------------------------------------------

interface BenchmarksSectionProps {
  input: TdceInput;
  output: TdceOutput | null;
  gsf: number | undefined;
  totalUnits: number | undefined;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

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
  return getUpliftBreakdown(getBaseHighForRegionBuilding(parsed.region, parsed.buildingType), uplifts);
}

function BenchmarksSection({ input, output, gsf, onEdit, isActive }: BenchmarksSectionProps) {
  const { physicals, financials, operations, meta } = input;
  const breakdown = resolveUpliftBreakdown(financials);

  const uniqueBedroomTypes: number[] =
    physicals.unitMix && physicals.unitMix.length > 0
      ? [...new Set(physicals.unitMix.map((u) => u.bedrooms))].sort((a, b) => a - b)
      : [0, 1, 2];

  const bedroomLabel = (b: number) => (b === 0 ? 'Studio' : b === 1 ? '1-Bedroom' : `${b}-Bedroom`);

  const sqFtForBedrooms = (bedrooms: number): number => {
    const fromMix = physicals.unitMix?.find((u) => u.bedrooms === bedrooms)?.sqFtPerUnit;
    if (fromMix != null && fromMix > 0) return fromMix;
    if (bedrooms === 0) return physicals.sizeStudio ?? 0;
    if (bedrooms === 1) return physicals.size1Bed ?? 0;
    return physicals.size2Bed ?? 0;
  };

  return (
    <SectionBlock id="benchmarks" title="2. Benchmarks & Cost Assumptions" onEdit={onEdit} isActive={isActive}>

      {/* Construction Cost */}
      <SubHeading label="Construction Cost" />
      <SpecGrid
        items={[
          { label: 'Benchmark Source', value: 'Altus Group Canadian Cost Guide' },
          {
            label: 'Applied Rate',
            value: financials.hardCostPerSqFt ? `$${financials.hardCostPerSqFt} / sq ft (GFA)` : '—',
          },
          ...(financials.softCostPercent != null
            ? [{ label: 'Soft Cost Rate', value: formatPercent(financials.softCostPercent) + ' of hard costs' }]
            : []),
          ...(financials.buildingPermitIssued
            ? [{ label: 'Permit Status', value: 'Building permit issued' }]
            : []),
        ]}
      />

      {breakdown && (
        <Note label="Uplift Build-up">
          <p>
            Base ${breakdown.base}/sf
            {breakdown.hasEscalation && <> → <strong>${breakdown.afterEscalation}</strong> after escalation ({financials.escalationUpliftPercent}%)</>}
            {breakdown.hasComplexity && <> → <strong>${breakdown.afterComplexity}</strong> after complexity ({financials.complexityUpliftPercent}%)</>}
            {' '}→ <strong>${breakdown.final}/sf applied</strong>
          </p>
        </Note>
      )}

      {output?.costs && gsf && gsf > 0 && (
        <div className="mt-2">
          <Row
            label={`Hard cost estimate (${formatNumber(Math.round(gsf))} sf × $${financials.hardCostPerSqFt}/sf)`}
            value={formatCurrency(output.costs.hardCosts)}
          />
        </div>
      )}

      {meta.costAssumptionNote && (
        <Note>
          <p>{meta.costAssumptionNote}</p>
        </Note>
      )}

      {/* Operating Expenses */}
      <SubHeading label="Operating Expenses" />
      <SpecGrid
        items={[
          {
            label: 'Applied Rate',
            value: formatPercent(operations.operatingExpenseRatio ?? 0.35) + ' of EGI',
          },
          { label: 'DSCR Target', value: (operations.dscrTarget != null && operations.dscrTarget > 0 ? operations.dscrTarget : 1.2).toFixed(2) + 'x' },
        ]}
      />

      {/* Rent Assumptions */}
      <SubHeading label="Rent Assumptions" />
      <div className="space-y-0">
        {uniqueBedroomTypes.map((bedrooms) => {
          if (operations.rentIncomeSource === 'market_by_unit') {
            const rent =
              bedrooms === 0 ? operations.marketRentStudio
              : bedrooms === 1 ? operations.marketRent1Bed
              : bedrooms === 2 ? operations.marketRent2Bed
              : bedrooms === 3 ? operations.marketRent3Bed
              : bedrooms === 4 ? operations.marketRent4Bed
              : undefined;
            return (
              <Row
                key={bedrooms}
                label={bedroomLabel(bedrooms)}
                value={rent != null && rent >= 0 ? `$${formatNumber(rent, 1)} / mo` : '—'}
              />
            );
          } else {
            const rate = operations.residentialRentPerSqFt ?? 0;
            const sqFt = sqFtForBedrooms(bedrooms);
            const rentPerMonth = rate > 0 && sqFt > 0 ? sqFt * rate : 0;
            return (
              <Row
                key={bedrooms}
                label={bedroomLabel(bedrooms)}
                value={rentPerMonth > 0 ? `$${formatNumber(truncateTo1Decimal(rentPerMonth), 1)} / mo` : '—'}
                sub={rate > 0 && sqFt > 0 ? `${formatNumber(sqFt, 1)} sf × $${formatNumber(rate, 1)}/sf` : undefined}
              />
            );
          }
        })}
      </div>

      {/* Reference Benchmarks */}
      <SubHeading label="Reference Benchmarks — Other Projects" />
      <p className="text-sm text-slate-600 mb-3">
        Comparison by building type for context. Not applied to this estimate.
      </p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2 pr-4 text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 font-serif">Metric</th>
            <th className="text-right py-2 px-3 text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 font-serif">Mid-Rise</th>
            <th className="text-right py-2 px-3 text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 font-serif">Low-Rise</th>
            <th className="text-right py-2 pl-3 text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 font-serif">Purpose-Built</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'Hard cost / SF', values: ['$300', '$245', '$225'] },
            { label: 'Soft cost %', values: ['18%', '20%', '20%'] },
            { label: 'OpEx % of EGI', values: ['35%', '32%', '30%'] },
            { label: 'TDC per unit', values: ['$276,638', '$277,250', '~$266,200'] },
          ].map((row) => (
            <tr key={row.label} className="border-b border-slate-100">
              <td className="py-2 pr-4 text-slate-700">{row.label}</td>
              {row.values.map((v, i) => (
                <td key={i} className="py-2 px-3 text-right tabular-nums text-slate-800 font-medium last:pl-3 last:pr-0">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// TdcSummarySection
// ---------------------------------------------------------------------------

interface TdcSummarySectionProps {
  output: TdceOutput;
  financials: TdceInput['financials'];
  meta: TdceInput['meta'];
  gsf: number | undefined;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

function TdcSummarySection({ output, financials, meta, gsf, onEdit, isActive }: TdcSummarySectionProps) {
  const tdc = output.costs.totalDevelopmentCost;
  const pct = (v: number) => tdc > 0 ? `${((v / tdc) * 100).toFixed(1)}%` : undefined;

  return (
    <SectionBlock id="tdc-summary" title="3. Total Development Cost Summary" onEdit={onEdit} isActive={isActive}>

      <SubHeading label="Cost Line Items" />
      <div className="space-y-0">
        <Row label="Land value" value={formatCurrency(output.costs.landCost)} sub={pct(output.costs.landCost)} />
        <Row
          label={`Hard construction — ${formatNumber(Math.round(gsf ?? 0))} sf × $${financials.hardCostPerSqFt}/sf`}
          value={formatCurrency(output.costs.hardCosts)}
          sub={pct(output.costs.hardCosts)}
        />
        {output.costs.hardCostContingency > 0 && (
          <Row label="Hard cost contingency" value={formatCurrency(output.costs.hardCostContingency)} sub={pct(output.costs.hardCostContingency)} indent />
        )}
        <Row
          label={`Soft costs — ${formatPercent(financials.softCostPercent)} of hard`}
          value={formatCurrency(output.costs.softCosts)}
          sub={pct(output.costs.softCosts)}
        />
        {output.costs.softCostContingency > 0 && (
          <Row label="Soft cost contingency" value={formatCurrency(output.costs.softCostContingency)} sub={pct(output.costs.softCostContingency)} indent />
        )}
        {output.costs.developmentFees > 0 && (
          <Row label="Development fees" value={formatCurrency(output.costs.developmentFees)} sub={pct(output.costs.developmentFees)} />
        )}
        {output.costs.financingCosts > 0 && (
          <Row label="Financing costs" value={formatCurrency(output.costs.financingCosts)} sub={pct(output.costs.financingCosts)} />
        )}
        {output.costs.reserves > 0 && (
          <Row label="Reserves (capitalized)" value={formatCurrency(output.costs.reserves)} sub={pct(output.costs.reserves)} />
        )}
        <Row
          label={`Total development cost — ${meta.estimatePrecisionClass === 'C' ? 'Class C ±15%' : 'Class D ±30%'}`}
          value={formatCurrency(tdc)}
          total
        />
      </div>

      <SubHeading label="Key Metrics" />
      <div className="space-y-0">
        <Row label="TDC per unit" value={`≈ ${formatCurrency(output.costMetrics.costPerUnit)}`} />
        <Row label="TDC per gross sq ft" value={`≈ ${formatCurrency(output.costMetrics.costPerSqFt)}`} />
        <Row label="Hard cost per residential SF" value={`≈ ${formatCurrency(output.costMetrics.hardCostPerResidentialSqFt)}`} />
        <Row label="Hard cost per buildable SF" value={`≈ ${formatCurrency(output.costMetrics.hardCostPerGsf)}`} />
      </div>
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// resolveDebtAssumptions (shared)
// ---------------------------------------------------------------------------

function resolveDebtAssumptions(output: TdceOutput, operations: TdceInput['operations']) {
  const da = (output.operations as any).debtAssumptions;
  return {
    interestRate: da?.interestRate ?? operations.interestRate ?? 0.049,
    amortYears: da?.amortYears ?? operations.amortizationYears ?? 40,
    dscrTarget: da?.dscrTarget ?? operations.dscrTarget ?? 1.1,
    program: da?.program ?? 'CMHC MLI Select (insured affordable)',
    debtConst: da?.debtConst ?? 0,
  };
}

// ---------------------------------------------------------------------------
// FinancingSourcesSection
// ---------------------------------------------------------------------------

interface FinancingSourcesSectionProps {
  output: TdceOutput;
  financials: TdceInput['financials'];
  operations: TdceInput['operations'];
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

function FinancingSourcesSection({ output, financials, operations, onEdit, isActive }: FinancingSourcesSectionProps) {
  const da = resolveDebtAssumptions(output, operations);
  const grants = financials.grants ?? [];
  const totalGrants = grants.reduce((sum, g) => sum + (g.amount ?? 0), 0);
  const sponsorEquity = financials.sponsorEquity ?? 0;
  const totalIdentified = totalGrants + sponsorEquity;
  const tdc = output.costs.totalDevelopmentCost;
  const maxMortgage = output.operations.maxMortgage ?? 0;
  const gap = output.operations.fundingGap ?? tdc - maxMortgage - totalIdentified;
  const balanced = Math.abs(gap) < 1;

  return (
    <SectionBlock id="financing-sources" title="4. Capital Stack — Sources & Uses" onEdit={onEdit} isActive={isActive}>

      <Note label="Debt Sizing Methodology">
        <p>
          Max loan sized by DSCR: <strong>NOI ÷ {da.dscrTarget.toFixed(2)}x</strong> = max annual debt service,
          converted via mortgage constant at <strong>{(da.interestRate * 100).toFixed(1)}% / {da.amortYears}yr</strong>.
        </p>
        <p>Program: <strong>{da.program}</strong>. Conventional (~7%, 25yr) produces a smaller loan.</p>
        <p className="text-slate-600">
          Debt constant {(da.debtConst * 100).toFixed(3)}% → every $1 debt service supports ≈$
          {da.debtConst > 0 ? Math.round(1 / da.debtConst).toLocaleString('en-CA') : '—'} of loan.
        </p>
      </Note>

      <SubHeading label="Sources" />
      <div className="space-y-0">
        <Row
          label="First mortgage (CMHC MLI Select)"
          value={formatCurrency(maxMortgage)}
          sub={
            da.debtConst > 0
              ? `NOI ${formatCurrency(output.operations.noi)} ÷ ${da.dscrTarget.toFixed(2)}x ÷ ${(da.debtConst * 100).toFixed(3)}%`
              : undefined
          }
        />
        {grants.length > 0 ? (
          grants.map((grant, i) => (
            <Row
              key={i}
              label={`${grant.name || 'Grant'}${grant.status ? ` (${grant.status})` : ''}`}
              value={formatCurrency(grant.amount)}
            />
          ))
        ) : (
          <Row label="Grants" value="None entered" muted />
        )}
        {sponsorEquity > 0 && (
          <Row label="Sponsor equity" value={formatCurrency(sponsorEquity)} />
        )}
        <Row label="Total identified (excl. mortgage)" value={formatCurrency(totalIdentified)} total />
        <Row label="Total identified (incl. mortgage)" value={formatCurrency(totalIdentified + maxMortgage)} />
      </div>

      <SubHeading label="Uses" />
      <div className="space-y-0">
        <Row label="Total development cost" value={formatCurrency(tdc)} total />
      </div>

      <SubHeading label="Gap Analysis" />
      <div
        className={`mt-2 border-l-2 pl-4 py-2 space-y-1 ${
          balanced ? 'border-emerald-400' : gap > 0 ? 'border-amber-400' : 'border-slate-300'
        }`}
      >
        {balanced ? (
          <p className="text-sm font-semibold text-emerald-700">Fully funded — sources cover TDC.</p>
        ) : gap > 0 ? (
          <>
            <p className="text-sm font-semibold text-amber-700">
              Funding gap: <span className="font-bold">{formatCurrency(gap)}</span>
            </p>
            <p className="text-sm text-slate-700">
              TDC {formatCurrency(tdc)} − mortgage {formatCurrency(maxMortgage)}
              {totalGrants > 0 ? ` − grants ${formatCurrency(totalGrants)}` : ''}
              {sponsorEquity > 0 ? ` − equity ${formatCurrency(sponsorEquity)}` : ''}
            </p>
            <p className="text-sm text-slate-600">
              Typically filled by patient equity, municipal land, BC Housing capital, or CMHC seed funding.
            </p>
          </>
        ) : (
          <p className="text-sm font-semibold text-slate-700">
            Surplus: <span className="font-bold">{formatCurrency(Math.abs(gap))}</span>
          </p>
        )}
      </div>

      <p className="text-sm text-slate-600 mt-4 pt-3 border-t border-slate-100">
        Class D estimate (±30%). Debt sizing indicative only — actual proceeds depend on lender underwriting, LTV limits, and CMHC score.
      </p>
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// FinancingUsesSection
// ---------------------------------------------------------------------------

interface FinancingUsesSectionProps {
  output: TdceOutput;
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

function FinancingUsesSection({ output, onEdit, isActive }: FinancingUsesSectionProps) {
  const { costs } = output;

  return (
    <SectionBlock id="financing-uses" title="5. Financing Structure — Uses" onEdit={onEdit} isActive={isActive}>
      <div className="space-y-0">
        <Row label="Land" value={formatCurrency(costs.landCost)} />
        <Row label="Hard construction" value={formatCurrency(costs.hardCosts)} />
        {costs.hardCostContingency > 0 && (
          <Row label="Hard cost contingency" value={formatCurrency(costs.hardCostContingency)} indent />
        )}
        <Row label="Soft costs" value={formatCurrency(costs.softCosts)} />
        {costs.softCostContingency > 0 && (
          <Row label="Soft cost contingency" value={formatCurrency(costs.softCostContingency)} indent />
        )}
        {costs.developmentFees > 0 && (
          <Row label="Development fees" value={formatCurrency(costs.developmentFees)} />
        )}
        {costs.financingCosts > 0 && (
          <Row label="Financing costs" value={formatCurrency(costs.financingCosts)} />
        )}
        {costs.reserves > 0 && (
          <Row label="Reserves (capitalized)" value={formatCurrency(costs.reserves)} />
        )}
        <Row label="Total uses" value={formatCurrency(costs.totalDevelopmentCost)} total />
      </div>
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// ProFormaSection
// ---------------------------------------------------------------------------

interface ProFormaSectionProps {
  output: TdceOutput;
  financials: TdceInput['financials'];
  operations: TdceInput['operations'];
  onEdit: (id: TdceSectionId) => void;
  isActive: boolean;
}

function ProFormaSection({ output, financials, operations, onEdit, isActive }: ProFormaSectionProps) {
  const da = resolveDebtAssumptions(output, operations);
  const annualDebtService = output.operations.annualDebtService;
  const surplus = output.operations.annualOperatingSurplus ?? output.operations.noi - annualDebtService;
  const equityNeeded = (output.operations.fundingGap ?? 0) + (financials.sponsorEquity ?? 0);
  const targetReturnPct = operations.targetInvestorReturnPercent ?? 0;
  const equityReturnAmount = equityNeeded * (targetReturnPct / 100);
  const residualAfterEquity = surplus - equityReturnAmount;

  return (
    <SectionBlock id="pro-forma" title="6. Operating Pro Forma — Stabilized" onEdit={onEdit} isActive={isActive}>

      <Note label="Assumptions">
        <p>Vacancy <strong>{formatPercent(operations.vacancyRate)}</strong> of gross rent &nbsp;·&nbsp; OpEx <strong>{formatPercent(operations.operatingExpenseRatio)}</strong> of EGI &nbsp;·&nbsp; DSCR <strong>{da.dscrTarget.toFixed(2)}x</strong></p>
        <p>Loan: <strong>{(da.interestRate * 100).toFixed(1)}% interest, {da.amortYears}-year amortization</strong> (CMHC MLI Select insured)</p>
      </Note>

      <SubHeading label="NOI Waterfall" />
      <div className="font-mono space-y-0">
        <Row
          label="Gross potential rental income"
          value={formatCurrency(output.income.grossPotentialRent)}
          positive
        />
        <Row
          label={`Vacancy & credit loss (${formatPercent(operations.vacancyRate)})`}
          value={`(${formatCurrency(output.income.grossPotentialRent - output.income.effectiveGrossIncome)})`}
          indent
          negative
        />
        <Row
          label="Effective gross income (EGI)"
          value={formatCurrency(output.income.effectiveGrossIncome)}
          total
          positive
        />
        <Row
          label={`Operating expenses (${formatPercent(operations.operatingExpenseRatio)} of EGI)`}
          value={`(${formatCurrency(output.operations.operatingExpenses)})`}
          indent
          negative
        />
        {output.operations.replacementReserves != null && output.operations.replacementReserves > 0 && (
          <Row
            label={`Replacement reserves${operations.replacementReservePerUnitPerYear != null ? ` (${formatCurrency(operations.replacementReservePerUnitPerYear)}/unit/yr)` : ''}`}
            value={`(${formatCurrency(output.operations.replacementReserves)})`}
            indent
            negative
          />
        )}
        <Row
          label="Net operating income (NOI)"
          value={formatCurrency(output.operations.noi)}
          total
          positive
        />
        <Row
          label={`Annual debt service (NOI ÷ ${da.dscrTarget.toFixed(2)}x DSCR)`}
          value={`(${formatCurrency(annualDebtService)})`}
          indent
          negative
          sub={`supports ${formatCurrency(output.operations.maxMortgage ?? 0)} loan @ ${(da.interestRate * 100).toFixed(1)}% / ${da.amortYears}yr`}
        />
        <Row
          label="Residual cash flow"
          value={formatCurrency(surplus)}
          total
          positive={surplus >= 0}
          negative={surplus < 0}
        />
      </div>

      {targetReturnPct > 0 && equityNeeded > 0 && (
        <>
          <SubHeading label="Patient Capital Return" />
          <p className="text-sm text-slate-600 mb-2">
            Simple annual yield on equity (gap + sponsor) — not a leveraged IRR.
          </p>
          <div className="space-y-0">
            <Row label="Equity capital (gap + sponsor)" value={formatCurrency(equityNeeded)} />
            <Row label={`Target annual return (${targetReturnPct}%)`} value={formatCurrency(equityReturnAmount)} />
            <Row
              label="Residual after equity return"
              value={formatCurrency(residualAfterEquity)}
              total
              positive={residualAfterEquity >= 0}
              negative={residualAfterEquity < 0}
            />
          </div>
          {residualAfterEquity < 0 && (
            <Note>
              <p className="text-rose-500">NOI is insufficient to support this return target at current assumptions.</p>
            </Note>
          )}
        </>
      )}

      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
        {output.operations.capRate > 0 && (
          <p className="text-sm text-slate-700">
            Implied cap rate on cost: <strong>{(output.operations.capRate * 100).toFixed(2)}%</strong>
            <span className="text-slate-600"> (NOI ÷ TDC — unlevered yield)</span>
          </p>
        )}
        {operations.analysisPeriodYears &&
          operations.analysisPeriodYears > 0 &&
          output.operations.projectedNoiAtEndOfPeriod != null &&
          output.operations.projectedNoiAtEndOfPeriod > 0 &&
          output.operations.projectedStabilizedValueAtEndOfPeriod != null &&
          output.operations.projectedStabilizedValueAtEndOfPeriod > 0 && (
            <p className="text-sm text-slate-700">
              Year {operations.analysisPeriodYears}: projected NOI{' '}
              <strong>{formatCurrency(output.operations.projectedNoiAtEndOfPeriod)}</strong>
              {operations.marketCapRate != null && operations.marketCapRate > 0 && (
                <> → stabilized value <strong>{formatCurrency(output.operations.projectedStabilizedValueAtEndOfPeriod)}</strong>{' '}
                  at {formatPercent(operations.marketCapRate)} cap rate</>
              )}
            </p>
          )}
      </div>
    </SectionBlock>
  );
}

// ---------------------------------------------------------------------------
// LockedSummaryBlock
// ---------------------------------------------------------------------------

function LockedSummaryBlock({ id, title, subtitle, onEdit, isActive }: {
  id: TdceSectionId; title: string; subtitle: string;
  onEdit: (id: TdceSectionId) => void; isActive: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); onEdit(id); }}
      className={`
        border-l-2 pl-6 py-5 mt-8 cursor-pointer transition-all
        ${isActive ? 'border-red-300' : 'border-dashed border-slate-200 hover:border-slate-300'}
      `}
    >
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-slate-300 shrink-0">
          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-600 font-serif">{title}</p>
          <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TdceSheet
// ---------------------------------------------------------------------------

export function TdceSheet({ input, output, onEditSection, activeSection }: TdceSheetProps) {
  const { meta, physicals, financials, operations } = input;
  const affordability = input.affordabilityMix ?? DEFAULT_AFFORDABILITY_MIX;

  const gsf =
    output?.areas?.resolvedGsf ??
    physicals.grossFloorAreaSqFt ??
    physicals.grossBuildableSqFt;

  const totalUnits = output?.areas?.resolvedTotalUnits ?? physicals.totalUnits;

  return (
    <div
      className="tdce-sheet flex flex-col items-center gap-6 md:gap-8 px-2 md:pb-12 font-sans"
      style={{ background: 'transparent' }}
    >
      {/* PAGE 1 */}
      <Page showHeader={false} estimatePrecisionClass={meta.estimatePrecisionClass} onClick={() => onEditSection(null)}>
        <ProjectSection meta={meta} onEdit={onEditSection} isActive={activeSection === 'project'} />
        <BuiltFormSection physicals={physicals} financials={financials} meta={meta} output={output} gsf={gsf} totalUnits={totalUnits} onEdit={onEditSection} isActive={activeSection === 'built-form'} />
      </Page>

      {/* PAGE 2 */}
      <Page showHeader={false} onClick={() => onEditSection(null)}>
        <BenchmarksSection input={input} output={output} gsf={gsf} totalUnits={totalUnits} onEdit={onEditSection} isActive={activeSection === 'benchmarks'} />
      </Page>

      {/* PAGE 3 */}
      <Page showHeader={false} onClick={() => onEditSection(null)}>
        {output ? (
          <TdcSummarySection output={output} financials={financials} meta={meta} gsf={gsf} onEdit={onEditSection} isActive={activeSection === 'tdc-summary'} />
        ) : (
          <LockedSummaryBlock id="tdc-summary" title="3. Total Development Cost Summary" subtitle="Complete built form and cost inputs to unlock." onEdit={onEditSection} isActive={activeSection === 'tdc-summary'} />
        )}
        {output ? (
          <FinancingSourcesSection output={output} financials={financials} operations={operations} onEdit={onEditSection} isActive={activeSection === 'financing-sources'} />
        ) : (
          <LockedSummaryBlock id="financing-sources" title="4. Capital Stack — Sources & Uses" subtitle="Complete inputs to unlock." onEdit={onEditSection} isActive={activeSection === 'financing-sources'} />
        )}
      </Page>

      {/* PAGE 4 */}
      <Page showHeader={false} onClick={() => onEditSection(null)}>
        {output ? (
          <FinancingUsesSection output={output} onEdit={onEditSection} isActive={activeSection === 'financing-uses'} />
        ) : (
          <LockedSummaryBlock id="financing-uses" title="5. Financing Structure — Uses" subtitle="Complete inputs to unlock." onEdit={onEditSection} isActive={activeSection === 'financing-uses'} />
        )}
        {output ? (
          <ProFormaSection output={output} financials={financials} operations={operations} onEdit={onEditSection} isActive={activeSection === 'pro-forma'} />
        ) : (
          <LockedSummaryBlock id="pro-forma" title="6. Operating Pro Forma — Stabilized" subtitle="Complete inputs to unlock." onEdit={onEditSection} isActive={activeSection === 'pro-forma'} />
        )}

        {/* Scenario Summary */}
        {output && (
          <div className="mt-10 border-t-2 border-slate-900 pt-6">
            <div className="flex items-baseline justify-between mb-5">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-600 font-serif">Scenario Summary</p>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 font-serif">Class D ±30%</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 mb-1.5 font-serif">Hard Cost Basis</p>
                <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
                  ${financials.hardCostPerSqFt}
                  <span className="text-sm font-normal text-slate-600 ml-1">/sf</span>
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 mb-1.5 font-serif">Total Dev. Cost</p>
                <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none">
                  {formatCurrency(output.costs.totalDevelopmentCost)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 mb-1.5 font-serif">
                  {(output.operations.fundingGap ?? 0) <= 0 ? 'Surplus' : 'Funding Gap'}
                </p>
                <p className={`text-2xl font-bold tabular-nums leading-none ${(output.operations.fundingGap ?? 0) <= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {formatCurrency(Math.abs(output.operations.fundingGap ?? 0))}
                </p>
              </div>
            </div>

            <div className={`border-l-2 pl-4 py-1 ${(output.operations.fundingGap ?? 0) <= 0 ? 'border-emerald-400' : 'border-rose-400'}`}>
              <p className={`text-sm font-semibold ${(output.operations.fundingGap ?? 0) <= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {(output.operations.fundingGap ?? 0) <= 0
                  ? 'Gap filled — project viable at current assumptions via LP equity.'
                  : `Remaining gap of ${formatCurrency(output.operations.fundingGap ?? 0)} requires patient capital or additional grants.`}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-sm text-slate-600">Interested in scaling affordable housing?</p>
              <p className="text-sm font-semibold text-slate-700">
                Contact <span className="text-red-500">Anhart</span>
              </p>
            </div>
          </div>
        )}
      </Page>
    </div>
  );
}

export default TdceSheet;