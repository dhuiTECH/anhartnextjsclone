'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getEmptyTdceInput } from '@/data/tdceDefaults';
import { calculateFinancials, formatCurrency, formatNumber, formatPercent } from '@/lib/tdce-calculator';
import type { TdceInput, TdceOutput } from '@/types/tdce';

interface TdceSimplifiedViewProps {
  onBack: () => void;
}

type Step =
  | 'contact'
  | 'interest'
  | 'no-interest'
  | 'land'
  | 'project'
  | 'affordability'
  | 'estimate'
  | 'complete';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  location: string;
  province: string;
  isOwnedProperty: boolean | null;
  siteAreaSqFt: string;
  grossFloorAreaSqFt: string;
  totalUnits: string;
  estimatedLandCost: string;
  populations: string[];
  buildingType: string;
  rentModel: string;
  otherBuildingType: string;
}

interface HomeownerEstimate {
  input: TdceInput;
  output: TdceOutput | null;
}

const defaultData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  location: '',
  province: '',
  isOwnedProperty: null,
  siteAreaSqFt: '',
  grossFloorAreaSqFt: '',
  totalUnits: '',
  estimatedLandCost: '',
  populations: [],
  buildingType: '',
  rentModel: '',
  otherBuildingType: '',
};

const brandPrimary = '#D83A42';
const brandPrimaryLight = '#FFF0F0';
const textDark = '#1A1A1A';
const textMuted = '#6C757D';
const borderLight = '#E2E8F0';

const POPS = [
  { id: 'families', label: 'Families' },
  { id: 'seniors', label: 'Seniors' },
  { id: 'workforce-housing', label: 'Workforce housing' },
  { id: 'vulnerable', label: 'Vulnerable populations' },
] as const;

const BUILDINGS = [
  { id: 'low-rise', label: 'Low-rise wood-frame apartment', sub: '3–6 storeys, cost-effective, neighbourhood-friendly' },
  { id: 'stacked', label: 'Stacked townhomes', sub: 'Ground-oriented, family-friendly, moderate density' },
  { id: 'high-rise', label: 'High-rise tower', sub: '7+ storeys, maximizes units on constrained sites' },
  { id: 'other', label: 'Other', sub: 'Please specify' },
] as const;

const RENTS = [
  { id: 'income', label: 'Rent-Geared-to-Income', sub: 'Deep affordability; rents set at approximately 30% below market average.' },
  { id: 'discount', label: 'Below-Market Rent', sub: 'Supported operations allowing for rents at 10% below market average.' },
  { id: 'mixed', label: 'Mixed-Income Rent', sub: 'A tiered model averaging 20% below market rates to support a diverse community.' },
] as const;

const PROVINCES = [
  { id: 'AB', label: 'Alberta (AB)' },
  { id: 'BC', label: 'British Columbia (BC)' },
  { id: 'MB', label: 'Manitoba (MB)' },
  { id: 'NB', label: 'New Brunswick (NB)' },
  { id: 'NL', label: 'Newfoundland and Labrador (NL)' },
  { id: 'NS', label: 'Nova Scotia (NS)' },
  { id: 'NT', label: 'Northwest Territories (NT)' },
  { id: 'NU', label: 'Nunavut (NU)' },
  { id: 'ON', label: 'Ontario (ON)' },
  { id: 'PE', label: 'Prince Edward Island (PE)' },
  { id: 'QC', label: 'Quebec (QC)' },
  { id: 'SK', label: 'Saskatchewan (SK)' },
  { id: 'YT', label: 'Yukon (YT)' },
] as const;

const BUILDING_PRESETS: Record<string, { hardCostPerSqFt: number; softCostPercent: number; efficiencyRatio: number; stories: number; benchmark: string }> = {
  'low-rise': {
    hardCostPerSqFt: 325,
    softCostPercent: 0.24,
    efficiencyRatio: 0.85,
    stories: 4,
    benchmark: 'Low-rise wood-frame benchmark',
  },
  stacked: {
    hardCostPerSqFt: 300,
    softCostPercent: 0.22,
    efficiencyRatio: 0.82,
    stories: 3,
    benchmark: 'Stacked townhouse benchmark',
  },
  'high-rise': {
    hardCostPerSqFt: 440,
    softCostPercent: 0.28,
    efficiencyRatio: 0.8,
    stories: 12,
    benchmark: 'High-rise concrete benchmark',
  },
  other: {
    hardCostPerSqFt: 380,
    softCostPercent: 0.25,
    efficiencyRatio: 0.83,
    stories: 6,
    benchmark: 'Generic multifamily benchmark',
  },
};

