import React, { useEffect, useRef } from 'react';

interface FooterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
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

    const PARTICLE_COLOR = 'rgba(34, 211, 238, 1)';
    const LINE_COLOR = 'rgba(99, 102, 241,';
    const CONNECTION_DISTANCE = 100;
    const MOUSE_DISTANCE = 150;

    const createParticle = (): FooterParticle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.5 + 0.5,
    });

    const updateParticle = (p: FooterParticle) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    };

    const drawParticle = (p: FooterParticle) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.fill();
    };

    const init = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(createParticle());
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i]);
        drawParticle(particles[i]);

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
                const distance = Math.sqrt(distanceSq);
                ctx.beginPath();
                const opacity = 1 - (distance / CONNECTION_DISTANCE);
                ctx.strokeStyle = `${LINE_COLOR} ${opacity * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        const dx = mouseX - particles[i].x;
        const dy = mouseY - particles[i].y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < MOUSE_DISTANCE * MOUSE_DISTANCE) {
            const distance = Math.sqrt(distanceSq);
            ctx.beginPath();
            const opacity = 1 - (distance / MOUSE_DISTANCE);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
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
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
    />
  );
};

export default FooterParticles;
