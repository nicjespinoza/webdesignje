// app/dashboard/(inner)/chat/page.tsx
"use client";

import React, { useEffect, useReducer, useRef, useState } from 'react';
import {
    MessageCircle,
    Search,
    Send,
    User,
    ChevronLeft,
    Trash2,
    Check,
    CheckCheck,
    Loader2,
    ShieldCheck,
    Sparkles,
    Users
} from 'lucide-react';
import { db } from '@/lib/firebase';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
    limit
} from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getSpecialtyById, Specialty } from '@/lib/specialties';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'visitor' | 'doctor' | 'assistant';
    timestamp: any;
    read: boolean;
}

interface ChatSession {
    id: string;
    visitorName: string;
    lastMessage: string;
    lastMessageTime: any;
    unreadCount: number;
    status: 'active' | 'archived' | 'deleted';
    isRegistered?: boolean;
}

type ChatState = {
    activeChats: ChatSession[];
    currentChat: ChatSession | null;
    messages: Message[];
    searchTerm: string;
    inputText: string;
    loading: boolean;
};

type ChatAction =
    | { type: 'setActiveChats'; payload: ChatSession[] }
    | { type: 'setCurrentChat'; payload: ChatSession | null }
    | { type: 'setMessages'; payload: Message[] }
    | { type: 'setSearchTerm'; payload: string }
    | { type: 'setInputText'; payload: string }
    | { type: 'setLoading'; payload: boolean };

