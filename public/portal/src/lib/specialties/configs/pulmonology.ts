import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const pulmonologyConfig: SpecialtyConfig = {
    id: 'pulmonology',
    name: 'Pulmonology',
    nameEs: 'Neumología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Wind',
    color: '#0EA5E9',
    colorLight: '#E0F2FE',
    description: 'Respiratory system disorders',
    descriptionEs: 'Trastornos del sistema respiratorio',
    formSections: { ...DEFAULT_FORM_SECTIONS, respiratory: true, cardiac: true, infectious: true },
    motivesList: [
        'Disnea', 'Tos crónica', 'Asma', 'EPOC', 'Neumonía', 'Derrame pleural',
        'Neumotórax', 'Fibrosis pulmonar', 'Apnea del sueño', 'Hemoptisis',
        'Bronquiectasias', 'Tuberculosis', 'Nódulo pulmonar', 'Cáncer de pulmón',
        'Embolismo pulmonar', 'Hipertensión pulmonar',
    ],
    systemsToExamine: ['Respiratorio', 'Cardiovascular', 'Orofaringe', 'Tórax', 'Abdomen'],
    antecedentGroups: ['respiratory', 'cardiac', 'infectious'],
    familyHistoryList: ['Asma', 'EPOC', 'Cáncer de pulmón', 'Fibrosis pulmonar', 'Tuberculosis', 'Alergias respiratorias'],
    physicalExamConfig: {
        systems: ['Respiratorio', 'Cardiovascular', 'Tórax'],
        vitalSigns: ['PA', 'FC', 'FR', 'SpO2', 'Temperatura', 'Peso', 'Talla'],
        specialMeasurements: ['Espirometría (FEV1/FVC)', 'Peak Flow', 'Escala de disnea mMRC'],
    },
    customFields: [
        { id: 'fev1_fvc', label: 'FEV1/FVC Ratio', labelEs: 'Relación FEV1/FVC', type: 'number', unit: '%', section: 'labs', required: false },
        { id: 'spo2_rest', label: 'SpO2 at Rest', labelEs: 'SpO2 en reposo', type: 'number', unit: '%', section: 'physicalExam', min: 50, max: 100, required: false },
        { id: 'mmrc_dyspnea', label: 'mMRC Dyspnea Scale', labelEs: 'Escala mMRC de disnea', type: 'select', options: ['0', '1', '2', '3', '4'], section: 'physicalExam', required: false },
        { id: 'chest_xray', label: 'Chest X-Ray', labelEs: 'Radiografía de tórax', type: 'textarea', section: 'imaging', required: false },
    ],
    isActive: true,
    sortOrder: 6,
};
