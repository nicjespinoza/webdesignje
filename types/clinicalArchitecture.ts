/**
 * clinicalArchitecture.ts
 * Contratos principales para el modelo versionado y tipado de Historias Clínicas.
 */

export interface HistoryTemplate {
    specialtyId: string;     // e.g. "cardiology", "neurology"
    version: number;         // e.g. 1.0
    active: boolean;

    requiredSections: Array<'motives' | 'vital_signs' | 'systems' | 'specific_scales' | 'treatment'>;

    requiredFields: Record<string, string[]>;
    optionalFields: Record<string, string[]>;

    scales: Array<{
        id: string;
        name: string;
        maxScore: number;
        thresholds: Record<string, string>;
    }>;

    redFlags: Array<{
        fieldPath: string;
        condition: 'gt' | 'lt' | 'eq' | 'contains';
        threshold: number | string;
        alertMessage: string;
        action: 'warn' | 'block' | 'referral';
    }>;

    followUpProtocol: {
        defaultDays: number;
        requireTests: boolean;
    };

    codingMap?: string[]; // ICD-10 or SNOMED
}

export interface ClinicalHistoryNormalized {
    id: string;
    patientId: string;
    doctorId: string;
    schemaVersion: "v2"; // Discriminator

    specialtyId: string;
    templateVersion: number;

    auditTrail: {
        createdAt: string; // ISO string for easier JSON serialization in type definition
        updatedAt: string;
        signatures: Array<{ timestamp: number; userId: string; action: 'create' | 'update' }>;
    };

    clinicalData: {
        motives: {
            main: string[];
            others?: string;
            evolutionTimeDays?: number;
        };
        vitalSigns?: {
            hr: number;
            rr: number;
            systolic: number;
            diastolic: number;
            temp: number;
            spo2: number;
        };
        systems?: Record<string, { normal: boolean; notes?: string }>;
        specialtyData: Record<string, unknown>; // Tipado dinámico validado por Zod

        diagnoses: Array<{ code?: string; text: string; status: 'confirmed' | 'presumptive' }>;
        treatmentPlan: {
            meds: string[];
            tests?: string[];
            instructions: string;
        };
    };

    qualityFlags: {
        isComplete: boolean;
        redFlagsTriggered: string[];
        timeToCompleteSeconds: number;
    };
}
