import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, Math.round(progress))));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top Striped Progress Bar */}
      <div className="w-full h-2 bg-[#141413]/20 border-b border-[#141413] relative overflow-hidden">
        <div
          className="h-full bg-[#D7FF3F] border-r-2 border-[#141413] transition-all duration-75 ease-out relative"
          style={{ width: `${scrollPercent}%` }}
        >
          {/* Animated diagonal hazard stripes */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, #141413, #141413 4px, transparent 4px, transparent 8px)',
              backgroundSize: '16px 16px',
            }}
          />
        </div>
      </div>

      {/* Floating Tactical Coordinate Badge moved to Bottom-Right corner */}
      <div className="fixed bottom-5 right-5 z-40 pointer-events-auto">
        <button
          type="button"
          onClick={scrollToTop}
          className={`px-3 py-1.5 bg-[#FAF6EE] border-2 border-[#141413] shadow-[3px_3px_0px_#141413] text-xs font-mono font-bold text-[#141413] hover:bg-[#D7FF3F] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#141413] active:translate-y-0.5 active:shadow-[1px_1px_0px_#141413] transition-all flex items-center gap-1.5 cursor-pointer ${
            scrollPercent > 2 ? 'opacity-100 translate-y-0' : 'opacity-70'
          }`}
          title="Click to jump to top"
        >
          <span>SCROLL:</span>
          <span className="w-9 text-right font-mono tabular-nums text-[#F04828]">
            {String(scrollPercent).padStart(3, '0')}%
          </span>
          <ArrowUp className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
