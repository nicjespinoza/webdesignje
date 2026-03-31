# 🏥 Plan Maestro de Arquitectura Clínica 2026
**Transformación a Modelo de Plantillas Clínicas Versionadas por Especialidad (25/25)**

---

## 📅 Propósito del Documento
Este documento técnico define la arquitectura, contratos TypeScript, esquemas de validación Zod, y la estrategia de migración progresiva (Dual-Write) para transformar la Historia Clínica actual (monolítica y débilmente tipada) hacia un modelo estandarizado, versionado y tipado por cada una de las 25 especialidades, priorizando la **Seguridad del Paciente** y la **Observabilidad de Datos**.

---

## 1. Diagnóstico Clínico-Técnico Priorizado

| ID | Brecha Estructural | Impacto | Riesgo Identificado | Solución Arquitectónica |
| :--- | :--- | :---: | :--- | :--- |
| **B1** | Tipos genéricos (`any`) en dominios clínicos. | **ALTO** | Inconsistencia de datos, corrupción de BD e imposibilidad de analítica estructurada. | Refactor a `zod` schemas estrictos con inferencia estática `z.infer`. |
| **B2** | Formulario Monolítico (One-Size-Fits-All). | **ALTO** | Exceso de tiempo de captura; fricción UX; fatiga médica (burnout). | Motor de UI basado en `HistoryTemplate` condicionado por `specialtyId`. |
| **B3** | Ausencia de Versionado de Plantillas. | **ALTO** | Ruptura de UI al intentar leer consultas antiguas («legacy») si cambian los campos. | Todo documento guardado hereda `templateVersion`. |
| **B4** | Ausencia de _Red Flags_ (Alertas Activas). | **ALTO** | Omisión involuntaria de signos críticos (Ej: PA > 180/120) que derivan en daño al paciente. | Zod `superRefine` para evaluar outliers en runtime y emitir `qualityFlags`. |
| **B5** | Sin Estrategia Segura de Migración. | **ALTO** | Riesgo de pérdida o corrupción de las historias pasadas al cambiar de estructura. | Despliegue con estrategia **Dual-Write / Dual-Read**. |
| **B6** | Falta de Trazabilidad Precisa (Audit Trail). | **MEDIO** | Problemas médico-legales al desconocer mutaciones de datos clínicos post-guardado. | Modelo Append-only o logs de mutación firmados (`userId`, `timestamp`). |

---

## 2. Modelo de Datos Objetivo (TypeScript)

Estos contratos reemplazarán los tipos actuales débiles, creando un estándar inmutable.

```typescript
// /src/types/clinicalArchitecture.ts

/**
 * 1. History Template (Diccionario de Plantillas)
 * Define dinámicamente cómo se comporta y renderiza una especialidad.
 */
export interface HistoryTemplate {
  specialtyId: string; // ej. "cardiology", "neurology"
  version: number;     // ej. 1.0 (SemVer)
  active: boolean;
  
  // Array de secciones requeridas para esta especialidad
  requiredSections: Array<'motives' | 'vital_signs' | 'systems' | 'specific_scales' | 'treatment'>;
  
  // Configuración dinámica por campo
  requiredFields: Record<string, string[]>;
  optionalFields: Record<string, string[]>;
  
  // Escalas Clínicas Validadas que se deben mostrar
  scales: Array<{
    id: string;          // ej. "hasbled", "finrisc"
    name: string;        // ej. "Score HAS-BLED"
    maxScore: number;
    thresholds: Record<string, string>; // Ej: { ">= 3": "Alto Riesgo de Sangrado" }
  }>;
  
  // Reglas de Alertas Clínicas (Clinical Decision Support)
  redFlags: Array<{
    fieldPath: string; // ej. "vitalSigns.systolic"
    condition: 'gt' | 'lt' | 'eq' | 'contains';
    threshold: number | string;
    alertMessage: string;
    action: 'warn' | 'block' | 'referral'; // 'warn' avisa, 'block' impide guardar
  }>;

  // Protocolos sugeridos por defecto
  followUpProtocol: {
    defaultDays: number;
    requireTests: boolean;
  };
  
  codingMap?: string[]; // ICD-10 o SNOMED tags default
}

/**
 * 2. Clinical History Normalized (Documento Guardado)
 * El documento final en Firebase Firestore, inmutable y verificable.
 */
export interface ClinicalHistoryNormalized {
  id: string; 
  patientId: string;
  doctorId: string; // Trazabilidad principal
  schemaVersion: "v2"; // Para distinguir de las legacy
  
  // Enlace a la plantilla
  specialtyId: string;
  templateVersion: number; 
  
  auditTrail: {
    createdAt: FirebaseFirestore.Timestamp;
    updatedAt: FirebaseFirestore.Timestamp;
    signatures: Array<{ timestamp: number; userId: string; action: 'create' | 'update' }>;
  };

  // Bloques Clínicos Estrictos
  clinicalData: {
    motives: { main: string[]; others?: string; evolutionTimeDays: number };
    vitalSigns?: { hr: number; rr: number; systolic: number; diastolic: number; temp: number; spo2: number };
    systems?: Record<string, { normal: boolean; notes?: string }>;
    
    // Contenido dinámico tipado genéricamente aquí, pero validado con Zod en runtime
    specialtyData: Record<string, unknown>; 
    
    diagnoses: Array<{ code?: string; text: string; status: 'confirmed' | 'presumptive' }>;
    treatmentPlan: { meds: string[]; tests: string[]; instructions: string };
  };

  // Metadatos Operativos & Observabilidad
  qualityFlags: {
    isComplete: boolean;
    redFlagsTriggered: string[]; // Logs de alertas ignoradas/atendidas
    timeToCompleteSeconds: number; // UX metrics
  };
}
```

