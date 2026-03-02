import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const generalSurgeryConfig: SpecialtyConfig = {
    id: 'general_surgery',
    name: 'General Surgery',
    nameEs: 'Cirugía General',
    category: 'quirurgica',
    categoryLabel: 'Surgical Specialties',
    categoryLabelEs: 'Especialidades Quirúrgicas',
    icon: 'Scissors',
    color: '#DC2626',
    colorLight: '#FEE2E2',
    description: 'General surgical procedures',
    descriptionEs: 'Procedimientos quirúrgicos generales',
    formSections: { ...DEFAULT_FORM_SECTIONS, surgicalPlanning: true, gastro: true, hepato: true },
    motivesList: [
        'Hernia inguinal', 'Hernia umbilical', 'Hernia hiatal', 'Colecistitis / Colelitiasis',
        'Apendicitis', 'Obstrucción intestinal', 'Masa abdominal', 'Absceso',
        'Trauma abdominal', 'Nódulo mamario', 'Nódulo tiroideo', 'Cáncer de colon',
        'Control post-operatorio', 'Valoración pre-operatoria', 'Hemorroidectomía',
    ],
    systemsToExamine: ['Abdomen', 'Pared abdominal', 'Regiones inguinales', 'Tórax', 'Tiroides', 'Mama'],
    antecedentGroups: ['gastro', 'hepato', 'cardiac'],
    familyHistoryList: ['Cáncer colorrectal', 'Cáncer gástrico', 'Cáncer de mama', 'Colelitiasis'],
    physicalExamConfig: {
        systems: ['Abdomen completo', 'Pared abdominal', 'Regiones inguinales'],
        vitalSigns: ['PA', 'FC', 'FR', 'Temperatura', 'Peso', 'Talla', 'IMC'],
        specialMeasurements: ['ASA Classification', 'Mallampati Score'],
    },
    customFields: [
        { id: 'asa_class', label: 'ASA Classification', labelEs: 'Clasificación ASA', type: 'select', options: ['I', 'II', 'III', 'IV', 'V'], section: 'surgicalPlanning', required: false },
        { id: 'surgical_plan', label: 'Surgical Plan', labelEs: 'Plan quirúrgico', type: 'textarea', section: 'surgicalPlanning', required: false },
        { id: 'informed_consent', label: 'Informed Consent Signed', labelEs: 'Consentimiento informado firmado', type: 'checkbox', section: 'surgicalPlanning', required: false },
        { id: 'surgical_approach', label: 'Approach', labelEs: 'Abordaje', type: 'select', options: ['Abierto', 'Laparoscópico', 'Robótico', 'Endoscópico'], section: 'surgicalPlanning', required: false },
    ],
    isActive: true,
    sortOrder: 10,
};
