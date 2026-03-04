import React, { useState } from 'react';

const App = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [data, setData] = useState({
    projectTitle: '',
    location: '',
    costBenchmark: 'Altus Group Canadian Cost Guide',
    contactName: '',
    contactEmail: '',
    moreDetails: '',
    siteArea: '',
    gfa: '',
    netResidentialArea: '',
    totalUnits: '',
    appliedConstructionCost: '',
    softCostsPercent: '25.0',
    operatingExpensesPercent: '35.0',
    studioRent: '',
    oneBedRent: '',
    twoBedRent: '',
    targetDscr: '1.10'
  });

  const loadDemo = () => {
    setData({
      projectTitle: 'Main Street Affordable Housing',
      location: 'Vancouver, BC',
      costBenchmark: 'Altus Group Canadian Cost Guide',
      contactName: 'Jane Doe',
      contactEmail: 'jane.doe@anhart.ca',
      moreDetails: 'Proposed 6-story wood frame development over 1 level of underground concrete parking.',
      siteArea: '12,500',
      gfa: '35,000',
      netResidentialArea: '28,000',
      totalUnits: '55',
      appliedConstructionCost: '350',
      softCostsPercent: '25.0',
      operatingExpensesPercent: '35.0',
      studioRent: '1800',
      oneBedRent: '2200',
      twoBedRent: '2800',
      targetDscr: '1.10'
    });
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleSave = () => setEditingSection(null);

  // --- Calculations ---
  const cleanNumber = (val) => Number(String(val).replace(/,/g, '')) || 0;
  const siteAreaNum = cleanNumber(data.siteArea);
  const gfaNum = cleanNumber(data.gfa);
  const unitsNum = cleanNumber(data.totalUnits);
  
  // Density (FSR) = Gross Floor Area / Site Area
  const calculatedDensity = (gfaNum > 0 && siteAreaNum > 0) 
    ? (gfaNum / siteAreaNum).toFixed(2) 
    : '';

  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-800 selection:bg-red-100 selection:text-red-900">
      {/* Sleek Minimalist Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-red-600 flex items-center bg-red-50 p-1.5 rounded-lg">
              <SolidBuildingIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900 leading-none">anhart</h1>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Affordable Housing</span>
            </div>
          </div>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-gray-900/10">
            Connect With Us
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* Condensed Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-5">
          {/* Action Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Estimate Controls</h3>
            <p className="text-xs text-gray-500 mb-4">Populate the form with sample data or export your finished report.</p>
            <div className="flex flex-col gap-2">
              <button onClick={loadDemo} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                Load Demo Data
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                <SolidDownloadIcon className="h-4 w-4" /> Export to PDF
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
        </aside>

        {/* Main Document Area */}
        <div className="flex-1">
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
              
              {/* SECTION 1: Project Identification */}
              <div className={`rounded-xl transition-all duration-300 ${editingSection === 'project' ? 'ring-2 ring-red-500 bg-white p-6 shadow-md' : 'hover:bg-gray-50 p-2 -mx-2 rounded-xl border border-transparent hover:border-gray-200'}`}>
                {editingSection !== 'project' ? (
                  <div onClick={() => setEditingSection('project')} className="cursor-pointer group">
                    <div className="flex justify-between items-center mb-5 px-2">
                      <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-500 pl-3">1. Project Identification</h3>
                      <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
                        <SolidEditIcon className="h-3 w-3" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                      <DataLabel icon={<SolidDocumentIcon />} label="Project Title" value={data.projectTitle} />
                      <DataLabel icon={<SolidLocationIcon />} label="Location" value={data.location} />
                      <DataLabel icon={<SolidUserIcon />} label="Contact Name" value={data.contactName} />
                      <DataLabel icon={<SolidMailIcon />} label="Contact Email" value={data.contactEmail} />
                      <div className="md:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">More Details</p>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{data.moreDetails || <span className="text-gray-400 italic">None provided</span>}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-500 pl-3">Edit Project Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input name="projectTitle" label="Project Title" value={data.projectTitle} onChange={handleChange} />
                      <Input name="location" label="Location" value={data.location} onChange={handleChange} />
                      <Input name="contactName" label="Contact Name" value={data.contactName} onChange={handleChange} />
                      <Input name="contactEmail" label="Contact Email" type="email" value={data.contactEmail} onChange={handleChange} />
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">More Details</label>
                        <textarea name="moreDetails" value={data.moreDetails} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-5">
                      <button onClick={() => setEditingSection(null)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800">Cancel</button>
                      <button onClick={handleSave} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 shadow-sm flex items-center gap-2">
                        <SolidCheckIcon className="h-4 w-4" /> Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: Benchmarks & cost assumptions */}
              <div className={`rounded-xl transition-all duration-300 ${editingSection === 'benchmarks' ? 'ring-2 ring-red-500 bg-white p-6 shadow-md' : 'hover:bg-gray-50 p-2 -mx-2 rounded-xl border border-transparent hover:border-gray-200'}`}>
                {editingSection !== 'benchmarks' ? (
                  <div onClick={() => setEditingSection('benchmarks')} className="cursor-pointer group">
                    <div className="flex justify-between items-center mb-5 px-2">
                      <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-500 pl-3">2. Benchmarks & cost assumptions</h3>
                      <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
                        <SolidEditIcon className="h-3 w-3" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                      <DataLabel 
                        icon={<SolidBuildingIcon />} 
                        label="Construction cost benchmark" 
                        value={data.appliedConstructionCost ? `Altus Group Canadian Cost Guide. Applied: $${data.appliedConstructionCost} / sq ft (GFA)` : ''} 
                      />
                      <DataLabel 
                        icon={<SolidInfoIcon />} 
                        label="Soft costs" 
                        value={data.softCostsPercent ? `Benchmark: 15-30%. Applied: ${data.softCostsPercent}%` : ''} 
                      />
                      <DataLabel 
                        icon={<SolidInfoIcon />} 
                        label="Operating expenses" 
                        value={data.operatingExpensesPercent ? `Benchmark: 30-40% of EGI. Applied: ${data.operatingExpensesPercent}%` : ''} 
                      />
                      <DataLabel 
                        icon={<SolidInfoIcon />} 
                        label="DSCR target" 
                        value={data.targetDscr ? `Target DSCR: ${data.targetDscr}` : ''} 
                      />
                      <div className="md:col-span-2">
                        <DataLabel 
                          icon={<SolidInfoIcon />} 
                          label="Market rents" 
                          value={`Studio: ${data.studioRent ? `$${data.studioRent}/mo` : '—'}, 1-Bed: ${data.oneBedRent ? `$${data.oneBedRent}/mo` : '—'}, 2-Bed: ${data.twoBedRent ? `$${data.twoBedRent}/mo` : '—'}`} 
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-500 pl-3">Edit Benchmarks</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input name="appliedConstructionCost" label="Applied Construction Cost ($/SF)" value={data.appliedConstructionCost} onChange={handleChange} suffix="$ / sf" />
                      <Input name="softCostsPercent" label="Soft Costs (%)" value={data.softCostsPercent} onChange={handleChange} suffix="%" />
                      <Input name="operatingExpensesPercent" label="Operating Expenses (%)" value={data.operatingExpensesPercent} onChange={handleChange} suffix="%" />
                      <Input name="targetDscr" label="Target DSCR" value={data.targetDscr} onChange={handleChange} />
                      
                      <div className="md:col-span-2 pt-4 border-t border-gray-100">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Market Rents</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input name="studioRent" label="Studio Rent" value={data.studioRent} onChange={handleChange} suffix="$ / mo" />
                          <Input name="oneBedRent" label="1-Bed Rent" value={data.oneBedRent} onChange={handleChange} suffix="$ / mo" />
                          <Input name="twoBedRent" label="2-Bed Rent" value={data.twoBedRent} onChange={handleChange} suffix="$ / mo" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-5">
                      <button onClick={() => setEditingSection(null)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800">Cancel</button>
                      <button onClick={handleSave} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 shadow-sm flex items-center gap-2">
                        <SolidCheckIcon className="h-4 w-4" /> Save
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Reference Table (Visible in both View and Edit modes) */}
                <div className="mt-8 pt-6 border-t border-gray-100 px-2">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Reference benchmarks (other projects)</h4>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3">Metric</th>
                          <th className="px-4 py-3 text-right">Other (mid-rise)</th>
                          <th className="px-4 py-3 text-right">Other (low-rise)</th>
                          <th className="px-4 py-3 text-right">Other (purpose-built)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">Hard cost / SF</td>
                          <td className="px-4 py-3 text-right text-gray-600">$300</td>
                          <td className="px-4 py-3 text-right text-gray-600">$245</td>
                          <td className="px-4 py-3 text-right text-gray-600">$225</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">Soft cost %</td>
                          <td className="px-4 py-3 text-right text-gray-600">18%</td>
                          <td className="px-4 py-3 text-right text-gray-600">20%</td>
                          <td className="px-4 py-3 text-right text-gray-600">20%</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">OpEx % of EGI</td>
                          <td className="px-4 py-3 text-right text-gray-600">35%</td>
                          <td className="px-4 py-3 text-right text-gray-600">32%</td>
                          <td className="px-4 py-3 text-right text-gray-600">30%</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                          <td className="px-4 py-3 font-medium text-gray-900">TDC per unit</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">$276,638</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">$277,250</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">~$266,200</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Locked Summary */}
              <div className="rounded-xl bg-gray-50 p-6 border-2 border-dashed border-gray-200">
                <div className="flex items-center gap-3">
                  <SolidLockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-500">3. Total development cost summary</h3>
                    <p className="text-sm text-gray-400">Complete built form and cost inputs to see TDC summary.</p>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Locked Summary */}
              <div className="rounded-xl bg-gray-50 p-6 border-2 border-dashed border-gray-200">
                <div className="flex items-center gap-3">
                  <SolidLockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-500">4. Capital stack – sources & uses</h3>
                    <p className="text-sm text-gray-400">Complete inputs to see capital stack.</p>
                  </div>
                </div>
              </div>

              {/* SECTION 5: Locked Summary */}
              <div className="rounded-xl bg-gray-50 p-6 border-2 border-dashed border-gray-200">
                <div className="flex items-center gap-3">
                  <SolidLockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-500">5. Financing structure – uses</h3>
                    <p className="text-sm text-gray-400">Complete inputs to see uses.</p>
                  </div>
                </div>
              </div>

              {/* SECTION 6: Locked Summary */}
              <div className="rounded-xl bg-gray-50 p-6 border-2 border-dashed border-gray-200">
                <div className="flex items-center gap-3">
                  <SolidLockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-500">6. Operating pro forma summary (stabilized)</h3>
                    <p className="text-sm text-gray-400">Complete inputs to see pro forma.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// UI Components
const DataLabel = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 text-gray-300">
      {React.cloneElement(icon, { className: "h-5 w-5" })}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-gray-900 mt-0.5">{value || <span className="text-gray-300 italic">Unspecified</span>}</p>
    </div>
  </div>
);

const StatBlock = ({ label, value, unit, isCalculated, className = '' }) => (
  <div className={`border rounded-xl p-4 shadow-sm relative overflow-hidden ${isCalculated ? 'bg-indigo-50/30 border-indigo-100' : 'bg-white border-gray-100'} ${className}`}>
    {isCalculated && (
      <div className="absolute top-0 right-0 p-2 text-indigo-300">
         <SolidCalculatorIcon className="h-5 w-5 opacity-50" />
      </div>
    )}
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-black text-gray-900 tracking-tight">{value ? Number(value).toLocaleString() : '-'}</span>
      {unit && value && <span className="text-xs font-bold text-gray-400">{unit}</span>}
    </div>
  </div>
);

const Input = ({ label, name, value, onChange, type = "text", suffix, isCalculated, readOnly, ...props }) => (
  <div>
    <div className="flex justify-between items-end mb-1.5">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</label>
      {isCalculated ? (
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded flex items-center gap-1">
          <SolidCalculatorIcon className="h-3 w-3" /> Auto-Calculated
        </span>
      ) : (
        <span className="text-[10px] font-bold text-gray-400">Input</span>
      )}
    </div>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly || isCalculated}
        className={`w-full px-3 py-2 border rounded-lg text-sm font-medium outline-none transition-all ${
          isCalculated 
            ? 'bg-indigo-50/50 border-indigo-100 text-indigo-900 cursor-not-allowed' 
            : 'bg-white border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-gray-900 hover:border-gray-400'
        } ${suffix ? 'pr-14' : ''}`}
        {...props}
      />
      {suffix && <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs font-bold text-gray-400">{suffix}</div>}
    </div>
  </div>
);

// Custom Solid/Dual-Tone Premium Icons (NO Lucide)
const SolidCalculatorIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v13.5a3 3 0 003 3h13.5a3 3 0 003-3V5.25a3 3 0 00-3-3H5.25zm1.5 4.5a.75.75 0 01.75-.75h9a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-3zM6 13.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm6 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm-6 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm6 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" clipRule="evenodd" />
  </svg>
);
const SolidBuildingIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
  </svg>
);
const SolidLocationIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);
const SolidUserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);
const SolidMailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);
const SolidDocumentIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" />
    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
  </svg>
);
const SolidEditIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.158 3.71 3.71 1.159-1.158a2.625 2.625 0 000-3.71zm-2.925 5.158L15.096 3.717 4.26 14.553a5.25 5.25 0 00-1.425 2.59l-.82 3.692a.75.75 0 00.92.92l3.692-.82a5.25 5.25 0 002.59-1.425L18.806 7.427z" />
  </svg>
);
const SolidCheckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);
const SolidInfoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.732l-1.162 4.743c-.02.08-.03.161-.03.242a.75.75 0 001.5 0c0-.05-.005-.1-.015-.149l1.162-4.743c.475-1.94-1.302-3.48-3.14-2.553l-4.135 2.067a.75.75 0 10.671 1.341l2.25-1.125zM12 8.25a.75.75 0 110-1.5.75.75 0 010 1.5z" clipRule="evenodd" />
  </svg>
);
const SolidDownloadIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);
const SolidLockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
  </svg>
);

export default App;
