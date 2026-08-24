## 2024-10-24 - Optimizing O(N^2) Three.js Distance Calculations
**Learning:** When calculating node connections in a dense 3D scene (O(N^2) complexity), `p1.distanceTo(p2)` introduces severe bottlenecks due to repeated `Math.sqrt` calls. Furthermore, `if (i !== j)` calculates duplicate bidirectional pairs unnecessarily.
**Action:** Always use `distanceToSquared()` for threshold checks (squaring the threshold instead) and replace `i !== j` with `j > i` in inner loops to halve operations and skip self-comparisons.
