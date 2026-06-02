import { useEffect } from "react";
import { motion } from "motion/react";

// Dummy data for your photography slider. Replace these with your actual image paths.
const photographyWorks = [
  { id: 1, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800", alt: "Editorial portrait" },
  { id: 2, src: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&q=80&w=800", alt: "Fashion shoot" },
  { id: 3, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800", alt: "Nature landscape" },
  { id: 4, src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800", alt: "Dark moody aesthetic" },
  { id: 5, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800", alt: "Cinematic architecture" },
];

export default function Photography() {
  useEffect(() => {
    document.title = "Phat Le Tuan - Photography";
    return () => {
      document.title = "Phat Le Tuan";
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
      {/* 1. Space for the fixed Navbar (keeps content from hiding under the header) */}
      <div className="h-[150px] w-full shrink-0" />

      {/* 2. Page Title matching your recent Monotype Corsiva styling */}
      <div className="w-full text-center mb-8 px-4">
        <h1 
          className="text-black text-5xl md:text-6xl"
          style={{ fontFamily: "'Monotype Corsiva', cursive" }}
        >
          Photography Gallery
        </h1>
      </div>

      {/* 3. Infinite Scrolling Photo Gallery */}
      <div className="relative flex overflow-hidden w-full py-10 group">
        
        {/* Track 1 */}
        <div className="flex gap-4 pr-4 animate-loop-scroll group-hover:[animation-play-state:paused]">
          {photographyWorks.map((photo) => (
            <div 
              key={photo.id} 
              className="w-[280px] h-[400px] md:w-[450px] md:h-[600px] flex-shrink-0 overflow-hidden"
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Track 2 (Exact Duplicate needed to make the infinite loop seamless) */}
        <div 
          className="flex gap-4 pr-4 animate-loop-scroll group-hover:[animation-play-state:paused]" 
          aria-hidden="true"
        >
          {photographyWorks.map((photo) => (
            <div 
              key={`${photo.id}-duplicate`} 
              className="w-[280px] h-[400px] md:w-[450px] md:h-[600px] flex-shrink-0 overflow-hidden"
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>

      {/* CSS Keyframes injected directly to handle the perfect hardware-accelerated scroll loop */}
      <style>{`
        @keyframes loop-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-loop-scroll {
          animation: loop-scroll 35s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}