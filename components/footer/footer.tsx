// Footer.tsx
import GitHub from '@/components/icons/github';
import Logo from '@/components/icons/logo';
import Logo_six from '@/components/icons/logo-six';
import FooterLinkGroup from './footer-link-group';
import Link from 'next/link';

const footerLinks = [
  { href: '/info', label: 'INFO' },
  { href: '/#contact', label: 'SUPPORT' },
  { href: '/', label: 'COOKIES' },
  { href: '/', label: 'SIKKERHED' },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1680px] px-10 bg-background text-foreground ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2 border-b border-foreground/muted">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center font-bold cursor-pointer">
              <Logo className="mr-3 border rounded-full border-foreground/muted" />
              <span className="text-secondary hover:text-foreground transition duration-150 ease-in-out">
                FRIGEAR
              </span>
            </div>
          </Link>
        </div>
        <div className="flex justify-end">
          <FooterLinkGroup links={footerLinks} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between py-6 space-y-3">
        <div>&copy; {new Date().getFullYear()} Frigear ★ CVR-nr: 44353261</div>
        <div className="flex items-center space-x-4">
          <Link
            aria-label="Github Repository"
            href="https://github.com/s1xp4c/frigear-sub-payments"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </Link>
          <span>App udviklet af Frigear frivillige</span>
          <Link
            href="https://block-folio.netlify.app/"
            aria-label="Portfolio link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo_six />
          </Link>
        </div>
      </div>
    </footer>
  );
}
