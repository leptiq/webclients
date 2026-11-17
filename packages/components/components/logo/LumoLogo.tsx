// Leptiq: Lumo is "Leptiq Assistant"; its logo is the Leptiq mark.
import type { LogoProps } from './LogoBase';
import LeptiqLogo, { LeptiqMark } from './LeptiqLogo';

/** Kept for callers that draw the Lumo mark inside their own 36x36 SVG. */
export const LumoCatMark = () => <LeptiqMark uid="leptiq-assistant-mark" />;

const LumoLogo = (props: LogoProps) => <LeptiqLogo product="Assistant" {...props} />;

export default LumoLogo;
