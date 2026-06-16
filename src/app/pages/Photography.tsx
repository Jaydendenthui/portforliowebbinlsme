import { useEffect } from "react";
import { motion } from "motion/react";
import "./Photography.css";
import "../projects/Lusine.css";
import "../projects/TiemBanh.css";

// ── Placeholder component ─────────────────────────────────────────────────
const IMG = ({ src }: { src?: string }) =>
  src ? (
    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  ) : (
    <div style={{ width: "100%", height: "100%", background: "#222", display: "block" }} />
  );

export default function Photography() {
  useEffect(() => {
    document.title = "Phat Le Tuan - Photography";
    return () => { document.title = "Phat Le Tuan"; };
  }, []);

  // ── L'Usine (8 photos) — replace nulls with imports or URLs ──────────────
  const lusine: (string | null)[] = ["https://res.cloudinary.com/drith9etg/image/upload/v1781649552/compressed__MG_3992_jtgaui.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781649551/compressed__MG_3970_an4fdq.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781649550/compressed__MG_3942_axlgdm.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781649551/compressed_DSC09317-Enhanced-NR_ad5ypa.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781649551/compressed_DSC09305_atmrte.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781649175/namo_3_okeha5.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781649551/compressed_DSC09294_gczjnu.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781649551/compressed_namo_4_bhav6e.jpg"];

  // ── Red Thread (11 photos) ────────────────────────────────────────────────
  const redThread: (string | null)[] = ["https://res.cloudinary.com/drith9etg/image/upload/v1781650568/IMG_9981_pb3qpg.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650569/IMG_9959_okmvft.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650562/IMG_0144_xfxw0c.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650571/IMG_0876_-_Copy_ubiua3.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650563/IMG_0667_gdduqq.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650569/IMG_9991_p1suzr.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650565/IMG_0805_-_Copy_ztjsyb.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650570/IMG_0616_exoq1f.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650569/IMG_0384_zzz1u7.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650567/IMG_0632_dvw1b4.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781650542/IMG_0294_vx3tff.jpg"];

  // ── Egg (4 photos) ────────────────────────────────────────────────────────
  const egg: (string | null)[] = ["https://res.cloudinary.com/drith9etg/image/upload/v1781651223/IMG_7948_rqa9xv.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781651224/IMG_8042_qfa4ia.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781651224/IMG_8005_sgceem.jpg", "https://res.cloudinary.com/drith9etg/image/upload/v1781651223/IMG_7773_utv9cg.jpg"];

  return (
    <motion.div
      className="photography"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="photo__header">
        <h1 className="photo__title">Photography'</h1>
      </div>

      {/* ── L'USINE SECTION ─────────────────────────────────────── */}
      <p className="lusine__section-label lusine__section-label--right">
        <strong>Nam et</strong> L'Usine 2025
      </p>

      {/* 2-col: photos 1–2 */}
      <div className="photo__grid-2">
        {lusine.slice(0, 2).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* 2-col: photos 3–4 */}
      <div className="photo__grid-2">
        {lusine.slice(2, 4).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* 3-col: photos 5–7 */}
      <div className="photo__grid-3">
        {lusine.slice(4, 7).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* Full width: photo 8 */}
      <div className="photo__full">
        <IMG src={lusine[7] ?? undefined} />
      </div>

      {/* ── RED THREAD SECTION ──────────────────────────────────── */}
      <p className="lusine__section-label lusine__section-label--flush">
        <strong>A Red Thread</strong> Photoshoot
      </p>

      {/* 3-col: photos 1–3 */}
      <div className="photo__grid-3">
        {redThread.slice(0, 3).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* 2-col: photos 4–5 */}
      <div className="photo__grid-2">
        {redThread.slice(3, 5).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* 2-col: photos 6–7 */}
      <div className="photo__grid-2">
        {redThread.slice(5, 7).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* 2-col: photos 8–9 */}
      <div className="photo__grid-2">
        {redThread.slice(7, 9).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* 2-col: photos 10–11 */}
      <div className="photo__grid-2">
        {redThread.slice(9, 11).map((src, i) => (
          <div key={i} className="photo__cell"><IMG src={src ?? undefined} /></div>
        ))}
      </div>

      {/* ── EGG SECTION ─────────────────────────────────────────── */}
      <p className="lusine__section-label lusine__section-label--flush">
        <strong>Egg</strong> Photoshoot
      </p>

      {/* 2-col: photos 1–2 */}
      <div className="photo__grid-2">
        {egg.slice(0, 2).map((src, i) => (
          <div key={i} className="photo__cell">
            <IMG src={src ?? undefined} />
          </div>
        ))}
      </div>

      {/* 2-col unequal: photos 3–4 (left narrower, right wider) */}
      <div className="photo__grid-2-unequal">
        {egg.slice(2, 4).map((src, i) => (
          <div key={i} className="photo__cell">
            <IMG src={src ?? undefined} />
          </div>
        ))}
      </div>

    </motion.div>
  );
}