## 2024-05-18 - Avoid Math.sqrt() in Canvas high-frequency loops
**Learning:** Found multiple instances where `Math.sqrt()` was used unconditionally for distance calculation inside `requestAnimationFrame` canvas loops, even for objects that were out of range.
**Action:** When calculating distance in high-frequency animation loops, always use a squared distance check (`dx*dx + dy*dy < threshold*threshold`) to quickly exclude elements before performing the expensive `Math.sqrt()` operation, saving CPU cycles and maintaining stable 60 FPS in dense particle systems.
