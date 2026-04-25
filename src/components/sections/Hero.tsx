import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export function Hero() {
  const words = "AI-Powered Automation for Every Decision".split(" ");

  return (
    <motion.section className={styles.hero}>
      <div className={`${styles.image} ${styles.heroImage}`} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className={styles.wordOuter}>
              <motion.span
                className={styles.wordInner}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <div className={styles.scrollPrompt}>
          <span className={`${styles.arrow} ${styles.scrollArrow}`}>↓</span>
          <span>Scroll to Explore</span>
        </div>
      </div>
    </motion.section>
  );
}
