'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-serif font-bold text-[#1a2621] mb-4">
          Something went wrong
        </h1>
        <p className="text-[#1a2621]/60 mb-8">
          We apologize for the inconvenience. Please try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-[#a6906c] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8b7355] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
