## 2024-05-26 - Particle Rendering Optimization
**Learning:** N^2 loops in Canvas rendering algorithms (like connections between particles) execute thousands of times per frame. Unconditional use of `Math.sqrt()` inside these loops creates a significant CPU bottleneck.
**Action:** When calculating distances to check against a threshold within high-frequency loops (e.g. `requestAnimationFrame`), use squared distance comparisons (`dx*dx + dy*dy < maxDist*maxDist`) and defer `Math.sqrt()` execution until after the threshold check is passed.
