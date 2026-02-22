
import { db, auth, storage } from '@/lib/firebase';
import {
    collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where,
    onSnapshot, orderBy, limit, deleteDoc, writeBatch, Timestamp,
    runTransaction,
    Unsubscribe
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { Patient, InitialHistory, SubsequentConsult, Appointment, CheckboxData } from '@/types';
import { firestoreCache, compressImage, PAGE_SIZES, persistToStorage, getFromStorage } from '@/lib/cache';
import { logPatientAction, logHistoryAction, logAudit } from '@/lib/audit';
import { offlineQueue } from '@/lib/offlineQueue';

// Helper to convert Firestore doc to typed object
export const docToData = <T>(doc: any): T => {
    return { id: doc.id, ...doc.data() } as T;
};

export const api = {
    // ==================== PATIENTS ====================

    /**
     * Get all patients (CACHED - 5 min TTL)
     * Use for dropdowns, autocomplete, etc.
     */
    getPatients: async (): Promise<Patient[]> => {
        return firestoreCache.getOrFetch(
            'patients:all_v4', // Cache busted
            async () => {
                // No orderBy = no index needed = faster cold start
                const snapshot = await getDocs(collection(db, 'patients'));
                const data = snapshot.docs.map(d => docToData<Patient>(d));
                // Sort client-side (instant for <1000 docs)
                data.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                return data;
            },
            15 * 60 * 1000
        );
    },

    /**
     * Get a single patient by ID
     */
    getPatient: async (id: string): Promise<Patient> => {
        const docRef = doc(db, 'patients', id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
            throw new Error(`Patient with ID ${id} not found`);
        }
        return docToData<Patient>(snapshot);
    },

    /**
     * Subscribe to patients updates (REAL-TIME)
     * @param onUpdate - Callback function receiving the updated list of patients
     * @returns Unsubscribe function
     */
    subscribeToPatients: (onUpdate: (patients: Patient[]) => void): Unsubscribe => {
        return onSnapshot(collection(db, 'patients'), (snapshot) => {
            const patients = snapshot.docs.map(d => docToData<Patient>(d));
            patients.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
            // Update cache silently to keep it fresh
            firestoreCache.set('patients:all_v4', patients, 15 * 60 * 1000);
            onUpdate(patients);
        }, (error) => {
            console.error("Error subscribing to patients:", error);
        });
    },

    /**
     * Create a new patient
     * Updates cache and logs audit
     */
    createPatient: async (patient: Omit<Patient, 'id'>): Promise<string> => {
        try {
            // Check for duplicates locally first (fast)
            const cachedPatients = await api.getPatients();
            const exists = cachedPatients.some(p => p.email === patient.email || p.id === patient.email);
            if (exists) {
                console.warn(`Patient with email ${patient.email} already exists (cache check).`);
                // Proceed anyway, Firestore rule or backend will catch it if critical
            }

            const docRef = await addDoc(collection(db, 'patients'), {
                ...patient,
                createdAt: new Date().toISOString(),
                registrationSource: 'manual'
            });

            // Update cache manually to avoid re-fetch
            const newPatient = { id: docRef.id, ...patient, createdAt: new Date().toISOString() } as Patient;
            cachedPatients.unshift(newPatient); // Add to top
            firestoreCache.set('patients:all_v4', cachedPatients);

            // Audit
            await logPatientAction('create', docRef.id, `Created patient ${patient.firstName} ${patient.lastName}`);

            return docRef.id;
        } catch (error) {
            console.error("Error creating patient:", error);
            // Offline fallback
            offlineQueue.enqueueAction('CREATE_PATIENT', patient, auth.currentUser?.email || null);
            throw error;
        }
    },

    /**
     * Update an existing patient
     */
    updatePatient: async (id: string, data: Partial<Patient>): Promise<void> => {
        try {
            await updateDoc(doc(db, 'patients', id), data);

            // Update cache
            const cachedPatients = await api.getPatients();
            const index = cachedPatients.findIndex(p => p.id === id);
            if (index !== -1) {
                cachedPatients[index] = { ...cachedPatients[index], ...data };
                firestoreCache.set('patients:all_v4', cachedPatients);
            }

            await logPatientAction('update', id, `Updated fields: ${Object.keys(data).join(', ')}`);
        } catch (error) {
            console.error("Error updating patient:", error);
            offlineQueue.enqueueAction('UPDATE_PATIENT', { id, data }, auth.currentUser?.email || null);
            throw error;
        }
    },

    /**
     * Delete a patient (Soft delete or Hard delete depending on impl)
     */
    deletePatient: async (id: string): Promise<void> => {
        try {
            await deleteDoc(doc(db, 'patients', id));
            firestoreCache.invalidate('patients:all_v4');
            await logPatientAction('delete', id, 'Deleted patient');
        } catch (error) {
            console.error("Error deleting patient:", error);
            throw error;
        }
    },

    // ==================== PATIENT IMAGES ====================

    uploadPatientImage: async (patientId: string, file: File): Promise<string> => {
        try {
            const compressedFile = await compressImage(file);
            const storageRef = ref(storage, `patients/${patientId}/profile_${Date.now()}.webp`);
            const snapshot = await uploadBytes(storageRef, compressedFile);
            const url = await getDownloadURL(snapshot.ref);

            await api.updatePatient(patientId, { profileImage: url });
            return url;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    },

    deletePatientImage: async (patientId: string, imageUrl: string): Promise<void> => {
        // Implementation TODO: Parse URL to get storage ref
        // For now just update patient record
        await api.updatePatient(patientId, { profileImage: '' });
    },


    // ==================== HISTORIES (Subcollection & Root Fallback) ====================
    getHistories: async (patientId?: string): Promise<InitialHistory[]> => {
        if (patientId) {
            // 1. Try Subcollection (New App)
            const subColRef = collection(db, 'patients', patientId, 'histories');
            const subSnapshot = await getDocs(subColRef);
            const subDocs = subSnapshot.docs.map(doc => docToData<InitialHistory>(doc));

            // 2. Try Root Collection (Migrated Data)
            const rootColRef = query(collection(db, 'initialHistories'), where('patientId', '==', patientId));
            const rootSnapshot = await getDocs(rootColRef);
            const rootDocs = rootSnapshot.docs.map(doc => docToData<InitialHistory>(doc));

            // Combine and sort by date descending
            const combined = [...subDocs, ...rootDocs].sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            // Deduplicate by ID (prefer subcollection version if exists)
            const unique = new Map();
            combined.forEach(h => {
                if (!unique.has(h.id)) unique.set(h.id, h);
            });

            return Array.from(unique.values());
        }

        // Fallback: Get ALL (Admin/Stats usage) - Only from root for now or loop all patients (expensive)
        const q = query(collection(db, 'initialHistories'), orderBy('date', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => docToData<InitialHistory>(doc));
    },

    createHistory: async (history: InitialHistory): Promise<void> => {
        try {
            if (!history.id) {
                history.id = doc(collection(db, 'initialHistories')).id;
            }
            // 1. Save to subcollection (Primary)
            const subColRef = doc(db, 'patients', history.patientId, 'histories', history.id);
            await Common.setDoc(subColRef, history);

            // 2. Save/Update Root Collection (Backup/Compatibility)
            const rootDocRef = doc(db, 'initialHistories', history.id);
            await Common.setDoc(rootDocRef, history);

            // 3. Update Patient's last interaction/reason if needed
            // await api.updatePatient(history.patientId, { lastHistoryDate: history.date });

            await logHistoryAction('create', history.id, history.patientId, 'Created initial history');
            firestoreCache.invalidatePattern(`histories:${history.patientId}`);
        } catch (error) {
            console.error("Error creating history:", error);
            offlineQueue.enqueueAction('CREATE_HISTORY', history, auth.currentUser?.email || null);
            throw error;
        }
    },

    updateHistory: async (id: string, data: Partial<InitialHistory>, patientId: string): Promise<void> => {
        try {
            // Update Subcollection
            const subColRef = doc(db, 'patients', patientId, 'histories', id);
            await Common.updateDoc(subColRef, data);

            // Update Root Collection
            const rootDocRef = doc(db, 'initialHistories', id);
            await Common.updateDoc(rootDocRef, data); // Might fail if doesn't exist in root, wrap in try-catch or use set({merge:true})

            await logHistoryAction('update', id, patientId, 'Updated history');
            firestoreCache.invalidatePattern(`histories:${patientId}`);
        } catch (error) {
            // Fallback for root collection only if subcollection failed (e.g. migration issue)
            try {
                const rootDocRef = doc(db, 'initialHistories', id);
                await updateDoc(rootDocRef, data);
            } catch (e2) {
                console.error("Error updating history (both locations):", error);
                offlineQueue.enqueueAction('UPDATE_HISTORY', { id, data, patientId }, auth.currentUser?.email || null);
                throw error;
            }
        }
    },

    deleteHistory: async (id: string, patientId: string): Promise<void> => {
        await deleteDoc(doc(db, 'patients', patientId, 'histories', id));
        await deleteDoc(doc(db, 'initialHistories', id));
        await logHistoryAction('delete', id, patientId, 'Deleted history');
    },

    // ==================== SUBSEQUENT CONSULTS ====================

    getConsults: async (patientId: string): Promise<SubsequentConsult[]> => {
        // Similar dual-read strategy as Histories
        const subColRef = collection(db, 'patients', patientId, 'consults');
        const subSnapshot = await getDocs(subColRef);
        const subDocs = subSnapshot.docs.map(doc => docToData<SubsequentConsult>(doc));

        const rootColRef = query(collection(db, 'subsequentConsults'), where('patientId', '==', patientId));
        const rootSnapshot = await getDocs(rootColRef);
        const rootDocs = rootSnapshot.docs.map(doc => docToData<SubsequentConsult>(doc));

        const combined = [...subDocs, ...rootDocs].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const unique = new Map();
        combined.forEach(c => {
            if (!unique.has(c.id)) unique.set(c.id, c);
        });

        return Array.from(unique.values());
    },

    createConsult: async (consult: SubsequentConsult): Promise<void> => {
        try {
            if (!consult.id) {
                consult.id = doc(collection(db, 'subsequentConsults')).id;
            }
            const subColRef = doc(db, 'patients', consult.patientId, 'consults', consult.id);
            await Common.setDoc(subColRef, consult);

            const rootDocRef = doc(db, 'subsequentConsults', consult.id);
            await Common.setDoc(rootDocRef, consult);

            await logAudit({
                action: 'CONSULT_CREATE',
                targetId: consult.id,
                details: `Consult created for patient ${consult.patientId}`,
                metadata: { patientId: consult.patientId }
            });
        } catch (error) {
            console.error("Error creating consult:", error);
            offlineQueue.enqueueAction('CREATE_CONSULT', consult, auth.currentUser?.email || null);
            throw error;
        }
    },

    updateConsult: async (id: string, data: Partial<SubsequentConsult>, patientId: string): Promise<void> => {
        try {
            const subColRef = doc(db, 'patients', patientId, 'consults', id);
            await Common.updateDoc(subColRef, data);

            const rootDocRef = doc(db, 'subsequentConsults', id);
            await Common.updateDoc(rootDocRef, data);
        } catch (error) {
            offlineQueue.enqueueAction('UPDATE_CONSULT', { id, data, patientId }, auth.currentUser?.email || null);
            throw error;
        }
    },

    deleteConsult: async (id: string, patientId: string): Promise<void> => {
        await deleteDoc(doc(db, 'patients', patientId, 'consults', id));
        await deleteDoc(doc(db, 'subsequentConsults', id));
        await logAudit({
            action: 'CONSULT_DELETE',
            targetId: id,
            details: 'Deleted consult',
            metadata: { patientId }
        });
    },

    // ==================== APPOINTMENTS ====================

    getAppointments: async (date?: string): Promise<Appointment[]> => {
        let q;
        if (date) {
            q = query(collection(db, 'appointments'), where('date', '==', date));
        } else {
            // last 7 days + next 30 days
            const today = new Date();
            const past = new Date(today); past.setDate(today.getDate() - 7);
            q = query(collection(db, 'appointments'), where('date', '>=', past.toISOString().split('T')[0]));
        }

        const snapshot = await getDocs(q);
        const apps = snapshot.docs.map(d => docToData<Appointment>(d));
        // Sort by date + time
        return apps.sort((a, b) => {
            const dtA = new Date(`${a.date}T${a.time}`).getTime();
            const dtB = new Date(`${b.date}T${b.time}`).getTime();
            return dtA - dtB;
        });
    },

    getAppointmentsByDateRange: async (startDate: string, endDate: string): Promise<Appointment[]> => {
        const q = query(
            collection(db, 'appointments'),
            where('date', '>=', startDate),
            where('date', '<=', endDate)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => docToData<Appointment>(d));
    },

    createAppointment: async (app: Appointment): Promise<void> => {
        await addDoc(collection(db, 'appointments'), app);
        // Sync with Google Calendar would go here
    },

    updateAppointment: async (id: string, data: Partial<Appointment>): Promise<void> => {
        await updateDoc(doc(db, 'appointments', id), data);
    },

    deleteAppointment: async (id: string): Promise<void> => {
        await deleteDoc(doc(db, 'appointments', id));
    },

    getAllHistoriesFlat: async (): Promise<InitialHistory[]> => {
        const q = query(collection(db, 'initialHistories'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => docToData<InitialHistory>(d));
    },

    getAllConsultsFlat: async (): Promise<SubsequentConsult[]> => {
        const q = query(collection(db, 'subsequentConsults'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => docToData<SubsequentConsult>(d));
    },

    // ==================== PAYMENT / CHECKOUT ====================
    /**
     * Initiate checkout session (Cloud Function)
     */
    initiatePayment: async (consultId: string, amount: number): Promise<{ url: string }> => {
        // Lazy load functions only when needed
        const { getFunctions, httpsCallable } = await import('firebase/functions');
        const functions = getFunctions();
        const createCheckoutSession = httpsCallable(functions, 'createStripeCheckoutSession');

        const result = await createCheckoutSession({ consultId, amount });
        return result.data as { url: string };
    }
};

// Common internal helpers to perform Set/Update with "merge" behavior where applicable doesn't apply to specific doc ref methods directly but useful pattern
const Common = {
    setDoc: async (docRef: any, data: any) => {
        const { setDoc } = await import('firebase/firestore');
        await setDoc(docRef, data);
    },
    updateDoc: async (docRef: any, data: any) => {
        await updateDoc(docRef, data);
    }
};
