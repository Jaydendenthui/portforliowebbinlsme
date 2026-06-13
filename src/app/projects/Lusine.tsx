import "./Lusine.css";
import "./TiemBanh.css";
import logo from "../components/layout/LOGO.png";
import lu01 from "./Lusine-01.jpg";
import lu02 from "./Lusine-02.jpg";
import lu03 from "./Lusine-03.jpg";
import lu04 from "./Lusine-04.jpg";
import lu05 from "./Lusine-05.jpg";
import lu06 from "./Lusine-06.jpg";
import lu07 from "./Lusine-07.jpg";
import lu08 from "./Lusine-08.jpg";
import lu09 from "./Lusine-09.jpg";
import lu10 from "./Lusine-10.jpg";
import lu11 from "./Lusine-11.jpg";
import lu12 from "./Lusine-12.jpg";
import lu13 from "./Lusine-13.jpg";
import lu14 from "./Lusine-14.jpg";
import lu15 from "./Lusine-15.jpg";
import lu16 from "./Lusine-16.jpg";
import lu17 from "./Lusine-17.jpg";
import lu18 from "./Lusine-18.jpg";

// ── Placeholder component ─────────────────────────────────────────────────
const IMG = ({ src, style }: { src?: string; style?: React.CSSProperties }) =>
  src ? (
    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }} />
  ) : (
    <div style={{ width: "100%", height: "100%", background: "#222", display: "block", ...style }} />
  );

