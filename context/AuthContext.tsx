"use client";

// ============================================================
// Contexto de Autenticación (Firebase Auth)
// Provee el estado del usuario a toda la app via React Context.
// Incluye: user actual, estado de carga, función de logout.
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { AuthContextType } from "@/types";

// Crear el contexto con valor por defecto undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider que envuelve la app y escucha cambios de autenticación.
 * Usa onAuthStateChanged de Firebase para mantener el estado sincronizado.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Guard: si Firebase no se inicializó (build sin env vars), no suscribir
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      setLoading(false);
      return;
    }

    // Suscribirse a cambios de estado de autenticación en Firebase
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Limpiar suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  /** Cerrar sesión del usuario actual */
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para acceder al contexto de autenticación.
 * Lanza error si se usa fuera de un AuthProvider.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return context;
}
