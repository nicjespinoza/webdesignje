# 🤖 CONFIGURACIÓN DEL CHATBOT CLAW

## ✅ LO QUE YA SE HIZO

### **Archivos Creados:**
1. ✅ **app/api/chat/route.ts** - API route para Gemini (server-side)
2. ✅ **src/components/landing/ChatBot.tsx** - Componente UI del chat
3. ✅ **app/page.tsx** - ChatBot integrado en la landing page
4. ✅ **.env.local.example** - Actualizado con GEMINI_API_KEY
5. ✅ **Dependencia instalada** - `@google/generative-ai`

---

## 🔧 PASOS PARA ACTIVAR EL CHATBOT

### **PASO 1: Configurar tu API Key de Gemini**

1. **Crear archivo .env.local** (si no existe):
   ```
   C:\Users\nicje\OneDrive\Documentos\Proyecto 2026\WebDesignJE\Historia-Clinica-DEMO\medical-ai-demo\.env.local
   ```

2. **Agregar tu API Key:**
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. **Conseguir tu API Key** (si aún no la tenés):
   - Ir a: https://makersuite.google.com/app/apikey
   - Iniciar sesión con tu cuenta de Google
   - Click en "Create API Key"
   - Copiar la key
   - Pegar en `.env.local`

4. **Importante:**
   - ⚠️ **NUNCA** subas `.env.local` a GitHub
   - ✅ El archivo `.env.local.example` es solo una plantilla
   - 🔒 Tu API key está segura (solo se usa en el servidor)

---

### **PASO 2: Reiniciar el Servidor de Desarrollo**

Después de agregar la API key:

```bash
# Detener el servidor (Ctrl + C)
# Volver a iniciar
npm run dev
```

---

### **PASO 3: Probar el ChatBot**

1. **Abrir tu navegador:** http://localhost:3000
2. **Buscar el botón flotante** (abajo a la derecha) 💬
3. **Click para abrir el chat**
4. **Deberías ver el mensaje de bienvenida:**
   ```
   ¡Hola! 👋 Soy Claw, el asistente de Joseph. 
   
   ¿En qué puedo ayudarte hoy?
   
   Podés preguntarme sobre:
   - 💻 Servicios de desarrollo web
   - 🤖 Integración de IA
   - 💰 Precios y tiempos
   - 📁 Proyectos anteriores
   - ⏱️ Disponibilidad
   ```

5. **Hacer una pregunta de prueba:**
   - "¿Cuánto cuesta una landing page?"
   - "¿Qué tecnologías usás?"
   - "¿Tenés disponibilidad?"

---

## 🎨 CARACTERÍSTICAS DEL CHATBOT

### **Diseño:**
- ✅ **Botón flotante** en la esquina inferior derecha
- ✅ **Gradiente platinum/gold** (misma temática del sitio)
- ✅ **Animaciones suaves** con Framer Motion
- ✅ **Badge de notificación** (punto rojo cuando hay mensaje nuevo)
- ✅ **Responsive** (funciona en móvil y desktop)

### **Funcionalidades:**
- ✅ **Mensaje de bienvenida** automático
- ✅ **Historial de conversación** (contexto mantenido)
- ✅ **Indicador de "escribiendo..."** (3 puntos animados)
- ✅ **Auto-scroll** a los mensajes nuevos
- ✅ **Soporte para Enter** (enviar) y Shift+Enter (salto de línea)
- ✅ **Botón para reiniciar** conversación
- ✅ **Timestamp** en cada mensaje
- ✅ **Diseño diferenciado** (usuario vs asistente)

### **Comportamiento:**
- ✅ **Tono nicaragüense** (usa "vos", "qué onda", "dale")
- ✅ **Emojis moderados** (no excesivos)
- ✅ **Respuestas útiles** y directas
- ✅ **Calificación de leads** (pregunta presupuesto, timeline)
- ✅ **Derivación a Joseph** cuando es necesario

---

## 📋 PERSONALIZACIÓN DEL CHATBOT

### **Cambiar el nombre:**
Editar `app/api/chat/route.ts`:
```typescript
const SYSTEM_INSTRUCTIONS = `
Sos "Claw", el asistente virtual de Joseph Espinoza.
// Cambiar "Claw" por el nombre que quieras
`;
```

### **Cambiar colores:**
Editar `src/components/landing/ChatBot.tsx`:
```tsx
// Botón flotante
className="... bg-gradient-to-r from-[#C69320] to-[#FBE18D] ..."

// Header del chat
className="bg-gradient-to-r from-[#C69320] to-[#FBE18D] ..."
```

### **Cambiar mensaje de bienvenida:**
Editar `src/components/landing/ChatBot.tsx`:
```tsx
setMessages([
  {
    role: 'assistant',
    content: `¡Tu mensaje personalizado aquí!`,
    timestamp: new Date(),
  },
]);
```