// ── MarqueeRow ────────────────────────────────────────────────────────────
function MarqueeRow({
  items,
  speed = 30,
  itemWidth = "220px",
  itemAspect = "1 / 1",
  reverse = false,
  objectFit = "cover",
  gap = "4px",
}: {
  items: (string | null)[];
  speed?: number;
  itemWidth?: string;
  itemAspect?: string;
  reverse?: boolean;
  objectFit?: "cover" | "contain";
  gap?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-track">
      <div
        className="marquee-inner"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal", gap }}
      >
        {doubled.map((src, i) => (
          <div key={i} className="marquee-item" style={{ width: itemWidth, aspectRatio: itemAspect, background: "#222" }}>
            <IMG src={src ?? undefined} style={{ objectFit }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ReelVideo ─────────────────────────────────────────────────────────────
function ReelVideo({ src }: { src?: string }) {
  return (
    <div className="lusine__reel-item">
      {src
        ? <video src={src} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ width: "100%", height: "100%", background: "#222" }} />
      }
    </div>
  );
}

// ── Lusine ────────────────────────────────────────────────────────────────
export default function Lusine() {

  const thumbs: (string | null)[]     = [lu01, lu02, lu03, lu04, lu05, lu06, lu07];
  const gridPhotos: (string | null)[] = [lu08, lu09, lu10];
  const sidePhotos: (string | null)[] = [lu11, lu12];
  // 👇 Replace nulls with imports when ready: import tote01 from "./tote-01.jpg" etc.
  const totePhotos: (string | null)[] = [lu13, lu14, lu15, lu16, lu17, lu18];

  const reelsMenu   = ["/videos/lu1-h264.mp4",  "/videos/lu2-h264.mp4",  "/videos/lu3-h264.mp4"];
  const reelsDrinks = ["/videos/lu4-h264.mp4",  "/videos/lu5-h264.mp4",  "/videos/lu6-h264.mp4"];
  const reelsCake   = ["/videos/lu10-h264.mp4", "/videos/lu11-h264.mp4", "/videos/lu9-h264.mp4"];
  const reelsOther  = ["https://res.cloudinary.com/drith9etg/video/upload/v1781390573/lu-14-h264_e08mbv.mp4",  "https://res.cloudinary.com/drith9etg/video/upload/v1781390580/lu-15-h264_jxnbpi.mp4",  "https://res.cloudinary.com/drith9etg/video/upload/v1781390566/lu-16-h264_gf90k7.mp4", "https://res.cloudinary.com/drith9etg/video/upload/v1781390572/lu-17-h264_p67zoc.mp4"];

  return (
    <div className="lusine">

      {/* ── INTRO ─────────────────────────────────────────────── */}
      <section className="lusine__intro">
        <img src={logo} alt="" aria-hidden="true" className="lusine__watermark" />
        <h1 className="lusine__title">L'Usine</h1>
        <div className="lusine__meta">
          <p><strong>Year:</strong> 2026</p>
          <p><strong>Software:</strong> Adobe Illustrator, Photoshop, After Effect, Lightroom</p>
        </div>
        <p className="lusine__desc">
          Working at L'Usine, a lifestyle brand that blends a concept store, café, and creative
          hub, I had the opportunity to contribute to their creative and marketing efforts.
          My main responsibilities included: Creating and designing social media posts to align with
          L'Usine's brand identity and seasonal campaigns. Planning and executing food photoshoots
          to highlight new menu items and promotional content. Designing POSM (Point of Sale
          Materials) such as posters and event flyers with thoughtful layout and typography.
          Recording and Editing videos, including highlight reels for events and content for social
          channels. Producing motion graphics for thumbnails to increase visual engagement and
          strengthen brand recognition.
        </p>
        <p className="lusine__caption" style={{ paddingLeft: 0, marginTop: 16 }}>
          A thumbnail ads for <strong>NEW MENU 2025</strong> ...
        </p>
        <div className="lusine__watermark-cover" />
      </section>

      {/* ── THUMBNAIL MARQUEE ─────────────────────────────────── */}
      <div className="lusine__marquee-intro">
        <MarqueeRow items={thumbs} speed={35} itemAspect="3 / 4" objectFit="contain" gap="16px" />
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────── */}
      <hr className="lusine__marquee-divider" />

      {/* ── SOCIAL POST GRID ──────────────────────────────────── */}
      <div className="lusine__grid">
        {gridPhotos.map((src, i) => (
          <div key={i}>
            <IMG src={src ?? undefined} style={{ objectFit: "cover", height: "auto", width: "100%" }} />
          </div>
        ))}
      </div>

      {/* ── SIDE BY SIDE + CAPTION ────────────────────────────── */}
      <div className="lusine__sidebyside-row">
        <div className="lusine__caption lusine__sidebyside-caption">
          <p>A relaxed photoshoot with wine and steak</p>
          <p className="lusine__caption--indent">at L'Usine</p>
        </div>
        <div className="lusine__sidebyside">
          {sidePhotos.map((src, i) => (
            <div key={i}>
              <IMG src={src ?? undefined} style={{ objectFit: "cover", height: "auto", width: "100%" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── CREATIVE REELS FOR NEW MENU ───────────────────────── */}
      <p className="lusine__section-label"><strong>Creative Reels</strong> for New Menu</p>
      <div className="lusine__reels">
        {reelsMenu.map((src, i) => <ReelVideo key={i} src={src} />)}
      </div>
      <div className="lusine__caption lusine__caption--right">
        <p><strong>A Teasing Reels</strong> begin</p>
      </div>

      {/* ── NEW DRINKS REELS ──────────────────────────────────── */}
      <p className="lusine__section-label"><strong>New Drinks</strong> Reels</p>
      <div className="lusine__reels--drinks">
        {reelsDrinks.map((src, i) => <ReelVideo key={i} src={src} />)}
      </div>

      {/* ── NEW CAKE REELS ────────────────────────────────────── */}
      <p className="lusine__section-label lusine__section-label--right"><strong>New Cake</strong> Reels</p>
      <div className="lusine__reels--cake">
        {reelsCake.map((src, i) => <ReelVideo key={i} src={src} />)}
      </div>

      {/* ── CENTERED PORTRAIT PAIR ────────────────────────────── */}
      <div className="lusine__sidebyside lusine__reels--centered">
        <div style={{ aspectRatio: "9/16", overflow: "hidden", background: "#222" }}>
          <ReelVideo src="https://res.cloudinary.com/drith9etg/video/upload/v1781390565/lu-12-h264_lzkyyz.mp4" />
        </div>
        <div style={{ aspectRatio: "9/16", overflow: "hidden", background: "#222" }}>
          <ReelVideo src="https://res.cloudinary.com/drith9etg/video/upload/v1781390565/lu-13-h264_axcdyv.mp4" />
        </div>
      </div>

      {/* ── TOTE BAG SECTION ──────────────────────────────────── */}
      <p className="lusine__section-label lusine__section-label--flush"><strong>Tote Bag</strong> Yellow Version</p>
      <div className="lusine__caption lusine__caption--right">
        <p><strong>New Promo</strong> 2025</p>
      </div>
      <div className="lusine__marquee-tote">
        <MarqueeRow items={totePhotos} speed={30} itemWidth="260px" itemAspect="3 / 4" objectFit="cover" gap="4px" />
      </div>

      {/* ── OTHER REELS ───────────────────────────────────────── */}
      <p className="lusine__section-label"><strong>Other</strong> Reels</p>
      <div className="lusine__reels">
        {reelsOther.map((src, i) => <ReelVideo key={i} src={src} />)}
      </div>
      <div className="lusine__caption" style={{ marginBottom: 48 }}></div>

    </div>
  );
}