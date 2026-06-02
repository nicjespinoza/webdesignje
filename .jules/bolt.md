## 2024-06-02 - distanceTo() in O(n^2) loops

**Learning:** When calculating distance in tight loops like Three.js O(n^2) network connection loops (`p1.distanceTo(p2) < threshold`), `distanceTo` inherently calls `Math.sqrt()` which is computationally expensive and unnecessary. This becomes a major bottleneck when recalculating thousands of neuron connections every frame.
**Action:** Replace `distanceTo` with `distanceToSquared` and compare against `threshold * threshold`. Since `threshold` is often constant inside the loop, the squared threshold can even be hoisted out.
