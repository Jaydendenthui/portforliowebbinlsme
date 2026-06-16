import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { worksData } from "../data/works";
import WorkCard from "../components/portfolio/WorkCard";

export default function Works() {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
      <div className="works-header-placeholder" />

      <div className="works-site-content">
        <main>
          <section className="project-covers" aria-label="Portfolio works">
            {worksData.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </section>
        </main>
      </div>

      <footer className="works-footer flex flex-col items-center justify-center gap-2 pt-16 pb-24 w-full">
        <Link
          to="/photography"
          className="text-black text-3xl md:text-4xl hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'Monotype Corsiva', cursive" }}
        >
          Photography
        </Link>
      </footer>

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