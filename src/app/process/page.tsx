"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HorizontalScroll from "@/components/HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Rencontre",
    desc: "Première prise de contact pour comprendre vos besoins, vos envies et votre mode de vie.",
    img: "/assets/process/step-01.webp",
  },
  {
    num: "02",
    title: "Étude",
    desc: "Analyse du lieu, prise de mesures et étude des contraintes techniques.",
    img: "/assets/process/step-02.webp",
  },
  {
    num: "03",
    title: "Conception",
    desc: "Élaboration des plans, choix des matériaux et création d'ambiances sur-mesure.",
    img: "/assets/process/step-03.webp",
  },
  {
    num: "04",
    title: "Visualisation",
    desc: "Présentations 3D réalistes pour projeter l'espace avant sa réalisation.",
    img: "/assets/process/step-04.webp",
  },
  {
    num: "05",
    title: "Consultation",
    desc: "Sélection des artisans et entreprises, consultation des devis.",
    img: "/assets/process/step-05.webp",
  },
  {
    num: "06",
    title: "Suivi",
    desc: "Coordination et suivi de chantier pour garantir la qualité d'exécution.",
    img: "/assets/process/step-06.webp",
  },
  {
    num: "07",
    title: "Livraison",
    desc: "Réception du projet finalisé, prêt à être habité.",
    img: "/assets/process/step-07.webp",
  },
];

const PARCOURS = [
  {
    title: "Essentiel",
    desc: "Accompagnement sur les grandes lignes de votre projet : plans, matériaux et ambiance générale.",
    img: "/assets/process/parcours-01.webp",
  },
  {
    title: "Complet",
    desc: "Prise en charge complète du projet, de la conception à la livraison, incluant le suivi de chantier.",
    img: "/assets/process/parcours-02.webp",
  },
  {
    title: "Premium",
    desc: "Service sur-mesure avec décoration, mobilier et mise en scène complète de votre intérieur.",
    img: "/assets/process/parcours-03.webp",
  },
];

export default function ProcessPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }

      stepsRef.current.forEach((el) => {
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

  return (
    <div style={{ backgroundColor: "var(--cream)" }}>
      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{
          minHeight: "100vh",
          padding: "10rem 2.5rem 5rem",
        }}
      >
        <div
          className="uppercase mb-[2rem]"
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
            opacity: 0.6,
          }}
        >
          Notre approche
        </div>
        <h1
          ref={titleRef}
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "8.125rem",
            lineHeight: "0.9",
          }}
        >
          Process
        </h1>
      </section>

      {/* Steps -- Horizontal Scroll */}
      <HorizontalScroll>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="flex-shrink-0 flex flex-col md:flex-row h-full"
            style={{ width: "100vw" }}
          >
            {/* Image half */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
              <img
                src={step.img}
                alt={step.title}
                className="w-full h-full"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Text half */}
            <div
              className="w-full md:w-1/2 flex flex-col justify-center"
              style={{ padding: "2.5rem 5rem" }}
            >
              <div
                className="mb-[1rem]"
                style={{
                  fontFamily: "Doner, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "6rem",
                  lineHeight: "1",
                  opacity: 0.1,
                }}
              >
                {step.num}
              </div>
              <h2
                style={{
                  fontFamily: "Doner, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "2.5rem",
                  lineHeight: "1",
                  marginBottom: "1.5rem",
                }}
              >
                {step.title}
              </h2>
              <p
                style={{
                  fontFamily: "Switzer, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  maxWidth: "28rem",
                  opacity: 0.7,
                }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {/* Parcours Section */}
      <section style={{ padding: "7.5rem 2.5rem" }}>
        <div
          className="text-center mb-[5rem]"
          ref={(el) => {
            stepsRef.current[0] = el;
          }}
        >
          <div
            className="uppercase mb-[1.5rem]"
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
              opacity: 0.6,
            }}
          >
            Nos formules
          </div>
          <h2
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "3.75rem",
              lineHeight: "0.9",
            }}
          >
            Parcours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.5rem]">
          {PARCOURS.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                stepsRef.current[i + 1] = el;
              }}
            >
              <div
                className="overflow-hidden mb-[1.5rem]"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "Doner, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  lineHeight: "1.2",
                  marginBottom: "0.75rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "Switzer, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  opacity: 0.7,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-[2.5rem]"
        style={{ padding: "0 2.5rem 7.5rem" }}
      >
        <div
          ref={(el) => {
            stepsRef.current[4] = el;
          }}
        >
          <div
            className="overflow-hidden mb-[1.5rem]"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src="/assets/process/deliverable-01.webp"
              alt="Livrables"
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div
          ref={(el) => {
            stepsRef.current[5] = el;
          }}
        >
          <div
            className="overflow-hidden mb-[1.5rem]"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src="/assets/process/deliverable-02.webp"
              alt="Livrables"
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Feature Image */}
      <section
        ref={(el) => {
          stepsRef.current[6] = el;
        }}
        className="w-full overflow-hidden"
        style={{ aspectRatio: "21/9" }}
      >
        <img
          src="/assets/process/tonnemani-feature.webp"
          alt="Tonnemani"
          className="w-full h-full"
          style={{ objectFit: "cover" }}
        />
      </section>

      {/* CTA */}
      <section
        className="flex flex-col md:flex-row items-center justify-between"
        style={{
          padding: "7.5rem 2.5rem",
          gap: "2.5rem",
        }}
      >
        <div>
          <img
            src="/assets/process/ms-end.webp"
            alt="MS"
            style={{ width: "5rem" }}
          />
        </div>
        <div style={{ maxWidth: "40rem" }}>
          <p
            style={{
              fontFamily: "Switzer, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            Chaque projet est unique. Contactez-nous pour discuter de vos
            envies et définir ensemble le parcours le plus adapté à votre
            projet.
          </p>
        </div>
      </section>
    </div>
  );
}
