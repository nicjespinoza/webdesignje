import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const gynecologyConfig: SpecialtyConfig = {
    id: 'gynecology',
    name: 'Gynecology & Obstetrics',
    nameEs: 'Ginecología y Obstetricia',
    category: 'medico_quirurgica',
    categoryLabel: 'Medical-Surgical',
    categoryLabelEs: 'Médico-Quirúrgica',
    icon: 'Baby',
    color: '#EC4899',
    colorLight: '#FCE7F3',
    description: 'Women\'s reproductive health',
    descriptionEs: 'Salud reproductiva de la mujer',
    formSections: { ...DEFAULT_FORM_SECTIONS, gyneco: true, gynecoPathological: true, surgicalPlanning: true },
    motivesList: [
        'Control prenatal', 'Amenorrea', 'Dismenorrea', 'Sangrado uterino anormal',
        'Menopausia', 'Infertilidad', 'ETS/ITS', 'Papanicolaou anormal',
        'Masa ovárica', 'Miomatosis uterina', 'Endometriosis', 'Dolor pélvico',
        'Incontinencia urinaria', 'Anticoncepción', 'Embarazo de alto riesgo',
        'Control post-parto', 'Cáncer cervicouterino', 'Prolapso genital',
    ],
    systemsToExamine: ['Ginecológico', 'Obstétrico', 'Mama', 'Abdomen', 'Pélvico'],
    antecedentGroups: ['gynecoPathological'],
    familyHistoryList: ['Cáncer de mama', 'Cáncer cervicouterino', 'Cáncer de ovario', 'Preeclampsia', 'Diabetes gestacional'],
    physicalExamConfig: {
        systems: ['Ginecológico', 'Mama', 'Abdomen', 'Pélvico'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla', 'IMC', 'Temperatura'],
        specialMeasurements: ['Altura uterina', 'FCF (frecuencia cardíaca fetal)', 'Bishop Score'],
    },
    customFields: [
        { id: 'gravida_para', label: 'G/P/A/C', labelEs: 'G/P/A/C', type: 'text', section: 'gyneco', placeholder: 'G_P_A_C_', required: false },
        { id: 'lmp', label: 'Last Menstrual Period', labelEs: 'Fecha última menstruación', type: 'date', section: 'gyneco', required: false },
        { id: 'gestational_age', label: 'Gestational Age', labelEs: 'Edad gestacional', type: 'text', section: 'gyneco', required: false },
        { id: 'pap_smear', label: 'Pap Smear Result', labelEs: 'Resultado de Papanicolaou', type: 'select', options: ['Normal', 'ASC-US', 'LSIL', 'HSIL', 'AGC', 'Cáncer'], section: 'labs', required: false },
        { id: 'contraception', label: 'Contraception Method', labelEs: 'Método anticonceptivo', type: 'select', options: ['Ninguno', 'Oral', 'DIU', 'Implante', 'Inyectable', 'Barrera', 'Natural', 'Esterilización'], section: 'gyneco', required: false },
    ],
    isActive: true,
    sortOrder: 12,
};
