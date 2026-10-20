import React from 'react';
import { ArrowDown, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeSpecimen } from './ThreeSpecimen';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full border-b-2 border-[#141413] bg-[#F4EFE6] bg-grid-notebook">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
        {/* Split Grid: Left Editorial Typography, Right 3D Specimen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 7 columns on desktop */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Editorial Subtitle Marker */}
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-4 tracking-tight">
                <span className="font-bold text-[#141413]">NOTEBOOK 01</span>
                <span aria-hidden="true">·</span>
                <span>KOKRAJHAR, INDIA</span>
                <span aria-hidden="true">·</span>
                <span>CS & ENGINEERING</span>
              </div>

              {/* Oversized Headline with Balanced Wrap */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold font-display tracking-tight text-[#141413] leading-[1.08] mb-6 text-balance">
                I build software, test ideas, and learn by making.
              </h1>

              {/* Grounded Bio & Positioning */}
              <p className="text-base sm:text-lg text-[#141413]/85 leading-relaxed max-w-2xl mb-8">
                Computer Science and Engineering student focused on applied computer vision, optical data streams, and systems programming. I write code to understand the layers beneath abstractions—from camera pixel buffers to low-level socket multiplexing.
              </p>
            </div>

            <div>
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <a
                  href="#projects"
                  className="neo-btn-primary px-5 py-2.5 text-sm font-bold flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Explore Projects</span>
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn px-4 py-2.5 text-sm font-semibold flex items-center gap-2 whitespace-nowrap text-[#141413]"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub (@dhanjit97)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#141413]/50" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn px-4 py-2.5 text-sm font-semibold flex items-center gap-2 whitespace-nowrap text-[#141413]"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#141413]/50" />
                </a>
              </div>

              {/* Zero-Pill Verified Metadata Strip */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#141413]/70 font-mono pt-4 border-t border-[#141413]/20">
                <span className="font-semibold text-[#141413]">Dhanjit Boro</span>
                <span aria-hidden="true">·</span>
                <span>14 Public Repositories</span>
                <span aria-hidden="true">·</span>
                <span>Open for Collaborative Roles</span>
                <span aria-hidden="true">·</span>
                <span>Verified Public Work</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 columns holding the 3D Specimen */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ThreeSpecimen />
          </div>
        </div>

        {/* Full-Width Telemetry & Principles Strip Below Hero */}
        <div className="mt-12 pt-8 border-t-2 border-[#141413] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-l-2 border-[#141413] pl-3">
            <span className="text-xs font-mono font-bold text-[#141413]">01 / OPTICAL PIPELINES</span>
            <p className="text-xs text-[#141413]/80 mt-1 leading-snug">
              Air-gapped data transmission via synchronized visual QR code bitstreams.
            </p>
          </div>
          <div className="border-l-2 border-[#141413] pl-3">
            <span className="text-xs font-mono font-bold text-[#141413]">02 / 1D DEEP CONVNETS</span>
            <p className="text-xs text-[#141413]/80 mt-1 leading-snug">
              Multi-scale convolutional text classification with local tensor inference.
            </p>
          </div>
          <div className="border-l-2 border-[#141413] pl-3">
            <span className="text-xs font-mono font-bold text-[#141413]">03 / SYSTEMS & DESKTOP</span>
            <p className="text-xs text-[#141413]/80 mt-1 leading-snug">
              C++, Rust concepts, Linux networking, and responsive CustomTkinter tooling.
            </p>
          </div>
          <div className="border-l-2 border-[#141413] pl-3">
            <span className="text-xs font-mono font-bold text-[#141413]">04 / ZERO-HYPE EVIDENCE</span>
            <p className="text-xs text-[#141413]/80 mt-1 leading-snug">
              Every project grounded in public repositories and inspected codebases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
