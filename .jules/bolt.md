## 2024-05-20 - High-frequency animation calculations
**Learning:** Found multiple instances of `Math.sqrt` used for distance checking in high-frequency particle animation loops (`requestAnimationFrame`). This is an expensive operation that can be avoided by checking squared distance against a squared threshold, saving significant CPU cycles.
**Action:** Replace `Math.sqrt(distSq) < threshold` with `distSq < threshold * threshold` in animation loops.
