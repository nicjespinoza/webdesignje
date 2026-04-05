## 2024-05-18 - Math.sqrt in Three.js loops
**Learning:** Checking distances using `distanceTo` within high-frequency loops (like `useFrame` at 60fps) or O(n²) nested loops invokes `Math.sqrt`, which is computationally expensive.
**Action:** Use `distanceToSquared` and compare it against the squared threshold (`threshold * threshold`) to eliminate the square root calculation entirely, yielding a free performance boost in WebGL scenes.
