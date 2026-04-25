import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArticleCard } from "../ui/ArticleCard";
import { Button } from "../ui/Button";
import styles from "./Insights.module.css";

export function Insights() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cards = [
    {
      title: "Building reliable orchestration systems in enterprise settings",
      excerpt:
        "A practical look at architecture patterns teams use to ship AI automation with confidence.",
      featured: true,
    },
    {
      title: "Operational playbooks for AI-first organizations",
      excerpt:
        "How leading teams standardize workflows for measurable outcomes across departments.",
      featured: false,
    },
    {
      title: "What decision intelligence means in 2026",
      excerpt: "A concise overview of where intelligent workflow infrastructure is heading next.",
      featured: false,
    },
  ];

  return (
    <motion.section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className={styles.newsLabel}>/NEWS</p>
            <h2>Latest insights</h2>
          </motion.div>
          <Button variant="outlined" arrow="↗">Discover more</Button>
        </div>
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ArticleCard featured={card.featured} title={card.title} excerpt={card.excerpt} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
