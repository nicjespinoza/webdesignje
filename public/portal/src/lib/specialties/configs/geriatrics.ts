import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const geriatricsConfig: SpecialtyConfig = {
    id: 'geriatrics',
    name: 'Geriatrics',
    nameEs: 'Geriatría',
    category: 'atencion_especializada',
    categoryLabel: 'Specialized Care',
    categoryLabelEs: 'Atención Especializada',
    icon: 'HeartHandshake',
    color: '#78716C',
    colorLight: '#F5F5F4',
    description: 'Elderly health and aging',
    descriptionEs: 'Salud del adulto mayor y envejecimiento',
    formSections: { ...DEFAULT_FORM_SECTIONS, geriatricAssessment: true, neurological: true, cardiac: true, metabolic: true, psychiatric: true },
    motivesList: [
        'Valoración geriátrica integral', 'Caídas recurrentes', 'Deterioro cognitivo',
        'Fragilidad', 'Polifarmacia', 'Incontinencia', 'Depresión del anciano',
        'Desnutrición', 'Inmovilidad', 'Dolor crónico', 'Sarcopenia',
    ],
    systemsToExamine: ['General geriátrico', 'Neurológico', 'Cardiovascular', 'Musculoesquelético', 'Marcha y equilibrio'],
    antecedentGroups: ['neurological', 'cardiac', 'metabolic', 'psychiatric'],
    familyHistoryList: ['Demencia', 'Osteoporosis', 'Enfermedad cardiovascular'],
    physicalExamConfig: {
        systems: ['General', 'Neurológico', 'Musculoesquelético', 'Cardiovascular'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla', 'IMC', 'Temperatura'],
        specialMeasurements: ['Barthel Index', 'Lawton IADL', 'Timed Up and Go', 'MNA (Mini Nutritional Assessment)'],
    },
    customFields: [
        { id: 'barthel_index', label: 'Barthel Index', labelEs: 'Índice de Barthel', type: 'number', section: 'geriatricAssessment', min: 0, max: 100, required: false },
        { id: 'lawton_iadl', label: 'Lawton IADL', labelEs: 'Lawton AIVD', type: 'number', section: 'geriatricAssessment', min: 0, max: 8, required: false },
        { id: 'fall_risk', label: 'Fall Risk', labelEs: 'Riesgo de caída', type: 'select', options: ['Bajo', 'Moderado', 'Alto'], section: 'geriatricAssessment', required: false },
        { id: 'polypharmacy', label: 'Number of Medications', labelEs: 'Número de medicamentos', type: 'number', section: 'geriatricAssessment', min: 0, required: false },
        { id: 'frailty_score', label: 'Frailty Score', labelEs: 'Score de fragilidad', type: 'select', options: ['Robusto', 'Pre-frágil', 'Frágil'], section: 'geriatricAssessment', required: false },
    ],
    isActive: true,
    sortOrder: 19,
};
