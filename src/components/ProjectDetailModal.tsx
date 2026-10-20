import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Layers, Monitor } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [visualTab, setVisualTab] = useState<'schematic' | 'screenshot'>('schematic');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141413]/70 backdrop-blur-[2px] overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-[#FAF6EE] border-2 border-[#141413] shadow-[8px_8px_0px_#141413] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#FAF6EE] border-b-2 border-[#141413]">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-bold text-[#141413]">ARCHITECTURE DOSSIER</span>
            <span className="text-[#141413]/40" aria-hidden="true">/</span>
            <span className="text-[#F04828] font-bold">{project.status}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-[#141413] bg-white hover:bg-[#D7FF3F] text-[#141413] transition-colors"
            aria-label="Close dossier modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Core Purpose */}
          <div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold font-display text-[#141413] mb-2">
              {project.title}
            </h2>
            <p className="text-base text-[#141413]/85 leading-relaxed font-medium">
              {project.headline}
            </p>
          </div>

          {/* Visual Asset Section: Schematic Blueprint vs Simulated UI Screenshot */}
          {(project.schematicImage || project.screenshotImage) && (
            <div className="border-2 border-[#141413] bg-white p-3.5 shadow-[4px_4px_0px_#141413]">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2.5 pb-2 border-b border-[#141413]/20">
                <span className="font-bold text-[#141413]">VISUAL VERIFICATION ASSET</span>
                
                {project.schematicImage && project.screenshotImage && (
                  <div className="flex items-center border border-[#141413] bg-[#FAF6EE] divide-x divide-[#141413]">
                    <button
                      type="button"
                      onClick={() => setVisualTab('schematic')}
                      className={`px-2 py-0.5 text-[11px] font-mono transition-colors ${
                        visualTab === 'schematic'
                          ? 'bg-[#141413] text-[#FAF6EE] font-bold'
                          : 'text-[#141413] hover:bg-[#D7FF3F]'
                      }`}
                    >
                      Blueprint Diagram
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisualTab('screenshot')}
                      className={`px-2 py-0.5 text-[11px] font-mono transition-colors ${
                        visualTab === 'screenshot'
                          ? 'bg-[#141413] text-[#FAF6EE] font-bold'
                          : 'text-[#141413] hover:bg-[#D7FF3F]'
                      }`}
                    >
                      Simulated UI Screenshot
                    </button>
                  </div>
                )}
              </div>

              {visualTab === 'schematic' && project.schematicImage && (
                <div>
                  <img
                    src={project.schematicImage}
                    alt={project.title + ' technical schematic'}
                    className="w-full h-auto object-contain border border-[#141413]/30 max-h-[460px] mx-auto"
                  />
                  {project.schematicCaption && (
                    <p className="text-xs font-mono text-[#141413]/70 mt-2.5 px-1 leading-snug">
                      {project.schematicCaption}
                    </p>
                  )}
                </div>
              )}

              {visualTab === 'screenshot' && project.screenshotImage && (
                <div>
                  <img
                    src={project.screenshotImage}
                    alt={project.title + ' simulated desktop window'}
                    className="w-full h-auto object-contain border border-[#141413]/30 max-h-[460px] mx-auto"
                  />
                  {project.screenshotCaption && (
                    <p className="text-xs font-mono text-[#141413]/70 mt-2.5 px-1 leading-snug">
                      {project.screenshotCaption}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Problem & Motivation */}
          <div className="border-l-3 border-[#141413] pl-4 py-1">
            <h3 className="text-xs font-mono font-bold text-[#141413] uppercase tracking-wider mb-1.5">
              Motivation & Problem Statement
            </h3>
            <p className="text-sm text-[#141413]/85 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* What Was Actually Built */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#141413] uppercase tracking-wider mb-2">
              System Implementation
            </h3>
            <p className="text-sm text-[#141413]/85 leading-relaxed">
              {project.whatWasBuilt}
            </p>
          </div>

          {/* Technical Decisions */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#141413] uppercase tracking-wider mb-3">
              Important Technical Decisions & Rationale
            </h3>
            <ul className="space-y-2.5 text-sm">
              {project.technicalDecisions.map((decision, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[#141413]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#141413] shrink-0 mt-0.5" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Blocks */}
          {project.architectureDetails.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-bold text-[#141413] uppercase tracking-wider mb-3">
                Subsystem Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architectureDetails.map((detail, idx) => (
                  <div key={idx} className="p-3.5 border-2 border-[#141413] bg-white">
                    <span className="text-xs font-mono font-bold text-[#141413] block mb-1">
                      {detail.label}
                    </span>
                    <p className="text-xs text-[#141413]/80 leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Trade-offs */}
          <div className="p-4 border-2 border-[#141413] bg-[#FFF8EB]">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold text-[#141413]">
              <AlertTriangle className="w-4 h-4 text-[#F04828]" />
              <span>CHALLENGES & LESSONS LEARNED</span>
            </div>
            <p className="text-xs sm:text-sm text-[#141413]/90 leading-relaxed">
              {project.tradeoffsAndLessons}
            </p>
          </div>

          {/* Technologies Used (Zero-Pill: Clean text list) */}
          <div className="pt-2">
            <span className="text-xs font-mono font-bold text-[#141413] block mb-2">
              VERIFIED TECHNOLOGIES
            </span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#141413]/80">
              {project.stack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < project.stack.length - 1 && <span className="text-[#141413]/40">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#FAF6EE] border-t-2 border-[#141413]">
          <span className="text-xs font-mono text-[#141413]/60">
            {project.statusNote}
          </span>

          <div className="flex items-center gap-2.5">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn px-4 py-2 text-xs font-bold flex items-center gap-1.5 text-[#141413]"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#141413]/60" />
              </a>
            )}

            <button
              onClick={onClose}
              className="neo-btn-primary px-4 py-2 text-xs font-bold"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
