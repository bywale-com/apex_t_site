import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WarningChip } from "../ui/WarningChip";
import styles from "./PainPoints.module.css";

export function PainPoints() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headlineWords =
    "We recognize the challenges you face. That is why your path to impact with AI starts here.".split(" ");

  return (
    <motion.section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.desktopChip1}
          initial={{ x: 60, y: -30, opacity: 0 }}
          animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <WarningChip text="Slow decisions hurting customer experience" />
        </motion.div>
        <h2>
          {headlineWords.map((word, index) => (
            <span key={`${word}-${index}`} className={styles.wordOuter}>
              <motion.span
                className={styles.wordInner}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.div
          className={styles.desktopChip2}
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <WarningChip text="Scaling by adding extra headcount" />
        </motion.div>
        <motion.div
          className={styles.desktopChip3}
          initial={{ x: 60, y: 30, opacity: 0 }}
          animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <WarningChip text="Technology spend without measurable ROI" />
        </motion.div>
        <div className={styles.mobileStack}>
          {[ 
            "Slow decisions hurting customer experience",
            "Scaling by adding extra headcount",
            "Technology spend without measurable ROI",
          ].map((text, index) => (
            <motion.div
              key={text}
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <WarningChip text={text} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
