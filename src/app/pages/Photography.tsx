import { useEffect, useRef } from "react";
import { motion } from "motion/react";

// Dummy data for your photography slider. Replace these with your actual image paths.
const photographyWorks = [
  { id: 1, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800", alt: "Editorial portrait" },
  { id: 2, src: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&q=80&w=800", alt: "Fashion shoot" },
  { id: 3, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800", alt: "Nature landscape" },
  { id: 4, src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800", alt: "Dark moody aesthetic" },
  { id: 5, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800", alt: "Cinematic architecture" },
];

// 1. Moved layout array outside the component so it doesn't get re-created on every render
const layout = [
  { w: 180, h: 180, mt: 60 },
  { w: 160, h: 260, mt: 0 },
  { w: 300, h: 420, mt: 120 },
  { w: 220, h: 300, mt: 40 },
  { w: 520, h: 620, mt: 100 }, // BIG center block
  { w: 180, h: 260, mt: 20 },
  { w: 220, h: 300, mt: 80 },
  { w: 200, h: 200, mt: 0 },
  { w: 620, h: 320, mt: 140 }, // WIDE block
  { w: 260, h: 200, mt: 20 },
];

export default function Photography() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    document.title = "Phat Le Tuan - Photography";
    return () => {
      document.title = "Phat Le Tuan";
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const currentScrollY = window.scrollY;
      const threshold = 140; 

      if (e.deltaY > 0) {
        // --- SCROLLING DOWN ---
        if (currentScrollY >= threshold && el.scrollLeft < maxScrollLeft) {
          e.preventDefault(); 
          el.scrollLeft += e.deltaY; 
        }
      } else if (e.deltaY < 0) {
        // --- SCROLLING UP ---
        if (currentScrollY <= threshold && el.scrollLeft > 0) {
          e.preventDefault(); 
          el.scrollLeft += e.deltaY; 
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <motion.div
      className="photography-page bg-white min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Space for the fixed Navbar */}
      <div className="h-[150px] w-full shrink-0" />

      {/* Page Title */}
      <div className="w-full text-center mb-8 px-4 shrink-0">
        <h1 
          className="text-black text-5xl md:text-6xl"
          style={{ fontFamily: "'Monotype Corsiva', cursive" }}
        >
          Photography Gallery
        </h1>
      </div>

      {/* Horizontal Scrolling Photo Gallery */}
      <div 
        ref={scrollContainerRef}
        className="w-full py-10 overflow-x-auto scrollbar-hide flex-grow"
      >
        <div className="flex items-start gap-16 px-16 w-max">
          {photographyWorks.map((photo, index) => {
            const l = layout[index % layout.length];

            return (
              <div
                key={photo.id}
                className="flex-shrink-0 overflow-hidden transition-all duration-500 hover:scale-105"
                style={{
                  width: `${l.w}px`,
                  height: `${l.h}px`,
                  marginTop: `${l.mt}px`,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra spacing at the bottom */}
      <div className="h-[60vh] flex items-center justify-center bg-neutral-50 border-t border-gray-100">
        <p className="text-gray-400 italic">© Phat Le Tuan Portfolio</p>
      </div>

      {/* CSS to hide native scrollbars */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}