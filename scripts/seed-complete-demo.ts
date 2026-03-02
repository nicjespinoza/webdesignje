
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize directly here to avoid module resolution issues
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const NAMES = ["Juan", "María", "Carlos", "Ana", "Luis", "Elena", "Pedro", "Sofía", "Miguel", "Lucía", "José", "Carmen", "David", "Laura", "Javier", "Isabel", "Francisco", "Marta", "Alejandro", "Paula"];
const LASTNAMES = ["García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez"];

const GYNECOLOGY_DATA = {
    reasons: ["Control prenatal", "Citología anual", "Dolor pélvico", "Irregularidad menstrual", "Planificación familiar", "Infección vaginal", "Consulta preconcepcional", "Revisión postparto"],
    diagnoses: ["Embarazo normal", "Cervicitis", "Síndrome de ovario poliquístico", "Vaginosis bacteriana", "Amenorrea secundaria", "Dismenorrea", "Miomatosis uterina", "Mastopatía fibroquística"]
};

function getRandomItem<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]!;
}

function getRandomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seed() {
    console.log("🚀 Starting database seeding (Ginecología Mock)...");

    try {
        // 1. Authenticate as admin/doctor to write data
        console.log("Authenticating as 'dr@je.com'...");
        let currentUser;
        try {
            // Try to login
            const userCred = await signInWithEmailAndPassword(auth, "dr@je.com", "123456");
            currentUser = userCred.user;
            console.log("Logged in successfully.");
        } catch (error: unknown) {
            const errorCode = typeof error === 'object' && error !== null && 'code' in error
                ? (error as { code?: unknown }).code
                : undefined;

            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-credential') {
                console.log("User not found, creating new doctor user...");
                const userCred = await createUserWithEmailAndPassword(auth, "dr@je.com", "123456");
                currentUser = userCred.user;
                // Set doctor role and specialty
                await setDoc(doc(db, "users", currentUser.uid), {
                    name: "Dr. Demo",
                    email: "dr@je.com",
                    role: "doctor",
                    specialty: "Ginecología",
                    createdAt: serverTimestamp()
                });
                console.log("Created user and doctor profile.");
            } else {
                throw error;
            }
        }

        if (!currentUser) throw new Error("Authentication failed");

        // 2. Create 100 Patients
        console.log("Creating 100 patients with specialty data...");

        for (let i = 0; i < 100; i++) {
            const firstName = getRandomItem(NAMES);
            const lastName = getRandomItem(LASTNAMES) + " " + getRandomItem(LASTNAMES);
            const email = `${firstName.toLowerCase()}.${lastName.split(" ")[0].toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const birthDate = getRandomDate(new Date(1980, 0, 1), new Date(2005, 0, 1)); // Mostly reproductive age for Gyn demo

            const isActive = Math.random() > 0.2; // 80% active

            const patientData = {
                firstName,
                lastName,
                email,
                phone: `+505 ${Math.floor(Math.random() * 80000000) + 10000000}`,
                birthDate: Timestamp.fromDate(birthDate),
                gender: "Female", // Gyn demo -> mostly female
                createdAt: serverTimestamp(),
                registrationStatus: isActive ? "Activo" : "Pendiente",
                address: "Managua, Nicaragua",
                bloodType: getRandomItem(["A+", "O+", "B+", "AB+", "O-", "A-"]),
                specialty: "Ginecología",
                doctorId: currentUser.uid,
                // Extra fields
                medicalHistory: {
                    allergies: Math.random() > 0.8 ? "Latex" : "Ninguna",
                    chronicConditions: Math.random() > 0.9 ? "Diabetes Gestacional previa" : "Ninguna",
                },
                createdBy: currentUser.uid
            };

            const patientRef = await addDoc(collection(db, "patients"), patientData);

            if (i % 10 === 0) console.log(`Created patient ${i + 1}/100: ${firstName} ${lastName}`);

            // 3. Create Subcollections/Related Data

            // A) Appointments (Agenda)
            if (isActive) {
                const appointmentDate = getRandomDate(new Date(2026, 1, 1), new Date(2026, 2, 30));
                await addDoc(collection(db, "appointments"), {
                    patientId: patientRef.id,
                    patientName: `${firstName} ${lastName}`,
                    doctorId: currentUser.uid,
                    date: Timestamp.fromDate(appointmentDate),
                    status: getRandomItem(["confirmed", "pending", "completed"]),
                    type: getRandomItem(["Presencial", "Virtual"]),
                    reason: getRandomItem(GYNECOLOGY_DATA.reasons)
                });
            }

            // B) Clinical History / Consultas Subsecuentes
            if (Math.random() > 0.4) {
                const consultDate = getRandomDate(new Date(2025, 0, 1), new Date());
                await addDoc(collection(db, `patients/${patientRef.id}/consults`), {
                    date: Timestamp.fromDate(consultDate),
                    reason: getRandomItem(GYNECOLOGY_DATA.reasons),
                    diagnosis: getRandomItem(GYNECOLOGY_DATA.diagnoses),
                    prescription: "Seguimiento en 6 meses.",
                    notes: "Paciente asintomática, revisión normal.",
                    doctorId: currentUser.uid
                });
            }

            // C) Chat Message (Mock)
            if (Math.random() > 0.85) {
                const chatRef = await addDoc(collection(db, "chats"), {
                    participants: [currentUser.uid, patientRef.id],
                    metadata: { authUid: currentUser.uid },
                    lastMessage: "Gracias doctora",
                    updatedAt: serverTimestamp()
                });
                // Add message
                await addDoc(collection(db, `chats/${chatRef.id}/messages`), {
                    text: `Hola doctora, tengo una duda sobre mi cita.`,
                    senderId: patientRef.id, // Simulated patient ID
                    createdAt: serverTimestamp()
                });
            }
        }

        console.log("✅ Seeding completed successfully! 100 Gynaecology patients created.");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seed();
