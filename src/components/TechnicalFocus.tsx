import React from 'react';
import { TECHNICAL_PILLARS } from '../data/portfolioData';
import { Cpu, Eye, Terminal, Layout } from 'lucide-react';

const ICONS = [Eye, Cpu, Terminal, Layout];

export const TechnicalFocus: React.FC = () => {
  return (
    <section id="technical-focus" className="w-full py-16 sm:py-20 border-b-2 border-[#141413] bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-2">
            <span className="font-bold text-[#141413]">INDEX 03</span>
            <span aria-hidden="true">/</span>
            <span>DOMAINS OF CURIOSITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#141413] tracking-tight mb-3">
            Technical Focus & Core Inquiries
          </h2>
          <p className="text-sm sm:text-base text-[#141413]/80 leading-relaxed">
            I gravitate toward systems that interface directly with sensors, memory, or optical channels. Rather than treating frameworks as magic black boxes, I write code to verify how signals and data flow.
          </p>
        </div>

        {/* 2x2 Neo-Brutalist Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TECHNICAL_PILLARS.map((pillar, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={pillar.number}
                className="neo-card hover-lift p-6 sm:p-8 bg-white flex flex-col justify-between group cursor-default"
              >
                <div>
                  {/* Card Index & Icon */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#141413]">
                    <span className="text-xs font-mono font-bold text-[#141413] group-hover:text-[#F04828] transition-colors">
                      PILLAR {pillar.number}
                    </span>
                    <div className="p-1.5 border border-[#141413] bg-[#D7FF3F] group-hover:rotate-12 group-hover:scale-110 transition-transform shadow-[2px_2px_0px_#141413]">
                      <Icon className="w-4 h-4 text-[#141413]" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#141413] mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#141413]/85 leading-relaxed mb-5">
                    {pillar.summary}
                  </p>

                  {/* Subtopics (Unboxed text with dots) */}
                  <div className="mb-6">
                    <span className="text-xs font-mono font-bold text-[#141413] block mb-2 uppercase">
                      Areas Explored
                    </span>
                    <ul className="space-y-1.5 text-xs font-mono text-[#141413]/80">
                      {pillar.subtopics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#141413]" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical application note */}
                <div className="pt-4 border-t border-[#141413]/20">
                  <span className="text-[11px] font-mono font-bold text-[#F04828] block mb-0.5 uppercase">
                    Direct Application:
                  </span>
                  <p className="text-xs text-[#141413]/85 leading-snug">
                    {pillar.practicalApplication}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
