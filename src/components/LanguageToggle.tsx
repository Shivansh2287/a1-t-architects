"use client";

import { useI18n } from "@/lib/i18n";

export default function LanguageToggle({ color = "currentColor" }: { color?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="transition-opacity hover:opacity-60"
      style={{
        fontFamily: "Switzer, Arial, sans-serif",
        fontWeight: 600,
        fontSize: "0.45rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        border: `1px solid ${color}`,
        borderRadius: "999px",
        padding: "0.2rem 0.55rem",
        color,
        background: "transparent",
        cursor: "pointer",
        lineHeight: 1.4,
      }}
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}
