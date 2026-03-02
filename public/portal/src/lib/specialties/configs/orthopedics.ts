import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const orthopedicsConfig: SpecialtyConfig = {
    id: 'orthopedics',
    name: 'Orthopedics & Traumatology',
    nameEs: 'Ortopedia y Traumatología',
    category: 'quirurgica',
    categoryLabel: 'Surgical Specialties',
    categoryLabelEs: 'Especialidades Quirúrgicas',
    icon: 'Bone',
    color: '#92400E',
    colorLight: '#FDE68A',
    description: 'Musculoskeletal system surgery',
    descriptionEs: 'Cirugía del sistema musculoesquelético',
    formSections: { ...DEFAULT_FORM_SECTIONS, surgicalPlanning: true, rheumatological: true },
    motivesList: [
        'Fractura', 'Luxación', 'Esguince', 'Tendinitis', 'Artrosis',
        'Dolor lumbar', 'Hernia discal', 'Escoliosis', 'Síndrome del túnel carpiano',
        'Rotura de menisco', 'Lesión de LCA', 'Prótesis de cadera/rodilla',
        'Pie plano', 'Trauma de extremidades', 'Osteomielitis',
    ],
    systemsToExamine: ['Musculoesquelético', 'Columna', 'Articular', 'Neurológico periférico', 'Vascular periférico'],
    antecedentGroups: ['rheumatological'],
    familyHistoryList: ['Osteoporosis', 'Artritis reumatoide', 'Escoliosis', 'Displasia de cadera'],
    physicalExamConfig: {
        systems: ['Musculoesquelético completo', 'Columna', 'Articular'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla'],
        specialMeasurements: ['Goniometría', 'Test de Lachman', 'Test de McMurray'],
    },
    customFields: [
        { id: 'fracture_classification', label: 'Fracture Classification', labelEs: 'Clasificación de fractura', type: 'text', section: 'imaging', required: false },
        { id: 'rom', label: 'Range of Motion', labelEs: 'Rango de movimiento', type: 'textarea', section: 'physicalExam', required: false },
        { id: 'xray_findings', label: 'X-Ray Findings', labelEs: 'Hallazgos radiográficos', type: 'textarea', section: 'imaging', required: false },
    ],
    isActive: true,
    sortOrder: 11,
};
