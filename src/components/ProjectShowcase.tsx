import React, { useState } from 'react';
import { ArrowUpRight, Github, ArrowRight, Layers, Monitor, FileText, Binary, Calendar, Cpu } from 'lucide-react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { VisualAssetGenerator } from './VisualAssetGenerator';
import { ProjectVisuals } from './ProjectVisuals';

export const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [featuredAssetView, setFeaturedAssetView] = useState<'schematic' | 'screenshot'>('schematic');
  const [visualCoreMode, setVisualCoreMode] = useState<'canvas' | 'simulator'>('canvas');

  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const secondaryProjects = PROJECTS.filter((p) => p.id !== featuredProject.id);

  return (
    <section id="projects" className="w-full py-16 sm:py-20 lg:py-24 border-b-2 border-[#141413] bg-[#F4EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Standardized Spacing & Typographic Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b-2 border-[#141413]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-2">
              <span className="font-bold text-[#141413]">INDEX 02</span>
              <span aria-hidden="true">/</span>
              <span>SELECTED ENGINEERING WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#141413] tracking-tight text-balance">
              Verified Code & Systems
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#141413]/80 font-mono max-w-xl leading-relaxed">
            Four selected projects from 14 public repositories. Each entry communicates problem motivation, verified implementation, and architecture trade-offs.
          </p>
        </div>

        {/* 01. Featured Project: AetherLink (Wide Editorial Spread) */}
        <div className="mb-14 sm:mb-18">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#141413]/70 mb-4 uppercase tracking-wider">
            <span>01 // FEATURED PROTOTYPE</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#F04828]">AIR-GAPPED OPTICAL DATA TRANSFER</span>
          </div>

          <div className="neo-card hover-lift p-6 sm:p-8 lg:p-10 bg-white group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left 7 cols: Content */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Unboxed Metadata Header */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono mb-3.5">
                    <span className="font-bold text-[#F04828] group-hover:scale-105 transition-transform inline-block">
                      {featuredProject.status}
                    </span>
                    <span className="text-[#141413]/40" aria-hidden="true">·</span>
                    <span className="text-[#141413]/70 font-medium">PINNED REPOSITORY</span>
                    <span className="text-[#141413]/40" aria-hidden="true">·</span>
                    <span className="text-[#141413]/70 font-medium">{featuredProject.shortName}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#141413] mb-3 group-hover:text-[#F04828] transition-colors leading-tight text-balance">
                    {featuredProject.title}
                  </h3>

                  {/* Core Purpose Kicker */}
                  <p className="text-base sm:text-lg text-[#141413] font-semibold mb-4 leading-relaxed max-w-2xl">
                    {featuredProject.headline}
                  </p>

                  {/* Implementation Description */}
                  <p className="text-sm sm:text-[15px] text-[#141413]/85 leading-relaxed mb-6 max-w-2xl">
                    {featuredProject.whatWasBuilt}
                  </p>

                  {/* Key Decisions Block */}
                  <div className="space-y-2.5 mb-6 border-l-3 border-[#141413] pl-4 py-2 bg-[#FAF6EE]/80">
                    <span className="text-xs font-mono font-bold text-[#141413] block uppercase tracking-wider mb-1">
                      Key Technical Choices:
                    </span>
                    {featuredProject.technicalDecisions.slice(0, 2).map((decision, i) => (
                      <p key={i} className="text-xs sm:text-sm text-[#141413]/85 leading-relaxed">
                        <strong className="text-[#141413] font-semibold">→</strong> {decision}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech stack line (No pills, clean typographic text) */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-mono text-[#141413]/75 mb-6 pt-3.5 border-t border-[#141413]/15">
                    <span className="font-bold text-[#141413]">STACK:</span>
                    {featuredProject.stack.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span className="font-medium text-[#141413]">{t}</span>
                        {idx < featuredProject.stack.length - 1 && (
                          <span className="text-[#141413]/40">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Action Buttons: Standardized Mobile Touch Targets (>= 44px) */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(featuredProject)}
                      className="neo-btn-primary min-h-[44px] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#141413] hover:shadow-[4px_4px_0px_#141413]"
                    >
                      <span>Inspect Architecture & Decisions</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {featuredProject.repoUrl && (
                      <a
                        href={featuredProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-btn min-h-[44px] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 text-[#141413] whitespace-nowrap shadow-[2px_2px_0px_#141413] hover:shadow-[4px_4px_0px_#141413]"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub Source</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Visual Asset Preview with Tab Switcher */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="border-2 border-[#141413] bg-[#FAF6EE] p-4 shadow-[4px_4px_0px_#141413] hover:shadow-[6px_6px_0px_#141413] transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#141413]/70 mb-3 border-b border-[#141413]/20 pb-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setFeaturedAssetView('schematic')}
                        className={`min-h-[38px] px-2.5 py-1.5 border border-[#141413] text-xs font-bold transition-colors cursor-pointer ${
                          featuredAssetView === 'schematic'
                            ? 'bg-[#141413] text-[#FAF6EE]'
                            : 'bg-white text-[#141413] hover:bg-[#D7FF3F]'
                        }`}
                      >
                        Blueprint
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeaturedAssetView('screenshot')}
                        className={`min-h-[38px] px-2.5 py-1.5 border border-[#141413] text-xs font-bold transition-colors cursor-pointer ${
                          featuredAssetView === 'screenshot'
                            ? 'bg-[#141413] text-[#FAF6EE]'
                            : 'bg-white text-[#141413] hover:bg-[#D7FF3F]'
                        }`}
                      >
                        UI Screenshot
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(featuredProject)}
                      className="min-h-[38px] px-2 py-1.5 hover:text-[#F04828] font-bold flex items-center gap-1 transition-colors text-xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Dossier</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  {featuredAssetView === 'schematic' && featuredProject.schematicImage && (
                    <div
                      className="cursor-pointer group neo-image-frame"
                      onClick={() => setSelectedProject(featuredProject)}
                      title="Click to view blueprint details"
                    >
                      <img
                        src={featuredProject.schematicImage}
                        alt="AetherLink Optical Pipeline Schematic"
                        className="w-full h-auto object-cover border border-[#141413]/30 group-hover:scale-[1.01] transition-transform"
                      />
                      <p className="text-xs font-mono text-[#141413]/75 mt-2.5 leading-snug">
                        Optical QR stream modulation, lens refraction, and CMOS bitstream reconstruction.
                      </p>
                    </div>
                  )}

                  {featuredAssetView === 'screenshot' && featuredProject.screenshotImage && (
                    <div
                      className="cursor-pointer group neo-image-frame"
                      onClick={() => setSelectedProject(featuredProject)}
                      title="Click to view simulated interface details"
                    >
                      <img
                        src={featuredProject.screenshotImage}
                        alt="AetherLink Simulated Desktop Interface"
                        className="w-full h-auto object-cover border border-[#141413]/30 group-hover:scale-[1.01] transition-transform"
                      />
                      <p className="text-xs font-mono text-[#141413]/75 mt-2.5 leading-snug">
                        High-frequency optical QR sender: frame sequence counter, telemetry buffer, and visual sync.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 02. Programmatic Visual Core: Unified Workbench with Mode Switcher */}
        <div className="mb-14 sm:mb-18">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#141413]/70 uppercase tracking-wider">
              <span>02 // PROGRAMMATIC VISUAL CORE</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F04828]">INTERACTIVE WORKBENCH</span>
            </div>

            {/* Visual Studio Mode Switcher */}
            <div className="flex items-center border-2 border-[#141413] bg-white p-1 shadow-[2px_2px_0px_#141413] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setVisualCoreMode('canvas')}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                  visualCoreMode === 'canvas'
                    ? 'bg-[#141413] text-[#FAF6EE] shadow-sm'
                    : 'text-[#141413] hover:bg-[#D7FF3F]'
                }`}
                aria-pressed={visualCoreMode === 'canvas'}
              >
                Canvas 2D Architecture
              </button>
              <button
                type="button"
                onClick={() => setVisualCoreMode('simulator')}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                  visualCoreMode === 'simulator'
                    ? 'bg-[#141413] text-[#FAF6EE] shadow-sm'
                    : 'text-[#141413] hover:bg-[#D7FF3F]'
                }`}
                aria-pressed={visualCoreMode === 'simulator'}
              >
                Telemetry & GUI Console
              </button>
            </div>
          </div>

          {/* Conditional Rendering of Selected Core Tool */}
          {visualCoreMode === 'canvas' ? (
            <div className="animate-in fade-in duration-150">
              <ProjectVisuals />
            </div>
          ) : (
            <div className="animate-in fade-in duration-150">
              <VisualAssetGenerator />
            </div>
          )}
        </div>

        {/* 03. Secondary Projects: Standardized 3-Column Grid */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#141413]/70 mb-4 uppercase tracking-wider">
            <span>03 // CODE SPECIMENS & UTILITIES</span>
            <span aria-hidden="true">·</span>
            <span>SHIPPED & PROTOTYPE REPOSITORIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {secondaryProjects.map((project, idx) => (
              <article
                key={project.id}
                className={`neo-card ${
                  idx % 2 === 0 ? 'hover-tilt-left' : 'hover-tilt-right'
                } p-6 sm:p-8 flex flex-col justify-between h-full bg-[#FAF6EE] group cursor-default transition-all duration-200 ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Meta Strip */}
                  <div className="flex items-center justify-between text-xs font-mono mb-3.5 pb-2.5 border-b border-[#141413]/20">
                    <span className="font-bold text-[#141413]">{project.status}</span>
                    <span className="text-[#141413]/60 font-medium">{project.shortName}</span>
                  </div>

                  {/* Standardized Architectural Diagram / Blueprint Header Frame */}
                  <div
                    className="mb-4 border-2 border-[#141413] bg-white p-2 shadow-[2px_2px_0px_#141413] cursor-pointer neo-image-frame group/frame"
                    onClick={() => setSelectedProject(project)}
                    title="Click to open architecture dossier"
                  >
                    {project.schematicImage ? (
                      <div className="overflow-hidden">
                        <img
                          src={project.schematicImage}
                          alt={project.title}
                          className="w-full h-36 object-cover object-top border border-[#141413]/20 group-hover/frame:scale-[1.02] transition-transform"
                        />
                        <span className="text-[11px] font-mono text-[#141413]/75 mt-1.5 block">
                          Blueprint: 1D-CNN Sequence Architecture
                        </span>
                      </div>
                    ) : project.id === 'wordlist-generator' ? (
                      <div className="w-full h-36 bg-[#FAF6EE] border border-[#141413]/20 p-3 flex flex-col justify-between font-mono text-xs">
                        <div className="flex items-center justify-between text-[10px] text-[#141413]/60 border-b border-[#141413]/10 pb-1">
                          <span className="font-bold text-[#141413]">STREAMING_PIPELINE.PY</span>
                          <span>MEM_CAP: 64KB</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-[#141413]/90">
                          <div className="flex items-center gap-1.5 text-[#141413]">
                            <Binary className="w-3.5 h-3.5 text-[#F04828]" />
                            <span className="font-bold">[Itertools Generator]</span>
                          </div>
                          <div className="text-[10px] text-[#141413]/60 pl-5">↓ Lazy Evaluation chunk</div>
                          <div className="flex items-center gap-1.5 text-[#141413]">
                            <span className="font-bold">[Buffered Disk Flush]</span>
                            <span className="text-[10px] text-[#F04828] font-bold">O(1) RAM</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#141413]/70 block pt-1 border-t border-[#141413]/10">
                          CustomTkinter GUI · Memory-Safe Flush
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-36 bg-[#FAF6EE] border border-[#141413]/20 p-3 flex flex-col justify-between font-mono text-xs">
                        <div className="flex items-center justify-between text-[10px] text-[#141413]/60 border-b border-[#141413]/10 pb-1">
                          <span className="font-bold text-[#141413]">LAB_ALLOCATION.CSV</span>
                          <span>STORAGE: FLAT_FILE</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-[#141413]/90">
                          <div className="flex items-center gap-1.5 text-[#141413]">
                            <Calendar className="w-3.5 h-3.5 text-[#F04828]" />
                            <span className="font-bold">[Slot Reservation]</span>
                          </div>
                          <div className="text-[10px] text-[#141413]/60 pl-5">↓ Interval overlap check</div>
                          <div className="flex items-center gap-1.5 text-[#141413]">
                            <span className="font-bold">[Structured CSV Store]</span>
                            <span className="text-[10px] text-[#F04828] font-bold">No SQL</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#141413]/70 block pt-1 border-t border-[#141413]/10">
                          Tkinter Interface · Form Validation
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#141413] mb-2.5 leading-snug group-hover:text-[#F04828] transition-colors text-balance">
                    {project.title}
                  </h3>

                  {/* Purpose Kicker */}
                  <p className="text-sm font-semibold text-[#141413] leading-relaxed mb-3">
                    {project.headline}
                  </p>

                  {/* Problem & Motivation */}
                  <p className="text-xs sm:text-[13px] text-[#141413]/85 leading-relaxed mb-4">
                    {project.problem}
                  </p>

                  {/* Key Decision Callout */}
                  <div className="border-l-2 border-[#141413] pl-3 py-1 bg-white/70 mb-4 text-xs font-mono text-[#141413]/85 leading-relaxed">
                    <strong className="text-[#141413]">Key Choice:</strong> {project.technicalDecisions[0]}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#141413]/20">
                  {/* Stack */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#141413]/75 mb-5">
                    {project.stack.map((t, sIdx) => (
                      <React.Fragment key={t}>
                        <span className="font-medium text-[#141413]">{t}</span>
                        {sIdx < project.stack.length - 1 && (
                          <span className="text-[#141413]/40">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Action Bar: Standardized Touch Targets >= 44px */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="neo-btn min-h-[44px] px-3.5 py-2 text-xs font-bold text-[#141413] hover:bg-[#D7FF3F] flex items-center gap-1.5 font-mono cursor-pointer shadow-[2px_2px_0px_#141413] hover:shadow-[3px_3px_0px_#141413]"
                    >
                      <span>Read Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[44px] min-h-[44px] border-2 border-[#141413] bg-white hover:bg-[#D7FF3F] text-[#141413] transition-colors flex items-center justify-center shadow-[2px_2px_0px_#141413] hover:shadow-[3px_3px_0px_#141413]"
                        title="Open GitHub repository"
                        aria-label={"Open GitHub repository for " + project.title}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Deep-dive Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
