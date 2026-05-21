"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - track.offsetWidth;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      gsap.to(track, {
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
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{
          flexWrap: "nowrap",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
