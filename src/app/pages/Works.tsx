import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import { motion } from "motion/react";
import { worksData } from "../data/works";
import WorkCard from "../components/portfolio/WorkCard";

/**
 * Layout:
 * - Fixed header placeholder (150px) to account for the sticky nav
 * - .site-content wrapper: margin 4% on each side (92% width)
 * - .project-covers: flex-wrap, 2 columns on desktop, 1 on mobile
 * - Back-to-top button fixed bottom-right
 */
export default function Works() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Reverted to standard window scrolling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Phat Le Tuan - Work";
    
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScrollVisibility);
    return () => {
      document.title = "Phat Le Tuan";
      window.removeEventListener("scroll", handleScrollVisibility);
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

      {/* Main gallery grid (Standard layout, no snapping/fading) */}
      <div className="works-site-content">
        <main>
          <section className="project-covers" aria-label="Portfolio works">
            {worksData.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </section>
        </main>
      </div>

      {/* Footer — Styled with Monotype Corsiva and linked to Photography */}
      <footer className="works-footer flex flex-col items-center justify-center gap-2 pt-16 pb-24 w-full">
        <Link
          to="/photography"
          className="text-black text-3xl md:text-4xl hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'Monotype Corsiva', cursive" }}
        >
          Photography
        </Link>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); scrollToTop(); }}
          className="text-black text-3xl md:text-4xl hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'Monotype Corsiva', cursive" }}
        >
          Illustrations
        </a>
      </footer>

      {/* Fixed back-to-top button */}
      <motion.button
        className="back-to-top-fixed"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        initial={{ opacity: 0, scale: 0.8, pointerEvents: "none" }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <svg
          className="icon-back-to-top"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </motion.button>
    </motion.div>
  );
}