
import { z } from 'zod';

const checkboxSchema = z.object({
    yes: z.boolean().default(false),
    no: z.boolean().default(false),
    details: z.string().optional(),
    conditions: z.record(z.boolean()).optional(),
    list: z.record(z.boolean()).optional(),
    other: z.string().optional(),
    cancerDetails: z.string().optional(),
});

export const initialHistorySchema = z.object({
    id: z.string(),
    patientId: z.string(),
    date: z.string(),
    time: z.string(),

    // Motivos
    motives: z.any().optional(),
    motivesCancerDetails: z.string().optional(),
    otherMotive: z.string().optional(),

    // Historia de la Enfermedad
    evolutionTime: z.string().optional(),
    historyOfPresentIllness: z.string().optional(),

    // Antecedentes
    preExistingDiseases: checkboxSchema.optional(),
    surgicalHistory: checkboxSchema.optional(),
    transfusionHistory: checkboxSchema.optional(),
    allergicHistory: checkboxSchema.optional(),
    drugHistory: checkboxSchema.optional(),
    familyHistory: checkboxSchema.optional(),
    nonPathologicalHistory: z.any().optional(),
    gynecoObstetricHistory: z.any().optional(),

    // Obesidad
    obesityHistory: z.any().optional(),

    // Examen Físico
    physicalExam: z.any().optional(),
    diagnosis: z.any().optional(),
    treatmentPlan: z.any().optional(),

    // Metadata
    specialtyId: z.string().optional(),
});

export type InitialHistoryFormData = z.infer<typeof initialHistorySchema>;

export const getDefaultInitialHistoryValues = (patientId: string): InitialHistoryFormData => ({
    id: crypto.randomUUID(),
    patientId,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString(),
    motives: {},
    motivesCancerDetails: '',
    otherMotive: '',
    evolutionTime: '',
    historyOfPresentIllness: '',
    preExistingDiseases: { yes: false, no: false, conditions: {}, other: '', cancerDetails: '' },
    surgicalHistory: { yes: false, no: false, conditions: {}, other: '', cancerDetails: '' },
    transfusionHistory: { yes: false, no: false, details: '', other: '' },
    allergicHistory: { yes: false, no: false, details: '', other: '' },
    drugHistory: { yes: false, no: false, details: '', other: '' },
    familyHistory: { yes: false, no: false, list: {}, other: '', cancerDetails: '' },
    nonPathologicalHistory: {},
    gynecoObstetricHistory: {},
    obesityHistory: null,
    physicalExam: {},
    diagnosis: {},
    treatmentPlan: {},
});
