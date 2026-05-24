import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { worksData } from "../data/works";
import { projectContent } from "../data/projectContent";
import { SectionRenderer } from "../components/portfolio/ProjectSections";

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find the matching project in our data
  const workIndex = worksData.findIndex((w) => w.id === slug);
  const work = worksData[workIndex];
  const content = slug ? projectContent[slug] : undefined;

  const prevWork = workIndex > 0 ? worksData[workIndex - 1] : null;
  const nextWork = workIndex < worksData.length - 1 ? worksData[workIndex + 1] : null;

  useEffect(() => {
    if (work) {
      document.title = `Phat Le Tuan - ${work.title}`;
    }
    window.scrollTo(0, 0);
    return () => {
      document.title = "Phat Le Tuan";
    };
  }, [work, slug]);

  // 404 fallback
  if (!work) {
    return (
      <div className="project-page">
        <div className="project-header-placeholder" />
        <div className="project-site-content" style={{ paddingTop: 60, textAlign: "center" }}>
          <h1 style={{ fontFamily: "Helvetica Neue, sans-serif", fontSize: 22, color: "#111" }}>
            Project not found
          </h1>
          <Link to="/work" style={{ color: "#111", fontSize: 14, marginTop: 20, display: "inline-block" }}>
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="project-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="project-header-placeholder" />

      <div className="project-site-content">
        {/* ── Project Title ─────────────────────────────────────── */}
        {/*
         * Displayed as a large centered H1 above all modules.
         * The original site shows this as a page-level <h1> separate from the
         * project-modules block. We render it from projectContent.title.
         */}
        <header className="project-page-header">
          <h1>{(content?.title ?? work.title).toUpperCase()}</h1>
        </header>

        {/* ── Project Modules ───────────────────────────────────── */}
        {/*
         * The first text module has paddingTop: 127px — this creates the large
         * editorial whitespace between the title and the YEAR/SOFTWARE/description.
         * We do NOT add any extra spacer; the original spacing is embedded in the data.
         */}
        <div className="project-modules">
          {content?.sections?.map((section, i) => (
            <SectionRenderer key={i} section={section} />
          ))}

          {/* Fallback: if no content yet, show the cover image */}
          {(!content || !content.sections || content.sections.length === 0) && (
            <div style={{ paddingTop: 40 }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden" }}>
                <img
                  src={work.imageSrc}
                  srcSet={work.imageSrcSet}
                  sizes="92vw"
                  alt={work.title}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <p style={{
                marginTop: 24,
                fontFamily: "Helvetica Neue, sans-serif",
                fontSize: 14,
                color: "#888",
                textAlign: "center",
              }}>
                Full project content coming soon.
              </p>
            </div>
          )}
        </div>

        {/* ── Project Navigation ─────────────────────────────── */}
        <nav className="project-nav" aria-label="Project navigation">
          <div>
            {prevWork && (
              <Link to={`/work/${prevWork.id}`} className="project-nav__link">
                ← {prevWork.title.toUpperCase()}
              </Link>
            )}
          </div>

          <Link to="/work" className="project-nav__link project-nav__all">
            All Work
          </Link>

          <div>
            {nextWork && (
              <Link to={`/work/${nextWork.id}`} className="project-nav__link">
                {nextWork.title.toUpperCase()} →
              </Link>
            )}
          </div>
        </nav>
      </div>
    </motion.div>
  );
}
