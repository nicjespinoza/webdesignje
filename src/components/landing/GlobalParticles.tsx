// ============================================================
// GlobalParticles Component - Hyper-Realistic Neural Network
// Dynamic sizing, interlaced connections, and liquid background
// ============================================================

import React, { useEffect, useRef } from 'react';

const GlobalParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollRef = useRef(0);
    const isOverContentRef = useRef(false);
    const mouseRef = useRef({ x: -2000, y: -2000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const PARTICLE_COUNT = 100;
        const CONNECTION_DISTANCE = 180;
        const MOUSE_RADIUS = 250;
        const COLORS = {
            gold: 'rgba(198, 147, 32,',
            bright: 'rgba(251, 225, 141,',
            white: 'rgba(255, 255, 255,'
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            targetSize: number;
            baseSize: number;
            type: 'small' | 'medium' | 'large';
            pulse: number;
            pulseSpeed: number;
            life: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;

                const rand = Math.random();
                if (rand < 0.7) {
                    this.type = 'small';
                    this.baseSize = 0.5 + Math.random() * 1;
                } else if (rand < 0.95) {
                    this.type = 'medium';
                    this.baseSize = 2 + Math.random() * 1.5;
                } else {
                    this.type = 'large';
                    this.baseSize = 4 + Math.random() * 2;
                }

                this.size = this.baseSize;
                this.targetSize = this.baseSize;
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.01 + Math.random() * 0.02;
                this.life = Math.random();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

                this.pulse += this.pulseSpeed;
                // Breathing effect: size oscillates
                this.size = this.baseSize + Math.sin(this.pulse) * (this.baseSize * 0.3);
            }

            draw(scrollFactor: number) {
                if (!ctx) return;
                const opacity = (0.2 + Math.sin(this.pulse * 0.5) * 0.15 + 0.2) * (1 - scrollFactor * 0.7);

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `${COLORS.bright}${opacity})`);
                gradient.addColorStop(1, `${COLORS.gold}${opacity * 0.5})`);

                ctx.fillStyle = gradient;
                ctx.fill();

                if (this.type !== 'small' && scrollFactor < 0.3) {
                    ctx.shadowBlur = this.size * 3 * opacity;
                    ctx.shadowColor = `rgba(251, 225, 141, ${opacity * 0.5})`;
                } else {
                    ctx.shadowBlur = 0;
                }
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            const target = e.target as HTMLElement;
            const contentTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'LABEL', 'BUTTON', 'A', 'INPUT', 'TEXTAREA', 'IMG', 'SVG'];
            const isOverContent = (target && contentTags.includes(target.tagName)) ||
                (target && target.closest('.liquid-gold-card') !== null) ||
                (target && target.closest('.glass-panel') !== null) ||
                (target && target.innerText && target.innerText.trim().length > 5);
            isOverContentRef.current = !!isOverContent;
        };

        const handleScroll = () => {
            scrollRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        };

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();

        const animate = () => {
            if (!ctx) return;

            // Liquid Black Background
            ctx.fillStyle = '#020202';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const scrollFactor = scrollRef.current;
            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;
            const isOver = isOverContentRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.update();
                p1.draw(scrollFactor);

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;
                    const thresholdSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

                    if (distSq < thresholdSq) {
                        const dist = Math.sqrt(distSq);
                        const ratio = 1 - (dist / CONNECTION_DISTANCE);
                        const lineOpacity = ratio * 0.2 * (1 - scrollFactor * 0.6);

                        // Double interlaced lines for realistic neural network
                        ctx.beginPath();
                        ctx.strokeStyle = `${COLORS.gold}${lineOpacity})`;
                        ctx.lineWidth = 0.3 + ratio * 0.7;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();

                        // Interlacing effect: subtle highlight pulse
                        if (dist < CONNECTION_DISTANCE * 0.6) {
                            const pulsePos = (Date.now() * 0.001 + i) % 1;
                            const px = p1.x + (p2.x - p1.x) * pulsePos;
                            const py = p1.y + (p2.y - p1.y) * pulsePos;
                            ctx.beginPath();
                            ctx.arc(px, py, 0.8, 0, Math.PI * 2);
                            ctx.fillStyle = `${COLORS.bright}${lineOpacity * 2})`;
                            ctx.fill();
                        }
                    }
                }

                if (!isOver) {
                    const mdx = mouseX - p1.x;
                    const mdy = mouseY - p1.y;
                    const mdistSq = mdx * mdx + mdy * mdy;
                    if (mdistSq < MOUSE_RADIUS * MOUSE_RADIUS) {
                        const mdist = Math.sqrt(mdistSq);
                        const mRatio = 1 - (mdist / MOUSE_RADIUS);
                        ctx.beginPath();
                        ctx.strokeStyle = `${COLORS.bright}${mRatio * 0.4})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouseX, mouseY);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0"
            style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000 100%)' }}
        />
    );
};

export default GlobalParticles;
