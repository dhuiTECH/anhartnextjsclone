'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface TdceSimplifiedViewProps {
  onBack: () => void;
}

type Step = 'contact' | 'interest' | 'no-interest' | 'land' | 'affordability' | 'complete';

interface FormData {
  firstName: string; lastName: string; email: string; organization: string;
  location: string; isOwnedProperty: boolean | null;
  populations: string[]; buildingType: string; rentModel: string;
  otherBuildingType: string;
}

const defaultData: FormData = {
  firstName: '', lastName: '', email: '', organization: '',
  location: '', isOwnedProperty: null,
  populations: [], buildingType: '', rentModel: '',
  otherBuildingType: '',
};

/* ── Palette ── */
const brandPrimary = '#D83A42'; // Vibrant, bold red
const brandPrimaryLight = '#FFF0F0'; // Soft red tint for active backgrounds
const textDark = '#1A1A1A';
const textMuted = '#6C757D';
const borderLight = '#E2E8F0';

/* ── primitives ── */
function UnderlineInput({ placeholder, value, onChange, type = 'text', autoFocus = false }: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string; autoFocus?: boolean;
}) {
  return (
    <input
      autoFocus={autoFocus} type={type} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', background: 'transparent', border: 'none',
        borderBottom: `2px solid ${borderLight}`, outline: 'none',
        fontFamily: 'Roboto, sans-serif', fontSize: '1.2rem', color: textDark,
        padding: '12px 0', marginBottom: '2.5rem', transition: 'border-color 0.3s ease',
      }}
      onFocus={e => (e.target.style.borderBottomColor = brandPrimary)}
      onBlur={e => (e.target.style.borderBottomColor = borderLight)}
    />
  );
}

