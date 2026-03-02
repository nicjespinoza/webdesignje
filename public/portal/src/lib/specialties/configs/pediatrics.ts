import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const pediatricsConfig: SpecialtyConfig = {
    id: 'pediatrics',
    name: 'Pediatrics',
    nameEs: 'Pediatría',
    category: 'atencion_especializada',
    categoryLabel: 'Specialized Care',
    categoryLabelEs: 'Atención Especializada',
    icon: 'Baby',
    color: '#F59E0B',
    colorLight: '#FEF3C7',
    description: 'Child and adolescent medicine',
    descriptionEs: 'Medicina infantil y del adolescente',
    formSections: { ...DEFAULT_FORM_SECTIONS, pediatricDevelopment: true, respiratory: true, gastro: true, neurological: true },
    motivesList: [
        'Control de niño sano', 'Fiebre', 'Infección respiratoria', 'Diarrea aguda',
        'Dolor abdominal', 'Exantema', 'Otitis media', 'Asma infantil',
        'Retraso del desarrollo', 'Bajo peso', 'Obesidad infantil',
        'Trastorno de conducta', 'Vacunación', 'Alergia alimentaria', 'Convulsiones febriles',
    ],
    systemsToExamine: ['General pediátrico', 'Crecimiento/Desarrollo', 'Respiratorio', 'Abdomen', 'ORL', 'Piel', 'Neurológico'],
    antecedentGroups: ['respiratory', 'gastro', 'neurological'],
    familyHistoryList: ['Asma', 'Alergias', 'Enfermedades genéticas', 'Cardiopatías congénitas', 'Diabetes tipo 1'],
    physicalExamConfig: {
        systems: ['General pediátrico', 'Crecimiento', 'Desarrollo'],
        vitalSigns: ['PA', 'FC', 'FR', 'Temperatura', 'Peso', 'Talla', 'Perímetro cefálico'],
        specialMeasurements: ['Percentil peso/edad', 'Percentil talla/edad', 'Percentil IMC', 'Test de Denver'],
    },
    customFields: [
        { id: 'birth_weight', label: 'Birth Weight', labelEs: 'Peso al nacer', type: 'number', unit: 'g', section: 'pediatricDevelopment', required: false },
        { id: 'gestational_age_birth', label: 'Gestational Age at Birth', labelEs: 'Edad gestacional al nacer', type: 'number', unit: 'weeks', section: 'pediatricDevelopment', required: false },
        { id: 'apgar', label: 'APGAR Score', labelEs: 'Score APGAR', type: 'text', section: 'pediatricDevelopment', placeholder: '1min/5min', required: false },
        { id: 'vaccination_status', label: 'Vaccination Status', labelEs: 'Esquema de vacunación', type: 'select', options: ['Completo para la edad', 'Incompleto', 'No vacunado'], section: 'pediatricDevelopment', required: false },
        { id: 'feeding_type', label: 'Feeding Type', labelEs: 'Tipo de alimentación', type: 'select', options: ['Lactancia materna exclusiva', 'Fórmula', 'Mixta', 'Complementaria', 'Familiar'], section: 'pediatricDevelopment', required: false },
        { id: 'development_milestones', label: 'Development Milestones', labelEs: 'Hitos del desarrollo', type: 'textarea', section: 'pediatricDevelopment', required: false },
    ],
    isActive: true,
    sortOrder: 17,
};
