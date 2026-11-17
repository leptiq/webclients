import type { ComponentPropsWithoutRef } from 'react';

import clsx from '@proton/utils/clsx';

import './ProtonLoader.scss';

export enum ProtonLoaderType {
    Default = 'default',
    Negative = 'negative',
}

export interface ProtonLoaderProps extends ComponentPropsWithoutRef<'svg'> {
    type?: ProtonLoaderType;
}

export const ProtonLoader = ({ className, type = ProtonLoaderType.Default, ...rest }: ProtonLoaderProps) => {
    const logoId = `p-logo-${type}`;
    const logoGradientId = `p-logo-gradient-${type}`;
    const gradientId = `p-gradient-${type}`;
    const lightGradientId = `p-light-gradient-${type}`;
    const lightMaskId = `p-light-mask-${type}`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="none"
            viewBox="0 0 56 56"
            aria-hidden="true"
            data-proton-loader
            className={clsx(['w-custom', className])}
            style={{ '--w-custom': '10em' }}
            {...rest}
        >
            {/* Leptiq: the golden "L" mark (source viewBox 0 0 1200 1200) with the light sweep. */}
            <g transform="scale(0.1037) translate(-328 -344)">
                <path
                    id={logoId}
                    fill={type === 'negative' ? '#FFFFFF' : `url(#${gradientId})`}
                    d="M 378 369 H 458 C 508 369 548 409 548 459 V 674 C 548 698 567 716 591 716 H 746 C 786 716 819 748 819 788 C 819 828 786 860 746 860 H 466 C 417 860 378 821 378 772 Z"
                />
                <path
                    id={logoGradientId}
                    fill={type === 'negative' ? '#E0E0E0' : '#D97800'}
                    opacity=".9"
                    d="M 385 811 C 386 753 428 715 484 708 C 519 704 548 710 579 716 C 550 716 532 731 532 757 C 532 795 501 828 461 844 C 427 858 397 843 385 811 Z"
                />
            </g>
            <mask id={lightMaskId} style={{ maskType: 'alpha' }}>
                <g transform="scale(0.1037) translate(-328 -344)">
                    <use href={`#${logoId}`} />
                </g>
            </mask>
            <g mask={`url(#${lightMaskId})`}>
                <circle className="proton-loader-light" cx="40" cy="-52" r="50" fill={`url(#${lightGradientId})`} />
            </g>
            <defs>
                <radialGradient id={lightGradientId}>
                    <stop stopColor="#FFFFFF" stopOpacity=".5" />
                    <stop stopColor="#FFFFFF" stopOpacity="0" offset="1" />
                </radialGradient>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#FFE31A" />
                    <stop stopColor="#FFC400" offset=".48" />
                    <stop stopColor="#F4A900" offset="1" />
                </linearGradient>
            </defs>
        </svg>
    );
};
