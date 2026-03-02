import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const rheumatologyConfig: SpecialtyConfig = {
    id: 'rheumatology',
    name: 'Rheumatology',
    nameEs: 'Reumatología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Bone',
    color: '#D97706',
    colorLight: '#FEF3C7',
    description: 'Autoimmune and musculoskeletal diseases',
    descriptionEs: 'Enfermedades autoinmunes y musculoesqueléticas',
    formSections: { ...DEFAULT_FORM_SECTIONS, rheumatological: true, dermatologic: true, renal: true },
    motivesList: [
        'Artritis reumatoide', 'Lupus eritematoso sistémico', 'Espondilitis anquilosante',
        'Artritis psoriásica', 'Gota', 'Fibromialgia', 'Síndrome de Sjögren',
        'Vasculitis', 'Esclerodermia', 'Osteoartritis', 'Dolor articular',
        'Rigidez matutina', 'Síndrome antifosfolípidos',
    ],
    systemsToExamine: ['Articular', 'Musculoesquelético', 'Piel', 'Renal', 'Pulmonar', 'Oftalmológico'],
    antecedentGroups: ['rheumatological', 'dermatologic', 'renal'],
    familyHistoryList: ['Artritis reumatoide', 'Lupus', 'Psoriasis', 'Gota', 'Espondiloartropatías'],
    physicalExamConfig: {
        systems: ['Articular completo', 'Piel', 'Musculoesquelético'],
        vitalSigns: ['PA', 'FC', 'Temperatura', 'Peso'],
        specialMeasurements: ['DAS28', 'HAQ-DI', 'SLEDAI (para LES)'],
    },
    customFields: [
        { id: 'das28_score', label: 'DAS28 Score', labelEs: 'Score DAS28', type: 'number', section: 'physicalExam', required: false },
        { id: 'rf_factor', label: 'Rheumatoid Factor', labelEs: 'Factor reumatoideo', type: 'select', options: ['Positivo', 'Negativo'], section: 'labs', required: false },
        { id: 'ana', label: 'ANA', labelEs: 'ANA', type: 'select', options: ['Positivo', 'Negativo'], section: 'labs', required: false },
        { id: 'esr_crp', label: 'ESR/CRP', labelEs: 'VES/PCR', type: 'textarea', section: 'labs', required: false },
        { id: 'joint_count', label: 'Swollen Joint Count', labelEs: 'Conteo articular inflamado', type: 'number', section: 'physicalExam', min: 0, max: 28, required: false },
    ],
    isActive: true,
    sortOrder: 8,
};
