/**
 * Exact recreation of the original site header.
 *
 * On the HOME page, the original site shows a DIFFERENT layout
 * (the video-cover landing page from your existing project). We preserve that.
 *
 * On the WORKS page (and all non-home pages), the original site-header shows:
 * - Background: #111111, height: 100px, position: fixed, full width
 * - Left side: nav links (HOME, Work, Contact) in uppercase white text
 * - Center: Logo image (circular image from the CDN) absolutely centered
 * - Right side: social icons (none for this portfolio)
 */

import { Link, useLocation } from "react-router";
import { useState } from "react";

// 1. IMPORT the logo using a relative dot-slash (./) path
import homeLogo from "./LOGO.png"; 

// This is the logo used for the dark header on other pages
const LOGO_IMAGE_URL =
  "https://cdn.myportfolio.com/5c9b039b-a19b-4c88-a6bc-848d4b3b1d36/669108cf-09d1-4235-8314-0597c3ff7e87_rwc_0x0x2084x2084x4096.png?h=75622f11a1d22707415e8b344b50affd";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Home page: Word-only text layout with Image Logo & More Works button ──
  if (isHome) {
    return (
      /* Changed height to h-screen so items can safely attach to the bottom */
      <div className="absolute top-0 left-0 w-full h-screen z-40 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {/* Top Left: Logo */}
          <Link
            to="/"
            className="absolute top-8 left-8 hover:opacity-80 transition-opacity flex items-center"
          >
            <img 
              src={homeLogo} 
              alt="Logo" 
              className="h-10 md:h-12 w-auto object-contain block" 
            />
          </Link>

          {/* Top Right: Nav Links */}
          <nav className="absolute top-8 right-8 flex gap-8 items-center">
            <Link
              to="/work"
              className="text-black text-2xl md:text-3xl font-medium hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'Microsoft Yi Baiti', sans-serif" }}
            >
              Works
            </Link>
            <Link
              to="/about"
              className="text-black text-2xl md:text-3xl font-medium hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'Microsoft Yi Baiti', sans-serif" }}
            >
              About
            </Link>
          </nav>

          {/* Bottom Right: More Works Outline Button */}
          <Link
            to="/work"
            className="absolute bottom-8 right-8 px-5 py-1.5 border border-black text-black rounded-full text-2xl md:text-3xl font-medium hover:bg-black hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Microsoft Yi Baiti', sans-serif" }}
          >
            More Works↓
          </Link>
        </div>
      </div>
    );
  }

  // ── Works / other pages: exact 1:1 recreation of the original dark header ─
  return (
    <>
      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "#111111",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              top: 40,
              right: "5%",
              background: "none",
              border: "none",
              cursor: "pointer",
              width: 24,
              height: 24,
            }}
            aria-label="Close menu"
          >
            <span style={{ display: "block", position: "relative", height: 24 }}>
              <span style={{
                position: "absolute", left: "50%", width: 2, height: 24,
                backgroundColor: "#fff", transform: "rotate(45deg)"
              }} />
              <span style={{
                position: "absolute", left: "50%", width: 2, height: 24,
                backgroundColor: "#fff", transform: "rotate(-45deg)"
              }} />
            </span>
          </button>

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: 22, lineHeight: "32px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "'Jost', sans-serif" }}
          >
            HOME
          </Link>
          <Link
            to="/work"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: 22, lineHeight: "32px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "'Microsoft Yi Baiti', sans-serif" }}
          >
            Work
          </Link>
          <a
            href="https://aroombybin.myportfolio.com/contact"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#FFFFFF", fontSize: 22, lineHeight: "32px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "'Jost', sans-serif" }}
          >
            Contact
          </a>
        </div>
      )}

      {/* site-header: fixed, #111111 bg, 100px tall */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#111111",
          height: 100,
          paddingLeft: "4%",
          paddingRight: "4%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          width: "100%",
        }}
      >
        <nav
          style={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "35px"
          }}
        >
          <Link
            to="/"
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 500,
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "'Jost', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            HOME
          </Link>
          <Link
            to="/work"
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 500,
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "'Microsoft Yi Baiti', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            Work
          </Link>
          <a
            href="https://aroombybin.myportfolio.com/contact"
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 500,
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "'Jost', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            Contact
          </a>
        </nav>

        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={LOGO_IMAGE_URL}
              alt="Phat Le Tuan"
              style={{
                height: 70,
                width: 70,
                objectFit: "contain",
                display: "block"
              }}
            />
          </Link>
        </div>

        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <button
            className="hamburger-nav-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ display: "none", background: "transparent", border: "none", cursor: "pointer", padding: "10px" }}
          >
            <span style={{ display: "block", width: 24, position: "relative" }}>
              <i style={{ display: "block", height: 2, marginBottom: 4, backgroundColor: "#fff" }} />
              <i style={{ display: "block", height: 2, marginBottom: 4, backgroundColor: "#fff" }} />
              <i style={{ display: "block", height: 2, backgroundColor: "#fff" }} />
            </span>
          </button>
        </div>
      </header>

      <style>{`
        @media (max-width: 932px) {
          .hamburger-nav-btn { display: block !important; }
          header nav { display: none !important; }
        }
      `}</style>
    </>
  );
}