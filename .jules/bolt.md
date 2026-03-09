
## 2025-03-05 - Avoid Math.sqrt in High-Frequency Animation Loops
**Learning:** Found multiple instances where `Math.sqrt` was being called continuously on every frame inside animation loops (`requestAnimationFrame` and `useFrame`) for distance checks (e.g., interactive particle nodes and `distanceTo()` in Three.js). These repeated square root calculations can become a significant bottleneck.
**Action:** When doing distance checks in high-frequency loops, compare the squared distance (`dx*dx + dy*dy`) against the squared threshold. Only calculate the actual `Math.sqrt()` inside the conditional block if the exact distance is required for subsequent math (like normalizing vectors or computing opacity). Use Three.js's `distanceToSquared()` method instead of `distanceTo()` when applicable.
