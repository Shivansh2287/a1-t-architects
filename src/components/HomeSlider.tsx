"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

function MsMonogram() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 192 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ mixBlendMode: "overlay" }}
    >
      <path
        d="M53.8383 31.0883H48.1706V62.1766H53.8383V31.0883Z"
        fill="#EDE7DE"
        fillOpacity="0.15"
      />
      <path
        d="M0 0H48.1706L48.1706 31.0883H34.9857C33.1876 31.0883 31.73 32.5537 31.73 34.3614V79.9999H0V0Z"
        fill="#EDE7DE"
        fillOpacity="0.15"
      />
      <path
        d="M102 0V80H70.2792V34.3614C70.2792 32.5537 68.8215 31.0883 67.0234 31.0883H53.8383V0H102Z"
        fill="#EDE7DE"
        fillOpacity="0.15"
      />
      <path
        d="M138.162 31.0883H132.494V62.1766H138.162V31.0883Z"
        fill="#EDE7DE"
        fillOpacity="0.15"
      />
      <path
        d="M192 17.7647C192 27.5762 184.013 35.5294 174.159 35.5294C164.305 35.5294 156.318 27.5762 156.318 17.7647C156.318 7.95327 164.305 0 174.159 0C184.013 0 192 7.95327 192 17.7647Z"
        fill="#EDE7DE"
        fillOpacity="0.15"
      />
      <path
        d="M116.323 0H156.318V80H116.323V34.3614C116.323 32.5537 114.865 31.0883 113.067 31.0883H102V0H116.323Z"
        fill="#EDE7DE"
        fillOpacity="0.15"
      />
      <path
        d="M192 44.4706C192 54.2821 184.013 62.2353 174.159 62.2353C164.305 62.2353 156.318 54.2821 156.318 44.4706H192Z"
        fill="#EDE7DE"
        fillOpacity="0.15"
      />
    </svg>
  );
}

const NUM_CYCLES = 100;

