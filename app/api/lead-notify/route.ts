import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

const notifySchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  projectType: z.string().optional(),
  mainProblem: z.string().optional(),
  budget: z.string().optional(),
  ticketNumber: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, 10, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = notifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const lead = parsed.data;

    // 1. Enviar notificación opcional a Telegram si está configurado en .env
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const message = `🚀 *¡Nuevo Lead Recibido en WebDesignJE!*\n\n` +
        `👤 *Cliente:* ${lead.fullName}\n` +
        `📧 *Email:* ${lead.email}\n` +
        `📱 *Teléfono:* ${lead.phone || 'No indicado'}\n` +
        `🏢 *Empresa:* ${lead.companyName || 'No indicada'}\n` +
        `🎯 *Tipo:* ${lead.projectType || 'General'}\n` +
        `💰 *Presupuesto:* ${lead.budget || 'A definir'}\n` +
        `⚠️ *Desafío:* ${lead.mainProblem || 'No especificado'}\n` +
        `🎫 *Ticket:* \`${lead.ticketNumber || 'N/A'}\``;

      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }).catch(err => console.error('Telegram notification error:', err));
    }

    return NextResponse.json({ success: true, message: 'Notification processed' });
  } catch (error) {
    console.error('Lead notification error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
