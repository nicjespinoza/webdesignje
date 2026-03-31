import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const urologyConfig: SpecialtyConfig = {
    id: 'urology',
    name: 'Urology',
    nameEs: 'Urología',
    category: 'medico_quirurgica',
    categoryLabel: 'Medical-Surgical',
    categoryLabelEs: 'Médico-Quirúrgica',
    icon: 'Droplets',
    color: '#0369A1',
    colorLight: '#E0F2FE',
    description: 'Urinary tract and male reproductive system',
    descriptionEs: 'Tracto urinario y sistema reproductor masculino',
    formSections: { ...DEFAULT_FORM_SECTIONS, renal: true, surgicalPlanning: true },
    motivesList: [
        'Hiperplasia prostática benigna', 'Cáncer de próstata', 'Litiasis renal',
        'Infección urinaria', 'Incontinencia urinaria', 'Hematuria',
        'Disfunción eréctil', 'Varicocele', 'Criptorquidia', 'Masa renal',
        'Cáncer de vejiga', 'Cáncer renal', 'Estenosis uretral',
    ],
    systemsToExamine: ['Genitourinario', 'Abdomen', 'Próstata (tacto rectal)', 'Renal'],
    antecedentGroups: ['renal'],
    familyHistoryList: ['Cáncer de próstata', 'Cáncer renal', 'Litiasis renal'],
    physicalExamConfig: {
        systems: ['Genitourinario', 'Abdomen', 'Próstata'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Temperatura'],
    },
    customFields: [
        { id: 'psa', label: 'PSA (ng/mL)', labelEs: 'PSA (ng/mL)', type: 'number', unit: 'ng/mL', section: 'labs', required: false },
        { id: 'ipss_score', label: 'IPSS Score', labelEs: 'Score IPSS', type: 'number', section: 'physicalExam', min: 0, max: 35, required: false },
        { id: 'uroflowmetry', label: 'Uroflowmetry', labelEs: 'Uroflujometría', type: 'textarea', section: 'labs', required: false },
    ],
    isActive: true,
    sortOrder: 15,
};
