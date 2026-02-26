import React from 'react';
import { cn } from '@/lib/utils';

interface HoleBackgroundProps {
  className?: string;
}

export const HoleBackground: React.FC<HoleBackgroundProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hole-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="rgba(255, 255, 255, 0.1)" />
          </pattern>
          <radialGradient id="hole-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.8)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hole-pattern)" />
        <rect width="100%" height="100%" fill="url(#hole-gradient)" />
      </svg>
    </div>
  );
};