const RENT_PRESETS: Record<string, { residentialRentPerSqFt: number; shelterPercent: number; hilsPercent: number; marketPercent: number; note: string }> = {
  income: {
    residentialRentPerSqFt: 1.65,
    shelterPercent: 70,
    hilsPercent: 30,
    marketPercent: 0,
    note: 'Deep affordability assumption',
  },
  discount: {
    residentialRentPerSqFt: 2.1,
    shelterPercent: 25,
    hilsPercent: 55,
    marketPercent: 20,
    note: 'Discount-to-market rent assumption',
  },
  mixed: {
    residentialRentPerSqFt: 2.65,
    shelterPercent: 10,
    hilsPercent: 20,
    marketPercent: 70,
    note: 'Mixed-income operating assumption',
  },
};

function parseNumber(value: string): number {
  const numeric = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

function isValidNumberString(value: string): boolean {
  const cleaned = value.trim().replace(/[^0-9.]/g, '');
  if (!cleaned) return false;
  const num = parseFloat(cleaned);
  return Number.isFinite(num);
}

function isValidPositiveNumber(value: string, allowZero = false): boolean {
  if (!value.trim()) return false;
  const num = parseNumber(value);
  if (!Number.isFinite(num)) return false;
  return allowZero ? num >= 0 : num > 0;
}

function isValidPositiveInteger(value: string): boolean {
  if (!value.trim()) return false;
  const num = parseNumber(value);
  return Number.isInteger(num) && num > 0;
}

function getSelectedBuildingLabel(data: FormData): string {
  if (data.buildingType === 'other') return data.otherBuildingType || 'Custom building';
  return BUILDINGS.find((item) => item.id === data.buildingType)?.label ?? 'Multifamily concept';
}

function getSelectedRentLabel(data: FormData): string {
  return RENTS.find((item) => item.id === data.rentModel)?.label ?? 'Custom rent model';
}

function buildHomeownerEstimate(data: FormData): HomeownerEstimate {
  const input = getEmptyTdceInput();
  const buildingPreset = BUILDING_PRESETS[data.buildingType] ?? BUILDING_PRESETS.other;
  const rentPreset = RENT_PRESETS[data.rentModel] ?? RENT_PRESETS.discount;
  const landCost = parseNumber(data.estimatedLandCost);
  const totalUnits = Math.max(0, Math.round(parseNumber(data.totalUnits)));
  const grossFloorAreaSqFt = parseNumber(data.grossFloorAreaSqFt);
  const siteAreaSqFt = parseNumber(data.siteAreaSqFt);
  const buildingLabel = getSelectedBuildingLabel(data);
  const populations = POPS.filter((item) => data.populations.includes(item.id))
    .map((item) => item.label)
    .join(', ');

  input.meta.projectTitle = `${buildingLabel} concept`;
  input.meta.address = data.location;
  input.meta.province = data.province;
  input.meta.contactName = `${data.firstName} ${data.lastName}`.trim();
  input.meta.contactEmail = data.email;
  input.meta.partners = {
    ...input.meta.partners,
    developer: data.organization || input.meta.contactName,
  };
  input.meta.constructionType = buildingLabel;
  input.meta.primaryCostBenchmark = `${buildingPreset.benchmark} · Altus-informed Class D assumptions`;
  input.meta.costAssumptionNote = [
    'Homeowner rough TDCE estimate generated from simplified assumptions.',
    `Rent model: ${rentPreset.note}.`,
    populations ? `Target populations: ${populations}.` : '',
  ]
    .filter(Boolean)
    .join(' ');
  input.meta.description = `Ownership: ${data.isOwnedProperty ? 'Owned property' : 'Land acquisition required'}.`;

  input.physicals.siteAreaSqFt = siteAreaSqFt;
  input.physicals.grossFloorAreaSqFt = grossFloorAreaSqFt;
  input.physicals.grossBuildableSqFt = grossFloorAreaSqFt;
  input.physicals.gfaSource = 'declared';
  input.physicals.efficiencyRatio = buildingPreset.efficiencyRatio;
  input.physicals.totalUnits = totalUnits;
  input.physicals.stories = buildingPreset.stories;

  input.financials.landCost = landCost;
  input.financials.hardCostPerSqFt = buildingPreset.hardCostPerSqFt;
  input.financials.softCostPercent = buildingPreset.softCostPercent;
  input.financials.commercialSqFt = 0;
  input.financials.commercialRentPerSqFt = 0;
  input.financials.sponsorEquity = data.isOwnedProperty ? landCost : 0;

  input.operations.residentialRentPerSqFt = rentPreset.residentialRentPerSqFt;
  input.operations.vacancyRate = 0.03;
  input.operations.operatingExpenseRatio = 0.35;
  input.operations.interestRate = 0.049;
  input.operations.amortizationYears = 40;
  input.operations.dscrTarget = 1.1;
  input.operations.mortgageSizingMode = 'dscr';
  input.operations.marketCapRate = 0.045;

  input.affordabilityMix = {
    shelterPercent: rentPreset.shelterPercent,
    hilsPercent: rentPreset.hilsPercent,
    marketPercent: rentPreset.marketPercent,
  };

  let output: TdceOutput | null = null;
  if (siteAreaSqFt > 0 && grossFloorAreaSqFt > 0 && totalUnits > 0) {
    output = calculateFinancials(input);
  }

  return { input, output };
}

function buildTdceSimplifiedMessage(data: FormData, estimate: HomeownerEstimate): string {
  const pop = POPS.filter((item) => data.populations.includes(item.id))
    .map((item) => item.label)
    .join(', ');
  const building = getSelectedBuildingLabel(data);
  const rent = getSelectedRentLabel(data);
  const output = estimate.output;

  return [
    'TDCE Lite (homeowner rough estimate)',
    '---',
    `Contact: ${data.firstName} ${data.lastName}`.trim(),
    `Email: ${data.email}`,
    `Organization: ${data.organization || 'N/A'}`,
    `Location: ${data.location}`,
    `Province: ${data.province || 'N/A'}`,
    `Ownership: ${data.isOwnedProperty === true ? 'Owned property' : data.isOwnedProperty === false ? 'Not yet owned' : 'N/A'}`,
    `Site area: ${formatNumber(parseNumber(data.siteAreaSqFt))} sf`,
    `Gross floor area: ${formatNumber(parseNumber(data.grossFloorAreaSqFt))} sf`,
    `Total units: ${formatNumber(parseNumber(data.totalUnits))}`,
    `Estimated land value / acquisition cost: ${formatCurrency(parseNumber(data.estimatedLandCost))}`,
    `Populations: ${pop || 'N/A'}`,
    `Building type: ${building}`,
    `Rent model: ${rent}`,
    output ? `Rough TDCE total development cost: ${formatCurrency(output.costs.totalDevelopmentCost)}` : '',
    output ? `Rough cost per unit: ${formatCurrency(output.costMetrics.costPerUnit)}` : '',
    output ? `Rough max mortgage: ${formatCurrency(output.operations.maxMortgage ?? 0)}` : '',
    output ? `Rough funding gap: ${formatCurrency(output.operations.fundingGap ?? 0)}` : '',
  ].filter(Boolean).join('\n');
}

function UnderlineInput({
  placeholder,
  value,
  onChange,
  type = 'text',
  autoFocus = false,
  error,
  inputMode,
  min,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoFocus?: boolean;
  error?: string;
  inputMode?: 'text' | 'email' | 'numeric' | 'decimal';
  min?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && value !== '';
  const showLabel = isFocused || hasValue;
  const hasError = !!error;

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '2.5rem', paddingTop: '1.2rem' }}>
      <label style={{
        position: 'absolute',
        top: showLabel ? 0 : '24px',
        left: 0,
        fontSize: showLabel ? '0.85rem' : '1.2rem',
        color: hasError ? brandPrimary : isFocused ? brandPrimary : textMuted,
        fontFamily: 'Roboto, sans-serif',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        fontWeight: showLabel ? 500 : 400
      }}>
        {placeholder}
      </label>
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputMode={inputMode}
        min={min}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `2px solid ${hasError ? brandPrimary : isFocused ? brandPrimary : borderLight}`,
          outline: 'none',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.2rem',
          color: textDark,
          paddingTop: '12px',
          paddingBottom: '12px',
          transition: 'border-color 0.3s ease',
        }}
      />
      {hasError && (
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
}

function UnderlineTextarea({
  placeholder,
  value,
  onChange,
  error,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && value !== '';
  const showLabel = isFocused || hasValue;
  const hasError = !!error;

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '2.5rem', paddingTop: '1.2rem' }}>
      <label style={{
        position: 'absolute',
        top: showLabel ? 0 : '24px',
        left: 0,
        fontSize: showLabel ? '0.85rem' : '1.2rem',
        color: hasError ? brandPrimary : isFocused ? brandPrimary : textMuted,
        fontFamily: 'Roboto, sans-serif',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        fontWeight: showLabel ? 500 : 400
      }}>
        {placeholder}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={3}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `2px solid ${hasError ? brandPrimary : isFocused ? brandPrimary : borderLight}`,
          outline: 'none',
          resize: 'none',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.2rem',
          color: textDark,
          paddingTop: '12px',
          paddingBottom: '12px',
          lineHeight: 1.6,
          transition: 'border-color 0.3s ease',
        }}
      />
      {hasError && (
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
}

function UnderlineSelect({
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly { id: string; label: string }[];
  placeholder: string;
  error?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = !!value;
  const showLabel = isFocused || hasValue;
  const hasError = !!error;

  return (
    <div style={{ marginBottom: '2.5rem', position: 'relative', paddingTop: '1.2rem' }}>
      <label style={{
        position: 'absolute',
        top: showLabel ? 0 : '24px',
        left: 0,
        fontSize: showLabel ? '0.85rem' : '1.2rem',
        color: hasError ? brandPrimary : isFocused ? brandPrimary : textMuted,
        fontFamily: 'Roboto, sans-serif',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        fontWeight: showLabel ? 500 : 400
      }}>
        {placeholder}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `2px solid ${hasError ? brandPrimary : isFocused ? brandPrimary : borderLight}`,
          outline: 'none',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.2rem',
          color: value ? textDark : 'transparent',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '0',
          paddingRight: '0',
          appearance: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="" disabled></option>
        {options.map((option) => (
          <option key={option.id} value={option.id} style={{ color: textDark }}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>
          {error}
        </p>
      )}
      <span style={{ position: 'absolute', right: 0, top: '24px', color: textMuted, pointerEvents: 'none' }}>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

function ArrowBtn({
  onClick,
  disabled,
  label = 'Continue',
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        background: disabled ? '#F1F3F5' : brandPrimary,
        border: 'none',
        borderRadius: '30px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? '#ADB5BD' : '#FFFFFF',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        padding: '14px 32px',
        marginTop: '1.5rem',
        transition: 'all 0.2s ease',
        boxShadow: disabled ? 'none' : '0 4px 14px rgba(216, 58, 66, 0.25)',
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {label}
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: textMuted,
        fontFamily: 'Roboto, sans-serif',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: 0,
        marginBottom: '3rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = textDark)}
      onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
    >
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
        <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  );
}

function Q({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '2.2rem', fontWeight: 400, color: textDark, lineHeight: 1.3, margin: 0 }}>
        {label}
      </h2>
      {sub && (
        <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: textMuted, marginTop: 12, margin: '12px 0 0', lineHeight: 1.5 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function Counter({ n, total }: { n: number; total: number }) {
  return (
    <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: textMuted, marginBottom: '2rem', fontWeight: 500 }}>
      {n} <span style={{ opacity: 0.5 }}>/ {total}</span>
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: borderLight, margin: '2.5rem 0' }} />;
}

function SubLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem', color: textMuted, marginBottom: '1rem', marginTop: 0, fontWeight: 500 }}>{text}</p>;
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      onClick={onChange}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        cursor: 'pointer',
        marginBottom: '0.8rem',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1.1rem',
        color: checked ? brandPrimary : textDark,
        fontWeight: checked ? 500 : 400,
        padding: '16px 20px',
        border: `2px solid ${checked ? brandPrimary : borderLight}`,
        borderRadius: '12px',
        background: checked ? brandPrimaryLight : 'transparent',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => !checked && (e.currentTarget.style.borderColor = '#CBD5E1')}
      onMouseLeave={(e) => !checked && (e.currentTarget.style.borderColor = borderLight)}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: '6px',
          border: `2px solid ${checked ? brandPrimary : '#CBD5E1'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: checked ? brandPrimary : 'transparent',
          transition: 'all 0.2s ease',
        }}
      >
        {checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

function RadioRow({
  label,
  sub,
  selected,
  onSelect,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        cursor: 'pointer',
        marginBottom: '1rem',
        padding: '18px 20px',
        border: `2px solid ${selected ? brandPrimary : borderLight}`,
        borderRadius: '12px',
        background: selected ? brandPrimaryLight : 'transparent',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => !selected && (e.currentTarget.style.borderColor = '#CBD5E1')}
      onMouseLeave={(e) => !selected && (e.currentTarget.style.borderColor = borderLight)}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: `2px solid ${selected ? brandPrimary : '#CBD5E1'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
          transition: 'all 0.2s ease',
        }}
      >
        {selected && <span style={{ width: 10, height: 10, borderRadius: '50%', background: brandPrimary }} />}
      </span>
      <span>
        <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: selected ? brandPrimary : textDark, fontWeight: selected ? 500 : 400, display: 'block' }}>
          {label}
        </span>
        {sub && <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem', color: textMuted, display: 'block', marginTop: 4, lineHeight: 1.4 }}>{sub}</span>}
      </span>
    </label>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: `1px solid ${borderLight}`,
        padding: '1.2rem 1.25rem',
        background: '#FFFFFF',
      }}
    >
      <p style={{ margin: 0, fontFamily: 'Roboto, sans-serif', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: textMuted, fontWeight: 600 }}>
        {label}
      </p>
      <p style={{ margin: '0.4rem 0 0', fontFamily: 'Roboto, sans-serif', fontSize: '1.5rem', color: textDark, fontWeight: 700 }}>
        {value}
      </p>
      {sub && <p style={{ margin: '0.35rem 0 0', fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem', color: textMuted, lineHeight: 1.45 }}>{sub}</p>}
    </div>
  );
}

function ContactStep({ data, setData, onNext }: { data: FormData; setData: (d: Partial<FormData>) => void; onNext: () => void }) {
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const firstNameTrimmed = data.firstName.trim();
  const lastNameTrimmed = data.lastName.trim();
  const emailTrimmed = data.email.trim();
  const orgTrimmed = data.organization.trim();

  const errors = {
    firstName: !firstNameTrimmed ? 'Please enter your first name' : firstNameTrimmed.length < 2 ? 'Please enter a valid first name' : undefined,
    lastName: !lastNameTrimmed ? 'Please enter your last name' : lastNameTrimmed.length < 2 ? 'Please enter a valid last name' : undefined,
    email: !emailTrimmed ? 'Please enter your email address' : !isValidEmail(data.email) ? 'Please enter a valid email address' : undefined,
    organization: !orgTrimmed ? 'Please enter your organization' : orgTrimmed.length < 2 ? 'Please enter a valid organization name' : undefined,
  };

  const isValid = !errors.firstName && !errors.lastName && !errors.email && !errors.organization;

  const handleNext = () => {
    setAttemptedSubmit(true);
    if (isValid) onNext();
  };

  return (
    <>
      <Counter n={1} total={5} />
      <Q label="Let's start with you." sub="A few contact details so we can save and follow up on your Total Cost Benchmark." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
        <UnderlineInput autoFocus placeholder="First name" value={data.firstName} onChange={(v) => setData({ firstName: v })} error={attemptedSubmit ? errors.firstName : undefined} />
        <UnderlineInput placeholder="Last name" value={data.lastName} onChange={(v) => setData({ lastName: v })} error={attemptedSubmit ? errors.lastName : undefined} />
      </div>
      <UnderlineInput type="email" placeholder="Email address" value={data.email} onChange={(v) => setData({ email: v })} error={attemptedSubmit ? errors.email : undefined} inputMode="email" />
      <UnderlineInput placeholder="Organization" value={data.organization} onChange={(v) => setData({ organization: v })} error={attemptedSubmit ? errors.organization : undefined} />
      <ArrowBtn onClick={handleNext} disabled={false} />
    </>
  );
}

function InterestStep({ onYes, onNo }: { onYes: () => void; onNo: () => void }) {
  return (
    <>
      <Counter n={2} total={5} />
      <Q label="Do you have a project in mind?" sub="If you do, We can give you a rough estimate right now." />
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { label: 'Yes — let\'s make a rough estimate', action: onYes },
          { label: 'No — I am just exploring for now', action: onNo },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={opt.action}
            style={{
              width: '100%',
              background: 'transparent',
              border: `2px solid ${borderLight}`,
              padding: '20px 24px',
              textAlign: 'left',
              borderRadius: '12px',
              cursor: 'pointer',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '1.2rem',
              color: textDark,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = brandPrimary;
              e.currentTarget.style.color = brandPrimary;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = borderLight;
              e.currentTarget.style.color = textDark;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {opt.label}
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ flexShrink: 0 }}>
              <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </>
  );
}

function NoInterestStep() {
  return (
    <>
      <Q label="We'd love to hear from you." sub="Even without a project in mind, our team is happy to answer questions and explore what might be possible." />
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: textMuted, marginBottom: '3rem', lineHeight: 1.75 }}>
        Reach out any time and we can help you think through land, approvals, costs, and next steps.
      </p>
      <a
        href="https://anhart.ca/contact"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          background: brandPrimary,
          color: '#FFFFFF',
          borderRadius: '30px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          padding: '14px 32px',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(216, 58, 66, 0.25)',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        Contact us
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </>
  );
}

