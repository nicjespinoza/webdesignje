import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const prosthodonticsConfig: SpecialtyConfig = {
    id: 'prosthodontics',
    name: 'Prosthodontics',
    nameEs: 'Prostodoncia',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Component',
    color: '#A855F7',
    colorLight: '#F3E8FF',
    description: 'Dental prostheses, crowns, bridges and dentures',
    descriptionEs: 'Prótesis dentales, coronas, puentes y dentaduras',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, dentalRadiology: true, prosthodonticPlan: true,
        labs: false,
    },
    motivesList: [
        'Edentulismo parcial', 'Edentulismo total', 'Corona dental', 'Puente fijo',
        'Prótesis parcial removible', 'Prótesis total', 'Incrustación (inlay/onlay)',
        'Carilla dental', 'Prótesis sobre implantes', 'Prótesis implantosoportada',
        'Desgaste dental severo', 'Rehabilitación oral completa', 'Reparación de prótesis',
        'Rebase de prótesis', 'Bruxismo / Férula oclusal',
    ],
    systemsToExamine: [
        'Dental remanente', 'Oclusión', 'ATM', 'Reborde alveolar',
        'Mucosa oral', 'Dimensión vertical', 'Estética facial',
    ],
    antecedentGroups: [],
    familyHistoryList: ['Pérdida dental temprana', 'Bruxismo'],
    physicalExamConfig: {
        systems: ['Dental', 'Oclusión', 'ATM', 'Mucosa oral'],
        vitalSigns: ['PA'],
        specialMeasurements: ['Clasificación de Kennedy', 'Dimensión vertical oclusal', 'Espacio interoclusal'],
    },
    customFields: [
        { id: 'kennedy_class', label: 'Kennedy Classification', labelEs: 'Clasificación de Kennedy', type: 'select', options: ['No aplica (dentado completo)', 'Clase I', 'Clase II', 'Clase III', 'Clase IV', 'Edéntulo total superior', 'Edéntulo total inferior', 'Edéntulo total bimaxilar'], section: 'prosthodonticPlan', required: false },
        { id: 'prosthesis_type', label: 'Prosthesis Type', labelEs: 'Tipo de prótesis', type: 'select', options: ['Corona unitaria', 'Puente fijo', 'Inlay/Onlay', 'Carilla', 'PPR acrílica', 'PPR metálica', 'Prótesis total', 'Sobredentadura', 'Prótesis sobre implantes', 'Rehabilitación completa'], section: 'prosthodonticPlan', required: false },
        { id: 'prosthesis_material', label: 'Material', labelEs: 'Material', type: 'select', options: ['Metal-cerámica', 'Zirconia', 'Disilicato de litio', 'Resina', 'Acrílico', 'Cromo-cobalto', 'PEEK', 'Titanio'], section: 'prosthodonticPlan', required: false },
        { id: 'vertical_dimension', label: 'Vertical Dimension', labelEs: 'Dimensión vertical', type: 'select', options: ['Conservada', 'Disminuida', 'Aumentada'], section: 'prosthodonticPlan', required: false },
        { id: 'shade_selection', label: 'Shade/Color', labelEs: 'Color dental', type: 'text', section: 'prosthodonticPlan', placeholder: 'Ej: A2, A3, B1 (Vita)', required: false },
    ],
    isActive: true,
    sortOrder: 25,
};
