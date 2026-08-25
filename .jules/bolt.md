## YYYY-MM-DD - Initializing Journal
**Learning:** Found some performance problems in the loops.
**Action:** Let's optimize.

## 2024-08-25 - Optimize distance calculations
**Learning:** Using .distanceTo() computes an expensive Math.sqrt(), which creates a bottleneck in O(n²) nested loops or high-frequency useFrame loops.
**Action:** Always use .distanceToSquared() and compare against the square of the threshold to avoid Math.sqrt() in hot paths.
