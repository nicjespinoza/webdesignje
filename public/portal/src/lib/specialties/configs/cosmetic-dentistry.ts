import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const cosmeticDentistryConfig: SpecialtyConfig = {
    id: 'cosmetic_dentistry',
    name: 'Cosmetic Dentistry',
    nameEs: 'Odontología Estética',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Sparkles',
    color: '#EC4899',
    colorLight: '#FCE7F3',
    description: 'Aesthetic dental procedures and smile design',
    descriptionEs: 'Procedimientos dentales estéticos y diseño de sonrisa',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, dentalRadiology: true, cosmeticDentalPlan: true,
        labs: false,
    },
    motivesList: [
        'Diseño de sonrisa', 'Blanqueamiento dental', 'Carillas de porcelana',
        'Carillas de resina', 'Coronas estéticas', 'Cierre de diastemas',
        'Contorneado cosmético', 'Gingivoplastía estética', 'Restauraciones estéticas',
        'Cambio de restauraciones antiguas', 'Manchas dentales', 'Fluorosis dental',
        'Hipoplasia del esmalte', 'Microabrasión', 'Alargamiento de corona estético',
    ],
    systemsToExamine: [
        'Dental estético', 'Gingival', 'Línea de sonrisa', 'Simetría facial',
        'Proporciones dentales', 'Color dental', 'Textura dental',
    ],
    antecedentGroups: [],
    familyHistoryList: ['Fluorosis', 'Amelogénesis imperfecta', 'Dentinogénesis imperfecta'],
    physicalExamConfig: {
        systems: ['Dental', 'Gingival', 'Línea de sonrisa', 'Perfil facial'],
        vitalSigns: ['PA'],
        specialMeasurements: ['Análisis de sonrisa (línea labial, corredor bucal)', 'Proporción dorada dental', 'Protocolo fotográfico dental'],
    },
    customFields: [
        { id: 'smile_analysis', label: 'Smile Analysis', labelEs: 'Análisis de sonrisa', type: 'textarea', section: 'cosmeticDentalPlan', required: false },
        { id: 'current_shade', label: 'Current Shade', labelEs: 'Color dental actual', type: 'text', section: 'cosmeticDentalPlan', placeholder: 'Ej: A3.5 (Vita)', required: false },
        { id: 'desired_shade', label: 'Desired Shade', labelEs: 'Color dental deseado', type: 'text', section: 'cosmeticDentalPlan', placeholder: 'Ej: B1, A1 (Vita)', required: false },
        { id: 'smile_line', label: 'Smile Line', labelEs: 'Línea de sonrisa', type: 'select', options: ['Alta (muestra encía)', 'Media', 'Baja (cubre dientes)'], section: 'cosmeticDentalPlan', required: false },
        { id: 'procedure_type', label: 'Procedure Type', labelEs: 'Tipo de procedimiento', type: 'select', options: ['Blanqueamiento en consultorio', 'Blanqueamiento ambulatorio', 'Carillas directas (resina)', 'Carillas indirectas (porcelana)', 'Coronas estéticas', 'Diseño digital de sonrisa (DSD)', 'Composite bonding', 'Gingivoplastía láser'], section: 'cosmeticDentalPlan', required: false },
        { id: 'dental_photos', label: 'Photo Protocol Completed', labelEs: 'Protocolo fotográfico completado', type: 'checkbox', section: 'cosmeticDentalPlan', required: false },
        { id: 'patient_expectations', label: 'Patient Expectations', labelEs: 'Expectativas del paciente', type: 'textarea', section: 'cosmeticDentalPlan', required: false },
    ],
    isActive: true,
    sortOrder: 28,
};
