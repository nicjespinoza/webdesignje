
## 2025-02-23 - Canvas 2D Particle Loop Bottlenecks
**Learning:** O(n^2) particle network loops inherently process redundant pairs and self-checks when starting the inner loop from `j = i`. Furthermore, computing `Math.sqrt` immediately for every pair creates an enormous CPU penalty inside high-frequency requestAnimationFrame blocks before even knowing if the particles are close enough to render lines.
**Action:** Always structure nested particle loops as `for (let j = i + 1; j < particles.length; j++)` to halve iterations and avoid zero-distance self-checks. Precalculate squared distance thresholds (`thresholdSq`) outside the loop, use `dx*dx + dy*dy` for comparison, and strictly defer `Math.sqrt()` inside the conditional block where it is absolutely needed.
