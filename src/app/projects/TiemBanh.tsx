import "./TiemBanh.css";
import logo from "../components/layout/LOGO.png";
import photo01 from "./photo-01.jpg";
import photo02 from "./photo-02.jpg";
import photo03 from "./photo-03.jpg";
import photo04 from "./photo-04.jpg";
import photo05 from "./photo-05.jpg";
import photo06 from "./photo-06.jpg";
import photo07 from "./photo-07.jpg";
import photo08 from "./photo-08.jpg";
import photo09 from "./photo-09.jpg";
import photo10 from "./photo-10.jpg";
import photo11 from "./photo-11.jpg";
import photo12 from "./photo-12.jpg";
import photo13 from "./photo-13.jpg";

// ── MarqueeRow (photos) ──────────────────────────────────────────────────────
function MarqueeRow({
  items,
  speed = 30,
  itemWidth = "240px",
  itemAspect = "1 / 1",
  reverse = false,
}: {
  items: string[];
  speed?: number;
  itemWidth?: string;
  itemAspect?: string;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-track">
      <div
        className="marquee-inner"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="marquee-item"
            style={{ width: itemWidth, aspectRatio: itemAspect }}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VideoRow (static, no scrolling) ─────────────────────────────────────────
function VideoRow({
  items,
  itemWidth = 480,
  itemAspect = "16 / 9",
}: {
  items: string[];
  itemWidth?: number;
  itemAspect?: string;
}) {
  return (
    <div className="video-row-container">
      {items.map((src, i) => (
        <div
          key={i}
          className="video-row-item"
          style={
            {
              "--item-width": `${itemWidth}px`,
              "--item-aspect": itemAspect,
            } as React.CSSProperties
          }
        >
          <video src={src} autoPlay muted loop playsInline />
        </div>
      ))}
    </div>
  );
}

// ── TiemBanh ─────────────────────────────────────────────────────────────────
export default function TiemBanh() {
  const photoRow1 = [photo05, photo06, photo07, photo08, photo09, photo10, photo11, photo12, photo13];

  const videoRow1 = ["/videos/video-01-h264.mp4", "/videos/video-02-h264.mp4", "/videos/video-03-h264.mp4"];
  const videoRow2 = ["/videos/video-04-h264.mp4", "/videos/video-05-h264.mp4"];
  const videoRow3 = ["/videos/video-00-h264.mp4", "/videos/video-06-h264.mp4"];
  const videoRow4 = ["/videos/video-08-h264.mp4", "/videos/video-07-h264.mp4"];

  const photoRow3 = [photo01, photo02, photo03, photo04];

  return (
    <div className="tiembanh">

      {/* ── INTRO ───────────────────────────────────────────────── */}
      <section className="tiembanh__intro">
        <img src={logo} alt="" aria-hidden="true" className="tiembanh__watermark" />

        <h1 className="tiembanh__title">Tiem Banh Hanh Phuc</h1>

        <div className="tiembanh__meta">
          <p><strong>Year:</strong> 2026</p>
          <p><strong>Software:</strong> Adobe Illustrator, Photoshop, After Effect, Lightroom</p>
        </div>

        <p className="tiembanh__desc">
          Over the past three months at L'Usine, a lifestyle brand that blends a concept store,
          café, and creative hub, I had the opportunity to contribute to their creative and marketing
          efforts. My main responsibilities included: Creating and designing social media posts to
          align with L'Usine's brand identity and seasonal campaigns. Planning and executing food
          photoshoots to highlight new menu items and promotional content. Designing POSM
          (Point of Sale Materials) such as posters and event flyers with thoughtful layout and
          typography. Recording and Editing videos, including highlight reels for events and
          content for social channels. Producing motion graphics for thumbnails to increase visual
          engagement and strengthen brand recognition.
        </p>
      </section>

      {/* ── MARQUEE PHOTO ROWS ──────────────────────────────────── */}
      <div className="marquee-wrapper">
        <MarqueeRow items={photoRow1} speed={35} itemWidth="220px" itemAspect="1 / 1" />
      </div>

      {/* ── STATIC VIDEO ROWS (rows 3–6) ────────────────────────── */}
      <VideoRow items={videoRow1} itemWidth={340} itemAspect="16 / 9" />
      <VideoRow items={videoRow2} itemWidth={480} itemAspect="16 / 10" />
      <VideoRow items={videoRow3} itemWidth={480} itemAspect="16 / 9" />
      <VideoRow items={videoRow4} itemWidth={480} itemAspect="16 / 9" />

      {/* ── MARQUEE PORTRAIT PHOTOS ─────────────────────────────── */}
      <div className="marquee-wrapper">
        <MarqueeRow items={photoRow3} speed={30} itemWidth="260px" itemAspect="3 / 4" />
      </div>

      {/* ── BOTTOM — 2 videos + caption ─────────────────────────── */}
      <section className="tiembanh__bottom">
        <video
          src="/videos/video-01-h264.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="tiembanh__bottom-video"
        />
        <video
          src="/videos/video-02-h264.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="tiembanh__bottom-video"
        />
        <aside className="tiembanh__bottom-caption">
          <p>
            A distinctive combination between Bún and TBHP,
            laughter, delicious cakes, and beautiful visuals.
          </p>
          <p>Photo by me</p>
          <p>Edit by me</p>
          <p>Design by me</p>
        </aside>
      </section>

      {/* ── BIG BANNER VIDEO ────────────────────────────────────── */}
      <section className="tiembanh__banner">
        <div className="tiembanh__banner-wrap">
          <video
            src="/videos/tiembanh-bot-h264.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="tiembanh__banner-video"
          />
        </div>
      </section>

    </div>
  );
}