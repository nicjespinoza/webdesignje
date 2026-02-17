// ============================================================
// Tipos globales del proyecto Medical AI Demo
// Definiciones TypeScript estrictas para todo el sistema
// ============================================================

import type { User } from "firebase/auth";

// ---- Autenticación ----

/** Datos del contexto de autenticación global */
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// ---- Especialidades Médicas ----

/** Especialidades médicas soportadas por el sistema */
export type MedicalSpecialty =
  | "medicina_general"
  | "pediatria"
  | "ginecologia"
  | "cardiologia"
  | "neurologia"
  | "traumatologia"
  | "dermatologia"
  | "oftalmologia";

// ---- Pacientes ----

/** Datos básicos de un paciente */
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  birthDate: string;
  gender: "M" | "F" | "O";
  phone: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Historias Clínicas ----

/** Historia clínica base (se extenderá por especialidad) */
export interface ClinicalHistory {
  id: string;
  patientId: string;
  doctorId: string;
  specialty: MedicalSpecialty;
  date: Date;
  diagnosis: string;
  treatment: string;
  notes: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
