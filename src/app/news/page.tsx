"use client";

export default function NewsPage() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--cream)",
        padding: "10rem 2.5rem 5rem",
      }}
    >
      <div className="text-center">
        <h1
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "3.75rem",
            lineHeight: "0.9",
            marginBottom: "2rem",
          }}
        >
          News
        </h1>
        <p
          style={{
            fontFamily: "Switzer, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "1rem",
            lineHeight: "1.5",
            opacity: 0.6,
          }}
        >
          Bientôt disponible
        </p>
      </div>
    </div>
  );
}
