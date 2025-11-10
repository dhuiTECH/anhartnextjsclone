import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

/**
 * StatsSection Component
 * 
 * A reusable statistics section component that displays key metrics
 * in a grid layout. Commonly used for showcasing achievements,
 * project counts, and other numerical data.
 * 
 * @param stats - Array of stat objects with value and label
 * @param className - Additional CSS classes
 * @param columns - Number of columns in the grid (responsive)
 */
interface StatItem {
  value: string | number;
  label: string;
  description?: string;
}
interface StatsSectionProps {
  stats: StatItem[];
  className?: string;
  columns?: {
    default: number;
    sm: number;
    lg: number;
  };
}
export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  className,
  columns = {
    default: 1,
    sm: 2,
    lg: 4
  }
}) => {
  const getGridClasses = () => {
    return `grid grid-cols-${columns.default} gap-8 sm:grid-cols-${columns.sm} lg:grid-cols-${columns.lg} text-center`;
  };
  return (
    <ScrollAnimationWrapper>
      <div className={cn(getGridClasses(), className)}>
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </div>
            {stat.description && (
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollAnimationWrapper>
  );
};