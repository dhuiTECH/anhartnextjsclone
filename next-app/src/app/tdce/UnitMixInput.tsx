'use client';

import { useMemo } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { UnitMixItem } from '@/types/tdce';

/** Plain labels: Studio, 1-Bed only, 2-Bed only, 3-Bed only, etc. */
export const BEDROOM_LABELS: Record<number, string> = {
  0: 'Studio',
  1: '1-Bed only',
  2: '2-Bed only',
  3: '3-Bed only',
  4: '4-Bed only',
  5: '5+ Bed only',
};

export function getBedroomLabel(bedrooms: number): string {
  return BEDROOM_LABELS[bedrooms] ?? `${bedrooms}-Bed`;
}

/** Placeholder hints only; no pre-filled values – user defines all numbers */
const SQFT_PLACEHOLDER: Record<number, string> = {
  0: 'e.g. 400',
  1: 'e.g. 600',
  2: 'e.g. 900',
  3: 'e.g. 1100',
  4: 'e.g. 1300',
  5: 'e.g. 1500',
};

interface UnitMixInputProps {
  value: UnitMixItem[];
  onChange: (value: UnitMixItem[]) => void;
  /** Total units – always editable; shown on report. When omitted, derived from unit mix sum. */
  totalUnits?: number;
  onTotalUnitsChange?: (total: number) => void;
  /** Recommended affordable rent ($/mo) for 26–50% AMI from selected benchmark city; shown as hint. */
  recommendedAffordableRent?: number;
}

/** Get or create default row for bedrooms 0, 1, 2 – no default numbers, user-defined */
function getDefaultRow(mix: UnitMixItem[], bedrooms: number): UnitMixItem {
  const found = mix.find((u) => u.bedrooms === bedrooms);
  if (found) return found;
  return {
    bedrooms,
    count: 0,
    sqFtPerUnit: 0,
    affordableCount: 0,
  };
}

