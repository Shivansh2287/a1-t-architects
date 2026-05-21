"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll("[data-reveal]"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "var(--cream)",
        minHeight: "100vh",
        padding: "10rem 2.5rem 5rem",
      }}
    >
      <div
        ref={formRef}
        className="flex flex-col md:flex-row gap-[5rem] md:gap-[10rem]"
      >
        {/* Left: Title + Contact Info */}
        <div style={{ flex: "0 0 auto" }}>
          <h1
            data-reveal
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "3.75rem",
              lineHeight: "0.9",
              marginBottom: "3rem",
            }}
          >
            Contact
          </h1>

          <div data-reveal className="mb-[2rem]">
            <div
              className="uppercase mb-[0.5rem]"
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "0.5rem",
                letterSpacing: "0.1em",
                opacity: 0.5,
              }}
            >
              Adresse
            </div>
            <p
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              Studio MERSI
              <br />
              Paris, France
            </p>
          </div>

          <div data-reveal className="mb-[2rem]">
            <div
              className="uppercase mb-[0.5rem]"
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "0.5rem",
                letterSpacing: "0.1em",
                opacity: 0.5,
              }}
            >
              Email
            </div>
            <a
              href="mailto:hello@mersi-architecture.com"
              className="transition-opacity hover:opacity-60"
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                borderBottom: "1px solid var(--off-black)",
                paddingBottom: "0.15rem",
              }}
            >
              hello@mersi-architecture.com
            </a>
          </div>

          <div data-reveal>
            <div
              className="uppercase mb-[0.5rem]"
              style={{
                fontFamily: "Doner, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "0.5rem",
                letterSpacing: "0.1em",
                opacity: 0.5,
              }}
            >
              Téléphone
            </div>
            <a
              href="tel:+33100000000"
              className="transition-opacity hover:opacity-60"
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                borderBottom: "1px solid var(--off-black)",
                paddingBottom: "0.15rem",
              }}
            >
              +33 1 00 00 00 00
            </a>
          </div>
        </div>

        {/* Right: Newsletter Form */}
        <div style={{ flex: 1, maxWidth: "40rem" }}>
          <div
            data-reveal
            className="uppercase mb-[2rem]"
            style={{
              fontFamily: "Doner, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
              opacity: 0.5,
            }}
          >
            Newsletter
          </div>

          <form
            data-reveal
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[2rem]"
          >
            {[
              { label: "Nom", placeholder: "Votre nom", type: "text" },
              { label: "Email", placeholder: "Votre email", type: "email" },
              { label: "Téléphone", placeholder: "Votre téléphone", type: "tel" },
            ].map((field) => (
              <div key={field.label}>
                <label
                  className="block uppercase mb-[0.5rem]"
                  style={{
                    fontFamily: "Doner, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.5rem",
                    letterSpacing: "0.1em",
                    opacity: 0.5,
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent outline-none"
                  style={{
                    fontFamily: "Doner, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.5rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid rgba(26,26,26,0.2)",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderBottomColor = "var(--off-black)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = "rgba(26,26,26,0.2)")
                  }
                />
              </div>
            ))}

            <div>
              <label
                className="block uppercase mb-[0.5rem]"
                style={{
                  fontFamily: "Doner, Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.5rem",
                  letterSpacing: "0.1em",
                  opacity: 0.5,
                }}
              >
                Message
              </label>
              <textarea
                placeholder="Décrivez votre projet..."
                rows={4}
                className="w-full bg-transparent outline-none resize-none"
                style={{
                  fontFamily: "Doner, Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.5rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(26,26,26,0.2)",
                  transition: "border-color 0.3s",
                }}
              />
            </div>

            <button
              type="submit"
              className="self-start uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05rem",
                borderBottom: "1px solid var(--off-black)",
                paddingBottom: "0.25rem",
                background: "none",
                border: "none",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "var(--off-black)",
                color: "var(--off-black)",
              }}
            >
              Envoyer →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
