## 2024-03-14 - Optimize Three.js Distance Calculations
**Learning:** In high-frequency loops (like finding connections between particles or checking if agents reached their destinations), calculating exact distances using `distanceTo` requires a computationally expensive `Math.sqrt()` call. For basic proximity checks, it's significantly faster to compare squared distances.
**Action:** Replace `distanceTo(target)` with `distanceToSquared(target)` and compare it against `threshold * threshold` to avoid redundant square root calculations.
