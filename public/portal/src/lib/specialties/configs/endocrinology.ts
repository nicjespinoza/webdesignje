import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const endocrinologyConfig: SpecialtyConfig = {
    id: 'endocrinology',
    name: 'Endocrinology',
    nameEs: 'Endocrinología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Droplets',
    color: '#7C3AED',
    colorLight: '#EDE9FE',
    description: 'Endocrine system and metabolism',
    descriptionEs: 'Sistema endocrino y metabolismo',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        metabolic: true, cardiac: true, renal: true, obesity: true, peripheral: true,
    },
    motivesList: [
        'Diabetes mellitus', 'Hipotiroidismo', 'Hipertiroidismo', 'Nódulo tiroideo',
        'Obesidad', 'Síndrome metabólico', 'Dislipidemia', 'Osteoporosis',
        'Síndrome de Cushing', 'Insuficiencia suprarrenal', 'Hiperandrogenismo',
        'Hipoglucemia', 'Hirsutismo', 'Amenorrea', 'Ginecomastia',
        'Control metabólico', 'Insulinorresistencia', 'Acromegalia',
    ],
    systemsToExamine: [
        'Tiroides', 'Cardiovascular', 'Piel y faneras', 'Abdomen',
        'Extremidades', 'Neurológico', 'Oftalmológico básico',
    ],
    antecedentGroups: ['metabolic', 'cardiac', 'renal', 'peripheral'],
    familyHistoryList: [
        'Diabetes mellitus tipo 1', 'Diabetes mellitus tipo 2', 'Enfermedad tiroidea',
        'Obesidad', 'Dislipidemia', 'Osteoporosis', 'Cáncer de tiroides',
    ],
    physicalExamConfig: {
        systems: ['Tiroides', 'Cardiovascular', 'Piel', 'Extremidades'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla', 'IMC', 'Circunferencia abdominal'],
        specialMeasurements: ['Circunferencia de cuello', 'Score de Ferriman-Gallwey'],
    },
    customFields: [
        { id: 'hba1c', label: 'HbA1c (%)', labelEs: 'HbA1c (%)', type: 'number', unit: '%', section: 'labs', min: 3, max: 20, required: false },
        { id: 'fasting_glucose', label: 'Fasting Glucose', labelEs: 'Glucemia en ayunas', type: 'number', unit: 'mg/dL', section: 'labs', required: false },
        { id: 'tsh', label: 'TSH', labelEs: 'TSH', type: 'number', unit: 'mUI/L', section: 'labs', required: false },
        { id: 'insulin_regimen', label: 'Insulin Regimen', labelEs: 'Esquema de insulina', type: 'textarea', section: 'treatment', required: false },
        { id: 'waist_circumference', label: 'Waist Circumference', labelEs: 'Circunferencia abdominal', type: 'number', unit: 'cm', section: 'physicalExam', required: false },
    ],
    isActive: true,
    sortOrder: 2,
};
