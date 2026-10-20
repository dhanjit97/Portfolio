import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#FAF6EE] border-t-2 border-[#141413] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#141413]/20">
          <div>
            <span className="text-base font-bold font-display text-[#141413] block">
              Dhanjit Boro
            </span>
            <p className="text-xs font-mono text-[#141413]/70 mt-1">
              Computer Science & Engineering Student · Kokrajhar, India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono font-medium text-[#141413]">
            <a href="#projects" className="hover:text-[#F04828] transition-colors">
              Projects
            </a>
            <a href="#technical-focus" className="hover:text-[#F04828] transition-colors">
              Focus Areas
            </a>
            <a href="#field-notes" className="hover:text-[#F04828] transition-colors">
              Field Notes
            </a>
            <a href="#about" className="hover:text-[#F04828] transition-colors">
              About
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F04828] transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={scrollToTop}
              className="p-1.5 border border-[#141413] bg-white hover:bg-[#D7FF3F] text-[#141413] transition-colors flex items-center gap-1"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#141413]/60">
          <span>
            © {new Date().getFullYear()} Dhanjit Boro. Neo-brutalist engineering portfolio.
          </span>
          <span>
            Built with React, TypeScript & Three.js · Zero-pill layout
          </span>
        </div>
      </div>
    </footer>
  );
};
