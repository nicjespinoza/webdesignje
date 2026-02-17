"use client";

// ============================================================
// Página de Login para Doctores
// Autenticación con Firebase Auth (email + password).
// Validación con React Hook Form + Zod.
// Estilo: fondo gradient, card glassmorphism centrada.
// Redirige a /dashboard después de login exitoso.
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

// ---- Schema de validación con Zod ----
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Ingresa un email válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Inferir tipo TypeScript desde el schema de Zod
type LoginFormData = z.infer<typeof loginSchema>;

export default function DoctorLoginPage() {
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar react-hook-form con validación inline
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Handler de submit: valida con Zod, luego autentica con Firebase
  const onSubmit = async (data: LoginFormData) => {
    // Validar datos con Zod antes de enviar a Firebase
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return; // Los errores de register ya se muestran en el form
    }

    setIsLoading(true);
    setFirebaseError(null);

    try {
      // Autenticar con Firebase Auth
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // Redirigir al dashboard después de login exitoso
      router.push("/dashboard");
    } catch (error: unknown) {
      // Mapear códigos de error de Firebase a mensajes en español
      const firebaseErr = error as { code?: string };
      switch (firebaseErr.code) {
        case "auth/user-not-found":
          setFirebaseError("No existe una cuenta con este email.");
          break;
        case "auth/wrong-password":
          setFirebaseError("Contraseña incorrecta.");
          break;
        case "auth/invalid-credential":
          setFirebaseError(
            "Credenciales inválidas. Verifica tu email y contraseña."
          );
          break;
        case "auth/too-many-requests":
          setFirebaseError("Demasiados intentos. Intenta más tarde.");
          break;
        default:
          setFirebaseError("Error al iniciar sesión. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 pt-16">
      {/* ---- Fondo con gradientes difusos animados ---- */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* ---- Card de login con glassmorphism ---- */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8">
          {/* Header del card */}
          <div className="mb-8 text-center">
            {/* Icono de usuario con gradiente */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Acceso Médico</h1>
            <p className="mt-1 text-sm text-gray-400">
              Ingresa con tu cuenta de doctor
            </p>
          </div>

          {/* ---- Formulario de login ---- */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="doctor@clinica.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error de Firebase (credenciales inválidas, etc.) */}
            {firebaseError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {firebaseError}
              </div>
            )}

            {/* Botón Submit con estado de loading */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  {/* Spinner SVG */}
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Ingresando...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* Link para volver al inicio */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-400 transition-colors hover:text-cyan-400"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
