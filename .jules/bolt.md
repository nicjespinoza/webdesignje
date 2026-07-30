## 2024-05-22 - Squared Distance vs Math.sqrt in High Frequency Loops

**Learning:** In 2D Canvas components with O(n^2) particle physics like `GlobalParticles.tsx` and `ParticleBackground.tsx`, using `Math.sqrt()` to calculate distance for every possible pair or interaction check is a massive bottleneck. The JS V8 engine handles multiplications (squared distances) much faster than square roots.
**Action:** When comparing distances against a threshold (e.g. `distance < maxDist`), replace `distance = Math.sqrt(dx*dx + dy*dy)` with `distSq = dx*dx + dy*dy` and check `distSq < maxDist * maxDist`. Only perform `Math.sqrt(distSq)` _inside_ the condition if the exact distance is strictly needed for opacity/force calculations.
