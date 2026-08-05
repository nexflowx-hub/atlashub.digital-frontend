'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Three.js 3×3×3 Interactive Cube Grid – adapted for hero container  */
/* ------------------------------------------------------------------ */

export function HeroCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const webglErrorRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.025);

    // ── Sizing ──
    let width = container.clientWidth;
    let height = container.clientHeight;

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // ── Renderer ──
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      webglErrorRef.current = true;
      container.innerHTML = '<p style="color:#71717a;font-size:12px;text-align:center;padding:20px;font-family:monospace">WebGL not available</p>';
      return;
    }

    // ── Groups ──
    const group = new THREE.Group();
    scene.add(group);

    const visibleGroup = new THREE.Group();
    const hitboxGroup = new THREE.Group();
    group.add(visibleGroup);
    group.add(hitboxGroup);

    // ── Raycaster ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);

    // ── Geometry & Materials ──
    const cubeSize = 0.8;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const hitboxMaterial = new THREE.MeshBasicMaterial({ visible: false });

    // Outer cubes – dark glass/metal (emerald tinted)
    const outerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a1a14,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.9,
    });

    // Edge lines
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.2,
    });

    // ── Core glow texture ──
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(52, 211, 153, 1)');
      gradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();
    const energyGeo = new THREE.OctahedronGeometry(cubeSize * 0.4, 0);

    // Core energy material – emerald glow
    const coreEnergyMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x10b981,
      emissiveIntensity: 10,
      transparent: true,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });

    // Core wireframe
    const coreWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    // ── Build 3×3×3 grid ──
    interface CubeData {
      visualMesh: THREE.Object3D;
      hitboxMesh: THREE.Mesh;
      energyMesh: THREE.Mesh | null;
      containmentMesh: THREE.Mesh | null;
      coreLight: THREE.PointLight | null;
      ix: number;
      iy: number;
      iz: number;
      isCore: boolean;
      currentHover: number;
      targetHover: number;
    }

    const cubeData: CubeData[] = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const isCore = x === 0 && y === 0 && z === 0;
          let mesh: THREE.Object3D;
          let energyMesh: THREE.Mesh | null = null;
          let containmentMesh: THREE.Mesh | null = null;
          let coreLight: THREE.PointLight | null = null;

          if (isCore) {
            mesh = new THREE.Group();

            coreLight = new THREE.PointLight(0x10b981, 3, 6);
            mesh.add(coreLight);

            const spriteMat = new THREE.SpriteMaterial({
              map: glowTexture,
              color: 0x10b981,
              transparent: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
              opacity: 0.8,
            });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(3.5, 3.5, 3.5);
            mesh.add(sprite);

            energyMesh = new THREE.Mesh(energyGeo, coreEnergyMaterial);
            mesh.add(energyMesh);

            containmentMesh = new THREE.Mesh(geometry, coreWireframeMaterial);
            mesh.add(containmentMesh);
          } else {
            mesh = new THREE.Mesh(geometry, outerMaterial);
            const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
            mesh.add(edges);
          }

          visibleGroup.add(mesh);

          const hitbox = new THREE.Mesh(geometry, hitboxMaterial);
          hitboxGroup.add(hitbox);

          cubeData.push({
            visualMesh: mesh,
            hitboxMesh: hitbox,
            energyMesh,
            containmentMesh,
            coreLight,
            ix: x,
            iy: y,
            iz: z,
            isCore,
            currentHover: 0,
            targetHover: 0,
          });
        }
      }
    }

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 4, 20);
    scene.add(emeraldLight);

    const tealLight = new THREE.PointLight(0x14b8a6, 4, 20);
    scene.add(tealLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
    fillLight.position.set(0, 5, 5);
    scene.add(fillLight);

    // ── Mouse state ──
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetParallaxX = mouse.x * 0.4;
      targetParallaxY = mouse.y * 0.4;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    // Use the whole window for parallax feel, but container for raycaster
    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalised within container
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      // Clamp to container bounds, but use for raycaster
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.x = nx;
        mouse.y = ny;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }
      targetParallaxX = nx * 0.3;
      targetParallaxY = ny * 0.3;
    };

    const handleWindowMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleWindowMouseMove);
    document.addEventListener('mouseleave', handleWindowMouseLeave);

    // ── Animation loop ──
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Raycast
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hitboxGroup.children, false);

      cubeData.forEach((c) => (c.targetHover = 0));
      if (intersects.length > 0) {
        const hoveredHitbox = intersects[0].object;
        const active = cubeData.find((c) => c.hitboxMesh === hoveredHitbox);
        if (active && !active.isCore) {
          active.targetHover = 1;
        }
      }

      // Orbiting lights
      emeraldLight.position.x = Math.sin(time * 0.8) * 6;
      emeraldLight.position.y = Math.cos(time * 0.5) * 4;
      emeraldLight.position.z = Math.cos(time * 0.8) * 6;

      tealLight.position.x = Math.cos(time * 0.6) * 6;
      tealLight.position.y = Math.sin(time * 0.7) * 4;
      tealLight.position.z = Math.sin(time * 0.6) * 6;

      // Base rotation
      group.rotation.x += delta * 0.1;
      group.rotation.y += delta * 0.15;

      // Parallax
      group.rotation.x += (-targetParallaxY - group.rotation.x) * 0.02;
      group.rotation.y += (targetParallaxX - group.rotation.y) * 0.02;

      // Per-cube animation
      cubeData.forEach((cube) => {
        cube.currentHover = THREE.MathUtils.lerp(cube.currentHover, cube.targetHover, 0.12);

        const wave = Math.sin(time * 2.5 + (cube.ix + cube.iy + cube.iz) * 0.5) * 0.04;
        const baseGap = 0.06;
        const offsetMultiplier = cubeSize + baseGap + wave;

        const baseX = cube.ix * offsetMultiplier;
        const baseY = cube.iy * offsetMultiplier;
        const baseZ = cube.iz * offsetMultiplier;

        cube.hitboxMesh.position.set(baseX, baseY, baseZ);

        // Detach direction
        let dirX = cube.ix;
        let dirY = cube.iy;
        let dirZ = cube.iz;
        const len = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ) || 1;
        dirX /= len;
        dirY /= len;
        dirZ /= len;

        const detach = 1.2 * cube.currentHover;

        cube.visualMesh.position.set(
          baseX + dirX * detach,
          baseY + dirY * detach,
          baseZ + dirZ * detach,
        );

        cube.visualMesh.rotation.x = cube.currentHover * Math.PI * 0.5;
        cube.visualMesh.rotation.y = cube.currentHover * Math.PI * 0.5;
        cube.visualMesh.rotation.z = cube.currentHover * Math.PI * 0.25;

        const scale = 1 - cube.currentHover * 0.15;

        if (cube.isCore) {
          const corePulse = 1 + Math.sin(time * 8) * 0.05;
          cube.visualMesh.scale.set(corePulse, corePulse, corePulse);
          if (cube.energyMesh) {
            cube.energyMesh.rotation.x = time * 2.5;
            cube.energyMesh.rotation.y = time * 3.0;
          }
          if (cube.containmentMesh) {
            cube.containmentMesh.rotation.x = -time * 0.5;
            cube.containmentMesh.rotation.y = -time * 0.8;
          }
          if (cube.coreLight) {
            cube.coreLight.intensity = 3 + Math.random() * 0.5;
          }
        } else {
          cube.visualMesh.scale.set(scale, scale, scale);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ──
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleWindowMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer?.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Cleanup
      geometry.dispose();
      outerMaterial.dispose();
      hitboxMaterial.dispose();
      edgesGeometry.dispose();
      edgesMaterial.dispose();
      energyGeo.dispose();
      coreEnergyMaterial.dispose();
      coreWireframeMaterial.dispose();
      glowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
}