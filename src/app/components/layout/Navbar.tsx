import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import homeLogo from "./LOGO.png";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastY || currentY < 50);
      setLastY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          pointerEvents: "none",
          transform: visible ? "translateY(0)" : "translateY(-120%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "32px 32px 0",
            pointerEvents: "auto",
          }}
        >
          <Link to="/"
            style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <img src={homeLogo} alt="Logo" style={{ height: 48, width: "auto", objectFit: "contain", display: "block" }} />
          </Link>

          <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <Link to="/work" style={{ fontFamily: "'Microsoft Yi Baiti', sans-serif", fontSize: 28, fontWeight: 500, color: "#000", textDecoration: "none" }}>
              Works
            </Link>
            <Link to="/about" style={{ fontFamily: "'Microsoft Yi Baiti', sans-serif", fontSize: 28, fontWeight: 500, color: "#000", textDecoration: "none" }}>
              About
            </Link>
          </nav>
        </div>
      </div>

      {isHome && (
        <Link
          to="/work"
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 9999,
            padding: "6px 20px",
            border: "1px solid black",
            color: "black",
            borderRadius: 9999,
            fontSize: 28,
            fontWeight: 500,
            textDecoration: "none",
            fontFamily: "'Microsoft Yi Baiti', sans-serif",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "black"; e.currentTarget.style.color = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "black"; }}
        >
          More Works↓
        </Link>
      )}
    </>
  );
}