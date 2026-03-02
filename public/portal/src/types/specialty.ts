// ============================================================
// SPECIALTY TYPES - Multi-Specialty Clinical History System
// ============================================================

/**
 * Categorías principales de especialidades médicas
 */
export type SpecialtyCategory =
    | 'medicina_interna'
    | 'quirurgica'
    | 'medico_quirurgica'
    | 'atencion_especializada'
    | 'diagnostico_apoyo'
    | 'odontologia';

/**
 * Configuración de qué secciones del formulario mostrar
 * para cada especialidad
 */
export interface FormSectionConfig {
    // Secciones principales
    motives: boolean;                    // Motivos de consulta
    historyOfPresentIllness: boolean;    // Historia actual de la enfermedad
    personalHistory: boolean;            // Antecedentes personales patológicos

    // Sub-secciones de antecedentes personales
    neurological: boolean;
    metabolic: boolean;
    dermatologic: boolean;
    respiratory: boolean;
    cardiac: boolean;
    gastro: boolean;
    hepato: boolean;
    peripheral: boolean;
    hematological: boolean;
    renal: boolean;
    rheumatological: boolean;
    infectious: boolean;
    psychiatric: boolean;
    gynecoPathological: boolean;         // Solo Ginecología
    gyneco: boolean;                     // Gineco-obstétricos

    // Otras secciones
    medications: boolean;
    surgicalHistory: boolean;
    endoscopy: boolean;
    allergies: boolean;
    habits: boolean;
    familyHistory: boolean;
    familySpecific: boolean;             // Antecedentes familiares específicos de la especialidad
    physicalExam: boolean;
    labs: boolean;
    imaging: boolean;
    treatment: boolean;
    medicalOrders: boolean;

    // Módulos especiales por especialidad
    obesity: boolean;                    // Módulo de Obesidad (Gastro/Endocrino)
    psychiatricEval: boolean;            // Evaluación psiquiátrica (Psiquiatría)
    pediatricDevelopment: boolean;       // Desarrollo psicomotor (Pediatría)
    anesthesiaEval: boolean;             // Evaluación pre-anestésica (Anestesiología)
    surgicalPlanning: boolean;           // Planeación quirúrgica (Cirugías)
    ophthalmologicExam: boolean;         // Examen oftalmológico (Oftalmología)
    audiometry: boolean;                 // Audiometría (ORL)
    dermatoscopy: boolean;               // Dermatoscopia (Dermatología)
    oncologyStaging: boolean;            // Estadificación oncológica (Oncología)
    rehabilitationPlan: boolean;         // Plan de rehabilitación (Med. Física)
    geriatricAssessment: boolean;        // Valoración geriátrica integral (Geriatría)

    // Módulos odontológicos
    odontogram: boolean;                 // Odontograma digital
    periodontalChart: boolean;           // Periodontograma
    dentalRadiology: boolean;            // Radiología dental (panorámica, periapical)
    orthodonticPlan: boolean;            // Plan de ortodoncia
    endodonticRecord: boolean;           // Registro endodóntico
    prosthodonticPlan: boolean;          // Plan protésico
    implantPlan: boolean;                // Plan de implantes
    maxillofacialEval: boolean;          // Evaluación maxilofacial
    cosmeticDentalPlan: boolean;         // Plan de estética dental
    pediatricDentalEval: boolean;        // Evaluación odontopediátrica
}

/**
 * Campo personalizado específico de una especialidad
 */
export interface CustomField {
    id: string;
    label: string;
    labelEs: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'radio' | 'scale';
    options?: string[];                  // Para select/radio
    unit?: string;                       // Para number (e.g., "mmHg", "mg/dL")
    required?: boolean;
    section: string;                     // A qué sección del formulario pertenece
    placeholder?: string;
    min?: number;
    max?: number;
    scaleLabels?: { min: string; max: string };  // Para tipo 'scale'
}

/**
 * Configuración de examen físico por especialidad
 */
export interface PhysicalExamConfig {
    systems: string[];                   // Qué sistemas examinar
    vitalSigns: string[];                // Qué signos vitales tomar
    specialMeasurements?: string[];      // Mediciones especiales (ej: agudeza visual)
}

/**
 * Configuración completa de una especialidad médica
 */
export interface SpecialtyConfig {
    id: string;
    name: string;
    nameEs: string;
    category: SpecialtyCategory;
    categoryLabel: string;
    categoryLabelEs: string;
    icon: string;                        // Nombre del ícono (lucide-react)
    color: string;                       // Color principal (hex)
    colorLight: string;                  // Color claro para backgrounds
    description: string;
    descriptionEs: string;

    // Configuración del formulario
    formSections: FormSectionConfig;

