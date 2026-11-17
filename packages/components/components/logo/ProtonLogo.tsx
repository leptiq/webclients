// Leptiq: every product logo is the Leptiq mark plus the product name.
import type { LogoProps } from './LogoBase';
import LeptiqLogo from './LeptiqLogo';

type Props = LogoProps & { color?: string; withBackground?: boolean };

const ProtonLogo = ({ color: _color, withBackground: _bg, ...rest }: Props) => <LeptiqLogo {...rest} />;

export default ProtonLogo;
