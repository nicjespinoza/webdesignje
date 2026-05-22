// Layout compartido para todas las páginas de demos
export const metadata = {
  title: "Demos - Proyectos Web con IA | WebDesignJE",
  description:
    "Explora demos interactivos de proyectos reales desarrollados con Next.js, React, TypeScript e inteligencia artificial: POS Tienda AI, Hotel Management System, Eve Commerce y más.",
  openGraph: {
    title: "Demos Interactivos | Proyectos Web con IA",
    description:
      "Explora demos de proyectos reales con Next.js, React e IA desarrollados por Joseph Espinoza.",
  },
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
