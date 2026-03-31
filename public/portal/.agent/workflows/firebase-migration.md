---
description: Migration to web-design-je Firebase project with multi-specialty support
---

# Firebase Migration to web-design-je

## Steps

1. Update `.env` with new Firebase credentials (Vite app)
2. Create `medical-ai-demo/.env.local` with Next.js credentials
3. Update `.firebaserc` to point to `web-design-je`
4. Update `firebase.json` hosting configuration
5. Expand `firestore.rules` for multi-specialty (specialties, clinics collections)
6. Update `firestore.indexes.json` with new indexes
7. Create specialty type definitions in `src/types/specialty.ts`
8. Create specialty registry with all 30+ specialties configurations
9. Create Firestore seed script for specialties collection
10. Update `storage.rules` if needed
11. Test Firebase connection
