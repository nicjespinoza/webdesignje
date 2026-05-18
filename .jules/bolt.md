## 2024-05-18 - Replacing Math.sqrt with Squared Distances
**Learning:** In high-frequency 2D/3D animation loops (like drawing canvas particles or WebGL synapses in O(n^2) nested loops), computing exact distances with `Math.sqrt()` is an expensive bottleneck.
**Action:** Whenever possible, compare squared distances (e.g., `dx*dx + dy*dy < threshold*threshold`) to avoid the square root overhead. Only calculate `Math.sqrt()` after passing the fast bounds check if the exact linear distance is strictly required for styling (like opacity fading).
