import { useState } from 'react';

import generateUID from '@proton/utils/generateUID';

import LogoBase, { type LogoProps } from './LogoBase';

/** Leptiq: the golden "L" mark (source viewBox 0 0 1200 1200, cropped). */
const MARK_BOX = { x: 328, y: 344, size: 540 };

export const LeptiqMark = ({ uid, size = 36 }: { uid: string; size?: number }) => {
    const s = size / MARK_BOX.size;
    return (
        <g transform={`scale(${s}) translate(${-MARK_BOX.x} ${-MARK_BOX.y})`}>
            <defs>
                <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FFE31A" />
                    <stop offset=".48" stopColor="#FFC400" />
                    <stop offset="1" stopColor="#F4A900" />
                </linearGradient>
                <linearGradient id={`${uid}-fold`} x1="0" y1="0" x2="1" y2=".25">
                    <stop offset="0" stopColor="#A94A00" />
                    <stop offset=".55" stopColor="#D97800" />
                    <stop offset="1" stopColor="#F5A900" />
                </linearGradient>
                <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#FFF34A" stopOpacity=".55" />
                    <stop offset="1" stopColor="#FFF34A" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                fill={`url(#${uid}-gold)`}
                d="M 378 369 H 458 C 508 369 548 409 548 459 V 674 C 548 698 567 716 591 716 H 746 C 786 716 819 748 819 788 C 819 828 786 860 746 860 H 466 C 417 860 378 821 378 772 Z"
            />
            <path
                fill={`url(#${uid}-fold)`}
                opacity=".98"
                d="M 385 811 C 386 753 428 715 484 708 C 519 704 548 710 579 716 C 550 716 532 731 532 757 C 532 795 501 828 461 844 C 427 858 397 843 385 811 Z"
            />
            <path
                fill={`url(#${uid}-shine)`}
                d="M 378 369 H 458 C 508 369 548 409 548 459 V 674 C 548 698 567 716 591 716 C 526 704 467 718 426 751 C 397 775 383 805 378 835 Z"
            />
        </g>
    );
};

/** Wordmark width estimate, in logo units (36 high), for a bold+regular label. */
const wordmarkWidth = (product?: string) => Math.ceil(6 * 11.5 + (product ? 6 + product.length * 10.5 : 0));

/**
 * The Leptiq logo for a product ("Pass", "Drive"...). Used in place of every
 * Proton product logo.
 */
const LeptiqLogo = ({
    product,
    variant = 'with-wordmark',
    hasTitle = true,
    ...rest
}: LogoProps & { product?: string }) => {
    const [uid] = useState(generateUID('leptiq-logo'));
    const title = product ? `Leptiq ${product}` : 'Leptiq';
    const text = wordmarkWidth(product);
    const logoWidth = variant === 'glyph-only' ? 36 : variant === 'wordmark-only' ? text : 42 + text;
    const textX = variant === 'wordmark-only' ? 0 : 42;

    return (
        <LogoBase
            uid={uid}
            logoWidth={logoWidth}
            logoHeight={36}
            title={hasTitle ? title : undefined}
            variant={variant}
            {...rest}
        >
            {variant !== 'wordmark-only' && <LeptiqMark uid={uid} />}
            {variant !== 'glyph-only' && (
                <text
                    x={textX}
                    y={25}
                    fill="currentColor"
                    fontSize={19}
                    fontFamily="var(--setting-font-family, Inter, system-ui, sans-serif)"
                >
                    <tspan fontWeight={700}>Leptiq</tspan>
                    {product && <tspan fontWeight={400}> {product}</tspan>}
                </text>
            )}
        </LogoBase>
    );
};

export default LeptiqLogo;
