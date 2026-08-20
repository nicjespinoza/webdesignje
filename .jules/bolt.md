## 2025-02-14 - Optimize 3D Scene Loops and GC
**Learning:** Instantiating objects (like THREE.Vector3) inside a useFrame loop causes GC stutters. Nested loops for bidirectional pairs that compare 'i !== j' iterate N^2 times instead of N*(N-1)/2.
**Action:** Use j > i in pair loops to halve iterations. Instantiate reusable Three.js objects outside of useFrame loops and mutate them.
