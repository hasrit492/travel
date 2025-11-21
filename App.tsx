import React, { useState } from 'react';
import { RahhalaLogo } from './components/RahhalaLogo';
import { TravelAssistant } from './components/TravelAssistant';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-rahhala-cream relative overflow-hidden">
      
      {/* Background Texture/Noise for Vintage Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
      }}></div>

      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-rahhala-green/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-rahhala-orange/5 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      <main className="z-10 w-full flex flex-col items-center justify-center p-4">
        
        {/* Logo Section */}
        <div className={`transition-all duration-1000 ease-in-out transform ${introFinished ? 'scale-75 -translate-y-8' : 'scale-100'}`}>
          <RahhalaLogo onAnimationComplete={() => setIntroFinished(true)} />
        </div>

        {/* AI Assistant Section - Appears after logo intro */}
        <div className={`transition-all duration-1000 delay-500 w-full ${introFinished ? 'opacity-100 translate-y-0 max-h-[600px]' : 'opacity-0 translate-y-12 max-h-0 overflow-hidden'}`}>
           {introFinished && <TravelAssistant />}
        </div>
        
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center opacity-40 text-rahhala-dark text-xs font-cairo">
        © {new Date().getFullYear()} Rahhala AI • Explore the Unseen
      </footer>
    </div>
  );
}

export default App;
