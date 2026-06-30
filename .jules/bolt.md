## 2025-02-18 - Avoid O(n^2) Object Allocation inside useFrame in Three.js
**Learning:** High-frequency loop like `useFrame` shouldn't repeatedly allocate `THREE.Vector3()` objects or invoke `distanceTo` because it generates garbage collections and calls expensive `Math.sqrt` under the hood. In O(N^2) connection checks, these impact performance dramatically.
**Action:** Replace `distanceTo` with `distanceToSquared` and reuse allocated memory via `useMemo(() => new THREE.Vector3(), [])` to manage vectors efficiently.
