import DemoPlaceholder from '@/components/medical/ui/DemoPlaceholder';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function POSDemoPage() {
    return (
        <DemoPlaceholder
            title="POS Tienda Zapatos"
            description="Estamos preparando una experiencia completa de Punto de Venta optimizada para el sector calzado con control de inventario inteligente y analítica en tiempo real."
        />
    );
}
