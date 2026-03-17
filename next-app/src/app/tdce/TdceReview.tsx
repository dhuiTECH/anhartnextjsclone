'use client';

import { useMemo } from 'react';
import type { TdceInput } from '@/types/tdce';
import { calculateFinancials } from '@/lib/tdce-calculator';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/tdce-calculator';

interface TdceReviewProps {
  data: TdceInput;
  onEdit: (step: string) => void;
  onComplete: () => void;
  onSubmit: () => Promise<void>;
  onBack: () => void;
}

const brandPrimary = '#D83A42';
const textDark = '#1A1A1A';
const textMuted = '#6C757D';
const borderLight = '#E2E8F0';

function ReviewSection({ 
  title, 
  onEdit, 
  children 
}: { 
  title: string; 
  onEdit: () => void; 
  children: React.ReactNode 
}) {
  return (
    <div style={{ marginBottom: '2.5rem', borderBottom: `1px solid ${borderLight}`, paddingBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem', fontWeight: 600, color: textDark, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </h3>
        <button 
          onClick={onEdit}
          style={{ 
            background: 'none', border: 'none', color: brandPrimary, 
            fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem', fontWeight: 500,
            cursor: 'pointer' 
          }}
        >
          Edit
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {children}
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', color: textMuted, marginBottom: '2px' }}>{label}</p>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem', color: textDark, fontWeight: 500 }}>{value !== undefined && value !== null && value !== '' ? value : '—'}</p>
    </div>
  );
}

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function TdceReview({ data, onEdit, onComplete, onSubmit, onBack }: TdceReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const { toast } = useToast();

  const output = useMemo(() => {
    try {
      return calculateFinancials(data);
    } catch (e) {
      return null;
    }
  }, [data]);

  const handleSendToAnhart = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
      setUnlocked(true);
      toast({
        title: "Project Sent",
        description: "An Anhart Project Coordinator will review your TDCE and contact you shortly.",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "We couldn't send your project details. Please try again or export the PDF.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const gap = output?.operations.fundingGap || 0;
  const isSurplus = gap <= 0;

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', cursor: 'pointer', color: textMuted,
        fontFamily: 'Roboto, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em',
        textTransform: 'uppercase', padding: 0, marginBottom: '2rem',
        display: 'inline-flex', alignItems: 'center', gap: 8
      }}>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Assumptions
      </button>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '2.2rem', fontWeight: 400, color: textDark, lineHeight: 1.3, margin: 0 }}>Review your estimate.</h2>
        <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: textMuted, marginTop: 12, lineHeight: 1.5 }}>
          {unlocked 
            ? "Your project has been sent to an Anhart Coordinator. You can now export your full report."
            : "Review your summary below. To unlock the full report and next steps, send your project details to an Anhart Coordinator."
          }
        </p>
      </div>

      <div style={{ 
        filter: unlocked ? 'none' : 'blur(8px)',
        pointerEvents: unlocked ? 'auto' : 'none',
        transition: 'all 0.4s ease',
        opacity: unlocked ? 1 : 0.6,
        userSelect: unlocked ? 'auto' : 'none'
      }}>
        {/* Highlights / Calculated Summary */}
        {output && (
          <div style={{ 
            background: isSurplus ? '#059669' : brandPrimary, 
            borderRadius: '20px', padding: '2rem', 
            color: 'white', marginBottom: '3rem', display: 'grid', 
            gridTemplateColumns: '1fr 1fr', gap: '2rem',
            boxShadow: isSurplus ? '0 10px 30px -10px rgba(5, 150, 105, 0.4)' : '0 10px 30px -10px rgba(216, 58, 66, 0.4)',
            transition: 'all 0.3s ease'
          }}>
            <div>
              <p style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '4px' }}>Total Dev Cost</p>
              <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{formatCurrency(output.costs.totalDevelopmentCost)}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '4px' }}>
                {isSurplus ? 'Project Surplus' : 'Funding Gap'}
              </p>
              <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{formatCurrency(Math.abs(gap))}</p>
            </div>
          </div>
        )}

        <ReviewSection title="Contact" onEdit={() => onEdit('contact')}>
          <ReviewItem label="Name" value={data.meta.contactName || ''} />
          <ReviewItem label="Email" value={data.meta.contactEmail || ''} />
          <ReviewItem label="Organization" value={data.meta.partners?.developer || ''} />
        </ReviewSection>

        <ReviewSection title="Project Details" onEdit={() => onEdit('project-info')}>
          <ReviewItem label="Project Title" value={data.meta.projectTitle || ''} />
          <ReviewItem label="Location" value={`${data.meta.city}, ${data.meta.province}`} />
          <ReviewItem label="Address" value={data.meta.address || ''} />
          <ReviewItem label="Developer" value={data.meta.partners?.developer || ''} />
        </ReviewSection>

        <ReviewSection title="Site & Shape" onEdit={() => onEdit('site-details')}>
          <ReviewItem label="Site Area" value={`${formatNumber(data.physicals.siteAreaSqFt || 0)} SF`} />
          <ReviewItem 
            label={data.physicals.gfaSource === 'declared' ? 'Gross Floor Area' : 'Target FSR'} 
            value={data.physicals.gfaSource === 'declared' ? `${formatNumber(data.physicals.grossFloorAreaSqFt || 0)} SF` : data.physicals.targetFSR || 0} 
          />
          <ReviewItem label="Stories" value={data.physicals.stories || 0} />
          <ReviewItem label="Parking" value={data.physicals.parkingSpaces || 0} />
        </ReviewSection>

        <ReviewSection title="Program" onEdit={() => onEdit('unit-mix')}>
          <ReviewItem label="Total Units" value={data.physicals.totalUnits || 0} />
          <ReviewItem label="Construction" value={data.meta.constructionType || ''} />
          <ReviewItem label="Commercial Space" value={`${formatNumber(data.financials.commercialSqFt || 0)} SF`} />
        </ReviewSection>

        <ReviewSection title="Financials" onEdit={() => onEdit('financials')}>
          <ReviewItem label="Land Cost" value={formatCurrency(data.financials.landCost || 0)} />
          <ReviewItem label="Hard Cost / SF" value={`${formatCurrency(data.financials.hardCostPerSqFt || 0)}/SF`} />
          <ReviewItem label="Sponsor Equity" value={formatCurrency(data.financials.sponsorEquity || 0)} />
          <div /> {/* Spacer hack for grid */}
        </ReviewSection>

        <ReviewSection title="Operations" onEdit={() => onEdit('operations')}>
          <ReviewItem label="Res. Rent / SF" value={`${formatCurrency(data.operations.residentialRentPerSqFt || 0)}/SF`} />
          <ReviewItem label="Vacancy Rate" value={formatPercent(data.operations.vacancyRate || 0)} />
          <ReviewItem label="Expense Ratio" value={formatPercent(data.operations.operatingExpenseRatio || 0)} />
          <ReviewItem label="Amortization" value={`${data.operations.amortizationYears} Years`} />
        </ReviewSection>
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        {!unlocked && (
          <button 
            onClick={handleSendToAnhart}
            disabled={isSubmitting}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: 'white', color: brandPrimary, border: `2px solid ${brandPrimary}`, borderRadius: '40px',
              padding: '18px 48px', fontSize: '1.1rem', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease', width: '100%', maxWidth: '400px',
              boxShadow: '0 4px 12px rgba(216, 58, 66, 0.1)'
            }}
            onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = brandPrimaryLight)}
            onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = 'white')}
          >
            {isSubmitting ? 'Sending...' : 'Send to Anhart Coordinator to unlock'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 2 11 13 22 22"/><path d="M22 2 15 22 11 13 2 9 22 2z"/>
            </svg>
          </button>
        )}

        <div style={{ 
          width: '100%', 
          maxWidth: '400px',
          filter: unlocked ? 'none' : 'blur(4px)',
          opacity: unlocked ? 1 : 0.5,
          pointerEvents: unlocked ? 'auto' : 'none',
          transition: 'all 0.4s ease'
        }}>
          <button 
            onClick={onComplete} 
            disabled={!unlocked}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: brandPrimary, color: 'white', border: 'none', borderRadius: '40px',
              padding: '20px 48px', fontSize: '1.2rem', fontWeight: 600, cursor: unlocked ? 'pointer' : 'not-allowed',
              boxShadow: '0 10px 25px rgba(216, 58, 66, 0.3)', transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseEnter={e => unlocked && (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={e => unlocked && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Confirm & Export PDF
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
        
        <p style={{ marginTop: '0.5rem', color: textMuted, fontSize: '0.9rem' }}>
          This will generate a Class D TDCE Report (±30% Accuracy)
        </p>
      </div>
    </div>
  );
}
