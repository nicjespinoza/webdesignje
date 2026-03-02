import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const dermatologyConfig: SpecialtyConfig = {
    id: 'dermatology',
    name: 'Dermatology',
    nameEs: 'Dermatología',
    category: 'medico_quirurgica',
    categoryLabel: 'Medical-Surgical',
    categoryLabelEs: 'Médico-Quirúrgica',
    icon: 'Fingerprint',
    color: '#F472B6',
    colorLight: '#FDF2F8',
    description: 'Skin, hair and nail disorders',
    descriptionEs: 'Trastornos de piel, cabello y uñas',
    formSections: { ...DEFAULT_FORM_SECTIONS, dermatologic: true, dermatoscopy: true, rheumatological: true },
    motivesList: [
        'Acné', 'Dermatitis atópica', 'Psoriasis', 'Urticaria', 'Eczema',
        'Melanoma', 'Carcinoma basocelular', 'Lunar atípico', 'Alopecia',
        'Vitíligo', 'Infección micótica', 'Herpes', 'Verrugas',
        'Rosácea', 'Dermatitis de contacto', 'Prurito generalizado',
    ],
    systemsToExamine: ['Piel completa', 'Cabello', 'Uñas', 'Mucosas', 'Ganglios linfáticos'],
    antecedentGroups: ['dermatologic', 'rheumatological'],
    familyHistoryList: ['Psoriasis', 'Dermatitis atópica', 'Melanoma', 'Vitíligo', 'Alopecia'],
    physicalExamConfig: {
        systems: ['Piel completa', 'Cabello', 'Uñas', 'Mucosas'],
        vitalSigns: ['PA', 'Temperatura'],
        specialMeasurements: ['PASI Score (psoriasis)', 'SCORAD (dermatitis)', 'Dermatoscopía'],
    },
    customFields: [
        { id: 'lesion_description', label: 'Lesion Description', labelEs: 'Descripción de la lesión', type: 'textarea', section: 'physicalExam', required: false },
        { id: 'lesion_location', label: 'Lesion Location', labelEs: 'Localización de la lesión', type: 'text', section: 'physicalExam', required: false },
        { id: 'pasi_score', label: 'PASI Score', labelEs: 'Score PASI', type: 'number', section: 'physicalExam', min: 0, max: 72, required: false },
        { id: 'biopsy_result', label: 'Biopsy Result', labelEs: 'Resultado de biopsia', type: 'textarea', section: 'labs', required: false },
        { id: 'dermoscopy_findings', label: 'Dermoscopy', labelEs: 'Dermatoscopía', type: 'textarea', section: 'dermatoscopy', required: false },
    ],
    isActive: true,
    sortOrder: 14,
};
