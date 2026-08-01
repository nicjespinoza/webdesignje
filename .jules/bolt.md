## 2024-08-01 - [Optimize Three.js animation loop memory allocations]
**Learning:** Instantiating objects like `new THREE.Vector3()` inside high-frequency animation loops (`useFrame`) causes excessive garbage collection, leading to performance stutters.
**Action:** Always allocate reusable vector objects outside of render loops (e.g., using `useMemo`) and mutate them in-place (e.g., `.subVectors().normalize()`) rather than reallocating per frame.
