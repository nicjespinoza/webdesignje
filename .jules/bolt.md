## 2024-05-21 - [Optmize distance formulas]
**Learning:** Math.sqrt() logic in graphic-intensive code creates performance degradation. Using squared distance and deferring square roots until conditions are met is a classic rendering optimization that fits the codebase.
**Action:** Always refactor distance checks within rendering or 3D loops to use square distances.
