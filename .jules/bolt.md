## 2025-05-18 - Three.js performance loop optimization
**Learning:** Inside high-frequency animation loops (like `useFrame`) and deeply nested loops (like O(n^2) connection matching), calculating true distance using `distanceTo` invokes an expensive `Math.sqrt` operation which can drag down framerate when scaled across hundreds of nodes/particles.
**Action:** Replace `distanceTo` with `distanceToSquared` and compare the result against the squared threshold (`threshold * threshold`). The squared threshold calculation should ideally be hoisted out of the innermost loops when possible.
