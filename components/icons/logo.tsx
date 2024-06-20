import Image from "next/image";

const Logo = ({ className = "", ...props }) => (
  <Image
    src="/fgr_logo_white.png"
    alt="FGR Logo"
    width={60}
    height={60}
    className={className}
    {...props}
  />
);

export default Logo;
