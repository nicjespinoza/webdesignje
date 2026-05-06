import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -2000, y: -2000 };

        const COLORS = {
            gold: '198, 147, 32',
            bright: '251, 225, 141',
            platinum: '224, 224, 224'
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseSize: number;
            size: number;
            pulse: number;
            pulseSpeed: number;
            opacity: number;
            isHovered: boolean = false;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.baseSize = Math.random() * 2 + 0.5;
                this.size = this.baseSize;
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.02 + Math.random() * 0.03;
                this.opacity = 0.3 + Math.random() * 0.4;
            }

            update(others: Particle[]) {
                // Determine if hovered
                const dxm = mouse.x - this.x;
                const dym = mouse.y - this.y;
                // Optimization: use distanceToSquared to avoid expensive Math.sqrt
                const distMouseSq = dxm * dxm + dym * dym;

                this.isHovered = distMouseSq < 1600; // 40 * 40

                // Handle size growth / shrink
                const targetSize = this.isHovered ? this.baseSize * 4 : this.baseSize;
                this.size += (targetSize - this.size) * 0.1;

                if (this.isHovered) {
                    // Attract others
                    others.forEach(p => {
                        if (p === this) return;
                        const dxo = this.x - p.x;
                        const dyo = this.y - p.y;
                        // Optimization: use distanceToSquared to avoid expensive Math.sqrt
                        const distOtherSq = dxo * dxo + dyo * dyo;
                        if (distOtherSq < 14400) { // 120 * 120
                            p.x += dxo * 0.005;
                            p.y += dyo * 0.005;
                        }
                    });

                    // Stick slightly to mouse
                    this.x += dxm * 0.05;
                    this.y += dym * 0.05;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                }

                // Bound check
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

                this.pulse += this.pulseSpeed;
            }

            draw() {
                if (!ctx) return;
                const currentOpacity = (this.opacity + Math.sin(this.pulse) * 0.1) * (this.isHovered ? 1 : 0.8);

                // Outer glow
                const glowSize = this.size * 4;
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
                gradient.addColorStop(0, `rgba(${COLORS.bright}, ${currentOpacity})`);
                gradient.addColorStop(1, `rgba(${COLORS.gold}, 0)`);

                ctx.beginPath();
                ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Solid center
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.isHovered ? `rgba(${COLORS.platinum}, 1)` : `rgba(${COLORS.platinum}, ${currentOpacity + 0.2})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const count = Math.min(60, (canvas.width * canvas.height) / 25000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            if (!ctx) return;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    const maxDist = 180;
                    const maxDistSq = 32400; // 180 * 180

                    // Optimization: use distanceToSquared to avoid expensive Math.sqrt in hot loop
                    if (distSq < maxDistSq) {
                        const distance = Math.sqrt(distSq); // Only calc sqrt if within range
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

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update(particles);
                p.draw();
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