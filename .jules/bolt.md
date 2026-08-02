## 2025-02-26 - Optimization of distance calculation (Math.sqrt)
**Learning:** Found multiple instances where the application is performing square root calculations `Math.sqrt(dx*dx + dy*dy)` inside `requestAnimationFrame` and loops. `Math.sqrt` is expensive and often unnecessary when comparing against a constant threshold.
**Action:** Replace `Math.sqrt` with squared distance comparisons (`dx*dx + dy*dy < maxDistance * maxDistance`) inside animation loops to reduce CPU usage.