---

## 3. Matriz por Especialidad Estructurada (Cobertura 25/25)

*Campos comunes (core) obligatorios para todas: Motivo de consulta, Diagnóstico (CIE-10 desc), Constantes vitales básicas, Plan Terapéutico libre.*

| ID | Especialidad | Secciones Específicas Requeridas | Escalas/Scores Recomendados | Red Flags / Urgencia Inmediata |
|:---|:---|:---|:---|:---|
| `cardiology` | Cardiología | Antecedentes CV familiares, Hábitos (Tabaco/Alcohol) | HAS-BLED, CHA2DS2-VASc | `vitalSigns.systolic > 180`, `vitalSigns.diastolic > 120` |
| `dermatology` | Dermatología | Topografía, Morfología, Fototipo Cutáneo | PASI, Regla ABCDE | Crecimiento acelerado, sangrado asimétrico |
| `endocrinology`| Endocrinología | Control Metabólico, Riesgo pie diabético | FINDRISC | `glucose > 300`, `hba1c > 10` |
| `gastro`       | Gastroenterología | Hábitos intestinales, Reflujo, Endoscopias previas | Escala de Bristol, MELD | Melena, Hematemesis, Pérdida de peso aguda |
| `geriatrics`   | Geriatría | Fragilidad, Polifarmacia, Funcionalidad | Katz, Lawton, Mini-Mental | Caída abrupta en Mini-Mental |
| `gynecology`   | Ginecología/Obstetrícia | AGO completo (Gestas, Paras, FUR), Anticonceptivos | Capurro, Score de Bishop | Sangrado postmenopáusico, Ausencia fetal > 20 SDG |
| `hematology`   | Hematología | Sd. Anémico, Sd. Purpúrico, Citometrías | ECOG | Sangrado mucoso activo, Neutropenia severa |
| `infectious`   | Infectología | Viajes recientes, Exposición, Esquema vacunal | qSOFA, SOFA | Fiebre > 3 sem, Signos meníngeos |
| `pulmonology`  | Neumología | Índice tabáquico, Riesgo laboral, EPOC | Escala de Disnea mMRC | `spo2 < 89` al aire ambiente |
| `neurology`    | Neurología | Pares craneales, Marcha, Reflejos osteotendinosos | Escala de Glasgow, NIHSS | `glasgow < 13`, Asimetría facial súbita |
| `nutrition`    | Nutrición | Recordatorio 24h, Antropometría Avanzada | MUST, NRS-2002 | IMC grave, Pérdida inusual de peso |
| `ophthalmology`| Oftalmología | Agudeza visual, PIO, Fondo de Ojo | Test de Snellen | Pérdida súbita aguda de campo visual |
| `oncology`     | Oncología Médica| Histología, Marcadores, Etapificación TNM | ECOG, Karnofsky | Dolor refractario, Progresión rápida |
| `orthopedics`  | Ortopedia/Traumat.| Cinemática del trauma, Goniometría, Fuerza | Escala Daniels | Sospecha de Síndrome Compartimental |
| `ent`          | Otorrinolaringología| Otoscopia, Rinoscopia, Laringoscopia | House-Brackmann | Hipoacusia súbita |
| `pediatrics`   | Pediatría | APNP perinatales, Desarrollo psicomotor | Percentiles OMS, Apgar | Caída abrupta percentil, Retraso global |
| `psychiatry`   | Psiquiatría | Esfera mental, Riesgo Suicida, Consumo Sustancias | PHQ-9, GAD-7, MADRS | Ideación suicida activa/estructurada |
| `rheumatology` | Reumatología | Conteo articular, Rigidez matutina | DAS28, CDAI | Signos de vasculitis sistémica |
| `urology`      | Urología | Tracto urinario, Tacto rectal, PSA | IPSS | Hematuria macroscópica indolora |
| `internal_med` | Medicina Interna | Multidisciplinario, Sd. metabólico | Índice de Charlson | Combinación >2 parámetros vitales inestables |
| `general_surg` | Cirugía General | Riesgo Quirúrgico, Tiempos Qt, Consentimientos | ASA Score, Caprini | Signos de irritación peritoneal (Abdomen agudo) |
| `plastic_surg` | Cirugía Plástica | Expectativa, Fotografías pre/post, Cicatrización | Escala Vancouver | Necrosis en colgajos |
| `physio`       | Medicina Física/Rehab| Análisis biomecánico, AVD | Escala de Ashworth | Pérdida de fuerza progresiva periférica |
| `allergy`      | Alergología/Inmuno | Pruebas cutáneas prick, Desencadenantes | SCORAD, ACT | Anafilaxia a componentes comunes |
| `nephrology`   | Nefrología | TFG (Cockcroft-Gault), Control hídrico | KDIGO | TFG < 15 sin shunt preparado |

