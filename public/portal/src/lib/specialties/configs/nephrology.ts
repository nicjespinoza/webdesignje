import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const nephologyConfig: SpecialtyConfig = {
    id: 'nephrology',
    name: 'Nephrology',
    nameEs: 'Nefrología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Droplet',
    color: '#0891B2',
    colorLight: '#CFFAFE',
    description: 'Kidney diseases and dialysis',
    descriptionEs: 'Enfermedades renales y diálisis',
    formSections: { ...DEFAULT_FORM_SECTIONS, renal: true, metabolic: true, cardiac: true },
    motivesList: [
        'Insuficiencia renal crónica', 'Insuficiencia renal aguda', 'Hematuria', 'Proteinuria',
        'Litiasis renal', 'Infección urinaria recurrente', 'Hipertensión nefrogénica',
        'Síndrome nefrótico', 'Síndrome nefrítico', 'Control de diálisis', 'Trasplante renal',
        'Edema', 'Desequilibrio electrolítico', 'Nefropatía diabética',
    ],
    systemsToExamine: ['Renal/Urinario', 'Cardiovascular', 'Abdomen', 'Extremidades (edema)', 'Neurológico'],
    antecedentGroups: ['renal', 'metabolic', 'cardiac'],
    familyHistoryList: ['Enfermedad renal poliquística', 'Insuficiencia renal', 'Litiasis renal', 'Nefropatía diabética', 'Trasplante renal'],
    physicalExamConfig: {
        systems: ['Renal', 'Cardiovascular', 'Abdomen', 'Extremidades'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla', 'IMC', 'Diuresis'],
        specialMeasurements: ['TFG estimada (CKD-EPI)', 'Índice albúmina/creatinina'],
    },
    customFields: [
        { id: 'gfr', label: 'GFR (mL/min)', labelEs: 'TFG (mL/min)', type: 'number', unit: 'mL/min', section: 'labs', required: false },
        { id: 'creatinine', label: 'Creatinine', labelEs: 'Creatinina', type: 'number', unit: 'mg/dL', section: 'labs', required: false },
        { id: 'ckd_stage', label: 'CKD Stage', labelEs: 'Estadío ERC', type: 'select', options: ['1', '2', '3a', '3b', '4', '5', '5D'], section: 'labs', required: false },
        { id: 'dialysis_type', label: 'Dialysis Type', labelEs: 'Tipo de diálisis', type: 'select', options: ['No aplica', 'Hemodiálisis', 'Diálisis peritoneal'], section: 'treatment', required: false },
    ],
    isActive: true,
    sortOrder: 5,
};
