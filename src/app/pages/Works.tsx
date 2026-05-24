import { useEffect } from "react";
import { motion } from "motion/react";
import { worksData } from "../data/works";
import WorkCard from "../components/portfolio/WorkCard";

/**
 * Pixel-accurate recreation of aroombybin.myportfolio.com/work
 *
 * Layout:
 *  - Fixed header placeholder (150px) to account for the sticky nav
 *  - .site-content wrapper: margin 4% on each side (92% width)
 *  - .project-covers: flex-wrap, 2 columns on desktop, 1 on mobile
 *  - Each card: width calc(50% - 2.5px), margin-right: 5px
 *  - Hover: light blue (#A3C8DD) overlay at 0.9 opacity + centered title/date
 *  - Back-to-top button fixed bottom-right (hidden on mobile)
 */
export default function Works() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Page-load animation via CSS class toggling (simulates original fade-in)
  useEffect(() => {
    document.title = "Phat Le Tuan - Work";
    return () => {
      document.title = "Phat Le Tuan";
    };
  }, []);

  return (
    <motion.div
      className="works-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Space for the fixed header */}
      <div className="works-header-placeholder" />

      {/* Main gallery grid */}
      <div className="works-site-content">
        <main>
          <section className="project-covers" aria-label="Portfolio works">
            {worksData.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </section>
        </main>
      </div>

      {/* Footer — same as original: "↑Back to Top" + "Adobe Portfolio" */}
      <footer className="works-footer">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
          ↑ Back to Top
        </a>
      </footer>

      {/* Fixed back-to-top button (only visible on desktop per original) */}
      <button
        className="back-to-top-fixed"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg
          className="icon-back-to-top"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </button>
    </motion.div>
  );
}
