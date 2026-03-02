# Análisis detallado para mejorar historias clínicas por especialidad

## 1) Resumen ejecutivo

El proyecto ya tiene una **base funcional sólida** para historia clínica inicial (secciones, validación Zod, catálogo de especialidades y guardado en Firestore), pero hoy está centrado en un modelo **semi-genérico** con personalizaciones puntuales (obesidad para gastroenterología y gineco-obstétrica para ginecología). Esto limita calidad clínica y trazabilidad por especialidad.

Para escalar “todas las historias clínicas de cada especialidad”, la mejora clave es migrar a un enfoque de:

- **Plantillas clínicas por especialidad** (campos obligatorios, escalas, alertas y cálculo de riesgo).
- **Versionado y gobernanza clínica** de formularios.
- **Normalización semántica** (diccionarios clínicos reutilizables).
- **KPIs de completitud/calidad** por servicio y médico.

---

## 2 Hallazgos técnicos actuales (estado del código)

### 2.1 Catálogo de especialidades (fortaleza)

Ya existe una definición extensa de especialidades y categorías (`SPECIALTIES`, `CATEGORIES`) que puede servir como “llave maestra” para orquestar formularios dinámicos por servicio. Este archivo incluye 25 especialidades en 6 categorías. 

**Oportunidad**: agregar metadatos clínicos por especialidad (secciones requeridas, escalas, validadores, banderas de seguridad y versión de plantilla).

### 2.2 Configuración clínica parcial por especialidad

La interfaz `Specialty` ya contempla campos como `hasObesityHistory`, `hasGynecoHistory` y `customSections`, pero actualmente su uso es limitado.

**Oportunidad**: convertir esto en un contrato completo tipo `historyTemplate` con:
- `requiredFields`
- `scoringRules`
- `redFlags`
- `codingMap` (CIE-10/SNOMED opcional)

### 2.3 Formulario de historia inicial (base reusable)

La pantalla de creación de historia clínica usa `react-hook-form` + `zodResolver` + secciones modulares (`MotivesSection`, `PhysicalExamSection`, etc.), lo cual facilita escalar.

**Limitaciones observadas**:
- Detección de especialidad con fallback rígido en `localStorage` (`gastroenterology`).
- Se muestra módulo de obesidad solo para gastro.
- No hay matriz de requisitos clínicos por cada especialidad.

### 2.4 Validación actual demasiado flexible

El schema de historia usa múltiples `z.any()` (motivos, no patológicos, examen físico, diagnóstico, plan), lo que permite inconsistencias estructurales.

**Riesgo**: datos heterogéneos dificultan reportes, IA clínica, auditoría y analítica longitudinal.

### 2.5 Capa API con estrategia dual (fortaleza operativa)

La API guarda historia en subcolección de paciente y colección raíz (`patients/{id}/histories` + `initialHistories`), con cache/offline queue/auditoría.

**Oportunidad**: aprovechar esta arquitectura para versionar plantillas y migrar de manera segura sin romper historial previo.

### 2.6 Desalineación de tipos globales

`types/index.ts` define `MedicalSpecialty` y `ClinicalHistory` de forma reducida, mientras que la app usa entidades más ricas (`InitialHistory`, `SubsequentConsult`, etc.).

**Riesgo**: deuda técnica de tipado, fricción para evolución y mayor probabilidad de regresiones.

---

## 3) Propuesta clínica: mejora por todas las especialidades

## 3.1 Modelo objetivo (común a todas)

Crear una `HistoryTemplate` por especialidad:

```ts
interface HistoryTemplate {
  specialtyId: string;
  version: string;
  requiredSections: string[];
  requiredFields: string[];
  optionalFields: string[];
  scales?: Array<{ id: string; label: string; autoCalc?: boolean }>;
  redFlags?: Array<{ id: string; condition: string; severity: 'low'|'medium'|'high' }>;
  followUpProtocol?: {
    defaultDays: number;
    triggers: string[];
  };
}
```

Con esto, cada especialidad pasa de un “formulario único” a una historia verdaderamente clínica.

