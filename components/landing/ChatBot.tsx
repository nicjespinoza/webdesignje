'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Bot, Loader2, Sparkles,
  ChevronDown, Zap, MessageSquare, ThumbsUp
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  defaultOpen?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mostrar mensaje de bienvenida cuando se abre el chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            role: 'assistant',
            content: `¡Hola! 👋 Soy Claw, el asistente de Joseph. 

¿En qué puedo ayudarte hoy?

Podés preguntarme sobre:
- 💻 Servicios de desarrollo web
- 🤖 Integración de IA
- 💰 Precios y tiempos
- 📁 Proyectos anteriores
- ⏱️ Disponibilidad`,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 800);
    }
  }, [isOpen]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Enviar mensaje al presionar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Enviar mensaje
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Ups! 😅 Tuve un problema técnico. ¿Podés intentar de nuevo en un momento?',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Botón flotante del chat */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black shadow-[0_0_30px_rgba(198,147,32,0.5)] flex items-center justify-center group hover:shadow-[0_0_50px_rgba(198,147,32,0.7)] transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-indigo"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge de notificación */}
        {!isOpen && messages.length === 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full h-full bg-red-500 rounded-full"
            />
          </motion.div>
        )}
      </motion.button>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(198,147,32,0.3)] border border-[#C69320]/30"
          >
            {/* Header del chat */}
            <div className="bg-gradient-to-r from-[#C69320] to-[#FBE18D] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                  <Bot size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg">Claw</h3>
                  <p className="text-xs text-black/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    Asistente de Joseph
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([])}
                  className="p-2 rounded-lg hover:bg-black/10 transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-indigo"
                  title="Reiniciar conversación"
                  aria-label="Reiniciar conversación"
                >
                  <Sparkles size={18} className="text-black" />
                </button>
              </div>
            </div>

            {/* Mensajes del chat */}
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-900/95 to-slate-900/98 backdrop-blur-xl">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black rounded-br-md'
                        : 'bg-white/10 text-white rounded-bl-md border border-white/10'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-black/70' : 'text-slate-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('es-NI', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Indicador de escribiendo */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3 border border-white/10">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-[#C69320] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-[#FBE18D] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-[#C69320] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input del chat */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribí tu pregunta..."
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#C69320] focus:ring-1 focus:ring-[#C69320] transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  aria-label="Enviar mensaje"
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black flex items-center justify-center hover:shadow-[0_0_20px_rgba(198,147,32,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-indigo"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} strokeWidth={2.5} />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Claw usa IA para responder. Puede cometer errores.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
