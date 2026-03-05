'use client';

/**
 * @file TdceEditPanel.tsx
 * @description Slide-out edit panel for the Total Development Cost Estimate (TDCE) sheet.
 *
 * This panel renders a contextual form based on which section of the TDCE sheet the user
 * has clicked to edit. Each `sectionId` maps to a different set of input fields.
 *
 * Architecture overview:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  TdceEditPanel (root)                                       │
 * │  ├─ react-hook-form for controlled field state              │
 * │  ├─ Section renders (contact, project, built-form, etc.)    │
 * │  └─ Shared sub-components:                                  │
 * │       Field          — single text/number input             │
 * │       Slider         — range input with editable label      │
 * │       AffordabilitySliders — 3-way mix that sums to 100%    │
 * │       GrantsEditor   — dynamic list of grant line items     │
 * │       OptionalFields — collapsible wrapper for non-core UI  │
 * └─────────────────────────────────────────────────────────────┘
 */

import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// ─── Type imports ─────────────────────────────────────────────────────────────
import type { TdceSectionId } from './TdceSheet';
import type {
  TdceInput,
  TdceOutput,
  AffordabilityMix,
  GrantItem,
  GrantStatus,
} from '@/types/tdce';

// ─── Utility / calculator helpers ─────────────────────────────────────────────
import {
  formatCurrency,
  formatNumber,
  getMaxNetResidentialSqFt,
  truncateTo1Decimal,
  truncateTo4Decimals,
  getEffectiveSiteAreaSqFt,
} from '@/lib/tdce-calculator';

// ─── Default values ────────────────────────────────────────────────────────────
import {
  DEFAULT_AFFORDABILITY_MIX,
} from '@/types/tdce';

// ─── Sub-component / data imports ─────────────────────────────────────────────
import UnitMixInput, { getBedroomLabel } from './UnitMixInput';
import {
  BCH_MAX_RENT_26_50_AMI,
  getCostForRegionBuildingWithUplifts,
  getOptionsForRegion,
  parseRegionBuildingId,
  REGION_KEYS,
  REGION_LABELS,
  type RegionKey,
  type UpliftParams,
} from '@/data/constructionBenchmarks';


// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const sectionTitles: Record<TdceSectionId, string> = {
  contact: 'Contact information',
  project: 'Project identification',
  overview: 'Affordability mix',
  'built-form': 'Built form & unit mix',
  benchmarks: 'Cost benchmarks (Altus)',
  'tdc-summary': 'TDC summary (auto)',
  'financing-sources': 'Financing & grants',
  'financing-uses': 'Uses (auto)',
  'pro-forma': 'Operating assumptions',
};

const CANADIAN_PROVINCES: { value: string; label: string }[] = [
  { value: 'AB', label: 'Alberta (AB)' },
  { value: 'BC', label: 'British Columbia (BC)' },
  { value: 'MB', label: 'Manitoba (MB)' },
  { value: 'NB', label: 'New Brunswick (NB)' },
  { value: 'NL', label: 'Newfoundland and Labrador (NL)' },
  { value: 'NS', label: 'Nova Scotia (NS)' },
  { value: 'NT', label: 'Northwest Territories (NT)' },
  { value: 'NU', label: 'Nunavut (NU)' },
  { value: 'ON', label: 'Ontario (ON)' },
  { value: 'PE', label: 'Prince Edward Island (PE)' },
  { value: 'QC', label: 'Quebec (QC)' },
  { value: 'SK', label: 'Saskatchewan (SK)' },
  { value: 'YT', label: 'Yukon (YT)' },
];

const GRANT_STATUS_OPTIONS: { value: GrantStatus; label: string }[] = [
  { value: 'target', label: 'Target' },
  { value: 'applied', label: 'Applied' },
  { value: 'confirmed', label: 'Confirmed' },
];


// ─────────────────────────────────────────────────────────────────────────────
// Helper: derive physicals/financials from built-form inputs
// ─────────────────────────────────────────────────────────────────────────────

function getBuiltFormDerivedUpdates(
  data: TdceInput,
  /** When true, auto-apply efficiency (85%) when GFA is set. Only set on blur/apply, not on sync. */
  shouldApplyEfficiency = false
): { physicals?: Partial<TdceInput['physicals']>; financials?: Partial<TdceInput['financials']> } {
  const p = data.physicals;
  const effectiveSite = getEffectiveSiteAreaSqFt(p);

  const len = p.siteDimensionsLengthFt;
  const wid = p.siteDimensionsWidthFt;
  const hasValidDimensions = len != null && wid != null && len > 0 && wid > 0;

  const physicals: Partial<TdceInput['physicals']> = {};
  const financials: Partial<TdceInput['financials']> = {};

  if (hasValidDimensions) {
    physicals.siteAreaSqFt = effectiveSite;
  }

  const commercialInputMode = p.commercialInputMode ?? 'sqft';
  const commercialFsr = p.commercialFsr ?? 0;
  if (commercialInputMode === 'fsr' && effectiveSite > 0 && commercialFsr > 0) {
    financials.commercialSqFt = Math.round(effectiveSite * commercialFsr);
  }

  const targetFSR = p.targetFSR ?? 0;
  if (p.gfaSource !== 'declared' && effectiveSite > 0 && targetFSR > 0) {
    const gfa = Math.round(effectiveSite * targetFSR);
    const wasEmpty = (p.grossFloorAreaSqFt ?? p.grossBuildableSqFt ?? 0) === 0;
    physicals.grossFloorAreaSqFt = gfa;
    physicals.grossBuildableSqFt = gfa;

    if (commercialInputMode === 'fsr' && commercialFsr > 0) {
      financials.commercialSqFt = Math.round(effectiveSite * commercialFsr);
    }
    // Only auto-set efficiency when GFA is applied (blur), not on every keystroke or unit-mix change
    if (shouldApplyEfficiency && wasEmpty && p.efficiencyRatio == null) {
      physicals.efficiencyRatio = 0.85;
    }
  }

  const hasUpdates =
    Object.keys(physicals).length > 0 || Object.keys(financials).length > 0;
  return hasUpdates ? { physicals, financials } : {};
}


// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface TdceEditPanelProps {
  sectionId: TdceSectionId;
  input: TdceInput;
  output: TdceOutput | null;
  onUpdate: (updates: Partial<TdceInput>) => void;
  onClose: () => void;
}


// ─────────────────────────────────────────────────────────────────────────────
// OptionalFields — collapsible wrapper for non-essential inputs
// ─────────────────────────────────────────────────────────────────────────────

interface OptionalFieldsProps {
  /** Label shown on the toggle button. Defaults to "More options". */
  label?: string;
  children: React.ReactNode;
  /** Start expanded. Useful if a value inside is already non-default. */
  defaultOpen?: boolean;
}

