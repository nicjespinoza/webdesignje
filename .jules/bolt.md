## 2024-08-06 - Object Instantiation in `useFrame`
**Learning:** Found instances where `new THREE.Vector3()` is instantiated inside `useFrame` (e.g. `const dir = new THREE.Vector3().subVectors(agent.dest, agent.pos).normalize();`). This creates objects 60 times a second and causes garbage collection pauses.
**Action:** Move instantiation of temporary objects like `THREE.Vector3` to outside `useFrame` (e.g. `const tempDir = new THREE.Vector3();`) or use `useMemo` so it can be reused without creating new instances every frame.
