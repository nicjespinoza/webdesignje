'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageCircle, Sparkles, Loader2, User } from 'lucide-react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/chat',
    });
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll al final cuando hay mensajes nuevos
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Ajuste de altura del textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [input]);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
            {/* Ventana de Chat */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="pointer-events-auto mb-4 w-[90vw] md:w-[400px] h-[600px] max-h-[75vh] flex flex-col glass-panel shadow-2xl overflow-hidden !rounded-3xl border border-[#C69320]/20 bg-[#020202]/95 backdrop-blur-xl"
                    >
                        {/* Cabecera del Chat */}
                        <div className="p-5 flex items-center justify-between border-b border-[#C69320]/10 bg-gradient-to-r from-[#020202] to-[#0a0a0a]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-[#FBE18D]/10 text-[#FBE18D]">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold gradient-text">WebdesignJE Assistant</h4>
                                    <div className="flex items-center gap-1.5 pt-0.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Online Joseph\'s Sidekick</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Área de Mensajes */}
                        <div
                            ref={scrollRef}
                            className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#C69320]/20"
                        >
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                                    <Sparkles size={40} className="text-[#C69320] animate-pulse" />
                                    <p className="text-sm text-slate-300 max-w-[200px]">
                                        Hola! Soy la IA de Joseph. ¿En qué proyecto podemos colaborar hoy?
                                    </p>
                                </div>
                            )}

                            {messages.map((m) => (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user'
                                                ? 'bg-[#FBE18D] text-black font-medium rounded-tr-none'
                                                : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none backdrop-blur-sm'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1.5 opacity-50 text-[10px] uppercase font-bold tracking-widest">
                                            {m.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                                            {m.role === 'user' ? 'Tú' : 'WebdesignJE'}
                                        </div>
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 text-slate-200 border border-white/5 p-3 rounded-2xl shadow-sm rounded-tl-none flex items-center gap-3">
                                        <Loader2 size={16} className="animate-spin text-[#C69320]" />
                                        <span className="text-xs italic opacity-70">Pensando...</span>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                                    Lo sentimos, hubo un error técnico. Inténtalo de nuevo.
                                </div>
                            )}
                        </div>

                        {/* Entrada de Mensaje */}
                        <div className="p-4 border-t border-[#C69320]/10 bg-[#020202]">
                            <form
                                onSubmit={handleSubmit}
                                className="flex items-end gap-2 bg-white/5 rounded-2xl p-2 border border-white/10 focus-within:border-[#C69320]/30 transition-all shadow-inner"
                            >
                                <textarea
                                    ref={inputRef}
                                    rows={1}
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Cuéntame sobre tu proyecto..."
                                    className="flex-grow bg-transparent border-none focus:ring-0 text-sm text-slate-200 max-h-32 resize-none py-2 px-3 placeholder:text-slate-600 outline-none"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-2.5 bg-[#C69320] text-black rounded-xl hover:bg-[#FBE18D] transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </form>
                            <p className="text-[10px] text-center mt-3 text-slate-500 font-medium">
                                Potenciado por la IA de WebdesignJE
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón Flotante */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className="pointer-events-auto p-4 rounded-2xl bg-[#020202] border border-[#C69320]/40 shadow-[0_0_20px_rgba(198,147,32,0.3)] text-[#FBE18D] hover:shadow-[0_0_30px_rgba(198,147,32,0.5)] transition-all flex items-center justify-center group overflow-hidden relative"
            >
                {/* Efecto de brillo líquido */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C69320]/0 via-[#FBE18D]/10 to-[#C69320]/0 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-100%] group-hover:translate-x-[100%] duration-1000"></div>
                
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2"
                        >
                            <MessageCircle size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ChatWidget;
