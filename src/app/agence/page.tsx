"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

function MsLogoCorner() {
  return (
    <img
      src="/assets/logo-creme-small.webp"
      alt=""
      style={{ width: "5.5rem", height: "auto", opacity: 0.6 }}
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = "none";
      }}
    />
  );
}

export default function AgencePage() {
  const { t } = useI18n();
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const imgScaleRef = useRef<HTMLImageElement>(null);
  const cadreRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const titleLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroSection = heroSectionRef.current;
      const imgScale = imgScaleRef.current;
      const cadre = cadreRef.current;

      if (heroSection && imgScale) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        gsap.set(imgScale, {
          width: 300,
          height: 70,
          clipPath: "inset(1%)",
        });

        if (cadre) {
          gsap.set(cadre, { opacity: 1 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "+=800",
            pin: true,
            scrub: 0.5,
          },
        });

        tl.to(
          imgScale,
          {
            width: vw,
            height: vh,
            clipPath: "inset(0%)",
            duration: 1,
            ease: "none",
          },
          0
        );

        if (cadre) {
          tl.to(
            cadre,
            {
              opacity: 0,
              scale: 1.5,
              duration: 0.4,
              ease: "none",
            },
            0
          );
        }
      }

      titleLinesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 80%",
            },
            delay: i * 0.12,
          }
        );
      });

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      textRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const titleLines = [
    t("agence.title1"),
    t("agence.title2"),
    t("agence.title3"),
  ];

  return (
    <div style={{ backgroundColor: "var(--cream)" }}>
      {/* Hero — zoom from small framed image to fullscreen */}
      <div
        ref={heroSectionRef}
        className="relative"
        style={{
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Decorative frame (fades out during zoom) */}
        <div
          ref={cadreRef}
          className="absolute"
          style={{
            left: "50%",
            top: "42%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
            width: "22rem",
            height: "7rem",
            border: "1px solid rgba(26, 26, 26, 0.15)",
            borderRadius: "2px",
          }}
        />

        {/* Scaling image — starts small, grows to fill viewport */}
        <img
          ref={imgScaleRef}
          src="/assets/agence/hero-about.webp"
          alt="MERSI Agence"
          style={{
            position: "absolute",
            left: "50%",
            top: "42%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
            zIndex: 1,
            width: 300,
            height: 70,
            clipPath: "inset(1%)",
          }}
        />

        {/* MS logos in bottom corners */}
        <div
          className="absolute"
          style={{ bottom: "1.5rem", left: "1.5rem", zIndex: 3 }}
        >
          <MsLogoCorner />
        </div>
        <div
          className="absolute"
          style={{ bottom: "1.5rem", right: "1.5rem", zIndex: 3 }}
        >
          <MsLogoCorner />
        </div>
      </div>

      {/* Title + subtitle area */}
      <section
        className="flex flex-col items-center text-center"
        style={{ padding: "6rem 2.5rem 4rem" }}
      >
        <h1
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            lineHeight: "1.05",
            color: "var(--off-black)",
            marginBottom: "2rem",
          }}
        >
          {titleLines.map((line, i) => (
            <div key={i} style={{ overflow: "clip" }}>
              <div
                ref={(el) => { titleLinesRef.current[i] = el; }}
                style={{ opacity: 0, transform: "translateY(100%)" }}
              >
                {line}
              </div>
            </div>
          ))}
        </h1>

        <div
          ref={subtitleRef}
          className="uppercase text-center"
          style={{
            fontFamily: "Switzer, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            lineHeight: "1.8",
            maxWidth: "24rem",
            opacity: 0,
            color: "var(--off-black)",
          }}
        >
          {t("agence.subtitle").split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </div>

        {/* MS logo in center-bottom of this block */}
        <div className="flex items-center justify-center gap-[4rem] mt-[2rem]">
          <MsLogoCorner />
          <MsLogoCorner />
        </div>
      </section>

      {/* About info — text left + copyright right */}
      <section
        ref={(el) => { textRefs.current[0] = el; }}
        style={{ padding: "0 2.5rem" }}
      >
        <div
          className="flex flex-col md:flex-row justify-between items-start"
          style={{ gap: "2rem" }}
        >
          <div className="flex flex-col" style={{ maxWidth: "28rem" }}>
            {(["agence.p1", "agence.p2", "agence.p3"] as const).map((key, idx) => (
              <p
                key={key}
                style={{
                  fontFamily: "Switzer, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "1.25rem",
                  lineHeight: "1.1",
                  marginBottom: idx < 2 ? "1.5rem" : "2.5rem",
                }}
              >
                {t(key).split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
            ))}
            <a
              href="/contact"
              className="uppercase inline-flex items-center gap-[0.5rem] transition-opacity hover:opacity-60"
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.05em",
              }}
            >
              {t("agence.letsTalk")}
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>

          <h2
            style={{
              fontFamily: "Switzer, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "0.75rem",
              opacity: 0.6,
              whiteSpace: "nowrap",
            }}
          >
            ®26 MERSI
          </h2>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: "9.375rem" }} />

      {/* Team grid — 3 columns: Meryl bio | center image | Simon bio */}
      <section
        ref={(el) => { textRefs.current[1] = el; }}
        style={{ padding: "0 2.5rem 5rem" }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "5rem",
          }}
        >
          {/* Meryl */}
          <div className="flex flex-col">
            <h3
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "1.8rem",
                lineHeight: "1.1",
                marginBottom: "1.5rem",
              }}
            >
              Meryl Motyka
            </h3>
            <div className="overflow-hidden md:hidden mb-[1rem]" style={{ aspectRatio: "3/4" }}>
              <img src="/assets/agence/meryl.webp" alt="Meryl" className="w-full h-full" style={{ objectFit: "cover" }} />
            </div>
            <p
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "0.85rem",
                lineHeight: "1.45",
              }}
            >
              {t("agence.merylBio")}
            </p>
          </div>

          {/* Center image */}
          <div className="hidden md:block overflow-hidden" style={{ aspectRatio: "2/3" }}>
            <img
              src="/assets/agence/meryl.webp"
              alt="MERSI Team"
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Simon */}
          <div className="flex flex-col">
            <h3
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "1.8rem",
                lineHeight: "1.1",
                marginBottom: "1.5rem",
              }}
            >
              Simon Mimoun
            </h3>
            <div className="overflow-hidden md:hidden mb-[1rem]" style={{ aspectRatio: "3/4" }}>
              <img src="/assets/agence/simon.webp" alt="Simon" className="w-full h-full" style={{ objectFit: "cover" }} />
            </div>
            <p
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "0.85rem",
                lineHeight: "1.45",
              }}
            >
              {t("agence.simonBio")}
            </p>
          </div>
        </div>
      </section>

      {/* Talk section — full viewport */}
      <section
        className="relative flex items-center justify-center"
        style={{
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "var(--off-black)",
          color: "var(--cream)",
        }}
      >
        <div className="flex flex-col items-center text-center" style={{ gap: "2rem" }}>
          <h2
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: "1.05",
            }}
          >
            {t("agence.title1")} {t("agence.title2")}
            <br />
            {t("agence.title3")}
          </h2>
          <a
            href="/contact"
            className="uppercase inline-flex items-center gap-[0.5rem] transition-opacity hover:opacity-60"
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "0.6rem",
              letterSpacing: "0.05em",
              color: "var(--cream)",
            }}
          >
            {t("agence.letsTalk")}
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