---

## 3.2 Recomendaciones por especialidad (25)

> Formato: **campos/escala crítica** + **alertas clave** + **resultado esperado**.

### Medicina interna

1. **Cardiología**
   - NYHA, CCS, factores CV, ECG/ECO, FEVI.
   - Alertas: dolor torácico activo, disnea en reposo, síncope.
   - Resultado: estratificación CV consistente.

2. **Endocrinología**
   - HbA1c, glucosa, TSH/T4, IMC, perímetro abdominal.
   - Alertas: hipoglucemia severa, cetosis.
   - Resultado: control metabólico longitudinal.

3. **Gastroenterología**
   - Síntomas GI por patrón, escala Bristol, sangrado digestivo.
   - Alertas: melena/hematemesis, pérdida ponderal.
   - Resultado: mejor triaje digestivo + módulo obesidad robusto.

4. **Neurología**
   - NIHSS básico, lateralización, cefalea red flags.
   - Alertas: déficit focal agudo, alteración súbita de conciencia.
   - Resultado: detección temprana de urgencias neurológicas.

5. **Nefrología**
   - TFG estimada, albuminuria, balance hídrico, potasio.
   - Alertas: hiperK, sobrecarga de volumen.
   - Resultado: seguimiento ERC por estadio.

6. **Neumología**
   - mMRC, tabaquismo paquete-año, SatO2 basal, espirometría.
   - Alertas: hipoxemia, hemoptisis.
   - Resultado: control estructurado EPOC/asma.

7. **Hematología**
   - Serie roja/blanca/plaquetas + síntomas B.
   - Alertas: neutropenia febril, sangrado activo.
   - Resultado: referencia oportuna y menor omisión diagnóstica.

8. **Reumatología**
   - Articulaciones dolorosas/tumefactas, EVA dolor, rigidez matutina.
   - Alertas: compromiso sistémico, vasculitis sospechada.
   - Resultado: seguimiento de actividad inflamatoria.

9. **Infectología**
   - foco infeccioso, cultivos, antibiótico previo, SOFA/qSOFA básico.
   - Alertas: sepsis, inmunosupresión + fiebre.
   - Resultado: antibiótico dirigido y trazabilidad.

### Quirúrgicas

10. **Cirugía general**
   - riesgo anestésico (ASA), ayuno, consentimiento, profilaxis ATB.
   - Alertas: abdomen agudo, inestabilidad hemodinámica.
   - Resultado: mejor seguridad preoperatoria.

11. **Ortopedia y traumatología**
   - mecanismo de lesión, escala dolor, estado neurovascular distal.
   - Alertas: síndrome compartimental, fractura expuesta.
   - Resultado: estandarización trauma músculo-esquelético.

### Médico-quirúrgicas

12. **Ginecología y obstetricia**
   - FUM, G/P/A/C, edad gestacional, riesgo obstétrico.
   - Alertas: sangrado en embarazo, HTA gestacional.
   - Resultado: historia gineco-obstétrica completa y segura.

13. **Oftalmología**
   - AV por ojo, tonometría, fondo de ojo resumido.
   - Alertas: pérdida visual súbita, dolor ocular severo.
   - Resultado: priorización de patología urgente.

14. **Dermatología**
   - morfología lesión, localización, evolución, fotos seriadas.
   - Alertas: lesiones ABCDE melanoma.
   - Resultado: mejor seguimiento dermatosis crónicas.

15. **Urología**
   - IPSS, LUTS, función sexual, hematuria.
   - Alertas: retención urinaria aguda, hematuria macroscópica.
   - Resultado: decisión terapéutica más objetiva.

16. **Otorrinolaringología**
   - otalgia/hipoacusia, rinosinusitis criterios, disfonía crónica.
   - Alertas: estridor, epistaxis severa.
   - Resultado: mejor tamizaje de vía aérea y ENT.

### Atención especializada

17. **Pediatría**
   - percentiles OMS, esquema vacunación, desarrollo psicomotor.
   - Alertas: signos de deshidratación/sepsis pediátrica.
   - Resultado: seguimiento integral por edad.

