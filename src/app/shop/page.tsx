"use client";

import MouseTrail from "@/components/MouseTrail";
import { useI18n } from "@/lib/i18n";

export default function ShopPage() {
  const { t } = useI18n();
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--cream)",
        color: "var(--off-black)",
        padding: "4rem 2rem",
      }}
    >
      <MouseTrail />
      {/* Outlined MS logo */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: "clamp(280px, 40vw, 500px)", marginBottom: "2rem" }}
      >
        <span
          className="absolute"
          style={{
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "Switzer, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {t("shop.coming")}
        </span>

        <svg
          viewBox="0 0 550 237"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}
        >
          <path
            d="M153.124 95.8847H138.899V173.606H153.124V95.8847Z"
            stroke="var(--off-black)"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M18 18.1641H138.899L138.899 95.8847H105.807C101.294 95.8847 97.636 99.5484 97.636 104.068V218.164H18V18.1641Z"
            stroke="var(--off-black)"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M274 18.1641V218.164H194.387V104.068C194.387 99.5482 190.728 95.8847 186.216 95.8847L153.124 95.8847L153.124 18.1641H274Z"
            stroke="var(--off-black)"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M431.012 103.766V118.011H369.341C347.614 118.011 330 100.572 330 79.0597V56.9518C330 35.4392 347.614 18 369.341 18H532V103.766H431.012Z"
            stroke="var(--off-black)"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M431.012 132.234V118.011H492.659C514.386 118.011 532 135.451 532 156.963V179.048C532 200.561 514.386 218 492.659 218H330V132.234H431.012Z"
            stroke="var(--off-black)"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
        </svg>

        <span
          className="absolute"
          style={{
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "Switzer, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {t("shop.soon")}
        </span>
      </div>

      {/* Mobile-only "soon" indicator */}
      <span
        className="md:hidden"
        style={{
          fontFamily: "Switzer, Arial, sans-serif",
          fontWeight: 500,
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: "1rem",
        }}
      >
        {t("shop.soon").toLowerCase()}
      </span>
    </div>
  );
}
