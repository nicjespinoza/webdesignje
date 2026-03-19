## 2024-03-20 - Distance Calculation & Code Splitting
**Learning:** High-frequency animation loops in React (like `ParticleBackground` and `FooterParticles`) can be bottlenecked by math operations. `Math.sqrt` inside `requestAnimationFrame` loops is computationally expensive. Also, importing heavy 3D components directly increases the initial Vite bundle size.
**Action:** Replace `Math.sqrt(dx*dx + dy*dy)` with squared distance comparison (`distSq < thresholdSq`) when checking thresholds. Also, lazy load large `Scene3D` dependencies via `React.lazy` and `Suspense` to reduce initial load time.
