## 2024-06-14 - Mobile Toggle Menu A11y

**Learning:** Mobile toggle menus controlled by Framer Motion `AnimatePresence` need explicit accessibility labels dynamically changing with the toggle state to announce actions to screen readers, plus linking `aria-controls` to the conditional `motion.div`.

**Action:** Whenever adding state-based toggles (especially for offcanvas/mobile menus), ensure `aria-expanded` tracks state, `aria-label` updates between open/close translations, and `aria-controls` explicitly ties the button to the revealed container's ID.
