import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import GrainOverlay from "@/components/GrainOverlay";
import CurtainTransition from "@/components/CurtainTransition";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://mersi-architecture.com"),
  title: "MERSI — Architecture & Design d'intérieur",
  description:
    "MERSI est un studio d'architecture d'intérieur basé à Paris, spécialisé dans la conception d'espaces résidentiels, retail et hospitality.",
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/webclip.png",
  },
  openGraph: {
    images: ["/assets/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full">
        <I18nProvider>
          <Loader />
          <GrainOverlay />
          <CurtainTransition />
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
          <FooterWrapper />
        </I18nProvider>
      </body>
    </html>
  );
}
