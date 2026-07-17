## 2025-02-23 - Prevent garbage collection stutters in @react-three/fiber useFrame loops
**Learning:** Instantiating new objects (e.g., `new THREE.Vector3()`) inside the `useFrame` loop of `@react-three/fiber` components creates significant garbage collection pressure on high-frequency animation loops, leading to stuttering and performance degradation.
**Action:** Always instantiate reusable objects (like `new THREE.Vector3()`) outside of `useFrame` loops, and mutate them internally using methods like `.subVectors()` or `.copy()` to avoid creating new instances per frame.
