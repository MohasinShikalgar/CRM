import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);
        camera.position.z = 5;

        // Particles
        const particleCount = 140;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const palette = [
            [0.39, 0.40, 0.95],
            [0.55, 0.36, 0.98],
            [0.02, 0.71, 0.83],
            [0.06, 0.73, 0.51],
        ];
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
            const c = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.7 });
        const particles = new THREE.Points(geo, mat);
        scene.add(particles);

        // Floating tori
        const tori = [];
        const torusColors = [0x6366f1, 0x8b5cf6, 0x06b6d4];
        for (let i = 0; i < 3; i++) {
            const g = new THREE.TorusGeometry(0.6 + i * 0.3, 0.04, 16, 60);
            const m = new THREE.MeshBasicMaterial({ color: torusColors[i], transparent: true, opacity: 0.2 + i * 0.05, wireframe: false });
            const t = new THREE.Mesh(g, m);
            t.position.set((i - 1) * 3, (i - 1) * 1.5, -2 - i);
            t.rotation.x = Math.random() * Math.PI;
            t.rotation.y = Math.random() * Math.PI;
            scene.add(t);
            tori.push(t);
        }

        // Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(1, 0);
        const icoMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.15 });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        ico.position.set(3, 1, -3);
        scene.add(ico);

        let frame;
        const animate = () => {
            frame = requestAnimationFrame(animate);
            particles.rotation.y += 0.0008;
            particles.rotation.x += 0.0003;
            tori.forEach((t, i) => {
                t.rotation.x += 0.003 + i * 0.001;
                t.rotation.y += 0.005 + i * 0.001;
            });
            ico.rotation.x += 0.005;
            ico.rotation.y += 0.007;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const w2 = mount.clientWidth, h2 = mount.clientHeight;
            renderer.setSize(w2, h2);
            camera.aspect = w2 / h2;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1,
            background: 'radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.1) 0%, transparent 60%)'
        }} />
    );
}
