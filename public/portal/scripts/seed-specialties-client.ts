/**
 * Firestore Seed Script - Client SDK Version
 * 
 * Uses the Firebase Client SDK (no service account required).
 * Seeds specialty categories and specialty configs to Firestore.
 * 
 * Prerequisites:
 * - npm install firebase (already installed)
 * - A Firebase Admin user must exist with write access
 * 
 * Run with: npx tsx scripts/seed-specialties-client.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase config (same as .env)
const firebaseConfig = {
    apiKey: 'AIzaSyD6lgnGJ92lni7VseDuN_jv6aNGxIT4uEE',
    authDomain: 'web-design-je.firebaseapp.com',
    projectId: 'web-design-je',
    storageBucket: 'web-design-je.firebasestorage.app',
    messagingSenderId: '687328401053',
    appId: '1:687328401053:web:3f5d97049764fb1e5f2674',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ============================================================
// SPECIALTY CATEGORIES DATA
// ============================================================
const SPECIALTY_CATEGORIES = [
    { id: 'medicina_interna', name: 'Internal Medicine & Related', nameEs: 'Medicina Interna y Afines', icon: 'Stethoscope', color: '#3B82F6', description: 'Internal medicine specialties', descriptionEs: 'Especialidades de medicina interna', sortOrder: 1 },
    { id: 'quirurgica', name: 'Surgical Specialties', nameEs: 'Especialidades Quirúrgicas', icon: 'Scissors', color: '#EF4444', description: 'Surgical specialties', descriptionEs: 'Especialidades quirúrgicas', sortOrder: 2 },
    { id: 'medico_quirurgica', name: 'Medical-Surgical', nameEs: 'Médico-Quirúrgicas', icon: 'Activity', color: '#8B5CF6', description: 'Medical-surgical specialties', descriptionEs: 'Especialidades médico-quirúrgicas', sortOrder: 3 },
    { id: 'atencion_especializada', name: 'Specialized Care', nameEs: 'Atención Especializada', icon: 'HeartPulse', color: '#F59E0B', description: 'Specialized care', descriptionEs: 'Atención especializada', sortOrder: 4 },
    { id: 'diagnostico_apoyo', name: 'Diagnostic & Support', nameEs: 'Diagnóstico y Apoyo', icon: 'Scan', color: '#10B981', description: 'Diagnostic support', descriptionEs: 'Diagnóstico y apoyo', sortOrder: 5 },
    { id: 'odontologia', name: 'Dentistry & Oral Health', nameEs: 'Odontología y Salud Oral', icon: 'Smile', color: '#06B6D4', description: 'Dental specialties', descriptionEs: 'Especialidades odontológicas', sortOrder: 6 },
];

// ============================================================
// SPECIALTIES DATA (Summary - only metadata for Firestore catalog)
// ============================================================
const SPECIALTIES = [
    // Medicina Interna
    { id: 'cardiology', name: 'Cardiology', nameEs: 'Cardiología', category: 'medicina_interna', icon: 'Heart', color: '#DC2626', colorLight: '#FEE2E2', description: 'Heart and cardiovascular system', descriptionEs: 'Corazón y sistema cardiovascular', isActive: true, sortOrder: 1 },
    { id: 'endocrinology', name: 'Endocrinology', nameEs: 'Endocrinología', category: 'medicina_interna', icon: 'Apple', color: '#F97316', colorLight: '#FFF7ED', description: 'Hormonal and metabolic disorders', descriptionEs: 'Trastornos hormonales y metabólicos', isActive: true, sortOrder: 2 },
    { id: 'gastroenterology', name: 'Gastroenterology', nameEs: 'Gastroenterología', category: 'medicina_interna', icon: 'Droplets', color: '#22C55E', colorLight: '#F0FDF4', description: 'Digestive system', descriptionEs: 'Sistema digestivo, hígado y páncreas', isActive: true, sortOrder: 3 },
    { id: 'neurology', name: 'Neurology', nameEs: 'Neurología', category: 'medicina_interna', icon: 'Brain', color: '#A855F7', colorLight: '#FAF5FF', description: 'Nervous system', descriptionEs: 'Sistema nervioso central y periférico', isActive: true, sortOrder: 4 },
    { id: 'nephrology', name: 'Nephrology', nameEs: 'Nefrología', category: 'medicina_interna', icon: 'Droplet', color: '#3B82F6', colorLight: '#EFF6FF', description: 'Kidney diseases', descriptionEs: 'Enfermedades renales y diálisis', isActive: true, sortOrder: 5 },
    { id: 'pulmonology', name: 'Pulmonology', nameEs: 'Neumología', category: 'medicina_interna', icon: 'Wind', color: '#06B6D4', colorLight: '#ECFEFF', description: 'Respiratory diseases', descriptionEs: 'Enfermedades respiratorias y pulmonares', isActive: true, sortOrder: 6 },
    { id: 'hematology', name: 'Hematology', nameEs: 'Hematología', category: 'medicina_interna', icon: 'TestTubes', color: '#DC2626', colorLight: '#FEF2F2', description: 'Blood diseases', descriptionEs: 'Enfermedades de la sangre', isActive: true, sortOrder: 7 },
    { id: 'rheumatology', name: 'Rheumatology', nameEs: 'Reumatología', category: 'medicina_interna', icon: 'Bone', color: '#D97706', colorLight: '#FFFBEB', description: 'Autoimmune and joint diseases', descriptionEs: 'Enfermedades autoinmunes y articulares', isActive: true, sortOrder: 8 },
    { id: 'infectology', name: 'Infectology', nameEs: 'Infectología', category: 'medicina_interna', icon: 'Bug', color: '#059669', colorLight: '#ECFDF5', description: 'Infectious diseases', descriptionEs: 'Enfermedades infecciosas', isActive: true, sortOrder: 9 },
    // Quirúrgicas
    { id: 'general_surgery', name: 'General Surgery', nameEs: 'Cirugía General', category: 'quirurgica', icon: 'Scissors', color: '#8B5CF6', colorLight: '#F5F3FF', description: 'General surgical procedures', descriptionEs: 'Procedimientos quirúrgicos generales', isActive: true, sortOrder: 10 },
    { id: 'orthopedics', name: 'Orthopedics', nameEs: 'Ortopedia y Traumatología', category: 'quirurgica', icon: 'Bone', color: '#6366F1', colorLight: '#EEF2FF', description: 'Musculoskeletal system', descriptionEs: 'Sistema musculoesquelético', isActive: true, sortOrder: 11 },
    // Médico-Quirúrgicas
    { id: 'gynecology', name: 'Gynecology', nameEs: 'Ginecología y Obstetricia', category: 'medico_quirurgica', icon: 'HeartPulse', color: '#EC4899', colorLight: '#FDF2F8', description: 'Women\'s health', descriptionEs: 'Salud femenina y reproducción', isActive: true, sortOrder: 12 },
    { id: 'ophthalmology', name: 'Ophthalmology', nameEs: 'Oftalmología', category: 'medico_quirurgica', icon: 'Eye', color: '#14B8A6', colorLight: '#F0FDFA', description: 'Eye diseases', descriptionEs: 'Enfermedades de los ojos', isActive: true, sortOrder: 13 },
    { id: 'dermatology', name: 'Dermatology', nameEs: 'Dermatología', category: 'medico_quirurgica', icon: 'Fingerprint', color: '#F472B6', colorLight: '#FDF2F8', description: 'Skin, hair and nails', descriptionEs: 'Piel, cabello y uñas', isActive: true, sortOrder: 14 },
    { id: 'urology', name: 'Urology', nameEs: 'Urología', category: 'medico_quirurgica', icon: 'Droplet', color: '#0EA5E9', colorLight: '#F0F9FF', description: 'Urinary and male reproductive', descriptionEs: 'Sistema urinario y reproductor masculino', isActive: true, sortOrder: 15 },
    { id: 'otolaryngology', name: 'Otolaryngology', nameEs: 'Otorrinolaringología', category: 'medico_quirurgica', icon: 'Ear', color: '#6366F1', colorLight: '#EEF2FF', description: 'Ear, nose and throat', descriptionEs: 'Oído, nariz y garganta', isActive: true, sortOrder: 16 },
    // Atención Especializada
    { id: 'pediatrics', name: 'Pediatrics', nameEs: 'Pediatría', category: 'atencion_especializada', icon: 'Baby', color: '#3B82F6', colorLight: '#EFF6FF', description: 'Child and adolescent care', descriptionEs: 'Atención infantil y adolescente', isActive: true, sortOrder: 17 },
    { id: 'psychiatry', name: 'Psychiatry', nameEs: 'Psiquiatría', category: 'atencion_especializada', icon: 'Brain', color: '#8B5CF6', colorLight: '#F5F3FF', description: 'Mental health', descriptionEs: 'Salud mental y trastornos psiquiátricos', isActive: true, sortOrder: 18 },
    { id: 'geriatrics', name: 'Geriatrics', nameEs: 'Geriatría', category: 'atencion_especializada', icon: 'Heart', color: '#F59E0B', colorLight: '#FFFBEB', description: 'Elderly care', descriptionEs: 'Atención del adulto mayor', isActive: true, sortOrder: 19 },
    // Diagnóstico y Apoyo
    { id: 'oncology', name: 'Oncology', nameEs: 'Oncología', category: 'diagnostico_apoyo', icon: 'Ribbon', color: '#EC4899', colorLight: '#FDF2F8', description: 'Cancer diagnosis and treatment', descriptionEs: 'Diagnóstico y tratamiento del cáncer', isActive: true, sortOrder: 20 },
    // Odontología
    { id: 'orthodontics', name: 'Orthodontics', nameEs: 'Ortodoncia', category: 'odontologia', icon: 'Smile', color: '#06B6D4', colorLight: '#ECFEFF', description: 'Dental alignment', descriptionEs: 'Alineación dental y corrección de mordida', isActive: true, sortOrder: 21 },
    { id: 'endodontics', name: 'Endodontics', nameEs: 'Endodoncia', category: 'odontologia', icon: 'Zap', color: '#F97316', colorLight: '#FFF7ED', description: 'Root canal treatment', descriptionEs: 'Tratamiento de conductos radiculares', isActive: true, sortOrder: 22 },
    { id: 'periodontics', name: 'Periodontics', nameEs: 'Periodoncia', category: 'odontologia', icon: 'Layers', color: '#16A34A', colorLight: '#F0FDF4', description: 'Gum diseases', descriptionEs: 'Enfermedades de encías y tejidos de soporte', isActive: true, sortOrder: 23 },
    { id: 'pediatric_dentistry', name: 'Pediatric Dentistry', nameEs: 'Odontopediatría', category: 'odontologia', icon: 'Baby', color: '#FBBF24', colorLight: '#FFFBEB', description: 'Children dental care', descriptionEs: 'Cuidado dental para niños', isActive: true, sortOrder: 24 },
    { id: 'prosthodontics', name: 'Prosthodontics', nameEs: 'Prostodoncia', category: 'odontologia', icon: 'Component', color: '#A855F7', colorLight: '#FAF5FF', description: 'Dental prosthetics', descriptionEs: 'Prótesis dentales y rehabilitación oral', isActive: true, sortOrder: 25 },
    { id: 'maxillofacial_surgery', name: 'Maxillofacial Surgery', nameEs: 'Cirugía Maxilofacial', category: 'odontologia', icon: 'Scissors', color: '#DC2626', colorLight: '#FEF2F2', description: 'Jaw and face surgery', descriptionEs: 'Cirugía de maxilares y cara', isActive: true, sortOrder: 26 },
    { id: 'implantology', name: 'Implantology', nameEs: 'Implantología Dental', category: 'odontologia', icon: 'Pin', color: '#6366F1', colorLight: '#EEF2FF', description: 'Dental implants', descriptionEs: 'Implantes dentales', isActive: true, sortOrder: 27 },
    { id: 'cosmetic_dentistry', name: 'Cosmetic Dentistry', nameEs: 'Odontología Estética', category: 'odontologia', icon: 'Sparkles', color: '#EC4899', colorLight: '#FDF2F8', description: 'Cosmetic dental procedures', descriptionEs: 'Diseño de sonrisa y estética dental', isActive: true, sortOrder: 28 },
];

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function seed() {
    console.log('🔐 Autenticando...');
    console.log('   Email y contraseña se piden como argumentos:');
    console.log('   npx tsx scripts/seed-specialties-client.ts <email> <password>\n');

    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error('❌ Uso: npx tsx scripts/seed-specialties-client.ts <email> <password>');
        console.error('   Usa un usuario admin existente en Firebase Auth.');
        process.exit(1);
    }

    try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        console.log(`✅ Autenticado como: ${credential.user.email}\n`);
    } catch (err: any) {
        console.error(`❌ Error de autenticación: ${err.message}`);
        process.exit(1);
    }

    const now = Timestamp.now();
    let count = 0;

    // ---- Seed Categories (one by one, batches can fail with client SDK limits) ----
    console.log('📁 Publicando categorías de especialidades...');
    for (const cat of SPECIALTY_CATEGORIES) {
        await setDoc(doc(db, 'specialtyCategories', cat.id), {
            ...cat,
            createdAt: now,
            updatedAt: now,
        });
        count++;
        console.log(`  ✅ ${cat.nameEs}`);
    }

    // ---- Seed Specialties in batches of 10 ----
    console.log('\n🏥 Publicando especialidades...');
    const BATCH_SIZE = 10;
    for (let i = 0; i < SPECIALTIES.length; i += BATCH_SIZE) {
        const chunk = SPECIALTIES.slice(i, i + BATCH_SIZE);
        const batch = writeBatch(db);
        for (const spec of chunk) {
            const ref = doc(db, 'specialties', spec.id);
            batch.set(ref, {
                ...spec,
                categoryLabel: SPECIALTY_CATEGORIES.find(c => c.id === spec.category)?.name || '',
                categoryLabelEs: SPECIALTY_CATEGORIES.find(c => c.id === spec.category)?.nameEs || '',
                createdAt: now,
                updatedAt: now,
            });
            count++;
            console.log(`  ✅ ${spec.nameEs} (${spec.category})`);
        }
        await batch.commit();
    }

    console.log(`\n✅ Publicados ${count} documentos exitosamente!`);
    console.log(`   - ${SPECIALTY_CATEGORIES.length} categorías`);
    console.log(`   - ${SPECIALTIES.length} especialidades`);
}

seed()
    .then(() => {
        console.log('\n🎉 Seed completo!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Seed falló:', error);
        process.exit(1);
    });
