import React from "react";

interface GrowthEquityProps {
  onClose?: () => void;
}
const data = [{
  year: 2000,
  cash: 0,
  realEstate: 0,
  valuation: 0
}, {
  year: 2005,
  cash: 5000000,
  realEstate: 8000000,
  valuation: 6000000
}, {
  year: 2010,
  cash: 8000000,
  realEstate: 9000000,
  valuation: 10000000
}, {
  year: 2015,
  cash: 9000000,
  realEstate: 10000000,
  valuation: 15000000
}, {
  year: 2020,
  cash: 7000000,
  realEstate: 18000000,
  valuation: 22000000
}, {
  year: 2025,
  cash: 4000000,
  realEstate: 40000000,
  valuation: 26000000
}];
const GrowthEquity: React.FC<GrowthEquityProps> = ({ onClose }) => {
  return <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-xl sm:text-2xl font-bold mb-2 text-center sm:text-left">
        Growth <span className="text-blue-600">Equity</span>
      </div>
      <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 text-center sm:text-left">
        Caveats Regarding Anhart Equity Growth Chart: Illustrative purposes only — figures are estimates, subject to revision.
      </div>

      {/* Chart Container - Custom CSS Chart */}
      <div className="bg-white border rounded-lg shadow p-2 sm:p-4">
        <div className="h-64 sm:h-80 relative">
          {/* Chart Title */}
          <div className="text-center text-sm font-semibold text-gray-700 mb-4">
            Financial Growth Over Time
          </div>
          
          {/* Custom Chart */}
          <div className="relative h-48 sm:h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 pr-2">
              <span>$30M</span>
              <span>$25M</span>
              <span>$20M</span>
              <span>$15M</span>
              <span>$10M</span>
              <span>$5M</span>
              <span>$0M</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-8 mr-4 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(7)].map((_, i) => <div key={i} className="border-t border-gray-200"></div>)}
              </div>
              
              {/* Data points and lines */}
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {data.map((point, index) => {
                const maxValue = 30000000; // 30M
                const cashHeight = point.cash / maxValue * 100;
                const realEstateHeight = point.realEstate / maxValue * 100;
                const valuationHeight = point.valuation / maxValue * 100;
                return <div key={point.year} className="flex flex-col items-center w-8 sm:w-12">
                      {/* Data bars */}
                      <div className="relative w-full h-32 sm:h-40 flex items-end justify-center gap-1">
                        {/* Cash bar */}
                        <div className="w-2 sm:w-3 bg-blue-500 rounded-t" style={{
                      height: `${cashHeight}%`
                    }} title={`Cash: $${(point.cash / 1000000).toFixed(0)}M`}></div>
                        {/* Real Estate bar */}
                        <div className="w-2 sm:w-3 bg-red-500 rounded-t" style={{
                      height: `${realEstateHeight}%`
                    }} title={`Real Estate: $${(point.realEstate / 1000000).toFixed(0)}M`}></div>
                        {/* Valuation bar */}
                        <div className="w-2 sm:w-3 bg-green-500 rounded-t" style={{
                      height: `${valuationHeight}%`
                    }} title={`Valuation: $${(point.valuation / 1000000).toFixed(0)}M`}></div>
                      </div>
                      
                      {/* Year label */}
                      <div className="text-xs text-gray-600 mt-2 text-center">
                        {point.year}
                      </div>
                    </div>;
              })}
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Cash Balances</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Real Estate Developed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Estimated Valuation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards for Mobile */}
      <div className="sm:hidden mt-4 space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-800">Cash Balances</span>
              <span className="text-lg font-bold text-blue-900">$4M</span>
            </div>
            <div className="text-xs text-blue-700">2025 Current</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-red-800">Real Estate</span>
              <span className="text-lg font-bold text-red-900">$40M</span>
            </div>
            <div className="text-xs text-red-700">2025 Current</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-green-800">Total Valuation</span>
              <span className="text-lg font-bold text-green-900">$26M</span>
            </div>
            <div className="text-xs text-green-700">2025 Current</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 mt-4 text-center sm:text-left">
        <strong>Disclaimer:</strong> Figures are estimates based on multiple entities. Cash balances, real estate, and valuations may change with market conditions, expenses, investments, and external factors. Not a formal financial report.
      </div>
    </div>;
};
export default GrowthEquity;