## 2024-05-24 - Parallelizing Firestore reads in dual-read strategy
**Learning:** Sequential `await getDocs()` calls when querying multiple collections (like a new subcollection and a legacy root collection) introduce unnecessary latency. Same for looping over patients and making queries sequentially.
**Action:** Use `Promise.all` to fetch independent collections concurrently, significantly reducing data loading times. Use `Promise.all` when running queries for a list of items rather than sequential iteration.
