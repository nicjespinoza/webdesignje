## 2024-05-07 - [Firestore Dual-Read Optimization]
**Learning:** Performing sequential `getDocs` requests for data migrations (dual reads from subcollections and root collections) blocks the event loop unnecessarily, leading to slower read times for components rendering lists.
**Action:** Always use `Promise.all` to parallelize independent Firestore `getDocs` or `getDoc` calls when aggregating data from multiple locations or implementing dual-read strategies.
