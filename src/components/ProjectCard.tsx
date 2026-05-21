"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      data-transition
      className="group block overflow-hidden"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={project.cover}
          alt={project.name}
          className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className="mt-[1rem] flex items-baseline justify-between"
        style={{
          fontFamily: "Doner, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "1.25rem",
          lineHeight: "1.375rem",
        }}
      >
        <span>{project.name}</span>
        <span
          className="uppercase"
          style={{
            fontFamily: "Switzer, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "0.625rem",
            letterSpacing: "0.03rem",
            opacity: 0.6,
          }}
        >
          {project.category}
        </span>
      </div>
    </Link>
  );
}
