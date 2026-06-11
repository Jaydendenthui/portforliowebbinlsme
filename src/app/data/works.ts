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
    imageSrc: "/works/lusine-fb/cover.jpg",
  },
  {
    id: "kuckii-83",
    title: "KUCKII 8/3",
    date: "2026",
    imageSrc: "/works/kuckii-83/cover.jpg",
  },
  {
    id: "social-post-graphic-design",
    title: "RUTO & KAITEN | GRAPHIC DESIGN",
    date: "2024",
    imageSrc: "/works/social-post-graphic-design/cover.jpg",
  },
  {
    id: "ccum-9-social-post",
    title: "CCUM 9 | 2D MOTION GRAPHIC",
    date: "2023",
    imageSrc: "/works/ccum-9-social-post/cover.jpg",
  },
  {
    id: "concert-piece-2d-motion-graphic",
    title: "CONCERT PIECE | 2D MOTION GRAPHIC",
    date: "2023",
    imageSrc: "/works/concert-piece-2d-motion-graphic/cover.jpg",
  },
  {
    id: "pride-week-2023-student-council",
    title: "PRIDE WEEK 2023 | GRAPHIC DESIGN",
    date: "2023",
    imageSrc: "/works/pride-week-2023-student-council/cover.jpg",
  },
  {
    id: "3d",
    title: "VJ | 3D",
    date: "2023",
    imageSrc: "/works/3d/cover.jpg",
  },
  {
    id: "luna-dao-83-fanart",
    title: "LUNA DAO ARTWORK | 3D ANIMATION",
    date: "2024",
    imageSrc: "/works/luna-dao-83-fanart/cover.jpg",
  },
  {
    id: "nuong-3d-design",
    title: "NUONG | 3D DESIGN",
    date: "2026",
    imageSrc: "/works/nuong-3d-design/cover.jpg",
  },
  {
    id: "wells-mi-living-booth-3d-design",
    title: "WELLS MI-LIVING BOOTH | 3D DESIGN",
    date: "2026",
    imageSrc: "/works/wells-mi-living-booth-3d-design/cover.jpg",
  },
  {
    id: "the-red-thread-of-fate",
    title: "THE RED THREAD OF FATE | PHOTOGRAPHY",
    date: "2024",
    imageSrc: "/works/the-red-thread-of-fate/cover.jpg",
  },
  {
    id: "namo-fb-photography",
    title: "NAMO F&B | PHOTOGRAPHY",
    date: "2025",
    imageSrc: "/works/namo-fb-photography/cover.jpg",
  },
  {
    id: "lets-get-to-cook",
    title: "LET'S GET TO COOK | PHOTOGRAPHY",
    date: "2024",
    imageSrc: "/works/lets-get-to-cook/cover.jpg",
  },
  {
    id: "sunset-the-light-is-turning",
    title: "SUNSET, THE LIGHT IS TURNING | PHOTOGRAPHY",
    date: "2024",
    imageSrc: "/works/sunset-the-light-is-turning/cover.jpg",
  },
];