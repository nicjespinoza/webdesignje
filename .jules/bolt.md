
## 2024-05-18 - [Parallelize Dual-Read Firestore Queries]
**Learning:** The dual-read strategy for migrated data creates a network waterfall (sequential `getDocs`), increasing latency by roughly 2x the RTT to Firestore.
**Action:** Always use `Promise.all` to run independent `getDocs` operations concurrently, especially when querying multiple collections for a combined logical entity.
