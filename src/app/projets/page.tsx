"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/ProjectCard";
import { allProjects, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["Tous", "Résidentiel", "Retail", "Hospitality"] as const;

function categoryMatch(
  project: Project,
  filter: (typeof CATEGORIES)[number]
): boolean {
  if (filter === "Tous") return true;
  const map: Record<string, string> = {
    Résidentiel: "residentiel",
    Retail: "retail",
    Hospitality: "hospitality",
  };
  return project.category === map[filter];
}

export default function ProjetsPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof CATEGORIES)[number]>("Tous");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = allProjects.filter((p) => categoryMatch(p, activeFilter));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "10rem 2.5rem 5rem",
        backgroundColor: "var(--cream)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[2rem] mb-[4rem]">
        <h1
          ref={titleRef}
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "3.75rem",
            lineHeight: "0.9",
            color: "var(--off-black)",
          }}
        >
          Projets
        </h1>

        <div className="flex items-center gap-[1.5rem]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="uppercase transition-opacity cursor-pointer"
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                lineHeight: "0.825rem",
                letterSpacing: "0.02rem",
                opacity: activeFilter === cat ? 1 : 0.4,
                borderBottom:
                  activeFilter === cat ? "1px solid var(--off-black)" : "none",
                paddingBottom: "0.25rem",
                background: "none",
                border: "none",
                color: "inherit",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid gap-[2.5rem]"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
        }}
      >
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
