'use client';

import React, { useEffect } from "react";
interface PerformanceSummaryProps {
  onClose?: () => void;
}
const PerformanceSummary: React.FC<{
  children?: React.ReactNode;
}> = ({
  onClose,
  children
}) => {

  // Close on Escape key if onClose is provided
  useEffect(() => {
    if (!onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Performance Summary 1988 - Present
      </div>

      {/* Mobile-optimized table container */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Header Row - Hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:grid sm:grid-cols-4 bg-gray-200 font-semibold text-gray-800">
          <div className="p-3 border-r border-gray-300">Year</div>
          <div className="p-3 border-r border-gray-300">Project/Investment</div>
          <div className="p-3 border-r border-gray-300">Patient Capital Raised</div>
          <div className="p-3">Metrics / Financial Impact</div>
        </div>

        {/* Data Rows */}
        {[
          {
            year: "1988",
            project: "Sustainable Villages Initiative and Pay Forward Canada",
            patientCapital: "$2M",
            metrics: "Paid Forward $2M from 1988 to present in 15 countries.",
            outcome: "Advanced sustainability in affordable housing, aligning growth with environmental goals.",
          },
          {
            year: "1995",
            project: "Evelyn Court Winnipeg",
            patientCapital: "$30,000",
            metrics: "Purchased inner-city Evelyn Court apartment block.",
            outcome: "Developed Anhart's first non-profit, community-based property ownership model",
          },
          {
            year: "2000",
            project: "Jubilee (235 Main Street) Vancouver",
            patientCapital: "$2M",
            metrics:
              "Combination impact investment and personally guaranteed bank loan to renovate 80-room derelict SRO.",
            outcome:
              "First Vancouver SRO conversion model to demonstrate congregate housing wellness using private funds.",
          },
          {
            year: "2004",
            project: "Dodson (25 East Hastings) Vancouver",
            patientCapital: "$3M",
            metrics: "Investment for purchase and renovation of a 71-room supportive housing facility.",
            outcome:
              "Create a hub for indigenous Canadians and expanded Anhart's footprint in community-focused housing.",
          },
          {
            year: "2005",
            project: "Sociological Modelling of Emergence",
            patientCapital: "$50,000",
            metrics:
              "CMHC grant to study impact of self-organizing housing models. Documented 40-60% reduction in addiction, mental illness and sex trade linkages after six months' stay.",
            outcome: "Set new standards for supportive housing; improved outcomes for vulnerable populations.",
          },
          {
            year: "2009",
            project: "CleanStart Waste Management CCC Ltd.",
            patientCapital: "$100,000",
            metrics: "Established as Take the Green Challenge; rebranded CleanStart, grew to 40 employees.",
            outcome:
              "Highlighted Anhart's focus on social enterprise, providing jobs to those with employment barriers.",
          },
          {
            year: "2010-2024s",
            project: "Anhart Community Housing Society",
            patientCapital: "$4M",
            metrics:
              "Managed long-term intercompanyloans from Anhart Community Housing Society to affiliated organizations.",
            outcome:
              "Provided stable, long-term funding for community-based projects by offering low-interest financing to support affordable housing initiatives.",
          },
          {
            year: "2012",
            project: "Skeena House Renovation Vancouver",
            patientCapital: "N/A",
            metrics: "Renovated 54 units at 3475 East Hastings with City of Vancouver and Aboriginal Friendship Centre",
            outcome: "Demonstrated ability to execute collaborative, community-focused projects.",
          },
          {
            year: "2013",
            project: "Metson Rooms and Metson Shelter Conversion Vancouver",
            patientCapital: "N/A",
            metrics: "Transformed 100 units at 1060 Howe in partnership with City of Vancouver.",
            outcome: "Expanded Anhart's supportive housing portfolio, addressing homelessness in urban areas.",
          },
          {
            year: "2015",
            project: "Tent City to Quality Inn Transitional Housing Vancouver",
            patientCapital: "N/A",
            metrics: "Managed 160 units at 1335 Howe for 300 individuals from inner-city homeless camps.",
            outcome: "Provided scalable, immediate housing solutions, enhancing Anhart's reputation.",
          },
          {
            year: "2017",
            project: "Key Project Developments (626 Alexander, 179 Main, 1270 Ryder, 162 Main)",
            patientCapital: "N/A",
            metrics: "Invested in key development projects to expand affordable housing infrastructure.",
            outcome: "Strengthened portfolio, increasing the number of affordable units available.",
          },
          {
            year: "2017-2023",
            project: "Vancity Foundation",
            patientCapital: "$6M",
            metrics: "Invested in key development projects (Ryder, Merritt, Scott Road, 162 Main)",
            outcome: "A successful application of patient catalytic capital to create affordable homes across Canada.",
          },
          {
            year: "2017-present",
            project: "Anhart Affordable Homes 2019 Limited Partnership",
            patientCapital: "$200,000+",
            metrics:
              "Initiated with $200,000 in seed funding to establish a scalable limited partnership structure, enabling external subscriptions and direct impact investments to develop affordable homes across Canada.",
            outcome:
              "Created a sustainable investment vehicle providing patient equity and concessionary lending, strengthening Anhart's financial capacity and expanding its national housing portfolio.",
          },
          {
            year: "2023",
            project: "Anhart Corporation",
            patientCapital: "$100,000",
            metrics:
              "Formed strategic partnerships with community developers and financial institutions to scale affordable housing delivery across provinces",
            outcome: "Patient capital raised to launch corporate platform across 10 provinces and 3 territories.",
          },
        ].map((row, idx) => (
          <div key={idx} className="border-t border-gray-300">
            {/* Desktop/Tablet Layout */}
            <div className="hidden sm:grid sm:grid-cols-4 text-sm">
              <div className="p-3 border-r border-gray-300 font-medium bg-gray-50">{row.year}</div>
              <div className="p-3 border-r border-gray-300">{row.project}</div>
              <div className="p-3 border-r border-gray-300 font-semibold text-primary">{row.patientCapital}</div>
              <div className="p-3">
                <div className="mb-1">
                  <span className="font-semibold">Metrics:</span> {row.metrics}
                </div>
                <div>
                  <span className="font-semibold">Outcome:</span> {row.outcome}
                </div>
              </div>
            </div>

            {/* Mobile Layout - Card Style */}
            <div className="sm:hidden p-4">
              <div className="bg-gray-50 rounded-lg p-3 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">{row.year}</span>
                  <span className="font-bold text-primary">{row.patientCapital}</span>
                </div>
                <h3 className="font-semibold text-sm mb-2">{row.project}</h3>
              </div>

              <div className="space-y-2">
                <div className="bg-blue-50 rounded p-2">
                  <div className="text-xs font-semibold text-blue-800 mb-1">Metrics</div>
                  <div className="text-xs text-gray-700">{row.metrics}</div>
                </div>
                <div className="bg-green-50 rounded p-2">
                  <div className="text-xs font-semibold text-green-800 mb-1">Outcome</div>
                  <div className="text-xs text-gray-700">{row.outcome}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PerformanceSummary;
