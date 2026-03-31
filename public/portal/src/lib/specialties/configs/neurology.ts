import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const neurologyConfig: SpecialtyConfig = {
    id: 'neurology',
    name: 'Neurology',
    nameEs: 'Neurología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Brain',
    color: '#6366F1',
    colorLight: '#E0E7FF',
    description: 'Nervous system disorders',
    descriptionEs: 'Trastornos del sistema nervioso',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        neurological: true, psychiatric: true, metabolic: true,
    },
    motivesList: [
        'Cefalea', 'Migraña', 'Epilepsia / Convulsiones', 'Mareo / Vértigo',
        'Parestesias', 'Debilidad muscular', 'Temblor', 'Trastorno de la marcha',
        'Pérdida de memoria', 'Deterioro cognitivo', 'ACV / ECV',
        'Neuropatía periférica', 'Enfermedad de Parkinson', 'Esclerosis múltiple',
        'Dolor neuropático', 'Trastorno del sueño', 'Síncope',
    ],
    systemsToExamine: [
        'Neurológico completo', 'Pares craneales', 'Motor', 'Sensitivo',
        'Reflejos', 'Coordinación/Cerebelo', 'Marcha', 'Estado mental',
    ],
    antecedentGroups: ['neurological', 'psychiatric', 'metabolic', 'cardiac'],
    familyHistoryList: [
        'Epilepsia', 'Migraña', 'Enfermedad de Parkinson', 'Alzheimer/Demencia',
        'Esclerosis múltiple', 'ACV', 'Tumores cerebrales', 'Neuropatía hereditaria',
    ],
    physicalExamConfig: {
        systems: ['Neurológico completo', 'Pares craneales', 'Motor', 'Sensitivo', 'Reflejos'],
        vitalSigns: ['PA', 'FC', 'FR', 'Temperatura', 'Glasgow'],
        specialMeasurements: ['Mini-Mental State Exam (MMSE)', 'MoCA', 'Escala de Rankin'],
    },
    customFields: [
        { id: 'glasgow_score', label: 'Glasgow Score', labelEs: 'Escala de Glasgow', type: 'number', section: 'physicalExam', min: 3, max: 15, required: false },
        { id: 'mmse_score', label: 'MMSE Score', labelEs: 'Score MMSE', type: 'number', section: 'physicalExam', min: 0, max: 30, required: false },
        { id: 'eeg_findings', label: 'EEG Findings', labelEs: 'Hallazgos EEG', type: 'textarea', section: 'labs', required: false },
        { id: 'mri_brain', label: 'Brain MRI', labelEs: 'RMN cerebral', type: 'textarea', section: 'imaging', required: false },
        { id: 'seizure_type', label: 'Seizure Type', labelEs: 'Tipo de crisis', type: 'select', options: ['Focal', 'Generalizada', 'Focal a bilateral', 'Desconocida'], section: 'motives', required: false },
    ],
    isActive: true,
    sortOrder: 4,
};
