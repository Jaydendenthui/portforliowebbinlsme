export interface Work {
  id: string;          // URL slug → /works/lusine-fb
  title: string;
  date: string;
  imageSrc: string;    // local path: /works/lusine-fb/cover.jpg
  imageSrcLow?: string; // tiny blur-up placeholder (optional)
  imageSrcSet?: string; // responsive sizes (optional)
  imageSizes?: string;
}

export const worksData: Work[] = [
  {
    id: "tiembanh",
    title: "Tiem Banh Hanh Phuc | MOTION GRAPHIC - GRAPHIC DESIGN - EDITOR",
    date: "2026",
    imageSrc: "/works/tiembanh/cover.jpg",
  },
  {
    id: "lusine-fb",
    title: "Lusine | MOTION GRAPHIC - PHOTOGRAPHY - GRAPHIC DESIGN",
    date: "2025",
    imageSrc: "https://res.cloudinary.com/drith9etg/image/upload/v1781390819/cover_rd6qo9.jpg",
  },
];