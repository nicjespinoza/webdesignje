// ============================================================
// Configuración de Firebase
// Servicios: Auth (autenticación), Firestore (base de datos),
//            Storage (archivos/imágenes)
// Las credenciales se leen de variables de entorno (.env.local)
//
// NOTA: La inicialización está envuelta en try-catch para que
// el build de Next.js no falle cuando no hay .env.local
// (por ejemplo en CI/CD o primera configuración).
// En runtime (navegador), las env vars DEBEN estar presentes.
// ============================================================

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Configuración usando variables de entorno públicas de Next.js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase de forma segura (resiliente a env vars faltantes)
let app: FirebaseApp | undefined;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  // Durante el build estático de Next.js, las env vars pueden no existir.
  // Esto permite que el build termine correctamente.
  // En runtime (navegador), Firebase se inicializará correctamente
  // siempre que .env.local tenga las credenciales.
  console.warn("Firebase: inicialización omitida (config no disponible)");
  auth = {} as Auth;
  db = {} as Firestore;
  storage = {} as FirebaseStorage;
}

export { auth, db, storage };
export default app;
