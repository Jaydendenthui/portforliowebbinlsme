/**
 * Reusable section-level components for project detail pages.
 * Each component maps 1:1 to a `project-module` type from the original site.
 */

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────────────────────── */
export interface BaseSection {
  paddingTop?: number;
  paddingBottom?: number;
}

export interface TextSection extends BaseSection {
  type: "text";
  html: string;
}

export interface ImageSection extends BaseSection {
  type: "image";
  src: string;
  srcset?: string;
  sizes?: string;
  maxWidth?: number;
}

export interface GridImage {
  src: string;
  srcset?: string;
  aspectPadding: number; // padding-bottom percentage
  flexGrow: number;      // proportional width
}

export interface ImageGridSection extends BaseSection {
  type: "image-grid";
  images: GridImage[];
}

export interface VideoSection extends BaseSection {
  type: "video";
  iframeSrc: string;
  maxWidth?: number;
  aspectPadding?: number; 
}

export interface TreeSection extends BaseSection {
  type: "tree";
  columns: ProjectSection[][];
}

export type ProjectSection =
  | TextSection
  | ImageSection
  | ImageGridSection
  | VideoSection
  | TreeSection;

/* ─────────────────────────────────────────────────────────────
 * Lazy image hook (IntersectionObserver)
 * ───────────────────────────────────────────────────────────── */
function useLazyLoad() {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const src = el.dataset.src;
          const srcset = el.dataset.srcset;
          if (src) el.src = src;
          if (srcset) el.srcset = srcset;
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, loaded, setLoaded };
}

/* ─────────────────────────────────────────────────────────────
 * TextModule
 * ───────────────────────────────────────────────────────────── */
export function TextModule({ section }: { section: TextSection }) {
  return (
    <div
      className="module-text"
      dangerouslySetInnerHTML={{ __html: section.html }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 * ImageModule — single full/constrained image
 * ───────────────────────────────────────────────────────────── */
export function ImageModule({ section }: { section: ImageSection }) {
  const { ref, loaded, setLoaded } = useLazyLoad();

  return (
    <div
      className="module-image"
      style={{ maxWidth: section.maxWidth ? `${section.maxWidth}px` : "100%" }}
    >
      <img
        ref={ref}
        data-src={section.src}
        data-srcset={section.srcset}
        sizes={section.sizes ?? "(max-width: 540px) 100vw, 92vw"}
        alt=""
        loading="lazy"
        className={loaded ? "loaded" : "loading"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ImageGridModule — flex proportional grid (media_collection)
 * ───────────────────────────────────────────────────────────── */
function GridItem({ image }: { image: GridImage }) {
  const { ref, loaded, setLoaded } = useLazyLoad();

  return (
    <div
      className="grid-image-item"
      style={{ flexGrow: image.flexGrow, minWidth: `${Math.min(image.flexGrow / 5, 200)}px` }}
    >
      <span className="grid-image-item__filler" style={{ display: "block", paddingBottom: `${image.aspectPadding}%` }} />
      <img
        ref={ref}
        data-src={image.src}
        data-srcset={image.srcset}
        sizes="(max-width: 540px) 100vw, 50vw"
        alt=""
        loading="lazy"
        className={loaded ? "loaded" : "loading"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function ImageGridModule({ section }: { section: ImageGridSection }) {
  return (
    <div className="module-image-grid">
      {section.images.map((img, i) => (
        <GridItem key={i} image={img} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * VideoModule — Adobe CC / Vimeo / YouTube iframe embed
 * ───────────────────────────────────────────────────────────── */
export function VideoModule({ section }: { section: VideoSection }) {
  const aspect = section.aspectPadding ?? 56.25;

  return (
    <div
      className="module-video"
      style={{ maxWidth: section.maxWidth ? `${section.maxWidth}px` : "100%", margin: "0 auto" }}
    >
      <div className="module-video__aspect" style={{ paddingBottom: `${aspect}%` }}>
        <iframe
          title="Video Player"
          src={section.iframeSrc}
          allowFullScreen
          allow="autoplay; fullscreen"
          frameBorder={0}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * TreeModule — side-by-side column layout
 * ───────────────────────────────────────────────────────────── */
export function TreeModule({ section }: { section: TreeSection }) {
  return (
    <div className="module-tree">
      {section.columns.map((col, ci) => (
        <div key={ci} className="module-tree__column">
          {col.map((s, si) => (
            <SectionRenderer key={si} section={s} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * SectionRenderer — dispatch to the right component
 * Each wrapper div applies the exact inline padding from the original site.
 * paddingTop on the first text module is 127px — this IS the large whitespace
 * gap between the title and the YEAR/SOFTWARE/description block.
 * ───────────────────────────────────────────────────────────── */
export function SectionRenderer({ section }: { section: ProjectSection }) {
  const pt = section.paddingTop ?? 0;
  const pb = section.paddingBottom ?? 0;

  const inner = (() => {
    switch (section.type) {
      case "text":       return <TextModule section={section} />;
      case "image":      return <ImageModule section={section} />;
      case "image-grid": return <ImageGridModule section={section} />;
      case "video":      return <VideoModule section={section} />;
      case "tree":       return <TreeModule section={section} />;
      default:           return null;
    }
  })();

  if (inner === null) return null;

  return (
    <div
      style={{
        paddingTop: pt > 0 ? pt : undefined,
        paddingBottom: pb > 0 ? pb : undefined,
      }}
    >
      {inner}
    </div>
  );
}

