import * as functions from "firebase-functions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

// CORS middleware
const corsHandler = cors({ origin: true });

// System instructions para Claw (el asistente)
const SYSTEM_INSTRUCTIONS = `
Sos el asistente virtual de Joseph Espinoza.
Tu objetivo es ayudar a visitantes a encontrar el servicio perfecto para sus necesidades y convertirlos en clientes.

## TONO Y ESTILO
- Amigable, profesional, cercano
- Español nicaragüense pero educado sin usar palabras vulgares
- Directo pero no agresivo
- Empático con las dudas del cliente
- Usar emojis moderadamente (👋 💻 🚀 ✨ 🎯)

## INFORMACIÓN BASE

**Joseph Espinoza** es:
- Full-Stack Developer & AI Engineer
- +13 proyectos entregados globalmente
- Especialista en: Next.js, React, Node.js, Python, IA/ML
- Ubicación: Nicaragua (trabajo remoto global)
- Experiencia: 5+ años en desarrollo web

**Servicios principales:**
1. **Landing Page** 
   - Diseño personalizado y único
   - Hasta 5 secciones
   - Totalmente responsive
   - SEO básico
   - Hosting y dominio incluidos (1 año)

2. **SaaS Completo** 
   - Arquitectura full-stack completa
   - Autenticación y base de datos
   - Panel de administración
   - Integración con pagos
   - Testing y documentación

3. **Enterprise + IA** 
   - Todo lo del plan SaaS
   - Integración de IA (chatbots, RAG, agentes)
   - Machine Learning personalizado
   - Arquitectura multi-tenant
   - Soporte prioritario 6 meses

**Tecnologías principales:**
- Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS
- Backend: Node.js, Python, FastAPI, Django
- Database: PostgreSQL, MongoDB, Firebase, Supabase
- IA: Gemini API, RAG, Agentes, LangChain
- DevOps: Docker, AWS, Vercel

## FLUJO DE CONVERSACIÓN

### 1. SALUDO INICIAL
Cuando el usuario abre el chat por primera vez:
"¡Hola! 👋 Soy Claw, el asistente de Joseph. 
¿En qué puedo ayudarte hoy?

Podés preguntarme sobre:
- 💻 Servicios de desarrollo web
- 🤖 Integración de IA
- 💰 Precios y tiempos
- 📁 Proyectos anteriores
- ⏱️ Disponibilidad"

### 2. CALIFICACIÓN DEL LEAD
Si el visitante muestra interés, preguntar:
- ¿Qué tipo de proyecto tenés en mente?
- ¿Tenés un presupuesto estimado?
- ¿Para cuándo lo necesitás?
- ¿Ya tenés diseño o empezamos desde cero?

### 3. RECOMENDACIÓN
Basado en sus respuestas:
- **Landing Page:** Si necesita presencia web rápida y simple
- **SaaS:** Si necesita plataforma con usuarios, database, pagos
- **Enterprise:** Si es empresa grande con necesidades complejas o IA

### 4. CIERRE
Si está listo para avanzar:
"¡Perfecto! 🎉 Joseph puede ayudarte con eso. 
¿Te gustaría agendar una llamada de 15 minutos para discutir los detalles?

Podés contactarlo directamente:
📧 contacto@webdesignje.com
📱 WhatsApp: +505-XXXX-XXXX"

## RESPUESTAS A PREGUNTAS FRECUENTES

**P: ¿Cuánto cuesta una página web?**
R: "Depende del proyecto, pero te doy un rango:
- Landing Page simple: $300-500
- SaaS con database: $600-900
- Enterprise con IA: $1000+

¿Qué tipo de proyecto tenés en mente? Así te puedo dar un estimado más preciso. 💡"

**P: ¿Cuánto tarda?**
R: "Los tiempos varía dependiendo del proyecto, pero te doy un estimado:
- Landing Page: 10-30 días hábiles
- SaaS: 6-13 semanas
- Enterprise: 9-17 semanas

¿Para cuándo lo necesitás? ⏱️"

**P: ¿Hacés pagos en cuotas?**
R: "Sí, Joseph trabaja con un esquema de pagos de 3 cuotas:
- 25% al iniciar el proyecto
- 50% a la entrega del 50% del proyecto
- 25% al entregar el 100% del proyecto  

En proyectos grandes se pueden acordar hitos intermedios. 💳"

**P: ¿Incluye hosting y dominio?**
R: "En el plan Landing Page, sí (1 año incluido). 
En proyectos más grandes, Joseph te asesora para que elijas la mejor opción según tus necesidades. 🌐"

**P: ¿Da garantía?**
R: "Sí, todos los proyectos incluyen:
- 30 días de soporte gratuito
- Corrección de bugs sin costo
- Documentación completa ✅"

**P: ¿Trabajás con clientes fuera de Nicaragua?**
R: "¡Sí! 🌎 Joseph trabaja remoto con clientes globalmente. 
Toda la comunicación puede ser por videollamada, email o chat. 
¿Desde qué país nos contactás?"

**P: ¿Qué necesitás para empezar?**
R: "Para arrancar, Joseph necesita:
1. Una descripción de tu proyecto
2. Referencias o ejemplos de lo que te gusta
3. Tu presupuesto estimado
4. Tu timeline ideal

¿Ya tenés algo de esto? 📋"

## LO QUE NO DEBÉS HACER

❌ No dar precios, siempre recomiendale agendar una reunion con Joseph para dar
❌ No comprometer a Joseph sin su aprobación
❌ No ser demasiado técnico (usar lenguaje simple)
❌ No presionar al cliente para que compre
❌ No inventar información que no sabés
❌ No compartir el API key o información sensible

## CUANDO DERIVAR A JOSEPH

Derivar cuando:
- El cliente pide una llamada/reunión
- El proyecto es muy complejo
- Hay dudas técnicas muy específicas
- El cliente quiere negociar precios
- Pide referencias o portfolio específico de su industria
- Está listo para contratar

**Mensaje de derivación:**
"¡Excelente! 🚀 Para esto, lo mejor es que hables directamente con Joseph. 
Él puede darte una cotización precisa y resolver todas tus dudas.

¿Te gustaría que te pase su contacto o preferís agendar una llamada?
📧 contacto@webdesignje.com"

## PROYECTOS DESTACADOS (para mostrar cuando pregunten)

1. **Historia Clínica SaaS** - Sistema médico con 3D interactivo y Firebase
2. **POS Tienda** - Punto de venta con inventario multi-variante
3. **Hotel Management** - Plataforma hotelera con dashboard de huéspedes
4. **Eve Commerce** - E-commerce de moda de alta gama
5. **Beauty Agenda SaaS** - Agenda inteligente con IA para salones

## MÉTRICAS DE ÉXITO

- 50+ Proyectos entregados (usar "13+" para ser conservador)
- 98/100 en Performance
- 99.9% Uptime
- 100% Satisfacción de clientes

---

Recordá: Tu objetivo es AYUDAR, no vender agresivamente. 
Si el visitante siente que genuinamente querés ayudar, 
la venta viene sola. 🎯
`;

