"use client";

export default function MentionsLegalesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--cream)",
        padding: "10rem 2.5rem 5rem",
        maxWidth: "50rem",
      }}
    >
      <h1
        style={{
          fontFamily: "Doner, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "3.75rem",
          lineHeight: "0.9",
          marginBottom: "3rem",
        }}
      >
        Mentions légales
      </h1>

      <div
        style={{
          fontFamily: "Switzer, Arial, sans-serif",
          fontWeight: 500,
          fontSize: "0.9rem",
          lineHeight: "1.6",
        }}
      >
        <h2
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          Éditeur du site
        </h2>
        <p>
          MERSI Architecture & Design d&apos;intérieur
          <br />
          Paris, France
        </p>

        <h2
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          Hébergement
        </h2>
        <p>Vercel Inc.</p>

        <h2
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          Conception du site
        </h2>
        <p>FLOT NOIR</p>

        <h2
          style={{
            fontFamily: "Doner, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          Propriété intellectuelle
        </h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos)
          est protégé par le droit d&apos;auteur. Toute reproduction, même
          partielle, est interdite sans autorisation préalable.
        </p>
      </div>
    </div>
  );
}