/**
 * OptionalFields
 *
 * A disclosure wrapper that hides advanced / infrequently-used inputs behind
 * a chevron toggle. Keeps the panel tidy for first-time users while still
 * making every field accessible with one click.
 */
function OptionalFields({ label = 'More options', children, defaultOpen = false }: OptionalFieldsProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-slate-200 pt-3 mt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 w-full text-left"
      >
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {label}
      </button>

      {open && (
        <div className="mt-3 space-y-5">
          {children}
        </div>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function TdceEditPanel({
  sectionId,
  input,
  output,
  onUpdate,
  onClose,
}: TdceEditPanelProps) {

  const { control, handleSubmit, getValues } = useForm<TdceInput>({
    defaultValues: input,
    values: input,
  });

  const apply = (data: TdceInput) => {
    const derived = getBuiltFormDerivedUpdates(data, true);
    onUpdate({
      ...data,
      physicals: { ...data.physicals, ...(derived.physicals ?? {}) },
      financials: { ...data.financials, ...(derived.financials ?? {}) },
    });
  };

  const syncToParentRef = useRef<() => void>(() => {});
  syncToParentRef.current = () => {
    const data = getValues();
    if (sectionId === 'built-form') {
      const derived = getBuiltFormDerivedUpdates(data, false);
      onUpdate({
        ...data,
        physicals: { ...data.physicals, ...(derived.physicals ?? {}) },
        financials: { ...data.financials, ...(derived.financials ?? {}) },
      });
    } else {
      onUpdate(data);
    }
  };

  const syncToParent = useCallback(() => {
    queueMicrotask(() => syncToParentRef.current());
  }, [sectionId]);

  const applyBuiltFormWithInput = useCallback(
    (overrideInput: TdceInput) => {
      const derived = getBuiltFormDerivedUpdates(overrideInput, true);
      onUpdate({
        ...overrideInput,
        physicals: { ...overrideInput.physicals, ...(derived.physicals ?? {}) },
        financials: { ...overrideInput.financials, ...(derived.financials ?? {}) },
      });
    },
    [onUpdate]
  );

  if (!sectionId) return null;

  const commercialInputMode = input.physicals.commercialInputMode ?? 'sqft';

  // ── Helpers: detect whether optional sections have non-default values set
  // (used to auto-expand the disclosure if the user already has data there)
  const hasDimensions =
    (input.physicals.siteDimensionsLengthFt ?? 0) > 0 ||
    (input.physicals.siteDimensionsWidthFt ?? 0) > 0;
  const hasCommercial = (input.financials.commercialSqFt ?? 0) > 0 || commercialInputMode === 'fsr';
  const hasUplifts =
    (input.financials.escalationUpliftPercent ?? 0) > 0 ||
    (input.financials.complexityUpliftPercent ?? 0) > 0;
  const hasCostNote = !!input.meta?.costAssumptionNote;
  const hasContingencies =
    (input.financials.hardCostContingencyPercent ?? 0) > 0 ||
    (input.financials.softCostContingencyPercent ?? 0) > 0 ||
    (input.financials.developmentFeePercent ?? 0) > 0;
  const hasFinancingExtras =
    (input.financials.financingCosts ?? 0) > 0 ||
    (input.financials.capitalizedReserves ?? 0) > 0;
  const hasConstructionLoan =
    (input.financials.constructionInterestRate ?? 0) > 0 ||
    (input.financials.constructionPeriodMonths ?? 0) > 0;
  const hasGrowthRates =
    (input.operations.rentGrowthRate ?? 0) !== 0 ||
    (input.operations.expenseGrowthRate ?? 0) !== 0 ||
    (input.operations.analysisPeriodYears ?? 0) > 0;
  const hasInvestorReturn = (input.operations.targetInvestorReturnPercent ?? 0) > 0;

  return (
    <div className="flex flex-col h-full">

      {/* ── Panel header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
        <h2 className="text-base font-semibold text-slate-800">
          {sectionTitles[sectionId]}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close panel"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

        {/* ================================================================
            SECTION: Contact
           ================================================================ */}
        {sectionId === 'contact' && (
          <>
            <Field label="Name" name="meta.contactName" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
            <Field label="Email" name="meta.contactEmail" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
          </>
        )}

        {/* ================================================================
            SECTION: Project identification
           ================================================================ */}
        {sectionId === 'project' && (
          <>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-800">Project identification</h3>
            </div>

            <Field label="Project title" name="meta.projectTitle" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
            <Field label="Address" name="meta.address" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
            <Field label="City" name="meta.city" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-800">Contact</h3>
            </div>
            <Field label="Contact name" name="meta.contactName" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
            <Field label="Contact email" name="meta.contactEmail" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Province</label>
              <Controller
                name="meta.province"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => { field.onChange(e.target.value); syncToParent(); }}
                    onBlur={() => { field.onBlur(); handleSubmit(apply)(); }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 min-h-[44px] touch-manipulation"
                  >
                    <option value="">Select province</option>
                    {CANADIAN_PROVINCES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                )}
              />
            </div>

            <p className="text-xs text-slate-500">Location on the sheet is address, city, province.</p>

            {/* Optional: zoning, scenario, contact, description */}
            <OptionalFields label="More project details" defaultOpen={!!(input.meta?.zoning || input.meta?.scenarioName || input.meta?.description)}>
              <Field label="Zoning" name="meta.zoning" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              <Field label="Scenario" name="meta.scenarioName" control={control} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />

              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-800">More Details</h3>
                <p className="text-xs text-slate-500">Optional details about the project (max 400 characters).</p>
              </div>
              <Controller
                name="meta.description"
                control={control}
                render={({ field }) => {
                  const value = field.value ?? '';
                  return (
                    <>
                      <textarea
                        {...field}
                        value={value}
                        onChange={(e) => { field.onChange(e.target.value); syncToParent(); }}
                        onBlur={handleSubmit(apply)}
                        rows={4}
                        maxLength={400}
                        placeholder="Add more details about the project..."
                        className="w-full min-w-0 max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm min-h-[88px] max-h-[200px] overflow-y-auto touch-manipulation resize-y break-words"
                      />
                      <p className="text-xs text-slate-500 mt-1 text-right">{value.length} / 400</p>
                    </>
                  );
                }}
              />
            </OptionalFields>
          </>
        )}

        {/* ================================================================
            SECTION: Affordability mix
           ================================================================ */}
        {sectionId === 'overview' && (
          <AffordabilitySliders
            value={input.affordabilityMix ?? DEFAULT_AFFORDABILITY_MIX}
            onChange={(v) => onUpdate({ affordabilityMix: v })}
          />
        )}

        {/* ================================================================
            SECTION: Built form & unit mix
           ================================================================ */}
        {sectionId === 'built-form' && (
          <>
            {/* ── CORE: Site area ── */}
            <Field
              label="Site area (sq ft)"
              name="physicals.siteAreaSqFt"
              control={control}
              type="number"
              min={0}
              placeholder="e.g. 5000"
              onBlur={handleSubmit(apply)}
              onAfterChange={syncToParent}
            />

            {/* ── OPTIONAL: Site dimensions ── */}
            <OptionalFields label="Site dimensions (optional)" defaultOpen={hasDimensions}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Site length (ft)" name="physicals.siteDimensionsLengthFt" control={control} type="number" min={0} placeholder="50" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                <Field label="Site width (ft)" name="physicals.siteDimensionsWidthFt" control={control} type="number" min={0} placeholder="100" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              </div>
              <p className="text-xs text-slate-500">When both are set, site area = length × width.</p>
            </OptionalFields>

            {/* ── CORE: GFA source ── */}
            <div className="border-t border-slate-200 pt-4 mt-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Gross floor area (GFA)</label>
              <p className="text-xs text-slate-500 mb-2">Calculate GFA from Site × FSR, or declare GFA directly.</p>

              <div className="flex flex-col gap-2 mb-3">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio" name="gfaSource"
                    checked={(input.physicals.gfaSource ?? 'from_fsr') === 'from_fsr'}
                    onChange={() => onUpdate({ physicals: { ...input.physicals, gfaSource: 'from_fsr' } })}
                    className="rounded-full border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Calculate from FSR (Site area × Target FSR)</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio" name="gfaSource"
                    checked={input.physicals.gfaSource === 'declared'}
                    onChange={() => onUpdate({ physicals: { ...input.physicals, gfaSource: 'declared' } })}
                    className="rounded-full border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Declare GFA (enter gross floor area directly)</span>
                </label>
              </div>

              {(input.physicals.gfaSource ?? 'from_fsr') === 'from_fsr' && (
                <Field label="Target FSR" name="physicals.targetFSR" control={control} type="number" min={0} step={0.01} placeholder="e.g. 11" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              )}

              {input.physicals.gfaSource === 'declared' && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Gross floor area (sq ft)</label>
                  <input
                    type="number" min={0} step={100}
                    value={
                      (input.physicals.grossFloorAreaSqFt ?? input.physicals.grossBuildableSqFt ?? 0) === 0
                        ? ''
                        : (input.physicals.grossFloorAreaSqFt ?? input.physicals.grossBuildableSqFt ?? 0)
                    }
                    onChange={(e) => {
                      const v = e.target.value === '' ? 0 : Number(e.target.value);
                      if (!Number.isNaN(v) && v >= 0) {
                        const updates: Partial<TdceInput['physicals']> = { grossFloorAreaSqFt: v, grossBuildableSqFt: v };
                        const wasEmpty = (input.physicals.grossFloorAreaSqFt ?? input.physicals.grossBuildableSqFt ?? 0) === 0;
                        if (wasEmpty && v > 0 && input.physicals.efficiencyRatio == null) {
                          updates.efficiencyRatio = 0.85;
                        }
                        onUpdate({ physicals: { ...input.physicals, ...updates } });
                      }
                    }}
                    placeholder="e.g. 55000"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm"
                  />
                </div>
              )}
            </div>

            {/* ── OPTIONAL: Commercial space ── */}
            <OptionalFields label="Commercial space" defaultOpen={hasCommercial}>
              <div className="rounded-xl p-4 bg-slate-50/60 space-y-3">
                <p className="text-xs text-slate-500">
                  Specify commercial area directly or derive it from a Commercial FSR ratio.
                </p>
                <div className="flex rounded-lg border border-slate-300 overflow-hidden bg-white text-sm">
                  <button
                    type="button"
                    onClick={() => onUpdate({ physicals: { ...input.physicals, commercialInputMode: 'sqft' } })}
                    className={`flex-1 px-3 py-2 font-medium transition-colors ${commercialInputMode === 'sqft' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    Area (sq ft)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdate({ physicals: { ...input.physicals, commercialInputMode: 'fsr' } })}
                    className={`flex-1 px-3 py-2 font-medium border-l border-slate-300 transition-colors ${commercialInputMode === 'fsr' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    Commercial FSR
                  </button>
                </div>

                {commercialInputMode === 'sqft' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Commercial area (sq ft)</label>
                    <input
                      type="number" min={0} step={100}
                      value={input.financials.commercialSqFt || ''}
                      onChange={(e) => {
                        const v = e.target.value === '' ? 0 : Number(e.target.value);
                        if (!Number.isNaN(v) && v >= 0) onUpdate({ financials: { ...input.financials, commercialSqFt: v } });
                      }}
                      placeholder="0 — leave blank for no commercial"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm min-h-[44px] touch-manipulation"
                    />
                    <p className="text-xs text-slate-500 mt-1">Leave 0 for purpose-built rental with no commercial.</p>
                  </div>
                )}

                {commercialInputMode === 'fsr' && (
                  <div>
                    <Field label="Commercial FSR" name="physicals.commercialFsr" control={control} type="number" min={0} step={0.01} placeholder="0" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                    <p className="text-xs text-slate-500 mt-1">Commercial area = Site area × Commercial FSR.</p>
                    {(() => {
                      const fsr = input.physicals.commercialFsr ?? 0;
                      const site = getEffectiveSiteAreaSqFt(input.physicals);
                      const derived = fsr > 0 && site > 0 ? Math.round(site * fsr) : null;
                      return derived != null ? (
                        <p className="text-xs text-blue-600 mt-1 font-medium">
                          → {formatNumber(derived)} sq ft at {fsr} FSR × {formatNumber(Math.round(site))} sq ft site
                        </p>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </OptionalFields>

            {/* ── OPTIONAL: Efficiency ── */}
            <OptionalFields label="Net-to-gross efficiency" defaultOpen={(input.physicals.efficiencyRatio ?? 0.85) !== 0.85}>
              <Slider
                label="Net-to-gross efficiency (75–90%)"
                value={Math.round((input.physicals.efficiencyRatio ?? 0.85) * 100)}
                min={75} max={90} step={1} suffix="%"
                onChange={(v) => {
                  const nextInput: TdceInput = { ...input, physicals: { ...input.physicals, efficiencyRatio: v / 100 } };
                  applyBuiltFormWithInput(nextInput);
                }}
              />
              <p className="text-xs text-slate-500">
                Usable share of floor plate; the remainder is circulation. Default is 85%.
              </p>
            </OptionalFields>

            {/* ── CORE: Unit mix ── */}
            <div className="border-t border-slate-200 pt-4 mt-4">
              <Controller
                name="physicals.unitMix"
                control={control}
                render={({ field }) => (
                  <UnitMixInput
                    value={field.value ?? []}
                    onChange={(v) => {
                      field.onChange(v);
                      const sumUnits = v.reduce((s, u) => s + u.count, 0);
                      const currentTotal = input.physicals.totalUnits ?? 0;
                      onUpdate({
                        physicals: {
                          ...input.physicals,
                          unitMix: v,
                          totalUnits: currentTotal === 0 ? sumUnits : currentTotal,
                        },
                      });
                    }}
                    totalUnits={input.physicals.totalUnits ?? 0}
                    onTotalUnitsChange={(n) => onUpdate({ physicals: { ...input.physicals, totalUnits: n } })}
                    recommendedAffordableRent={(() => {
                      const parsed = input.financials.constructionBenchmarkId
                        ? parseRegionBuildingId(input.financials.constructionBenchmarkId)
                        : null;
                      return parsed ? BCH_MAX_RENT_26_50_AMI[parsed.region] : undefined;
                    })()}
                  />
                )}
              />
            </div>

            {/* ── OPTIONAL: Residential space capacity ── */}
            {(() => {
              const maxNet = getMaxNetResidentialSqFt(input);
              const unitMix = input.physicals.unitMix ?? [];
              const breakdown = unitMix.map((u) => ({
                label: getBedroomLabel(u.bedrooms),
                count: u.count,
                sqFt: u.sqFtPerUnit ?? 0,
                subtotal: u.count * (u.sqFtPerUnit ?? 0),
              }));
              const totalUsed = breakdown.reduce((s, row) => s + row.subtotal, 0);
              const remaining = Math.max(0, maxNet - totalUsed);
              const exceeded = Math.max(0, totalUsed - maxNet);
              const hasGfa =
                (input.physicals.targetFSR != null && getEffectiveSiteAreaSqFt(input.physicals) > 0) ||
                (input.physicals.grossBuildableSqFt ?? 0) > 0;

              if (!hasGfa || maxNet <= 0) return null; // silently omit when GFA not yet set

              const pctUsed = maxNet > 0 ? Math.min(100, (totalUsed / maxNet) * 100) : 0;

              return (
                <OptionalFields label="Residential space limit" defaultOpen={exceeded > 0}>
                  <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 text-sm text-slate-700">
                    <p className="text-xs text-slate-500 mb-2">
                      Max net = (GFA − commercial) × efficiency. Unit mix cannot exceed this.
                    </p>
                    <div className="space-y-1.5 mb-2">
                      <div className="flex justify-between text-xs">
                        <span>Max net residential</span>
                        <strong>{formatNumber(Math.round(maxNet))} sq ft</strong>
                      </div>
                      {breakdown.length > 0 && (
                        <>
                          <div className="border-t border-slate-200 pt-2 mt-2 space-y-1">
                            {breakdown.map((row, i) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span>{row.label}: {row.count} × {row.sqFt}</span>
                                <span>{formatNumber(row.subtotal)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs font-medium border-t border-slate-200 pt-1.5 mt-1">
                            <span>Total used</span>
                            <span>{formatNumber(Math.round(totalUsed))} sq ft</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Remaining</span>
                            <strong className={remaining <= 0 ? 'text-amber-600' : 'text-slate-800'}>
                              {formatNumber(Math.round(remaining))} sq ft
                            </strong>
                          </div>
                        </>
                      )}
                    </div>
                    {maxNet > 0 && (
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${pctUsed}%` }} />
                      </div>
                    )}
                    {exceeded > 0 && (
                      <p className="text-xs text-amber-700 mt-2">
                        Unit floor area exceeds net residential by{' '}
                        <strong>{formatNumber(Math.round(exceeded))} sq ft</strong>. Adjust GFA, efficiency,
                        commercial area, or unit sizes.
                      </p>
                    )}
                  </div>
                </OptionalFields>
              );
            })()}

            <p className="text-xs text-slate-500 mt-3">
              GFA is set from Site × FSR or declared directly. Net residential = (GFA − commercial) × efficiency.
            </p>
          </>
        )}

        {/* ================================================================
            SECTION: Cost benchmarks
           ================================================================ */}
        {sectionId === 'benchmarks' && (
          <>
            {/* ── CORE: Region / building type ── */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Construction cost / sq ft</label>
              <p className="text-xs text-slate-500 mb-2">
                Select region and building type for the Altus benchmark range.
              </p>

              {(() => {
                const parsed = input.financials.constructionBenchmarkId
                  ? parseRegionBuildingId(input.financials.constructionBenchmarkId)
                  : null;
                const currentRegion: RegionKey = parsed?.region ?? 'vancouver';
                const regionOptions = getOptionsForRegion(currentRegion);
                const upliftParams: UpliftParams = {
                  escalationPercent: input.financials.escalationUpliftPercent ?? 0,
                  complexityPercent: input.financials.complexityUpliftPercent ?? 0,
                  locationUplift: false,
                };
                const appliedCost = parsed
                  ? getCostForRegionBuildingWithUplifts(currentRegion, parsed.buildingType, upliftParams)
                  : input.financials.hardCostPerSqFt;

                function updateFinancialsWithUplifts(
                  updates: Partial<typeof input.financials> & {
                    escalationUpliftPercent?: number;
                    complexityUpliftPercent?: number;
                  }
                ) {
                  const next = { ...input.financials, ...updates };
                  const nextUplifts: UpliftParams = {
                    escalationPercent: next.escalationUpliftPercent ?? 0,
                    complexityPercent: next.complexityUpliftPercent ?? 0,
                    locationUplift: false,
                  };
                  const cost = parsed
                    ? getCostForRegionBuildingWithUplifts(parsed.region, parsed.buildingType, nextUplifts)
                    : next.hardCostPerSqFt;
                  onUpdate({ financials: { ...next, hardCostPerSqFt: parsed ? cost : next.hardCostPerSqFt } });
                }

                return (
                  <>
                    <label className="block text-xs font-medium text-slate-600 mb-1 mt-2">Region</label>
                    <select
                      value={currentRegion}
                      onChange={(e) => {
                        const region = e.target.value as RegionKey;
                        const opts = getOptionsForRegion(region);
                        const keepBuildingType = parsed?.buildingType;
                        const sameType = keepBuildingType ? opts.find((o) => o.buildingType === keepBuildingType) : null;
                        const selected = sameType ?? opts[0];
                        const id = selected?.id;
                        const newCost = id && selected
                          ? getCostForRegionBuildingWithUplifts(region, selected.buildingType, upliftParams)
                          : input.financials.hardCostPerSqFt;
                        onUpdate({ financials: { ...input.financials, constructionBenchmarkId: id ?? undefined, hardCostPerSqFt: id ? newCost : input.financials.hardCostPerSqFt } });
                      }}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 min-h-[44px] touch-manipulation"
                    >
                      {REGION_KEYS.map((r) => (
                        <option key={r} value={r}>{REGION_LABELS[r]}</option>
                      ))}
                    </select>

                    <label className="block text-xs font-medium text-slate-600 mb-1 mt-3">
                      Building type (cost range for {REGION_LABELS[currentRegion]})
                    </label>
                    <select
                      value={parsed ? (input.financials.constructionBenchmarkId ?? '') : ''}
                      onChange={(e) => {
                        const id = e.target.value;
                        if (!id) { onUpdate({ financials: { ...input.financials, constructionBenchmarkId: undefined } }); return; }
                        const nextParsed = parseRegionBuildingId(id);
                        if (!nextParsed) return;
                        const newCost = getCostForRegionBuildingWithUplifts(nextParsed.region, nextParsed.buildingType, upliftParams);
                        onUpdate({ financials: { ...input.financials, constructionBenchmarkId: id, hardCostPerSqFt: newCost } });
                      }}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 min-h-[44px] touch-manipulation"
                    >
                      <option value="">Custom (enter amount below)</option>
                      {regionOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label} — ${o.low}–${o.high}/sf → ${appliedCost} applied
                        </option>
                      ))}
                    </select>

                    {!input.financials.constructionBenchmarkId && (
                      <div className="mt-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1">Custom amount ($/sq ft)</label>
                        <input
                          type="number" min={0} step={10}
                          value={input.financials.hardCostPerSqFt || ''}
                          onChange={(e) => {
                            const v = e.target.value === '' ? 0 : Number(e.target.value);
                            if (!Number.isNaN(v) && v >= 0) onUpdate({ financials: { ...input.financials, hardCostPerSqFt: v } });
                          }}
                          placeholder="e.g. 490"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm min-h-[44px] touch-manipulation"
                        />
                      </div>
                    )}

                    {/* ── CORE: Soft cost ratio ── */}
                    <div className="mt-4">
                      <Slider
                        label="Soft cost ratio (15–30%)"
                        value={Math.round((input.financials.softCostPercent ?? 0.25) * 100)}
                        min={15} max={30} step={1} suffix="%"
                        onChange={(v) => onUpdate({ financials: { ...input.financials, softCostPercent: Math.round(v) / 100 } })}
                        onAfterChange={syncToParent}
                      />
                    </div>

                    {/* ── OPTIONAL: Uplifts ── */}
                    <OptionalFields label="Escalation & complexity uplifts" defaultOpen={hasUplifts}>
                      <p className="text-xs text-slate-500">
                        Altus benchmarks are a snapshot — apply uplifts to match your project's time and specification.
                      </p>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-0.5">
                          Escalation (% per year from guide to construction start)
                        </label>
                        <p className="text-[11px] text-slate-500 mb-1">Typical 3–6% per year.</p>
                        <input
                          type="number" min={0} max={15} step={0.5}
                          value={input.financials.escalationUpliftPercent ?? ''}
                          onChange={(e) => {
                            const v = e.target.value === '' ? undefined : Number(e.target.value);
                            updateFinancialsWithUplifts({ escalationUpliftPercent: v != null && !Number.isNaN(v) ? Math.max(0, Math.min(15, v)) : undefined });
                          }}
                          placeholder="0"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm min-h-[40px] touch-manipulation"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-0.5">
                          Complexity & specification (%)
                        </label>
                        <p className="text-[11px] text-slate-500 mb-1">Step Code 4/5, seismic, high-performance. Typical 5–12%.</p>
                        <input
                          type="number" min={0} max={25} step={1}
                          value={input.financials.complexityUpliftPercent ?? ''}
                          onChange={(e) => {
                            const v = e.target.value === '' ? undefined : Number(e.target.value);
                            updateFinancialsWithUplifts({ complexityUpliftPercent: v != null && !Number.isNaN(v) ? Math.max(0, Math.min(25, v)) : undefined });
                          }}
                          placeholder="0"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm min-h-[40px] touch-manipulation"
                        />
                      </div>
                    </OptionalFields>

                    {/* ── OPTIONAL: Cost note, permit status ── */}
                    <OptionalFields label="Permit status & cost note" defaultOpen={hasCostNote || (input.financials.buildingPermitIssued ?? false)}>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Permit status</label>
                        <p className="text-xs text-slate-500 mb-2">
                          Building permit issued justifies a lower soft cost (e.g. 18%).
                        </p>
                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={input.financials.buildingPermitIssued ?? false}
                            onChange={(e) => onUpdate({ financials: { ...input.financials, buildingPermitIssued: e.target.checked } })}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>Building permit already issued</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cost assumption note</label>
                        <p className="text-xs text-slate-500 mb-2">Rationale for the $/sq ft used. Shown on the digest.</p>
                        <Controller
                          name="meta.costAssumptionNote"
                          control={control}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => { field.onChange(e.target.value); syncToParent(); }}
                              onBlur={handleSubmit(apply)}
                              rows={3}
                              placeholder="e.g. The $490/sf assumption reflects downtown Vancouver construction conditions..."
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm min-h-[72px] resize-y"
                            />
                          )}
                        />
                      </div>
                    </OptionalFields>

                    {/* ── CORE: Operating assumptions (section 2 – pro-forma relies on these) ── */}
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-slate-800 mb-3">Operating assumptions</h3>
                      <Slider
                        label="Operating expense ratio (% of EGI)"
                        value={Math.round((input.operations.operatingExpenseRatio ?? 0.35) * 100)}
                        min={10} max={100} step={1} suffix="%"
                        onChange={(v) => onUpdate({ operations: { ...input.operations, operatingExpenseRatio: Math.round(v) / 100 } })}
                        onAfterChange={syncToParent}
                      />
                      <Field label="Target DSCR" name="operations.dscrTarget" control={control} type="number" min={1} step={0.05} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />

                      {/* Rent income source */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Market rates – rent income source</label>
                        <div className="flex flex-col gap-2 mb-3">
                          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="rentIncomeSource" checked={(input.operations.rentIncomeSource ?? 'cost_per_sqft') === 'market_by_unit'} onChange={() => onUpdate({ operations: { ...input.operations, rentIncomeSource: 'market_by_unit' } })} className="rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" />
                            <span>Market rents by unit type ($/mo)</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="rentIncomeSource" checked={(input.operations.rentIncomeSource ?? 'cost_per_sqft') === 'cost_per_sqft'} onChange={() => onUpdate({ operations: { ...input.operations, rentIncomeSource: 'cost_per_sqft' } })} className="rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" />
                            <span>Rent per residential sq ft ($/sq ft/month)</span>
                          </label>
                        </div>
                        {(input.operations.rentIncomeSource ?? 'cost_per_sqft') === 'cost_per_sqft' && (
                          <Field label="Rent per residential sq ft ($/sq ft/month)" name="operations.residentialRentPerSqFt" control={control} type="number" min={0} step={0.25} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                        )}
                        {(input.operations.rentIncomeSource ?? 'cost_per_sqft') === 'market_by_unit' && (
                          <>
                            <p className="text-xs text-slate-500 mb-2">Rent fields match the unit types in Built form.</p>
                            {(() => {
                              const mix = input.physicals.unitMix ?? [];
                              const unitTypes = mix.length > 0 ? [...new Set(mix.map((u) => u.bedrooms))].sort((a, b) => a - b) : [0, 1, 2];
                              type RentField = { bedrooms: number; label: string; name: any };
                              const fields: RentField[] = [];
                              if (unitTypes.includes(0)) fields.push({ bedrooms: 0, label: 'Studio ($/mo)', name: 'operations.marketRentStudio' });
                              if (unitTypes.includes(1)) fields.push({ bedrooms: 1, label: '1-Bed ($/mo)', name: 'operations.marketRent1Bed' });
                              if (unitTypes.includes(2)) fields.push({ bedrooms: 2, label: '2-Bed ($/mo)', name: 'operations.marketRent2Bed' });
                              if (unitTypes.includes(3)) fields.push({ bedrooms: 3, label: '3-Bed ($/mo)', name: 'operations.marketRent3Bed' });
                              if (unitTypes.includes(4)) fields.push({ bedrooms: 4, label: '4-Bed ($/mo)', name: 'operations.marketRent4Bed' });
                              return fields.map((f) => (
                                <Field key={f.bedrooms} label={`Market rent – ${f.label}`} name={f.name} control={control} type="number" min={0} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                              ));
                            })()}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        )}

        {/* ================================================================
            SECTION: TDC summary
           ================================================================ */}
        {sectionId === 'tdc-summary' && (
          <>
            {/* ── CORE: Land cost ── */}
            <Field label="Land value ($)" name="financials.landCost" control={control} type="number" min={0} placeholder="e.g. 6000000" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
            <p className="text-sm text-slate-500">
              TDC is calculated from land + hard costs (GFA × $/sf) + soft costs. Edit Built form and Benchmarks for GFA and cost rates.
            </p>

            {/* ── OPTIONAL: Contingencies & dev fee ── */}
            <OptionalFields label="Contingencies & development fee" defaultOpen={hasContingencies}>
              <p className="text-xs text-slate-500">Default is 0% — set these when you have project-specific estimates.</p>
              <Slider label="Hard cost contingency (%)" value={Math.round((input.financials.hardCostContingencyPercent ?? 0) * 100)} min={0} max={15} step={1} suffix="%" onChange={(v) => onUpdate({ financials: { ...input.financials, hardCostContingencyPercent: Math.round(v) / 100 } })} onAfterChange={syncToParent} />
              <Slider label="Soft cost contingency (%)" value={Math.round((input.financials.softCostContingencyPercent ?? 0) * 100)} min={0} max={15} step={1} suffix="%" onChange={(v) => onUpdate({ financials: { ...input.financials, softCostContingencyPercent: Math.round(v) / 100 } })} onAfterChange={syncToParent} />
              <Slider label="Development fee (% of hard + soft)" value={Math.round((input.financials.developmentFeePercent ?? 0) * 100)} min={0} max={10} step={0.5} suffix="%" onChange={(v) => onUpdate({ financials: { ...input.financials, developmentFeePercent: Math.round(v * 10) / 1000 } })} onAfterChange={syncToParent} />
            </OptionalFields>

            {/* ── OPTIONAL: Financing & reserves ── */}
            <OptionalFields label="Financing costs & reserves" defaultOpen={hasFinancingExtras}>
              <Field label="Financing costs (capitalized, $)" name="financials.financingCosts" control={control} type="number" min={0} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              <Field label="Capitalized reserves ($)" name="financials.capitalizedReserves" control={control} type="number" min={0} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
            </OptionalFields>

            {/* ── OPTIONAL: Construction loan parameters ── */}
            <OptionalFields label="Construction loan (interest carry)" defaultOpen={hasConstructionLoan}>
              <p className="text-xs text-slate-500">Used to calculate capitalized interest during the construction period.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Interest rate" name="financials.constructionInterestRate" control={control} type="number" min={0} max={0.2} step={0.001} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                <Field label="Period (months)" name="financials.constructionPeriodMonths" control={control} type="number" min={0} max={60} step={1} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                <Field label="Avg draw factor (0–1)" name="financials.averageDrawFactor" control={control} type="number" min={0} max={1} step={0.05} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              </div>
            </OptionalFields>
          </>
        )}

        {/* ================================================================
            SECTION: Financing sources
           ================================================================ */}
        {sectionId === 'financing-sources' && (
          <>
            {/* ── CORE: Sponsor equity ── */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Sponsor equity ($)</label>
              <p className="text-xs text-slate-500 mb-2">Developer/sponsor equity already committed. Reduces the calculated gap.</p>
              <input
                type="number" min={0}
                value={input.financials.sponsorEquity ?? ''}
                onChange={(e) => {
                  const v = e.target.value === '' ? undefined : Number(e.target.value);
                  onUpdate({ financials: { ...input.financials, sponsorEquity: v != null && !Number.isNaN(v) ? v : undefined } });
                }}
                placeholder="0"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm"
              />
            </div>

            {/* ── CORE: Grants ── */}
            <GrantsEditor
              grants={input.financials.grants ?? []}
              onChange={(grants) => onUpdate({ financials: { ...input.financials, grants } })}
            />
          </>
        )}

        {/* ================================================================
            SECTION: Financing uses (read-only)
           ================================================================ */}
        {sectionId === 'financing-uses' && (
          <p className="text-sm text-slate-500">
            Uses are derived from TDC. Edit Cost benchmarks and Land.
          </p>
        )}

        {/* ================================================================
            SECTION: Pro-forma / operating assumptions
           ================================================================ */}
        {sectionId === 'pro-forma' && (
          <>
            {/* ── CORE: Vacancy, interest, amortization, DSCR (opex ratio in Benchmarks section 2) ── */}
            <p className="text-xs text-slate-500 mb-2">Operating expense ratio is set in Benchmarks (section 2).</p>
            <Field label="Vacancy rate (e.g. 0.03)" name="operations.vacancyRate" control={control} type="number" min={0} max={1} step={0.01} placeholder="0.03" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} defaultValueForDisplay={0.03} />
            <Field label="Interest rate (e.g. 0.049)" name="operations.interestRate" control={control} type="number" min={0} max={0.2} step={0.001} placeholder="0.049" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} defaultValueForDisplay={0.049} />
            <Field label="Amortization (years)" name="operations.amortizationYears" control={control} type="number" min={1} placeholder="40" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} defaultValueForDisplay={40} />

            {/* DSCR with explainer and presets */}
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <p className="text-xs font-medium text-slate-700 mb-1">What is DSCR?</p>
              <p className="text-xs text-slate-600">
                <strong>NOI ÷ Annual Debt Service</strong>. Lenders typically require{' '}
                <strong>1.20×–1.30×</strong>. Affordable/CMHC projects may use ~1.10×.
              </p>
            </div>
            <div className="space-y-2">
              <Field label="DSCR target" name="operations.dscrTarget" control={control} type="number" min={1} step={0.05} placeholder="1.1" onBlur={handleSubmit(apply)} onAfterChange={syncToParent} defaultValueForDisplay={1.1} />
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500">Presets:</span>
                <button type="button" className="px-2 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => onUpdate({ operations: { ...input.operations, dscrTarget: 1.1 } })}>Insured (1.10×)</button>
                <button type="button" className="px-2 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => onUpdate({ operations: { ...input.operations, dscrTarget: 1.2 } })}>Affordable fund (1.20×)</button>
                <button type="button" className="px-2 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => onUpdate({ operations: { ...input.operations, dscrTarget: 1.25 } })}>Conventional (1.25×)</button>
              </div>
            </div>

            {/* ── OPTIONAL: Mortgage sizing mode ── */}
            <OptionalFields label="Mortgage sizing mode" defaultOpen={input.operations.mortgageSizingMode === 'fixed'}>
              <div className="flex flex-wrap gap-3 text-sm">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mortgageSizingMode" checked={(input.operations.mortgageSizingMode ?? 'dscr') === 'dscr'} onChange={() => onUpdate({ operations: { ...input.operations, mortgageSizingMode: 'dscr' } })} className="rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Size from DSCR (default)</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mortgageSizingMode" checked={input.operations.mortgageSizingMode === 'fixed'} onChange={() => onUpdate({ operations: { ...input.operations, mortgageSizingMode: 'fixed' } })} className="rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Fixed mortgage amount</span>
                </label>
              </div>
              {input.operations.mortgageSizingMode === 'fixed' && (
                <Field label="Fixed mortgage amount ($)" name="operations.fixedMortgageAmount" control={control} type="number" min={0} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              )}
            </OptionalFields>

            {/* ── OPTIONAL: Replacement reserves, cap rate ── */}
            <OptionalFields label="Reserves & cap rate" defaultOpen={(input.operations.replacementReservePerUnitPerYear ?? 0) > 0 || (input.operations.marketCapRate ?? 0) > 0}>
              <Field label="Replacement reserves ($/unit/year)" name="operations.replacementReservePerUnitPerYear" control={control} type="number" min={0} step={10} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              <Field label="Market cap rate for stabilized value (e.g. 0.045)" name="operations.marketCapRate" control={control} type="number" min={0} max={0.2} step={0.001} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
            </OptionalFields>

            {/* ── OPTIONAL: Growth rates & analysis period ── */}
            <OptionalFields label="Growth rates & analysis period" defaultOpen={hasGrowthRates}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Rent growth (annual, e.g. 0.02)" name="operations.rentGrowthRate" control={control} type="number" min={-0.05} max={0.10} step={0.005} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                <Field label="Expense growth (annual, e.g. 0.025)" name="operations.expenseGrowthRate" control={control} type="number" min={-0.05} max={0.10} step={0.005} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
                <Field label="Analysis period (years)" name="operations.analysisPeriodYears" control={control} type="number" min={0} max={40} step={1} onBlur={handleSubmit(apply)} onAfterChange={syncToParent} />
              </div>
            </OptionalFields>

            {/* ── OPTIONAL: Investor return ── */}
            <OptionalFields label="Investor return target" defaultOpen={hasInvestorReturn}>
              <p className="text-xs text-slate-500">e.g. 2% for patient capital. Shows return to equity and residual after equity return.</p>
              <input
                type="number" min={0} max={100} step={0.5}
                value={input.operations.targetInvestorReturnPercent ?? ''}
                onChange={(e) => {
                  const v = e.target.value === '' ? undefined : Number(e.target.value);
                  onUpdate({ operations: { ...input.operations, targetInvestorReturnPercent: v != null && !Number.isNaN(v) ? v : undefined } });
                }}
                placeholder="e.g. 2"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm"
              />
            </OptionalFields>
          </>
        )}

      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  name: string;
  control: any;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  onBlur?: () => void;
  onAfterChange?: () => void;
  /** When value is undefined/null, show this for display (e.g. default from calculator). */
  defaultValueForDisplay?: number;
}

function Field({ label, name, control, type = 'text', placeholder, min, max, step, onBlur, onAfterChange, defaultValueForDisplay }: FieldProps) {
  const isNumber = type === 'number';
  // focusedStr drives display while the field is focused — never reformatted mid-type
  const [focusedStr, setFocusedStr] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <Controller
        name={name as any}
        control={control}
        render={({ field }) => {
          // Committed display: what to show when not focused
          const storedVal = field.value;
          const isAbsent = storedVal === undefined || storedVal === null || storedVal === '';
          const isZero = isNumber && typeof storedVal === 'number' && storedVal === 0;
          const committedDisplay =
            !isNumber ? (storedVal ?? '') :
            isAbsent ? (defaultValueForDisplay != null ? String(defaultValueForDisplay) : '') :
            isZero ? '' :
            String(storedVal);

          const displayValue = focusedStr !== null ? focusedStr : committedDisplay;

          return (
            <input
              {...field}
              value={displayValue}
              type={type}
              placeholder={placeholder}
              min={min} max={max} step={step}
              onFocus={() => {
                if (isNumber) {
                  // Seed the editable string from the real stored value (not committedDisplay,
                  // which may be empty for zero). Show blank for 0/absent so user can type freely.
                  const seed = isAbsent || isZero ? '' : String(storedVal);
                  setFocusedStr(seed);
                }
              }}
              onBlur={() => {
                if (isNumber && focusedStr !== null) {
                  const trimmed = focusedStr.trim();
                  if (trimmed === '' || trimmed === '-') {
                    field.onChange(undefined); // clear → undefined so placeholder shows
                  } else {
                    const num = Number(trimmed);
                    if (!Number.isNaN(num)) field.onChange(truncateTo4Decimals(num));
                  }
                  setFocusedStr(null);
                  onAfterChange?.();
                }
                field.onBlur();
                onBlur?.();
              }}
              onChange={(e) => {
                if (isNumber) {
                  const raw = e.target.value;
                  // Always keep focusedStr in sync so display matches what user typed
                  setFocusedStr(raw);
                  // Only commit to RHF if it's a valid complete number (not mid-typing "0.")
                  const parsed = Number(raw);
                  if (raw !== '' && raw !== '-' && raw !== '0.' && !raw.endsWith('.') && !Number.isNaN(parsed)) {
                    field.onChange(truncateTo4Decimals(parsed));
                    onAfterChange?.();
                  }
                } else {
                  field.onChange(e.target.value);
                  onAfterChange?.();
                }
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-800 text-sm min-h-[44px] touch-manipulation"
            />
          );
        }}
      />
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
  onAfterChange?: () => void;
}

function sliderDisplayValue(value: number, step: number): number {
  if (step >= 1) return Math.round(value);
  const decimals = step < 0.01 ? 2 : 1;
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function Slider({ label, value, min, max, step, suffix = '', onChange, onAfterChange }: SliderProps) {
  const displayVal = sliderDisplayValue(value, step);
  const [isEditing, setIsEditing] = useState(false);
  const [editStr, setEditStr] = useState(String(displayVal));
  const [isFocused, setIsFocused] = useState(false);
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const commitEdit = useCallback(() => {
    const n = Number(editStr);
    if (!Number.isNaN(n)) {
      const clamped = Math.round(Math.max(min, Math.min(max, n)) / step) * step;
      onChange(Math.max(min, Math.min(max, clamped)));
      onAfterChange?.();
    }
    setIsEditing(false);
  }, [editStr, min, max, step, onChange, onAfterChange]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm gap-2">
        <span className="font-medium text-slate-700">{label}</span>
        {isEditing ? (
          <input type="text" inputMode="numeric" value={editStr} onChange={(e) => setEditStr(e.target.value)} onBlur={commitEdit} onKeyDown={(e) => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') { setEditStr(String(displayVal)); setIsEditing(false); } }} className="w-16 rounded border border-slate-300 px-2 py-1 text-slate-800 text-right text-sm" autoFocus />
        ) : (
          <button type="button" onClick={() => { setEditStr(String(displayVal)); setIsEditing(true); }} className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded px-1.5 py-0.5 min-h-[28px] touch-manipulation">
            {displayVal}{suffix}
          </button>
        )}
      </div>
      <div className="relative pt-5 pb-1">
        <input type="range" min={min} max={max} step={step} value={value} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={(e) => { onChange(Number(e.target.value)); onAfterChange?.(); }} className="w-full h-2 rounded-full appearance-none bg-slate-200 accent-blue-600" />
        {isFocused && (
          <div className="absolute pointer-events-none flex justify-center" style={{ left: `${Math.min(100, Math.max(0, pct))}%`, transform: 'translateX(-50%)', top: 0 }}>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 whitespace-nowrap shadow-sm">{displayVal}{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface AffordabilitySlidersProps {
  value: AffordabilityMix;
  onChange: (v: AffordabilityMix) => void;
}

function AffordabilitySliders({ value, onChange }: AffordabilitySlidersProps) {
  const total = value.shelterPercent + value.hilsPercent + value.marketPercent;
  const keys = ['shelterPercent', 'hilsPercent', 'marketPercent'] as const;
  const labels: Record<(typeof keys)[number], string> = { shelterPercent: 'Shelter rate', hilsPercent: 'HILs', marketPercent: 'Market' };
  const [editingKey, setEditingKey] = useState<(typeof keys)[number] | null>(null);
  const [editStr, setEditStr] = useState('');
  const [focusedKey, setFocusedKey] = useState<(typeof keys)[number] | null>(null);

  const applyValue = (key: (typeof keys)[number], v: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(v)));
    const rest = 100 - clamped;
    const others = keys.filter((k) => k !== key);
    const otherSum = others.reduce((s, k) => s + value[k], 0);
    const next: AffordabilityMix = { ...value, [key]: clamped };
    if (otherSum > 0 && rest >= 0) others.forEach((k) => { next[k] = Math.round((value[k] / otherSum) * rest); });
    onChange(next);
  };

  const commitEdit = () => {
    if (editingKey == null) return;
    const n = Number(editStr);
    if (!Number.isNaN(n)) applyValue(editingKey, n);
    setEditingKey(null);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">Target mix by unit count. Total should be 100%.</p>
      {keys.map((key) => {
        const v = value[key];
        const isEditing = editingKey === key;
        return (
          <div key={key}>
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="font-medium text-slate-700">{labels[key]} %</span>
              {isEditing ? (
                <input type="text" inputMode="numeric" value={editStr} onChange={(e) => setEditStr(e.target.value)} onBlur={commitEdit} onKeyDown={(e) => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') { setEditStr(String(v)); setEditingKey(null); } }} className="w-14 rounded border border-slate-300 px-2 py-1 text-slate-800 text-right text-sm" autoFocus />
              ) : (
                <button type="button" onClick={() => { setEditingKey(key); setEditStr(String(v)); }} className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded px-1.5 py-0.5 min-h-[28px] touch-manipulation">{v}%</button>
              )}
            </div>
            <div className="relative pt-5 pb-1">
              <input type="range" min={0} max={100} value={v} onFocus={() => setFocusedKey(key)} onBlur={() => setFocusedKey(null)} onChange={(e) => applyValue(key, Number(e.target.value))} className="w-full h-2 rounded-full appearance-none bg-slate-200 accent-blue-600" />
              {focusedKey === key && (
                <div className="absolute pointer-events-none flex justify-center" style={{ left: `${Math.min(100, Math.max(0, v))}%`, transform: 'translateX(-50%)', top: 0 }}>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 whitespace-nowrap shadow-sm">{v}%</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <p className="text-xs text-slate-500">Total: {total}%</p>
    </div>
  );
}

interface GrantsEditorProps {
  grants: GrantItem[];
  onChange: (g: GrantItem[]) => void;
}

function GrantsEditor({ grants, onChange }: GrantsEditorProps) {
  const add = () => onChange([...grants, { name: '', amount: 0, status: 'target' }]);
  const remove = (i: number) => onChange(grants.filter((_, j) => j !== i));
  const update = (i: number, patch: Partial<GrantItem>) => { const next = [...grants]; next[i] = { ...next[i], ...patch }; onChange(next); };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">Grants (Target / Applied / Confirmed)</label>
        <button type="button" onClick={add} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add grant</button>
      </div>
      {grants.map((g, i) => (
        <div key={i} className="flex flex-wrap gap-2 items-end">
          <input type="text" placeholder="e.g. BC Housing" value={g.name} onChange={(e) => update(i, { name: e.target.value })} className="flex-1 min-w-[8rem] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
          <select value={g.status ?? 'target'} onChange={(e) => update(i, { status: e.target.value as GrantStatus })} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm w-28">
            {GRANT_STATUS_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
          </select>
          <input type="number" placeholder="Amount" value={g.amount || ''} onChange={(e) => update(i, { amount: Number(e.target.value) || 0 })} className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
          <button type="button" onClick={() => remove(i)} className="p-2 text-slate-400 hover:text-rose-600" aria-label="Remove grant">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default TdceEditPanel;