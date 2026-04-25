import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "dark" | "light" | "outlined";

interface ButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
  arrow?: "↗" | "→";
  plus?: boolean;
  className?: string;
}

export function Button({ variant, children, arrow, plus = false, className = "" }: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${className}`.trim()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.label}>{plus ? "+ " : ""}{children}</span>
      {arrow ? (
        <span className={styles.arrowBox}>
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            {arrow}
          </motion.span>
        </span>
      ) : null}
    </motion.button>
  );
}
