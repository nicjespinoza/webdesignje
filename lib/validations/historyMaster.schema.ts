import { z } from 'zod';

// Constantes Vitales base
export const vitalSignsSchema = z.object({
    systolic: z.coerce.number().min(30, "Mínimo irreal").max(250, "Peligro de Crisis HT"),
    diastolic: z.coerce.number().min(20, "Mínimo irreal").max(180, "Peligro de Crisis HT"),
    hr: z.coerce.number().min(20).max(220),
    spo2: z.coerce.number().min(0).max(100),
    temp: z.coerce.number().min(30).max(43),
    rr: z.coerce.number().min(0).max(60).optional(),
}).superRefine((data, ctx) => {
    // Regla Logica Clínica
    if (data.systolic <= data.diastolic) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La Presión Sistólica debe ser mayor a la Diastólica.",
            path: ["systolic"]
        });
    }

    // Regla Red Flag (Crisis Hipertensiva Inminente)
    if (data.systolic > 180 || data.diastolic > 120) {
        // Estas 'issues' se mapearán a Red Flags en el endpoint final
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "🚨 ALERTA: Crisis Hipertensiva",
            path: ["systolic"]
        });
    }
});

// Extensiones por Especialidad (MVP Demo)
const ophthalmologyExtension = z.object({
    intraocularPressureRight: z.coerce.number().min(0).max(60, "PIO extremadamente alta"),
    intraocularPressureLeft: z.coerce.number().min(0).max(60, "PIO extremadamente alta"),
    fundoscopy: z.string().min(5, "Fondo de ojo requiere descripción"),
});

const cardiologyExtension = z.object({
    ecgFindings: z.string().min(5, "Hallazgo ECG requerido"),
    hasbledScore: z.coerce.number().min(0).max(9).optional()
});

/**
 * Master Schema - V2
 * Todas las Historias Clínicas deben ser parseadas aquí en Backend.
 */
export const clinicalHistorySubmitSchema = z.object({
    specialtyId: z.string(),
    patientId: z.string(),
    vitalSigns: vitalSignsSchema.optional(),
    motives: z.object({
        main: z.array(z.string()).min(1, "Especifique un motivo al menos"),
        others: z.string().optional(),
        evolutionTimeDays: z.coerce.number().optional()
    }),
    diagnoses: z.array(z.object({
        code: z.string().optional(),
        text: z.string().min(3, "Texto de diagnóstico requerido"),
        status: z.enum(['confirmed', 'presumptive'])
    })).min(1, "Al menos 1 diagnóstico es requerido"),
    treatmentPlan: z.object({
        meds: z.array(z.string()),
        tests: z.array(z.string()).optional(),
        instructions: z.string()
    }),

    // Bloque para data puramente específica por especialidad
    specialtyData: z.any()
}).superRefine((val, ctx) => {

    // Polimorfismo Fuerte por especialidad
    if (val.specialtyId === 'ophthalmology') {
        const parsed = ophthalmologyExtension.safeParse(val.specialtyData);
        if (!parsed.success) {
            parsed.error.issues.forEach(issue => ctx.addIssue({ ...issue, path: ['specialtyData', ...issue.path] }));
        }
    }

    if (val.specialtyId === 'cardiology') {
        const parsed = cardiologyExtension.safeParse(val.specialtyData);
        if (!parsed.success) {
            parsed.error.issues.forEach(issue => ctx.addIssue({ ...issue, path: ['specialtyData', ...issue.path] }));
        }
    }

    // Si `specialtyData` está vacío para especialidades donde es requerido, deberíamos lanzar issues.
});

// Infered types you can use in components
export type ClinicalHistorySubmitData = z.infer<typeof clinicalHistorySubmitSchema>;
export type VitalSignsV2 = z.infer<typeof vitalSignsSchema>;