### **Abrir automáticamente al cargar:**
Editar `app/page.tsx`:
```tsx
<ChatBot defaultOpen={true} />  // false = cerrado por defecto
```

---

## 🎯 INSTRUCCIONES DEL ASISTENTE (SYSTEM PROMPT)

El chatbot sigue estas instrucciones estrictas:

### **Lo que SÍ hace:**
- ✅ Saludar amigablemente
- ✅ Responder preguntas sobre servicios y precios
- ✅ Calificar leads (presupuesto, timeline, tipo de proyecto)
- ✅ Recomendar el plan adecuado (Landing, SaaS, Enterprise)
- ✅ Derivar a Joseph cuando el cliente está listo
- ✅ Usar lenguaje simple (no demasiado técnico)
- ✅ Ser empático y útil

### **Lo que NO hace:**
- ❌ Dar precios exactos sin conocer el proyecto
- ❌ Comprometer a Joseph sin aprobación
- ❌ Ser demasiado técnico
- ❌ Presionar para vender
- ❌ Inventar información

---

## 💡 EJEMPLOS DE CONVERSACIÓN

### **Ejemplo 1: Consulta de precio**
```
Usuario: ¿Cuánto cuesta una página web?

Claw: Depende del proyecto, pero te doy un rango:
- Landing Page simple: $800-1200
- SaaS con database: $3000-5000
- Enterprise con IA: $5000+

¿Qué tipo de proyecto tenés en mente? Así te puedo 
dar un estimado más preciso. 💡
```

### **Ejemplo 2: Cliente listo**
```
Usuario: Quiero trabajar con Joseph

Claw: ¡Excelente! 🎉 Joseph está tomando nuevos proyectos.
¿Te gustaría agendar una llamada de 15 minutos para 
discutir los detalles de tu proyecto?

Podés escribirle a:
📧 contacto@webdesignje.com
📱 WhatsApp: +505-XXXX-XXXX
```

### **Ejemplo 3: Pregunta técnica**
```
Usuario: ¿Qué tecnologías usás para e-commerce?

Claw: Para e-commerce, Joseph recomienda:

**Opción A - Shopify:**
- ✅ Rápido de implementar
- ✅ Ya incluye pagos y envíos
- ❌ Menos personalizable
- 💰 $2000-3500

**Opción B - Next.js + Stripe:**
- ✅ Totalmente personalizado
- ✅ Mejor performance y SEO
- ❌ Más tiempo de desarrollo
- 💰 $3000-5000

¿Qué tipo de productos vas a vender?
```

---

## 🔍 SOLUCIÓN DE PROBLEMAS

### **El chat no abre:**
1. Revisar consola del navegador (F12)
2. Verificar que el componente está importado en page.tsx
3. Revisar que no haya errores de compilación

### **El chat no responde:**
1. Verificar que `.env.local` existe y tiene la API key
2. Revisar logs del servidor (terminal donde corre `npm run dev`)
3. Probar endpoint: http://localhost:3000/api/chat (debería decir "ok")

### **Error "Gemini API key not configured":**
1. Asegurar que `.env.local` está en la raíz del proyecto
2. Verificar que la variable se llama `GEMINI_API_KEY`
3. Reiniciar el servidor de desarrollo

### **Respuestas muy lentas:**
1. Es normal (Gemini tarda 2-5 segundos en responder)
2. Verificar conexión a internet
3. Revisar quota de la API key en Google AI Studio

### **Respuestas raras o sin sentido:**
1. El modelo está aprendiendo del contexto
2. Reiniciar la conversación (botón Sparkles)
3. Si persiste, revisar las instrucciones en `route.ts`

---

## 📊 MÉTRICAS A MEDIR

Una vez en producción, trackear:

- **Conversaciones iniciadas** (¿cuántos abren el chat?)
- **Tasa de respuesta** (¿cuántos reciben respuesta útil?)
- **Leads calificados** (¿cuántos son clientes serios?)
- **Derivaciones a Joseph** (¿cuántos piden contacto?)
- **Satisfacción** (agregar 👍/👎 al final de cada respuesta)

---

## 🚀 PRÓXIMAS MEJORAS (OPCIONALES)

1. **Agregar botón de feedback** (👍/👎)
2. **Guardar conversaciones** en database
3. **Enviar transcript por email** a Joseph
4. **Integrar con WhatsApp** para derivar directamente
5. **Agregar opciones rápidas** (botones con preguntas frecuentes)
6. **Soporte para archivos** (subir imágenes, documentos)
7. **Multi-idioma** (detectar idioma del usuario)
8. **Analytics** (trackear preguntas más frecuentes)

---

## 📞 ¿TENÉS DUDAS?

Si algo no funciona o querés cambiar algo:

1. Revisar este archivo primero
2. Ver logs del servidor
3. Revisar consola del navegador
4. ¡Decime y te ayudo!

---

**¡Listo para usar! 🚀**

*Última actualización: 2 de Marzo, 2026*
*Por: Hailey - Tu AI Assistant*
