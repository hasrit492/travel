import React, { useEffect, useState } from 'react';

interface RahhalaLogoProps {
  onAnimationComplete?: () => void;
  className?: string;
  animate?: boolean;
}

export const RahhalaLogo: React.FC<RahhalaLogoProps> = ({ onAnimationComplete, className = "", animate = true }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!animate) {
      setStage(4);
      return;
    }

    // Sequencing the animation steps
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    // Stage 1: Circle draw
    timers.push(setTimeout(() => setStage(1), 100));
    
    // Stage 2: Background fill
    timers.push(setTimeout(() => setStage(2), 1200));
    
    // Stage 3: Compass appear & spin
    timers.push(setTimeout(() => setStage(3), 2000));
    
    // Stage 4: Plane orbit start & Text
    timers.push(setTimeout(() => {
      setStage(4);
      if (onAnimationComplete) onAnimationComplete();
    }, 3000));

    return () => timers.forEach(clearTimeout);
  }, [animate, onAnimationComplete]);

  const isVisible = (minStage: number) => stage >= minStage;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      
      {/* Main Logo Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        
        {/* SVG Drawing Layer */}
        <svg 
          viewBox="0 0 400 400" 
          className="absolute inset-0 w-full h-full drop-shadow-xl"
          style={{ overflow: 'visible' }}
        >
          {/* Defs for gradients/masks */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#537C88" />
              <stop offset="100%" stopColor="#C76F50" />
            </linearGradient>
            <filter id="roughPaper">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2">
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
              <feComposite operator="in" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* 1. Outer Ring - Green */}
          <circle 
            cx="200" 
            cy="200" 
            r="180" 
            stroke="#2E4A35" 
            strokeWidth="15" 
            fill="none"
            className={`${isVisible(1) ? 'path-draw' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s' }}
          />
           <circle 
            cx="200" 
            cy="200" 
            r="165" 
            stroke="#F4F4EB" 
            strokeWidth="4" 
            fill="none"
            className={`${isVisible(1) ? 'path-draw' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s', transition: 'opacity 0.5s' }}
          />

          {/* 2. Inner Planet Background (Split) */}
          <g 
            className={`transition-all duration-1000 ease-out transform origin-center ${isVisible(2) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          >
            {/* Top Left - Blue/Teal */}
            <path d="M 200 40 A 160 160 0 0 0 40 200 L 200 200 Z" fill="#537C88" />
            {/* Bottom Right - Orange/Terracotta */}
            <path d="M 200 40 A 160 160 0 0 1 360 200 L 200 200 Z" fill="#C76F50" />
            <path d="M 40 200 A 160 160 0 0 0 200 360 L 200 200 Z" fill="#C76F50" />
            <path d="M 360 200 A 160 160 0 0 1 200 360 L 200 200 Z" fill="#537C88" />
            
            {/* Abstract Swoosh/Orbit Line on planet */}
            <path 
              d="M 60 200 Q 200 100 340 200" 
              fill="none" 
              stroke="#F4F4EB" 
              strokeWidth="3" 
              opacity="0.3"
            />
             <path 
              d="M 60 200 Q 200 300 340 200" 
              fill="none" 
              stroke="#F4F4EB" 
              strokeWidth="3" 
              opacity="0.3"
            />
          </g>

          {/* 3. Central Compass */}
          <g 
            className={`transition-all duration-1000 ease-out transform origin-center ${isVisible(3) ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`}
          >
            {/* Compass Circle */}
            <circle cx="200" cy="200" r="60" fill="#F4F4EB" stroke="#2E4A35" strokeWidth="4" />
            
            {/* Compass Star */}
            <g className="origin-center animate-[spin_10s_linear_infinite]">
               {/* Main Points */}
               <path d="M 200 150 L 215 185 L 250 200 L 215 215 L 200 250 L 185 215 L 150 200 L 185 185 Z" fill="#2E4A35" />
               {/* Inner Details */}
               <circle cx="200" cy="200" r="5" fill="#C76F50" />
            </g>
            
            {/* N/S/E/W Text - Static relative to outer circle */}
            <text x="200" y="145" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2E4A35" className="font-cairo">N</text>
            <text x="200" y="265" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2E4A35" className="font-cairo">S</text>
            <text x="265" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2E4A35" className="font-cairo">E</text>
            <text x="135" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2E4A35" className="font-cairo">W</text>
          </g>

        </svg>

        {/* 4. Orbiting Paper Plane (CSS Animation overlay) */}
        {isVisible(4) && (
          <div className="orbit-container pointer-events-none">
            {/* The plane needs to rotate to face tangent of circle. 
                Parent spins right. Child needs to orient correctly. 
            */}
            <div className="planet-object" style={{ transform: 'rotate(90deg)' }}> 
               {/* Paper Plane SVG */}
               <svg viewBox="0 0 24 24" className="w-12 h-12 text-rahhala-cream drop-shadow-md" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }}>
                 <path fill="currentColor" d="M2 12l20-9-9 20-2-8-9-3z" />
               </svg>
            </div>
          </div>
        )}
      </div>

      {/* Brand Name Text */}
      <div className={`mt-8 text-center transition-all duration-1000 transform ${isVisible(4) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="font-amiri font-bold text-6xl md:text-8xl text-rahhala-green mb-2 tracking-wide drop-shadow-sm">
          رحـالــة
        </h1>
        <p className="font-cairo text-rahhala-orange tracking-[0.3em] uppercase text-sm md:text-base font-bold">
          Rahhala • The Explorer
        </p>
      </div>

    </div>
  );
};