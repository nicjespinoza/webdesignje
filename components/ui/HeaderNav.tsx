"use client";

// ============================================================
// Header / Navbar principal
// Muestra el branding "Demo Médico IA" y estado de autenticación.
// Si el usuario está logueado: muestra link al Dashboard + Logout.
// Si no: muestra botón de Iniciar Sesión.
// ============================================================

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function HeaderNav() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo y branding */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Demo Médico <span className="text-cyan-400">IA</span>
          </span>
        </Link>

        {/* Navegación condicional según estado de auth */}
        <nav className="flex items-center gap-4">
          {!loading && user ? (
            <>
              {/* Usuario autenticado: Dashboard + Logout */}
              <Link
                href="/dashboard"
                className="text-sm text-gray-300 transition-colors hover:text-cyan-400"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition-all hover:border-red-500/50 hover:text-red-400"
              >
                Cerrar Sesión
              </button>
            </>
          ) : !loading ? (
            // Usuario no autenticado: botón de login
            <Link
              href="/doctor/login"
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Iniciar Sesión
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
