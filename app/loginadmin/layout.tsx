// Layout para Login Administrativo
export const metadata = {
  title: "Admin Login | WebDesignJE",
  description: "Panel de administración de WebDesignJE. Acceso exclusivo para administradores.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
