'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { pdf } from '@react-pdf/renderer';
import type { TdceInput, TdceDocument as TdceDocType } from '@/types/tdce';
import { generateTdceDocument, calculateFinancials } from '@/lib/tdce-calculator';
import { getEmptyTdceInput, getDefaultTdceInput } from '@/data/tdceDefaults';
import TdceSheet, { type TdceSectionId } from './TdceSheet';
import TdceEditPanel from './TdceEditPanel';

const TdceDocument = dynamic(
  () => import('./TdceDocument').then((mod) => mod.TdceDocument),
  { ssr: false }
);

// ─── Altus + Affordable Housing info blocks (unchanged) ─────────────────────

function AltusBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-slate-50/80 text-sm text-slate-700 ${compact ? 'py-3 px-4' : 'py-3 px-4'}`}>
      <h3 className="font-bold text-slate-800 mb-2">Cost benchmark — Altus Group Canadian Cost Guide</h3>
      <p className="mb-2">
        This TDCE uses construction cost benchmarks <strong>strictly based on Altus Group's Canadian Cost Guide</strong>.
        The Guide is your reference for Canadian real estate development and infrastructure construction costs.
      </p>
      {!compact && (
        <>
          <p className="mb-2">
            Altus Group's annual Canadian Cost Guide is based on their proprietary project cost database (e.g. $521B+ total project value, 6,200+ projects, 1.5B+ sq ft). It provides a comprehensive snapshot of construction costs in local markets across Canada, broken down by building type—for high-level estimates (price per square foot by asset type and city) and for benchmarking more detailed estimates.
          </p>
          <p className="text-xs text-slate-500">
            Source: Altus Group, Canadian Cost Guide — altusgroup.com/featured-insights/canadian-cost-guide/
          </p>
        </>
      )}
      {compact && (
        <p className="text-xs text-slate-500">
          Source: altusgroup.com/featured-insights/canadian-cost-guide/
        </p>
      )}
    </div>
  );
}

function AffordableHousingBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-slate-50/80 text-sm text-slate-700 ${compact ? 'py-3 px-4' : 'py-3 px-4'}`}>
      <h3 className="font-bold text-slate-800 mb-2">Affordable housing (Build Canada Homes)</h3>
      <p className="mb-2">
        Build Canada Homes (BCH) defines affordable housing as spending <strong>less than 30%</strong> of a household's before-tax income on shelter costs. Rather than using market rates, the agency sets <strong>fixed rent caps based on the Area Median Income (AMI)</strong> of each city to ensure local affordability.
      </p>
      {!compact && (
        <>
          <p className="mb-2">
            This framework is divided into four tiers: <strong>Very Low Income</strong> (0–25% of median), <strong>Low Income</strong> (26–50%), <strong>Moderate Income</strong> (51–75%), and <strong>Median Income</strong> (76–100%). By focusing on these income-based caps, BCH aims to create mixed-income communities with non-market rents that remain permanently affordable.
          </p>
          <p className="text-xs text-slate-500">
            In the unit mix, set "Affordable" counts and rent per unit; the recommended $/mo is based on the Low Income (26–50% AMI) cap for your selected benchmark city.
          </p>
        </>
      )}
      {compact && (
        <p className="text-xs text-slate-500">
          Affordable = &lt;30% of income; rent caps by AMI tier. Set affordable units and rent in the unit mix.
        </p>
      )}
    </div>
  );
}

// ─── Email modal ─────────────────────────────────────────────────────────────

type EmailModalState = 'idle' | 'sending' | 'success' | 'error';

interface EmailModalProps {
  defaultEmail: string;
  projectTitle: string;
  onConfirm: (email: string) => Promise<void>;
  onClose: () => void;
}

