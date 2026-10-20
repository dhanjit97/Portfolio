import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4EFE6] border-b-2 border-[#141413]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tight text-[#141413] font-display whitespace-nowrap shrink-0 hover:text-[#F04828] transition-colors"
        >
          Dhanjit Boro
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-[#141413]">
          <a
            href="#projects"
            className="hover:text-[#F04828] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Projects
          </a>
          <a
            href="#technical-focus"
            className="hover:text-[#F04828] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Technical Focus
          </a>
          <a
            href="#field-notes"
            className="hover:text-[#F04828] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Field Notes
          </a>
          <a
            href="#about"
            className="hover:text-[#F04828] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="neo-btn-primary px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </header>
  );
};
