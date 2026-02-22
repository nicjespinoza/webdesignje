"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    MessageCircle,
    Search,
    Send,
    User,
    ChevronLeft,
    Trash2,
    Check,
    CheckCheck
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

export default function ChatPage() {
    const [activeChats, setActiveChats] = useState<ChatSession[]>([]);
    const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sidebar Listener: List of Chats
    useEffect(() => {
        const q = query(
            collection(db, 'chats'),
            orderBy('lastMessageTime', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ChatSession[];
            setActiveChats(chats);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Messages Listener: Current Chat Messages
    useEffect(() => {
        if (!currentChat) {
            setMessages([]);
            return;
        }

        const q = query(
            collection(db, 'chats', currentChat.id, 'messages'),
            orderBy('timestamp', 'asc'),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
            setMessages(msgs);

            // Auto scroll to bottom
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        // Mark as read when opening chat
        const markAsRead = async () => {
            try {
                const chatRef = doc(db, 'chats', currentChat.id);
                await updateDoc(chatRef, { unreadCount: 0 });
            } catch (error) {
                console.error("Error marking as read:", error);
            }
        };
        markAsRead();

        return () => unsubscribe();
    }, [currentChat]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || !currentChat) return;

        const text = inputText;
        setInputText('');

        try {
            await addDoc(collection(db, 'chats', currentChat.id, 'messages'), {
                text,
                sender: 'doctor',
                timestamp: serverTimestamp(),
                read: false
            });

            const chatRef = doc(db, 'chats', currentChat.id);
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
            if (currentChat?.id === id) setCurrentChat(null);
            toast.success("Chat eliminado");
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    const filteredChats = activeChats.filter(chat =>
        chat.visitorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className={`w-full md:w-85 border-r border-gray-100 flex flex-col bg-gray-50/30 ${currentChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-2xl font-bold text-[#083c79] mb-4 flex items-center gap-2">
                        <MessageCircle size={24} /> Mensajes
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar chats..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#083c79]/20 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Cargando...</div>
                    ) : filteredChats.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            <MessageCircle size={48} className="mx-auto mb-2 opacity-20" />
                            <p>No se encontraron chats</p>
                        </div>
                    ) : (
                        filteredChats.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => setCurrentChat(chat)}
                                className={`w-full p-6 flex items-start gap-4 hover:bg-white transition-all text-left border-b border-gray-50 ${currentChat?.id === chat.id ? 'bg-white shadow-md z-10' : ''}`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#083c79] to-[#0a4d8c] flex items-center justify-center text-white font-bold text-lg">
                                        {chat.visitorName?.charAt(0) || 'V'}
                                    </div>
                                    {chat.unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900 truncate">{chat.visitorName}</h3>
                                        <span className="text-[10px] text-gray-400">
                                            {chat.lastMessageTime?.toDate ? format(chat.lastMessageTime.toDate(), 'HH:mm') : ''}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Main Area */}
            <div className={`flex-1 flex flex-col bg-white ${currentChat ? 'flex' : 'hidden md:flex'}`}>
                {currentChat ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setCurrentChat(null)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                    <ChevronLeft size={24} />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#083c79]">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-800">{currentChat.visitorName}</h2>
                                    <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        En línea
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleDeleteChat(currentChat.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <Trash2 size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
                            {messages.map((msg, idx) => {
                                const isMe = msg.sender === 'doctor';
                                return (
                                    <div key={msg.id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] p-4 rounded-3xl shadow-sm ${isMe ? 'bg-[#083c79] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                                <span>{msg.timestamp?.toDate ? format(msg.timestamp.toDate(), 'HH:mm') : '...'}</span>
                                                {isMe && (msg.read ? <CheckCheck size={12} /> : <Check size={12} />)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-white border-t border-gray-100">
                            <form onSubmit={handleSend} className="flex items-center gap-4 bg-gray-50 p-2 pl-4 rounded-2xl border border-gray-200">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm py-2"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="p-3 bg-[#083c79] text-white rounded-xl hover:bg-[#0a4d8c] transition-all disabled:opacity-50"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <MessageCircle size={64} className="mb-4 opacity-10" />
                        <h3 className="text-xl font-bold text-gray-700">Canal de Chat</h3>
                        <p>Selecciona una conversación para comenzar</p>
                    </div>
                )}
            </div>
        </div>
    );
}