export function UnitMixInput({
  value,
  onChange,
  totalUnits: totalUnitsProp,
  onTotalUnitsChange,
  recommendedAffordableRent,
}: UnitMixInputProps) {
  const unitMix = value ?? [];
  const totalUnitsFromBreakdown = unitMix.reduce((sum, u) => sum + u.count, 0);
  const totalUnits = totalUnitsProp ?? totalUnitsFromBreakdown;

  const updateMix = (next: UnitMixItem[]) => {
    onChange(next);
  };

  const defaultRows = useMemo(() => [
    getDefaultRow(unitMix, 0),
    getDefaultRow(unitMix, 1),
    getDefaultRow(unitMix, 2),
  ], [unitMix]);

  const additionalRows = useMemo(() =>
    unitMix.filter((u) => u.bedrooms >= 3).sort((a, b) => a.bedrooms - b.bedrooms),
  [unitMix]);

  const otherCountSum = (excludeBedrooms: number) =>
    unitMix.filter((u) => u.bedrooms !== excludeBedrooms).reduce((s, u) => s + u.count, 0);

  const capCount = (bedrooms: number, requested: number): number => {
    if (totalUnits <= 0) return Math.max(0, requested);
    const otherSum = otherCountSum(bedrooms);
    const maxForThis = Math.max(0, totalUnits - otherSum);
    return Math.min(Math.max(0, requested), maxForThis);
  };

  const setDefaultRow = (bedrooms: number, field: 'count' | 'sqFtPerUnit' | 'affordableCount' | 'affordableRentPerUnit', val: number) => {
    const existing = unitMix.filter((u) => u.bedrooms !== bedrooms);
    const current = getDefaultRow(unitMix, bedrooms);
    const finalVal = field === 'count' ? capCount(bedrooms, val) : field === 'affordableCount' ? Math.max(0, Math.min(val, current.count)) : val;
    const updated = { ...current, [field]: finalVal };
    if (field === 'count') updated.affordableCount = Math.min(updated.affordableCount ?? 0, finalVal);
    updateMix([...existing, updated]);
  };

  const setAdditionalRow = (bedrooms: number, field: 'count' | 'sqFtPerUnit' | 'affordableCount' | 'affordableRentPerUnit', val: number) => {
    const existing = unitMix.filter((u) => u.bedrooms !== bedrooms);
    const current = additionalRows.find((u) => u.bedrooms === bedrooms)!;
    const finalVal = field === 'count' ? capCount(bedrooms, val) : field === 'affordableCount' ? Math.max(0, Math.min(val, current.count)) : val;
    const updated = { ...current, [field]: finalVal };
    if (field === 'count') updated.affordableCount = Math.min(updated.affordableCount ?? 0, finalVal);
    updateMix([...existing, updated]);
  };

  const addAdditionalBedroom = () => {
    const used = new Set(unitMix.map((u) => u.bedrooms));
    let next = 3;
    while (used.has(next) && next <= 5) next++;
    if (next > 5) next = 5;
    updateMix([...unitMix, { bedrooms: next, count: 0, sqFtPerUnit: 0, affordableCount: 0 }]);
  };

  const removeAdditional = (bedrooms: number) => {
    updateMix(unitMix.filter((u) => u.bedrooms !== bedrooms));
  };

  const totalSqFt = unitMix.reduce((sum, u) => sum + u.count * (u.sqFtPerUnit ?? 0), 0);
  const pct = (count: number) => (totalUnitsFromBreakdown > 0 ? (count / totalUnitsFromBreakdown) * 100 : 0);

  return (
    <div className="space-y-4">
      {/* 1. Total units – always editable; user-defined. Shown on report. */}
      <div className="rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Total number of units
          </label>
        </div>
        <input
          type="number"
          min={0}
          value={totalUnits === 0 ? '' : totalUnits}
          onChange={(e) => {
            const v = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
            if (!Number.isNaN(v) && v >= 0) onTotalUnitsChange?.(v);
          }}
          placeholder="0"
          className="w-full max-w-[12rem] text-2xl font-bold text-slate-800 tabular-nums rounded-lg border border-slate-300 bg-white px-3 py-2 mt-1"
        />
        <p className="text-xs text-slate-500 mt-2">
          {totalUnits > 0
            ? 'Unit type counts below are limited to this total. Shown on report.'
            : 'Enter the total number of units to add a breakdown by type below. Shown on report.'}
          {totalUnits > 0 && totalUnitsFromBreakdown > totalUnits && (
            <span className="block mt-1 text-amber-600">Sum of types ({totalUnitsFromBreakdown}) exceeds total. Reduce counts.</span>
          )}
        </p>
      </div>

      {/* 2. Unit types – only show when user has entered a total number of units */}
      {totalUnits > 0 && (
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-1">Unit types</h4>
        <p className="text-xs text-slate-500 mb-3">
          Counts are limited by the total above. Percentages are of total.
        </p>
        <div className="space-y-3">
          {defaultRows.map((row) => (
            <div
              key={row.bedrooms}
              className="p-3 rounded-lg border border-slate-200 bg-white space-y-2"
            >
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3 min-w-0 flex items-center shrink-0">
                  <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{getBedroomLabel(row.bedrooms)}</span>
                </div>
                <div className="col-span-4 flex items-end gap-2">
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Units</label>
                    <input
                      type="number"
                      min={0}
                      value={row.count === 0 ? '' : row.count}
                      onChange={(e) => {
                        const v = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        if (!Number.isNaN(v) && v >= 0) setDefaultRow(row.bedrooms, 'count', v);
                      }}
                      placeholder="0"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm"
                    />
                  </div>
                  {totalUnitsFromBreakdown > 0 && (
                    <span className="text-sm text-slate-600 pb-2 shrink-0">({pct(row.count).toFixed(0)}%)</span>
                  )}
                </div>
                <div className="col-span-5">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Sq ft per unit</label>
                  <input
                    type="number"
                    min={0}
                    step={10}
                    value={row.sqFtPerUnit === 0 || row.sqFtPerUnit == null ? '' : row.sqFtPerUnit}
                    onChange={(e) => {
                      const v = e.target.value === '' ? 0 : parseFloat(e.target.value);
                      if (!Number.isNaN(v) && v >= 0) setDefaultRow(row.bedrooms, 'sqFtPerUnit', v);
                    }}
                    placeholder={SQFT_PLACEHOLDER[row.bedrooms] ?? ''}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-0.5 border-t border-slate-100">
                <span className="text-xs text-slate-500">Affordable:</span>
                <input
                  type="number"
                  min={0}
                  max={row.count}
                  value={(row.affordableCount ?? 0) === 0 ? '' : (row.affordableCount ?? 0)}
                  onChange={(e) => {
                    const v = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                    if (!Number.isNaN(v) && v >= 0) setDefaultRow(row.bedrooms, 'affordableCount', Math.min(v, row.count));
                  }}
                  placeholder="0"
                  className="w-16 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
                />
                <span className="text-xs text-slate-500">units</span>
              </div>
              {(row.affordableCount ?? 0) > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-0.5 border-t border-slate-100">
                  <span className="text-xs text-slate-500">Affordable rent:</span>
                  <input
                    type="number"
                    min={0}
                    value={row.affordableRentPerUnit === undefined || row.affordableRentPerUnit === 0 ? '' : row.affordableRentPerUnit}
                    onChange={(e) => {
                      const v = e.target.value === '' ? 0 : Number(e.target.value);
                      if (!Number.isNaN(v) && v >= 0) setDefaultRow(row.bedrooms, 'affordableRentPerUnit', v);
                    }}
                    placeholder={recommendedAffordableRent ? `${recommendedAffordableRent}` : 'e.g. 838'}
                    className="w-20 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
                  />
                  <span className="text-xs text-slate-500">$/mo</span>
                  {recommendedAffordableRent != null && recommendedAffordableRent > 0 && (
                    <span className="text-xs text-slate-400">(26–50% AMI: ${recommendedAffordableRent})</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      )}

      {/* 3. Additional bedroom units – adds 3-Bed, 4-Bed, 5+ Bed */}
      {totalUnits > 0 && (
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-1">Additional bedroom units</h4>
        <p className="text-xs text-slate-500 mb-2">
          Add 3-Bed, 4-Bed, 5+ Bed if needed.
        </p>
        {additionalRows.length === 0 ? (
          <button
            type="button"
            onClick={addAdditionalBedroom}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-200 border-dashed w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add additional bedroom type (3-Bed, 4-Bed, …)
          </button>
        ) : (
          <div className="space-y-3">
            {additionalRows.map((row) => (
              <div
                key={row.bedrooms}
                className="p-3 rounded-lg border border-slate-200 bg-white space-y-2"
              >
                <div className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-3 min-w-0 flex items-center shrink-0">
                    <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{getBedroomLabel(row.bedrooms)}</span>
                  </div>
                  <div className="col-span-3 flex items-end gap-2">
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-medium text-slate-600 mb-1">Units</label>
                      <input
                        type="number"
                        min={0}
                        value={row.count === 0 ? '' : row.count}
                        onChange={(e) => {
                          const v = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          if (!Number.isNaN(v) && v >= 0) setAdditionalRow(row.bedrooms, 'count', v);
                        }}
                        placeholder="0"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm"
                      />
                    </div>
                    {totalUnitsFromBreakdown > 0 && (
                      <span className="text-sm text-slate-600 pb-2 shrink-0">({pct(row.count).toFixed(0)}%)</span>
                    )}
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Sq ft per unit</label>
                    <input
                      type="number"
                      min={0}
                      step={10}
                      value={row.sqFtPerUnit === 0 || row.sqFtPerUnit == null ? '' : row.sqFtPerUnit}
                      onChange={(e) => {
                        const v = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        if (!Number.isNaN(v) && v >= 0) setAdditionalRow(row.bedrooms, 'sqFtPerUnit', v);
                      }}
                      placeholder={SQFT_PLACEHOLDER[row.bedrooms] ?? ''}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={() => removeAdditional(row.bedrooms)}
                      className="w-full px-2 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-0.5 border-t border-slate-100">
                  <span className="text-xs text-slate-500">Affordable:</span>
                  <input
                    type="number"
                    min={0}
                    max={row.count}
                    value={(row.affordableCount ?? 0) === 0 ? '' : (row.affordableCount ?? 0)}
                    onChange={(e) => {
                      const v = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      if (!Number.isNaN(v) && v >= 0) setAdditionalRow(row.bedrooms, 'affordableCount', Math.min(v, row.count));
                    }}
                    placeholder="0"
                    className="w-16 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
                  />
                  <span className="text-xs text-slate-500">units</span>
                </div>
                {(row.affordableCount ?? 0) > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 border-t border-slate-100">
                    <span className="text-xs text-slate-500">Affordable rent:</span>
                    <input
                      type="number"
                      min={0}
                      value={row.affordableRentPerUnit === undefined || row.affordableRentPerUnit === 0 ? '' : row.affordableRentPerUnit}
                      onChange={(e) => {
                        const v = e.target.value === '' ? 0 : Number(e.target.value);
                        if (!Number.isNaN(v) && v >= 0) setAdditionalRow(row.bedrooms, 'affordableRentPerUnit', v);
                      }}
                      placeholder={recommendedAffordableRent ? `${recommendedAffordableRent}` : 'e.g. 838'}
                      className="w-20 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
                    />
                    <span className="text-xs text-slate-500">$/mo</span>
                    {recommendedAffordableRent != null && recommendedAffordableRent > 0 && (
                      <span className="text-xs text-slate-400">(26–50% AMI: ${recommendedAffordableRent})</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAdditionalBedroom}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
            >
              <Plus className="w-4 h-4" />
              Add another (3-Bed, 4-Bed, 5+ Bed)
            </button>
          </div>
        )}
      </div>
      )}

      {/* Summary when we have units */}
      {totalUnitsFromBreakdown > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-blue-600 font-medium mb-1">Total net rentable</p>
              <p className="text-lg font-bold text-blue-800">{totalSqFt.toLocaleString()} SF</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-medium mb-1">Average unit size</p>
                <p className="text-lg font-bold text-blue-800">
                {Math.round(totalSqFt / totalUnitsFromBreakdown)} SF
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnitMixInput;
