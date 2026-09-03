import { generateText, type ModelMessage } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

const openai = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.VERCEL_AI_API_KEY,
});

const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(4000),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(100),
});

const SYSTEM_PROMPT = `Eres WebdesignJE, el asistente experto inteligente de Joseph Espinoza. 
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
1. Si te preguntan sobre precios, indica que cada proyecto es personalizado y sugiere agendar una asesoría técnica a este link: https://wa.me/50580610651?text=Hola%20estoy%20intersad@%20en%20agendar%20una%20reunion%20para%20una%20asesoria%20gratis.
2. Dirige la conversación sutilmente hacia la sección de servicios o el formulario de contacto.
3. Responde siempre en el idioma que el usuario te hable (español por defecto).
4. No uses negritas con asteriscos (**). Si necesitas listar elementos, usa viñetas (-).
5. Usa saltos de línea (puntos y aparte) frecuentemente para que el texto sea fácil de leer y no un bloque pesado.`;

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, 15, 60 * 1000);
    if (!rateLimit.success) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request', details: parsed.error.issues }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = parsed.data;

    const messagesWithSystem = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages,
    ];

    const result = await generateText({
      model: openai('deepseek/deepseek-v4-flash'),
      messages: messagesWithSystem as ModelMessage[],
    });

    return new Response(JSON.stringify({ content: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
