'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
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

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Custom Icons
const SolidBuildingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
  </svg>
);
const SolidInfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.732l-1.162 4.743c-.02.08-.03.161-.03.242a.75.75 0 001.5 0c0-.05-.005-.1-.015-.149l1.162-4.743c.475-1.94-1.302-3.48-3.14-2.553l-4.135 2.067a.75.75 0 10.671 1.341l2.25-1.125zM12 8.25a.75.75 0 110-1.5.75.75 0 010 1.5z" clipRule="evenodd" />
  </svg>
);
const SolidDownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [input, setInput] = useState<TdceInput>(getEmptyTdceInput);
  const [activeSection, setActiveSection] = useState<TdceSectionId>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const loadDemo = () => setInput(getDefaultTdceInput());

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 selection:bg-red-100 selection:text-red-900 bg-[#F8FAFC]">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-6 py-10 flex flex-col lg:flex-row gap-8 relative">
        
        {/* Condensed Sidebar */}
        <div className={`transition-all duration-300 ${activeSection ? 'hidden' : 'w-full lg:w-[320px] opacity-100'} flex-shrink-0 space-y-5`}>
          {/* Action Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Estimate Controls</h3>
            <p className="text-xs text-gray-500 mb-4">Populate the form with sample data or export your finished report.</p>
            <div className="flex flex-col gap-2">
              <button onClick={loadDemo} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                Load Demo Data
              </button>
              <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50">
                <SolidDownloadIcon className="h-4 w-4" /> {isGenerating ? 'Exporting...' : 'Export to PDF'}
              </button>
            </div>
          </div>

          {/* Condensed Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50" />
            
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3 relative z-10">
              <SolidInfoIcon className="h-5 w-5 text-red-500" />
              Guidelines
            </h3>
            
            <div className="space-y-5 relative z-10">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Cost Benchmark</h4>
                <p className="text-sm text-gray-600 leading-snug">
                  Estimates are strictly based on the <strong>Altus Group Canadian Cost Guide</strong> for accurate, high-level feasibility.
                </p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Affordability Tiers (BCH)</h4>
                <p className="text-xs text-gray-500 mb-3 leading-snug">
                  Rent caps are fixed based on local Area Median Income (AMI), keeping housing costs below 30% of income.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-green-50 px-3 py-1.5 rounded text-xs">
                    <span className="font-bold text-green-700">Very Low</span>
                    <span className="text-green-600 font-medium">0–25% AMI</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 px-3 py-1.5 rounded text-xs">
                    <span className="font-bold text-blue-700">Low</span>
                    <span className="text-blue-600 font-medium">26–50% AMI</span>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-50 px-3 py-1.5 rounded text-xs">
                    <span className="font-bold text-yellow-700">Moderate</span>
                    <span className="text-yellow-600 font-medium">51–75% AMI</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded text-xs">
                    <span className="font-bold text-gray-700">Median</span>
                    <span className="text-gray-600 font-medium">76–100% AMI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Document Area */}
        <div className={`flex-1 min-w-0 transition-all duration-300`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Report Header */}
            <div className="bg-gray-900 px-8 py-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">TDCE Report</h2>
                <p className="text-gray-400 text-sm mt-1">Class D Total Development Cost Estimate</p>
              </div>
              <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-medium text-amber-50">±30% Accuracy</span>
              </div>
            </div>

            <div className="p-8 space-y-8">
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

      {/* Edit Panel slide-out */}
      {activeSection && (
        <div className="fixed inset-0 top-16 md:left-auto md:right-0 md:w-full md:max-w-md bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col pb-[env(safe-area-inset-bottom)]">
          <TdceEditPanel
            sectionId={activeSection}
            input={input}
            output={output}
            onUpdate={handleUpdateInput}
            onClose={() => setActiveSection(null)}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}