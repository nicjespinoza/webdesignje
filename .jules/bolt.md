## 2026-04-19 - Squared Distance Optimization
**Learning:** Found multiple instances of `Math.sqrt` in inner loops of 2D canvas animations (e.g., `GlobalParticles`, `ParticleBackground`, `FooterParticles`).
**Action:** Replaced `Math.sqrt(dx * dx + dy * dy) < threshold` with `dx * dx + dy * dy < threshold * threshold` to avoid expensive square root calculations in hot paths.
