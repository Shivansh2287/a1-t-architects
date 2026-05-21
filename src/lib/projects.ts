export interface GalleryImage {
  src: string;
  width: "sm" | "md" | "lg";
}

export interface Project {
  name: string;
  slug: string;
  category: "residentiel" | "retail" | "hospitality";
  accentColor: string;
  homeLeft: string;
  homeRight: string;
  cover: string;
  location?: string;
  year?: string;
  area?: string;
  description?: string;
  tagline?: string;
  services?: string[];
  gallery?: GalleryImage[];
}

const DEFAULT_SERVICES = [
  "Architecture d'intérieur",
  "Conception architecturale",
  "Pilotage de chantier",
  "Menuiserie sur-mesure",
  "Mobilier et décoration",
];

function buildGallery(slug: string, coverSrc: string, leftSrc: string, rightSrc: string): GalleryImage[] {
  return [
    { src: leftSrc || coverSrc, width: "sm" },
    { src: rightSrc || coverSrc, width: "sm" },
    { src: coverSrc, width: "lg" },
    { src: leftSrc || coverSrc, width: "md" },
    { src: rightSrc || coverSrc, width: "sm" },
    { src: coverSrc, width: "lg" },
    { src: leftSrc || coverSrc, width: "sm" },
    { src: rightSrc || coverSrc, width: "sm" },
    { src: coverSrc, width: "md" },
    { src: leftSrc || coverSrc, width: "md" },
    { src: rightSrc || coverSrc, width: "sm" },
    { src: coverSrc, width: "sm" },
  ];
}

export const projects: Project[] = [
  {
    name: "Naya",
    slug: "naya",
    category: "residentiel",
    accentColor: "hsla(16, 58.87%, 42.88%, 1)",
    homeLeft: "/assets/home/naya-left.webp",
    homeRight: "/assets/home/naya-right.webp",
    cover: "/assets/projets/naya-cover.webp",
    location: "Levallois",
    year: "2025",
    area: "110 m²",
    tagline: "Intérieur singulier et intemporel",
    description:
      "Intérieur singulier aux tons chaleureux pour une atmosphère cosy et intemporel",
    services: DEFAULT_SERVICES,
    gallery: buildGallery("naya", "/assets/projets/naya-cover.webp", "/assets/home/naya-left.webp", "/assets/home/naya-right.webp"),
  },
  {
    name: "Maurice",
    slug: "maurice",
    category: "hospitality",
    accentColor: "#657b69",
    homeLeft: "/assets/home/maurice-left.webp",
    homeRight: "/assets/home/maurice-right.webp",
    cover: "/assets/projets/maurice-vh-cover.webp",
    location: "Paris 8",
    year: "2025",
    area: "85 m²",
    tagline: "Café parisien d'exception",
    description:
      "Un café parisien qui allie tradition et modernité dans un écrin de verdure",
    services: [
      "Architecture d'intérieur",
      "Conception architecturale",
      "Pilotage de chantier",
      "Menuiserie sur-mesure",
    ],
    gallery: buildGallery("maurice", "/assets/projets/maurice-vh-cover.webp", "/assets/home/maurice-left.webp", "/assets/home/maurice-right.webp"),
  },
  {
    name: "Berri",
    slug: "berri",
    category: "residentiel",
    accentColor: "#aaa798",
    homeLeft: "/assets/home/berri-left.webp",
    homeRight: "/assets/home/berri-right.webp",
    cover: "/assets/projets/berri-cover.webp",
    location: "Paris",
    year: "2024",
    area: "95 m²",
    tagline: "Élégance naturelle et lumineuse",
    description:
      "Un appartement baigné de lumière où les matériaux nobles dialoguent avec la modernité",
    services: DEFAULT_SERVICES,
    gallery: buildGallery("berri", "/assets/projets/berri-cover.webp", "/assets/home/berri-left.webp", "/assets/home/berri-right.webp"),
  },
  {
    name: "Cook",
    slug: "cook",
    category: "hospitality",
    accentColor: "#dc633f",
    homeLeft: "/assets/home/cook-left.webp",
    homeRight: "/assets/home/cook-right.webp",
    cover: "/assets/projets/cook-cover.webp",
    location: "Paris",
    year: "2024",
    area: "150 m²",
    tagline: "Gastronomie contemporaine",
    description:
      "Un restaurant contemporain pensé pour sublimer l'expérience gastronomique",
    services: [
      "Architecture d'intérieur",
      "Conception architecturale",
      "Pilotage de chantier",
      "Mobilier et décoration",
    ],
    gallery: buildGallery("cook", "/assets/projets/cook-cover.webp", "/assets/home/cook-left.webp", "/assets/home/cook-right.webp"),
  },
  {
    name: "Segur",
    slug: "segur",
    category: "residentiel",
    accentColor: "#918f7a",
    homeLeft: "/assets/home/segur-left.webp",
    homeRight: "/assets/home/segur-right.webp",
    cover: "/assets/projets/segur-cover.webp",
    location: "Paris",
    year: "2024",
    area: "110 m²",
    tagline: "Harmonie et sérénité",
    description:
      "Un intérieur où chaque détail participe à créer une atmosphère de sérénité absolue",
    services: DEFAULT_SERVICES,
    gallery: buildGallery("segur", "/assets/projets/segur-cover.webp", "/assets/home/segur-left.webp", "/assets/home/segur-right.webp"),
  },
  {
    name: "Tonnenami",
    slug: "tonnenami",
    category: "retail",
    accentColor: "#b3a696",
    homeLeft: "/assets/home/tonnenami-left.webp",
    homeRight: "/assets/home/tonnenami-right.webp",
    cover: "/assets/projets/tonnenami-cover.webp",
    location: "Paris",
    year: "2023",
    area: "200 m²",
    tagline: "Boutique raffinée",
    description:
      "Un espace retail qui célèbre l'artisanat et le savoir-faire français",
    services: [
      "Architecture d'intérieur",
      "Conception architecturale",
      "Pilotage de chantier",
    ],
    gallery: buildGallery("tonnenami", "/assets/projets/tonnenami-cover.webp", "/assets/home/tonnenami-left.webp", "/assets/home/tonnenami-right.webp"),
  },
  {
    name: "Aurélien Cohen",
    slug: "aurelien-cohen",
    category: "retail",
    accentColor: "#dc8b3f",
    homeLeft: "/assets/home/aurelien-left.webp",
    homeRight: "/assets/home/aurelien-right.webp",
    cover: "/assets/projets/aurelien-cover.webp",
    location: "Paris",
    year: "2024",
    area: "80 m²",
    tagline: "Espace créatif et chaleureux",
    description:
      "Un atelier-boutique qui reflète l'identité créative de son fondateur",
    services: DEFAULT_SERVICES,
    gallery: buildGallery("aurelien-cohen", "/assets/projets/aurelien-cover.webp", "/assets/home/aurelien-left.webp", "/assets/home/aurelien-right.webp"),
  },
  {
    name: "Atokym",
    slug: "atokym",
    category: "retail",
    accentColor: "#8b9ec1",
    homeLeft: "/assets/home/atokym-left.webp",
    homeRight: "/assets/home/atokym-right.webp",
    cover: "/assets/projets/atokym-cover.webp",
    location: "Paris",
    year: "2023",
    area: "130 m²",
    tagline: "Modernité épurée",
    description:
      "Un concept store minimaliste où chaque élément trouve sa place avec précision",
    services: DEFAULT_SERVICES,
    gallery: buildGallery("atokym", "/assets/projets/atokym-cover.webp", "/assets/home/atokym-left.webp", "/assets/home/atokym-right.webp"),
  },
  {
    name: "Paix",
    slug: "paix",
    category: "hospitality",
    accentColor: "#ccb598",
    homeLeft: "/assets/home/paix-left.webp",
    homeRight: "/assets/home/paix-right.webp",
    cover: "/assets/projets/paix-cover.webp",
    location: "Paris, Rue de la Paix",
    year: "2024",
    area: "180 m²",
    tagline: "Luxe discret et raffiné",
    description:
      "Un hôtel particulier transformé en havre de paix au cœur de Paris",
    services: DEFAULT_SERVICES,
    gallery: buildGallery("paix", "/assets/projets/paix-cover.webp", "/assets/home/paix-left.webp", "/assets/home/paix-right.webp"),
  },
];

