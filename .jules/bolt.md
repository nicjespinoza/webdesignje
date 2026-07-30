## 2026-06-12 - Squared Distance Comparisons

**Learning:** Replaced `Math.sqrt()` in distance calculations within nested loops and `useFrame` animation loops (e.g. `Scene3D.tsx`, `FooterParticles.tsx`, `ParticleBackground.tsx`) with squared distance comparisons (`distance * distance < maxDist * maxDist`) to eliminate expensive floating point operations and improve render performance and reduce CPU overhead.

**Action:** Whenever verifying distance bounds for hit boxes, connections, or ranges in nested iteration rendering contexts like 2D canvas or `Three.js`, use squared distances over computing the explicit true distance via square roots unless the exact true distance itself is required for a secondary operation like computing an interpolation or opacity scalar.
