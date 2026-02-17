"use client";

// ============================================================
// Dashboard Médico (Placeholder)
// Página protegida: redirige a login si no está autenticado.
// Muestra cards de métricas y un aviso de "en construcción".
// Se expandirá con historias clínicas, gestión de pacientes, etc.
// ============================================================

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirigir a login si el usuario no está autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.push("/doctor/login");
    }
  }, [user, loading, router]);

  // Spinner mientras se verifica el estado de autenticación
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  // No renderizar nada si no hay usuario (evita flash antes del redirect)
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#030712] px-6 pb-12 pt-24">
      <div className="mx-auto max-w-7xl">
        {/* Header del dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-gray-400">
            Bienvenido, {user.email?.split("@")[0] ?? "Doctor"}
          </p>
        </div>

        {/* Grid de cards con métricas (placeholder) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Pacientes",
              value: "—",
              desc: "Registros totales",
              color: "from-cyan-500 to-blue-600",
              icon: (
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
            {
              title: "Consultas Hoy",
              value: "—",
              desc: "Pendientes de atención",
              color: "from-purple-500 to-pink-600",
              icon: (
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: "IA Sugerencias",
              value: "—",
              desc: "Diagnósticos asistidos",
              color: "from-green-500 to-emerald-600",
              icon: (
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
                </svg>
              ),
            },
          ].map((card) => (
            <div key={card.title} className="glass-card p-6">
              <div
                className={`mb-3 inline-flex rounded-lg bg-gradient-to-r ${card.color} p-2.5`}
              >
                {card.icon}
              </div>
              <h3 className="text-sm font-medium text-gray-400">
                {card.title}
              </h3>
              <p className="mt-1 text-3xl font-bold text-white">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Sección placeholder para expansión futura */}
        <div className="mt-8 glass-card p-8 text-center">
          <div className="mb-3 text-4xl">🚧</div>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Dashboard en Construcción
          </h2>
          <p className="text-sm text-gray-400">
            Próximamente: historias clínicas multi-especialidad, gestión de
            pacientes, reportes con IA, exportación PDF y más.
          </p>
        </div>
      </div>
    </div>
  );
}
