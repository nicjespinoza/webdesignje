import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const gastroenterologyConfig: SpecialtyConfig = {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    nameEs: 'Gastroenterología',
    category: 'medicina_interna',
    categoryLabel: 'Internal Medicine',
    categoryLabelEs: 'Medicina Interna',
    icon: 'Apple',
    color: '#059669',
    colorLight: '#D1FAE5',
    description: 'Digestive system disorders',
    descriptionEs: 'Trastornos del sistema digestivo',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        gastro: true, hepato: true, metabolic: true, endoscopy: true, obesity: true,
    },
    motivesList: [
        'Dolor abdominal', 'Dispepsia', 'Reflujo gastroesofágico', 'Disfagia',
        'Náuseas/Vómitos', 'Diarrea crónica', 'Estreñimiento', 'Sangrado digestivo',
        'Ictericia', 'Hepatitis', 'Cirrosis', 'Colelitiasis', 'Pancreatitis',
        'Enfermedad inflamatoria intestinal', 'Síndrome de intestino irritable',
        'Esteatosis hepática', 'Pérdida de peso', 'Distensión abdominal',
        'Control endoscópico', 'Screening de cáncer colorrectal', 'Obesidad',
    ],
    systemsToExamine: [
        'Abdomen', 'Orofaringe', 'Región perianal', 'Cardiovascular',
        'Piel (ictericia/estigmas)', 'Nutrición/Peso',
    ],
    antecedentGroups: ['gastro', 'hepato', 'metabolic'],
    familyHistoryList: [
        'Cáncer gástrico', 'Cáncer colorrectal', 'Enfermedad inflamatoria intestinal',
        'Poliposis familiar', 'Hepatitis', 'Cirrosis', 'Cáncer de páncreas',
        'Enfermedad celíaca', 'Colelitiasis',
    ],
    physicalExamConfig: {
        systems: ['Abdomen', 'Orofaringe', 'Piel', 'Región perianal'],
        vitalSigns: ['PA', 'FC', 'Peso', 'Talla', 'IMC', 'Temperatura'],
        specialMeasurements: ['Score de Child-Pugh', 'MELD score'],
    },
    customFields: [
        { id: 'endoscopy_findings', label: 'Endoscopy Findings', labelEs: 'Hallazgos endoscópicos', type: 'textarea', section: 'endoscopy', required: false },
        { id: 'colonoscopy_findings', label: 'Colonoscopy Findings', labelEs: 'Hallazgos de colonoscopía', type: 'textarea', section: 'endoscopy', required: false },
        { id: 'liver_function', label: 'Liver Function', labelEs: 'Función hepática', type: 'textarea', section: 'labs', required: false },
        { id: 'bristol_scale', label: 'Bristol Scale', labelEs: 'Escala de Bristol', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7'], section: 'physicalExam', required: false },
        { id: 'h_pylori', label: 'H. pylori Status', labelEs: 'Estado H. pylori', type: 'select', options: ['Positivo', 'Negativo', 'No evaluado'], section: 'labs', required: false },
    ],
    isActive: true,
    sortOrder: 3,
};
