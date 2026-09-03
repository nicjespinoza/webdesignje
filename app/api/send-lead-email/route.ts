import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadEmailPayload {
  projectName: string;
  projectId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  companyName?: string;
  businessProfile?: Record<string, string>;
  painPoints?: string[];
  selectedFeatures?: string[];
  goals?: string;
  timeline?: string;
  budget?: string;
  references?: string;
}

function buildHtmlContent(data: LeadEmailPayload): string {
  const profileRows = data.businessProfile
    ? Object.entries(data.businessProfile)
        .map(
          ([key, value]) =>
            `<tr><td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:13px;text-transform:capitalize;">${key}</td><td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#f1f5f9;font-size:13px;">${value}</td></tr>`
        )
        .join('')
    : '';

  const painTags = data.painPoints?.length
    ? data.painPoints.map(p => `<span style="display:inline-block;padding:4px 10px;margin:2px;background:rgba(198,147,32,0.1);border:1px solid rgba(198,147,32,0.3);border-radius:6px;color:#FBE18D;font-size:12px;">${p}</span>`).join('')
    : '<span style="color:#64748b;font-size:13px;">No especificados</span>';

  const featureTags = data.selectedFeatures?.length
    ? data.selectedFeatures.map(f => `<span style="display:inline-block;padding:4px 10px;margin:2px;background:rgba(198,147,32,0.1);border:1px solid rgba(198,147,32,0.3);border-radius:6px;color:#FBE18D;font-size:12px;">${f}</span>`).join('')
    : '<span style="color:#64748b;font-size:13px;">No especificadas</span>';

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0b0d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:24px;">
    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#0B0F19 0%,#14151a 100%);border:1px solid rgba(198,147,32,0.2);border-radius:16px;padding:32px 28px;text-align:center;">
        <p style="color:#FBE18D;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">WebDesignJE</p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:800;margin:0 0 4px;">Nuevo Lead Recibido</h1>
        <p style="color:#94a3b8;font-size:14px;margin:0;">Proyecto: <strong style="color:#FBE18D;">${data.projectName}</strong></p>
      </td>
    </tr>

    <!-- Contacto -->
    <tr>
      <td style="background:#0f172a;border-left:1px solid rgba(198,147,32,0.2);border-right:1px solid rgba(198,147,32,0.2);padding:24px 28px;">
        <h2 style="color:#C69320;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Datos de Contacto</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:8px 12px;color:#94a3b8;font-size:13px;">Nombre</td><td style="padding:8px 12px;color:#f1f5f9;font-size:13px;font-weight:600;">${data.clientName}</td></tr>
          <tr><td style="padding:8px 12px;border-top:1px solid #1e293b;color:#94a3b8;font-size:13px;">Email</td><td style="padding:8px 12px;border-top:1px solid #1e293b;font-size:13px;"><a href="mailto:${data.clientEmail}" style="color:#FBE18D;text-decoration:none;">${data.clientEmail}</a></td></tr>
          ${data.clientPhone ? `<tr><td style="padding:8px 12px;border-top:1px solid #1e293b;color:#94a3b8;font-size:13px;">Teléfono</td><td style="padding:8px 12px;border-top:1px solid #1e293b;color:#f1f5f9;font-size:13px;"><a href="https://wa.me/${data.clientPhone.replace(/[^0-9]/g, '')}" style="color:#FBE18D;text-decoration:none;">${data.clientPhone}</a></td></tr>` : ''}
          ${data.companyName ? `<tr><td style="padding:8px 12px;border-top:1px solid #1e293b;color:#94a3b8;font-size:13px;">Empresa</td><td style="padding:8px 12px;border-top:1px solid #1e293b;color:#f1f5f9;font-size:13px;font-weight:600;">${data.companyName}</td></tr>` : ''}
        </table>
      </td>
    </tr>

    ${profileRows ? `<!-- Perfil -->
    <tr>
      <td style="background:#0f172a;border-left:1px solid rgba(198,147,32,0.2);border-right:1px solid rgba(198,147,32,0.2);padding:24px 28px;border-top:1px solid #1e293b;">
        <h2 style="color:#C69320;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Perfil del Negocio</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${profileRows}</table>
      </td>
    </tr>` : ''}

    <!-- Desafíos -->
    <tr>
      <td style="background:#0f172a;border-left:1px solid rgba(198,147,32,0.2);border-right:1px solid rgba(198,147,32,0.2);padding:24px 28px;border-top:1px solid #1e293b;">
        <h2 style="color:#C69320;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Desafíos a Resolver</h2>
        <div>${painTags}</div>
      </td>
    </tr>

    <!-- Features -->
    <tr>
      <td style="background:#0f172a;border-left:1px solid rgba(198,147,32,0.2);border-right:1px solid rgba(198,147,32,0.2);padding:24px 28px;border-top:1px solid #1e293b;">
        <h2 style="color:#C69320;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Funcionalidades de Interés</h2>
        <div>${featureTags}</div>
      </td>
    </tr>

    ${data.goals || data.timeline || data.budget || data.references ? `<!-- Objetivos -->
    <tr>
      <td style="background:#0f172a;border-left:1px solid rgba(198,147,32,0.2);border-right:1px solid rgba(198,147,32,0.2);padding:24px 28px;border-top:1px solid #1e293b;">
        <h2 style="color:#C69320;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Alcance del Proyecto</h2>
        ${data.goals ? `<p style="color:#94a3b8;font-size:12px;margin:0 0 6px;">Visión de Éxito</p><p style="color:#e2e8f0;font-size:14px;margin:0 0 16px;line-height:1.6;">${data.goals}</p>` : ''}
        ${data.timeline ? `<p style="color:#94a3b8;font-size:12px;margin:0 0 4px;">Horizonte</p><p style="color:#f1f5f9;font-size:14px;margin:0 0 12px;">${data.timeline}</p>` : ''}
        ${data.budget ? `<p style="color:#94a3b8;font-size:12px;margin:0 0 4px;">Presupuesto</p><p style="color:#f1f5f9;font-size:14px;margin:0 0 12px;">${data.budget}</p>` : ''}
        ${data.references ? `<p style="color:#94a3b8;font-size:12px;margin:0 0 4px;">Referencias</p><p style="color:#e2e8f0;font-size:14px;margin:0 0 12px;line-height:1.6;">${data.references}</p>` : ''}
      </td>
    </tr>` : ''}

    <!-- CTA -->
    <tr>
      <td style="background:linear-gradient(135deg,#0B0F19 0%,#14151a 100%);border:1px solid rgba(198,147,32,0.2);border-top:none;border-radius:0 0 16px 16px;padding:28px 28px;text-align:center;">
        <a href="mailto:${data.clientEmail}?subject=Re:%20Propuesta%20${encodeURIComponent(data.projectName)}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#C69320,#FBE18D);color:#0a0b0d;font-size:13px;font-weight:700;text-decoration:none;border-radius:12px;letter-spacing:0.5px;">Responder al Cliente</a>
        ${data.clientPhone ? `<p style="margin-top:12px;font-size:12px;color:#64748b;">o <a href="https://wa.me/${data.clientPhone.replace(/[^0-9]/g, '')}" style="color:#FBE18D;">contactar por WhatsApp</a></p>` : ''}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, 5, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = (await req.json()) as LeadEmailPayload;

    if (!body.clientName || !body.clientEmail || !body.projectName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const html = buildHtmlContent(body);

    const { data: sent, error } = await resend.emails.send({
      from: 'WebDesignJE <leads@webdesignje.com>',
      to: ['nic.jespinoza@gmail.com'],
      replyTo: body.clientEmail,
      subject: `Nuevo Lead: ${body.projectName} — ${body.clientName}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: sent?.id });
  } catch (error) {
    console.error('Lead email API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
