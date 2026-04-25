import { motion } from "framer-motion";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  name: string;
  version: string;
}

export function ProductCard({ name, version }: ProductCardProps) {
  return (
    <motion.div
      className={styles.wrapper}
      style={{ boxShadow: "none" }}
      whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <article className={styles.card}>
        <div className={styles.screenshot} />
        <div className={styles.nameArea}>
          <h3 className={styles.name}>{name}</h3>
          <button className={styles.arrow}>→</button>
        </div>
      </article>
      <p className={styles.version}>{version}</p>
    </motion.div>
  );
}
