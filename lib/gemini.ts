// ============================================================
// Cliente para la API de Google Gemini
// Uso: generar sugerencias médicas, autocompletado de diagnósticos,
// análisis de síntomas, etc.
// ============================================================

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/** Estructura de respuesta de la API de Gemini */
interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

/**
 * Envía un prompt a la API de Gemini y retorna el texto generado.
 * @param prompt - El texto/instrucción a enviar
 * @returns El texto generado por Gemini
 * @throws Error si la API falla o no hay API key configurada
 */
export async function askGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "NEXT_PUBLIC_GEMINI_API_KEY no está configurada en .env.local"
    );
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      // Parámetros conservadores para contexto médico (baja creatividad)
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error de Gemini API: ${response.status} - ${error}`);
  }

  const data: GeminiResponse = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text ?? "";
}

/**
 * Genera una sugerencia de diagnóstico basada en síntomas.
 * Wrapper especializado de askGemini para uso médico.
 * @param symptoms - Descripción de los síntomas del paciente
 */
export async function suggestDiagnosis(symptoms: string): Promise<string> {
  const prompt = `Como asistente médico IA, analiza los siguientes síntomas y sugiere posibles diagnósticos diferenciales. Sé conciso y profesional. Aclara que esto es solo una sugerencia y no reemplaza el criterio médico.\n\nSíntomas: ${symptoms}`;
  return askGemini(prompt);
}