18. **Psiquiatría**
   - riesgo suicida, escala depresiva/ansiedad, consumo sustancias.
   - Alertas: ideación suicida activa, psicosis aguda.
   - Resultado: continuidad terapéutica y seguridad del paciente.

19. **Geriatría**
   - Barthel, Pfeiffer/MMSE, fragilidad, polifarmacia.
   - Alertas: delirium, caídas recurrentes.
   - Resultado: plan funcional centrado en autonomía.

### Diagnóstico y apoyo

20. **Oncología**
   - estadio, ECOG, eventos adversos (CTCAE simplificado).
   - Alertas: neutropenia febril, toxicidad severa.
   - Resultado: continuidad oncológica con seguridad.

### Odontología

21. **Ortodoncia**
   - clase esqueletal, apiñamiento, plan biomecánico.
22. **Endodoncia**
   - diagnóstico pulpar/periapical, longitud de trabajo, irrigación.
23. **Periodoncia**
   - sondaje, sangrado, movilidad, pérdida ósea.
24. **Odontopediatría**
   - riesgo de caries, hábitos, conducta clínica.
25. **Prostodoncia / Maxilofacial / Implantología / Estética**
   - checklist protésico-quirúrgico-fotográfico con consentimiento.

Alertas comunes en odontología: infección aguda diseminada, compromiso de vía aérea, dolor no controlado.

---

## 4) Roadmap de implementación (priorizado)

### Fase 1 (rápida, 1–2 semanas)

1. Definir `historyTemplates` por especialidad en un módulo central.
2. Tipar campos `z.any()` críticos con schemas específicos por sección.
3. Introducir validaciones mínimas obligatorias por especialidad.
4. Corregir selección de especialidad para no depender de fallback fijo.

### Fase 2 (2–4 semanas)

1. Versionado de plantillas (`templateVersion`) guardado por historia.
2. Motor de alertas clínicas (`redFlags`) en tiempo real.
3. Campos estructurados para diagnósticos y plan terapéutico.
4. KPI de calidad: completitud por sección/especialidad.

### Fase 3 (4–8 semanas)

1. Codificación clínica (CIE-10/SNOMED opcional).
2. Escalas automáticas con puntajes y recomendaciones.
3. Analítica longitudinal por paciente y por especialidad.
4. Migración progresiva de historias antiguas a formato normalizado.

---

## 5) Indicadores de éxito

- **Completitud clínica por especialidad** > 90%.
- **Campos críticos omitidos** < 5%.
- **Tiempo de registro** sin degradación (> no aumentar más de 15%).
- **Alertas útiles confirmadas por médico** > 70%.
- **Consistencia de datos** (sin `shape drift`) > 95%.

---

## 6) Backlog técnico sugerido (acciones concretas)

1. Crear `lib/historyTemplates.ts` con contrato completo.
2. Migrar `initialHistorySchema` a secciones tipadas.
3. Unificar tipos clínicos en `types/index.ts` (eliminar duplicidad conceptual).
4. Añadir pruebas de validación por especialidad (unitarias con Zod).
5. Añadir “modo auditoría” para detectar historias incompletas.
6. Mejorar UI de secciones condicionales según template.

---

## 7) Riesgos y mitigación

- **Riesgo**: sobrecargar formulario y aumentar tiempo de captura.
  - **Mitigación**: progressive disclosure por motivo de consulta.
- **Riesgo**: resistencia de usuarios clínicos.
  - **Mitigación**: activar por especialidad y beta con feedback.
- **Riesgo**: deuda de datos históricos no estructurados.
  - **Mitigación**: estrategia dual (legacy + normalized) con migración gradual.

---

## 8) Conclusión

El proyecto está bien encaminado para crecer, pero para mejorar realmente “todas las historias clínicas por especialidad” necesita pasar de configuración puntual a una **arquitectura clínica basada en plantillas versionadas**. Con esa base, podrán elevar calidad asistencial, seguridad del paciente y valor analítico sin romper el flujo operativo actual.