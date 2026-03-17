'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import type { TdceInput, UnitMixItem } from '@/types/tdce';
import { getEmptyTdceInput } from '@/data/tdceDefaults';
import { TdceReview } from './TdceReview';
import {
  parseRegionBuildingId,
  getOptionsForRegion,
  getCostForRegionBuildingWithUplifts,
  REGION_KEYS,
  REGION_LABELS,
  PROVINCE_TO_REGION,
  type RegionKey,
  type RegionBuildingOption,
} from '@/data/constructionBenchmarks';

interface TdceDeveloperWizardProps {
  onBack: () => void;
  onComplete: (data: TdceInput) => void;
  onSubmit: (data: TdceInput) => Promise<void>;
}

type Step = 
  | 'contact'
  | 'project-info' 
  | 'site-details' 
  | 'unit-mix' 
  | 'financials' 
  | 'operations' 
  | 'review';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/* ── Palette ── */
const brandPrimary = '#D83A42'; 
const brandPrimaryLight = '#FFF0F0';
const textDark = '#1A1A1A';
const textMuted = '#6C757D';
const borderLight = '#E2E8F0';

/* ── Primitives (reused from Simplified View) ── */
function UnderlineInput({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  autoFocus = false,
  prefix,
  suffix,
  error,
  inputMode,
}: {
  placeholder: string; 
  value: string | number; 
  onChange: (v: string) => void; 
  type?: string; 
  autoFocus?: boolean;
  prefix?: string;
  suffix?: string;
  error?: string;
  inputMode?: 'text' | 'email' | 'numeric' | 'decimal';
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
        left: (showLabel || !prefix) ? 0 : '20px',
        fontSize: showLabel ? '0.85rem' : '1.2rem',
        color: hasError ? brandPrimary : isFocused ? brandPrimary : textMuted,
        fontFamily: 'Roboto, sans-serif',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        fontWeight: showLabel ? 500 : 400
      }}>
        {placeholder}
      </label>
      {prefix && (
        <span style={{ 
          position: 'absolute', left: 0, top: '24px', 
          fontFamily: 'Roboto, sans-serif', fontSize: '1.2rem', color: textMuted 
        }}>
          {prefix}
        </span>
      )}
      <input
        autoFocus={autoFocus} type={type} value={value} inputMode={inputMode}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          borderBottom: `2px solid ${hasError ? brandPrimary : isFocused ? brandPrimary : borderLight}`, outline: 'none',
          fontFamily: 'Roboto, sans-serif', fontSize: '1.2rem', color: textDark,
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: prefix ? '20px' : '0',
          paddingRight: suffix ? '40px' : '0',
        }}
      />
      {hasError && (
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: brandPrimary, fontFamily: 'Roboto, sans-serif' }}>
          {error}
        </p>
      )}
      {suffix && (
        <span style={{ 
          position: 'absolute', right: 0, top: '24px', 
          fontFamily: 'Roboto, sans-serif', fontSize: '1rem', color: textMuted 
        }}>
          {suffix}
        </span>
      )}
    </div>
  );
}

function ArrowBtn({ onClick, disabled, label = 'Continue' }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      background: disabled ? '#F1F3F5' : brandPrimary,
      border: 'none', borderRadius: '30px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? '#ADB5BD' : '#FFFFFF',
      fontFamily: 'Roboto, sans-serif', fontSize: '1rem', fontWeight: 500,
      letterSpacing: '0.05em', padding: '14px 32px', marginTop: '1.5rem',
      transition: 'all 0.2s ease',
      boxShadow: disabled ? 'none' : '0 4px 14px rgba(216, 58, 66, 0.25)',
    }}
    onMouseEnter={e => !disabled && (e.currentTarget.style.transform = 'translateY(-2px)')}
    onMouseLeave={e => !disabled && (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {label}
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer', color: textMuted,
      fontFamily: 'Roboto, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em',
      textTransform: 'uppercase', padding: 0, marginBottom: '3rem',
      display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'color 0.2s ease',
    }}
    onMouseEnter={e => (e.currentTarget.style.color = textDark)}
    onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
    >
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
        <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </button>
  );
}

