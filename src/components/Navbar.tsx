import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowButton } from "./ArrowButton";
import NavMenu from "./NavMenu";

export interface NavbarProps {
  pageTag?: string;
  ctaLabel?: string;
  ctaHref?: string;
  theme?: "dark" | "light";
}

export default function Navbar({
  pageTag,
  ctaLabel = "Get in Touch",
  ctaHref = "/contact",
  theme = "dark",
}: NavbarProps) {
  const navClass = theme === "light" ? "navbar navbar-light" : "navbar";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={navClass}>
        {/* TODO: Replace navbar background gradient with final dark atmospheric image */}
        <div className="navbar-bg" />
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <span className="logo-grid" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>Apex</span>
          </Link>
          <div className="navbar-actions">
            <ArrowButton label={ctaLabel} href={ctaHref} variant="dark" size="sm" />
            <button className="nav-icon" aria-label="Search">
              ⌕
            </button>
            <button className="nav-icon" aria-label="Menu" onClick={() => setMenuOpen((s) => !s)}>
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
                  >
                    ☰
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {pageTag && !menuOpen ? (
          <div className="page-tag" aria-label="Page context tag">
            {pageTag.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        ) : null}

        <div className="mobile-bottom-nav">
          <button className="mobile-menu-btn" aria-label="Menu" onClick={() => setMenuOpen((s) => !s)}>
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
                >
                  ☰
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <div className="mobile-cta-wrap">
            <ArrowButton label={ctaLabel} href={ctaHref} variant="dark" size="md" />
          </div>
        </div>
      </header>
      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