function UnderlineTextarea({ placeholder, value, onChange }: {
  placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <textarea placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} rows={3}
      style={{
        width: '100%', background: 'transparent', border: 'none',
        borderBottom: `2px solid ${borderLight}`, outline: 'none', resize: 'none',
        fontFamily: 'Roboto, sans-serif', fontSize: '1.2rem', color: textDark,
        padding: '12px 0', marginBottom: '2.5rem', lineHeight: 1.6,
        transition: 'border-color 0.3s ease',
      }}
      onFocus={e => (e.target.style.borderBottomColor = brandPrimary)}
      onBlur={e => (e.target.style.borderBottomColor = borderLight)}
    />
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

function Divider() {
  return <div style={{ height: 1, background: borderLight, margin: '2.5rem 0' }} />;
}

function SubLabel({ text }: { text: string }) {
  return <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem', color: textMuted, marginBottom: '1rem', marginTop: 0, fontWeight: 500 }}>{text}</p>;
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label onClick={onChange} style={{
      display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', marginBottom: '0.8rem',
      fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem',
      color: checked ? brandPrimary : textDark, fontWeight: checked ? 500 : 400,
      padding: '16px 20px', border: `2px solid ${checked ? brandPrimary : borderLight}`,
      borderRadius: '12px', background: checked ? brandPrimaryLight : 'transparent',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={e => !checked && (e.currentTarget.style.borderColor = '#CBD5E1')}
    onMouseLeave={e => !checked && (e.currentTarget.style.borderColor = borderLight)}
    >
      <span style={{
        width: 22, height: 22, borderRadius: '6px', border: `2px solid ${checked ? brandPrimary : '#CBD5E1'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        background: checked ? brandPrimary : 'transparent', transition: 'all 0.2s ease',
      }}>
        {checked && <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      {label}
    </label>
  );
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

/* ── steps ── */
function ContactStep({ data, setData, onNext }: { data: FormData; setData: (d: Partial<FormData>) => void; onNext: () => void }) {
  const valid = data.firstName && data.lastName && data.email && data.organization;
  return (
    <>
      <Counter n={1} total={4} />
      <Q label="Let's start with you." sub="Basic contact information to get things started." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
        <UnderlineInput autoFocus placeholder="First name" value={data.firstName} onChange={v => setData({ firstName: v })} />
        <UnderlineInput placeholder="Last name" value={data.lastName} onChange={v => setData({ lastName: v })} />
      </div>
      <UnderlineInput type="email" placeholder="Email address" value={data.email} onChange={v => setData({ email: v })} />
      <UnderlineInput placeholder="Organization" value={data.organization} onChange={v => setData({ organization: v })} />
      <ArrowBtn onClick={onNext} disabled={!valid} />
    </>
  );
}

function InterestStep({ onYes, onNo }: { onYes: () => void; onNo: () => void }) {
  return (
    <>
      <Counter n={2} total={4} />
      <Q label="Do you have an interest in a developmental project?" />
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { label: 'Yes — I have a project in mind', action: onYes },
          { label: 'No — just exploring for now', action: onNo },
        ].map(opt => (
          <button key={opt.label} onClick={opt.action} style={{
            width: '100%', background: 'transparent', border: `2px solid ${borderLight}`,
            padding: '20px 24px', textAlign: 'left', borderRadius: '12px',
            cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontSize: '1.2rem',
            color: textDark, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = brandPrimary; e.currentTarget.style.color = brandPrimary; e.currentTarget.style.transform = 'translateY(-2px)'}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = borderLight; e.currentTarget.style.color = textDark; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {opt.label}
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ flexShrink: 0 }}>
              <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        Reach out any time — we're here to point you in the right direction.
      </p>
      <a href="https://anhart.ca/contact" target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        background: brandPrimary, color: '#FFFFFF', borderRadius: '30px',
        fontFamily: 'Roboto, sans-serif', fontSize: '1rem', fontWeight: 500,
        letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none',
        boxShadow: '0 4px 14px rgba(216, 58, 66, 0.25)', transition: 'transform 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        Contact us
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </>
  );
}

function LandStep({ data, setData, onNext, onBack }: { data: FormData; setData: (d: Partial<FormData>) => void; onNext: () => void; onBack: () => void }) {
  const valid = data.location.trim().length > 0 && data.isOwnedProperty !== null;
  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={3} total={4} />
      <Q label="Tell us about the land or location." sub="Do you have a specific site in mind?" />
      <UnderlineTextarea
        placeholder="Address, neighbourhood, or general area..."
        value={data.location} onChange={v => setData({ location: v })}
      />
      <div style={{ marginTop: '1rem' }}>
        <SubLabel text="Is this your owned property?" />
        <RadioRow label="Yes, I own this property" selected={data.isOwnedProperty === true} onSelect={() => setData({ isOwnedProperty: true })} />
        <RadioRow label="No, I don't own it yet" selected={data.isOwnedProperty === false} onSelect={() => setData({ isOwnedProperty: false })} />
      </div>
      <div style={{ marginTop: '2rem' }}><ArrowBtn onClick={onNext} disabled={!valid} /></div>
    </>
  );
}

const POPS = [
  { id: 'families', label: 'Families' },
  { id: 'seniors', label: 'Seniors' },
  { id: 'single-professionals', label: 'Single Professionals' },
  { id: 'vulnerable', label: 'Vulnerable Populations' },
];
const BUILDINGS = [
  { id: 'low-rise', label: 'Low-rise wood-frame apartment', sub: '3–6 storeys, cost-effective, neighbourhood-friendly' },
  { id: 'stacked', label: 'Stacked townhomes', sub: 'Ground-oriented, family-friendly, moderate density' },
  { id: 'high-rise', label: 'High-rise tower', sub: '7+ storeys, maximizes units on constrained sites' },
  { id: 'other', label: 'Other', sub: 'Please specify' },
];
const RENTS = [
  { id: 'income', label: 'Rent geared to income', sub: '~30% of each tenant\'s paycheque — deepest affordability' },
  { id: 'discount', label: 'Discount off market rent', sub: 'Fixed % below market (e.g. 20% off) — predictable cash flow' },
  { id: 'mixed', label: 'Mixed-income building', sub: 'Market-rate units cross-subsidize deeply affordable ones' },
];

/** Build plain-text message for admin email (no HTML/JSON to avoid validation). */
function buildTdceSimplifiedMessage(data: FormData): string {
  const pop = POPS.filter(p => data.populations.includes(p.id)).map(p => p.label).join(', ');
  const building = data.buildingType === 'other' ? data.otherBuildingType : BUILDINGS.find(b => b.id === data.buildingType)?.label ?? data.buildingType;
  const rent = RENTS.find(r => r.id === data.rentModel)?.label ?? data.rentModel;
  return [
    'TDCE Basic Plan (homeowner intake)',
    '---',
    `Location: ${data.location}`,
    `Ownership: ${data.isOwnedProperty === true ? 'Owned property' : data.isOwnedProperty === false ? 'Not yet owned' : 'N/A'}`,
    `Populations: ${pop}`,
    `Building type: ${building}`,
    `Rent model: ${rent}`,
  ].join('\n');
}

function AffordabilityStep({ data, setData, onNext, onBack, isSubmitting }: { data: FormData; setData: (d: Partial<FormData>) => void; onNext: () => void; onBack: () => void; isSubmitting?: boolean }) {
  const toggle = (id: string) => {
    setData({ populations: data.populations.includes(id) ? data.populations.filter(p => p !== id) : [...data.populations, id] });
  };
  
  // Validate that if 'other' is selected, they typed something
  const isBuildingValid = data.buildingType === 'other' ? data.otherBuildingType.trim().length > 0 : !!data.buildingType;
  const valid = data.populations.length > 0 && isBuildingValid && data.rentModel;

  return (
    <>
      <BackBtn onClick={onBack} />
      <Counter n={4} total={4} />
      <Q label="What type of affordability are you working with?" />
      
      <SubLabel text="Who are we housing? (select all that apply)" />
      {POPS.map(p => <CheckRow key={p.id} label={p.label} checked={data.populations.includes(p.id)} onChange={() => toggle(p.id)} />)}

      <Divider />
      
      <SubLabel text="What type of building fits the neighbourhood?" />
      {BUILDINGS.map(b => <RadioRow key={b.id} label={b.label} sub={b.sub} selected={data.buildingType === b.id} onSelect={() => setData({ buildingType: b.id })} />)}
      
      {/* Show the text input ONLY for the building type "Other" */}
      {data.buildingType === 'other' && (
        <div style={{ paddingLeft: '1rem', marginTop: '-0.5rem', marginBottom: '1.5rem', animation: 'fadeUp 0.3s ease both' }}>
          <UnderlineInput 
            autoFocus 
            placeholder="Please specify..." 
            value={data.otherBuildingType} 
            onChange={v => setData({ otherBuildingType: v })} 
          />
        </div>
      )}

      <Divider />
      
      <SubLabel text="What rent model are you aiming for?" />
      {RENTS.map(r => <RadioRow key={r.id} label={r.label} sub={r.sub} selected={data.rentModel === r.id} onSelect={() => setData({ rentModel: r.id })} />)}

      <div style={{ marginTop: '2.5rem' }}><ArrowBtn onClick={onNext} disabled={!valid || isSubmitting} label={isSubmitting ? 'Sending…' : 'Continue'} /></div>
    </>
  );
}

function CompleteStep({ data, onRestart }: { data: FormData; onRestart: () => void }) {
  const pop = POPS.filter(p => data.populations.includes(p.id)).map(p => p.label).join(', ');
  
  // Use custom typed text if "Other" was selected
  const building = data.buildingType === 'other' 
    ? data.otherBuildingType 
    : BUILDINGS.find(b => b.id === data.buildingType)?.label;
    
  const rent = RENTS.find(r => r.id === data.rentModel)?.label;
  
  const rows = [
    ['Contact', `${data.firstName} ${data.lastName} · ${data.email}`],
    ['Organization', data.organization],
    ['Location', data.location],
    ['Ownership', data.isOwnedProperty ? 'Owned property' : 'Not yet owned'],
    ['Populations', pop],
    ['Building', building ?? ''],
    ['Rent model', rent ?? ''],
  ];

  return (
    <>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: brandPrimary, marginBottom: '2rem', fontWeight: 600 }}>Done</p>
      <Q label={`Thank you, ${data.firstName}.`} sub="We've received your intake. Our team will be in touch shortly." />
      <div style={{ borderTop: `1px solid ${borderLight}`, paddingTop: '2rem', marginBottom: '3.5rem' }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: '1.2rem', fontFamily: 'Roboto, sans-serif' }}>
            <span style={{ color: textMuted, fontSize: '0.9rem', fontWeight: 500 }}>{label}</span>
            <span style={{ color: textDark, fontSize: '1.1rem' }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <a href="https://anhart.ca/contact" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12, background: brandPrimary,
          color: '#FFFFFF', borderRadius: '30px', fontFamily: 'Roboto, sans-serif', 
          fontSize: '1rem', fontWeight: 500, padding: '14px 32px', textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(216, 58, 66, 0.25)', transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
          Contact our team
        </a>
        <button onClick={onRestart} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem', color: textMuted,
          fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = textDark)}
        onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
        >Start over</button>
      </div>
    </>
  );
}

/* ══ main ══ */
export function TdceSimplifiedView({ onBack }: TdceSimplifiedViewProps) {
  const [step, setStep] = useState<Step>('contact');
  const [form, setForm] = useState<FormData>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update = (d: Partial<FormData>) => setForm(f => ({ ...f, ...d }));
  const { toast } = useToast();

  const handleCompleteSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const body = new URLSearchParams({
        form_type: 'tdce_simplified',
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        message: buildTdceSimplifiedMessage(form),
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
        toast({ title: 'Submitted!', description: "We've received your intake and will be in touch shortly." });
      }
    } catch (e) {
      toast({ title: 'Submission failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
      setStep('complete');
    }
  }, [form, toast]);

  const progressSteps = ['contact', 'interest', 'land', 'affordability'];
  const pct = Math.max(0, (progressSteps.indexOf(step) / (progressSteps.length - 1)) * 100);
  const showProgress = !['no-interest', 'complete'].includes(step);

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(20px) } 
          to { opacity: 1; transform: translateY(0) } 
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 650 }}>
        {/* back to path */}
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: textMuted,
          fontFamily: 'Roboto, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: '3rem', padding: 0,
          display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = textDark)}
        onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to choose your path
        </button>

        {/* progress */}
        {showProgress && (
          <div style={{ width: '100%', height: 4, background: borderLight, borderRadius: 2, marginBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: brandPrimary, transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }} />
          </div>
        )}

        {/* content */}
        <div key={step} style={{ animation: 'fadeUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
          {step === 'contact'       && <ContactStep data={form} setData={update} onNext={() => setStep('interest')} />}
          {step === 'interest'      && <InterestStep onYes={() => setStep('land')} onNo={() => setStep('no-interest')} />}
          {step === 'no-interest'   && <NoInterestStep />}
          {step === 'land'          && <LandStep data={form} setData={update} onNext={() => setStep('affordability')} onBack={() => setStep('interest')} />}
          {step === 'affordability' && <AffordabilityStep data={form} setData={update} onNext={handleCompleteSubmit} onBack={() => setStep('land')} isSubmitting={isSubmitting} />}
          {step === 'complete'      && <CompleteStep data={form} onRestart={() => { setStep('contact'); setForm(defaultData); }} />}
        </div>
      </div>
    </div>
  );
}