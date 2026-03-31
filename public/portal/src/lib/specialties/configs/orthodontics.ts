import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const orthodonticsConfig: SpecialtyConfig = {
    id: 'orthodontics',
    name: 'Orthodontics',
    nameEs: 'Ortodoncia',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Smile',
    color: '#06B6D4',
    colorLight: '#CFFAFE',
    description: 'Teeth alignment and bite correction',
    descriptionEs: 'Alineación dental y corrección de mordida',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, dentalRadiology: true, orthodonticPlan: true,
        imaging: true, surgicalPlanning: false, labs: false,
    },
    motivesList: [
        'Maloclusión clase I', 'Maloclusión clase II', 'Maloclusión clase III',
        'Apiñamiento dental', 'Diastemas', 'Mordida abierta', 'Mordida cruzada',
        'Mordida profunda', 'Protrusión dental', 'Retrusión mandibular',
        'Control de ortodoncia', 'Retiro de brackets', 'Retención post-ortodoncia',
        'Ortopedia maxilar', 'Evaluación pre-quirúrgica ortognática',
        'Alineadores invisibles', 'Brackets autoligados',
    ],
    systemsToExamine: [
        'Dental completo', 'Oclusión', 'ATM', 'Perfil facial',
        'Simetría facial', 'Vías aéreas superiores', 'Tejidos blandos intraorales',
    ],
    antecedentGroups: [],
    familyHistoryList: ['Maloclusión', 'Prognatismo', 'Agenesias dentales', 'Labio/paladar hendido'],
    physicalExamConfig: {
        systems: ['Dental', 'Oclusión', 'ATM', 'Perfil facial'],
        vitalSigns: ['PA'],
        specialMeasurements: ['Análisis cefalométrico', 'Discrepancia de espacio', 'Overjet', 'Overbite', 'Relación molar'],
    },
    customFields: [
        { id: 'angle_class', label: 'Angle Classification', labelEs: 'Clasificación de Angle', type: 'select', options: ['Clase I', 'Clase II div 1', 'Clase II div 2', 'Clase III'], section: 'orthodonticPlan', required: true },
        { id: 'overjet', label: 'Overjet (mm)', labelEs: 'Overjet (mm)', type: 'number', unit: 'mm', section: 'orthodonticPlan', required: false },
        { id: 'overbite', label: 'Overbite (mm)', labelEs: 'Overbite (mm)', type: 'number', unit: 'mm', section: 'orthodonticPlan', required: false },
        { id: 'appliance_type', label: 'Appliance Type', labelEs: 'Tipo de aparatología', type: 'select', options: ['Brackets metálicos', 'Brackets estéticos', 'Brackets autoligados', 'Alineadores transparentes', 'Aparato removible', 'Expansor palatino', 'Arco lingual'], section: 'orthodonticPlan', required: false },
        { id: 'treatment_phase', label: 'Treatment Phase', labelEs: 'Fase de tratamiento', type: 'select', options: ['Diagnóstico', 'Alineación', 'Nivelación', 'Cierre de espacios', 'Finalización', 'Retención'], section: 'orthodonticPlan', required: false },
        { id: 'cephalometric_analysis', label: 'Cephalometric Analysis', labelEs: 'Análisis cefalométrico', type: 'textarea', section: 'dentalRadiology', required: false },
        { id: 'space_discrepancy', label: 'Space Discrepancy', labelEs: 'Discrepancia de espacio', type: 'text', section: 'orthodonticPlan', placeholder: 'Superior: __ mm / Inferior: __ mm', required: false },
    ],
    isActive: true,
    sortOrder: 21,
};
