import React, { useEffect, useRef } from 'react';

interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
  opacity: number;
  isHovered: boolean;
}

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let particles: CanvasParticle[] = [];
        let animationFrameId: number;
        const mouse = { x: -2000, y: -2000 };

        const COLORS = {
            gold: '198, 147, 32',
            bright: '251, 225, 141',
            platinum: '224, 224, 224'
        };

        const createParticle = (): CanvasParticle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            baseSize: Math.random() * 2 + 0.5,
            size: Math.random() * 2 + 0.5,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            opacity: 0.3 + Math.random() * 0.4,
            isHovered: false,
        });

        const updateParticle = (p: CanvasParticle, others: CanvasParticle[]) => {
            const dxm = mouse.x - p.x;
            const dym = mouse.y - p.y;
            // ⚡ Bolt: Fast rejection using squared distance
            const distMouseSq = dxm * dxm + dym * dym;

            p.isHovered = distMouseSq < 1600; // 40 * 40
            const targetSize = p.isHovered ? p.baseSize * 4 : p.baseSize;
            p.size += (targetSize - p.size) * 0.1;

            if (p.isHovered) {
                others.forEach(other => {
                    if (other === p) return;
                    const dxo = p.x - other.x;
                    const dyo = p.y - other.y;
                    // ⚡ Bolt: Fast rejection using squared distance
                    const distOtherSq = dxo * dxo + dyo * dyo;
                    if (distOtherSq < 14400) { // 120 * 120
                        other.x += dxo * 0.005;
                        other.y += dyo * 0.005;
                    }
                });
                p.x += dxm * 0.05;
                p.y += dym * 0.05;
            } else {
                p.x += p.vx;
                p.y += p.vy;
            }

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            p.pulse += p.pulseSpeed;
        };

        const drawParticle = (p: CanvasParticle) => {
            const currentOpacity = (p.opacity + Math.sin(p.pulse) * 0.1) * (p.isHovered ? 1 : 0.8);
            const glowSize = p.size * 4;
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
            gradient.addColorStop(0, `rgba(${COLORS.bright}, ${currentOpacity})`);
            gradient.addColorStop(1, `rgba(${COLORS.gold}, 0)`);

            ctx.beginPath();
            ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.isHovered ? `rgba(${COLORS.platinum}, 1)` : `rgba(${COLORS.platinum}, ${currentOpacity + 0.2})`;
            ctx.fill();
        };

        const init = () => {
            particles = [];
            const count = Math.min(60, (canvas.width * canvas.height) / 25000);
            for (let i = 0; i < count; i++) {
                particles.push(createParticle());
            }
        };

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    // ⚡ Bolt: Fast rejection using squared distance
                    const distSq = dx * dx + dy * dy;
                    const maxDist = 180;
                    const maxDistSq = 32400; // 180 * 180

                    if (distSq < maxDistSq) {
                        const distance = Math.sqrt(distSq); // Only calculate if needed for opacity
                        const baseOpacity = (1 - distance / maxDist) * 0.3;
                        const pulseBonus = (0.5 + Math.sin(particles[i].pulse) * 0.5) * 0.2;
                        const hoverBonus = (particles[i].isHovered || particles[j].isHovered) ? 0.3 : 0;

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${COLORS.gold}, ${baseOpacity + pulseBonus + hoverBonus})`;
                        ctx.lineWidth = (particles[i].isHovered || particles[j].isHovered) ? 0.8 : 0.4;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (e.type === 'mousemove') {
                const mouseEvent = e as MouseEvent;
                mouse.x = mouseEvent.clientX;
                mouse.y = mouseEvent.clientY;
            } else if (e.type === 'touchmove' || e.type === 'touchstart') {
                const touchEvent = e as TouchEvent;
                const touch = touchEvent.touches[0];
                if (touch) {
                    mouse.x = touch.clientX;
                    mouse.y = touch.clientY;
                }
            }
        };

        const handleTouchEnd = () => {
            // Reset mouse position when touch ends to avoid particles sticking to last touch position
            mouse.x = -2000;
            mouse.y = -2000;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchstart', handleMouseMove);
        window.addEventListener('touchend', handleTouchEnd);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                updateParticle(p, particles);
                drawParticle(p);
            });
            drawLines();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none opacity-80"
            style={{ zIndex: 0 }}
        />
    );
};

export default ParticleBackground;
