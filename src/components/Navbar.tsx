import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import apexLogoWhite from "../assets/logos/apex-logo-white.png";
import { usePreloader } from "../context/PreloaderContext";
import { ArrowButton } from "./ArrowButton";
import NavMenu from "./NavMenu";

export interface NavbarProps {
  pageTag?: string;
  ctaLabel?: string;
  ctaHref?: string;
  theme?: "dark" | "light";
}

function defaultPageTagForPath(pathname: string): string {
  if (pathname === "/") return "HOME";
  if (pathname === "/company" || pathname === "/about" || pathname === "/case-studies") {
    return "COMPANY";
  }
  if (pathname === "/contact" || pathname === "/legal") return "CONTACT";
  if (pathname === "/news") return "NEWS";
  if (pathname === "/industries") return "INDUSTRIES";
  if (pathname === "/solutions") return "SOLUTIONS";
  if (pathname === "/products/tower" || pathname.startsWith("/products/tower/")) {
    return "PRODUCTS\n/TOWER";
  }
  return "HOME";
}

export default function Navbar({
  pageTag,
  ctaLabel = "Get in Touch",
  ctaHref = "/contact",
  theme = "dark",
}: NavbarProps) {
  const navClass = theme === "light" ? "navbar navbar-light" : "navbar";
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { playPreloader } = usePreloader();
  const resolvedPageTag = (pageTag ?? defaultPageTagForPath(location.pathname)).trim();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [menuOpen]);

  return (
    <>
      <header className={navClass}>
        {/* TODO: Replace navbar background gradient with final dark atmospheric image */}
        <div className="navbar-bg" />
        <div className="navbar-inner">
          <Link
            to="/"
            className="navbar-brand"
            aria-label="Apex home"
            state={location.pathname === "/" ? undefined : { playPreloader: true }}
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                playPreloader();
              }
            }}
          >
            <img className="apex-logo-mark" src={apexLogoWhite} alt="Apex" />
          </Link>
          <div className="navbar-right-cluster">
            <div className="navbar-actions">
              <ArrowButton label={ctaLabel} href={ctaHref} variant="dark" size="sm" />
              <button
                type="button"
                className="nav-hamburger"
                aria-label="Menu"
                onClick={() => setMenuOpen((s) => !s)}
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ✕
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <svg
                        width="28"
                        height="20"
                        viewBox="0 0 28 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <line x1="0" y1="2" x2="28" y2="2" stroke="white" strokeWidth="2" />
                        <line x1="0" y1="10" x2="28" y2="10" stroke="white" strokeWidth="2" />
                        <line x1="0" y1="18" x2="28" y2="18" stroke="white" strokeWidth="2" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            {!menuOpen && resolvedPageTag ? (
              <div className="page-tag" aria-label="Page context">
                {resolvedPageTag.split("\n").map((line, i) => (
                  <span key={`${i}-${line}`}>{line}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mobile-bottom-nav">
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="m-close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ✕
                </motion.span>
              ) : (
                <motion.span
                  key="m-open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <svg
                    width="28"
                    height="20"
                    viewBox="0 0 28 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <line x1="0" y1="2" x2="28" y2="2" stroke="#111" strokeWidth="2" />
                    <line x1="0" y1="10" x2="28" y2="10" stroke="#111" strokeWidth="2" />
                    <line x1="0" y1="18" x2="28" y2="18" stroke="#111" strokeWidth="2" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <div className="mobile-cta-wrap">
            <ArrowButton label={ctaLabel} href={ctaHref} variant="dark" size="md" />
          </div>
        </div>
      </header>
      {typeof document !== "undefined"
        ? createPortal(
            <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />,
            document.body,
          )
        : null}
    </>
  );
}
