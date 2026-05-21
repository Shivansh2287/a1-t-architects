"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";

const NAV_LINKS = [
  { key: "nav.projets", href: "/projets" },
  { key: "nav.agence", href: "/agence" },
  { key: "nav.process", href: "/process" },
  { key: "nav.shop", href: "/shop" },
  { key: "nav.contact", href: "/contact" },
];

function MersiLogo({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="77"
      height="35"
      viewBox="0 0 77 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.3615 6.47658H10.1654V12.9524H11.3615V6.47658Z" fill={color} />
      <path d="M0 0.000821995H10.1654L10.1654 6.47658H7.38301C7.00355 6.47658 6.69596 6.78185 6.69596 7.15839V16.665H0V0.000821995Z" fill={color} />
      <path d="M21.525 0.000822336V16.665H14.831V7.15839C14.831 6.78183 14.5234 6.47659 14.1439 6.47659L11.3615 6.47658L11.3615 0.000822336H21.525Z" fill={color} />
      <path d="M29.9122 1.86838V4.61281H40.0087V5.79971H29.9122V8.5669C29.9122 8.94327 30.2196 9.24838 30.5989 9.24838H40.0087V16.6566H29.9122V16.6642H23.2162V0H40.0087V1.1869H30.5989C30.2196 1.1869 29.9122 1.49202 29.9122 1.86838Z" fill={color} />
      <path d="M55.3135 10.3792H54.5538C56.7239 10.3792 58.4826 12.1244 58.4826 14.278V16.6651H57.2866V14.278C57.2866 12.1245 55.5279 10.3792 53.3578 10.3792H48.3861V9.19232H53.7654C54.1462 9.19232 54.4562 8.88657 54.4562 8.50866V5.87467C54.4562 5.49676 54.1462 5.18912 53.7654 5.18912H48.3133V9.19233H43.0354V10.3792L48.3861 10.3792L48.386 16.6651H41.6901V0.000879127H55.3135C57.0645 0.000879127 58.4826 1.40808 58.4826 3.14572V7.23438C58.4826 8.972 57.0646 10.3792 55.3135 10.3792Z" fill={color} />
      <path d="M73.0865 20.2115V33.1177C73.0865 33.4984 73.3975 33.8069 73.7811 33.8069H77V34.9939H60.2075V33.8069H63.4264C63.81 33.8069 64.121 33.4984 64.121 33.1177V20.2115C64.121 19.8309 63.81 19.5223 63.4264 19.5223H60.2075V18.3354H77V19.5223H73.7811C73.3975 19.5223 73.0865 19.8309 73.0865 20.2115Z" fill={color} />
      <path d="M50.0873 25.482V26.6689H44.9606C43.1543 26.6689 41.6901 25.2158 41.6901 23.4234V21.5813C41.6901 19.7889 43.1544 18.3358 44.9606 18.3358H58.4826V25.482H50.0873Z" fill={color} />
      <path d="M50.0873 27.8539V26.6689H55.2121C57.0183 26.6689 58.4826 28.1219 58.4826 29.9144V31.7545C58.4826 33.547 57.0183 35 55.2121 35H41.6901V27.8539H50.0873Z" fill={color} />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  const isHome = pathname === "/";
  const navColor = isHome ? "var(--cream)" : "var(--off-black)";

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between"
        style={{
          zIndex: 999,
          height: "4rem",
          padding: "0 1.25rem",
          color: navColor,
        }}
      >
        <Link href="/" data-transition>
          <MersiLogo color={navColor} />
        </Link>

        <div className="hidden md:flex items-center gap-[2rem]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-transition
              className="uppercase transition-opacity hover:opacity-60"
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "0.5rem",
                lineHeight: "0.65rem",
                letterSpacing: "0.05rem",
              }}
            >
              {t(link.key)}
            </Link>
          ))}

          <LanguageToggle color={navColor} />

          <span
            style={{
              width: "3rem",
              height: "1px",
              backgroundColor: navColor,
              opacity: 0.3,
            }}
          />

          <a
            href="https://www.instagram.com/mersi.architecture/"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase transition-opacity hover:opacity-60"
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "0.5rem",
              lineHeight: "0.65rem",
              letterSpacing: "0.05rem",
            }}
          >
            {t("nav.instagram")}
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] items-end"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span
            className="block h-[1px] w-[24px]"
            style={{ backgroundColor: navColor }}
          />
          <span
            className="block h-[1px] w-[16px]"
            style={{ backgroundColor: navColor }}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex: 1001,
            backgroundColor: "var(--off-black)",
            color: "var(--cream)",
          }}
        >
          <button
            className="absolute top-[1.25rem] right-[1.25rem] text-[1.5rem]"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ color: "var(--cream)" }}
          >
            ✕
          </button>

          <div className="mb-[3rem]">
            <img
              src="/assets/logo-big-creme.webp"
              alt="MERSI"
              style={{ width: "clamp(200px, 30vw, 400px)" }}
            />
          </div>

          <div className="flex flex-col items-center gap-[2rem]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="uppercase transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "Doner, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "2rem",
                  letterSpacing: "0.05rem",
                }}
              >
                {t(link.key)}
              </Link>
            ))}
            <div style={{ marginTop: "1rem" }}>
              <LanguageToggle color="var(--cream)" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
