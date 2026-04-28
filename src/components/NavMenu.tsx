import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import apexLogoBlack from "../assets/logos/apex-logo-black.png";
import apexLogoWhite from "../assets/logos/apex-logo-white.png";
import { usePreloader } from "../context/PreloaderContext";
import { ArrowButton } from "./ArrowButton";
import TorontoClock from "./TorontoClock";
import { staggerContainer, staggerItem } from "../lib/motion";

interface NavMenuProps {
  open: boolean;
  onClose: () => void;
}

const primaryLinks = [
  { label: "Tower", to: "/products/tower" },
  { label: "Solutions", to: "/solutions" },
  { label: "Industries", to: "/industries" },
  { label: "Company", to: "/company" },
  { label: "News", to: "/news" },
] as const;

const utilityLinks = [
  { label: "BOOK A CALL", to: "/contact" },
  { label: "CONTACT", to: "/contact" },
  { label: "LEGAL", to: "/legal" },
] as const;

export default function NavMenu({ open, onClose }: NavMenuProps) {
  const location = useLocation();
  const { playPreloader } = usePreloader();
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="navmenu-shell"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div className="navmenu-backdrop" onClick={onClose} />

          <motion.div
            className="navmenu-panel"
            initial={{ x: -420 }}
            animate={{ x: 0 }}
            exit={{ x: -420 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="navmenu-topbar">
              <Link
                to="/"
                className="navbar-brand navmenu-brand"
                aria-label="Apex home"
                state={location.pathname === "/" ? undefined : { playPreloader: true }}
                onClick={(e) => {
                  onClose();
                  if (location.pathname === "/") {
                    e.preventDefault();
                    playPreloader();
                  }
                }}
              >
                <img className="apex-logo-mark apex-logo-white" src={apexLogoWhite} alt="Apex" />
                <img className="apex-logo-mark apex-logo-black" src={apexLogoBlack} alt="Apex" />
              </Link>
              <div className="navmenu-top-actions">
                <ArrowButton label="Get in Touch" href="/contact" variant="dark" size="sm" />
                <button className="navmenu-close-btn" onClick={onClose} aria-label="Close menu">
                  ✕
                </button>
              </div>
            </div>

            <motion.div
              className="navmenu-links"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {primaryLinks.map((item) => (
                <motion.div key={item.label} variants={staggerItem}>
                  <Link to={item.to} className="navmenu-primary-link" onClick={onClose}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="navmenu-utility">
              {utilityLinks.map((item) => (
                <Link key={item.label} to={item.to} className="navmenu-utility-link" onClick={onClose}>
                  {item.label}
                </Link>
              ))}
              <TorontoClock />
            </div>
          </motion.div>

          <motion.div
            className="navmenu-right"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="navmenu-news-col">
              <div className="navmenu-col-header">
                <p>LATEST NEWS</p>
                <Link to="/news" onClick={onClose}>
                  NEWSROOM ↗
                </Link>
              </div>
              <div className="navmenu-col-divider" />
              <article>
                <small>APEX BLOG, APR 2026</small>
                <h4>How AI is changing the intake process for immigration firms</h4>
                <Link to="/news" onClick={onClose}>
                  ↳ Read More
                </Link>
              </article>
              <article>
                <small>APEX BLOG, APR 2026</small>
                <h4>Building orchestration-first teams for enterprise autonomy</h4>
                <Link to="/news" onClick={onClose}>
                  ↳ Read More
                </Link>
              </article>
            </div>

            <div className="navmenu-products-col">
              <div className="navmenu-col-header">
                <p>PRODUCTS</p>
              </div>
              <div className="navmenu-col-divider" />
              <p>
                Tower is the operating system for immigration firms — automating intake, follow-up, and
                case management without adding headcount.
              </p>
              <Link to="/products/tower" onClick={onClose}>
                ↳ Explore Tower
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
