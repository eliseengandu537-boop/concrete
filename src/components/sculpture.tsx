"use client";

import { useEffect, useRef } from "react";

export default function Sculpture() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let teardown = () => {};
    async function init() {
      const [THREE, { RoomEnvironment }] = await Promise.all([import("three"), import("three/addons/environments/RoomEnvironment.js")]);
      if (disposed || !element) return;
      const mobile = window.innerWidth < 768;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: "low-power" }); } catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.3 : 1.7));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
      camera.position.z = 6.4;
      const environmentScene = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(environmentScene, 0.025);
      scene.environment = environment.texture;
      environmentScene.dispose();
      pmrem.dispose();
      const geometry = new THREE.TorusKnotGeometry(1.13, 0.43, mobile ? 120 : 220, mobile ? 24 : 40, 2, 3);
      const material = new THREE.MeshPhysicalMaterial({ color: 0xc8ceba, metalness: 1, roughness: 0.23, clearcoat: 1, clearcoatRoughness: 0.16, envMapIntensity: 1.5, iridescence: 0.18, iridescenceIOR: 1.3 });
      const sculpture = new THREE.Mesh(geometry, material);
      scene.add(sculpture);
      const light = new THREE.DirectionalLight(0xe0ff8c, 5);
      light.position.set(3, -2, 4);
      scene.add(light);
      const fill = new THREE.DirectionalLight(0xffffff, 4);
      fill.position.set(-4, 4, 3);
      scene.add(fill);
      let pointerX = 0, pointerY = 0, easedX = 0, easedY = 0;
      let frame = 0, active = true, time = 0, last = 0;
      const draw = () => {
        easedX += (pointerX - easedX) * 0.04;
        easedY += (pointerY - easedY) * 0.04;
        sculpture.rotation.set(0.5 + Math.sin(time * 0.2) * 0.13 + easedY, 0.1 + time * 0.09 + easedX, -0.52);
        sculpture.position.y = Math.sin(time * 0.45) * 0.09;
        renderer.render(scene, camera);
      };
      const tick = (now: number) => {
        if (disposed || !active || document.hidden || reduced.matches) { frame = 0; return; }
        frame = requestAnimationFrame(tick);
        if (now - last < 32) return;
        time += Math.min((now - last) / 1000, 0.05);
        last = now;
        draw();
      };
      const resume = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        draw();
        if (active && !document.hidden && !reduced.matches) { last = performance.now(); frame = requestAnimationFrame(tick); }
      };
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        draw();
      };
      const onPointer = (event: PointerEvent) => {
        if (reduced.matches || event.pointerType !== "mouse") return;
        const bounds = element.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.3;
        pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.2;
      };
      const resetPointer = () => { pointerX = 0; pointerY = 0; };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(element);
      const visibilityObserver = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; resume(); });
      visibilityObserver.observe(element);
      element.addEventListener("pointermove", onPointer);
      element.addEventListener("pointerleave", resetPointer);
      document.addEventListener("visibilitychange", resume);
      reduced.addEventListener("change", resume);
      resize();
      element.classList.add("is-rendered");
      resume();
      teardown = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        element.removeEventListener("pointermove", onPointer);
        element.removeEventListener("pointerleave", resetPointer);
        document.removeEventListener("visibilitychange", resume);
        reduced.removeEventListener("change", resume);
        geometry.dispose(); material.dispose(); environment.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    }
    init().catch(() => { /* The CSS sculpture remains visible if WebGL is unavailable. */ });
    return () => { disposed = true; teardown(); };
  }, []);
  return <div ref={host} className="sculpture" aria-hidden="true"><div className="sculpture-fallback"><span /><span /><span /></div></div>;
}
