import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`.trim()}
        style={{
          backgroundColor: scrolled ? "#1A1A1A" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
          transition: "background-color 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.logoMark} />
            <span className={styles.wordmark}>Apex</span>
          </div>
          <div className={styles.desktopRight}>
            <Button variant="dark" arrow="↗">Get in touch</Button>
            <div className={styles.iconPair}>
              <button className={styles.iconButton}>🔍</button>
              <button className={styles.iconButton}>≡</button>
            </div>
          </div>
        </div>
      </motion.nav>
      <div className={styles.mobileBottomBar}>
        <button className={`${styles.iconButton} ${styles.mobileIconButton}`.trim()}>≡</button>
        <button className={`${styles.iconButton} ${styles.mobileIconButton}`.trim()}>🔍</button>
        <Button variant="dark" arrow="↗" className={styles.mobileCta}>Get in Touch</Button>
      </div>
    </>
  );
}
