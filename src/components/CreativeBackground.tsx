import React, { useEffect, useRef } from 'react';

export type BackgroundTheme = 'aurora' | 'cyber' | 'cosmic' | 'synthwave' | 'obsidian';

interface CreativeBackgroundProps {
  theme?: BackgroundTheme;
  enableParticles?: boolean;
}

export const CreativeBackground: React.FC<CreativeBackgroundProps> = ({
  enableParticles = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle Google Stitch ambient particle simulation
  useEffect(() => {
    if (!enableParticles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleColors = [
      'rgba(138, 180, 248, ', // stitch accent blue
      'rgba(129, 201, 149, ', // stitch green
      'rgba(197, 138, 249, ', // stitch purple
    ];

    const particleCount = Math.min(Math.floor(width / 24), 45);

    interface AmbientParticle {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
    }

    const particles: AmbientParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.25 + 0.05,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near neighbors with very subtle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.05;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw subtle particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enableParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Google Stitch Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#191a1f]" />

      {/* 2. Soft, minimal ambient gradients */}
      <div 
        className="absolute top-[-15%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-10"
        style={{ background: '#8ab4f8' }}
      />
      <div 
        className="absolute bottom-[10%] right-[15%] w-[450px] h-[450px] rounded-full blur-[140px] opacity-10"
        style={{ background: '#c58af9' }}
      />

      {/* 3. Subtle Dot Matrix Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 4. Ambient particles canvas */}
      {enableParticles && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};
