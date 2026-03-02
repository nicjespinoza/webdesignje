import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const periodonticsConfig: SpecialtyConfig = {
    id: 'periodontics',
    name: 'Periodontics',
    nameEs: 'Periodoncia',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Layers',
    color: '#16A34A',
    colorLight: '#DCFCE7',
    description: 'Gum diseases and supporting tissue treatment',
    descriptionEs: 'Enfermedades de encías y tejidos de soporte',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, periodontalChart: true, dentalRadiology: true,
        labs: false,
    },
    motivesList: [
        'Gingivitis', 'Periodontitis leve', 'Periodontitis moderada', 'Periodontitis severa',
        'Sangrado gingival', 'Movilidad dental', 'Recesión gingival', 'Halitosis',
        'Absceso periodontal', 'Bolsas periodontales', 'Pérdida ósea',
        'Cirugía periodontal', 'Injerto gingival', 'Regeneración ósea guiada',
        'Mantenimiento periodontal', 'Periimplantitis',
    ],
    systemsToExamine: [
        'Periodontal completo', 'Gingival', 'Óseo alveolar', 'Movilidad dental', 'Oclusión',
    ],
    antecedentGroups: ['metabolic'],
    familyHistoryList: ['Enfermedad periodontal', 'Pérdida dental temprana', 'Diabetes'],
    physicalExamConfig: {
        systems: ['Periodontal', 'Gingival', 'Óseo alveolar'],
        vitalSigns: ['PA'],
        specialMeasurements: ['Sondeo periodontal (6 puntos por pieza)', 'Índice de placa', 'Índice de sangrado', 'Movilidad dental (Miller)'],
    },
    customFields: [
        { id: 'perio_classification', label: 'Periodontal Classification', labelEs: 'Clasificación periodontal', type: 'select', options: ['Salud periodontal', 'Gingivitis inducida por placa', 'Periodontitis Estadío I', 'Periodontitis Estadío II', 'Periodontitis Estadío III', 'Periodontitis Estadío IV'], section: 'periodontalChart', required: true },
        { id: 'perio_grade', label: 'Periodontitis Grade', labelEs: 'Grado de periodontitis', type: 'select', options: ['No aplica', 'Grado A (lenta)', 'Grado B (moderada)', 'Grado C (rápida)'], section: 'periodontalChart', required: false },
        { id: 'plaque_index', label: 'Plaque Index (%)', labelEs: 'Índice de placa (%)', type: 'number', unit: '%', section: 'periodontalChart', min: 0, max: 100, required: false },
        { id: 'bleeding_index', label: 'Bleeding on Probing (%)', labelEs: 'Sangrado al sondeo (%)', type: 'number', unit: '%', section: 'periodontalChart', min: 0, max: 100, required: false },
        { id: 'max_pocket_depth', label: 'Max Pocket Depth (mm)', labelEs: 'Profundidad máxima de bolsa (mm)', type: 'number', unit: 'mm', section: 'periodontalChart', min: 0, max: 15, required: false },
        { id: 'bone_loss_pattern', label: 'Bone Loss Pattern', labelEs: 'Patrón de pérdida ósea', type: 'select', options: ['No hay pérdida', 'Horizontal generalizada', 'Vertical localizada', 'Combinada'], section: 'dentalRadiology', required: false },
        { id: 'treatment_plan_perio', label: 'Periodontal Treatment Plan', labelEs: 'Plan de tratamiento periodontal', type: 'textarea', section: 'treatment', required: false },
    ],
    isActive: true,
    sortOrder: 23,
};
