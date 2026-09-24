import React from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles
        id="tsparticles"
        className="fixed inset-0 -z-20 pointer-events-none w-full h-full"
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'bubble',
              },
            },
            modes: {
              bubble: {
                distance: 200,
                duration: 2,
                opacity: 0.8,
                size: 5,
                color: '#00A3FF',
              },
            },
          },
          particles: {
            color: {
              value: ['#0066FF', '#00A3FF', '#CBD5E1'],
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'out',
              },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                width: 1920,
                height: 1080,
              },
              value: 85,
            },
            opacity: {
              value: { min: 0.15, max: 0.5 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
