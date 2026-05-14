## 2025-02-27 - Particle Animation Optimization
**Learning:** In 2D Canvas particle animations with O(n^2) connection loops, calling `Math.sqrt` on every iteration causes a significant performance hit.
**Action:** Replace `Math.sqrt` with squared distance comparisons (`distSq < threshold * threshold`), hoist the threshold calculation, and use `for (let j = i + 1; j < particles.length; j++)` to halve the iterations and avoid duplicate self-connections.
