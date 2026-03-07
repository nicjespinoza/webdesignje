## 2024-03-07 - Optimization of distance calculations in animation loops
**Learning:** In canvas animation loops, comparing squared distances instead of calculating `Math.sqrt` avoids the overhead of the expensive square root operation. This is especially impactful in nested loops like particle systems (O(n²) complexity).
**Action:** When calculating distance simply to compare against a threshold, use `dx * dx + dy * dy < threshold * threshold` instead of `Math.sqrt(dx * dx + dy * dy) < threshold`.
