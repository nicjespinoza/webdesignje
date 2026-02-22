'use client';

import Image from 'next/image';

type LogoProps = {
    isDark?: boolean;
    size?: number;
    className?: string;
};

export default function Logo({ isDark = true, size = 64, className = '' }: LogoProps) {
    const src = '/logos/logo-gold-2.png';

    return (
        <Image
            src={src}
            alt="JE Web Design - Joseph Espinoza"
            width={size}
            height={size}
            className={`drop-shadow-[0_0_20px_rgba(198,147,32,0.6)] rounded-sm ${className}`}
            style={{ width: `${size}px`, height: 'auto' }}
            priority
        />
    );
}
