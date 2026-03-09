'use client';

/**
 * TDCE Form — multi-section form for creating/editing Total Development Cost Estimate input.
 * Sections: Project Info (meta), Physical Characteristics, Financial Inputs, Operating Assumptions.
 * Used for initial TDCE creation flow (e.g. generate TDCE).
 */

import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import type { TdceInput } from '@/types/tdce';
import {
  DEFAULT_OPERATING_INPUTS,
  DEFAULT_FINANCIAL_INPUTS,
  DEFAULT_PHYSICAL_INPUTS,
} from '@/types/tdce';
import UnitMixInput from './UnitMixInput';

interface FormSection {
  title: string;
  icon: string;
  fields: React.ReactNode;
}

interface TdceFormProps {
  onSubmit: (data: TdceInput) => void;
  isGenerating: boolean;
}

// -----------------------------------------------------------------------------
// TDCE Form — Reusable form field component
// -----------------------------------------------------------------------------

const FormField = ({
  label,
  name,
  control,
  type = 'text',
  placeholder,
  prefix,
  suffix,
  required = false,
  min,
  max,
  step,
  tooltip,
}: {
  label: string;
  name: string;
  control: any;
  type?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: string;
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      {label}
      {required && <span className="text-rose-500">*</span>}
      {tooltip && (
        <span className="group relative">
          <span className="cursor-help text-slate-400 hover:text-slate-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="invisible group-hover:visible absolute left-6 top-0 z-10 w-48 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg">
            {tooltip}
          </span>
        </span>
      )}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
          {prefix}
        </span>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className={`
              w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5
              text-slate-800 placeholder:text-slate-400
              transition-all duration-200
              hover:border-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200
              ${prefix ? 'pl-8' : ''}
              ${suffix ? 'pr-12' : ''}
            `}
            onChange={(e) => {
              const val = e.target.value;
              const value = type === 'number' ? (val === '' ? undefined : parseFloat(val)) : val;
              field.onChange(value);
            }}
          />
        )}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// TDCE Form — Main form component (default values, section config)
// -----------------------------------------------------------------------------

