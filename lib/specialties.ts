
import {
    Heart, Brain, Apple, Droplets, Wind, TestTubes, Bone, Bug, Scissors,
    Baby, Eye, Fingerprint, Ear, HeartPulse, Scan, Smile, Sparkles, Pin,
    Component, Layers, Zap, Ribbon, Droplet, Activity, LucideIcon
} from 'lucide-react';

export type SpecialtyCategory =
    | 'medicina_interna' | 'quirurgica' | 'medico_quirurgica'
    | 'atencion_especializada' | 'diagnostico_apoyo' | 'odontologia';

export interface CategoryInfo {
    id: SpecialtyCategory;
    nameEs: string;
    icon: LucideIcon;
    color: string;
    descriptionEs: string;
}

export interface Specialty {
    id: string;
    nameEs: string;
    icon: LucideIcon;
    color: string;
    category: SpecialtyCategory;
    descriptionEs: string;
    // Configuration for the history form
    hasObesityHistory?: boolean;
    hasGynecoHistory?: boolean;
    customSections?: string[];
}

export const CATEGORIES: CategoryInfo[] = [
    { id: 'medicina_interna', nameEs: 'Medicina Interna', icon: HeartPulse, color: '#EF4444', descriptionEs: 'Especialidades de medicina interna y subespecialidades' },
    { id: 'quirurgica', nameEs: 'Quirúrgicas', icon: Scissors, color: '#8B5CF6', descriptionEs: 'Especialidades quirúrgicas y cirugía' },
    { id: 'medico_quirurgica', nameEs: 'Médico-Quirúrgicas', icon: Activity, color: '#F59E0B', descriptionEs: 'Especialidades médico-quirúrgicas' },
    { id: 'atencion_especializada', nameEs: 'Atención Especializada', icon: Baby, color: '#3B82F6', descriptionEs: 'Pediatría, psiquiatría y atención geriátrica' },
    { id: 'diagnostico_apoyo', nameEs: 'Diagnóstico y Apoyo', icon: Scan, color: '#10B981', descriptionEs: 'Servicios de imagenología y apoyo diagnóstico' },
    { id: 'odontologia', nameEs: 'Odontología y Salud Oral', icon: Smile, color: '#06B6D4', descriptionEs: 'Especialidades odontológicas' },
];

