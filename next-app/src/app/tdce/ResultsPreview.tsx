'use client';

import type { TdceDocument } from '@/types/tdce';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRatio,
} from '@/lib/tdce-calculator';

interface ResultsPreviewProps {
  data: TdceDocument;
}

const MetricCard = ({
  label,
  value,
  subValue,
  icon,
  color = 'blue',
}: {
  label: string;
  value: string;
  subValue?: string;
  icon: string;
  color?: 'blue' | 'green' | 'amber' | 'purple';
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`} />
      </div>
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      {subValue && (
        <p className="text-xs text-slate-400 mt-1">{subValue}</p>
      )}
    </div>
  );
};

const TableRow = ({
  label,
  value,
  percent,
  isTotal = false,
}: {
  label: string;
  value: string;
  percent?: string;
  isTotal?: boolean;
}) => (
  <div className={`flex justify-between py-3 px-4 ${isTotal ? 'bg-slate-800 text-white rounded-lg' : 'border-b border-slate-100'}`}>
    <span className={isTotal ? 'font-semibold' : 'text-slate-600'}>{label}</span>
    <div className="flex gap-6">
      <span className={`font-medium ${isTotal ? '' : 'text-slate-800'}`}>{value}</span>
      {percent && <span className={`w-16 text-right ${isTotal ? 'text-slate-300' : 'text-slate-400'}`}>{percent}</span>}
    </div>
  </div>
);

export function ResultsPreview({ data }: ResultsPreviewProps) {
  const { input, output } = data;
  const { meta, physicals, financials, operations } = input;
  const { costs, costMetrics, income, operations: opMetrics, areas } = output;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
          <span className="uppercase tracking-wider">TDCE Report</span>
          <span>•</span>
          <span>Class D Estimate (±30%)</span>
        </div>
        <h2 className="text-2xl font-bold mb-1">{meta.projectTitle || 'Untitled Project'}</h2>
        <p className="text-slate-300">
          {meta.address}, {meta.city}, {meta.province} {meta.postalCode}
        </p>
        <div className="flex gap-6 mt-4 text-sm">
          <div>
            <span className="text-slate-400">Units:</span>{' '}
            <span className="font-semibold">{physicals.totalUnits}</span>
          </div>
          <div>
            <span className="text-slate-400">GSF:</span>{' '}
            <span className="font-semibold">
              {formatNumber(physicals.grossFloorAreaSqFt ?? physicals.grossBuildableSqFt ?? 0)}
            </span>
          </div>
          <div>
            <span className="text-slate-400">Developer:</span>{' '}
            <span className="font-semibold">{meta.partners.developer || '—'}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon="🏗️"
          label="Total Development Cost"
          value={formatCurrency(costs.totalDevelopmentCost)}
          subValue={`${formatCurrency(costMetrics.costPerUnit)}/unit`}
          color="blue"
        />
        <MetricCard
          icon="💵"
          label="Net Operating Income"
          value={formatCurrency(opMetrics.noi)}
          subValue="Stabilized Year 1"
          color="green"
        />
        <MetricCard
          icon="📈"
          label="Cap Rate"
          value={formatPercent(opMetrics.capRate)}
          subValue="NOI / TDC"
          color="amber"
        />
        <MetricCard
          icon="🎯"
          label="DSCR"
          value={formatRatio(opMetrics.dscr)}
          subValue="Debt Coverage"
          color="purple"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uses of Funds */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span>💰</span> Uses of Funds
            </h3>
          </div>
          <div className="p-4">
            <TableRow
              label="Land Acquisition"
              value={formatCurrency(costs.landCost)}
              percent={formatPercent(costs.landCost / costs.totalDevelopmentCost)}
            />
            <TableRow
              label="Hard Costs"
              value={formatCurrency(costs.hardCosts)}
              percent={formatPercent(costs.hardCosts / costs.totalDevelopmentCost)}
            />
            <TableRow
              label="Soft Costs"
              value={formatCurrency(costs.softCosts)}
              percent={formatPercent(costs.softCosts / costs.totalDevelopmentCost)}
            />
            <div className="mt-2">
              <TableRow
                label="Total Development Cost"
                value={formatCurrency(costs.totalDevelopmentCost)}
                percent="100%"
                isTotal
              />
            </div>
          </div>
        </div>

        {/* Operating Pro Forma */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span>📊</span> Operating Pro Forma
            </h3>
          </div>
          <div className="p-4">
            <TableRow
              label="Gross Potential Rent"
              value={formatCurrency(income.grossPotentialRent)}
            />
            <TableRow
              label={`Vacancy (${formatPercent(operations.vacancyRate)})`}
              value={`(${formatCurrency(income.grossPotentialRent - income.effectiveGrossIncome)})`}
            />
            <TableRow
              label="Effective Gross Income"
              value={formatCurrency(income.effectiveGrossIncome)}
            />
            <TableRow
              label={`Operating Expenses (${formatPercent(operations.operatingExpenseRatio)})`}
              value={`(${formatCurrency(opMetrics.operatingExpenses)})`}
            />
            <div className="mt-2">
              <TableRow
                label="Net Operating Income"
                value={formatCurrency(opMetrics.noi)}
                isTotal
              />
            </div>
          </div>
        </div>
      </div>

      {/* Physical Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <span>🏢</span> Physical Characteristics
          </h3>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Site Area</p>
            <p className="text-lg font-semibold text-slate-800">{formatNumber(physicals.siteAreaSqFt)} SF</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">GFA</p>
            <p className="text-lg font-semibold text-slate-800">
              {formatNumber(physicals.grossFloorAreaSqFt ?? physicals.grossBuildableSqFt ?? 0)} SF
            </p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">FSR</p>
            <p className="text-lg font-semibold text-slate-800">{areas.floorSpaceRatio.toFixed(2)}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Efficiency</p>
            <p className="text-lg font-semibold text-slate-800">{formatPercent(physicals.efficiencyRatio)}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Net Rentable</p>
            <p className="text-lg font-semibold text-slate-800">{formatNumber(income.residentialNetRentableArea)} SF</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Units</p>
            <p className="text-lg font-semibold text-slate-800">{physicals.totalUnits}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Avg Unit Size</p>
            <p className="text-lg font-semibold text-slate-800">{formatNumber(areas.avgUnitSize)} SF</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Cost/Unit</p>
            <p className="text-lg font-semibold text-slate-800">{formatCurrency(costMetrics.costPerUnit)}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-medium text-amber-800">Class D Estimate Disclaimer</p>
            <p className="text-sm text-amber-700 mt-1">
              This is a preliminary estimate with an accuracy range of ±30%. Intended for planning purposes
              only. Consult qualified professionals before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPreview;
