import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const infectologyConfig: SpecialtyConfig = {
    id: 'infectology',
    name: 'Infectology',
    nameEs: 'Infectología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Bug',
    color: '#65A30D',
    colorLight: '#ECFCCB',
    description: 'Infectious diseases',
    descriptionEs: 'Enfermedades infecciosas',
    formSections: { ...DEFAULT_FORM_SECTIONS, infectious: true, respiratory: true, gastro: true },
    motivesList: [
        'VIH/SIDA', 'Tuberculosis', 'Hepatitis viral (A/B/C)', 'COVID-19',
        'Dengue', 'Fiebre de origen desconocido', 'Infección urinaria complicada',
        'Sepsis', 'Meningitis', 'Endocarditis', 'Osteomielitis',
        'Infección por hongos sistémica', 'Parasitosis', 'ETS/ITS',
    ],
    systemsToExamine: ['General', 'Ganglios linfáticos', 'Piel', 'Respiratorio', 'Abdomen', 'Neurológico'],
    antecedentGroups: ['infectious', 'respiratory', 'gastro'],
    familyHistoryList: ['Tuberculosis', 'VIH', 'Hepatitis'],
    physicalExamConfig: {
        systems: ['General', 'Ganglios linfáticos', 'Piel', 'Abdomen'],
        vitalSigns: ['PA', 'FC', 'FR', 'Temperatura', 'SpO2', 'Peso'],
    },
    customFields: [
        { id: 'cd4_count', label: 'CD4 Count', labelEs: 'Conteo CD4', type: 'number', unit: 'cells/μL', section: 'labs', required: false },
        { id: 'viral_load', label: 'Viral Load', labelEs: 'Carga viral', type: 'number', section: 'labs', required: false },
        { id: 'cultures', label: 'Culture Results', labelEs: 'Resultados de cultivos', type: 'textarea', section: 'labs', required: false },
        { id: 'antibiogram', label: 'Antibiogram', labelEs: 'Antibiograma', type: 'textarea', section: 'labs', required: false },
    ],
    isActive: true,
    sortOrder: 9,
};
