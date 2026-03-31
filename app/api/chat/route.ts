import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Vercel AI SDK 4.x pattern with AI Gateway
const AI_GATEWAY_TOKEN = process.env.VERCEL_AI_API_KEY;

// Si estás usando Vercel AI Gateway, el baseURL suele ser similar a:
// https://gateway.ai.cloudflare.com/v1/.../openai (si es CF)
// O si es nativo de Vercel, podrías no necesitar baseURL si ya está configurado en el SDK, 
// pero usualmente se requiere especificar el endpoint del gateway.
const customOpenAI = createOpenAI({
    apiKey: AI_GATEWAY_TOKEN,
    // baseURL: 'TU_ENDPOINT_DE_GATEWAY_AQUI', // Descomentar y configurar si es necesario
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 });
    }

    const result = streamText({
      model: customOpenAI('meta/llama-3.1-8b'), 
      system: `Eres WebdesignJE, el asistente experto inteligente de Joseph Espinoza. 
      Tu identidad es profesional, elegante, técnica y altamente persuasiva. 
      Tu objetivo principal es convertir visitantes en clientes potenciales para los servicios de Joseph Espinoza:
      - Desarrollo de páginas web premium (Next.js, React).
      - Desarrollo de software web y aplicaciones móviles escalables.
      - Implementación de Inteligencia Artificial (Agentes IA, Automatización, RAG).
      
      Sobre Joseph Espinoza:
      - Es un Full-Stack Developer & AI Engineer con más de 13 proyectos entregados globalmente.
      - Experto en arquitecturas modernas con Next.js 15, Firebase, Vercel y modelos de lenguaje avanzados.
      
      Tono:
      - Servicial pero autoritario en temas técnicos.
      - Evita respuestas genéricas. Sé específico sobre cómo la IA y el buen diseño web pueden ayudar al negocio del usuario.
      - Usa un lenguaje que inspire confianza y exclusividad (Dorado Líquido es el color de la marca).
      
      Instrucciones clave:
      1. Si te preguntan sobre precios, indica que cada proyecto es personalizado y sugiere agendar una asesoría técnica.
      2. Dirige la conversación sutilmente hacia la sección de servicios o el formulario de contacto.
      3. Responde siempre en el idioma que el usuario te hable (español por defecto).`,
      messages,
    });

    // Cambiado a toDataStreamResponse() para compatibilidad completa con useChat v4
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