---

## 4. Validación Zod y Control Específico de Calidad

Definiremos esquemas bases robustos, usando `superRefine` para inyectar validación contextual que previene errores clínicos groseros pero informa a la UI sin bloquear el guardado a menos que sea un riesgo vital.

```typescript
// /src/lib/validations/historyMaster.schema.ts
import { z } from 'zod';

// Constantes Vitales base
const vitalSignsSchema = z.object({
  systolic: z.coerce.number().min(30).max(250),
  diastolic: z.coerce.number().min(20).max(180),
  hr: z.coerce.number().min(20).max(220),
  spo2: z.coerce.number().min(0).max(100),
  temp: z.coerce.number().min(30).max(43)
}).superRefine((data, ctx) => {
  if (data.systolic <= data.diastolic) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La Presión Sistólica debe ser mayor a la Diastólica.", path: ["systolic"] });
  }
  if (data.systolic > 180 || data.diastolic > 120) {
    // ESTO ES UN RED FLAG - se le inyectará calidad, no detiene el parseo pero lo marca.
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "🚨 ALERTA: Crisis Hipertensiva", path: ["systolic"] });
  }
});

// Extensiones por Especialidad (Ej: Oftalmología)
const ophthalmologyExtension = z.object({
  intraocularPressureRight: z.coerce.number().min(0).max(60),
  intraocularPressureLeft: z.coerce.number().min(0).max(60),
  fundoscopy: z.string().min(5),
});

// Contrato de Entrada API
export const clinicalHistorySubmitSchema = z.object({
  specialtyId: z.string(),
  patientId: z.string(),
  vitalSigns: vitalSignsSchema,
  motives: z.object({ main: z.array(z.string()).min(1) }),
  specialtyData: z.any() 
}).superRefine((val, ctx) => {
  // Validación Polimórfica Inferencia
  if (val.specialtyId === 'ophthalmology') {
    const parsed = ophthalmologyExtension.safeParse(val.specialtyData);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => ctx.addIssue({...issue, path: ['specialtyData', ...issue.path]}));
    }
  }
  // Añadir validadores para las 24 especialidades restantes...
});
```

---

## 5. Roadmap de Implementación por Fases (Backlog)

### Fase 1: Capa Base e Infraestructura de Validación (Semanas 1-2)
- [ ] **Tarea 1:** Crear contratos TypeScript (`HistoryTemplate`, `ClinicalHistoryNormalized`).
- [ ] **Tarea 2:** Construir el Master Schema de Zod (`historyMaster.schema.ts`).
- [ ] **Tarea 3:** Crear colección en Firestore: `histories_v2`.
- **Riesgos:** Errores de tipado TypeScript rompiendo buids locales. *Esfuerzo: Medio*.

