## 2025-03-01 - Avoid Math.sqrt in high-frequency animation loops
**Learning:** Using `Math.sqrt()` inside nested `O(N^2)` loops (like particle connections in canvas `requestAnimationFrame`) is a significant CPU bottleneck for canvas animations.
**Action:** Always replace `Math.sqrt(dx*dx + dy*dy)` with a squared distance fast-rejection check (`dx*dx + dy*dy < threshold * threshold`) before performing the expensive square root operation, or remove it entirely if only a boolean check is needed.
