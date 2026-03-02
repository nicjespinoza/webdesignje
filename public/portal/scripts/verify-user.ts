/**
 * Quick verification: sign in and check Firestore user doc
 * Run: npx tsx scripts/verify-user.ts
 */
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const app = initializeApp({
    apiKey: 'AIzaSyD6lgnGJ92lni7VseDuN_jv6aNGxIT4uEE',
    authDomain: 'web-design-je.firebaseapp.com',
    projectId: 'web-design-je',
    storageBucket: 'web-design-je.firebasestorage.app',
    messagingSenderId: '687328401053',
    appId: '1:687328401053:web:3f5d97049764fb1e5f2674',
});

const auth = getAuth(app);
const db = getFirestore(app);

async function verify() {
    const cred = await signInWithEmailAndPassword(auth, 'dra@je.com', '123456');
    console.log('UID:', cred.user.uid);
    console.log('Email:', cred.user.email);
    console.log('Display:', cred.user.displayName);
    console.log('Custom claims:', JSON.stringify(cred.user.toJSON()));

    const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
    if (userDoc.exists()) {
        console.log('\nFirestore user doc:', JSON.stringify(userDoc.data(), null, 2));
    } else {
        console.log('\n❌ No Firestore user doc found!');
    }
}

verify().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