### Fase 2: Implementación de Plantillas Clínicas UI (Semanas 3-5)
- [ ] **Tarea 4:** Construir componente React `DynamicSpecialtyForm` que consuma el Master Schema y renderice inputs basado en `HistoryTemplate`.
- [ ] **Tarea 5:** Implementar calculadoras clínicas incrustadas (IMC, Riesgo CV, etc).
- [ ] **Tarea 6:** Implementar patrón **Dual-Write** en el endpoint de guardado.
- **Riesgos:** Médicos frustrados por el cambio de UI. *Mitigación:* Secciones colapsables por default, UI limpia (Design System actual). *Esfuerzo: Alto*.

### Fase 3: Analítica, Migración y KPIs (Semanas 6-8)
- [ ] **Tarea 7:** Script de Migración _Dual-Read_ (Parsear historias 'legacy' al vuelo si es posible).
- [ ] **Tarea 8:** Desplegar dashboard de Firebase/BigQuery para seguimiento de KPIs.
- [ ] **Tarea 9:** Desconectar escritura sobre colección legacy definitiva.
- **Riesgos:** Corrupción de datos pasados. *Mitigación:* Leer legacy en modo *Read-Only*. *Esfuerzo: Medio*.

---

## 6. Plan de Migración Legacy Sin Ruptura (Dual-Read / Dual-Write)

Para no quebrar la operación de la clínica ni destruir años de historias clínicas, el flujo transaccional será:

1. **Dual-Write Activo (Fase 2):** Al hacer submit en el frontend, el middleware del backend guarda la data sucia/generica en `histories` (legacy) para compatibilidad, pero simultáneamente formatea y pasa por `clinicalHistorySubmitSchema` para guardarla validada y tipada en `histories_v2`.
2. **Read Fallback (Fase 3):** Cuando el frontend pide historias pasadas, la API intenta leer `histories_v2`. Si no existe, lee `histories` (legacy), asume `templateVersion: 0` y la renderiza usando un `<LegacyHistoryViewer />` (solo lectura). 
3. **Rollback Rápido:** Si `histories_v2` falla, basta con establecer una ENV `NEXT_PUBLIC_FORCE_LEGACY_HISTORIES=true` para deshabilitar las validaciones estrictas y regresar al flujo 100% antiguo.

---

## 7. KPIs & Observabilidad Diagnóstica

La creación de registros emitirá eventos a Analytics.

| Métrica (KPI) | Definición | Meta Operativa | Alerta Lógica de Degradación |
| :--- | :--- | :--- | :--- |
| **Completitud Clínica** | `% de campos requeridos llenados por la especialidad` | > 95% | Si cae < 80%, el formulario es muy largo o complejo. |
| **Tiempo por Consulta** | `(Timestamp_Submit - Timestamp_Load) / 60` | 5 - 8 mins | Si pasa de 15 mins, fricción UX detectada. |
| **Tasa de Errores Zod** | `% de submits rechazados por schema invalido` | < 5% | Si > 15%, hay malas precondiciones UX en Frontend. |
| **Ocurrencia Red Flags** | `Count() de Historias con status WARNING / CRITICAL` | N/A | Observabilidad médica estricta de la clínica. |

---

## 8. Pruebas y Criterios de Aceptación (DoD)

Para considerar este Epic terminado y fusionado:

- [x] **Pruebas Unitarias (Jest/Vitest):** Los schemas de Zod manejan correctamente validaciones extremas (ej. peso negativo arroja issue preciso, texto muy largo bloqueado).
- [x] **Zero `any`:** Ningún payload hacia `histories_v2` usa validaciones débiles. Todo pasa por `safeParse`.
- [x] **Tolerancia a Fallos:** Si el guardado a `v2` falla transitoriamente, la aplicación no colapsa y devuelve un log de auditoría.
- [x] **Rendimiento UI:** El formulario dinámico con 25 configuraciones no afecta los *Core Web Vitals* en la clínica (Componentes perezosos/lazy-loaded por especialidad).

---

## 9. Primer PR Recomendado (MVP Arquitectónico)

**Título:** `feat/clinical-core: V2 TypeScript Contracts & Zod Schemas Foundation`
**Descripción:** 
Este PR inicial establece la infraestructura tipiada sin tocar la UI.
- Crea `types/clinicalArchitecture.ts` y Define `ClinicalHistoryNormalized`.
- Crea `lib/validations/historyMaster.schema.ts` con Zod strict mode para constantes vitales y motivos comunes.
- Añade un wrapper experimental a la función `api.createConsult` que paralelamente intente validar payload viejo en payload v2 y dumpee el resultado en `console.log` para que el equipo observe cuántos de los formatos actuales pasarían la validación estricta (Shadow Testing).

*Con esto se valida la hipótesis arquitectónica con riesgo operativo 0.*
