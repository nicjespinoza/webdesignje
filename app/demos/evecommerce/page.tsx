import DemoPlaceholder from '@/components/medical/ui/DemoPlaceholder';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function EveCommerceDemoPage() {
    return (
        <DemoPlaceholder
            title="Eve Commerce"
            description="La nueva generación de e-commerce de lujo. Enfocado en la experiencia visual, transiciones fluidas y una arquitectura de alta conversión."
        />
    );
}
