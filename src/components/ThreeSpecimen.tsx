import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, RotateCw, Pause, Play, Layers, Radio } from 'lucide-react';

export const ThreeSpecimen: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'exploded'>('solid');
  const [laserActive, setLaserActive] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);

  const stateRef = useRef({
    isPaused: false,
    viewMode: 'solid' as 'solid' | 'wireframe' | 'exploded',
    laserActive: true,
    rotationSpeed: 1,
    targetRotationX: 0.3,
    targetRotationY: 0.6,
    currentRotationX: 0.3,
    currentRotationY: 0.6,
    isDragging: false,
    prevPointerX: 0,
    prevPointerY: 0,
    explodeFactor: 0,
    targetExplodeFactor: 0,
    isVisible: true,
  });

  useEffect(() => {
    stateRef.current.isPaused = isPaused;
  }, [isPaused]);

  useEffect(() => {
    stateRef.current.viewMode = viewMode;
    stateRef.current.targetExplodeFactor = viewMode === 'exploded' ? 1.0 : 0.0;
  }, [viewMode]);

  useEffect(() => {
    stateRef.current.laserActive = laserActive;
  }, [laserActive]);

  useEffect(() => {
    stateRef.current.rotationSpeed = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPaused(true);
      stateRef.current.isPaused = true;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfaf6ee);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.8);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(4, 6, 5);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xd7ff3f, 1.2);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Procedural Dial Texture
    const dialCanvas = document.createElement('canvas');
    dialCanvas.width = 512;
    dialCanvas.height = 512;
    const ctx = dialCanvas.getContext('2d')!;
    ctx.fillStyle = '#141413';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#D7FF3F';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 36; i++) {
      const angle = (i * Math.PI * 2) / 36;
      const x1 = 256 + Math.cos(angle) * 210;
      const y1 = 256 + Math.sin(angle) * 210;
      const x2 = 256 + Math.cos(angle) * 235;
      const y2 = 256 + Math.sin(angle) * 235;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = i % 3 === 0 ? '#D7FF3F' : '#FAF6EE';
      ctx.lineWidth = i % 3 === 0 ? 5 : 2;
      ctx.stroke();
    }
    const dialTexture = new THREE.CanvasTexture(dialCanvas);
    dialTexture.colorSpace = THREE.SRGBColorSpace;

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x141413,
      metalness: 0.8,
      roughness: 0.35,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.25,
    });

    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xd7ff3f,
      emissive: 0x142000,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.75,
      ior: 1.55,
      thickness: 1.2,
      transparent: true,
      opacity: 0.9,
    });

    const laserMat = new THREE.MeshBasicMaterial({
      color: 0xf04828,
      wireframe: false,
      transparent: true,
      opacity: 0.9,
    });

    const dialMat = new THREE.MeshStandardMaterial({
      map: dialTexture,
      roughness: 0.4,
      metalness: 0.3,
    });

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Part 1: Stator Ring
    const statorGeo = new THREE.TorusGeometry(1.9, 0.14, 16, 48);
    const statorMesh = new THREE.Mesh(statorGeo, chassisMat);
    masterGroup.add(statorMesh);

    // Part 2: Dial Ring
    const dialGeo = new THREE.RingGeometry(1.45, 1.85, 48);
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.rotation.x = -Math.PI / 2;
    masterGroup.add(dialMesh);

    // Part 3: Gimbal Ring
    const gimbalGroup = new THREE.Group();
    masterGroup.add(gimbalGroup);

    const gimbalGeo = new THREE.TorusGeometry(1.5, 0.08, 16, 40);
    const gimbalMesh = new THREE.Mesh(gimbalGeo, brassMat);
    gimbalGroup.add(gimbalMesh);

    const pinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.4, 16);
    const pinLeft = new THREE.Mesh(pinGeo, brassMat);
    pinLeft.position.set(-1.6, 0, 0);
    pinLeft.rotation.z = Math.PI / 2;
    gimbalGroup.add(pinLeft);

    const pinRight = new THREE.Mesh(pinGeo, brassMat);
    pinRight.position.set(1.6, 0, 0);
    pinRight.rotation.z = Math.PI / 2;
    gimbalGroup.add(pinRight);

    // Part 4: Inner Rotor
    const rotorGroup = new THREE.Group();
    masterGroup.add(rotorGroup);

    const innerRingGeo = new THREE.TorusGeometry(1.15, 0.09, 16, 36);
    const innerRing = new THREE.Mesh(innerRingGeo, chassisMat);
    rotorGroup.add(innerRing);

    // Part 5: Hexagonal Prism
    const prismGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.6, 6);
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    prismMesh.rotation.x = Math.PI / 2;
    rotorGroup.add(prismMesh);

    // Part 6: Emitter Nozzles
    const nozzleGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.45, 16);
    const nozzleTop = new THREE.Mesh(nozzleGeo, brassMat);
    nozzleTop.position.set(0, 0.85, 0);
    rotorGroup.add(nozzleTop);

    const nozzleBottom = new THREE.Mesh(nozzleGeo, brassMat);
    nozzleBottom.position.set(0, -0.85, 0);
    nozzleBottom.rotation.x = Math.PI;
    rotorGroup.add(nozzleBottom);

    // Part 7: Laser Guide
    const laserGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.8, 12);
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    rotorGroup.add(laserMesh);

    // Grounding Contact Shadow
    const shadowGeo = new THREE.CircleGeometry(2.2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x141413,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -2.1;
    shadowMesh.rotation.x = -Math.PI / 2;
    scene.add(shadowMesh);

    const allMeshes: THREE.Mesh[] = [
      statorMesh,
      dialMesh,
      gimbalMesh,
      pinLeft,
      pinRight,
      innerRing,
      prismMesh,
      nozzleTop,
      nozzleBottom,
    ];

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      stateRef.current.isDragging = true;
      stateRef.current.prevPointerX = clientX;
      stateRef.current.prevPointerY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!stateRef.current.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - stateRef.current.prevPointerX;
      const deltaY = clientY - stateRef.current.prevPointerY;
      stateRef.current.targetRotationY += deltaX * 0.008;
      stateRef.current.targetRotationX += deltaY * 0.008;
      stateRef.current.targetRotationX = Math.max(-1.2, Math.min(1.2, stateRef.current.targetRotationX));
      stateRef.current.prevPointerX = clientX;
      stateRef.current.prevPointerY = clientY;
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const observer = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!stateRef.current.isVisible) return;

      const delta = clock.getDelta();
      const state = stateRef.current;

      if (!state.isPaused && !state.isDragging) {
        state.targetRotationY += delta * 0.45 * state.rotationSpeed;
      }

      state.currentRotationX = THREE.MathUtils.damp(
        state.currentRotationX,
        state.targetRotationX,
        8,
        delta
      );
      state.currentRotationY = THREE.MathUtils.damp(
        state.currentRotationY,
        state.targetRotationY,
        8,
        delta
      );

      masterGroup.rotation.x = state.currentRotationX;
      masterGroup.rotation.y = state.currentRotationY;

      if (!state.isPaused) {
        rotorGroup.rotation.z += delta * 1.8 * state.rotationSpeed;
        dialMesh.rotation.z -= delta * 0.4 * state.rotationSpeed;
      }

      state.explodeFactor = THREE.MathUtils.damp(
        state.explodeFactor,
        state.targetExplodeFactor,
        6,
        delta
      );

      gimbalGroup.position.z = state.explodeFactor * 0.9;
      rotorGroup.position.z = -state.explodeFactor * 0.9;
      statorMesh.position.y = state.explodeFactor * 0.4;
      shadowMesh.position.y = -2.1 - state.explodeFactor * 0.4;

      laserMesh.visible = state.laserActive;
      if (state.laserActive) {
        const pulse = Math.sin(clock.getElapsedTime() * 12) * 0.35 + 0.65;
        laserMat.opacity = pulse;
        const scaleX = 0.8 + pulse * 0.4;
        laserMesh.scale.set(scaleX, 1, scaleX);
      }

      const isWire = state.viewMode === 'wireframe';
      allMeshes.forEach((mesh) => {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => ((m as THREE.MeshStandardMaterial).wireframe = isWire));
        } else {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = isWire;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      statorGeo.dispose();
      dialGeo.dispose();
      gimbalGeo.dispose();
      pinGeo.dispose();
      innerRingGeo.dispose();
      prismGeo.dispose();
      nozzleGeo.dispose();
      laserGeo.dispose();
      shadowGeo.dispose();
      dialTexture.dispose();
      chassisMat.dispose();
      brassMat.dispose();
      prismMat.dispose();
      laserMat.dispose();
      dialMat.dispose();
      shadowMat.dispose();
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, []);

  const handleReset = () => {
    stateRef.current.targetRotationX = 0.3;
    stateRef.current.targetRotationY = 0.6;
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[420px] bg-[#FAF6EE] border-2 border-[#141413] shadow-[4px_4px_0px_#141413] overflow-hidden select-none flex flex-col justify-between">
      {/* Specimen Header Annotation Strip */}
      <div className="z-10 flex items-center justify-between px-3.5 py-2.5 bg-[#FAF6EE] border-b-2 border-[#141413] text-xs font-mono font-medium text-[#141413]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#141413]">SPECIMEN 01</span>
          <span className="text-[#141413]/40" aria-hidden="true">/</span>
          <span className="text-[#141413]/70">OPTICAL ROTOR</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#141413]/60 hidden sm:inline">
            Drag to inspect · AetherLink Metaphor
          </span>
          <button
            onClick={() => setShowControls((prev) => !prev)}
            className="p-1 hover:bg-[#D7FF3F] text-[#141413] transition-colors border border-[#141413]"
            title={showControls ? 'Collapse Controls Dock' : 'Expand Controls Dock'}
            aria-label="Toggle Controls Dock"
          >
            {showControls ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        {webGlSupported ? (
          <div ref={mountRef} className="w-full h-full" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4EFE6]">
            <div className="w-16 h-16 border-2 border-[#141413] flex items-center justify-center bg-[#D7FF3F] shadow-[3px_3px_0px_#141413] mb-3">
              <Layers className="w-8 h-8 text-[#141413]" />
            </div>
            <h4 className="font-display font-bold text-sm text-[#141413]">AetherLink Optical Specimen</h4>
            <p className="text-xs text-[#141413]/70 max-w-xs mt-1">
              Static isometric view. Hardware WebGL acceleration is unavailable in this environment.
            </p>
          </div>
        )}
      </div>

      {/* Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      {showControls && (
        <div className="z-10 px-3 py-2 bg-[#FAF6EE] border-t-2 border-[#141413] transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* View Mode Segmented Control */}
            <div className="flex items-center border border-[#141413] bg-white divide-x divide-[#141413]">
              <button
                type="button"
                onClick={() => setViewMode('solid')}
                className={`px-2.5 py-1 font-mono font-medium transition-colors ${
                  viewMode === 'solid'
                    ? 'bg-[#141413] text-[#FAF6EE]'
                    : 'text-[#141413] hover:bg-[#D7FF3F]'
                }`}
              >
                Solid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('wireframe')}
                className={`px-2.5 py-1 font-mono font-medium transition-colors ${
                  viewMode === 'wireframe'
                    ? 'bg-[#141413] text-[#FAF6EE]'
                    : 'text-[#141413] hover:bg-[#D7FF3F]'
                }`}
              >
                Wire
              </button>
              <button
                type="button"
                onClick={() => setViewMode('exploded')}
                className={`px-2.5 py-1 font-mono font-medium transition-colors ${
                  viewMode === 'exploded'
                    ? 'bg-[#D7FF3F] text-[#141413] font-bold'
                    : 'text-[#141413] hover:bg-[#D7FF3F]'
                }`}
              >
                Exploded
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 font-mono">
              <button
                type="button"
                onClick={() => setLaserActive((prev) => !prev)}
                className={`px-2 py-1 border border-[#141413] flex items-center gap-1 font-medium transition-colors ${
                  laserActive
                    ? 'bg-[#F04828] text-white font-bold'
                    : 'bg-white text-[#141413] hover:bg-[#FAF6EE]'
                }`}
                title="Toggle Optical Laser Pulse"
              >
                <Radio className="w-3 h-3" />
                <span className="hidden sm:inline">Beam</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="px-2 py-1 border border-[#141413] bg-white hover:bg-[#D7FF3F] text-[#141413] transition-colors flex items-center gap-1"
                title={isPaused ? 'Resume Rotation' : 'Pause Rotation'}
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={() => setRotationSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
                className="px-2 py-1 border border-[#141413] bg-white hover:bg-[#D7FF3F] text-[#141413] transition-colors"
                title="Cycle rotation speed"
              >
                {rotationSpeed}x
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-1 border border-[#141413] bg-white hover:bg-[#D7FF3F] text-[#141413] transition-colors"
                title="Reset Camera Angle"
                aria-label="Reset Camera Angle"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
