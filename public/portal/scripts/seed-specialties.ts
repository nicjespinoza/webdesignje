/**
 * Firestore Seed Script - Populate specialties collection
 * 
 * Run with: npx ts-node scripts/seed-specialties.ts
 * 
 * This script uploads all specialty configurations to Firestore
 * so the app can dynamically load form configs per specialty.
 */

import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin with service account
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');

try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'web-design-je',
    });
} catch (error) {
    console.error('❌ Error: serviceAccountKey.json not found at', serviceAccountPath);
    console.log('📋 To generate it:');
    console.log('   1. Go to Firebase Console → Project Settings → Service Accounts');
    console.log('   2. Click "Generate new private key"');
    console.log('   3. Save as serviceAccountKey.json in the project root');
    process.exit(1);
}

const db = admin.firestore();

// Import all specialty configs 
// NOTE: These are TypeScript files; ensure ts-node is installed
import { SPECIALTY_REGISTRY } from '../src/lib/specialties/registry';
import { SPECIALTY_CATEGORIES } from '../src/types/specialty';

async function seedSpecialties() {
    console.log('🚀 Starting specialty seed...\n');

    const batch = db.batch();
    let count = 0;

    // Seed specialty categories
    console.log('📁 Seeding specialty categories...');
    for (const category of SPECIALTY_CATEGORIES) {
        const ref = db.collection('specialtyCategories').doc(category.id);
        batch.set(ref, {
            ...category,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        count++;
        console.log(`  ✅ ${category.nameEs}`);
    }

    // Seed specialties
    console.log('\n🏥 Seeding specialties...');
    for (const specialty of SPECIALTY_REGISTRY) {
        const ref = db.collection('specialties').doc(specialty.id);
        batch.set(ref, {
            ...specialty,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        count++;
        console.log(`  ✅ ${specialty.nameEs} (${specialty.category})`);
    }

    // Commit batch
    console.log(`\n📦 Committing ${count} documents...`);
    await batch.commit();

    console.log(`\n✅ Successfully seeded ${count} documents!`);
    console.log(`   - ${SPECIALTY_CATEGORIES.length} categories`);
    console.log(`   - ${SPECIALTY_REGISTRY.length} specialties`);
}

seedSpecialties()
    .then(() => {
        console.log('\n🎉 Seed complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Seed failed:', error);
        process.exit(1);
    });
