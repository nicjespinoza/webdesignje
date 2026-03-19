import DemoPlaceholder from '@/components/medical/ui/DemoPlaceholder';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HotelDemoPage() {
    return (
        <DemoPlaceholder
            title="Hotel Management"
            description="Una plataforma integral para la gestión hotelera, desde reservaciones hasta servicios al huésped, con una interfaz premium y minimalista."
        />
    );
}
