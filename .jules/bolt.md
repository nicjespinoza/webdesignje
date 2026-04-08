## 2024-03-24 - Firestore Batch Deletion Optimization
**Learning:** Sequential `await` in loops for Firestore bulk operations (e.g., iterating through subcollections to delete documents) introduces unnecessary latency. Also, committing an empty `writeBatch` can cause unnecessary network calls or errors.
**Action:** Use `Promise.all` to parallelize independent data fetching/batch commitments, and explicitly check `snapshot.empty` before executing `batch.commit()`.
