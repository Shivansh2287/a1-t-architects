"use client";

import { useEffect, useRef } from "react";

export default function CurtainTransition() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[data-transition]");
      if (!link) return;

      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;

      const left = leftRef.current;
      const right = rightRef.current;
      if (!left || !right) return;

      left.style.height = "100%";
      right.style.height = "100%";

      setTimeout(() => {
        window.location.href = href;
      }, 600);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 flex"
      style={{ zIndex: 998 }}
    >
      <div
        ref={leftRef}
        className="absolute left-0 bottom-0 w-1/2"
        style={{
          height: "0%",
          backgroundColor: "var(--off-black)",
          transition: "height 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      <div
        ref={rightRef}
        className="absolute right-0 top-0 w-1/2"
        style={{
          height: "0%",
          backgroundColor: "var(--off-black)",
          transition: "height 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
    </div>
  );
}
