/**
 * Create or Re-sync Firebase Auth users + Firestore profiles
 * Handles both new and existing users gracefully.
 * 
 * Run: npx tsx scripts/create-users.ts
 */

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD6lgnGJ92lni7VseDuN_jv6aNGxIT4uEE',
    authDomain: 'web-design-je.firebaseapp.com',
    projectId: 'web-design-je',
    storageBucket: 'web-design-je.firebasestorage.app',
    messagingSenderId: '687328401053',
    appId: '1:687328401053:web:3f5d97049764fb1e5f2674',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

interface UserToCreate {
    email: string;
    password: string;
    displayName: string;
    role: 'admin' | 'doctor' | 'assistant';
}

const USERS: UserToCreate[] = [
    {
        email: 'dra@je.com',
        password: '123456',
        displayName: 'Dra. Espinoza',
        role: 'admin',
    },
    {
        email: 'dr@je.com',
        password: '123456',
        displayName: 'Dr. Espinoza',
        role: 'admin',
    },
    {
        email: 'asistente@je.com',
        password: '123456',
        displayName: 'Asistente JE',
        role: 'assistant',
    },
];

async function createUsers() {
    console.log('🚀 Creando/sincronizando usuarios en Firebase Auth + Firestore...\n');

    for (const user of USERS) {
        let uid: string;

        try {
            // Try creating a new user
            const credential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            uid = credential.user.uid;

            await updateProfile(credential.user, {
                displayName: user.displayName,
            });
            console.log(`  🆕 ${user.email} creado en Auth — UID: ${uid}`);
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                // User exists in Auth, sign in to get UID
                try {
                    const credential = await signInWithEmailAndPassword(auth, user.email, user.password);
                    uid = credential.user.uid;
                    console.log(`  ♻️  ${user.email} ya existe en Auth — UID: ${uid}`);
                } catch (signInErr: any) {
                    console.error(`  ❌ ${user.email} — No se pudo iniciar sesión: ${signInErr.message}`);
                    continue;
                }
            } else {
                console.error(`  ❌ ${user.email} — Error creando: ${err.message}`);
                continue;
            }
        }

        // Create/update Firestore profile
        try {
            const now = Timestamp.now();
            await setDoc(doc(db, 'users', uid), {
                email: user.email,
                name: user.displayName,
                role: user.role,
                isActive: true,
                createdAt: now,
                updatedAt: now,
                lastLogin: now,
            }, { merge: true });
            console.log(`  📄 Perfil Firestore OK para ${user.email} (${user.role})`);
        } catch (fsErr: any) {
            console.error(`  ❌ Firestore falló para ${user.email}: ${fsErr.message}`);
        }
    }
}

createUsers()
    .then(() => {
        console.log('\n🎉 Proceso completado!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Error:', error);
        process.exit(1);
    });