const initialState: ChatState = {
    activeChats: [],
    currentChat: null,
    messages: [],
    searchTerm: '',
    inputText: '',
    loading: true,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
        case 'setActiveChats':
            return { ...state, activeChats: action.payload };
        case 'setCurrentChat':
            return { ...state, currentChat: action.payload };
        case 'setMessages':
            return { ...state, messages: action.payload };
        case 'setSearchTerm':
            return { ...state, searchTerm: action.payload };
        case 'setInputText':
            return { ...state, inputText: action.payload };
        case 'setLoading':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default function ChatPage() {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    const [specialty, setSpecialty] = useState<Specialty | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load Specialty
    useEffect(() => {
        const specId = typeof window !== 'undefined' ? localStorage.getItem('selectedSpecialty') || 'gastroenterology' : 'gastroenterology';
        setSpecialty(getSpecialtyById(specId));
    }, []);

    // Sidebar Listener: List of Chats
    useEffect(() => {
        const q = query(
            collection(db, 'chats'),
            orderBy('lastMessageTime', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ChatSession[];
            dispatch({ type: 'setActiveChats', payload: chats });
            dispatch({ type: 'setLoading', payload: false });
        });

        return () => unsubscribe();
    }, []);

    // Messages Listener: Current Chat Messages
    useEffect(() => {
        if (!state.currentChat) {
            dispatch({ type: 'setMessages', payload: [] });
            return;
        }

        const q = query(
            collection(db, 'chats', state.currentChat.id, 'messages'),
            orderBy('timestamp', 'asc'),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
            dispatch({ type: 'setMessages', payload: msgs });

            // Auto scroll to bottom
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        // Mark as read when opening chat
        const markAsRead = async () => {
            try {
                const chatRef = doc(db, 'chats', state.currentChat!.id);
                await updateDoc(chatRef, { unreadCount: 0 });
            } catch (error) {
                console.error("Error marking as read:", error);
            }
        };
        markAsRead();

        return () => unsubscribe();
    }, [state.currentChat]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!state.inputText.trim() || !state.currentChat) return;

        const text = state.inputText;
        dispatch({ type: 'setInputText', payload: '' });

        try {
            await addDoc(collection(db, 'chats', state.currentChat.id, 'messages'), {
                text,
                sender: 'doctor',
                timestamp: serverTimestamp(),
                read: false
            });

            const chatRef = doc(db, 'chats', state.currentChat.id);
            await updateDoc(chatRef, {
                lastMessage: text,
                lastMessageTime: serverTimestamp()
            });
        } catch (error) {
            toast.error("Error al enviar mensaje");
        }
    };

    const handleDeleteChat = async (id: string) => {
        if (!confirm("¿Desea eliminar este chat?")) return;
        try {
            await deleteDoc(doc(db, 'chats', id));
            if (state.currentChat?.id === id) dispatch({ type: 'setCurrentChat', payload: null });
            toast.success("Chat eliminado");
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    const filteredChats = state.activeChats.filter(chat =>
        chat.visitorName?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        chat.lastMessage?.toLowerCase().includes(state.searchTerm.toLowerCase())
    );

    if (state.loading && state.activeChats.length === 0) return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="flex h-[calc(100vh-140px)] bg-card/40 backdrop-blur-3xl rounded-[2.5rem] shadow-soft border border-border/40 overflow-hidden relative group">
            {/* Liquid Gold Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:bg-primary/10 transition-all duration-700" />

            {/* Sidebar Explorer */}
            <div className={`w-full md:w-[400px] border-r border-border/40 flex flex-col bg-muted/20 backdrop-blur-3xl transition-all duration-500 ${state.currentChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-8 border-b border-border/40 bg-card/30">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase">Mensajes</h2>
                            <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mt-1 italic">Centro de Comunicación</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                            <MessageCircle className="text-primary" size={24} />
                        </div>
                    </div>
                    <div className="relative group/search">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/search:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar conversaciones..."
                            className="w-full pl-12 pr-6 py-4 bg-background/50 border border-border/40 rounded-[1.5rem] text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary/40 outline-none transition-all shadow-inner"
                            value={state.searchTerm}
                            onChange={(e) => dispatch({ type: 'setSearchTerm', payload: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    <AnimatePresence>
                        {filteredChats.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center text-muted-foreground/30 flex flex-col items-center">
                                <Users size={64} className="mb-4 opacity-10" />
                                <p className="text-[10px] font-black uppercase tracking-widest">No hay chats activos</p>
                            </motion.div>
                        ) : (
                            filteredChats.map((chat, idx) => (
                                <motion.button
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={chat.id}
                                    onClick={() => dispatch({ type: 'setCurrentChat', payload: chat })}
                                    className={`w-full p-6 flex items-start gap-5 hover:bg-card/40 transition-all text-left rounded-[2rem] mb-2 pointer group/chat-btn ${state.currentChat?.id === chat.id ? 'bg-card shadow-lg border border-primary/20 scale-[0.98]' : 'border border-transparent'}`}
                                >
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-indigo-500/20 flex items-center justify-center text-primary font-black text-xl border border-primary/20 group-hover/chat-btn:scale-110 transition-transform">
                                            {chat.visitorName?.charAt(0) || 'V'}
                                        </div>
                                        {chat.unreadCount > 0 && (
                                            <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-4 border-card shadow-lg">
                                                {chat.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-black text-foreground tracking-tight truncate uppercase text-sm">{chat.visitorName}</h3>
                                            <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">
                                                {chat.lastMessageTime?.toDate ? format(chat.lastMessageTime.toDate(), 'HH:mm') : ''}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1 group-hover/chat-btn:text-foreground/80 transition-colors">{chat.lastMessage}</p>
                                    </div>
                                </motion.button>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Specialty Banner at bottom of sidebar */}
                {specialty && (
                    <div className="p-6 bg-primary/5 border-t border-primary/10 flex items-center justify-center gap-2">
                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] opacity-60">Filtro: {specialty.nameEs}</span>
                    </div>
                )}
            </div>

            {/* Conversation Area */}
            <div className={`flex-1 flex flex-col bg-background/30 backdrop-blur-3xl ${state.currentChat ? 'flex' : 'hidden md:flex'}`}>
                {state.currentChat ? (
                    <>
                        {/* Header Explorer */}
                        <div className="p-6 border-b border-border/40 flex justify-between items-center bg-card/20">
                            <div className="flex items-center gap-5">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => dispatch({ type: 'setCurrentChat', payload: null })}
                                    className="md:hidden p-3 text-muted-foreground hover:bg-muted rounded-2xl transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </motion.button>
                                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center text-primary border border-border/40 shadow-inner">
                                    <User size={28} />
                                </div>
                                <div>
                                    <h2 className="font-black text-2xl text-foreground tracking-tighter uppercase">{state.currentChat.visitorName}</h2>
                                    <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] mt-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                        En comunicación activa
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteChat(state.currentChat.id)}
                                className="p-4 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all border border-transparent hover:border-destructive/20"
                            >
                                <Trash2 size={24} />
                            </button>
                        </div>

                        {/* Liquid Message Stream */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-slate-500/5">
                            <AnimatePresence>
                                {state.messages.map((msg, idx) => {
                                    const isMe = msg.sender === 'doctor';
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            key={msg.id}
                                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[70%] p-6 rounded-[2.5rem] shadow-xl relative group/msg transition-all hover:shadow-2xl ${isMe ? 'bg-primary text-primary-foreground rounded-tr-none shadow-primary/10' : 'bg-card text-foreground rounded-tl-none border border-border/40'}`}>
                                                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                                <div className={`flex items-center justify-end gap-2 mt-3 text-[9px] font-black uppercase tracking-widest ${isMe ? 'text-primary-foreground/60' : 'text-muted-foreground/40'}`}>
                                                    <span>{msg.timestamp?.toDate ? format(msg.timestamp.toDate(), 'HH:mm') : '...'}</span>
                                                    {isMe && (msg.read ? <CheckCheck size={12} className="text-white" /> : <Check size={12} />)}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Neo Input Field */}
                        <div className="p-10 bg-card/40 border-t border-border/40">
                            <form onSubmit={handleSend} className="flex items-center gap-6 bg-background/80 p-3 pl-6 rounded-[2.5rem] border border-border/40 shadow-2xl focus-within:border-primary/40 transition-all group/input">
                                <Sparkles size={20} className="text-primary/20 group-focus-within/input:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={state.inputText}
                                    onChange={(e) => dispatch({ type: 'setInputText', payload: e.target.value })}
                                    placeholder="Escribe tu respuesta profesional..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm font-bold py-4 placeholder:text-muted-foreground/30 text-foreground"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={!state.inputText.trim()}
                                    className="p-5 bg-primary text-primary-foreground rounded-[2rem] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-20"
                                >
                                    <Send size={24} />
                                </motion.button>
                            </form>
                            <div className="flex justify-center mt-6">
                                <p className="text-[9px] font-black text-muted-foreground/20 uppercase tracking-[0.5em] italic flex items-center gap-2">
                                    <ShieldCheck size={10} /> Canal de Comunicación Cifrado JEE-PRO v4.2
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                        <div className="w-32 h-32 rounded-[3rem] bg-muted/30 flex items-center justify-center mb-10 border-2 border-dashed border-border/60 animate-pulse">
                            <MessageCircle size={64} className="opacity-10 text-primary" />
                        </div>
                        <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase mb-4">Canal Directo JE</h3>
                        <p className="text-muted-foreground/40 font-black text-[10px] uppercase tracking-[0.4em] max-w-sm leading-relaxed">Selecciona una conversación del panel lateral para iniciar la comunicación clínica.</p>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary), 0.1);
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
}