export const allProjects: Project[] = [
  ...projects,
  {
    name: "Ubiko",
    slug: "ubiko",
    category: "retail",
    accentColor: "#aaa798",
    homeLeft: "",
    homeRight: "",
    cover: "/assets/projets/ubiko-cover.webp",
    location: "Paris",
    year: "2023",
    area: "160 m²",
    tagline: "Concept innovant",
    description: "Un espace retail innovant qui repense l'expérience client",
    services: DEFAULT_SERVICES,
  },
  {
    name: "Emyre",
    slug: "emyre",
    category: "residentiel",
    accentColor: "#b3a696",
    homeLeft: "",
    homeRight: "",
    cover: "/assets/projets/emyre-cover.webp",
    location: "Paris",
    year: "2023",
    area: "90 m²",
    tagline: "Douceur et caractère",
    description: "Un appartement qui allie douceur des matériaux et caractère affirmé",
    services: DEFAULT_SERVICES,
  },
  {
    name: "Elvy",
    slug: "elvy",
    category: "residentiel",
    accentColor: "#918f7a",
    homeLeft: "",
    homeRight: "",
    cover: "/assets/projets/elvy-cover.webp",
    location: "Paris",
    year: "2023",
    area: "75 m²",
    tagline: "Intimité contemporaine",
    description: "Un cocon contemporain pensé pour le bien-être au quotidien",
    services: DEFAULT_SERVICES,
  },
  {
    name: "Tokamy",
    slug: "tokamy",
    category: "residentiel",
    accentColor: "#b3a696",
    homeLeft: "",
    homeRight: "",
    cover: "/assets/projets/tokamy-cover.webp",
    location: "Paris",
    year: "2024",
    area: "140 m²",
    tagline: "Espace et lumière",
    description: "Un grand appartement où l'espace et la lumière sont les matériaux principaux",
    services: DEFAULT_SERVICES,
  },
];
