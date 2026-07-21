## 2025-05-23 - Prevent Garbage Collection Stutters in useFrame
**Learning:** Instantiating objects like `new THREE.Vector3()` inside a `useFrame` loop creates unnecessary garbage, causing stutters in Three.js animations.
**Action:** Always declare reusable variables (like `const tempDir = new THREE.Vector3()`) outside of animation loops and update them in place (e.g., `.subVectors().normalize()`).
