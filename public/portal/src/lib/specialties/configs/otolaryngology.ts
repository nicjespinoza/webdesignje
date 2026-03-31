import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const otolaryngologyConfig: SpecialtyConfig = {
    id: 'otolaryngology',
    name: 'Otolaryngology (ENT)',
    nameEs: 'Otorrinolaringología (ORL)',
    category: 'medico_quirurgica',
    categoryLabel: 'Medical-Surgical',
    categoryLabelEs: 'Médico-Quirúrgica',
    icon: 'Ear',
    color: '#D946EF',
    colorLight: '#FAE8FF',
    description: 'Ear, nose and throat disorders',
    descriptionEs: 'Trastornos de oído, nariz y garganta',
    formSections: { ...DEFAULT_FORM_SECTIONS, audiometry: true, respiratory: true, surgicalPlanning: true },
    motivesList: [
        'Hipoacusia', 'Otitis', 'Sinusitis', 'Rinitis alérgica', 'Epistaxis',
        'Amigdalitis', 'Nódulos vocales', 'Disfonía', 'Vértigo', 'Acúfenos',
        'Desviación septal', 'Apnea del sueño', 'Masa cervical', 'Disfagia',
    ],
    systemsToExamine: ['Oído', 'Nariz/Senos', 'Orofaringe/Laringe', 'Cuello', 'Ganglios cervicales'],
    antecedentGroups: ['respiratory'],
    familyHistoryList: ['Hipoacusia', 'Alergias', 'Cáncer de laringe'],
    physicalExamConfig: {
        systems: ['Oído', 'Nariz', 'Orofaringe', 'Laringe', 'Cuello'],
        vitalSigns: ['PA', 'FC', 'Temperatura'],
        specialMeasurements: ['Audiometría', 'Timpanometría', 'Nasofibrolaringoscopía'],
    },
    customFields: [
        { id: 'audiometry_od', label: 'Audiometry R', labelEs: 'Audiometría OD', type: 'textarea', section: 'audiometry', required: false },
        { id: 'audiometry_os', label: 'Audiometry L', labelEs: 'Audiometría OI', type: 'textarea', section: 'audiometry', required: false },
        { id: 'tympanometry', label: 'Tympanometry', labelEs: 'Timpanometría', type: 'textarea', section: 'audiometry', required: false },
    ],
    isActive: true,
    sortOrder: 16,
};
