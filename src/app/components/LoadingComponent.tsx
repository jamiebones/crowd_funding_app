"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

type SizeVariant = 'small' | 'default' | 'large';

interface LoadingComponentProps {
  message?: string;
  size?: SizeVariant;
  className?: string;
  'data-testid'?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ 
  message = 'Loading...', 
  size = 'default',
  className = '',
  'data-testid': dataTestId = 'loading-component'
}) => {
  const sizeVariants: Record<SizeVariant, string> = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center space-y-4 p-6 ${className}`}
      data-testid={dataTestId}
    >
      <Loader2 
        className={`
          ${sizeVariants[size]} 
          text-primary 
          animate-spin
        `}
        data-testid={`${dataTestId}-spinner`}
      />
      <p 
        className="text-gray-600 text-sm"
        data-testid={`${dataTestId}-message`}
      >
        {message}
      </p>
    </div>
  );
};

export default LoadingComponent;