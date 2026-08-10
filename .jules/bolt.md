## 2025-05-24 - Math.sqrt replacement with squared distance
**Learning:** Found an opportunity to replace `Math.sqrt` with squared distance calculations (`dx*dx + dy*dy < threshold * threshold`) inside frequent animation loops (like `requestAnimationFrame` in canvas components) to reduce CPU usage.
**Action:** When calculating distance for collision, connection or threshold checking inside a hot loop, use squared distances instead of calling `Math.sqrt`.
