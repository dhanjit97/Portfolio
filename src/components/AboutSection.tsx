import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, MapPin, BookOpen, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-16 sm:py-20 border-b-2 border-[#141413] bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 7 cols */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-2">
              <span className="font-bold text-[#141413]">INDEX 05</span>
              <span aria-hidden="true">/</span>
              <span>BACKGROUND & ETHOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#141413] tracking-tight mb-6">
              About Dhanjit Boro
            </h2>

            <div className="space-y-4 text-base text-[#141413]/85 leading-relaxed font-sans">
              <p>
                I am a Computer Science and Engineering student based in Kokrajhar. My technical interests sit at the intersection of computer vision, physical optical channels, and software architecture.
              </p>
              <p>
                Rather than relying solely on tutorials or third-party wrappers, I prefer building tools from scratch to see where they fail. Creating an optical QR file transfer pipeline like <strong className="text-[#141413] font-semibold">AetherLink</strong> taught me more about camera shutter speeds, perspective distortion, and frame drop recovery than any textbook could.
              </p>
              <p>
                I value software that is fast, transparent, and respectful of the machine. Whether it is tuning 1D convolutional layers for spam classification or writing streaming disk buffers in Python for combinatorial generation, I care about why systems behave the way they do.
              </p>
            </div>

            {/* Principles */}
            <div className="mt-8 pt-6 border-t-2 border-[#141413]">
              <h3 className="text-xs font-mono font-bold text-[#141413] uppercase tracking-wider mb-4">
                Working Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border-2 border-[#141413] bg-white p-3.5 shadow-[3px_3px_0px_#141413] hover-tilt-left transition-all cursor-default">
                  <span className="text-xs font-mono font-bold text-[#141413] block mb-1">
                    01. Code as Probe
                  </span>
                  <p className="text-xs text-[#141413]/80 leading-normal">
                    Build a working proof-of-concept early to reveal true operational boundaries.
                  </p>
                </div>
                <div className="border-2 border-[#141413] bg-white p-3.5 shadow-[3px_3px_0px_#141413] hover-lift transition-all cursor-default">
                  <span className="text-xs font-mono font-bold text-[#141413] block mb-1">
                    02. Mechanical Sympathy
                  </span>
                  <p className="text-xs text-[#141413]/80 leading-normal">
                    Respect memory, CPU cycles, and network latency over bloated dependencies.
                  </p>
                </div>
                <div className="border-2 border-[#141413] bg-white p-3.5 shadow-[3px_3px_0px_#141413] hover-tilt-right transition-all cursor-default">
                  <span className="text-xs font-mono font-bold text-[#141413] block mb-1">
                    03. Clear Evidence
                  </span>
                  <p className="text-xs text-[#141413]/80 leading-normal">
                    Never inflate claims; show real repositories, constraints, and trade-offs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 5 cols Facts Card */}
          <div className="lg:col-span-5">
            <div className="neo-card hover-lift p-6 sm:p-7 bg-white group">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#141413]">
                <span className="text-xs font-mono font-bold text-[#141413]">
                  DOSSIER & QUICK METRICS
                </span>
                <span className="text-xs font-mono text-[#F04828] font-bold">
                  VERIFIED
                </span>
              </div>

              <dl className="space-y-4 text-xs font-mono divide-y divide-[#141413]/15">
                <div className="pt-2 flex justify-between items-center">
                  <dt className="text-[#141413]/60">Full Name</dt>
                  <dd className="font-bold text-[#141413]">{PERSONAL_INFO.name}</dd>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <dt className="text-[#141413]/60">Discipline</dt>
                  <dd className="font-bold text-[#141413] text-right">Computer Science & Engineering</dd>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <dt className="text-[#141413]/60">Location</dt>
                  <dd className="font-bold text-[#141413] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F04828]" />
                    <span>{PERSONAL_INFO.location}</span>
                  </dd>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <dt className="text-[#141413]/60">Public Repositories</dt>
                  <dd className="font-bold text-[#141413]">{PERSONAL_INFO.publicReposCount} Repos on GitHub</dd>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <dt className="text-[#141413]/60">Primary Language Base</dt>
                  <dd className="font-bold text-[#141413]">Python, TypeScript, C/C++</dd>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <dt className="text-[#141413]/60">Status</dt>
                  <dd className="font-bold text-[#141413] text-[#141413]">
                    Undergraduate / Engineering
                  </dd>
                </div>
              </dl>

              {/* Quote Block */}
              <div className="mt-6 p-4 border border-[#141413] bg-[#F4EFE6]">
                <p className="text-xs text-[#141413] font-mono leading-relaxed italic">
                  "{PERSONAL_INFO.positioning}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
