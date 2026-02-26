import { useEffect, useState } from 'react';

export interface PerformanceCapabilities {
  canAnimateDotGrid: boolean;
  canAnimateIcons: boolean;
  reduceMotion: boolean;
  canUseBlur: boolean;
  isLowEndDevice: boolean;
}

export function usePerformance(): PerformanceCapabilities {
  const [capabilities, setCapabilities] = useState<PerformanceCapabilities>({
    canAnimateDotGrid: true,
    canAnimateIcons: true,
    reduceMotion: false,
    canUseBlur: true,
    isLowEndDevice: false,
  });

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device capabilities
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 2;
    const isLowEnd = cores <= 2 || memory <= 2;
    
    // Check if device can support blur effects
    const canUseBlur = !isLowEnd;
    
    setCapabilities({
      canAnimateDotGrid: !isLowEnd && !prefersReducedMotion,
      canAnimateIcons: !prefersReducedMotion,
      reduceMotion: prefersReducedMotion,
      canUseBlur,
      isLowEndDevice: isLowEnd,
    });

    // Listen for preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setCapabilities(prev => ({
        ...prev,
        reduceMotion: mediaQuery.matches,
        canAnimateDotGrid: !isLowEnd && !mediaQuery.matches,
        canAnimateIcons: !mediaQuery.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return capabilities;
}
