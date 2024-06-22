// Footer.tsx
import GitHub from "@/components/icons/github";
import Logo from "@/components/icons/logo";
import Logo_six from "@/components/icons/logo-six";
import FooterLinkGroup from "./footer-link-group";
import Link from "next/link";

const footerLinks = [
  { href: "/info", label: "INFO" },
  { href: "/#contact", label: "SUPPORT" },
  { href: "/", label: "COOKIES" },
  { href: "/", label: "SIKKERHED" },
];

export default function Footer() {
  return (
    <footer className="mx-auto  max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2 border-b border-foreground/50">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center font-bold cursor-pointer">
              <Logo className="mr-4 border-2 rounded-full border-foreground/50" />
              <span className="text-primary hover:text-foreground/50 transition duration-150 ease-in-out">
                Frigear
              </span>
            </div>
          </Link>
        </div>
        <div className="flex my-auto justify-end">
          <FooterLinkGroup links={footerLinks} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between py-4 space-y-1">
        <div>&copy; {new Date().getFullYear()} Frigear ★ CVR-nr: 44353261</div>
        <div className="flex items-center space-x-4">
          <span>Open Source App by Frigear Volunteers</span>
          <Link
            aria-label="Github Repository"
            aria-title="Github Repository"
            href="https://github.com/s1xp4c/frigear-app"
            target="_blank"
            rel="noopener"
          >
            <GitHub />
          </Link>
        </div>
      </div>
    </footer>
  );
}