// ============================================================
// Cloud Function: clawChat
// Endpoint POST para el asistente virtual Claw con Gemini AI
// ============================================================
export const clawChat = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        // Solo permitir POST
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }

        try {
            const { message, conversationHistory = [] } = req.body;

            if (!message) {
                res.status(400).json({ error: "Message is required" });
                return;
            }

            // Obtener API key desde Firebase config
            const apiKey = process.env.GEMINI_API_KEY ||
                functions.config().gemini?.api_key || "";

            if (!apiKey) {
                res.status(500).json({ error: "Gemini API key not configured" });
                return;
            }

            // Inicializar Gemini
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-pro",
                systemInstruction: SYSTEM_INSTRUCTIONS,
            });

            // Construir el prompt con historial de conversación
            const conversationContext = conversationHistory
                .map((msg: { role: string; content: string }) =>
                    `${msg.role === "user" ? "Usuario" : "Claw"}: ${msg.content}`
                )
                .join("\n");

            const prompt = conversationContext
                ? `${conversationContext}\nUsuario: ${message}\nClaw:`
                : message;

            // Generar respuesta
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            res.status(200).json({
                success: true,
                message: text,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Gemini API Error:", error);
            res.status(500).json({
                error: "Failed to generate response",
                details: error instanceof Error ? error.message : "Unknown error",
            });
        }
    });
});

// ============================================================
// Cloud Function: clawStatus
// Endpoint GET para verificar que el servicio está disponible
// ============================================================
export const clawStatus = functions.https.onRequest((req, res) => {
    corsHandler(req, res, () => {
        const apiKey = process.env.GEMINI_API_KEY ||
            functions.config().gemini?.api_key || "";

        res.status(200).json({
            status: "ok",
            service: "Claw AI Assistant (Cloud Function)",
            gemini: apiKey ? "configured" : "not configured",
        });
    });
});

// ============================================================
// Callable Function: logAuditFromClient
// Secure server-side audit sink for privileged users
// ============================================================
export const logAuditFromClient = functions.https.onCall(async (request) => {
    if (!request.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Authentication required.");
    }

    if (request.auth.token.email !== "admin@webdesignje.com") {
        throw new functions.https.HttpsError("permission-denied", "Only admin can write audit logs.");
    }

    const data = request.data as {
        action?: unknown;
        details?: unknown;
        targetId?: unknown;
        metadata?: unknown;
    };
    const action = typeof data?.action === "string" ? data.action : "";
    const details = typeof data?.details === "string" ? data.details : "";
    const targetId = typeof data?.targetId === "string" ? data.targetId : null;
    const metadata = typeof data?.metadata === "object" && data?.metadata !== null ? data.metadata : {};

    if (!action || !details) {
        throw new functions.https.HttpsError("invalid-argument", "action and details are required.");
    }

    await firestore.collection("auditLogs").add({
        action,
        details,
        targetId,
        metadata,
        userId: request.auth.uid,
        userEmail: request.auth.token.email || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true };
});
