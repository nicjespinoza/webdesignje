import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const cardiologyConfig: SpecialtyConfig = {
    id: 'cardiology',
    name: 'Cardiology',
    nameEs: 'Cardiología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Heart',
    color: '#DC2626',
    colorLight: '#FEE2E2',
    description: 'Heart and cardiovascular system',
    descriptionEs: 'Corazón y sistema cardiovascular',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        cardiac: true, metabolic: true, peripheral: true, respiratory: true,
    },
    motivesList: [
        'Dolor torácico', 'Disnea', 'Palpitaciones', 'Síncope', 'Edema de miembros inferiores',
        'Hipertensión arterial', 'Arritmia', 'Soplo cardíaco', 'Insuficiencia cardíaca',
        'Cardiopatía isquémica', 'Valvulopatía', 'Control post-operatorio cardiovascular',
        'Chequeo cardiovascular preventivo', 'Dolor precordial', 'Taquicardia', 'Bradicardia',
    ],
    systemsToExamine: [
        'Cardiovascular', 'Respiratorio', 'Vascular periférico', 'Abdomen',
        'Cuello (yugulares)', 'Extremidades', 'Neurológico básico',
    ],
    antecedentGroups: ['cardiac', 'metabolic', 'peripheral', 'respiratory'],
    familyHistoryList: [
        'Infarto agudo de miocardio', 'Hipertensión arterial', 'Muerte súbita',
        'Cardiopatía congénita', 'Arritmias', 'Diabetes mellitus', 'Dislipidemia',
        'Enfermedad cerebrovascular', 'Aneurisma aórtico',
    ],
    physicalExamConfig: {
        systems: ['Cardiovascular', 'Respiratorio', 'Vascular periférico'],
        vitalSigns: ['PA', 'FC', 'FR', 'SpO2', 'Temperatura', 'Peso', 'Talla', 'IMC'],
        specialMeasurements: ['Índice tobillo-brazo', 'Presión venosa yugular'],
    },
    customFields: [
        { id: 'ecg_findings', label: 'ECG Findings', labelEs: 'Hallazgos ECG', type: 'textarea', section: 'labs', required: false },
        { id: 'echocardiogram', label: 'Echocardiogram', labelEs: 'Ecocardiograma', type: 'textarea', section: 'imaging', required: false },
        { id: 'lvef', label: 'LVEF (%)', labelEs: 'FEVI (%)', type: 'number', unit: '%', section: 'labs', min: 10, max: 80, required: false },
        { id: 'nyha_class', label: 'NYHA Class', labelEs: 'Clase NYHA', type: 'select', options: ['I', 'II', 'III', 'IV'], section: 'physicalExam', required: false },
        { id: 'stress_test', label: 'Stress Test', labelEs: 'Prueba de esfuerzo', type: 'textarea', section: 'labs', required: false },
    ],
    isActive: true,
    sortOrder: 1,
};
