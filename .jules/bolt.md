## 2025-02-13 - Optimize distance calculations in Three.js render loops
**Learning:** High-frequency Three.js animation loops (`useFrame`) and nested `O(N^2)` initialization loops can suffer performance penalties from redundant `Math.sqrt` calls inherent to vector `distanceTo` comparisons.
**Action:** When comparing vector distances against thresholds, always use `distanceToSquared()` (which avoids `Math.sqrt`) and square the target threshold. This applies especially to Three.js particle systems and network connection algorithms.
