'use client';

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import PerformanceSummary from "./metrics/PerformanceSummary";
import GrowthEquity from "./metrics/GrowthEquity";

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MetricsModal: React.FC<{
  children?: React.ReactNode;
}> = ({
  isOpen,
  onClose,
  children
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Lock outside window scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  const pages = [
    {
      id: 'performance',
      title: 'Performance Summary',
      icon: BarChart3,
      component: PerformanceSummary
    },
    {
      id: 'growth',
      title: 'Growth Equity',
      icon: TrendingUp,
      component: GrowthEquity
    }
  ];

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : pages.length - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : 0));
  };

  const handlePageSelect = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  if (!isOpen) return null;

  const CurrentComponent = pages[currentPage].component;
  const CurrentIcon = pages[currentPage].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-3">
            <CurrentIcon className="h-6 w-6 text-primary" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {pages[currentPage].title}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Page Navigation - Desktop */}
            <div className="hidden sm:flex items-center gap-1">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => handlePageSelect(index)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    index === currentPage
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Controls - Mobile */}
        <div className="sm:hidden flex items-center justify-between p-3 bg-gray-100 border-b">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {currentPage + 1} of {pages.length}
            </span>
            <div className="flex gap-1">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageSelect(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentPage ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <CurrentComponent onClose={onClose} />
        </div>

        {/* Footer Navigation - Desktop */}
        <div className="hidden sm:flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {pages.length}
            </span>
          </div>
          
          <Button
            variant="outline"
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetricsModal;