function Q({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '2.2rem', fontWeight: 400, color: textDark, lineHeight: 1.3, margin: 0 }}>{label}</h2>
      {sub && <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: textMuted, marginTop: 12, margin: '12px 0 0', lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

function Counter({ n, total }: { n: number; total: number }) {
  return <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: textMuted, marginBottom: '2rem', fontWeight: 500 }}>{n} <span style={{opacity: 0.5}}>/ {total}</span></p>;
}

function SubLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem', color: textMuted, marginBottom: '1rem', marginTop: 0, fontWeight: 500 }}>{text}</p>;
}

function RadioRow({ label, sub, selected, onSelect }: { label: string; sub?: string; selected: boolean; onSelect: () => void }) {
  return (
    <label onClick={onSelect} style={{ 
      display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer', marginBottom: '1rem',
      padding: '18px 20px', border: `2px solid ${selected ? brandPrimary : borderLight}`,
      borderRadius: '12px', background: selected ? brandPrimaryLight : 'transparent',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={e => !selected && (e.currentTarget.style.borderColor = '#CBD5E1')}
    onMouseLeave={e => !selected && (e.currentTarget.style.borderColor = borderLight)}
    >
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        border: `2px solid ${selected ? brandPrimary : '#CBD5E1'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: 2, transition: 'all 0.2s ease',
      }}>
        {selected && <span style={{ width: 10, height: 10, borderRadius: '50%', background: brandPrimary }} />}
      </span>
      <span>
        <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: selected ? brandPrimary : textDark, fontWeight: selected ? 500 : 400, display: 'block' }}>{label}</span>
        {sub && <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem', color: textMuted, display: 'block', marginTop: 4, lineHeight: 1.4 }}>{sub}</span>}
      </span>
    </label>
  );
}

function UnderlineSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  placeholder: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = !!value;
  const showLabel = isFocused || hasValue;

  return (
    <div style={{ marginBottom: '2.5rem', position: 'relative', paddingTop: '1.2rem' }}>
      <label style={{
        position: 'absolute',
        top: showLabel ? 0 : '24px',
        left: 0,
        fontSize: showLabel ? '0.85rem' : '1.2rem',
        color: isFocused ? brandPrimary : textMuted,
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
          borderBottom: `2px solid ${isFocused ? brandPrimary : borderLight}`,
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
      <span style={{ position: 'absolute', right: 0, top: '24px', color: textMuted, pointerEvents: 'none' }}>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

/* ── Step Components ── */

function ContactStep({ data, update, onNext }: { data: TdceInput; update: (d: Partial<TdceInput>) => void; onNext: () => void }) {
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const parts = (data.meta.contactName || '').trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  const email = data.meta.contactEmail || '';
  const organization = data.meta.partners?.developer || '';

  const firstNameTrimmed = firstName.trim();
  const lastNameTrimmed = lastName.trim();
  const emailTrimmed = email.trim();
  const orgTrimmed = organization.trim();

  const errors = {
    firstName: !firstNameTrimmed ? 'Please enter your first name' : firstNameTrimmed.length < 2 ? 'Please enter a valid first name' : undefined,
    lastName: !lastNameTrimmed ? 'Please enter your last name' : lastNameTrimmed.length < 2 ? 'Please enter a valid last name' : undefined,
    email: !emailTrimmed ? 'Please enter your email address' : !isValidEmail(email) ? 'Please enter a valid email address' : undefined,
    organization: !orgTrimmed ? 'Please enter your organization' : orgTrimmed.length < 2 ? 'Please enter a valid organization name' : undefined,
  };

  const isValid = !errors.firstName && !errors.lastName && !errors.email && !errors.organization;

  const handleNext = () => {
    setAttemptedSubmit(true);
    if (isValid) {
      update({
        meta: {
          ...data.meta,
          contactName: `${firstNameTrimmed} ${lastNameTrimmed}`.trim(),
          contactEmail: emailTrimmed,
          partners: { ...data.meta.partners, developer: orgTrimmed || undefined },
        },
      });
      onNext();
    }
  };

  const setFirstName = (v: string) => update({ meta: { ...data.meta, contactName: `${v} ${lastName}`.trim() } });
  const setLastName = (v: string) => update({ meta: { ...data.meta, contactName: `${firstName} ${v}`.trim() } });
  const setEmail = (v: string) => update({ meta: { ...data.meta, contactEmail: v } });
  const setOrganization = (v: string) => update({ meta: { ...data.meta, partners: { ...data.meta.partners, developer: v } } });

  return (
    <>
      <Counter n={1} total={6} />
      <Q label="Let's start with you." sub="A few contact details so we can save and follow up on your Total Cost Benchmark." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
        <UnderlineInput autoFocus placeholder="First name" value={firstName} onChange={setFirstName} error={attemptedSubmit ? errors.firstName : undefined} />
        <UnderlineInput placeholder="Last name" value={lastName} onChange={setLastName} error={attemptedSubmit ? errors.lastName : undefined} />
      </div>
      <UnderlineInput type="email" placeholder="Email address" value={email} onChange={setEmail} error={attemptedSubmit ? errors.email : undefined} inputMode="email" />
      <UnderlineInput placeholder="Organization" value={organization} onChange={setOrganization} error={attemptedSubmit ? errors.organization : undefined} />
      <ArrowBtn onClick={handleNext} disabled={false} />
    </>
  );
}

function ProjectInfoStep({ data, update, onNext }: { data: TdceInput; update: (d: Partial<TdceInput>) => void; onNext: () => void }) {
  const valid = data.meta.projectTitle && data.meta.address && data.meta.city && data.meta.province;
  
  return (
    <>
      <Counter n={2} total={6} />
      <Q label="Let's start with project basics." sub="Where is this development located and who is behind it?" />
      <UnderlineInput 
        autoFocus 
        placeholder="Project Title (e.g. Maple Street Housing)" 
        value={data.meta.projectTitle || ''} 
        onChange={v => update({ meta: { ...data.meta, projectTitle: v } })} 
      />
      <UnderlineInput 
        placeholder="Street Address" 
        value={data.meta.address || ''} 
        onChange={v => update({ meta: { ...data.meta, address: v } })} 
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
        <UnderlineInput 
          placeholder="City" 
          value={data.meta.city || ''} 
          onChange={v => update({ meta: { ...data.meta, city: v } })} 
        />
        <UnderlineSelect 
          placeholder="Select Province"
          value={data.meta.province || ''}
          onChange={v => update({ meta: { ...data.meta, province: v } })}
          options={[
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
          ]}
        />
      </div>
      <UnderlineInput 
        placeholder="Developer / Organization" 
        value={data.meta.partners?.developer || ''} 
        onChange={v => update({ meta: { ...data.meta, partners: { ...data.meta.partners, developer: v } } })} 
      />
      <ArrowBtn onClick={onNext} disabled={!valid} />
    </>
  );
}

function SiteDetailsStep({ data, update, onNext, onBack }: { data: TdceInput; update: (d: Partial<TdceInput>) => void; onNext: () => void; onBack: () => void }) {
  const valid = (data.physicals.siteAreaSqFt || 0) > 0 && ((data.physicals.grossFloorAreaSqFt || 0) > 0 || (data.physicals.targetFSR || 0) > 0);

  useEffect(() => {
    const type = data.meta.constructionType;
    if (!type) return;

    let stories = 0;
    if (type === 'Townhouse (Wood-frame)') stories = 3;
    else if (type === 'Apartment (Wood-frame, 1-4 storeys)') stories = 4;
    else if (type === 'Apartment (Wood-frame, 5-6 storeys)') stories = 6;
    else if (type === 'Apartment (Concrete, up to 12 storeys)') stories = 12;

    if (stories > 0 && data.physicals.stories !== stories) {
      update({ physicals: { ...data.physicals, stories } });
    }
  }, [data.meta.constructionType, update]); // Removed data.physicals from deps to avoid infinite loop if update triggers re-render with new physicals object

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={3} total={6} />
      <Q label="Tell us about the site and building shape." sub="How much land are we working with and what's the building size?" />
      
      <UnderlineSelect 
        placeholder="Building Type"
        value={data.meta.constructionType || ''}
        onChange={v => update({ meta: { ...data.meta, constructionType: v } })}
        options={[
          { id: 'Townhouse (Wood-frame)', label: 'Townhouse (Wood-frame)' },
          { id: 'Apartment (Wood-frame, 1-4 storeys)', label: 'Apartment (Wood-frame, 1-4 storeys)' },
          { id: 'Apartment (Wood-frame, 5-6 storeys)', label: 'Apartment (Wood-frame, 5-6 storeys)' },
          { id: 'Apartment (Concrete, up to 12 storeys)', label: 'Apartment (Concrete, up to 12 storeys)' },
        ]}
      />

      <UnderlineInput 
        autoFocus
        type="number"
        placeholder="Site Area" 
        suffix="SQ FT"
        value={data.physicals.siteAreaSqFt ?? ''} 
        onChange={v => update({ physicals: { ...data.physicals, siteAreaSqFt: v === '' ? undefined : parseFloat(v) } })} 
      />

      <div style={{ marginBottom: '2.5rem' }}>
        <SubLabel text="How would you like to define the building size?" />
        <RadioRow 
          label="Total Gross Floor Area (GFA)" 
          selected={data.physicals.gfaSource === 'declared'} 
          onSelect={() => update({ physicals: { ...data.physicals, gfaSource: 'declared' } })} 
        />
        <RadioRow 
          label="Floor Space Ratio (FSR)" 
          selected={data.physicals.gfaSource === 'from_fsr'} 
          onSelect={() => update({ physicals: { ...data.physicals, gfaSource: 'from_fsr' } })} 
        />
      </div>

      {data.physicals.gfaSource === 'declared' ? (
        <UnderlineInput 
          type="number"
          placeholder="Gross Floor Area (GFA)" 
          suffix="SQ FT"
          value={data.physicals.grossFloorAreaSqFt ?? ''} 
          onChange={v => update({ physicals: { ...data.physicals, grossFloorAreaSqFt: v === '' ? undefined : parseFloat(v) } })} 
        />
      ) : (
        <UnderlineInput 
          type="number"
          placeholder="Target FSR" 
          value={data.physicals.targetFSR ?? ''} 
          onChange={v => update({ physicals: { ...data.physicals, targetFSR: v === '' ? undefined : parseFloat(v) } })} 
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
        <UnderlineInput 
          type="number"
          placeholder="Stories" 
          value={data.physicals.stories ?? ''} 
          onChange={v => update({ physicals: { ...data.physicals, stories: v === '' ? undefined : parseInt(v) } })} 
        />
        <UnderlineInput 
          type="number"
          placeholder="Parking Spaces" 
          value={data.physicals.parkingSpaces ?? ''} 
          onChange={v => update({ physicals: { ...data.physicals, parkingSpaces: v === '' ? undefined : parseInt(v) } })} 
        />
      </div>

      <ArrowBtn onClick={onNext} disabled={!valid} />
    </>
  );
}

function BuildingProgramStep({ data, update, onNext, onBack }: { data: TdceInput; update: (d: Partial<TdceInput>) => void; onNext: () => void; onBack: () => void }) {
  const valid = (data.physicals.totalUnits || 0) > 0;

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={4} total={6} />
      <Q label="What's the residential program?" sub="How many homes and what type of building is this?" />
      
      <UnderlineInput 
        autoFocus
        type="number"
        placeholder="Total Residential Units" 
        suffix="UNITS"
        value={data.physicals.totalUnits ?? ''} 
        onChange={v => update({ physicals: { ...data.physicals, totalUnits: v === '' ? undefined : parseInt(v) } })} 
      />

      <UnderlineInput 
        type="number"
        placeholder="Commercial Space (Optional)" 
        suffix="SQ FT"
        value={data.financials.commercialSqFt ?? ''} 
        onChange={v => update({ financials: { ...data.financials, commercialSqFt: v === '' ? undefined : parseFloat(v) } })} 
      />

      <ArrowBtn onClick={onNext} disabled={!valid} />
    </>
  );
}

function FullBenchmarkSelector({ data, update, onClose }: { data: TdceInput; update: (d: Partial<TdceInput>) => void; onClose: () => void }) {
  const parsed = data.financials.constructionBenchmarkId
    ? parseRegionBuildingId(data.financials.constructionBenchmarkId)
    : null;
  const provinceRegion = data.meta?.province?.trim()
    ? PROVINCE_TO_REGION[data.meta.province.trim()]
    : null;
  const currentRegion: RegionKey = parsed?.region ?? provinceRegion ?? 'vancouver';
  const upliftParams = {
    escalationPercent: data.financials.escalationUpliftPercent ?? 0,
    complexityPercent: data.financials.complexityUpliftPercent ?? 0,
    locationUplift: false,
  };

  return (
    <div
      style={{
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(248, 250, 252, 0.9)',
        borderRadius: '8px',
        border: `1px solid ${borderLight}`,
      }}
    >
      <p style={{ fontSize: '0.75rem', color: textMuted, marginBottom: '0.75rem' }}>
        Change region
      </p>
      <div style={{ marginBottom: '0.75rem' }}>
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
              : data.financials.hardCostPerSqFt;
            update({ financials: { ...data.financials, constructionBenchmarkId: id ?? undefined, hardCostPerSqFt: id ? newCost : data.financials.hardCostPerSqFt } });
          }}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '6px',
            border: `1px solid ${borderLight}`,
            fontSize: '0.875rem',
            color: textDark,
          }}
        >
          {REGION_KEYS.map((r) => (
            <option key={r} value={r}>{REGION_LABELS[r]}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={onClose}
        style={{
          fontSize: '0.7rem',
          color: textMuted,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Close
      </button>
    </div>
  );
}

function FinancialsStep({ data, update, onNext, onBack }: { data: TdceInput; update: (d: Partial<TdceInput>) => void; onNext: () => void; onBack: () => void }) {
  const [showFullBenchmarkSelection, setShowFullBenchmarkSelection] = useState(false);
  const valid = (data.financials.hardCostPerSqFt || 0) > 0;

  // Region from province or current benchmark
  const parsed = data.financials.constructionBenchmarkId
    ? parseRegionBuildingId(data.financials.constructionBenchmarkId)
    : null;
  const provinceRegion = data.meta?.province?.trim()
    ? PROVINCE_TO_REGION[data.meta.province.trim()]
    : null;
  const currentRegion: RegionKey = parsed?.region ?? provinceRegion ?? 'vancouver';
  const regionOptions = getOptionsForRegion(currentRegion);
  const upliftParams = {
    escalationPercent: data.financials.escalationUpliftPercent ?? 0,
    complexityPercent: data.financials.complexityUpliftPercent ?? 0,
    locationUplift: false,
  };

  const handleRegionBuildingSelect = (option: RegionBuildingOption) => {
    const newCost = getCostForRegionBuildingWithUplifts(currentRegion, option.buildingType, upliftParams);
    update({ financials: { ...data.financials, constructionBenchmarkId: option.id, hardCostPerSqFt: newCost } });
  };

  const regionLabel = parsed
    ? REGION_LABELS[parsed.region]
    : provinceRegion
      ? REGION_LABELS[provinceRegion]
      : 'your region';

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={5} total={6} />
      <Q label="Let's talk dollars." sub="Land acquisition and construction costs are the biggest factors." />
      
      <UnderlineInput 
        autoFocus
        type="number"
        placeholder="Land Acquisition Cost" 
        prefix="$"
        value={data.financials.landCost ?? ''} 
        onChange={v => update({ financials: { ...data.financials, landCost: v === '' ? undefined : parseFloat(v) } })} 
      />

      <div style={{ marginBottom: '2.5rem' }}>
        <SubLabel text={`Select a Hard Cost Benchmark ($/SQ FT) — ${REGION_LABELS[currentRegion]}`} />
        {regionOptions.map((o) => (
          <RadioRow
            key={o.id}
            label={`${o.label} — $${o.low}–$${o.high}/sf`}
            selected={data.financials.constructionBenchmarkId === o.id}
            onSelect={() => handleRegionBuildingSelect(o)}
          />
        ))}
        <RadioRow 
          label="Custom" 
          selected={data.financials.constructionBenchmarkId === 'custom' || (!data.financials.constructionBenchmarkId && !parsed)}
          onSelect={() => update({ financials: { ...data.financials, constructionBenchmarkId: 'custom' } })}
        />

        {/* Transparent footer: current benchmark + click to expand full selection */}
        <button
          type="button"
          onClick={() => setShowFullBenchmarkSelection((v) => !v)}
          style={{
            marginTop: '1rem',
            fontSize: '11px',
            color: 'rgba(100, 116, 139, 0.7)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          This is the current hard-cost benchmark for {regionLabel} by Altus Group. To change{' '}
          <span style={{ textDecoration: 'underline', textDecorationSkipInk: 'auto' }}>click here</span>
          <span style={{ marginLeft: '2px' }} aria-hidden>↓</span>
        </button>

        {/* Expanded: change region to see different region's options */}
        {showFullBenchmarkSelection && (
          <FullBenchmarkSelector data={data} update={update} onClose={() => setShowFullBenchmarkSelection(false)} />
        )}
      </div>

      {(data.financials.constructionBenchmarkId === 'custom' || !data.financials.constructionBenchmarkId) && !parsed && (
        <UnderlineInput 
          type="number"
          placeholder="Hard Cost per SQ FT" 
          prefix="$"
          suffix="/SF"
          value={data.financials.hardCostPerSqFt ?? ''} 
          onChange={v => update({ financials: { ...data.financials, hardCostPerSqFt: v === '' ? undefined : parseFloat(v) } })} 
        />
      )}

      <UnderlineInput 
        type="number"
        placeholder="Sponsor Equity (Optional)" 
        prefix="$"
        value={data.financials.sponsorEquity ?? ''} 
        onChange={v => update({ financials: { ...data.financials, sponsorEquity: v === '' ? undefined : parseFloat(v) } })} 
      />

      <ArrowBtn onClick={onNext} disabled={!valid} />
    </>
  );
}

function OperationsStep({ data, update, onNext, onBack }: { data: TdceInput; update: (d: Partial<TdceInput>) => void; onNext: () => void; onBack: () => void }) {
  const [rentInputMode, setRentInputMode] = useState<'per-sf' | 'per-unit'>('per-unit');
  // Initialize from existing data if possible
  const [avgRentPerUnit, setAvgRentPerUnit] = useState<string>(() => {
    const units = data.physicals.totalUnits || 0;
    const gfa = data.physicals.gfaSource === 'declared' 
      ? (data.physicals.grossFloorAreaSqFt || 0)
      : (data.physicals.siteAreaSqFt || 0) * (data.physicals.targetFSR || 0);
    const efficiency = data.physicals.efficiencyRatio || 0.85;
    const rentPerSf = data.operations.residentialRentPerSqFt || 0;

    if (units > 0 && gfa > 0 && rentPerSf > 0) {
      const netArea = gfa * efficiency;
      const totalRent = rentPerSf * netArea;
      return Math.round(totalRent / units).toString();
    }
    return '';
  });

  // Auto-calculate SF rent if in per-unit mode
  useEffect(() => {
    if (rentInputMode === 'per-unit' && avgRentPerUnit) {
      const rent = parseFloat(avgRentPerUnit) || 0;
      const units = data.physicals.totalUnits || 0;
      const gfa = data.physicals.gfaSource === 'declared' 
        ? (data.physicals.grossFloorAreaSqFt || 0)
        : (data.physicals.siteAreaSqFt || 0) * (data.physicals.targetFSR || 0);
      const efficiency = data.physicals.efficiencyRatio || 0.85;
      
      if (units > 0 && gfa > 0) {
        const netRentableArea = gfa * efficiency;
        const totalMonthlyRent = rent * units;
        const rentPerSf = totalMonthlyRent / netRentableArea;
        const roundedSf = Math.round(rentPerSf * 100) / 100;
        if (data.operations.residentialRentPerSqFt !== roundedSf) {
          update({ operations: { ...data.operations, residentialRentPerSqFt: roundedSf } });
        }
      }
    }
  }, [avgRentPerUnit, rentInputMode, data.physicals.totalUnits, data.physicals.grossFloorAreaSqFt, data.physicals.siteAreaSqFt, data.physicals.targetFSR, data.physicals.gfaSource, data.physicals.efficiencyRatio, update]);

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={6} total={6} />
      <Q label="Lastly, operating assumptions." sub="What are the expected rents and expenses?" />
      
      <div style={{ marginBottom: '2.5rem' }}>
        <SubLabel text="How would you like to enter rent?" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button 
            onClick={() => setRentInputMode('per-unit')}
            style={{
              padding: '12px', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 500,
              background: rentInputMode === 'per-unit' ? brandPrimaryLight : 'white',
              border: `2px solid ${rentInputMode === 'per-unit' ? brandPrimary : borderLight}`,
              color: rentInputMode === 'per-unit' ? brandPrimary : textMuted,
              cursor: 'pointer'
            }}
          >
            Average Rent / Unit
          </button>
          <button 
            onClick={() => setRentInputMode('per-sf')}
            style={{
              padding: '12px', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 500,
              background: rentInputMode === 'per-sf' ? brandPrimaryLight : 'white',
              border: `2px solid ${rentInputMode === 'per-sf' ? brandPrimary : borderLight}`,
              color: rentInputMode === 'per-sf' ? brandPrimary : textMuted,
              cursor: 'pointer'
            }}
          >
            Rent / SQ FT
          </button>
        </div>
      </div>

      {rentInputMode === 'per-unit' ? (
        <UnderlineInput 
          autoFocus
          type="number"
          placeholder="Average Monthly Rent per Unit" 
          prefix="$"
          suffix="/mo"
          value={avgRentPerUnit} 
          onChange={v => setAvgRentPerUnit(v)} 
        />
      ) : (
        <UnderlineInput 
          autoFocus
          type="number"
          placeholder="Average Monthly Rent per SQ FT" 
          prefix="$"
          suffix="/SF"
          value={data.operations.residentialRentPerSqFt ?? ''} 
          onChange={v => update({ operations: { ...data.operations, residentialRentPerSqFt: v === '' ? undefined : parseFloat(v) } })} 
        />
      )}

      {rentInputMode === 'per-unit' && (
        <p style={{ marginTop: '-2rem', marginBottom: '2rem', fontSize: '0.85rem', color: textMuted }}>
          {data.operations.residentialRentPerSqFt ? (
            <>Calculated rate: <strong style={{ color: textDark }}>${data.operations.residentialRentPerSqFt}/SF</strong></>
          ) : (
            <span style={{ color: brandPrimary }}>Fill in building size (Step 2) to calculate SF rate</span>
          )}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
        <UnderlineInput 
          type="number"
          placeholder="Vacancy Rate" 
          suffix="%"
          value={data.operations.vacancyRate != null ? data.operations.vacancyRate * 100 : ''} 
          onChange={v => update({ operations: { ...data.operations, vacancyRate: v === '' ? undefined : (parseFloat(v) / 100) } })} 
        />
        <UnderlineInput 
          type="number"
          placeholder="Expense Ratio" 
          suffix="%"
          value={data.operations.operatingExpenseRatio != null ? data.operations.operatingExpenseRatio * 100 : ''} 
          onChange={v => update({ operations: { ...data.operations, operatingExpenseRatio: v === '' ? undefined : (parseFloat(v) / 100) } })} 
        />
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <SubLabel text="Debt Financing Program" />
        <RadioRow 
          label="CMHC MLI Select (50-yr Amortization)" 
          selected={data.operations.amortizationYears === 50}
          onSelect={() => update({ operations: { ...data.operations, amortizationYears: 50, dscrTarget: 1.1 } })}
        />
        <RadioRow 
          label="Standard Commercial (25-yr Amortization)" 
          selected={data.operations.amortizationYears === 25}
          onSelect={() => update({ operations: { ...data.operations, amortizationYears: 25, dscrTarget: 1.25 } })}
        />
      </div>

      <ArrowBtn onClick={onNext} label="Review Estimate" />
    </>
  );
}

/* ══ Main Wizard Component ══ */
export function TdceDeveloperWizard({ onBack, onComplete }: TdceDeveloperWizardProps) {
  const [step, setStep] = useState<Step>('contact');
  const [form, setForm] = useState<TdceInput>(getEmptyTdceInput());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const update = useCallback((updates: Partial<TdceInput>) => {
    setForm(prev => ({
      ...prev,
      ...updates,
      meta: { ...prev.meta, ...updates.meta },
      physicals: { ...prev.physicals, ...updates.physicals },
      financials: { ...prev.financials, ...updates.financials },
      operations: { ...prev.operations, ...updates.operations },
    }));
  }, []);

  const progressSteps: Step[] = ['contact', 'project-info', 'site-details', 'unit-mix', 'financials', 'operations', 'review'];
  const pct = (progressSteps.indexOf(step) / (progressSteps.length - 1)) * 100;

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(20px) } 
          to { opacity: 1; transform: translateY(0) } 
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 650 }}>
        {/* Back to choose path — above the gray line */}
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
            padding: 0,
            marginBottom: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = textDark; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = textMuted; }}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to choose path
        </button>

        {/* Progress Bar (gray line) */}
        {step !== 'review' && (
          <div style={{ width: '100%', height: 4, background: borderLight, borderRadius: 2, marginBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: brandPrimary, transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }} />
          </div>
        )}

        {/* content */}
        <div key={step} style={{ animation: 'fadeUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
          {step === 'contact' && <ContactStep data={form} update={update} onNext={() => setStep('project-info')} />}
          {step === 'project-info' && <ProjectInfoStep data={form} update={update} onNext={() => setStep('site-details')} />}
          {step === 'site-details' && <SiteDetailsStep data={form} update={update} onNext={() => setStep('unit-mix')} onBack={() => setStep('project-info')} />}
          {step === 'unit-mix' && <BuildingProgramStep data={form} update={update} onNext={() => setStep('financials')} onBack={() => setStep('site-details')} />}
          {step === 'financials' && <FinancialsStep data={form} update={update} onNext={() => setStep('operations')} onBack={() => setStep('unit-mix')} />}
          {step === 'operations' && <OperationsStep data={form} update={update} onNext={() => setStep('review')} onBack={() => setStep('financials')} />}
          {step === 'review' && (
            <TdceReview 
              data={form} 
              onEdit={(targetStep) => setStep(targetStep as Step)} 
              onComplete={() => onComplete(form)}
              onSubmit={() => onSubmit(form)}
              onBack={() => setStep('operations')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
