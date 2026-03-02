import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const maxillofacialSurgeryConfig: SpecialtyConfig = {
    id: 'maxillofacial_surgery',
    name: 'Oral & Maxillofacial Surgery',
    nameEs: 'Cirugía Maxilofacial',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Scissors',
    color: '#DC2626',
    colorLight: '#FEE2E2',
    description: 'Surgery of the jaw, face, and oral cavity',
    descriptionEs: 'Cirugía de maxilares, cara y cavidad oral',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, dentalRadiology: true, maxillofacialEval: true,
        surgicalPlanning: true, imaging: true,
    },
    motivesList: [
        'Extracción de terceros molares', 'Dientes incluidos/retenidos', 'Quiste maxilar',
        'Tumor odontogénico', 'Fractura mandibular', 'Fractura maxilar', 'Fractura cigomática',
        'Cirugía ortognática', 'Labio/paladar hendido', 'Infección odontogénica severa',
        'Osteonecrosis mandibular', 'Biopsia de tejidos orales', 'Frenectomía',
        'Cirugía de ATM', 'Reconstrucción ósea maxilar', 'Trauma facial',
    ],
    systemsToExamine: [
        'Maxilofacial completo', 'ATM bilateral', 'Nervio trigémino', 'Nervio facial',
        'Vías aéreas', 'Oclusión', 'Ganglios cervicales', 'Piso de boca',
    ],
    antecedentGroups: ['cardiac'],
    familyHistoryList: ['Labio/paladar hendido', 'Quistes maxilares', 'Tumores óseos'],
    physicalExamConfig: {
        systems: ['Maxilofacial', 'ATM', 'Nervios craneales V y VII', 'Oclusión'],
        vitalSigns: ['PA', 'FC', 'Temperatura', 'SpO2'],
        specialMeasurements: ['Apertura bucal (mm)', 'Desviación mandibular', 'ASA Classification'],
    },
    customFields: [
        { id: 'asa_class_maxfac', label: 'ASA Classification', labelEs: 'Clasificación ASA', type: 'select', options: ['I', 'II', 'III', 'IV'], section: 'surgicalPlanning', required: false },
        { id: 'mouth_opening', label: 'Mouth Opening (mm)', labelEs: 'Apertura bucal (mm)', type: 'number', unit: 'mm', section: 'maxillofacialEval', min: 0, max: 60, required: false },
        { id: 'nerve_function', label: 'Nerve Function', labelEs: 'Función nerviosa', type: 'select', options: ['Normal', 'Parestesia', 'Anestesia', 'Parálisis parcial'], section: 'maxillofacialEval', required: false },
        { id: 'surgical_approach_maxfac', label: 'Surgical Approach', labelEs: 'Abordaje quirúrgico', type: 'select', options: ['Intraoral', 'Extraoral', 'Combinado', 'Endoscópico'], section: 'surgicalPlanning', required: false },
        { id: 'ct_findings', label: 'CT Scan Findings', labelEs: 'Hallazgos de TAC', type: 'textarea', section: 'imaging', required: false },
        { id: 'informed_consent_maxfac', label: 'Informed Consent', labelEs: 'Consentimiento informado', type: 'checkbox', section: 'surgicalPlanning', required: false },
    ],
    isActive: true,
    sortOrder: 26,
};
