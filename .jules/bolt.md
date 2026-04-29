## 2024-05-24 - Optimizing Math.sqrt in high-frequency animation loops
**Learning:** In 2D Canvas components like `ParticleBackground`, calling `Math.sqrt` frequently inside nested loops (O(n^2)) for distance calculations is a performance bottleneck that can cause frame rate drops.
**Action:** Replace `Math.sqrt(...) < threshold` checks with squared distance comparisons (`distSq < threshold * threshold`). Only compute the actual square root if the distance is within the threshold and the exact value is needed for visual effects (like opacity calculation).
