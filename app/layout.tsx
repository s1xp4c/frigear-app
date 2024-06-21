import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getURL } from "@/utils/helpers";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import NavBar, {
  DesktopNav,
} from "@/components/navigation/desktop-nav/desktop-nav";
import MobileNav from "@/components/navigation/mobile-nav/mobile-nav";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

const meta = {
  title: {
    template: "%s | Frigear",
    default: "Non-profit | Frigear",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  description:
    "Foreningen Frigear faciliterer, støtter, og driver frivillig non-profit projekter, med fokus på medlemsindflydelse og bæredygtighed.",
  cardImage: "/og.png",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  favicon: "/favicon.ico",
  url: getURL(),
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    generator: "Next.js",
    applicationName: "Frigear App",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: "/",
      languages: {
        "da-DK": "/da-DK",
        "de-DE": "/de-DE",
        "en-US": "/en-US",
      },
    },
    keywords: [
      "Foreningen Frigear, Frigear, Non-profit, Frivillige, Roskilde festival frivillig, bar, Arena scenen, Frigear Bar, Forening, Almennyttig, Frivillig-drevet, Frivillig-forening, Foreningsliv",
    ],
    authors: [
      { name: "Six", url: "https://block-folio.netlify.app/" },
      { name: "Hare", url: "" },
    ],
    creator: "Six",
    publisher: "Frigear",
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: "website",
      siteName: "Frigear App",
    },
    twitter: {
      card: "summary_large_image",
      site: "https://frigear.nu/",
      creator: "Six n' Hare",
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Desktop Navigation */}
          <div className="hidden sm:block">
            <NavBar />
          </div>

          {/* Mobile Navigation */}
          <div className="block sm:hidden">
            <MobileNav />
          </div>
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-6">
              <div className="sm:flex sm:flex-col sm:align-center">
                {children}
              </div>
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
