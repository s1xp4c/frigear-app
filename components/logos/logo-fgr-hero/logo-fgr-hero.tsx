import Image from "next/image";

const FrigearRfLogo = ({ className = "", ...props }) => (
  <Image
    src="/logos/logo_with_rf_bgr.jpg"
    alt="hero image"
    width={265}
    height={265}
    className={className}
    {...props}
  />
);

export default FrigearRfLogo;
