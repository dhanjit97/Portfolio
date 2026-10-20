import React, { useState } from 'react';
import { FIELD_NOTES } from '../data/portfolioData';
import { Beaker, ChevronDown, ChevronUp, Terminal, Cpu, Network, ShoppingBag, GitBranch, ArrowRight, Lightbulb } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'cv-attendance': Cpu,
  'cpp-qt': Terminal,
  'rust-p2p': Network,
  'commoncart': ShoppingBag,
};

export const FieldNotes: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="field-notes" className="w-full py-16 sm:py-20 lg:py-24 border-b-2 border-[#141413] bg-[#F4EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Standardized Spacing & Typographic Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b-2 border-[#141413]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-2">
              <span className="font-bold text-[#141413]">INDEX 04</span>
              <span aria-hidden="true">/</span>
              <span>IN-PROGRESS EXPERIMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#141413] tracking-tight text-balance">
              Field Notes & Works in Progress
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#141413]/80 font-mono max-w-xl leading-relaxed">
            Active inquiries currently on the engineering workbench. Explicitly documented as works in progress and exploratory prototypes, not claims of finished or production releases.
          </p>
        </div>

        {/* 2-Column Standardized Grid: Balanced Gaps and Mobile-Friendly Padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {FIELD_NOTES.map((note, idx) => {
            const Icon = CATEGORY_ICONS[note.id] || Beaker;
            const isExpanded = expandedId === note.id;
            const contentId = `field-note-details-${note.id}`;

            return (
              <article
                key={note.id}
                className={`neo-card p-6 sm:p-8 flex flex-col justify-between h-full bg-[#FAF6EE] group cursor-default transition-all duration-200 ${
                  idx % 2 === 0 ? 'hover-tilt-left' : 'hover-tilt-right'
                }`}
              >
                <div>
                  {/* Status & Category Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-4 pb-3 border-b-2 border-[#141413]/20">
                    <div className="flex items-center gap-2">
                      <div className="p-1 border border-[#141413] bg-[#D7FF3F] shadow-[1px_1px_0px_#141413] flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-[#141413]" aria-hidden="true" />
                      </div>
                      <span className="font-bold text-[#F04828] uppercase tracking-wide">
                        {note.status}
                      </span>
                    </div>
                    <span className="text-[#141413]/70 font-medium">{note.category}</span>
                  </div>

                  {/* Topic Title with Expressive Line-Height */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#141413] mb-3 leading-snug group-hover:text-[#F04828] transition-colors text-balance">
                    {note.topic}
                  </h3>

                  {/* Readable Description with Clear Contrast & Line Height */}
                  <p className="text-sm sm:text-[15px] text-[#141413]/85 leading-relaxed mb-6">
                    {note.description}
                  </p>
                </div>

                {/* Technical Focus Block & Accessible Expansion Drawer */}
                <div className="pt-4 border-t-2 border-[#141413]/20">
                  <div className="p-3.5 border-2 border-[#141413] bg-white shadow-[2px_2px_0px_#141413] mb-4">
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-mono font-bold text-[#141413] uppercase tracking-wider">
                      <Lightbulb className="w-3.5 h-3.5 text-[#F04828]" />
                      <span>Technical Focus & Probing:</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-mono text-[#141413]/90 leading-relaxed">
                      {note.technicalFocus}
                    </p>
                  </div>

                  {/* Mobile-Friendly Accessible Toggle Button (Touch Target >= 44px) */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(note.id)}
                    className="w-full min-h-[44px] py-2.5 px-4 border-2 border-[#141413] bg-white hover:bg-[#D7FF3F] active:translate-x-[1px] active:translate-y-[1px] text-xs font-mono font-bold text-[#141413] transition-all flex items-center justify-between cursor-pointer shadow-[2px_2px_0px_#141413] hover:shadow-[3px_3px_0px_#141413]"
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                  >
                    <span className="flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-[#F04828]" />
                      <span>{isExpanded ? 'Collapse Investigation Context' : 'Expand Investigation Context'}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#141413] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#141413] shrink-0" />
                    )}
                  </button>

                  {/* Expandable Context Details */}
                  {isExpanded && (
                    <div
                      id={contentId}
                      className="mt-3 p-4 border-2 border-[#141413] bg-white text-xs font-mono text-[#141413]/90 leading-relaxed space-y-2.5 shadow-[2px_2px_0px_#141413] animate-in fade-in duration-150"
                    >
                      {note.hypothesis && (
                        <div>
                          <strong className="text-[#141413] uppercase tracking-wide block mb-0.5">
                            → Investigation Hypothesis:
                          </strong>
                          <p className="text-[#141413]/80">{note.hypothesis}</p>
                        </div>
                      )}
                      {note.approach && (
                        <div>
                          <strong className="text-[#141413] uppercase tracking-wide block mb-0.5">
                            → Implementation Approach:
                          </strong>
                          <p className="text-[#141413]/80">{note.approach}</p>
                        </div>
                      )}
                      {note.currentStatusNote && (
                        <div className="pt-2 border-t border-[#141413]/15">
                          <strong className="text-[#F04828] uppercase tracking-wide block mb-0.5">
                            → Workbench Status:
                          </strong>
                          <p className="text-[#141413]/80">{note.currentStatusNote}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
