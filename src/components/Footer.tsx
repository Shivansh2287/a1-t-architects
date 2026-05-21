"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "var(--off-black)",
        color: "var(--cream)",
      }}
    >
      <div className="w-full overflow-hidden">
        <img
          src="/assets/footer-wide.svg"
          alt="MERSI"
          className="w-full"
          style={{ display: "block" }}
        />
      </div>

      <div
        className="flex flex-col md:flex-row items-center justify-between gap-[1.5rem] md:gap-0"
        style={{
          padding: "2.5rem 2.5rem 1.5rem",
          fontFamily: "Switzer, Arial, sans-serif",
          fontWeight: 600,
          fontSize: "0.625rem",
          lineHeight: "0.8125rem",
        }}
      >
        <div className="flex items-center gap-[2rem]">
          <Link
            href="/news"
            className="uppercase transition-opacity hover:opacity-60"
            style={{ letterSpacing: "0.05rem" }}
          >
            {t("footer.news")}
          </Link>
          <Link
            href="/mentions-legales"
            className="uppercase transition-opacity hover:opacity-60"
            style={{ letterSpacing: "0.05rem" }}
          >
            {t("footer.legal")}
          </Link>
        </div>

        <div className="text-center opacity-60">
          {t("footer.websiteBy")}{" "}
          <a
            href="https://flotnoir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            FLOT NOIR
          </a>
        </div>

        <div className="flex items-center gap-[2rem]">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase transition-opacity hover:opacity-60"
            style={{ letterSpacing: "0.05rem" }}
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase transition-opacity hover:opacity-60"
            style={{ letterSpacing: "0.05rem" }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
