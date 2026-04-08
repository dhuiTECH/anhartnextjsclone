'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { useToast } from '@/components/ui/use-toast';
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
const brandPrimaryLight = '#FFF0F0';
const textDark = '#1A1A1A';
const textMuted = '#6C757D';
const borderLight = '#E2E8F0';

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: '2.5rem', borderBottom: `1px solid ${borderLight}`, paddingBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            color: textDark,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </h3>
        <button
          onClick={onEdit}
          style={{
            background: 'none',
            border: 'none',
            color: brandPrimary,
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Edit
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', color: textMuted, marginBottom: '2px' }}>{label}</p>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1rem', color: textDark, fontWeight: 500 }}>
        {value !== undefined && value !== null && value !== '' ? value : '—'}
      </p>
    </div>
  );
}

const spotlightCard: CSSProperties = {
  position: 'absolute',
  background: '#FFFFFF',
  border: `2px solid ${brandPrimary}`,
  borderRadius: 14,
  padding: '12px 16px',
  boxShadow: '0 12px 40px -12px rgba(216, 58, 66, 0.35), 0 0 0 1px rgba(255,255,255,0.8) inset',
  pointerEvents: 'none',
  zIndex: 2,
  maxWidth: 'min(46%, 220px)',
};

function PreviewSpotlights({
  output,
  data,
  gap,
  isSurplus,
}: {
  output: NonNullable<ReturnType<typeof calculateFinancials>>;
  data: TdceInput;
  gap: number;
  isSurplus: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
      aria-hidden
    >
      <div style={{ ...spotlightCard, top: '4%', left: '3%' }}>
        <p
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: textMuted,
            margin: '0 0 6px',
            fontWeight: 600,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Total dev cost
        </p>
        <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.35rem)', fontWeight: 700, color: textDark, margin: 0, fontFamily: 'Roboto, sans-serif' }}>
          {formatCurrency(output.costs.totalDevelopmentCost)}
        </p>
      </div>
      <div style={{ ...spotlightCard, top: '8%', right: '2%', left: 'auto' }}>
        <p
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: textMuted,
            margin: '0 0 6px',
            fontWeight: 600,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {isSurplus ? 'Project surplus' : 'Funding gap'}
        </p>
        <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.35rem)', fontWeight: 700, color: isSurplus ? '#059669' : brandPrimary, margin: 0, fontFamily: 'Roboto, sans-serif' }}>
          {formatCurrency(Math.abs(gap))}
        </p>
      </div>
      <div style={{ ...spotlightCard, top: '42%', left: '6%' }}>
        <p
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: textMuted,
            margin: '0 0 6px',
            fontWeight: 600,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Total units
        </p>
        <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.35rem)', fontWeight: 700, color: textDark, margin: 0, fontFamily: 'Roboto, sans-serif' }}>
          {formatNumber(data.physicals.totalUnits || 0)}
        </p>
      </div>
      <div style={{ ...spotlightCard, top: '52%', right: '5%', left: 'auto' }}>
        <p
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: textMuted,
            margin: '0 0 6px',
            fontWeight: 600,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Hard cost / SF
        </p>
        <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.35rem)', fontWeight: 700, color: textDark, margin: 0, fontFamily: 'Roboto, sans-serif' }}>
          {formatCurrency(data.financials.hardCostPerSqFt || 0)}
        </p>
      </div>
    </div>
  );
}

