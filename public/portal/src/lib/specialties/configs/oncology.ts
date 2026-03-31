import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const oncologyConfig: SpecialtyConfig = {
    id: 'oncology',
    name: 'Oncology',
    nameEs: 'Oncología',
    category: 'diagnostico_apoyo',
    categoryLabel: 'Diagnostic & Support',
    categoryLabelEs: 'Diagnóstico y Apoyo',
    icon: 'Ribbon',
    color: '#9333EA',
    colorLight: '#F3E8FF',
    description: 'Cancer diagnosis and treatment',
    descriptionEs: 'Diagnóstico y tratamiento del cáncer',
    formSections: { ...DEFAULT_FORM_SECTIONS, oncologyStaging: true, hematological: true, surgicalPlanning: true },
    motivesList: [
        'Diagnóstico de cáncer', 'Quimioterapia', 'Inmunoterapia', 'Seguimiento oncológico',
        'Masa/Tumor', 'Adenopatías', 'Pérdida de peso inexplicada', 'Anemia crónica',
        'Dolor oncológico', 'Cuidados paliativos', 'Metástasis', 'Síndromes paraneoplásicos',
    ],
    systemsToExamine: ['General oncológico', 'Ganglios linfáticos', 'Abdomen', 'Piel', 'Sitio primario del tumor'],
    antecedentGroups: ['hematological', 'infectious'],
    familyHistoryList: ['Cáncer (especificar tipo)', 'Poliposis familiar', 'BRCA1/BRCA2', 'Lynch syndrome'],
    physicalExamConfig: {
        systems: ['General', 'Ganglios linfáticos', 'Abdomen', 'Sitio primario'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla', 'IMC', 'Temperatura'],
        specialMeasurements: ['ECOG Performance Status', 'Karnofsky Scale', 'TNM Staging'],
    },
    customFields: [
        { id: 'tnm_staging', label: 'TNM Staging', labelEs: 'Estadificación TNM', type: 'text', section: 'oncologyStaging', required: false },
        { id: 'ecog_ps', label: 'ECOG PS', labelEs: 'ECOG PS', type: 'select', options: ['0', '1', '2', '3', '4'], section: 'oncologyStaging', required: false },
        { id: 'tumor_markers', label: 'Tumor Markers', labelEs: 'Marcadores tumorales', type: 'textarea', section: 'labs', required: false },
        { id: 'chemo_protocol', label: 'Chemotherapy Protocol', labelEs: 'Protocolo de quimioterapia', type: 'textarea', section: 'treatment', required: false },
        { id: 'recist_response', label: 'RECIST Response', labelEs: 'Respuesta RECIST', type: 'select', options: ['Respuesta completa', 'Respuesta parcial', 'Enfermedad estable', 'Progresión'], section: 'oncologyStaging', required: false },
    ],
    isActive: true,
    sortOrder: 20,
};