export function TdceForm({ onSubmit, isGenerating }: TdceFormProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<TdceInput>({
    defaultValues: {
      meta: {
        projectTitle: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        date: new Date(),
        partners: {
          developer: '',
          architect: '',
          generalContractor: '',
          lender: '',
        },
      },
      physicals: {
        siteAreaSqFt: 0,
        grossFloorAreaSqFt: 0,
        grossBuildableSqFt: 0,
        efficiencyRatio: DEFAULT_PHYSICAL_INPUTS.efficiencyRatio!,
        totalUnits: 0,
        stories: 0,
        parkingSpaces: 0,
        unitMix: [],
      },
      financials: {
        landCost: 0,
        hardCostPerSqFt: 0,
        softCostPercent: DEFAULT_FINANCIAL_INPUTS.softCostPercent!,
        commercialSqFt: DEFAULT_FINANCIAL_INPUTS.commercialSqFt!,
        commercialRentPerSqFt: DEFAULT_FINANCIAL_INPUTS.commercialRentPerSqFt!,
      },
      operations: {
        residentialRentPerSqFt: DEFAULT_OPERATING_INPUTS.residentialRentPerSqFt,
        vacancyRate: DEFAULT_OPERATING_INPUTS.vacancyRate,
        operatingExpenseRatio: DEFAULT_OPERATING_INPUTS.operatingExpenseRatio,
        debtServiceConstant: DEFAULT_OPERATING_INPUTS.debtServiceConstant,
      },
    },
  });

  const sections = [
    {
      id: 'meta',
      title: 'Project Info',
      icon: '📋',
      description: 'Basic project details and partners',
    },
    {
      id: 'physicals',
      title: 'Physical Characteristics',
      icon: '🏗️',
      description: 'Site and building specifications',
    },
    {
      id: 'financials',
      title: 'Financial Inputs',
      icon: '💰',
      description: 'Development costs and commercial space',
    },
    {
      id: 'operations',
      title: 'Operating Assumptions',
      icon: '📊',
      description: 'Rent, vacancy, and expense ratios',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* TDCE Form — Section navigation (Project Info, Physical, Financial, Operating) */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveSection(index)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              whitespace-nowrap transition-all duration-200
              ${activeSection === index
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }
            `}
          >
            <span>{section.icon}</span>
            <span>{section.title}</span>
          </button>
        ))}
      </div>

      {/* TDCE Form — Section content area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span className="text-2xl">{sections[activeSection].icon}</span>
            {sections[activeSection].title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{sections[activeSection].description}</p>
        </div>

        <div className="p-6">
          {/* TDCE Form Section 1: Project Meta — title, address, city, province, postal code, partners */}
          {activeSection === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    label="Project Title"
                    name="meta.projectTitle"
                    control={control}
                    placeholder="e.g., Maple Street Affordable Housing"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Street Address"
                    name="meta.address"
                    control={control}
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                  <FormField
                    label="City"
                    name="meta.city"
                    control={control}
                    placeholder="Toronto"
                    required
                  />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      Province
                      <span className="text-rose-500">*</span>
                      <span className="group relative">
                        <span className="cursor-help text-slate-400 hover:text-slate-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="invisible group-hover:visible absolute left-6 top-0 z-10 w-48 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg">
                          Select Canadian province or territory
                        </span>
                      </span>
                    </label>
                    <Controller
                      name="meta.province"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5
                                   text-slate-800
                                   transition-all duration-200
                                   hover:border-slate-400
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                          <option value="">Select Province</option>
                          <option value="AB">Alberta (AB)</option>
                          <option value="BC">British Columbia (BC)</option>
                          <option value="MB">Manitoba (MB)</option>
                          <option value="NB">New Brunswick (NB)</option>
                          <option value="NL">Newfoundland and Labrador (NL)</option>
                          <option value="NS">Nova Scotia (NS)</option>
                          <option value="NT">Northwest Territories (NT)</option>
                          <option value="NU">Nunavut (NU)</option>
                          <option value="ON">Ontario (ON)</option>
                          <option value="PE">Prince Edward Island (PE)</option>
                          <option value="QC">Quebec (QC)</option>
                          <option value="SK">Saskatchewan (SK)</option>
                          <option value="YT">Yukon (YT)</option>
                        </select>
                      )}
                    />
                  </div>
                  <Controller
                    name="meta.postalCode"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          Postal Code
                          <span className="text-rose-500">*</span>
                          <span className="group relative">
                            <span className="cursor-help text-slate-400 hover:text-slate-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </span>
                            <span className="invisible group-hover:visible absolute left-6 top-0 z-10 w-48 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg">
                              Canadian postal code format (e.g., M5H 2N2)
                            </span>
                          </span>
                        </label>
                        <input
                          {...field}
                          type="text"
                          placeholder="M5H 2N2"
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5
                                   text-slate-800 placeholder:text-slate-400
                                   transition-all duration-200
                                   hover:border-slate-400
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                   uppercase"
                          onChange={(e) => {
                            // Format Canadian postal code: A1A1A1 -> A1A 1A1
                            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                            if (value.length > 3) {
                              value = value.slice(0, 3) + ' ' + value.slice(3, 6);
                            }
                            field.onChange(value);
                          }}
                          maxLength={7}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Project Partners</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Developer"
                    name="meta.partners.developer"
                    control={control}
                    placeholder="Anhart Affordable Housing"
                    required
                  />
                  <FormField
                    label="Architect"
                    name="meta.partners.architect"
                    control={control}
                    placeholder="ABC Architecture"
                  />
                  <FormField
                    label="General Contractor"
                    name="meta.partners.generalContractor"
                    control={control}
                    placeholder="XYZ Construction"
                  />
                  <FormField
                    label="Lender"
                    name="meta.partners.lender"
                    control={control}
                    placeholder="First National Bank"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TDCE Form Section 2: Physical Characteristics — site area, GSF, units, efficiency, stories, parking, unit mix */}
          {activeSection === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Site Area"
                  name="physicals.siteAreaSqFt"
                  control={control}
                  type="number"
                  placeholder="15000"
                  suffix="SF"
                  required
                  min={0}
                  tooltip="Total land area in square feet"
                />
                <FormField
                  label="Gross Floor Area (GFA)"
                  name="physicals.grossFloorAreaSqFt"
                  control={control}
                  type="number"
                  placeholder="50000"
                  suffix="SF"
                  required
                  min={0}
                  tooltip="Total gross floor area of the building"
                />
                <FormField
                  label="Total Residential Units"
                  name="physicals.totalUnits"
                  control={control}
                  type="number"
                  placeholder="60"
                  suffix="units"
                  required
                  min={1}
                />
                <FormField
                  label="Efficiency Ratio"
                  name="physicals.efficiencyRatio"
                  control={control}
                  type="number"
                  placeholder="0.85"
                  min={0.5}
                  max={1}
                  step={0.01}
                  tooltip="Net-to-Gross ratio (typically 0.80-0.90)"
                />
                <FormField
                  label="Number of Stories"
                  name="physicals.stories"
                  control={control}
                  type="number"
                  placeholder="5"
                  suffix="floors"
                  min={1}
                />
                <FormField
                  label="Parking Spaces"
                  name="physicals.parkingSpaces"
                  control={control}
                  type="number"
                  placeholder="45"
                  suffix="spaces"
                  min={0}
                />
              </div>

              {/* TDCE Form — Unit mix input (studio/1-bed/2-bed counts and sizes) */}
              <div className="pt-6 border-t border-slate-200 mt-6">
                <Controller
                  name="physicals.unitMix"
                  control={control}
                  render={({ field }) => (
                    <UnitMixInput
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  )}
                />
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-700">
                    <strong>Tip:</strong> If you specify a unit mix, the system will automatically calculate
                    GSF and total units from your breakdown. This provides more precise cost estimation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TDCE Form Section 3: Financial Inputs — land, hard cost/sf, soft %, commercial sq ft & rent */}
          {activeSection === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Land Acquisition Cost"
                  name="financials.landCost"
                  control={control}
                  type="number"
                  placeholder="2500000"
                  prefix="$"
                  required
                  min={0}
                />
                <FormField
                  label="Hard Cost per SF"
                  name="financials.hardCostPerSqFt"
                  control={control}
                  type="number"
                  placeholder="350"
                  prefix="$"
                  suffix="/SF"
                  required
                  min={0}
                  tooltip="Construction cost per gross square foot"
                />
                <FormField
                  label="Soft Cost Percentage"
                  name="financials.softCostPercent"
                  control={control}
                  type="number"
                  placeholder="0.25"
                  step={0.01}
                  min={0}
                  max={1}
                  tooltip="Soft costs as % of hard costs (typically 20-35%)"
                />
              </div>

              {/* TDCE Form — Commercial space (optional) */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Commercial Space (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Commercial Square Footage"
                    name="financials.commercialSqFt"
                    control={control}
                    type="number"
                    placeholder="5000"
                    suffix="SF"
                    min={0}
                    tooltip="Ground floor retail or commercial space"
                  />
                  <FormField
                    label="Commercial Rent per SF"
                    name="financials.commercialRentPerSqFt"
                    control={control}
                    type="number"
                    placeholder="30"
                    prefix="$"
                    suffix="/SF/yr"
                    min={0}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TDCE Form Section 4: Operating Assumptions — rent/sf, vacancy, op ex ratio, debt service constant */}
          {activeSection === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Residential Rent per SF"
                  name="operations.residentialRentPerSqFt"
                  control={control}
                  type="number"
                  placeholder="3.50"
                  prefix="$"
                  suffix="/SF/mo"
                  required
                  min={0}
                  step={0.01}
                  tooltip="Monthly rent per net rentable square foot"
                />
                <FormField
                  label="Vacancy Rate"
                  name="operations.vacancyRate"
                  control={control}
                  type="number"
                  placeholder="0.03"
                  step={0.01}
                  min={0}
                  max={1}
                  tooltip="Expected vacancy rate (default 3%)"
                />
                <FormField
                  label="Operating Expense Ratio"
                  name="operations.operatingExpenseRatio"
                  control={control}
                  type="number"
                  placeholder="0.40"
                  step={0.01}
                  min={0}
                  max={1}
                  tooltip="Operating expenses as % of EGI (typically 35-45%)"
                />
                <FormField
                  label="Debt Service Constant"
                  name="operations.debtServiceConstant"
                  control={control}
                  type="number"
                  placeholder="0.05"
                  step={0.001}
                  min={0}
                  max={0.2}
                  tooltip="Blended annual debt service constant (default 5%)"
                />
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <h5 className="font-medium text-amber-800">Pro Tip</h5>
                    <p className="text-sm text-amber-700 mt-1">
                      For Class D estimates, typical ranges are: Vacancy 3-5%, Operating Expense 35-45%,
                      and Debt Service Constant 5-7% depending on current interest rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TDCE Form — Navigation (Previous/Next) and Submit (Generate TDCE) */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${activeSection === 0
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-white hover:shadow-sm'
              }
            `}
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {activeSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveSection(activeSection + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium
                         hover:bg-blue-700 transition-all shadow-sm"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isGenerating}
                className={`
                  px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-sm
                  flex items-center gap-2
                  ${isGenerating
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  }
                `}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate TDCE
                    <span>📄</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default TdceForm;
