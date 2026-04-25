import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowButton } from "./ArrowButton";
import { staggerContainer, staggerItem } from "../lib/motion";

interface NavMenuProps {
  open: boolean;
  onClose: () => void;
}

const primaryLinks = [
  { label: "Tower", to: "/products/tower" },
  { label: "Solutions", to: "/solutions" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Company", to: "/company" },
  { label: "News", to: "/news" },
] as const;

const utilityLinks = [
  { label: "BOOK A CALL", to: "/contact" },
  { label: "CONTACT", to: "/contact" },
  { label: "LEGAL", to: "/legal" },
] as const;

export default function NavMenu({ open, onClose }: NavMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="navmenu-shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
              <Link to="/" onClick={onClose} className="navbar-brand navmenu-brand">
                <span className="logo-grid" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span>Apex</span>
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
              <div className="navmenu-lang">🌐 EN ▾</div>
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