function LandStep({ data, setData, onNext, onBack }: { data: FormData; setData: (d: Partial<FormData>) => void; onNext: () => void; onBack: () => void }) {
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const locationTrimmed = data.location.trim();
  const errors = {
    location: !locationTrimmed ? 'Please enter an address, neighbourhood, or general area' : locationTrimmed.length < 5 ? 'Please provide more detail about the location' : undefined,
    province: !data.province ? 'Please select a province or territory' : undefined,
    isOwnedProperty: data.isOwnedProperty === null ? 'Please indicate whether you own the property' : undefined,
    estimatedLandCost: !data.estimatedLandCost.trim() ? 'Please enter estimated land value (use 0 for donated land)' : !isValidNumberString(data.estimatedLandCost) ? 'Please enter a valid number' : parseNumber(data.estimatedLandCost) < 0 ? 'Land value cannot be negative' : undefined,
  };

  const isValid = !errors.location && !errors.province && !errors.isOwnedProperty && !errors.estimatedLandCost;

  const handleNext = () => {
    setAttemptedSubmit(true);
    if (isValid) onNext();
  };

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={3} total={5} />
      <Q label="Tell us about the land." />
      <UnderlineTextarea placeholder="Address, neighbourhood, or general area..." value={data.location} onChange={(v) => setData({ location: v })} error={attemptedSubmit ? errors.location : undefined} />
      <UnderlineSelect value={data.province} onChange={(v) => setData({ province: v })} options={PROVINCES} placeholder="Select province or territory" error={attemptedSubmit ? errors.province : undefined} />
      <div style={{ marginTop: '1rem' }}>
        <SubLabel text="Is this your owned property?" />
        <RadioRow label="Yes, I already own the land" selected={data.isOwnedProperty === true} onSelect={() => setData({ isOwnedProperty: true })} />
        <RadioRow label="No, I would need to acquire it" selected={data.isOwnedProperty === false} onSelect={() => setData({ isOwnedProperty: false })} />
        {attemptedSubmit && errors.isOwnedProperty && (
          <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>{errors.isOwnedProperty}</p>
        )}
      </div>
      <UnderlineInput
        type="number"
        inputMode="decimal"
        placeholder={data.isOwnedProperty ? 'Estimated land value' : 'Estimated land acquisition cost'}
        value={data.estimatedLandCost}
        onChange={(v) => setData({ estimatedLandCost: v })}
        error={attemptedSubmit ? errors.estimatedLandCost : undefined}
      />
      <div style={{ marginTop: '2rem' }}>
        <ArrowBtn onClick={handleNext} disabled={false} />
      </div>
    </>
  );
}

