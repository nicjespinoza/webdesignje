'use client';

import Image from 'next/image';

type LogoProps = {
    isDark?: boolean;
    size?: number;
    className?: string;
};

export default function Logo({ size = 64, className = '' }: LogoProps) {
    const src = '/logos/logo-gold-2.png';

    return (
        <Image
            src={src}
            alt="Web Design | Joseph Espinoza"
            width={size}
            height={size}
            className={`object-contain drop-shadow-[0_0_10px_rgba(198,147,32,0.4)] rounded-sm ${className}`}
            priority
        />
    );
}
