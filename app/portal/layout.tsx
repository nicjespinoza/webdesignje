// ============================================================
// Layout del Portal Multi-Especialidad
// Incluye AuthProvider para acceso a Firebase Auth
// ============================================================

import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
    title: "Portal Multi-Especialidad | Historia Clínica Inteligente",
    description:
        "Selecciona tu especialidad y accede a formularios clínicos adaptados a tu práctica médica.",
};

export default function PortalLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthProvider>{children}</AuthProvider>;
}