function EmailModal({ defaultEmail, projectTitle, onConfirm, onClose }: EmailModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [status, setStatus] = useState<EmailModalState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSend = async () => {
    if (!email) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      await onConfirm(email);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message ?? 'Unknown error');
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">Email TDCE Report</h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[280px]">{projectTitle || 'Untitled project'}</p>
          </div>
          <button onClick={onClose} disabled={status === 'sending'} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Report sent!</p>
            <p className="text-xs text-slate-500">Check your inbox at <strong>{email}</strong></p>
            <button onClick={onClose} className="mt-2 px-4 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Recipient email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
              />
              <p className="text-[11px] text-slate-400">
                Pre-filled from your contact info. Edit if needed.
              </p>
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
                ⚠️ {errorMsg || 'Failed to send. Please try again.'}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={onClose}
                disabled={status === 'sending'}
                className="flex-1 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={status === 'sending' || !email}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Report
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [input, setInput] = useState<TdceInput>(getEmptyTdceInput);
  const [activeSection, setActiveSection] = useState<TdceSectionId>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const output = useMemo(() => {
    try {
      const site = input.physicals.siteAreaSqFt ?? 0;
      const gfaSource = input.physicals.gfaSource ?? 'from_fsr';
      const existingGfa =
        input.physicals.grossFloorAreaSqFt ?? input.physicals.grossBuildableSqFt ?? 0;
      const gsf =
        gfaSource === 'declared' && existingGfa > 0
          ? existingGfa
          : input.physicals.targetFSR != null && input.physicals.targetFSR > 0 && site > 0
            ? site * input.physicals.targetFSR
            : existingGfa;
      const totalUnits = input.physicals.unitMix?.length
        ? input.physicals.unitMix.reduce((s, u) => s + u.count, 0)
        : input.physicals.totalUnits;
      if (gsf <= 0 || totalUnits <= 0) return null;
      return calculateFinancials(input);
    } catch {
      return null;
    }
  }, [input]);

  const handleUpdateInput = useCallback((updates: Partial<TdceInput> | TdceInput) => {
    setInput((prev) => ({ ...prev, ...updates }));
  }, []);

  /** Generates the PDF blob. Shared by download and email flows. */
  const generatePdfBlob = useCallback(async (): Promise<Blob> => {
    const tdceDoc = generateTdceDocument(input);
    const { TdceDocument: TdceDocComponent } = await import('./TdceDocument');
    return pdf(<TdceDocComponent data={tdceDoc} />).toBlob();
  }, [input]);

  const handleDownloadPdf = useCallback(async () => {
    setIsGenerating(true);
    try {
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TDCE-${input.meta.projectTitle.replace(/\s+/g, '-') || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [generatePdfBlob, input.meta.projectTitle]);

  const handleSendEmail = useCallback(async (recipientEmail: string) => {
    const blob = await generatePdfBlob();

    // Convert blob to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // result is "data:application/pdf;base64,<data>" — strip the prefix
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = () => reject(new Error('Failed to read PDF blob'));
      reader.readAsDataURL(blob);
    });

    const projectTitle = input.meta.projectTitle || 'Untitled Project';
    const fileName = `TDCE-${projectTitle.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

    const res = await fetch('/api/send-tdce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pdfBase64: base64,
        email: recipientEmail,
        projectTitle,
        fileName,
      }),
    });

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error || `Server error ${res.status}`);
    }
  }, [generatePdfBlob, input.meta.projectTitle]);

  const contactEmail = input.meta?.contactEmail ?? '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex min-h-0 flex-col lg:flex-row">
        {!activeSection && (
          <div className="hidden lg:flex shrink-0 w-80 flex-col gap-4 p-6 border-r border-slate-200 bg-white/80 overflow-y-auto">
            <AltusBlock />
            <AffordableHousingBlock />
          </div>
        )}

        <div className={`flex-1 min-w-0 overflow-auto transition-all ${activeSection ? 'lg:mr-[380px]' : ''}`}>
          <div className="max-w-4xl mx-auto p-4 pb-16 lg:p-8 lg:pb-20">
            {!activeSection && (
              <div className="lg:hidden mb-4 space-y-4">
                <AltusBlock compact />
                <AffordableHousingBlock compact />
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-sm text-slate-500">
                Tap any section to edit. Tap outside to close the panel.
              </p>
              <button
                type="button"
                onClick={() => setInput(getDefaultTdceInput())}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Load demo (1024 Main)
              </button>
            </div>
            <TdceSheet
              input={input}
              output={output}
              onEditSection={setActiveSection}
              activeSection={activeSection}
            />
          </div>
        </div>

        {activeSection && (
          <div className="fixed inset-0 top-16 md:left-auto md:right-0 md:w-full md:max-w-md bg-white border-l border-slate-200 shadow-xl z-40 flex flex-col pb-[env(safe-area-inset-bottom)]">
            <TdceEditPanel
              sectionId={activeSection}
              input={input}
              output={output}
              onUpdate={handleUpdateInput}
              onClose={() => setActiveSection(null)}
            />
          </div>
        )}
      </main>

      <div className="bg-white border-t border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>© 2026 Anhart Affordable Housing. TDCE Generator v1.0</p>
          <p className="mt-1 flex items-center justify-center gap-1">
            Class D Estimate (±30%) — For planning purposes only
          </p>
        </div>
      </div>
      <Footer />

      {/* Email modal — rendered at root so it overlays everything */}
      {showEmailModal && (
        <EmailModal
          defaultEmail={contactEmail}
          projectTitle={input.meta.projectTitle || 'Untitled Project'}
          onConfirm={handleSendEmail}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}