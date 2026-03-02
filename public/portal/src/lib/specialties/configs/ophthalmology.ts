import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const ophthalmologyConfig: SpecialtyConfig = {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    nameEs: 'Oftalmología',
    category: 'medico_quirurgica',
    categoryLabel: 'Medical-Surgical',
    categoryLabelEs: 'Médico-Quirúrgica',
    icon: 'Eye',
    color: '#0284C7',
    colorLight: '#E0F2FE',
    description: 'Eye and vision disorders',
    descriptionEs: 'Trastornos oculares y de la visión',
    formSections: { ...DEFAULT_FORM_SECTIONS, ophthalmologicExam: true, metabolic: true },
    motivesList: [
        'Disminución de agudeza visual', 'Ojo rojo', 'Dolor ocular', 'Cataratas',
        'Glaucoma', 'Retinopatía diabética', 'Desprendimiento de retina',
        'Conjuntivitis', 'Miopía/Hipermetropía/Astigmatismo', 'Pterigión',
        'Chalazión/Orzuelo', 'Cuerpo extraño', 'Trauma ocular', 'Estrabismo',
    ],
    systemsToExamine: ['Oftalmológico completo', 'Párpados', 'Conjuntiva', 'Córnea', 'Cristalino', 'Fondo de ojo'],
    antecedentGroups: ['metabolic'],
    familyHistoryList: ['Glaucoma', 'Cataratas', 'Retinopatía', 'Miopía degenerativa', 'Ceguera'],
    physicalExamConfig: {
        systems: ['Oftalmológico completo'],
        vitalSigns: ['PA'],
        specialMeasurements: ['Agudeza visual (AV)', 'Presión intraocular (PIO)', 'Campimetría'],
    },
    customFields: [
        { id: 'visual_acuity_od', label: 'VA Right Eye', labelEs: 'AV Ojo Derecho', type: 'text', section: 'ophthalmologicExam', required: false },
        { id: 'visual_acuity_os', label: 'VA Left Eye', labelEs: 'AV Ojo Izquierdo', type: 'text', section: 'ophthalmologicExam', required: false },
        { id: 'iop_od', label: 'IOP Right Eye (mmHg)', labelEs: 'PIO Ojo Derecho (mmHg)', type: 'number', unit: 'mmHg', section: 'ophthalmologicExam', required: false },
        { id: 'iop_os', label: 'IOP Left Eye (mmHg)', labelEs: 'PIO Ojo Izquierdo (mmHg)', type: 'number', unit: 'mmHg', section: 'ophthalmologicExam', required: false },
        { id: 'fundoscopy', label: 'Fundoscopy', labelEs: 'Fondo de ojo', type: 'textarea', section: 'ophthalmologicExam', required: false },
    ],
    isActive: true,
    sortOrder: 13,
};
