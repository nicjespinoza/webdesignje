import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const psychiatryConfig: SpecialtyConfig = {
    id: 'psychiatry',
    name: 'Psychiatry',
    nameEs: 'Psiquiatría',
    category: 'atencion_especializada',
    categoryLabel: 'Specialized Care',
    categoryLabelEs: 'Atención Especializada',
    icon: 'Brain',
    color: '#7C3AED',
    colorLight: '#EDE9FE',
    description: 'Mental health disorders',
    descriptionEs: 'Trastornos de salud mental',
    formSections: { ...DEFAULT_FORM_SECTIONS, psychiatricEval: true, psychiatric: true, neurological: true },
    motivesList: [
        'Depresión', 'Trastorno de ansiedad', 'Trastorno bipolar', 'Esquizofrenia',
        'Trastorno obsesivo-compulsivo', 'TDAH', 'Insomnio', 'Trastorno de pánico',
        'Trastorno de estrés postraumático', 'Trastorno alimentario', 'Adicciones',
        'Ideación suicida', 'Trastorno de personalidad', 'Duelo patológico',
        'Trastorno somatomorfo', 'Demencia / Deterioro cognitivo',
    ],
    systemsToExamine: ['Examen mental completo', 'Neurológico básico', 'General'],
    antecedentGroups: ['psychiatric', 'neurological'],
    familyHistoryList: ['Depresión', 'Esquizofrenia', 'Bipolaridad', 'Suicidio', 'Adicciones', 'Demencia'],
    physicalExamConfig: {
        systems: ['Examen mental', 'Neurológico básico'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla', 'IMC'],
        specialMeasurements: ['PHQ-9 (depresión)', 'GAD-7 (ansiedad)', 'MMSE', 'Hamilton', 'Young Mania Rating Scale'],
    },
    customFields: [
        { id: 'phq9_score', label: 'PHQ-9 Score', labelEs: 'Score PHQ-9', type: 'number', section: 'psychiatricEval', min: 0, max: 27, required: false },
        { id: 'gad7_score', label: 'GAD-7 Score', labelEs: 'Score GAD-7', type: 'number', section: 'psychiatricEval', min: 0, max: 21, required: false },
        { id: 'suicidal_risk', label: 'Suicidal Risk', labelEs: 'Riesgo suicida', type: 'select', options: ['Sin riesgo', 'Bajo', 'Moderado', 'Alto', 'Inminente'], section: 'psychiatricEval', required: false },
        { id: 'mental_status_exam', label: 'Mental Status Exam', labelEs: 'Examen del estado mental', type: 'textarea', section: 'psychiatricEval', required: false },
        { id: 'substance_use', label: 'Substance Use History', labelEs: 'Historial de uso de sustancias', type: 'textarea', section: 'psychiatricEval', required: false },
        { id: 'psychotherapy', label: 'Psychotherapy Type', labelEs: 'Tipo de psicoterapia', type: 'select', options: ['Ninguna', 'Cognitivo-conductual', 'Psicoanalítica', 'Sistémica', 'Humanista', 'EMDR', 'Otra'], section: 'treatment', required: false },
    ],
    isActive: true,
    sortOrder: 18,
};
