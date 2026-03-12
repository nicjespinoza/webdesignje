
## 2024-05-18 - Squared Distances in High-Frequency Loops
**Learning:** Using `Math.sqrt` (or `distanceTo()` in Three.js) inside `requestAnimationFrame` or `useFrame` loops, especially for O(N²) particle interactions, causes significant CPU bottlenecks.
**Action:** Always use squared distances (`dx*dx + dy*dy < radius*radius` or `distanceToSquared()`) for threshold comparisons in animation loops and physics simulations to avoid expensive square root calculations.