function ProjectStep({ data, setData, onNext, onBack }: { data: FormData; setData: (d: Partial<FormData>) => void; onNext: () => void; onBack: () => void }) {
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const errors = {
    siteAreaSqFt: !data.siteAreaSqFt.trim() ? 'Please enter land area' : !isValidPositiveNumber(data.siteAreaSqFt) ? 'Please enter a valid number greater than 0' : undefined,
    grossFloorAreaSqFt: !data.grossFloorAreaSqFt.trim() ? 'Please enter total floor area' : !isValidPositiveNumber(data.grossFloorAreaSqFt) ? 'Please enter a valid number greater than 0' : undefined,
    totalUnits: !data.totalUnits.trim() ? 'Please enter number of units' : !isValidPositiveInteger(data.totalUnits) ? 'Please enter a whole number greater than 0' : undefined,
  };

  const isValid = !errors.siteAreaSqFt && !errors.grossFloorAreaSqFt && !errors.totalUnits;

  const handleNext = () => {
    setAttemptedSubmit(true);
    if (isValid) onNext();
  };

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={4} total={5} />
      <Q label="Now the proposed building size." />
      <UnderlineInput type="number" inputMode="decimal" placeholder="Land area in square feet" value={data.siteAreaSqFt} onChange={(v) => setData({ siteAreaSqFt: v })} error={attemptedSubmit ? errors.siteAreaSqFt : undefined} />
      <UnderlineInput type="number" inputMode="decimal" placeholder="Total floor area in square feet" value={data.grossFloorAreaSqFt} onChange={(v) => setData({ grossFloorAreaSqFt: v })} error={attemptedSubmit ? errors.grossFloorAreaSqFt : undefined} />
      <UnderlineInput type="number" inputMode="numeric" placeholder="Approximate number of units" value={data.totalUnits} onChange={(v) => setData({ totalUnits: v })} error={attemptedSubmit ? errors.totalUnits : undefined} />
      <div style={{ marginTop: '2rem' }}>
        <ArrowBtn onClick={handleNext} disabled={false} />
      </div>
    </>
  );
}

