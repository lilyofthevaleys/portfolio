import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FlipWords } from './FlipWords';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'backspacing' | 'flipwords'>('typing');
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const fullText = 'CHARLENE ATHENA';
  const roles = [
    'full-stack engineer',
    'DevOps engineer',
    'automation developer',
    'ui/ux designer',
    'project manager',
    'qa tester',
    'student',
  ];

  useEffect(() => {
    // Phase 1: Type "CHARLENE ATHENA"
    if (phase === 'typing') {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Wait a bit, then start backspacing
          setTimeout(() => setPhase('backspacing'), 200);
        }
      }, 60);
      return () => clearInterval(typingInterval);
    }

    // Phase 2: Backspace
    if (phase === 'backspacing') {
      let currentIndex = fullText.length;
      const backspaceInterval = setInterval(() => {
        if (currentIndex > 0) {
          setDisplayedText(fullText.substring(0, currentIndex - 1));
          currentIndex--;
        } else {
          clearInterval(backspaceInterval);
          // Start FlipWords phase
          setTimeout(() => setPhase('flipwords'), 150);
        }
      }, 25);
      return () => clearInterval(backspaceInterval);
    }
  }, [phase]);

  const handleFlipWordsCycleComplete = () => {
    // Trigger iris wipe after one full cycle through all roles
    if (loaderRef.current) {
      gsap.to(loaderRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          onLoadComplete();
        }
      });
    }
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: '#0f0a1a',
        clipPath: 'circle(150% at 50% 50%)'
      }}
    >
      <div className="relative flex items-center justify-center">
        {phase === 'flipwords' ? (
          <h1
            className="text-4xl md:text-6xl font-light"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              color: '#c4a8ff',
            }}
          >
            I'm a{' '}
            <span style={{
              color: '#f472b6',
              fontSize: 'inherit',
              fontWeight: 600,
            }}>
              <FlipWords
                words={roles}
                duration={800}
                onCycleComplete={handleFlipWordsCycleComplete}
              />
            </span>
          </h1>
        ) : (
          <h1
            className="text-4xl md:text-6xl tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 200,
              color: '#c4a8ff',
              letterSpacing: '0.3em'
            }}
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>
        )}
      </div>
    </div>
  );
}
