"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

const TRAIL_URLS = [
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418e63d33b54d21e6c27_1.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418e96b368a7f2581961_2.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418e3c6fe88a6d224def_3.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418e25bc572725a8cea1_4.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418f4ae806dd494fe1f7_5.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418eeb31262df238f396_6.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418f1d7e1c9e6908529f_7.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418e01546f1d03388120_8.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418f9bd7f470dd12074d_9.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418f4ae806dd494fe20e_10.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418fb7a843884e0321a3_11.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418fbfe7403bf78e7fa6_12.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418f6dc2e7d24de69584_13.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418fd6206a1f99cfd5d0_14.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418ffb74284175cbba5d_15.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418f864f3e68ffcde83f_16.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418f16bdcc4d2250e941_17.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418fb7a843884e0321ba_18.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b41905d77cd9bfa4df916_19.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b41904ab6bfd85002593a_20.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b418fad6f015230005458_21.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b419042ef308da7167bb5_22.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b41901e1d3064cb6aed1a_23.avif",
  "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/696b419063d33b54d21e6c3f_24.avif",
];

const ITEM_SIZE = 216;
const DISTANCE_THRESHOLD = 40;

export default function MouseTrail() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const handleMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < DISTANCE_THRESHOLD) return;

    lastPosRef.current = { x: e.clientX, y: e.clientY };
    const idx = indexRef.current % TRAIL_URLS.length;
    indexRef.current++;

    const item = itemRefs.current[idx];
    if (!item) return;

    gsap.killTweensOf(item);
    gsap.set(item, {
      x: e.clientX - ITEM_SIZE / 2,
      y: e.clientY - ITEM_SIZE / 2,
      scale: 1,
      opacity: 1,
      zIndex: indexRef.current,
    });

    gsap.to(item, {
      opacity: 0,
      scale: 0.85,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.05,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 11,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {TRAIL_URLS.map((src, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            borderRadius: 4.5,
            overflow: "hidden",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}
