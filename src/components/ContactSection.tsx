import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-24 border-b-2 border-[#141413] bg-[#F4EFE6] bg-grid-notebook">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-3 px-3 py-1 border border-[#141413] bg-white shadow-[2px_2px_0px_#141413]">
          <span className="font-bold text-[#141413]">INDEX 06</span>
          <span aria-hidden="true">/</span>
          <span>DISCUSS PROJECTS OR COLLABORATION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-display text-[#141413] tracking-tight mb-4">
          Let’s Build Something Solid.
        </h2>

        <p className="text-base sm:text-lg text-[#141413]/80 leading-relaxed max-w-xl mx-auto mb-10">
          I am always keen to discuss computer vision pipelines, systems architecture, open-source utilities, and engineering internships. Reach out directly.
        </p>

        {/* Tactile Contact Card */}
        <div className="neo-card p-6 sm:p-8 bg-white max-w-2xl mx-auto text-left mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#141413]">
            <div>
              <span className="text-xs font-mono text-[#141413]/60 block mb-1">
                PRIMARY EMAIL
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base sm:text-xl font-mono font-bold text-[#141413] hover:text-[#F04828] transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="neo-btn px-3 py-2 text-xs font-bold flex items-center gap-1.5 text-[#141413]"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#141413]" />
                    <span className="text-[#141413]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="neo-btn-primary px-3.5 py-2 text-xs font-bold flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Compose</span>
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 border-2 border-[#141413] bg-[#FAF6EE] hover:bg-[#D7FF3F] hover-tilt-left transition-all flex items-center justify-between group shadow-[3px_3px_0px_#141413] hover:shadow-[5px_5px_0px_#141413]"
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-5 h-5 text-[#141413] group-hover:rotate-12 transition-transform" />
                <div>
                  <span className="text-xs font-mono font-bold text-[#141413] block">
                    GitHub / dhanjit97
                  </span>
                  <span className="text-[11px] text-[#141413]/70 font-mono">
                    14 Public Repositories
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#141413] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 border-2 border-[#141413] bg-[#FAF6EE] hover:bg-[#D7FF3F] hover-tilt-right transition-all flex items-center justify-between group shadow-[3px_3px_0px_#141413] hover:shadow-[5px_5px_0px_#141413]"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:rotate-12 transition-transform" />
                <div>
                  <span className="text-xs font-mono font-bold text-[#141413] block">
                    LinkedIn / Dhanjit Boro
                  </span>
                  <span className="text-[11px] text-[#141413]/70 font-mono">
                    Professional Network
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#141413] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
