import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const hematologyConfig: SpecialtyConfig = {
    id: 'hematology',
    name: 'Hematology',
    nameEs: 'Hematología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'TestTubes',
    color: '#BE185D',
    colorLight: '#FCE7F3',
    description: 'Blood disorders and malignancies',
    descriptionEs: 'Trastornos de la sangre y malignidades',
    formSections: { ...DEFAULT_FORM_SECTIONS, hematological: true, infectious: true },
    motivesList: [
        'Anemia', 'Trombocitopenia', 'Leucocitosis', 'Linfoma', 'Leucemia',
        'Trastorno de coagulación', 'Trombofilia', 'Mieloma múltiple',
        'Policitemia', 'Púrpura', 'Pancitopenia', 'Adenopatías',
    ],
    systemsToExamine: ['Ganglios linfáticos', 'Bazo/Hígado', 'Piel (petequias/equimosis)', 'Abdomen', 'Mucosas'],
    antecedentGroups: ['hematological', 'infectious'],
    familyHistoryList: ['Anemia falciforme', 'Hemofilia', 'Leucemia', 'Linfoma', 'Trastornos de coagulación'],
    physicalExamConfig: {
        systems: ['Ganglios linfáticos', 'Abdomen (hepato-esplenomegalia)', 'Piel'],
        vitalSigns: ['PA', 'FC', 'Temperatura', 'Peso'],
        specialMeasurements: ['Eastern Cooperative Oncology Group (ECOG)'],
    },
    customFields: [
        { id: 'hemoglobin', label: 'Hemoglobin', labelEs: 'Hemoglobina', type: 'number', unit: 'g/dL', section: 'labs', required: false },
        { id: 'platelet_count', label: 'Platelet Count', labelEs: 'Conteo plaquetario', type: 'number', unit: '/μL', section: 'labs', required: false },
        { id: 'wbc_count', label: 'WBC Count', labelEs: 'Leucocitos', type: 'number', unit: '/μL', section: 'labs', required: false },
        { id: 'peripheral_smear', label: 'Peripheral Smear', labelEs: 'Frotis periférico', type: 'textarea', section: 'labs', required: false },
    ],
    isActive: true,
    sortOrder: 7,
};
