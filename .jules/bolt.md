## 2025-02-18 - Math.sqrt Bottleneck in Three.js O(n^2) Loops
**Learning:** In 3D particle systems rendering (e.g. neural network connections in `Scene3D.tsx`), using `distanceTo()` inside nested O(n^2) loops triggers expensive `Math.sqrt` calculations.
**Action:** Replace `distanceTo()` with `distanceToSquared()` and compare against a precalculated squared threshold (`threshold * threshold`). This optimization applies to both O(n^2) generation loops and high-frequency animation loops (`useFrame`).
