## 2024-03-24 - [Code-splitting heavy 3D components]
**Learning:** Synchronously importing Three.js and React Three Fiber components can massively bloat the initial JavaScript bundle size, causing slow loading times and large chunk warnings in Vite.
**Action:** Always lazy load heavy 3D scenes (like `Scene3D`) using `React.lazy` and `React.Suspense`. This defers loading the large Three.js dependencies until they are needed and splits them into a separate bundle chunk.
