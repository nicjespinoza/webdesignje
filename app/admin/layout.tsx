// Layout para Admin Dashboard
export const metadata = {
  title: "Dashboard Administrativo | WebDesignJE",
  description: "Panel de control administrativo de WebDesignJE. Gestión de usuarios, proyectos y configuraciones.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
