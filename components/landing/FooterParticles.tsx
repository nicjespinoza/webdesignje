// ============================================================
// FooterParticles Component - Portafolio Joseph Espinoza
// Canvas 2D con partículas y conexiones para el footer
// ============================================================

import React, { useEffect, useRef } from 'react';

class FooterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 1.5 + 0.5;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, particleColor: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = particleColor;
    ctx.fill();
  }
}

const FooterParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: FooterParticle[] = [];
    let animationFrameId: number;

    // Configuration
    const PARTICLE_COLOR = 'rgba(251, 225, 141, 1)'; // Bright gold
    const LINE_COLOR = 'rgba(198, 147, 32,'; // Primary gold
    const CONNECTION_DISTANCE = 110;
    const MOUSE_DISTANCE = 160;

    const init = () => {
      particles = [];
      // Calculate density based on screen size
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new FooterParticle(canvas.width, canvas.height));
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      init();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Main Animation Loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx, PARTICLE_COLOR);

        // Draw connections to other particles (Synapses)
        // Optimization: start at i + 1 to halve iterations and avoid self-connections
        const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connDistSq) {
            const distance = Math.sqrt(distSq);
            ctx.beginPath();
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.strokeStyle = `${LINE_COLOR} ${opacity * 0.5})`; // Faint network lines
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Draw connections to Mouse (Interactive Node)
        const dx = mouseX - particles[i].x;
        const dy = mouseY - particles[i].y;
        const distSq = dx * dx + dy * dy;
        const mouseDistSq = MOUSE_DISTANCE * MOUSE_DISTANCE;

        if (distSq < mouseDistSq) {
          const distance = Math.sqrt(distSq);
          ctx.beginPath();
          const opacity = 1 - (distance / MOUSE_DISTANCE);
          ctx.strokeStyle = `rgba(251, 225, 141, ${opacity})`; // Gold highlight for interaction
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      // Blend mode creates a nice glowing effect over dark backgrounds
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
    />
  );
};

export default FooterParticles;
