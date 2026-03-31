import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const implantologyConfig: SpecialtyConfig = {
    id: 'implantology',
    name: 'Dental Implantology',
    nameEs: 'Implantología Dental',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Pin',
    color: '#6366F1',
    colorLight: '#E0E7FF',
    description: 'Dental implant placement and restoration',
    descriptionEs: 'Colocación y restauración de implantes dentales',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, dentalRadiology: true, implantPlan: true,
        surgicalPlanning: true, prosthodonticPlan: true, imaging: true,
    },
    motivesList: [
        'Implante unitario', 'Implantes múltiples', 'All-on-4', 'All-on-6',
        'Implante inmediato post-extracción', 'Carga inmediata', 'Elevación de seno maxilar',
        'Regeneración ósea guiada pre-implante', 'Injerto óseo', 'Periimplantitis',
        'Control post-implante', 'Complicación de implante', 'Sobredentadura sobre implantes',
        'Prótesis fija sobre implantes', 'Zigomáticos',
    ],
    systemsToExamine: [
        'Dental remanente', 'Reborde alveolar', 'Volumen óseo', 'Tejidos blandos',
        'Oclusión', 'Senos maxilares', 'Nervio dentario inferior',
    ],
    antecedentGroups: ['metabolic', 'cardiac'],
    familyHistoryList: ['Osteoporosis', 'Diabetes'],
    physicalExamConfig: {
        systems: ['Dental', 'Reborde alveolar', 'Tejidos blandos periimplantarios'],
        vitalSigns: ['PA', 'FC'],
        specialMeasurements: ['Ancho óseo (mm)', 'Altura ósea disponible (mm)', 'Biotipo gingival', 'Densidad ósea (Misch D1-D4)'],
    },
    customFields: [
        { id: 'implant_site', label: 'Implant Site (FDI)', labelEs: 'Sitio de implante (FDI)', type: 'text', section: 'implantPlan', required: true },
        { id: 'bone_density', label: 'Bone Density (Misch)', labelEs: 'Densidad ósea (Misch)', type: 'select', options: ['D1 (cortical denso)', 'D2 (cortical poroso)', 'D3 (trabecular fino)', 'D4 (trabecular grueso)'], section: 'implantPlan', required: false },
        { id: 'implant_system', label: 'Implant System/Brand', labelEs: 'Sistema/Marca de implante', type: 'text', section: 'implantPlan', placeholder: 'Ej: Straumann BLX, Nobel Active, Neodent', required: false },
        { id: 'implant_dimensions', label: 'Implant Dimensions', labelEs: 'Dimensiones del implante', type: 'text', section: 'implantPlan', placeholder: 'Ej: 4.1 x 10mm', required: false },
        { id: 'bone_graft', label: 'Bone Graft Required', labelEs: 'Injerto óseo requerido', type: 'select', options: ['No', 'Regeneración ósea guiada', 'Elevación seno (abierta)', 'Elevación seno (cerrada)', 'Block graft', 'Split crest'], section: 'implantPlan', required: false },
        { id: 'insertion_torque', label: 'Insertion Torque (Ncm)', labelEs: 'Torque de inserción (Ncm)', type: 'number', unit: 'Ncm', section: 'implantPlan', min: 0, max: 80, required: false },
        { id: 'isq_stability', label: 'ISQ Stability Value', labelEs: 'Valor ISQ de estabilidad', type: 'number', section: 'implantPlan', min: 0, max: 100, required: false },
        { id: 'cbct_findings', label: 'CBCT Findings', labelEs: 'Hallazgos CBCT', type: 'textarea', section: 'imaging', required: false },
    ],
    isActive: true,
    sortOrder: 27,
};
