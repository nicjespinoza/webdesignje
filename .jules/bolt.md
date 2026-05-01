## 2026-05-01 - Squared Distance for High-Frequency Loops
**Learning:** In 2D Canvas or Three.js applications, distance calculations (`Math.sqrt(...)` or `distanceTo(v) < threshold`) can be significantly slower when executed in high-frequency animation loops (`useFrame`) or nested \(O(n^2)\) loop connections calculations.
**Action:** Replace basic distance calculations with squared distance comparisons (`distanceToSquared` or `distSq < threshold * threshold`). Always hoist the squared threshold calculation (`threshold * threshold`) outside the loop to avoid redundant computation.
