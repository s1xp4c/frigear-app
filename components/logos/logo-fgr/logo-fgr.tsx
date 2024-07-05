import Image from 'next/image';
import FgrLogo from '../../../public/logos/FGR_logo_white.png';

export default function LogoFGR() {
  return (
    <Image
      src={FgrLogo}
      width={100}
      height={100}
      alt="Frigear FGR short logo"
    />
  );
}
