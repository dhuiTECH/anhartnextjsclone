'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * InfoCard Component
 * 
 * A flexible card component for displaying information with icons,
 * titles, and descriptions. Supports different layouts and styling options.
 * 
 * @param icon - Lucide React icon component
 * @param title - Card title
 * @param description - Card description text
 * @param className - Additional CSS classes
 * @param iconClassName - Additional CSS classes for the icon container
 * @param onClick - Optional click handler for interactive cards
 * @param children - Additional content to render inside the card
 */
interface InfoCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<{
  children?: React.ReactNode;
}> = ({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  onClick,
  children
}) => {
  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-300",
        onClick && "cursor-pointer hover:shadow-xl hover:border-primary/20",
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        {Icon && (
          <div className={cn(
            "h-12 w-12 flex items-center justify-center rounded-lg bg-primary text-white mx-auto mb-4",
            iconClassName
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        <CardTitle className="text-center">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {description && (
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
};
