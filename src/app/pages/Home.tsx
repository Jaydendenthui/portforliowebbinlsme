import videoSrc from "../../imports/MOTION_PORTFOLIO.mp4";

export default function Home() {
  return (
    <div className="size-full relative text-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="relative z-10 size-full">
        {/* Lower Left Text Block */}
        <div 
          className="absolute bottom-12 left-12 max-w-4xl flex flex-col precision-alignment"
          style={{ fontFamily: "'Microsoft Yi Baiti', sans-serif" }}
        >
          {/* Line 1: Title (Keeps its distinct Monotype Corsiva script style) */}
          <h1 
            className="text-[58px] tracking-[-0.073em] text-black leading-[0.9]"
            style={{ fontFamily: "'Monotype Corsiva', 'Apple Chancery', cursive" }}
          >
            Bin aka Phat,
          </h1>
          
          {/* Line 2: Sub-headline (Uses a thin 0.3px stroke to keep Microsoft Yi Baiti delicate) */}
          <p 
            className="text-xl md:text-xl font-normal mt-4"
            style={{ WebkitTextStroke: "0.5px black" }}
          >
            is a Vietnamese-based Multimedia Designer
          </p>
          
          {/* Line 3: Skills Row (All on one line, mixed stroke styles using the thin 0.3px boundary) */}
          <p className="text-xl md:text-base text-black mt-6 leading-relaxed tracking-wide flex flex-wrap gap-x-1 items-center">
            <span>Specialize in</span>
            <span className="text-black" style={{ WebkitTextStroke: "0.5px black" }}>vecto-illustration,</span>
            <span className="text-black" style={{ WebkitTextStroke: "0.5px black" }}>graphic design,</span>
            <span className="text-black" style={{ WebkitTextStroke: "0.5px black" }}>motion graphic,</span>
            <span className="text-black" style={{ WebkitTextStroke: "0.5px black" }}>3D</span>
            <span>and</span>
            <span className="text-black" style={{ WebkitTextStroke: "0.5px black" }}>photo</span>
          </p>
        </div>
      </div>
    </div>
  );
}