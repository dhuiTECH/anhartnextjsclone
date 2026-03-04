'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { pdf } from '@react-pdf/renderer';
import type { TdceInput, TdceDocument as TdceDocType } from '@/types/tdce';
import { generateTdceDocument, calculateFinancials } from '@/lib/tdce-calculator';
import { getEmptyTdceInput, getDefaultTdceInput } from '@/data/tdceDefaults';
import TdceSheet, { type TdceSectionId } from './TdceSheet';
import TdceEditPanel from './TdceEditPanel';
import { TdceLandingPage } from './TdceLandingPage';
import { TdceSimplifiedView } from './TdceSimplifiedView';

const TdceDocument = dynamic(
  () => import('./TdceDocument').then((mod) => mod.TdceDocument),
  { ssr: false }
);

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type TdceViewMode = 'landing' | 'simplified' | 'full';

// Custom Icons (Slightly refined for a lighter line-weight look)
const SolidDownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const SolidInfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [viewMode, setViewMode] = useState<TdceViewMode>('landing');
  const [input, setInput] = useState<TdceInput>(getEmptyTdceInput);
  const [activeSection, setActiveSection] = useState<TdceSectionId>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Brand color to match your logo
  const brandRed = '#D83A42';

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

  const generatePdfBlob = useCallback(async (): Promise<Blob> => {
    const tdceDoc = generateTdceDocument(input);
    const { TdceDocument: TdceDocComponent } = await import('./TdceDocument');
    return pdf(<TdceDocComponent data={tdceDoc} />).toBlob();
  }, [input]);

  const submitTdceFullToAdmin = useCallback(async (): Promise<void> => {
    // ... your existing admin submission logic (unchanged) ...
  }, [input]);

  const handleDownloadPdf = useCallback(async () => {
    setIsGenerating(true);
    try {
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TDCE-${input.meta.projectTitle?.replace(/\s+/g, '-') || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      await submitTdceFullToAdmin();
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [generatePdfBlob, input.meta.projectTitle, submitTdceFullToAdmin]);

  const loadDemo = () => setInput(getDefaultTdceInput());

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 selection:bg-red-100 selection:text-red-900 bg-[#F8FAFC]">
      <Header />

      {/* Landing: Choose your path */}
      {viewMode === 'landing' && (
        <main className="max-w-7xl mx-auto w-full px-6 flex-1 flex items-center">
          <TdceLandingPage
            onSelectHomeowners={() => setViewMode('simplified')}
            onSelectDevelopers={() => setViewMode('full')}
          />
        </main>
      )}

      {/* Simplified: Homeowner view */}
      {viewMode === 'simplified' && (
        <main className="max-w-7xl mx-auto w-full px-6 flex-1 pt-12">
          <TdceSimplifiedView onBack={() => setViewMode('landing')} />
        </main>
      )}

      {/* Full: Current TDCE tool for developers */}
      {viewMode === 'full' && (
        <main className={`max-w-[1600px] mx-auto w-full pl-6 pr-6 py-10 flex relative flex-1 transition-all duration-300 ease-in-out ${activeSection ? 'lg:pr-[28rem] lg:gap-0' : 'gap-8'}`}>
          
          {/* Sidebar Controls — Smoothly collapses when edit panel is open so document expands left */}
          <aside className={`hidden flex-col shrink-0 overflow-hidden transition-all duration-300 ease-in-out lg:flex ${activeSection ? 'w-0 min-w-0' : 'w-[300px]'}`}>
            <div className={`min-w-[300px] space-y-6 ${activeSection ? 'opacity-0' : 'opacity-100'}`}>
            {/* Minimalist Back Button */}
            <button
              onClick={() => setViewMode('landing')}
              className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors self-start"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Choose your path
            </button>

            {/* Action Card - Sleeker with refined borders */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <h3 className="font-semibold text-slate-900 mb-1 text-base">Estimate Controls</h3>
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">Populate the form with sample data or export your finished report securely.</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={loadDemo} 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  Load Demo Data
                </button>
                <button 
                  onClick={handleDownloadPdf} 
                  disabled={isGenerating} 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D83A42] text-white rounded-xl text-sm font-medium shadow-sm shadow-red-500/20 hover:bg-[#B92B33] hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SolidDownloadIcon className="h-4 w-4" /> 
                  {isGenerating ? 'Exporting...' : 'Export to PDF'}
                </button>
              </div>
            </div>

            {/* Guidelines Card - Larger, darker text for legibility */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4 text-base">
                <SolidInfoIcon className="h-5 w-5 text-[#D83A42]" />
                Guidelines
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Cost Benchmark</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Estimates are strictly based on the <strong>Altus Group Canadian Cost Guide</strong> for accurate, high-level feasibility.
                  </p>
                </div>
                
                <div className="h-px bg-slate-200/60 w-full" /> {/* Subtle divider */}

                <div>
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Affordability Tiers</h4>
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Rent caps are fixed based on local Area Median Income (AMI), keeping housing costs below 30% of income.
                  </p>
                  
                  {/* Clean, minimalist pills - larger darker text */}
                  <ul className="space-y-2.5">
                    <li className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-800 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Very Low</span>
                      <span className="text-slate-700 font-mono font-medium">0–25% AMI</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-800 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" />Low</span>
                      <span className="text-slate-700 font-mono font-medium">26–50% AMI</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-800 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" />Moderate</span>
                      <span className="text-slate-700 font-mono font-medium">51–75% AMI</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-800 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-500" />Median</span>
                      <span className="text-slate-700 font-mono font-medium">76–100% AMI</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
          </aside>

          {/* Main Document Area */}
          <div className="flex-1 min-w-0 relative">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-200/60 overflow-hidden min-h-[80vh] font-sans">
              
              {/* Refined Report Header (White, crisp typography) */}
              <div className="px-10 pt-10 pb-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">TDCE Report</h2>
                  <p className="text-slate-700 text-base mt-1.5 tracking-wide font-serif">Class D Total Development Cost Estimate</p>
                </div>
                
                {/* Subtle accuracy badge instead of heavy dark button */}
                <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">±30% Accuracy</span>
                </div>
              </div>

              {/* The Sheet Content */}
              <div className="p-10">
                <TdceSheet
                  input={input}
                  output={output}
                  onEditSection={setActiveSection}
                  activeSection={activeSection}
                />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Edit Panel slide-out 
        Now floats elegantly over the right side with a subtle shadow, rather than taking over the screen.
      */}
      {viewMode === 'full' && (
        <div 
          className={`fixed inset-y-0 right-0 top-[72px] w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out pb-[env(safe-area-inset-bottom)] ${activeSection ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {activeSection && (
            <TdceEditPanel
              sectionId={activeSection}
              input={input}
              output={output}
              onUpdate={handleUpdateInput}
              // Allow closing from within the panel itself
              onClose={() => setActiveSection(null)}
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}