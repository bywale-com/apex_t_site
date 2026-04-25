import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/Button";
import styles from "./CTASection.module.css";

export function CTASection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div>
            <motion.h2
              initial={{ y: 32, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Shockingly good AI
              <br />
              starts here.
            </motion.h2>
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Our team is always ready to discuss your operations. Reach out and we will connect you
              with the right person.
            </motion.p>
          </div>
          <motion.div
            className={styles.buttonWrap}
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Button variant="light" arrow="↗" className={styles.largeButton}>
              Start the Conversation
            </Button>
          </motion.div>
        </div>
        <div className={styles.divider} />
      </div>
    </motion.section>
  );
}
