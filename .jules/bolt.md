## 2025-02-28 - Optimizing Distance Calculations in Canvas/Three.js Animations
**Learning:** Replacing `Math.sqrt` inside `distanceTo` with squared distance comparisons (`distanceToSquared`) inside heavily nested high-frequency animation loops (`useMemo` mapping and `useFrame`) yields a solid performance improvement by avoiding continuous expensive calculations.
**Action:** Always prefer `distanceToSquared` over `distanceTo` for threshold comparisons in nested loops inside `useFrame` or spatial data preparation in 3D/canvas scenes.
