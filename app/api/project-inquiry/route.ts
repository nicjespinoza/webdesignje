import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { checkRateLimit } from '@/lib/rateLimit';

const AI_GATEWAY_TOKEN = process.env.VERCEL_AI_API_KEY;

const customOpenAI = createOpenAI({
  apiKey: AI_GATEWAY_TOKEN,
});

const SYSTEM_PROMPT = `Eres WebdesignJE, el asistente experto inteligente de Joseph Espinoza.
Tu objetivo es analizar los requerimientos de un cliente potencial para un proyecto específico y darle una breve sugerencia o comentario profesional y elegante (máximo 3 párrafos cortos) sobre cómo la plataforma de Joseph Espinoza puede ayudarle a cumplir esos requerimientos. Sé persuasivo, realista y muy profesional.`;

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, 15, 60 * 1000);
    if (!rateLimit.success) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }

    const { text } = await generateText({
      model: customOpenAI('gpt-4o-mini') as unknown as Parameters<typeof generateText>[0]['model'],
      system: SYSTEM_PROMPT,
      prompt: message,
      maxOutputTokens: 500,
    });

    return new Response(JSON.stringify({ success: true, message: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Project Inquiry AI Error:', error instanceof Error ? error.stack || error.message : String(error));
    // En lugar de enviar un 500 y causar un error en la consola, enviamos un 200 con success: false
    // para que el frontend maneje el fallback amigablemente.
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Hemos recibido tu solicitud exitosamente con todos los detalles técnicos. Nuestro equipo se pondrá en contacto pronto.",
        error: error instanceof Error ? error.message : String(error) 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
