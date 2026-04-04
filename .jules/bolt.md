## 2025-04-04 - Optimize Three.js distance calculations
**Learning:** Using `distanceTo` in high-frequency animation loops (like `useFrame`) or nested arrays is a performance anti-pattern in Three.js because it relies on computationally expensive `Math.sqrt` calculations under the hood.
**Action:** Always favor `distanceToSquared` and compare against `threshold * threshold` to avoid unnecessary square root operations and significantly improve frame rates and reduce processing overhead in 3D scenes.
