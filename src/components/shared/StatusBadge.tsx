import React from 'react';
import { cn } from '@/lib/utils';

/**
 * StatusBadge Component
 * 
 * A reusable status badge component that provides consistent styling
 * for different status types across the application. Handles various
 * status formats and provides appropriate color coding.
 * 
 * @param status - The status text to display
 * @param className - Additional CSS classes
 */
interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  /**
   * Determines the appropriate CSS classes for different status types
   * @param status - The status string to evaluate
   * @returns CSS class string for styling
   */
  const getStatusColor = (status: string): string => {
    const normalizedStatus = status?.toLowerCase();
    
    switch (normalizedStatus) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span 
      className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
};
