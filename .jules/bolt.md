## 2024-05-20 - Optimize Firestore bulk operations
**Learning:** Using sequential `await getDocs` in loops significantly degrades performance. Empty `writeBatch` commits also create unnecessary network overhead.
**Action:** Always use `Promise.all` for parallel independent queries and wrap `writeBatch` commits in `!snapshot.empty` checks to avoid redundant network calls.
