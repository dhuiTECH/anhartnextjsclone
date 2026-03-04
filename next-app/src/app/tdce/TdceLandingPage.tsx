'use client';

import { BookingFormDialog } from '@/components/BookingFormDialog';
import { Button } from '@/components/ui/button';

// Icons
const HouseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 22h20" />
    <path d="M5 22V9l8-6 8 6v13" />
    <path d="M9 22V12h6v10" />
  </svg>
);

const ChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18" />
    <path d="M7 16v-5" />
    <path d="M12 16v-8" />
    <path d="M17 16v-11" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface TdceLandingPageProps {
  onSelectHomeowners: () => void;
  onSelectDevelopers: () => void;
}

export function TdceLandingPage({ onSelectHomeowners, onSelectDevelopers }: TdceLandingPageProps) {
  // Swapped from the dull brown to a vibrant brand red to match the logo
  const brandRed = '#D83A42'; 
  const brandRedClass = 'text-[#D83A42]';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 bg-gray-50/50">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl">
        <p className={`text-sm font-semibold uppercase tracking-[0.25em] ${brandRedClass} mb-3`}>
          Where are you starting?
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Choose your path
        </h2>
      </div>

      {/* Two Cards - Increased max-width and gap for better breathing room */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        
        {/* Left Card - For Homeowners (Light) */}
        {/* Added 'group', 'cursor-pointer', and 'hover:-translate-y-2' to make the whole card interactive */}
        <div 
          onClick={onSelectHomeowners}
          role="button"
          tabIndex={0}
          className="group bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-200 text-left"
        >
          <div className="flex-1">
            <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-8 bg-red-50 ${brandRedClass} group-hover:scale-110 transition-transform duration-300`}>
              <HouseIcon className="w-8 h-8" />
            </div>
            <p className={`text-xs font-bold uppercase tracking-[0.15em] ${brandRedClass} mb-3`}>
              For Homeowners
            </p>
            {/* Increased Title Size */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              I want to develop a home
            </h3>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              Planning a new build, laneway house, or secondary suite? Get a plain-language overview of costs, permits, and timelines for residential development across Canada.
            </p>
            
          </div>
          
          {/* Action indicator - Arrow moves on group hover */}
          <div className={`flex items-center gap-3 text-sm font-bold ${brandRedClass} uppercase tracking-wider`}>
            Get started
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>

        {/* Right Card - For Developers (Dark) */}
        <div 
          onClick={onSelectDevelopers}
          role="button"
          tabIndex={0}
          className="group bg-[#111827] rounded-3xl shadow-lg border border-gray-800 p-10 flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-[#D83A42]/10 hover:-translate-y-2 hover:border-gray-700 text-left"
        >
          <div className="flex-1">
            <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-8 bg-gray-800/50 ${brandRedClass} group-hover:scale-110 transition-transform duration-300`}>
              <ChartIcon className="w-8 h-8" />
            </div>
            <p className={`text-xs font-bold uppercase tracking-[0.15em] ${brandRedClass} mb-3`}>
              For Developers
            </p>
            {/* Increased Title Size */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              I&apos;m sizing up a project
            </h3>
            <p className="text-base text-gray-400 leading-relaxed mb-8">
              Developer, planner, or finance professional? Run a full Total Development Cost Estimate using Altus Group benchmarks and BCH affordable housing parameters.
            </p>
          </div>

          {/* Action indicator - Arrow moves on group hover */}
          <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider group-hover:text-gray-200 transition-colors">
            Open TDCE tool
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 text-[#D83A42]" />
          </div>
        </div>
      </div>

      {/* Footer - Consultation CTA */}
      <div className="mt-20 text-center max-w-lg mx-auto">
        <p className="text-gray-500 text-base mb-6">
          Not sure where to start? Book a free pre-development consultation with our team.
        </p>
        <BookingFormDialog
          trigger={
            <Button
              variant="default"
              size="lg"
              className="bg-[#D83A42] hover:bg-[#B92B33] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Book a Consultation
            </Button>
          }
          titleSize="lg"
        />
      </div>
    </div>
  );
}