    // Listas dinámicas
    motivesList: string[];               // Motivos de consulta relevantes
    systemsToExamine: string[];          // Sistemas del examen físico
    antecedentGroups: string[];          // Qué grupos de antecedentes mostrar
    familyHistoryList: string[];         // Lista de antecedentes familiares relevantes

    // Configuraciones especiales
    physicalExamConfig: PhysicalExamConfig;
    customFields: CustomField[];         // Campos específicos de la especialidad

    // Metadatos
    isActive: boolean;
    sortOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Categoría que agrupa especialidades
 */
export interface SpecialtyCategoryInfo {
    id: SpecialtyCategory;
    name: string;
    nameEs: string;
    icon: string;
    color: string;
    description: string;
    descriptionEs: string;
    sortOrder: number;
}

/**
 * Clínica/Consultorio (Multi-tenant)
 */
export interface Clinic {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    logo?: string;                       // URL del logo
    specialties: string[];               // IDs de especialidades habilitadas
    plan: 'basic' | 'professional' | 'enterprise';
    maxDoctors: number;
    maxPatients: number;
    settings: ClinicSettings;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface ClinicSettings {
    timezone: string;
    language: string;
    currency: string;
    appointmentDuration: number;         // minutos
    workingHours: {
        start: string;                     // "08:00"
        end: string;                       // "17:00"
    };
    workingDays: number[];               // [1,2,3,4,5] = Lun-Vie
    branding: {
        primaryColor: string;
        secondaryColor: string;
        logoUrl?: string;
    };
}

/**
 * Usuario expandido para multi-especialidad
 */
export interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'doctor' | 'assistant' | 'patient';
    specialtyId?: string;               // ID de la especialidad del doctor
    clinicId?: string;                   // ID de la clínica
    licenseNumber?: string;             // Número de licencia médica
    phone?: string;
    profileImage?: string;
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt?: string;
}

/**
 * Notificación del sistema
 */
export interface Notification {
    id: string;
    userId: string;
    type: 'appointment_reminder' | 'lab_results' | 'message' | 'system' | 'payment';
    title: string;
    body: string;
    read: boolean;
    actionUrl?: string;
    metadata?: Record<string, unknown>;
    createdAt: string;
}

/**
 * Constantes de las categorías de especialidades
 */
export const SPECIALTY_CATEGORIES: SpecialtyCategoryInfo[] = [
    {
        id: 'medicina_interna',
        name: 'Internal Medicine & Related',
        nameEs: 'Medicina Interna y Afines',
        icon: 'Stethoscope',
        color: '#3B82F6',
        description: 'Internal medicine specialties focusing on organ systems',
        descriptionEs: 'Especialidades de medicina interna enfocadas en sistemas orgánicos',
        sortOrder: 1,
    },
    {
        id: 'quirurgica',
        name: 'Surgical Specialties',
        nameEs: 'Especialidades Quirúrgicas',
        icon: 'Scissors',
        color: '#EF4444',
        description: 'Specialties focused on surgical procedures',
        descriptionEs: 'Especialidades enfocadas en procedimientos quirúrgicos',
        sortOrder: 2,
    },
    {
        id: 'medico_quirurgica',
        name: 'Medical-Surgical Specialties',
        nameEs: 'Especialidades Médico-Quirúrgicas',
        icon: 'Activity',
        color: '#8B5CF6',
        description: 'Specialties combining medical and surgical approaches',
        descriptionEs: 'Especialidades que combinan enfoques médicos y quirúrgicos',
        sortOrder: 3,
    },
    {
        id: 'atencion_especializada',
        name: 'Specialized / Critical Care',
        nameEs: 'Atención Especializada / Crítica',
        icon: 'HeartPulse',
        color: '#F59E0B',
        description: 'Specialized and critical care services',
        descriptionEs: 'Servicios de atención especializada y cuidados críticos',
        sortOrder: 4,
    },
    {
        id: 'diagnostico_apoyo',
        name: 'Diagnostic & Support',
        nameEs: 'Diagnóstico y Apoyo',
        icon: 'Scan',
        color: '#10B981',
        description: 'Diagnostic imaging, lab, and support services',
        descriptionEs: 'Servicios de imagenología, laboratorio y apoyo diagnóstico',
        sortOrder: 5,
    },
    {
        id: 'odontologia',
        name: 'Dentistry & Oral Health',
        nameEs: 'Odontología y Salud Oral',
        icon: 'Smile',
        color: '#06B6D4',
        description: 'Dental specialties and oral health services',
        descriptionEs: 'Especialidades odontológicas y servicios de salud oral',
        sortOrder: 6,
    },
];