export default function HomeSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);
  const btnWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !btnWrapperRef.current) return;
    gsap.fromTo(
      btnWrapperRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 2.8 }
    );
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const n = projects.length;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          const totalFloat = self.progress * n * NUM_CYCLES;
          const step = Math.floor(totalFloat);
          const frac = totalFloat - step;
          const posInCycle = step % n;
          const isWrap = posInCycle === n - 1;
          const revealPct = Math.min(1, frac / 0.8);

          const setPanel = (
            l: HTMLDivElement | null,
            r: HTMLDivElement | null,
            b: HTMLDivElement | null,
            lClip: string,
            rClip: string,
            bClip: string,
            z: number,
          ) => {
            if (l) { l.style.clipPath = lClip; l.style.zIndex = String(z); }
            if (r) { r.style.clipPath = rClip; r.style.zIndex = String(z); }
            if (b) { b.style.clipPath = bClip; b.style.zIndex = String(z); }
          };

          for (let i = 0; i < n; i++) {
            const left = leftPanelsRef.current[i];
            const right = rightPanelsRef.current[i];
            const btn = buttonsRef.current[i];

            if (isWrap) {
              if (i === 0) {
                if (revealPct >= 1) {
                  setPanel(left, right, btn, "inset(0%)", "inset(0%)", "inset(0%)", 1);
                } else {
                  const clip = 100 - revealPct * 100;
                  setPanel(
                    left, right, btn,
                    `inset(${clip}% 0% 0% 0%)`,
                    `inset(0% 0% ${clip}% 0%)`,
                    `inset(${clip}% 0% 0% 0%)`,
                    n + 1,
                  );
                }
              } else {
                if (revealPct >= 1) {
                  setPanel(left, right, btn, "inset(100% 0% 0% 0%)", "inset(0% 0% 100% 0%)", "inset(100% 0% 0% 0%)", i + 1);
                } else {
                  setPanel(left, right, btn, "inset(0%)", "inset(0%)", "inset(0%)", i + 1);
                }
              }
            } else {
              const target = posInCycle + 1;

              if (i === 0) {
                setPanel(left, right, btn, "inset(0%)", "inset(0%)", "inset(0%)", 1);
              } else if (i <= posInCycle) {
                setPanel(left, right, btn, "inset(0%)", "inset(0%)", "inset(0%)", i + 1);
              } else if (i === target) {
                const clip = 100 - revealPct * 100;
                setPanel(
                  left, right, btn,
                  `inset(${clip}% 0% 0% 0%)`,
                  `inset(0% 0% ${clip}% 0%)`,
                  `inset(${clip}% 0% 0% 0%)`,
                  i + 1,
                );
              } else {
                setPanel(left, right, btn, "inset(100% 0% 0% 0%)", "inset(0% 0% 100% 0%)", "inset(100% 0% 0% 0%)", i + 1);
              }
            }
          }
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <div style={{ paddingTop: "4rem" }}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projets/${project.slug}`}
            className="block"
          >
            <div className="flex flex-col" style={{ height: "100svh" }}>
              <div className="flex-1 overflow-hidden">
                <img
                  src={project.homeLeft}
                  alt={`${project.name} — left`}
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "1rem 1.25rem",
                  backgroundColor: project.accentColor,
                  color: "var(--cream)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Doner, Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  {project.name}
                </div>
                <span
                  className="uppercase"
                  style={{
                    fontFamily: "Switzer, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.625rem",
                    letterSpacing: "0.03rem",
                  }}
                >
                  {t("home.discover")} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${projects.length * NUM_CYCLES * 100}vh` }}
    >
      {/* Voile — dark gradient overlay at top */}
      <div
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{
          zIndex: 3,
          height: "20vh",
          background:
            "linear-gradient(180deg, rgba(26, 26, 26, 0.4) 0%, transparent 100%)",
        }}
      />

      {/* Left panels — wipe DOWN from top */}
      <div
        className="fixed top-0 left-0"
        style={{ width: "50%", height: "100vh", zIndex: 1 }}
      >
        {projects.map((project, i) => (
          <div
            key={`left-${project.slug}`}
            ref={(el) => {
              leftPanelsRef.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: i + 1,
              clipPath: i === 0 ? "inset(0%)" : "inset(100% 0% 0% 0%)",
            }}
          >
            <img
              src={project.homeLeft}
              alt={`${project.name} — left`}
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Right panels — wipe UP from bottom */}
      <div
        className="fixed top-0 right-0"
        style={{ width: "50%", height: "100vh", zIndex: 1 }}
      >
        {projects.map((project, i) => (
          <div
            key={`right-${project.slug}`}
            ref={(el) => {
              rightPanelsRef.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: i + 1,
              clipPath: i === 0 ? "inset(0%)" : "inset(0% 0% 100% 0%)",
            }}
          >
            <img
              src={project.homeRight}
              alt={`${project.name} — right`}
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Button bar — clipPath animated, stacked absolutely, centered */}
      <div
        className="fixed top-0 left-0 w-full flex items-center justify-center"
        style={{
          zIndex: 100,
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        <div ref={btnWrapperRef} className="relative" style={{ width: "clamp(320px, 37.5rem, 540px)", height: "7.5rem", opacity: 0 }}>
          {projects.map((project, i) => (
            <div
              key={`btn-${project.slug}`}
              ref={(el) => {
                buttonsRef.current[i] = el;
              }}
              className="absolute inset-0"
              style={{
                zIndex: i + 1,
                clipPath: i === 0 ? "inset(0%)" : "inset(100% 0% 0% 0%)",
                pointerEvents: "auto",
              }}
            >
              <Link
                href={`/projets/${project.slug}`}
                data-transition
                className="grid items-center w-full h-full"
                style={{
                  padding: "1.25rem",
                  backgroundColor: project.accentColor,
                  color: "var(--cream)",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Doner, Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.45rem",
                      lineHeight: "1.6rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {project.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Switzer, Arial, sans-serif",
                      fontWeight: 500,
                      fontSize: "0.7rem",
                      opacity: 0.7,
                    }}
                  >
                    {project.location}
                  </div>
                </div>

                <div style={{ width: "12rem", height: "5rem", opacity: 0.4 }}>
                  <MsMonogram />
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <div
                    className="flex items-center gap-[0.5rem]"
                    style={{ pointerEvents: "auto" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 13L13 1M13 1H3M13 1V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div
                      className="capitalize"
                      style={{
                        fontFamily: "Switzer, Arial, sans-serif",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        opacity: 0.7,
                      }}
                    >
                      {project.category}
                    </div>
                    <div
                      style={{
                        fontFamily: "Switzer, Arial, sans-serif",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        opacity: 0.7,
                      }}
                    >
                      {project.year}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
