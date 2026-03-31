import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const pediatricDentistryConfig: SpecialtyConfig = {
    id: 'pediatric_dentistry',
    name: 'Pediatric Dentistry',
    nameEs: 'Odontopediatría',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Baby',
    color: '#FBBF24',
    colorLight: '#FEF9C3',
    description: 'Dental care for children and adolescents',
    descriptionEs: 'Cuidado dental para niños y adolescentes',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, dentalRadiology: true, pediatricDentalEval: true,
        pediatricDevelopment: true, labs: false,
    },
    motivesList: [
        'Caries de la primera infancia', 'Control odontopediátrico', 'Erupción dental',
        'Traumatismo dental infantil', 'Pulpotomía/Pulpectomía', 'Coronas pediátricas',
        'Mantenedores de espacio', 'Fluorización', 'Sellantes de fosas y fisuras',
        'Hábitos orales (chupete, dedo)', 'Maloclusión temprana', 'Anquiloglosia',
        'Dientes supernumerarios', 'Agenesia dental', 'Sedación/Manejo de conducta',
    ],
    systemsToExamine: [
        'Dental pediátrico', 'Dentición decidua/mixta', 'Oclusión infantil',
        'Tejidos blandos', 'Crecimiento craneofacial',
    ],
    antecedentGroups: [],
    familyHistoryList: ['Caries frecuentes', 'Maloclusión', 'Agenesias dentales', 'Amelogénesis imperfecta'],
    physicalExamConfig: {
        systems: ['Dental pediátrico', 'Oclusión', 'Tejidos blandos', 'Desarrollo dental'],
        vitalSigns: ['Peso', 'Talla'],
        specialMeasurements: ['Índice CEO-D/CPO-D', 'Índice de riesgo cariogénico', 'Evaluación de erupción dental'],
    },
    customFields: [
        { id: 'dentition_type', label: 'Dentition Type', labelEs: 'Tipo de dentición', type: 'select', options: ['Decidua (temporal)', 'Mixta temprana', 'Mixta tardía', 'Permanente joven'], section: 'pediatricDentalEval', required: true },
        { id: 'ceod_index', label: 'CEO-D Index', labelEs: 'Índice CEO-D', type: 'number', section: 'pediatricDentalEval', min: 0, max: 20, required: false },
        { id: 'caries_risk', label: 'Caries Risk Level', labelEs: 'Nivel de riesgo cariogénico', type: 'select', options: ['Bajo', 'Moderado', 'Alto'], section: 'pediatricDentalEval', required: false },
        { id: 'behavior_rating', label: 'Behavior Rating (Frankl)', labelEs: 'Escala de conducta (Frankl)', type: 'select', options: ['Definitivamente negativo', 'Negativo', 'Positivo', 'Definitivamente positivo'], section: 'pediatricDentalEval', required: false },
        { id: 'oral_habits', label: 'Oral Habits', labelEs: 'Hábitos orales', type: 'textarea', section: 'pediatricDentalEval', placeholder: 'Succión digital, biberón nocturno, bruxismo, onicofagia...', required: false },
        { id: 'fluoride_history', label: 'Fluoride Exposure', labelEs: 'Exposición a flúor', type: 'select', options: ['Agua fluorada', 'Pasta con flúor', 'Aplicación profesional', 'Suplementos', 'Ninguna'], section: 'pediatricDentalEval', required: false },
    ],
    isActive: true,
    sortOrder: 24,
};
