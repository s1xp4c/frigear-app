import Image from "next/image";
import FrigearLogo from "public/logos/frigear-logo-2000x800.svg";

interface LogoFullProps {
  width?: number;
  height?: number;
}

export default function LogoFull({ width, height }: LogoFullProps) {
  return (
    <Image
      src={FrigearLogo}
      width={width}
      height={height}
      alt="Frigear Tekst-logo svg"
      className="logo-full"
    />
  );
}
