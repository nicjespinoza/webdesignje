## 2024-05-19 - Parallelize Firestore dual-read strategies
**Learning:** In a codebase implementing dual-read strategies (e.g., reading from subcollections and root collections for backward compatibility), sequentially awaiting `getDocs` calls introduces a performance bottleneck because the network requests don't depend on each other.
**Action:** Use `Promise.all` to fetch data from multiple Firestore collections or queries concurrently when their results are independent and will just be merged together.
