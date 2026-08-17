## 2024-11-20 - Three.js distanceTo and garbage collection optimizations
**Learning:** `distanceTo` uses an expensive `Math.sqrt` operation. Also, creating new `THREE.Vector3` instances inside `useFrame` or nested loops triggers garbage collection stutters. O(N^2) loops on a single array create duplicate pairs if checking `i !== j`.
**Action:** Replace `distanceTo` with `distanceToSquared` and square the threshold. Instantiate reusable vectors outside loops/frames (e.g. `useMemo`). Use `j > i` instead of `i !== j` to halve iterations in pair-finding loops.
