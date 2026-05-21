"use client";

import { useEffect, useRef, useState } from "react";

const TEXTURES = [
  "/assets/loader-texture-1.webp",
  "/assets/loader-texture-2.webp",
  "/assets/loader-texture-3.webp",
  "/assets/loader-texture-4.webp",
  "/assets/loader-texture-5.webp",
];

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [textureIndex, setTextureIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextureIndex((prev) => (prev + 1) % TEXTURES.length);
    }, 400);

    const dismiss = () => {
      clearInterval(interval);
      const el = containerRef.current;
      if (el) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      }
      setTimeout(() => setVisible(false), 700);
    };

    const timeout = setTimeout(dismiss, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center loader-container"
      style={{
        zIndex: 9999,
        backgroundColor: "var(--cream)",
        fontFamily: "Doner, Arial, sans-serif",
        fontWeight: 600,
        fontSize: "0.5rem",
        letterSpacing: "0.05rem",
        transition: "opacity 0.6s ease",
      }}
    >
      <style jsx>{`
        @keyframes loaderFadeOut {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        .loader-container {
          animation: loaderFadeOut 3s ease forwards;
        }
      `}</style>
      <div className="relative" style={{ width: 120, height: 80 }}>
        <svg
          viewBox="0 0 120 80"
          width="120"
          height="80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="ms-clip">
              <text
                x="60"
                y="55"
                textAnchor="middle"
                fontFamily="Doner, Arial, sans-serif"
                fontWeight="700"
                fontSize="60"
              >
                MS
              </text>
            </clipPath>
            <filter id="ms-shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="1" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g clipPath="url(#ms-clip)" filter="url(#ms-shadow)">
            <image
              href={TEXTURES[textureIndex]}
              x="0"
              y="0"
              width="120"
              height="80"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
      <div
        className="absolute bottom-[2rem]"
        style={{
          color: "var(--off-black)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Architecture &amp; Design
      </div>
    </div>
  );
}
