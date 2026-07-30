// ============================================================
// ParticleBackground Component - Portafolio Joseph Espinoza
// Canvas 2D con partículas animadas que reaccionan al mouse
// ============================================================

import React, { useEffect, useRef } from 'react';

const PARTICLE_COLORS = [
  'rgba(198, 147, 32, 0.4)',
  'rgba(251, 225, 141, 0.3)',
  'rgba(255, 184, 0, 0.25)'
];

class BackgroundParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalX: number;
  originalY: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.originalX = this.x;
    this.originalY = this.y;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  }

  update(mouseX: number, mouseY: number, width: number, height: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width || this.x < 0) this.speedX *= -1;
    if (this.y > height || this.y < 0) this.speedY *= -1;

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distSq = dx * dx + dy * dy;
    const maxDistance = 150;

    // Optimization: use squared distance to avoid expensive Math.sqrt
    if (distSq < maxDistance * maxDistance) {
      const distance = Math.sqrt(distSq);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * 3;
      const directionY = forceDirectionY * force * 3;

      this.x -= directionX;
      this.y -= directionY;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: BackgroundParticle[] = [];
    let animationFrameId: number;

    const init = () => {
      particles = [];
      const numberOfParticles = Math.min(100, (canvas.width * canvas.height) / 9000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new BackgroundParticle(canvas.width, canvas.height));
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      init();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY, canvas.width, canvas.height);
        particles[i].draw(ctx);
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
      className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default ParticleBackground;
