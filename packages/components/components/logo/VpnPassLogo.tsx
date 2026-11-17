// Leptiq: every product logo is the Leptiq mark plus the product name.
import LeptiqLogo from './LeptiqLogo';

interface VpnPassLogoProps {
    size?: number;
}

const VpnPassLogo = ({ size = 15 }: VpnPassLogoProps) => (
    <LeptiqLogo variant="glyph-only" style={{ width: size, height: size }} />
);

export default VpnPassLogo;