function AffordabilityStep({ data, setData, onNext, onBack }: { data: FormData; setData: (d: Partial<FormData>) => void; onNext: () => void; onBack: () => void }) {
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const toggle = (id: string) => {
    setData({
      populations: data.populations.includes(id)
        ? data.populations.filter((item) => item !== id)
        : [...data.populations, id],
    });
  };

  const errors = {
    populations: data.populations.length === 0 ? 'Please select at least one target population' : undefined,
    buildingType: !data.buildingType ? 'Please select a building type' : undefined,
    otherBuildingType: data.buildingType === 'other' && !data.otherBuildingType.trim() ? 'Please specify the building type' : undefined,
    rentModel: !data.rentModel ? 'Please select a rent model' : undefined,
  };

  const isValid = !errors.populations && !errors.buildingType && !errors.otherBuildingType && !errors.rentModel;

  const handleNext = () => {
    setAttemptedSubmit(true);
    if (isValid) onNext();
  };

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={5} total={5} />
      <Q label="What kind of housing are you aiming for?" sub="These selections set the rough cost and rent assumptions behind the estimate." />

      <SubLabel text="Who are we housing? (select all that apply)" />
      {POPS.map((item) => (
        <CheckRow key={item.id} label={item.label} checked={data.populations.includes(item.id)} onChange={() => toggle(item.id)} />
      ))}
      {attemptedSubmit && errors.populations && (
        <p style={{ margin: '-0.5rem 0 1rem', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>{errors.populations}</p>
      )}

      <Divider />

      <SubLabel text="What type of building fits the site?" />
      {BUILDINGS.map((item) => (
        <RadioRow key={item.id} label={item.label} sub={item.sub} selected={data.buildingType === item.id} onSelect={() => setData({ buildingType: item.id })} />
      ))}
      {attemptedSubmit && errors.buildingType && (
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>{errors.buildingType}</p>
      )}

      {data.buildingType === 'other' && (
        <div style={{ paddingLeft: '1rem', marginTop: '-0.5rem', marginBottom: '1.5rem', animation: 'fadeUp 0.3s ease both' }}>
          <UnderlineInput autoFocus placeholder="Please specify..." value={data.otherBuildingType} onChange={(v) => setData({ otherBuildingType: v })} error={attemptedSubmit ? errors.otherBuildingType : undefined} />
        </div>
      )}

      <Divider />

      <SubLabel text="What rent model are you aiming for?" />
      {RENTS.map((item) => (
        <RadioRow key={item.id} label={item.label} sub={item.sub} selected={data.rentModel === item.id} onSelect={() => setData({ rentModel: item.id })} />
      ))}
      {attemptedSubmit && errors.rentModel && (
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>{errors.rentModel}</p>
      )}

      <div style={{ marginTop: '2.5rem' }}>
        <ArrowBtn onClick={handleNext} disabled={false} label="Show rough estimate" />
      </div>
    </>
  );
}

function EstimateStep({
  data,
  estimate,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  data: FormData;
  estimate: HomeownerEstimate;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const output = estimate.output;
  const building = getSelectedBuildingLabel(data);
  const rent = getSelectedRentLabel(data);

  return (
    <>
      <BackBtn onClick={onBack} />
      <Q label="Here is your rough estimate." sub="This is a fast planning estimate based on the numbers you entered." />

      {output ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard label="Total Cost Benchmark" value={formatCurrency(output.costs.totalDevelopmentCost)} sub={`${formatCurrency(output.costMetrics.costPerUnit)} per home`} />
            <StatCard label="Funding Gap" value={formatCurrency(output.operations.fundingGap ?? 0)} sub={`${formatCurrency(output.operations.maxMortgage ?? 0)} max mortgage`} />
            <StatCard label="Gross Floor Area" value={`${formatNumber(output.areas.resolvedGsf ?? 0)} sf`} sub={`${formatNumber(output.areas.resolvedTotalUnits ?? 0)} homes`} />
            <StatCard label="Net Operating Income" value={formatCurrency(output.operations.noi)} sub={`Cap rate ${formatPercent(output.operations.capRate)}`} />
          </div>

          <div style={{ borderTop: `1px solid ${borderLight}`, paddingTop: '1.75rem', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontFamily: 'Roboto, sans-serif', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: textMuted, fontWeight: 600 }}>
              Assumptions used
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <StatCard label="Building Type" value={building} sub={`Land ${data.isOwnedProperty ? 'treated as sponsor equity' : 'treated as acquisition cost'}`} />
              <StatCard label="Rent Model" value={rent} sub={`${formatCurrency(estimate.input.operations.residentialRentPerSqFt ?? 0)}/sf/mo assumed`} />
              <StatCard label="Hard Cost Benchmark" value={`${formatCurrency(estimate.input.financials.hardCostPerSqFt ?? 0)}/sf`} sub={`${formatPercent(estimate.input.financials.softCostPercent ?? 0)} soft costs`} />
              <StatCard label="Efficiency Ratio" value={formatPercent(estimate.input.physicals.efficiencyRatio ?? 0)} sub={`${estimate.input.physicals.stories ?? 0} storeys assumed`} />
            </div>
          </div>

          <div style={{ padding: '1rem 1.1rem', borderRadius: '14px', background: brandPrimaryLight, border: `1px solid #F5C6C8`, marginBottom: '1.75rem' }}>
            <p style={{ margin: 0, fontFamily: 'Roboto, sans-serif', fontSize: '0.96rem', color: textDark, lineHeight: 1.6 }}>
              This Class D estimate ±30% provides a high-level snapshot for initial planning. Real-world constraints and site-specific due diligence will be required for accuracy. Contact Anhart today to discuss bridging your project&apos;s funding gaps. For a fully refined, professional project estimate and development roadmap, we invite you to sign an engagement letter with our team.
            </p>
          </div>
        </>
      ) : (
        <div style={{ padding: '1rem 1.1rem', borderRadius: '14px', background: '#FFF8E7', border: '1px solid #FCD34D', marginBottom: '1.75rem' }}>
          <p style={{ margin: 0, fontFamily: 'Roboto, sans-serif', fontSize: '0.96rem', color: textDark, lineHeight: 1.6 }}>
            We need a bit more project detail before the rough TDCE can be calculated.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <ArrowBtn onClick={onSubmit} disabled={!output || isSubmitting} label={isSubmitting ? 'Sending…' : 'Send this estimate to Anhart'} />
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.9rem',
            color: textMuted,
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease',
            padding: 0,
            marginTop: '1.5rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = textDark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
        >
          Adjust inputs
        </button>
      </div>
    </>
  );
}

function CompleteStep({ data, estimate, onRestart }: { data: FormData; estimate: HomeownerEstimate; onRestart: () => void }) {
  const output = estimate.output;
  const rows = [
    ['Contact', `${data.firstName} ${data.lastName} · ${data.email}`],
    ['Location', `${data.location}${data.province ? `, ${data.province}` : ''}`],
    ['Building', getSelectedBuildingLabel(data)],
    ['Rent model', getSelectedRentLabel(data)],
    ['Estimated TDCE', output ? formatCurrency(output.costs.totalDevelopmentCost) : 'Not available'],
    ['Funding gap', output ? formatCurrency(output.operations.fundingGap ?? 0) : 'Not available'],
  ];

  return (
    <>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: brandPrimary, marginBottom: '2rem', fontWeight: 600 }}>
        Done
      </p>
      <Q label={`Thank you, ${data.firstName}.`} sub="We've received your rough TDCE request and our team will follow up with next-step advice." />
      <div style={{ borderTop: `1px solid ${borderLight}`, paddingTop: '2rem', marginBottom: '3.5rem' }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: '1.2rem', fontFamily: 'Roboto, sans-serif' }}>
            <span style={{ color: textMuted, fontSize: '0.9rem', fontWeight: 500 }}>{label}</span>
            <span style={{ color: textDark, fontSize: '1.1rem' }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <a
          href="https://anhart.ca/contact"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: brandPrimary,
            color: '#FFFFFF',
            borderRadius: '30px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '14px 32px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(216, 58, 66, 0.25)',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Contact our team
        </a>
        <button
          onClick={onRestart}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.9rem',
            color: textMuted,
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = textDark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
        >
          Start over
        </button>
      </div>
    </>
  );
}

export function TdceSimplifiedView({ onBack }: TdceSimplifiedViewProps) {
  const [step, setStep] = useState<Step>('contact');
  const [form, setForm] = useState<FormData>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const update = (d: Partial<FormData>) => setForm((current) => ({ ...current, ...d }));
  const { toast } = useToast();

  const estimate = useMemo(() => buildHomeownerEstimate(form), [form]);

  const handleCompleteSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const body = new URLSearchParams({
        form_type: 'tdce_simplified',
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        message: buildTdceSimplifiedMessage(form, estimate),
        organization: form.organization || '',
        timestamp: new Date().toISOString(),
      });

      const res = await fetch('/api/submit-tdce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || data.success === false) {
        toast({ title: 'Submission failed', description: data?.error ?? 'Please try again.', variant: 'destructive' });
      } else {
        toast({ title: 'Estimate sent', description: "We've received your rough TDCE request and will be in touch shortly." });
      }
    } catch {
      toast({ title: 'Submission failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
      setStep('complete');
    }
  }, [estimate, form, toast]);

  const progressSteps: Step[] = ['contact', 'interest', 'land', 'project', 'affordability'];
  const pct = Math.max(0, (progressSteps.indexOf(step) / (progressSteps.length - 1)) * 100);
  const showProgress = !['no-interest', 'estimate', 'complete'].includes(step);

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) }
          to { opacity: 1; transform: translateY(0) }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 650 }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: textMuted,
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '3rem',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = textDark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to choose your path
        </button>

        {showProgress && (
          <div style={{ width: '100%', height: 4, background: borderLight, borderRadius: 2, marginBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: brandPrimary, transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }} />
          </div>
        )}

        <div key={step} style={{ animation: 'fadeUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
          {step === 'contact' && <ContactStep data={form} setData={update} onNext={() => setStep('interest')} />}
          {step === 'interest' && <InterestStep onYes={() => setStep('land')} onNo={() => setStep('no-interest')} />}
          {step === 'no-interest' && <NoInterestStep />}
          {step === 'land' && <LandStep data={form} setData={update} onNext={() => setStep('project')} onBack={() => setStep('interest')} />}
          {step === 'project' && <ProjectStep data={form} setData={update} onNext={() => setStep('affordability')} onBack={() => setStep('land')} />}
          {step === 'affordability' && <AffordabilityStep data={form} setData={update} onNext={() => setStep('estimate')} onBack={() => setStep('project')} />}
          {step === 'estimate' && <EstimateStep data={form} estimate={estimate} onBack={() => setStep('affordability')} onSubmit={handleCompleteSubmit} isSubmitting={isSubmitting} />}
          {step === 'complete' && <CompleteStep data={form} estimate={estimate} onRestart={() => { setStep('contact'); setForm(defaultData); }} />}
        </div>
      </div>
    </div>
  );
}