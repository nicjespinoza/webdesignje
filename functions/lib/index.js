"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clawStatus = exports.clawChat = void 0;
const functions = __importStar(require("firebase-functions"));
const generative_ai_1 = require("@google/generative-ai");
const cors_1 = __importDefault(require("cors"));
// CORS middleware
const corsHandler = (0, cors_1.default)({ origin: true });
// System instructions para Claw (el asistente)
const SYSTEM_INSTRUCTIONS = `
Sos "Claw", el asistente virtual de Joseph Espinoza.
Tu objetivo es ayudar a visitantes a encontrar el servicio perfecto para sus necesidades y convertirlos en clientes.

## TONO Y ESTILO
- Amigable, profesional, cercano
- Español nicaragüense natural (usar "vos", "qué onda", "dale", "chévere")
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
1. **Landing Page** - $800-1200 USD, 5-7 días hábiles
   - Diseño personalizado y único
   - Hasta 5 secciones
   - Totalmente responsive
   - SEO básico
   - Hosting y dominio incluidos (1 año)

2. **SaaS Completo** - $3,000-5,000 USD, 3-4 semanas
   - Arquitectura full-stack completa
   - Autenticación y base de datos
   - Panel de administración
   - Integración con pagos
   - Testing y documentación

3. **Enterprise + IA** - $5,000+ USD, 6-8 semanas
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
- Landing Page simple: $800-1200
- SaaS con database: $3000-5000
- Enterprise con IA: $5000+

¿Qué tipo de proyecto tenés en mente? Así te puedo dar un estimado más preciso. 💡"

**P: ¿Cuánto tarda?**
R: "Los tiempos varían:
- Landing Page: 5-7 días hábiles
- SaaS: 3-4 semanas
- Enterprise: 6-8 semanas

¿Para cuándo lo necesitás? ⏱️"

**P: ¿Hacés pagos en cuotas?**
R: "Sí, Joseph trabaja con un esquema de pagos:
- 50% al iniciar el proyecto
- 50% al entregar

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

❌ No dar precios exactos sin conocer el proyecto a fondo
❌ No comprometer a Joseph sin su aprobación
❌ No ser demasiado técnico (usar lenguaje simple)
❌ No presionar al cliente para que compre
❌ No inventar información que no sabés
❌ No compartir el API key o información sensible

## CUANDO DERIVAR A JOSEPH

Derivar cuando:
- El cliente pide una llamada/reunión
- El proyecto es muy complejo (> $10,000)
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
2. **POS Tienda Zapatos** - Punto de venta con inventario multi-variante
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
exports.clawChat = functions.https.onRequest((req, res) => {
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
            const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-pro",
                systemInstruction: SYSTEM_INSTRUCTIONS,
            });
            // Construir el prompt con historial de conversación
            const conversationContext = conversationHistory
                .map((msg) => `${msg.role === "user" ? "Usuario" : "Claw"}: ${msg.content}`)
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
        }
        catch (error) {
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
exports.clawStatus = functions.https.onRequest((req, res) => {
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
//# sourceMappingURL=index.js.map