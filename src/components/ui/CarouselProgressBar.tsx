import { motion } from "framer-motion";
import styles from "./CarouselProgressBar.module.css";

interface CarouselProgressBarProps {
  duration: number;
  onComplete: () => void;
  reset?: boolean;
}

export function CarouselProgressBar({ duration, onComplete, reset }: CarouselProgressBarProps) {
  return (
    <div className={styles.track}>
      <motion.div
        key={reset ? "reset-on" : "reset-off"}
        className={styles.fill}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
}
