import videoSrc from "../../imports/MOTION_PORTFOLIO.mp4";

export default function Home() {
  return (
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

      <div className="relative z-10 size-full">
        <p className="absolute bottom-8 left-8 text-white max-w-md">
          Specialize in vecto-illustration, graphic design, motion graphic, 3D and photo
        </p>
      </div>
    </div>
  );
}
