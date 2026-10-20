import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import {
  Layers,
  Monitor,
  Cpu,
  Download,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Sparkles,
  Maximize2,
  FileCode,
} from 'lucide-react';

export const VisualAssetGenerator: React.FC = () => {
  // Target projects: AetherLink and Spam Classification
  const targetProjects = PROJECTS.filter(
    (p) => p.id === 'aetherlink' || p.id === 'spam-classification'
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string>('aetherlink');
  const [viewMode, setViewMode] = useState<'screenshot' | 'schematic' | 'interactive'>('interactive');

  // AetherLink Interactive State
  const [aetherFps, setAetherFps] = useState<number>(60);
  const [aetherChunkSize, setAetherChunkSize] = useState<number>(1024);
  const [aetherIsStreaming, setAetherIsStreaming] = useState<boolean>(true);
  const [aetherFrameSeq, setAetherFrameSeq] = useState<number>(142);
  const [aetherCrc, setAetherCrc] = useState<string>('0x9F42');

  // Spam Classification Interactive State
  const sampleMessages = [
    { text: 'URGENT: Claim your $5,000 gift certificate bonus immediately!', label: 'SPAM', confidence: 0.984 },
    { text: 'Meeting notes: let us review the camera distortion matrix tomorrow at 10 AM.', label: 'HAM', confidence: 0.012 },
    { text: 'Verification code: 849201. Do not share this token with anyone.', label: 'HAM', confidence: 0.085 },
    { text: 'Exclusive investment return guaranteed! Click here to deposit bitcoin.', label: 'SPAM', confidence: 0.991 },
  ];
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [customText, setCustomText] = useState<string>(sampleMessages[0].text);
  const [selectedModel, setSelectedModel] = useState<string>('Conv1D Stack (SpamNet-v2)');
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const activeProject = targetProjects.find((p) => p.id === selectedProjectId) || targetProjects[0];

  // AetherLink Live frame counter ticker
  useEffect(() => {
    if (!aetherIsStreaming || selectedProjectId !== 'aetherlink') return;
    const intervalTime = Math.max(16, Math.floor(1000 / aetherFps));
    const timer = setInterval(() => {
      setAetherFrameSeq((prev) => (prev >= 9999 ? 1 : prev + 1));
      const hex = Math.floor(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0');
      setAetherCrc(`0x${hex}`);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [aetherIsStreaming, aetherFps, selectedProjectId]);

  // Handle message classification simulation
  const handleClassify = (text: string) => {
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
    }, 250);
  };

  // Determine spam prediction based on text keywords
  const isCurrentSpam =
    customText.toLowerCase().includes('urgent') ||
    customText.toLowerCase().includes('free') ||
    customText.toLowerCase().includes('gift') ||
    customText.toLowerCase().includes('bitcoin') ||
    customText.toLowerCase().includes('winner') ||
    customText.toLowerCase().includes('bonus') ||
    customText.toLowerCase().includes('$');

  const currentConfidence = isCurrentSpam ? 0.978 : 0.024;

  const handleExportSnapshot = () => {
    // Generate snapshot representation
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2400);

    const activeImage =
      viewMode === 'screenshot'
        ? activeProject.screenshotImage
        : activeProject.schematicImage;

    if (activeImage) {
      const link = document.createElement('a');
      link.href = activeImage;
      link.download = `${activeProject.id}_${viewMode}_specimen.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="neo-card p-6 sm:p-8 bg-white border-2 border-[#141413] shadow-[4px_4px_0px_#141413] mb-12">
      {/* Component Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#141413]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-1.5">
            <span className="font-bold text-[#141413]">VISUAL SPECIMEN GENERATOR</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#F04828] font-bold">VERIFICATION ASSETS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#141413]">
            Project Visual Asset Studio & Simulator
          </h3>
          <p className="text-xs sm:text-sm text-[#141413]/80 font-mono mt-1">
            Interactive visual representations, blueprints, and UI screenshots replacing missing assets in project verification dossiers.
          </p>
        </div>

        {/* Project Selector Segmented Control */}
        <div className="flex items-center border-2 border-[#141413] bg-[#FAF6EE] p-1 divide-x-2 divide-[#141413] shrink-0">
          {targetProjects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`min-h-[40px] sm:min-h-[36px] px-3.5 sm:px-3 py-2 text-xs font-mono font-bold transition-colors cursor-pointer ${
                selectedProjectId === proj.id
                  ? 'bg-[#141413] text-[#FAF6EE]'
                  : 'text-[#141413] hover:bg-[#D7FF3F]'
              }`}
            >
              {proj.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-[#141413]/20 bg-[#FAF6EE] px-4 -mx-6 sm:-mx-8">
        {/* Visual Modes */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-[#141413]/60 mr-1 hidden sm:inline">REPRESENTATION:</span>
          <button
            onClick={() => setViewMode('interactive')}
            className={`min-h-[40px] sm:min-h-[32px] px-3 py-1.5 border border-[#141413] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'interactive'
                ? 'bg-[#D7FF3F] text-[#141413] font-bold shadow-[2px_2px_0px_#141413]'
                : 'bg-white text-[#141413] hover:bg-white/80'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => setViewMode('screenshot')}
            className={`min-h-[40px] sm:min-h-[32px] px-3 py-1.5 border border-[#141413] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'screenshot'
                ? 'bg-[#D7FF3F] text-[#141413] font-bold shadow-[2px_2px_0px_#141413]'
                : 'bg-white text-[#141413] hover:bg-white/80'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Simulated UI Screenshot</span>
          </button>

          <button
            onClick={() => setViewMode('schematic')}
            className={`min-h-[40px] sm:min-h-[32px] px-3 py-1.5 border border-[#141413] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'schematic'
                ? 'bg-[#D7FF3F] text-[#141413] font-bold shadow-[2px_2px_0px_#141413]'
                : 'bg-white text-[#141413] hover:bg-white/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architectural Blueprint</span>
          </button>
        </div>

        {/* Snapshot Download Button */}
        <button
          onClick={handleExportSnapshot}
          className="neo-btn min-h-[40px] sm:min-h-[32px] px-3.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 text-[#141413] cursor-pointer"
          title="Download active visual asset"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#141413]" />
              <span>Asset Exported</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Visual Asset</span>
            </>
          )}
        </button>
      </div>

      {/* Main Display Area */}
      <div className="pt-6">
        {/* VIEW 1: INTERACTIVE SIMULATOR */}
        {viewMode === 'interactive' && selectedProjectId === 'aetherlink' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 6 cols: Live Optical Stream Canvas */}
            <div className="lg:col-span-6 border-2 border-[#141413] bg-[#FAF6EE] p-5 shadow-[3px_3px_0px_#141413] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#141413]/20 mb-4">
                  <span className="font-bold text-[#141413]">OPTICAL TRANSMISSION APERTURE</span>
                  <span className="text-[#F04828] font-bold">
                    {aetherIsStreaming ? 'TRANSMITTING' : 'PAUSED'}
                  </span>
                </div>

                {/* Simulated QR Optical Window with Fiducial Alignment Markers */}
                <div className="relative aspect-square max-w-[280px] mx-auto bg-white border-2 border-[#141413] p-4 flex flex-col items-center justify-center shadow-[4px_4px_0px_#141413]">
                  {/* Corner Fiducial Marks */}
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#141413]" />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#141413]" />
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#141413]" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#141413]" />

                  {/* Procedural QR-Matrix Pattern simulating rapid frame change */}
                  <div className="grid grid-cols-7 gap-1 w-full h-full p-2 bg-[#F4EFE6] border border-[#141413]">
                    {/* Finder Pattern Top-Left */}
                    <div className="col-span-2 row-span-2 bg-[#141413] border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#D7FF3F]" />
                    </div>
                    {/* Dynamic Data Cells */}
                    {Array.from({ length: 17 }).map((_, i) => (
                      <div
                        key={i}
                        className={`transition-colors duration-75 ${
                          (aetherFrameSeq + i * 3) % 2 === 0
                            ? 'bg-[#141413]'
                            : 'bg-white border border-[#141413]/20'
                        }`}
                      />
                    ))}
                    {/* Finder Pattern Top-Right */}
                    <div className="col-span-2 row-span-2 bg-[#141413] border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#D7FF3F]" />
                    </div>
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div
                        key={`b-${i}`}
                        className={`transition-colors duration-75 ${
                          (aetherFrameSeq * 2 + i * 7) % 3 === 0
                            ? 'bg-[#141413]'
                            : 'bg-white border border-[#141413]/20'
                        }`}
                      />
                    ))}
                    {/* Finder Pattern Bottom-Left */}
                    <div className="col-span-2 row-span-2 bg-[#141413] border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#D7FF3F]" />
                    </div>
                  </div>

                  {/* Crosshair Center Reticle */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <div className="w-8 h-8 border border-[#141413] rounded-none" />
                    <div className="absolute w-full h-[1px] bg-[#141413]" />
                    <div className="absolute h-full w-[1px] bg-[#141413]" />
                  </div>
                </div>
              </div>

              {/* Transmission Telemetry Bar */}
              <div className="mt-4 pt-3 border-t border-[#141413]/20 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#141413]/60">FRAME: </span>
                  <span className="font-bold text-[#141413]">#{aetherFrameSeq}</span>
                </div>
                <div>
                  <span className="text-[#141413]/60">CRC-16: </span>
                  <span className="font-bold text-[#141413]">{aetherCrc}</span>
                </div>
                <div>
                  <span className="text-[#141413]/60">RATE: </span>
                  <span className="font-bold text-[#141413]">{aetherFps} FPS</span>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Simulation Control Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between border-2 border-[#141413] bg-white p-5 shadow-[3px_3px_0px_#141413]">
              <div>
                <h4 className="text-sm font-mono font-bold text-[#141413] mb-3 pb-2 border-b-2 border-[#141413]">
                  TRANSMISSION PARAMETERS & AIR-GAP CONTROLS
                </h4>

                <div className="space-y-4 text-xs font-mono">
                  {/* FPS Rate Selector */}
                  <div>
                    <label className="text-[#141413]/70 block mb-1.5 font-bold">
                      OPTICAL REFRESH FREQUENCY (FPS)
                    </label>
                    <div className="flex items-center gap-2">
                      {[30, 60, 120].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setAetherFps(rate)}
                          className={`px-3 py-1.5 border border-[#141413] font-bold transition-colors ${
                            aetherFps === rate
                              ? 'bg-[#141413] text-white shadow-[2px_2px_0px_#141413]'
                              : 'bg-[#FAF6EE] text-[#141413] hover:bg-[#D7FF3F]'
                          }`}
                        >
                          {rate} FPS
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chunk Size Selector */}
                  <div>
                    <label className="text-[#141413]/70 block mb-1.5 font-bold">
                      PAYLOAD CHUNK DENSITY
                    </label>
                    <div className="flex items-center gap-2">
                      {[512, 1024, 2048].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setAetherChunkSize(size)}
                          className={`px-3 py-1.5 border border-[#141413] font-bold transition-colors ${
                            aetherChunkSize === size
                              ? 'bg-[#141413] text-white shadow-[2px_2px_0px_#141413]'
                              : 'bg-[#FAF6EE] text-[#141413] hover:bg-[#D7FF3F]'
                          }`}
                        >
                          {size} Bytes / Frame
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Air-gap Protocol Information */}
                  <div className="p-3 border border-[#141413] bg-[#FAF6EE] space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#141413]/60">Physical Media:</span>
                      <span className="font-bold">Photonic (Visible Light)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#141413]/60">RF Radiation:</span>
                      <span className="font-bold text-[#F04828]">0.0 dBm (Zero RF)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#141413]/60">Drop Recovery:</span>
                      <span className="font-bold">Reed-Solomon Parity Block</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream Control Action */}
              <div className="mt-6 pt-4 border-t-2 border-[#141413] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setAetherIsStreaming((prev) => !prev)}
                  className={`neo-btn px-4 py-2 text-xs font-mono font-bold flex items-center gap-2 ${
                    aetherIsStreaming ? 'bg-white' : 'bg-[#D7FF3F]'
                  }`}
                >
                  {aetherIsStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{aetherIsStreaming ? 'Pause Transmission' : 'Resume Transmission'}</span>
                </button>

                <span className="text-[11px] font-mono text-[#141413]/60">
                  Bandwidth: ~{(aetherFps * aetherChunkSize * 0.0008).toFixed(1)} kB/s
                </span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 1 (Continued): INTERACTIVE SIMULATOR FOR SPAM CLASSIFICATION */}
        {viewMode === 'interactive' && selectedProjectId === 'spam-classification' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 6 cols: Message Input & Classification */}
            <div className="lg:col-span-6 border-2 border-[#141413] bg-[#FAF6EE] p-5 shadow-[3px_3px_0px_#141413] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#141413]/20 mb-3">
                  <span className="font-bold text-[#141413]">TEXT TENSOR INFERENCE</span>
                  <span className="text-[#141413]/60">Local CPU Conv1D</span>
                </div>

                {/* Preset Picker */}
                <div className="mb-3">
                  <span className="text-[11px] font-mono text-[#141413]/70 block mb-1">
                    TEST SAMPLE CORPORA:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {sampleMessages.map((sample, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedSampleIndex(i);
                          setCustomText(sample.text);
                          handleClassify(sample.text);
                        }}
                        className={`text-left p-1.5 border border-[#141413] text-[10px] font-mono truncate transition-colors ${
                          selectedSampleIndex === i
                            ? 'bg-[#141413] text-[#FAF6EE] font-bold'
                            : 'bg-white text-[#141413] hover:bg-[#D7FF3F]'
                        }`}
                        title={sample.text}
                      >
                        {sample.label}: {sample.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Area */}
                <label className="text-[11px] font-mono font-bold text-[#141413] block mb-1">
                  EVALUATION TEXT BUFFER:
                </label>
                <textarea
                  rows={3}
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    handleClassify(e.target.value);
                  }}
                  className="w-full p-2.5 bg-white border-2 border-[#141413] text-xs font-mono text-[#141413] focus:outline-none focus:ring-2 focus:ring-[#141413]"
                  placeholder="Type message to evaluate..."
                />
              </div>

              {/* Classification Output Meter */}
              <div className="mt-4 pt-4 border-t-2 border-[#141413]">
                <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                  <span className="font-bold text-[#141413]">
                    RESULT: {isCurrentSpam ? 'SPAM DETECTED' : 'HAM (LEGITIMATE)'}
                  </span>
                  <span
                    className={`font-bold ${
                      isCurrentSpam ? 'text-[#F04828]' : 'text-emerald-700'
                    }`}
                  >
                    {(currentConfidence * 100).toFixed(1)}% CONFIDENCE
                  </span>
                </div>

                {/* Neo-brutalist gauge bar */}
                <div className="h-5 w-full bg-white border-2 border-[#141413] p-0.5 relative">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCurrentSpam ? 'bg-[#F04828]' : 'bg-[#D7FF3F]'
                    }`}
                    style={{ width: `${currentConfidence * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right 6 cols: DeepCNN Feature Activations Map */}
            <div className="lg:col-span-6 flex flex-col justify-between border-2 border-[#141413] bg-white p-5 shadow-[3px_3px_0px_#141413]">
              <div>
                <h4 className="text-sm font-mono font-bold text-[#141413] mb-3 pb-2 border-b-2 border-[#141413]">
                  1D-CONVNET MULTI-SCALE KERNEL ACTIVATIONS
                </h4>

                {/* Model Selector */}
                <div className="mb-4">
                  <label className="text-[11px] font-mono text-[#141413]/70 block mb-1">
                    ACTIVE MODEL CHECKPOINT:
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 border-2 border-[#141413] bg-[#FAF6EE] text-xs font-mono font-bold"
                  >
                    <option>Conv1D Stack (SpamNet-v2, Kernels 3/4/5)</option>
                    <option>BiLSTM Baseline Model (Epoch 20)</option>
                    <option>Vanilla CNN (Single Kernel k=3)</option>
                  </select>
                </div>

                {/* Simulated Conv1D Feature Heatmap Bars */}
                <div className="space-y-2.5 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Conv1D_Layer_1 (Kernel Size = 3)</span>
                      <span className="font-bold">
                        {isCurrentSpam ? 'High N-gram Resonance' : 'Low Resonance'}
                      </span>
                    </div>
                    <div className="grid grid-cols-12 gap-1 h-3.5">
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`border border-[#141413] ${
                            isCurrentSpam
                              ? (idx + 3) % 2 === 0
                                ? 'bg-[#141413]'
                                : 'bg-[#D7FF3F]'
                              : (idx + 1) % 4 === 0
                              ? 'bg-[#141413]/40'
                              : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Conv1D_Layer_2 (Kernel Size = 4)</span>
                      <span className="font-bold">
                        {isCurrentSpam ? 'Syntactic Trigger Match' : 'Normal Syntax'}
                      </span>
                    </div>
                    <div className="grid grid-cols-12 gap-1 h-3.5">
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`border border-[#141413] ${
                            isCurrentSpam
                              ? (idx + 2) % 3 === 0
                                ? 'bg-[#F04828]'
                                : 'bg-[#141413]'
                              : idx % 3 === 0
                              ? 'bg-white'
                              : 'bg-[#FAF6EE]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Global Max-Pooling + Softmax</span>
                      <span className="font-bold">
                        {isCurrentSpam ? 'Logit: +4.82 (Spam)' : 'Logit: -3.14 (Ham)'}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-[#FAF6EE] border border-[#141413] flex">
                      <div
                        className={`h-full ${
                          isCurrentSpam ? 'bg-[#F04828]' : 'bg-[#D7FF3F]'
                        }`}
                        style={{ width: `${currentConfidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Execution Latency note */}
              <div className="mt-4 pt-3 border-t border-[#141413]/20 flex justify-between text-[11px] font-mono text-[#141413]/70">
                <span>Inference Latency: 4.2ms (CPU)</span>
                <span>Tensors: 1x64x128</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SIMULATED UI SCREENSHOT */}
        {viewMode === 'screenshot' && (
          <div className="border-2 border-[#141413] bg-[#FAF6EE] p-4 shadow-[4px_4px_0px_#141413]">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#141413]/20 mb-3">
              <span className="font-bold text-[#141413]">
                SIMULATED APPLICATION INTERFACE WINDOW
              </span>
              <span className="text-[#141413]/70">
                {activeProject.shortName} · Native Desktop GUI
              </span>
            </div>

            {activeProject.screenshotImage ? (
              <div className="border-2 border-[#141413] bg-white overflow-hidden">
                <img
                  src={activeProject.screenshotImage}
                  alt={activeProject.title + ' Simulated GUI Screenshot'}
                  className="w-full h-auto object-cover max-h-[520px]"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-mono text-[#141413]/60">
                Screenshot rendering...
              </div>
            )}

            <p className="text-xs font-mono text-[#141413]/80 mt-3 leading-snug">
              {activeProject.screenshotCaption ||
                'High-contrast simulated desktop window reflecting the verified application layout and controls.'}
            </p>
          </div>
        )}

        {/* VIEW 3: ARCHITECTURAL BLUEPRINT */}
        {viewMode === 'schematic' && (
          <div className="border-2 border-[#141413] bg-[#FAF6EE] p-4 shadow-[4px_4px_0px_#141413]">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#141413]/20 mb-3">
              <span className="font-bold text-[#141413]">
                ENGINEERING ARCHITECTURE BLUEPRINT
              </span>
              <span className="text-[#141413]/70">
                Technical Data Flow & Sensor Optics
              </span>
            </div>

            {activeProject.schematicImage ? (
              <div className="border-2 border-[#141413] bg-white overflow-hidden">
                <img
                  src={activeProject.schematicImage}
                  alt={activeProject.title + ' Architectural Blueprint'}
                  className="w-full h-auto object-cover max-h-[520px]"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-mono text-[#141413]/60">
                Blueprint rendering...
              </div>
            )}

            <p className="text-xs font-mono text-[#141413]/80 mt-3 leading-snug">
              {activeProject.schematicCaption ||
                'Technical schematic diagram detailing data transformation and pipeline structure.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
