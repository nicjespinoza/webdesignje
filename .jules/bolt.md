## 2026-05-22 - O(n^2) 3D Scene Optimizations
**Learning:** In Three.js and 2D canvas applications, changing nested loops from full iterations (n^2) to halved iterations (n^2 / 2) to optimize connection calculations (like `distanceTo`) can break rendering logic if the component depends on duplicated line pairs for accumulated opacity, or if line strengths are asymmetric.
**Action:** Do not blindly halve O(n^2) loops in scene logic; instead, prioritize replacing expensive root calculations like `Math.sqrt` with squared distance (`distanceToSquared`) comparisons, ensuring logical continuity.
## 2026-05-22 - O(n^2) 3D Scene Optimizations
**Learning:** In Three.js and 2D canvas applications, changing nested loops from full iterations (n^2) to halved iterations (n^2 / 2) to optimize connection calculations (like `distanceTo`) can break rendering logic if the component depends on duplicated line pairs for accumulated opacity, or if line strengths are asymmetric.
**Action:** Do not blindly halve O(n^2) loops in scene logic; instead, prioritize replacing expensive root calculations like `Math.sqrt` with squared distance (`distanceToSquared`) comparisons, ensuring logical continuity.