export const SPECIALTIES: Specialty[] = [
    // Medicina Interna
    { id: 'cardiology', nameEs: 'Cardiología', icon: Heart, color: '#EF4444', descriptionEs: 'Enfermedades del corazón y sistema cardiovascular', category: 'medicina_interna' },
    { id: 'endocrinology', nameEs: 'Endocrinología', icon: Apple, color: '#F97316', descriptionEs: 'Trastornos hormonales y metabólicos', category: 'medicina_interna' },
    { id: 'gastroenterology', nameEs: 'Gastroenterología', icon: Droplets, color: '#22C55E', descriptionEs: 'Sistema digestivo, hígado y páncreas', category: 'medicina_interna', hasObesityHistory: true },
    { id: 'neurology', nameEs: 'Neurología', icon: Brain, color: '#A855F7', descriptionEs: 'Sistema nervioso central y periférico', category: 'medicina_interna' },
    { id: 'nephrology', nameEs: 'Nefrología', icon: Droplet, color: '#3B82F6', descriptionEs: 'Enfermedades renales y diálisis', category: 'medicina_interna' },
    { id: 'pulmonology', nameEs: 'Neumología', icon: Wind, color: '#06B6D4', descriptionEs: 'Enfermedades respiratorias y pulmonares', category: 'medicina_interna' },
    { id: 'hematology', nameEs: 'Hematología', icon: TestTubes, color: '#DC2626', descriptionEs: 'Enfermedades de la sangre', category: 'medicina_interna' },
    { id: 'rheumatology', nameEs: 'Reumatología', icon: Bone, color: '#D97706', descriptionEs: 'Enfermedades autoinmunes y articulares', category: 'medicina_interna' },
    { id: 'infectology', nameEs: 'Infectología', icon: Bug, color: '#059669', descriptionEs: 'Enfermedades infecciosas', category: 'medicina_interna' },
    // Quirúrgicas
    { id: 'general_surgery', nameEs: 'Cirugía General', icon: Scissors, color: '#8B5CF6', descriptionEs: 'Procedimientos quirúrgicos generales', category: 'quirurgica' },
    { id: 'orthopedics', nameEs: 'Ortopedia y Traumatología', icon: Bone, color: '#6366F1', descriptionEs: 'Sistema musculoesquelético', category: 'quirurgica' },
    // Médico-Quirúrgicas
    { id: 'gynecology', nameEs: 'Ginecología y Obstetricia', icon: HeartPulse, color: '#EC4899', descriptionEs: 'Salud femenina y reproducción', category: 'medico_quirurgica', hasGynecoHistory: true },
    { id: 'ophthalmology', nameEs: 'Oftalmología', icon: Eye, color: '#14B8A6', descriptionEs: 'Enfermedades de los ojos', category: 'medico_quirurgica' },
    { id: 'dermatology', nameEs: 'Dermatología', icon: Fingerprint, color: '#F472B6', descriptionEs: 'Piel, cabello y uñas', category: 'medico_quirurgica' },
    { id: 'urology', nameEs: 'Urología', icon: Droplet, color: '#0EA5E9', descriptionEs: 'Sistema urinario y reproductor masculino', category: 'medico_quirurgica' },
    { id: 'otolaryngology', nameEs: 'Otorrinolaringología', icon: Ear, color: '#6366F1', descriptionEs: 'Oído, nariz y garganta', category: 'medico_quirurgica' },
    // Atención Especializada
    { id: 'pediatrics', nameEs: 'Pediatría', icon: Baby, color: '#3B82F6', descriptionEs: 'Atención infantil y adolescente', category: 'atencion_especializada' },
    { id: 'psychiatry', nameEs: 'Psiquiatría', icon: Brain, color: '#8B5CF6', descriptionEs: 'Salud mental y trastornos psiquiátricos', category: 'atencion_especializada' },
    { id: 'geriatrics', nameEs: 'Geriatría', icon: Heart, color: '#F59E0B', descriptionEs: 'Atención del adulto mayor', category: 'atencion_especializada' },
    // Diagnóstico y Apoyo
    { id: 'oncology', nameEs: 'Oncología', icon: Ribbon, color: '#EC4899', descriptionEs: 'Diagnóstico y tratamiento del cáncer', category: 'diagnostico_apoyo' },
    // Odontología
    { id: 'orthodontics', nameEs: 'Ortodoncia', icon: Smile, color: '#06B6D4', descriptionEs: 'Alineación dental y corrección de mordida', category: 'odontologia' },
    { id: 'endodontics', nameEs: 'Endodoncia', icon: Zap, color: '#F97316', descriptionEs: 'Tratamiento de conductos radiculares', category: 'odontologia' },
    { id: 'periodontics', nameEs: 'Periodoncia', icon: Layers, color: '#16A34A', descriptionEs: 'Enfermedades de encías y tejidos de soporte', category: 'odontologia' },
    { id: 'pediatric_dentistry', nameEs: 'Odontopediatría', icon: Baby, color: '#FBBF24', descriptionEs: 'Cuidado dental para niños', category: 'odontologia' },
    { id: 'prosthodontics', nameEs: 'Prostodoncia', icon: Component, color: '#A855F7', descriptionEs: 'Prótesis dentales y rehabilitación oral', category: 'odontologia' },
    { id: 'maxillofacial_surgery', nameEs: 'Cirugía Maxilofacial', icon: Scissors, color: '#DC2626', descriptionEs: 'Cirugía de maxilares y cara', category: 'odontologia' },
    { id: 'implantology', nameEs: 'Implantología Dental', icon: Pin, color: '#6366F1', descriptionEs: 'Implantes dentales', category: 'odontologia' },
    { id: 'cosmetic_dentistry', nameEs: 'Odontología Estética', icon: Sparkles, color: '#EC4899', descriptionEs: 'Diseño de sonrisa y estética dental', category: 'odontologia' },
];

export const getSpecialtyById = (id: string) => SPECIALTIES.find(s => s.id === id) || SPECIALTIES[0];

export const getCategoryById = (id: string) => CATEGORIES.find(c => c.id === id);
