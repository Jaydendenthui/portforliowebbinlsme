import { useState } from "react";
import videoSrc from "../imports/MOTION_PORTFOLIO.mp4";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="size-full">
      {currentPage === "home" && (
        <div className="size-full relative text-white">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          <div className="relative z-10">
            <button
              className="absolute top-8 left-8 px-8 py-4 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              onClick={() => setCurrentPage("home")}
            >
              Logo
            </button>

            <nav className="absolute top-8 right-8 flex gap-8">
              <button
                className="px-8 py-4 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                Works
              </button>
              <button
                className="px-8 py-4 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                onClick={() => setCurrentPage("home")}
              >
                About
              </button>
            </nav>

            <p className="absolute bottom-8 left-8 text-white max-w-md">
              Specialize in vecto-illustration, graphic design, motion graphic, 3D and photo
            </p>
          </div>
        </div>
      )}

      {currentPage === "works" && (
        <div className="size-full bg-white relative">
          <button
            className="absolute top-8 left-8 px-8 py-4 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors border-2 border-black"
            onClick={() => setCurrentPage("home")}
          >
            Logo
          </button>

          <nav className="absolute top-8 right-8 flex gap-8">
            <button
              className="px-8 py-4 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors border-2 border-black"
              onClick={openWorksPage}
            >
              Works
            </button>
            <button
              className="px-8 py-4 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors border-2 border-black"
              onClick={() => setCurrentPage("home")}
            >
              About
            </button>
          </nav>

          <div className="size-full flex items-center justify-center">
            <h1 className="text-6xl text-slate-900">Works Page</h1>
          </div>
        </div>
      )}
    </div>
  );
}