## 2025-05-23 - Optimization of Distance Logic in Animation Loops
**Learning:** High-frequency animation loops in React (like `requestAnimationFrame` or `@react-three/fiber`'s `useFrame`) suffer performance degradation when computing `Math.sqrt()` or `distanceTo()` redundantly for all elements every frame.
**Action:** Always optimize distance-based logic by using squared distance comparisons (`dx*dx + dy*dy < radius*radius` or `distanceToSquared()`) to skip the expensive square root calculation for elements that are outside the interaction threshold.
