## 2024-05-24 - Parallelize independent data fetching
**Learning:** Sequential `await getDocs()` calls for subcollections and root collections during dual-read migrations can cause performance bottlenecks in Firestore interactions.
**Action:** Always consider using `Promise.all` to parallelize independent data fetching (e.g. `getDocs` calls) when querying multiple collections to optimize Firestore network latency.