function ReviewDocument({
  data,
  output,
  onEdit,
  gap,
  isSurplus,
}: {
  data: TdceInput;
  output: ReturnType<typeof calculateFinancials> | null;
  onEdit: (step: string) => void;
  gap: number;
  isSurplus: boolean;
}) {
  return (
    <>
      {output && (
        <div
          style={{
            background: isSurplus ? '#059669' : brandPrimary,
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            marginBottom: '3rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            boxShadow: isSurplus ? '0 10px 30px -10px rgba(5, 150, 105, 0.4)' : '0 10px 30px -10px rgba(216, 58, 66, 0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          <div>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '4px' }}>
              Total Dev Cost
            </p>
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
          value={
            data.physicals.gfaSource === 'declared'
              ? `${formatNumber(data.physicals.grossFloorAreaSqFt || 0)} SF`
              : data.physicals.targetFSR || 0
          }
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
        <div />
      </ReviewSection>

      <ReviewSection title="Operations" onEdit={() => onEdit('operations')}>
        <ReviewItem label="Res. Rent / SF" value={`${formatCurrency(data.operations.residentialRentPerSqFt || 0)}/SF`} />
        <ReviewItem label="Vacancy Rate" value={formatPercent(data.operations.vacancyRate || 0)} />
        <ReviewItem label="Expense Ratio" value={formatPercent(data.operations.operatingExpenseRatio || 0)} />
        <ReviewItem label="Amortization" value={`${data.operations.amortizationYears} Years`} />
      </ReviewSection>
    </>
  );
}

export function TdceReview({ data, onEdit, onComplete, onSubmit, onBack }: TdceReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const { toast } = useToast();

  const output = useMemo(() => {
    try {
      return calculateFinancials(data);
    } catch {
      return null;
    }
  }, [data]);

  const handleSendToAnhart = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
      setUnlocked(true);
      toast({
        title: 'Project Sent',
        description: 'An Anhart Project Coordinator will review your TDCE and contact you shortly.',
      });
    } catch {
      toast({
        title: 'Submission Error',
        description: "We couldn't send your project details. Please try again or export the PDF.",
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const gap = output?.operations.fundingGap || 0;
  const isSurplus = gap <= 0;

  return (
    <div style={{ position: 'relative' }}>
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
          marginBottom: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to contact
      </button>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '2.2rem', fontWeight: 400, color: textDark, lineHeight: 1.3, margin: 0 }}>
          {unlocked ? 'Your estimate is ready.' : 'Preview your estimate.'}
        </h2>
        <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: textMuted, marginTop: 12, lineHeight: 1.5 }}>
          {unlocked
            ? 'Your project has been sent to an Anhart Coordinator. You can now export your full report.'
            : 'Below is a blurred preview with a few key figures highlighted. To view the full TDCE, export, and collaborate on your development project, get in touch with an Anhart team member—we will walk through your numbers and possibilities together.'}
        </p>
      </div>

      {!unlocked ? (
        <>
          <div
            style={{
              position: 'relative',
              minHeight: 380,
              marginBottom: '2rem',
              borderRadius: 16,
              overflow: 'hidden',
              border: `1px solid ${borderLight}`,
              background: '#F8FAFC',
            }}
          >
            <div
              style={{
                filter: 'blur(10px)',
                opacity: 0.42,
                transform: 'scale(1.02)',
                pointerEvents: 'none',
                userSelect: 'none',
                padding: '1.25rem 1rem 2rem',
                transition: 'opacity 0.4s ease',
              }}
            >
              <ReviewDocument data={data} output={output} onEdit={onEdit} gap={gap} isSurplus={isSurplus} />
            </div>
            {output && <PreviewSpotlights output={output} data={data} gap={gap} isSurplus={isSurplus} />}
          </div>

          <div
            style={{
              borderRadius: 16,
              border: `1px solid ${borderLight}`,
              background: brandPrimaryLight,
              padding: '1.25rem 1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <p style={{ margin: 0, fontFamily: 'Roboto, sans-serif', fontSize: '1rem', color: textDark, lineHeight: 1.6 }}>
              <strong style={{ fontWeight: 600 }}>Full report is available with the team.</strong> Send your project to an Anhart coordinator to unlock the complete document, discuss scenarios, and plan next steps for your development.
            </p>
          </div>
        </>
      ) : (
        <div style={{ transition: 'opacity 0.4s ease' }}>
          <ReviewDocument data={data} output={output} onEdit={onEdit} gap={gap} isSurplus={isSurplus} />
        </div>
      )}

      <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        {!unlocked && (
          <button
            onClick={handleSendToAnhart}
            disabled={isSubmitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              background: 'white',
              color: brandPrimary,
              border: `2px solid ${brandPrimary}`,
              borderRadius: '40px',
              padding: '18px 48px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 4px 12px rgba(216, 58, 66, 0.1)',
            }}
            onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.background = brandPrimaryLight)}
            onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.background = 'white')}
          >
            {isSubmitting ? 'Sending...' : 'Send to Anhart Coordinator to unlock'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 2 11 13 22 22" />
              <path d="M22 2 15 22 11 13 2 9 22 2z" />
            </svg>
          </button>
        )}

        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            filter: unlocked ? 'none' : 'blur(4px)',
            opacity: unlocked ? 1 : 0.5,
            pointerEvents: unlocked ? 'auto' : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          <button
            onClick={onComplete}
            disabled={!unlocked}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              background: brandPrimary,
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              padding: '20px 48px',
              fontSize: '1.2rem',
              fontWeight: 600,
              cursor: unlocked ? 'pointer' : 'not-allowed',
              boxShadow: '0 10px 25px rgba(216, 58, 66, 0.3)',
              transition: 'all 0.2s ease',
              width: '100%',
            }}
            onMouseEnter={(e) => unlocked && (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={(e) => unlocked && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Confirm & Export PDF
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>

        <p style={{ marginTop: '0.5rem', color: textMuted, fontSize: '0.9rem' }}>This will generate a Class D TDCE Report (±30% Accuracy)</p>
      </div>
    </div>
  );
}
