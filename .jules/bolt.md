## 2025-05-18 - Parallelize Independent Firestore Queries
**Learning:** `getHistories` and `getConsults` perform dual-read strategy reading from subcollection and root collection sequentially which is an unnecessary sequential dependency causing slower reads.
**Action:** Use `Promise.all` to fetch `subDocs` and `rootDocs` concurrently when retrieving histories and consults to reduce overall network latency.
