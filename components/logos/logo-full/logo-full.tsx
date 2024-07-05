import Image from 'next/image';
import FrigearLogo from 'public/logos/frigear-logo-2000x800.svg';

export default function LogoFull() {
  return (
    <Image
      src={FrigearLogo}
      width={150}
      height={150}
      alt="Frigear Tekst-logo svg"
      className="logo-full"
    />
  );
}
