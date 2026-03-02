// ============================================================
// SPECIALTY REGISTRY - Central Registry for All Medical Specialties
// ============================================================

import type { SpecialtyConfig, SpecialtyCategory, FormSectionConfig } from '../../types/specialty';

// Import individual specialty configs - Medicina Interna
import { cardiologyConfig } from './configs/cardiology';
import { endocrinologyConfig } from './configs/endocrinology';
import { gastroenterologyConfig } from './configs/gastroenterology';
import { neurologyConfig } from './configs/neurology';
import { nephologyConfig } from './configs/nephrology';
import { pulmonologyConfig } from './configs/pulmonology';
import { hematologyConfig } from './configs/hematology';
import { rheumatologyConfig } from './configs/rheumatology';
import { infectologyConfig } from './configs/infectology';
// Quirúrgicas
import { generalSurgeryConfig } from './configs/general-surgery';
import { orthopedicsConfig } from './configs/orthopedics';
// Médico-Quirúrgicas
import { gynecologyConfig } from './configs/gynecology';
import { ophthalmologyConfig } from './configs/ophthalmology';
import { dermatologyConfig } from './configs/dermatology';
import { urologyConfig } from './configs/urology';
import { otolaryngologyConfig } from './configs/otolaryngology';
// Atención Especializada
import { pediatricsConfig } from './configs/pediatrics';
import { psychiatryConfig } from './configs/psychiatry';
import { geriatricsConfig } from './configs/geriatrics';
// Diagnóstico y Apoyo
import { oncologyConfig } from './configs/oncology';
// Odontología
import { orthodonticsConfig } from './configs/orthodontics';
import { endodonticsConfig } from './configs/endodontics';
import { periodonticsConfig } from './configs/periodontics';
import { pediatricDentistryConfig } from './configs/pediatric-dentistry';
import { prosthodonticsConfig } from './configs/prosthodontics';
import { maxillofacialSurgeryConfig } from './configs/maxillofacial-surgery';
import { implantologyConfig } from './configs/implantology';
import { cosmeticDentistryConfig } from './configs/cosmetic-dentistry';

/**
 * Default form sections - all false, specialties override what they need
 */
export const DEFAULT_FORM_SECTIONS: FormSectionConfig = {
    motives: true,
    historyOfPresentIllness: true,
    personalHistory: true,
    neurological: false, metabolic: false, dermatologic: false,
    respiratory: false, cardiac: false, gastro: false,
    hepato: false, peripheral: false, hematological: false,
    renal: false, rheumatological: false, infectious: false,
    psychiatric: false, gynecoPathological: false, gyneco: false,
    medications: true, surgicalHistory: true, endoscopy: false,
    allergies: true, habits: true, familyHistory: true,
    familySpecific: false, physicalExam: true, labs: true,
    imaging: true, treatment: true, medicalOrders: true,
    obesity: false, psychiatricEval: false, pediatricDevelopment: false,
    anesthesiaEval: false, surgicalPlanning: false, ophthalmologicExam: false,
    audiometry: false, dermatoscopy: false, oncologyStaging: false,
    rehabilitationPlan: false, geriatricAssessment: false,
    // Odontología defaults
    odontogram: false, periodontalChart: false, dentalRadiology: false,
    orthodonticPlan: false, endodonticRecord: false, prosthodonticPlan: false,
    implantPlan: false, maxillofacialEval: false, cosmeticDentalPlan: false,
    pediatricDentalEval: false,
};

/**
 * All registered specialty configurations
 */
export const SPECIALTY_REGISTRY: SpecialtyConfig[] = [
    // Medicina Interna
    cardiologyConfig,
    endocrinologyConfig,
    gastroenterologyConfig,
    neurologyConfig,
    nephologyConfig,
    pulmonologyConfig,
    hematologyConfig,
    rheumatologyConfig,
    infectologyConfig,
    // Quirúrgicas
    generalSurgeryConfig,
    orthopedicsConfig,
    // Médico-Quirúrgicas
    gynecologyConfig,
    ophthalmologyConfig,
    dermatologyConfig,
    urologyConfig,
    otolaryngologyConfig,
    // Atención Especializada
    pediatricsConfig,
    psychiatryConfig,
    geriatricsConfig,
    // Diagnóstico y Apoyo
    oncologyConfig,
    // Odontología
    orthodonticsConfig,
    endodonticsConfig,
    periodonticsConfig,
    pediatricDentistryConfig,
    prosthodonticsConfig,
    maxillofacialSurgeryConfig,
    implantologyConfig,
    cosmeticDentistryConfig,
];

/**
 * Lookup a specialty by ID
 */
export function getSpecialtyById(id: string): SpecialtyConfig | undefined {
    return SPECIALTY_REGISTRY.find(s => s.id === id);
}

/**
 * Get all specialties for a category
 */
export function getSpecialtiesByCategory(category: SpecialtyCategory): SpecialtyConfig[] {
    return SPECIALTY_REGISTRY.filter(s => s.category === category).sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get all active specialties
 */
export function getActiveSpecialties(): SpecialtyConfig[] {
    return SPECIALTY_REGISTRY.filter(s => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get specialties grouped by category
 */
export function getSpecialtiesGrouped(): Record<SpecialtyCategory, SpecialtyConfig[]> {
    const grouped: Record<string, SpecialtyConfig[]> = {};
    for (const s of SPECIALTY_REGISTRY) {
        if (!grouped[s.category]) grouped[s.category] = [];
        grouped[s.category].push(s);
    }
    return grouped as Record<SpecialtyCategory, SpecialtyConfig[]>;
}
