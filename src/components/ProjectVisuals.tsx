import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Eye,
  Sliders,
  Maximize2,
  Cpu,
  Radio,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';

export const ProjectVisuals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aetherlink' | 'deepcnn'>('aetherlink');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [paramSpeed, setParamSpeed] = useState<number>(1);
  const [seed, setSeed] = useState<number>(42);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  // AetherLink specific params
  const [opticalFrequency, setOpticalFrequency] = useState<number>(60);
  const [showRays, setShowRays] = useState<boolean>(true);

  // DeepCNN specific params
  const [activeKernelSize, setActiveKernelSize] = useState<3 | 4 | 5>(3);
  const [tensorDensity, setTensorDensity] = useState<number>(8);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const frameCountRef = useRef<number>(0);

  // High-DPI Canvas Setup and Render Loop
  const renderDiagram = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Canvas Background: Warm paper #FAF6EE
    ctx.fillStyle = '#FAF6EE';
    ctx.fillRect(0, 0, w, h);

    // 2. Neo-brutalist Technical Grid dots & rules
    if (showGrid) {
      ctx.strokeStyle = 'rgba(20, 20, 19, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // Outer border
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);

    const t = (frameCountRef.current * 0.02 * paramSpeed);

    // 3. Render specific abstract programmatic diagrams
    if (activeTab === 'aetherlink') {
      renderAetherLinkDiagram(ctx, w, h, t);
    } else {
      renderDeepCnnDiagram(ctx, w, h, t);
    }

    ctx.restore();
  }, [activeTab, paramSpeed, seed, showGrid, opticalFrequency, showRays, activeKernelSize, tensorDensity]);

  // Diagram 1: AetherLink Abstract Optical Air-Gap & QR Stream Modulation
  const renderAetherLinkDiagram = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    // Layout Zones
    const leftX = w * 0.16;
    const midX = w * 0.5;
    const rightX = w * 0.84;
    const centerY = h * 0.5;

    // Header Annotation inside canvas
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('PROGRAMMATIC OPTICAL FLOW // VISUAL QR BITSTREAM // PHOTON PROPAGATION', 20, 25);
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F04828';
    ctx.fillText(`AIR-GAP STATUS: ISOLATED [FREQ: ${opticalFrequency}Hz]`, w - 240, 25);

    // Zone 1: Transmitter Screen (Dynamic QR Cell Matrix)
    const txW = Math.min(120, w * 0.22);
    const txH = txW;
    const txX = leftX - txW / 2;
    const txY = centerY - txH / 2;

    // Outer housing box
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(txX, txY, txW, txH);
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.strokeRect(txX, txY, txW, txH);

    // QR Cells
    const cols = 8;
    const cellSize = txW / cols;
    for (let r = 0; r < cols; r++) {
      for (let c = 0; c < cols; c++) {
        // Pseudo-random cell state modulated by time & seed
        const val = Math.sin(r * 4.3 + c * 2.7 + seed + Math.floor(t * 3)) * 0.5 + 0.5;
        const isCorner = (r < 2 && c < 2) || (r < 2 && c >= cols - 2) || (r >= cols - 2 && c < 2);
        
        if (isCorner) {
          ctx.fillStyle = '#141413';
          ctx.fillRect(txX + c * cellSize, txY + r * cellSize, cellSize, cellSize);
          ctx.fillStyle = '#D7FF3F';
          ctx.fillRect(txX + c * cellSize + cellSize * 0.25, txY + r * cellSize + cellSize * 0.25, cellSize * 0.5, cellSize * 0.5);
        } else if (val > 0.48) {
          ctx.fillStyle = '#141413';
          ctx.fillRect(txX + c * cellSize, txY + r * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }

    // Label: Transmitter
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('OLED EMITTER', txX, txY - 8);

    // Zone 2: Geometric Optics / Aperture Shutter / Lens
    const lensR = 60;
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(midX - 20, centerY, lensR, -Math.PI * 0.35, Math.PI * 0.35);
    ctx.arc(midX + 20, centerY, lensR, Math.PI * 0.65, Math.PI * 1.35);
    ctx.closePath();
    ctx.fillStyle = 'rgba(215, 255, 63, 0.25)';
    ctx.fill();
    ctx.stroke();

    // Aperture Blades
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#141413';
    ctx.beginPath();
    ctx.moveTo(midX, centerY - 80);
    ctx.lineTo(midX, centerY - 28);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(midX, centerY + 80);
    ctx.lineTo(midX, centerY + 28);
    ctx.stroke();

    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('APERTURE f/2.4', midX - 35, centerY - 86);

    // Optical Rays & Light Packets
    if (showRays) {
      const numRays = 7;
      for (let i = 0; i < numRays; i++) {
        const startY = txY + (i / (numRays - 1)) * txH;
        const endY = centerY + (i - (numRays - 1) / 2) * 14;

        ctx.strokeStyle = 'rgba(240, 72, 40, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(txX + txW, startY);
        ctx.lineTo(midX, startY);
        ctx.lineTo(rightX - 30, endY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated photon packet along ray
        const prog = (t * 1.5 + i * 0.25) % 1;
        const px = (txX + txW) + prog * ((rightX - 30) - (txX + txW));
        let py: number;
        if (px < midX) {
          py = startY;
        } else {
          const mProg = (px - midX) / (rightX - 30 - midX);
          py = startY + mProg * (endY - startY);
        }

        ctx.fillStyle = i % 2 === 0 ? '#F04828' : '#D7FF3F';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#141413';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Zone 3: Receiver CMOS Sensor & Demodulator
    const rxW = 32;
    const rxH = Math.min(140, h * 0.55);
    const rxX = rightX - rxW / 2;
    const rxY = centerY - rxH / 2;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(rxX, rxY, rxW, rxH);
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.strokeRect(rxX, rxY, rxW, rxH);

    // CMOS Sensor Pixels
    const pixelRows = 10;
    const pSize = rxH / pixelRows;
    for (let p = 0; p < pixelRows; p++) {
      const active = Math.sin(t * 4 + p) > 0.1;
      ctx.fillStyle = active ? '#D7FF3F' : '#FAF6EE';
      ctx.fillRect(rxX + 2, rxY + p * pSize + 1, rxW - 4, pSize - 2);
      ctx.strokeStyle = '#141413';
      ctx.lineWidth = 1;
      ctx.strokeRect(rxX + 2, rxY + p * pSize + 1, rxW - 4, pSize - 2);
    }

    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('CMOS SENSOR', rxX - 10, rxY - 8);

    // Live decoded sequence stream counter at bottom
    ctx.fillStyle = '#141413';
    ctx.fillRect(20, h - 34, w - 40, 22);
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#D7FF3F';
    const packetSeq = Math.floor(t * 12 + seed) % 9999;
    const crc = '0x' + ((packetSeq * 37) % 65535).toString(16).toUpperCase().padStart(4, '0');
    ctx.fillText(`FRAME RECONSTRUCTION: #${packetSeq.toString().padStart(4, '0')} · CRC-16: ${crc} · REED-SOLOMON: LOCKED · PARITY: 100%`, 30, h - 20);
  };

  // Diagram 2: DeepCNN 1D Sequence Classification & Feature Map Manifold
  const renderDeepCnnDiagram = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    // Header
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('PROGRAMMATIC TEXT TENSOR CONVOLUTION // MULTI-SCALE KERNELS // RECEPTIVE FIELDS', 20, 25);
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F04828';
    ctx.fillText(`KERNEL SIZE: k=${activeKernelSize} // CONV1D ACTIVATIONS`, w - 240, 25);

    const centerY = h * 0.48;

    // Stage 1: Input Sequence Token Matrix
    const tokens = ['URGENT', 'CLAIM', 'FREE', 'CASH', 'BONUS', 'TOKEN', 'LINK', 'VERIFY'];
    const tokX = w * 0.12;
    const tokH = 18;
    const startY = centerY - (tokens.length * (tokH + 4)) / 2;

    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('TOKEN VECTORS (1xD)', tokX - 30, startY - 12);

    tokens.forEach((tok, i) => {
      const y = startY + i * (tokH + 4);
      const isHighlighted = (Math.floor(t * 2) % (tokens.length - activeKernelSize + 1)) <= i &&
                            i < (Math.floor(t * 2) % (tokens.length - activeKernelSize + 1)) + activeKernelSize;

      ctx.fillStyle = isHighlighted ? '#D7FF3F' : '#FFFFFF';
      ctx.fillRect(tokX - 30, y, 76, tokH);
      ctx.strokeStyle = '#141413';
      ctx.lineWidth = isHighlighted ? 2 : 1.5;
      ctx.strokeRect(tokX - 30, y, 76, tokH);

      ctx.fillStyle = '#141413';
      ctx.fillText(tok, tokX - 22, y + 13);
    });

    // Stage 2: Sliding 1D Convolution Kernel Filter
    const kernelX = w * 0.36;
    const kernelH = activeKernelSize * (tokH + 4);
    const kernelY = startY + (Math.floor(t * 2) % (tokens.length - activeKernelSize + 1)) * (tokH + 4);

    // Shaded receptive field projection trapezoid
    ctx.fillStyle = 'rgba(215, 255, 63, 0.2)';
    ctx.beginPath();
    ctx.moveTo(tokX + 46, kernelY);
    ctx.lineTo(kernelX, centerY - 60);
    ctx.lineTo(kernelX, centerY + 60);
    ctx.lineTo(tokX + 46, kernelY + kernelH);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#F04828';
    ctx.lineWidth = 2;
    ctx.strokeRect(tokX - 32, kernelY - 1, 80, kernelH + 2);

    // Kernel weights display
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(kernelX, centerY - 60, 48, 120);
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.strokeRect(kernelX, centerY - 60, 48, 120);

    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText(`CONV1D (k=${activeKernelSize})`, kernelX - 10, centerY - 70);

    for (let k = 0; k < activeKernelSize; k++) {
      const wVal = (Math.sin(k * 2 + seed) * 0.8).toFixed(2);
      ctx.fillStyle = k % 2 === 0 ? '#FAF6EE' : '#D7FF3F';
      ctx.fillRect(kernelX + 4, centerY - 50 + k * 35, 40, 26);
      ctx.strokeStyle = '#141413';
      ctx.lineWidth = 1;
      ctx.strokeRect(kernelX + 4, centerY - 50 + k * 35, 40, 26);
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#141413';
      ctx.fillText(`W${k}:${wVal}`, kernelX + 6, centerY - 33 + k * 35);
    }

    // Stage 3: Feature Map & Max-Pooling
    const poolX = w * 0.62;
    const poolW = 32;
    const poolH = 130;
    const poolY = centerY - poolH / 2;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(poolX, poolY, poolW, poolH);
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.strokeRect(poolX, poolY, poolW, poolH);

    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('MAX-POOLING', poolX - 15, poolY - 10);

    const numFeatures = 8;
    const fStep = poolH / numFeatures;
    for (let f = 0; f < numFeatures; f++) {
      const act = Math.sin(t * 3 + f * 1.5 + seed) * 0.5 + 0.5;
      ctx.fillStyle = act > 0.6 ? '#F04828' : act > 0.3 ? '#D7FF3F' : '#FAF6EE';
      ctx.fillRect(poolX + 3, poolY + f * fStep + 2, poolW - 6, fStep - 4);
      ctx.strokeStyle = '#141413';
      ctx.lineWidth = 1;
      ctx.strokeRect(poolX + 3, poolY + f * fStep + 2, poolW - 6, fStep - 4);
    }

    // Stage 4: Dense Softmax Classification Node
    const outX = w * 0.85;
    const outY = centerY;

    // Connecting lines from max-pool to dense output
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(poolX + poolW, poolY + 20);
    ctx.lineTo(outX - 40, outY - 25);
    ctx.moveTo(poolX + poolW, poolY + poolH - 20);
    ctx.lineTo(outX - 40, outY + 25);
    ctx.stroke();

    // Softmax boxes
    // SPAM Class
    ctx.fillStyle = '#F04828';
    ctx.fillRect(outX - 40, outY - 45, 80, 32);
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.strokeRect(outX - 40, outY - 45, 80, 32);
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('SPAM: 97.4%', outX - 32, outY - 25);

    // HAM Class
    ctx.fillStyle = '#FAF6EE';
    ctx.fillRect(outX - 40, outY + 10, 80, 32);
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 2;
    ctx.strokeRect(outX - 40, outY + 10, 80, 32);
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#141413';
    ctx.fillText('HAM:  02.6%', outX - 32, outY + 30);

    // Telemetry Footer
    ctx.fillStyle = '#141413';
    ctx.fillRect(20, h - 34, w - 40, 22);
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#D7FF3F';
    ctx.fillText(`TENSOR PIPELINE: 1D-CNN (k=${activeKernelSize}) · ACTIVATION: RELU · POOLING: GLOBAL MAX · INFERENCE: 3.8ms`, 30, h - 20);
  };

  // Animation Loop
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (active) {
        if (isPlaying) {
          frameCountRef.current += 1;
        }
        renderDiagram();
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [renderDiagram, isPlaying]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `dhanjit_${activeTab}_canvas_diagram.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="w-full neo-card bg-[#FAF6EE] p-5 sm:p-7 border-2 border-[#141413] shadow-[4px_4px_0px_#141413] my-10">
      {/* Header & Project Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#141413]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#141413]/70 mb-1">
            <span className="font-bold text-[#141413]">PROGRAMMATIC VISUAL CORE</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#F04828] font-bold">CANVAS 2D API</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#141413]">
            Abstract Architecture Diagrams
          </h3>
          <p className="text-xs sm:text-sm text-[#141413]/80 font-mono mt-0.5">
            Procedurally rendered technical diagrams illustrating optical transmission & neural tensor convolutions.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center border-2 border-[#141413] bg-white divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#141413] shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('aetherlink')}
            className={`w-full sm:w-auto min-h-[44px] px-3.5 sm:px-3 py-2.5 sm:py-2 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'aetherlink'
                ? 'bg-[#141413] text-[#D7FF3F]'
                : 'text-[#141413] hover:bg-[#FAF6EE]'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>01. AetherLink Optical Flow</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('deepcnn')}
            className={`w-full sm:w-auto min-h-[44px] px-3.5 sm:px-3 py-2.5 sm:py-2 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'deepcnn'
                ? 'bg-[#141413] text-[#D7FF3F]'
                : 'text-[#141413] hover:bg-[#FAF6EE]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02. DeepCNN Tensor Manifold</span>
          </button>
        </div>
      </div>

      {/* Interactive Canvas Viewport */}
      <div className="relative mt-4 border-2 border-[#141413] bg-white shadow-[3px_3px_0px_#141413] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-[320px] sm:h-[400px] block cursor-crosshair"
        />

        {/* Tactical Telemetry Ribbon in Canvas */}
        <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono bg-white/90 border border-[#141413] px-2 py-0.5 shadow-[1px_1px_0px_#141413]">
          <span className="text-[#141413]/60">SEED:</span>
          <span className="font-bold text-[#141413]">{seed}</span>
          <span className="text-[#141413]/30">|</span>
          <span className="text-[#F04828] font-bold">60 FPS</span>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="mt-4 pt-3 border-t-2 border-[#141413] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Interactive Parameters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="neo-btn min-h-[40px] sm:min-h-[34px] px-3 sm:px-2.5 py-2 sm:py-1.5 flex items-center gap-1.5 font-bold cursor-pointer"
            title={isPlaying ? 'Pause animation' : 'Resume animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#F04828]" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          {/* Random Seed */}
          <button
            type="button"
            onClick={() => setSeed((s) => s + 7)}
            className="neo-btn min-h-[40px] sm:min-h-[34px] px-3 sm:px-2.5 py-2 sm:py-1.5 flex items-center gap-1.5 font-semibold cursor-pointer"
            title="Regenerate seed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reseed</span>
          </button>

          {/* Grid Toggle */}
          <button
            type="button"
            onClick={() => setShowGrid((g) => !g)}
            className={`neo-btn min-h-[40px] sm:min-h-[34px] px-3 sm:px-2.5 py-2 sm:py-1.5 font-semibold cursor-pointer ${showGrid ? 'bg-[#D7FF3F]' : 'bg-white'}`}
          >
            Grid: {showGrid ? 'On' : 'Off'}
          </button>

          {/* Tab Specific Controls */}
          {activeTab === 'aetherlink' ? (
            <div className="flex flex-wrap items-center gap-2 pl-0 sm:pl-2 sm:border-l sm:border-[#141413]/30">
              <button
                type="button"
                onClick={() => setShowRays((r) => !r)}
                className={`neo-btn min-h-[40px] sm:min-h-[34px] px-3 sm:px-2.5 py-2 sm:py-1.5 font-semibold cursor-pointer ${showRays ? 'bg-[#D7FF3F]' : 'bg-white'}`}
              >
                Rays: {showRays ? 'Visible' : 'Hidden'}
              </button>
              <button
                type="button"
                onClick={() => setOpticalFrequency((f) => (f === 60 ? 120 : f === 120 ? 30 : 60))}
                className="neo-btn min-h-[40px] sm:min-h-[34px] px-3 sm:px-2.5 py-2 sm:py-1.5 font-semibold cursor-pointer"
              >
                {opticalFrequency} Hz
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5 pl-0 sm:pl-2 sm:border-l sm:border-[#141413]/30">
              <span className="text-[#141413]/60 hidden sm:inline">Kernel:</span>
              {([3, 4, 5] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActiveKernelSize(k)}
                  className={`min-h-[40px] sm:min-h-[34px] px-3 sm:px-2.5 py-2 sm:py-1 border border-[#141413] font-bold transition-colors cursor-pointer ${
                    activeKernelSize === k
                      ? 'bg-[#141413] text-[#D7FF3F] shadow-[1px_1px_0px_#141413]'
                      : 'bg-white text-[#141413] hover:bg-[#FAF6EE]'
                  }`}
                >
                  k={k}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Download High-Res Canvas Image */}
        <button
          type="button"
          onClick={handleDownload}
          className="neo-btn-primary min-h-[44px] sm:min-h-[36px] px-4 py-2.5 sm:py-1.5 flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
        >
          {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          <span>{downloaded ? 'Diagram Exported' : 'Export Diagram (PNG)'}</span>
        </button>
      </div>
    </div>
  );
};
