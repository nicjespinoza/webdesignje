## 2026-04-11 - Optimize Firestore Queries
**Learning:** Sequential `await getDocs` inside dual-read methods (`getHistories`, `getConsults`) and loop operations (`deletePatient`) can cause significant performance bottlenecks in Firebase apps. Iterating over an array of subcollections sequentially effectively multiplies the network round-trip time.
**Action:** Use `Promise.all` to parallelize independent data fetching and deletion queries. Always check `snapshot.empty` before initiating a `writeBatch` or committing to avoid redundant network calls and optimize Firestore performance.
