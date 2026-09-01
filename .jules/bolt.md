## 2024-05-24 - Three.js `useFrame` garbage collection optimization
**Learning:** Instantiating new objects (like `new THREE.Vector3()`) inside high-frequency animation loops (like `useFrame`) causes excessive garbage collection and framerate drops.
**Action:** Reuse pre-allocated objects by modifying them in place (e.g. `const tempVec = new THREE.Vector3();` outside the loop, then `tempVec.subVectors(...)` inside).
