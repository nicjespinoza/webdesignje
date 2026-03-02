import type { SpecialtyConfig } from '../../../types/specialty';
import { DEFAULT_FORM_SECTIONS } from '../registry';

export const endodonticsConfig: SpecialtyConfig = {
    id: 'endodontics',
    name: 'Endodontics',
    nameEs: 'Endodoncia',
    category: 'odontologia',
    categoryLabel: 'Dentistry',
    categoryLabelEs: 'Odontología',
    icon: 'Zap',
    color: '#F97316',
    colorLight: '#FFF7ED',
    description: 'Root canal treatment and pulp therapy',
    descriptionEs: 'Tratamiento de conductos radiculares y terapia pulpar',
    formSections: {
        ...DEFAULT_FORM_SECTIONS,
        odontogram: true, dentalRadiology: true, endodonticRecord: true,
        labs: false,
    },
    motivesList: [
        'Pulpitis reversible', 'Pulpitis irreversible sintomática', 'Pulpitis irreversible asintomática',
        'Necrosis pulpar', 'Absceso periapical agudo', 'Absceso periapical crónico',
        'Periodontitis apical', 'Traumatismo dental', 'Fractura dental',
        'Resorción radicular', 'Retratamiento endodóntico', 'Perforación radicular',
        'Dolor dental espontáneo', 'Sensibilidad al frío/calor', 'Fístula gingival',
    ],
    systemsToExamine: [
        'Dental específico', 'Pulpar', 'Periapical', 'Periodontal', 'Tejidos blandos',
    ],
    antecedentGroups: [],
    familyHistoryList: [],
    physicalExamConfig: {
        systems: ['Dental', 'Pulpar', 'Periapical'],
        vitalSigns: ['PA'],
        specialMeasurements: ['Test de vitalidad pulpar (frío/calor/eléctrico)', 'Percusión vertical/horizontal', 'Palpación apical', 'Sondeo periodontal'],
    },
    customFields: [
        { id: 'tooth_number', label: 'Tooth Number (FDI)', labelEs: 'Número de pieza (FDI)', type: 'text', section: 'endodonticRecord', required: true },
        { id: 'pulp_diagnosis', label: 'Pulp Diagnosis', labelEs: 'Diagnóstico pulpar', type: 'select', options: ['Pulpa normal', 'Pulpitis reversible', 'Pulpitis irreversible sintomática', 'Pulpitis irreversible asintomática', 'Necrosis pulpar', 'Previamente tratado', 'Previamente iniciado'], section: 'endodonticRecord', required: true },
        { id: 'periapical_diagnosis', label: 'Periapical Diagnosis', labelEs: 'Diagnóstico periapical', type: 'select', options: ['Tejido apical normal', 'Periodontitis apical sintomática', 'Periodontitis apical asintomática', 'Absceso apical agudo', 'Absceso apical crónico', 'Osteítis condensante'], section: 'endodonticRecord', required: true },
        { id: 'working_length', label: 'Working Length (mm)', labelEs: 'Longitud de trabajo (mm)', type: 'text', section: 'endodonticRecord', placeholder: 'Ej: DB:18, ML:19, MV:20', required: false },
        { id: 'num_canals', label: 'Number of Canals', labelEs: 'Número de conductos', type: 'number', section: 'endodonticRecord', min: 1, max: 5, required: false },
        { id: 'obturation_technique', label: 'Obturation Technique', labelEs: 'Técnica de obturación', type: 'select', options: ['Condensación lateral', 'Condensación vertical caliente', 'Termoplástica', 'Carrier-based', 'MTA apical plug'], section: 'endodonticRecord', required: false },
        { id: 'periapical_xray', label: 'Periapical X-Ray Findings', labelEs: 'Hallazgos Rx periapical', type: 'textarea', section: 'dentalRadiology', required: false },
    ],
    isActive: true,
    sortOrder: 22,
};
