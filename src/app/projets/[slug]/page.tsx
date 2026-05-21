"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects, projects, type GalleryImage } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_WIDTH_MAP = { sm: "24rem", md: "30rem", lg: "54rem" } as const;

function MsMonogram({ color = "#EDE7DE" }: { color?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 192 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ mixBlendMode: "overlay" }}
    >
      <path d="M53.8383 31.0883H48.1706V62.1766H53.8383V31.0883Z" fill={color} fillOpacity="0.15" />
      <path d="M0 0H48.1706L48.1706 31.0883H34.9857C33.1876 31.0883 31.73 32.5537 31.73 34.3614V79.9999H0V0Z" fill={color} fillOpacity="0.15" />
      <path d="M102 0V80H70.2792V34.3614C70.2792 32.5537 68.8215 31.0883 67.0234 31.0883H53.8383V0H102Z" fill={color} fillOpacity="0.15" />
      <path d="M138.162 31.0883H132.494V62.1766H138.162V31.0883Z" fill={color} fillOpacity="0.15" />
      <path d="M192 17.7647C192 27.5762 184.013 35.5294 174.159 35.5294C164.305 35.5294 156.318 27.5762 156.318 17.7647C156.318 7.95327 164.305 0 174.159 0C184.013 0 192 7.95327 192 17.7647Z" fill={color} fillOpacity="0.15" />
      <path d="M116.323 0H156.318V80H116.323V34.3614C116.323 32.5537 114.865 31.0883 113.067 31.0883H102V0H116.323Z" fill={color} fillOpacity="0.15" />
      <path d="M192 44.4706C192 54.2821 184.013 62.2353 174.159 62.2353C164.305 62.2353 156.318 54.2821 156.318 44.4706H192Z" fill={color} fillOpacity="0.15" />
    </svg>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const project = allProjects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const galleryImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endSliderRef = useRef<HTMLDivElement>(null);
  const endLeftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endRightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endBtnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentIdx = allProjects.findIndex((p) => p.slug === slug);
  const otherProjects = projects.filter((p) => p.slug !== slug);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      galleryImgRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0% 0%)" },
          {
            clipPath: "inset(0%)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              containerAnimation: horizontalTween,
              start: "left 95%",
              end: "left 50%",
              scrub: true,
            },
          }
        );
      });

      const endN = otherProjects.length;
      if (endN > 0 && endSliderRef.current) {
        const endSliderWidth = endSliderRef.current.offsetWidth;
        const endScrollRange = endSliderWidth * 0.5;

        ScrollTrigger.create({
          trigger: endSliderRef.current,
          containerAnimation: horizontalTween,
          start: "left 80%",
          end: `left -${endScrollRange}px`,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalProgress = progress * endN;
            const activeIndex = Math.min(Math.floor(totalProgress), endN - 1);
            const revealFraction = totalProgress - activeIndex;

            for (let i = 0; i < endN; i++) {
              const left = endLeftRefs.current[i];
              const right = endRightRefs.current[i];
              const btn = endBtnRefs.current[i];

              if (i < activeIndex) {
                if (left) left.style.clipPath = "inset(0%)";
                if (right) right.style.clipPath = "inset(0%)";
                if (btn) btn.style.clipPath = "inset(0%)";
              } else if (i === activeIndex && i > 0) {
                const pct = Math.min(1, revealFraction / 0.8);
                const clip = 100 - pct * 100;
                if (left) left.style.clipPath = `inset(${clip}% 0% 0% 0%)`;
                if (right) right.style.clipPath = `inset(0% 0% ${clip}% 0%)`;
                if (btn) btn.style.clipPath = `inset(${clip}% 0% 0% 0%)`;
              } else if (i === 0) {
                if (left) left.style.clipPath = "inset(0%)";
                if (right) right.style.clipPath = "inset(0%)";
                if (btn) btn.style.clipPath = "inset(0%)";
              } else {
                if (left) left.style.clipPath = "inset(100% 0% 0% 0%)";
                if (right) right.style.clipPath = "inset(0% 0% 100% 0%)";
                if (btn) btn.style.clipPath = "inset(100% 0% 0% 0%)";
              }
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, [slug, otherProjects.length]);

  if (!project) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          minHeight: "100vh",
          fontFamily: "Doner, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "2rem",
        }}
      >
        {t("project.notFound")}
      </div>
    );
  }

  const services = project.services || [
    "Architecture d'intérieur",
    "Conception architecturale",
    "Pilotage de chantier",
  ];

  const gallery = project.gallery || [
    { src: project.cover, width: "lg" as const },
    { src: project.homeLeft || project.cover, width: "sm" as const },
    { src: project.homeRight || project.cover, width: "sm" as const },
    { src: project.cover, width: "md" as const },
  ];

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      style={{ height: "100vh", backgroundColor: "var(--cream)" }}
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ flexWrap: "nowrap", willChange: "transform" }}
      >
        {/* ========== HERO SECTION ========== */}
        <section className="flex-shrink-0 flex" style={{ width: "100vw", height: "100vh" }}>
          <div
            className="relative flex flex-col justify-between"
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: project.accentColor,
              color: "var(--cream)",
              padding: "6rem 2.5rem 3rem",
            }}
          >
            <div className="flex justify-between">
              <div style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "0.8rem", opacity: 0.8 }}>
                {project.location}
              </div>
              <div style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "0.8rem", opacity: 0.8 }}>
                {project.year}
              </div>
            </div>

            <div className="flex justify-center" style={{ padding: "0 3rem" }}>
              <div
                className="overflow-hidden"
                style={{
                  border: "1px solid rgba(237, 231, 222, 0.3)",
                  padding: "0.75rem",
                  maxWidth: "16rem",
                  width: "100%",
                }}
              >
                <img
                  src={project.homeLeft || project.cover}
                  alt={project.name}
                  className="w-full"
                  style={{ aspectRatio: "3/4", objectFit: "cover" }}
                />
              </div>
              <div
                className="text-center mt-[1rem]"
                style={{
                  position: "absolute",
                  bottom: "calc(3rem + 6rem)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "Switzer, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                {project.tagline || project.description}
              </div>
            </div>

            <h1
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "5rem",
                lineHeight: "0.9",
                color: "var(--off-black)",
              }}
            >
              {project.name}
            </h1>
          </div>

          <div className="overflow-hidden" style={{ width: "50%", height: "100%" }}>
            <img
              src={project.cover}
              alt={project.name}
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        {/* ========== DESCRIPTION + SERVICES ========== */}
        <section
          className="flex-shrink-0 flex flex-col justify-center"
          style={{ width: "45rem", height: "100vh", padding: "4rem 4rem 4rem 6rem" }}
        >
          <p
            style={{
              fontFamily: "Switzer, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "1.15rem",
              lineHeight: "1.5",
              fontStyle: "italic",
              marginBottom: "3rem",
              maxWidth: "28rem",
            }}
          >
            {project.description}
          </p>

          <div>
            {services.map((service: string, i: number) => (
              <div
                key={service}
                className="flex items-center justify-between"
                style={{ padding: "1rem 0", borderTop: "1px solid rgba(26, 26, 26, 0.15)" }}
              >
                <div className="flex items-center gap-[0.75rem]">
                  <span style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 300, fontSize: "0.6rem", opacity: 0.4 }}>✦</span>
                  <span style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "0.9rem" }}>{service}</span>
                </div>
                <span style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "0.8rem", opacity: 0.4 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(26, 26, 26, 0.15)" }} />
          </div>

          {project.area && (
            <div style={{ marginTop: "3rem" }}>
              <span style={{ fontFamily: "Doner, Arial, sans-serif", fontWeight: 700, fontSize: "5rem", lineHeight: "1" }}>
                {project.area.replace(" m²", "")}
              </span>
              <span style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "1.5rem", marginLeft: "0.3rem", verticalAlign: "super" }}>
                m²
              </span>
            </div>
          )}
        </section>

        {/* ========== GALLERY (with clip-path reveals) ========== */}
        <section
          className="flex-shrink-0 flex items-stretch gap-[1.5rem]"
          style={{ height: "100vh", padding: "2rem 0" }}
        >
          {gallery.map((img: GalleryImage, i: number) => (
            <div
              key={i}
              ref={(el) => { galleryImgRefs.current[i] = el; }}
              className="flex-shrink-0 overflow-hidden"
              style={{
                width: GALLERY_WIDTH_MAP[img.width],
                height: "100%",
                clipPath: "inset(100% 0% 0%)",
              }}
            >
              <img
                src={img.src}
                alt={`${project.name} — ${i + 1}`}
                className="w-full h-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </section>

        {/* ========== CTA SECTION ========== */}
        <section
          className="flex-shrink-0 flex flex-col items-center justify-center text-center"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "var(--cream)",
          }}
        >
          <div
            className="uppercase mb-[1.5rem]"
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
              color: "var(--off-black)",
            }}
          >
            {t("project.uniquePlaces")}
          </div>
          <p
            style={{
              fontFamily: "Switzer, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "1.1rem",
              lineHeight: "1.6",
              maxWidth: "32rem",
              color: "var(--off-black)",
              marginBottom: "2rem",
            }}
          >
            {t("project.uniqueDesc")}
          </p>
          <Link
            href="/contact"
            data-transition
            className="uppercase transition-opacity hover:opacity-70"
            style={{
              fontFamily: "Switzer, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.05rem",
              borderBottom: "1px solid var(--off-black)",
              paddingBottom: "0.25rem",
              color: "var(--off-black)",
            }}
          >
            {t("project.contactUs")} →
          </Link>
        </section>

        {/* ========== END SLIDER (mini home-slider with other projects) ========== */}
        <section
          ref={endSliderRef}
          className="flex-shrink-0 relative"
          style={{ width: "100vw", height: "100vh" }}
        >
          <div
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{
              zIndex: 3,
              height: "20vh",
              background: "linear-gradient(180deg, rgba(26, 26, 26, 0.4) 0%, transparent 100%)",
            }}
          />

          {/* Left panels */}
          <div className="absolute top-0 left-0" style={{ width: "50%", height: "100%", zIndex: 1 }}>
            {otherProjects.map((p, i) => (
              <div
                key={`end-left-${p.slug}`}
                ref={(el) => { endLeftRefs.current[i] = el; }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  zIndex: i + 1,
                  clipPath: i === 0 ? "inset(0%)" : "inset(100% 0% 0% 0%)",
                }}
              >
                <img src={p.homeLeft} alt={`${p.name} — left`} className="w-full h-full" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>

          {/* Right panels */}
          <div className="absolute top-0 right-0" style={{ width: "50%", height: "100%", zIndex: 1 }}>
            {otherProjects.map((p, i) => (
              <div
                key={`end-right-${p.slug}`}
                ref={(el) => { endRightRefs.current[i] = el; }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  zIndex: i + 1,
                  clipPath: i === 0 ? "inset(0%)" : "inset(0% 0% 100% 0%)",
                }}
              >
                <img src={p.homeRight} alt={`${p.name} — right`} className="w-full h-full" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>

          {/* Button bar overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 100, pointerEvents: "none" }}
          >
            <div className="relative" style={{ width: "clamp(320px, 37.5rem, 540px)", height: "7.5rem" }}>
              {otherProjects.map((p, i) => (
                <div
                  key={`end-btn-${p.slug}`}
                  ref={(el) => { endBtnRefs.current[i] = el; }}
                  className="absolute inset-0"
                  style={{
                    zIndex: i + 1,
                    clipPath: i === 0 ? "inset(0%)" : "inset(100% 0% 0% 0%)",
                    pointerEvents: "auto",
                  }}
                >
                  <Link
                    href={`/projets/${p.slug}`}
                    data-transition
                    className="grid items-center w-full h-full"
                    style={{
                      padding: "1.25rem",
                      backgroundColor: p.accentColor,
                      color: "var(--cream)",
                      gridTemplateColumns: "1fr auto 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "Doner, Arial, sans-serif", fontWeight: 700, fontSize: "1.45rem", lineHeight: "1.6rem", marginBottom: "0.3rem" }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "0.7rem", opacity: 0.7 }}>
                        {p.location}
                      </div>
                    </div>
                    <div style={{ width: "12rem", height: "5rem", opacity: 0.4 }}>
                      <MsMonogram />
                    </div>
                    <div className="flex flex-col items-end justify-between h-full">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      <div className="text-right">
                        <div className="capitalize" style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "0.7rem", opacity: 0.7 }}>
                          {p.category}
                        </div>
                        <div style={{ fontFamily: "Switzer, Arial, sans-serif", fontWeight: 500, fontSize: "0.7rem", opacity: 0.7 }}>
                          {p.year}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Projet suivant label */}
          <div
            className="absolute bottom-0 left-0 w-full flex justify-center"
            style={{ zIndex: 101, paddingBottom: "1rem", pointerEvents: "none" }}
          >
            <span
              className="uppercase"
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "0.625rem",
                letterSpacing: "0.05rem",
                color: "var(--cream)",
                opacity: 0.7,
              }}
            >
              {t("home.nextProject")}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
