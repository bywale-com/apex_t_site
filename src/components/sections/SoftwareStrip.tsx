import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CarouselProgressBar } from "../ui/CarouselProgressBar";
import { ProductCard } from "../ui/ProductCard";
import styles from "./SoftwareStrip.module.css";

export function SoftwareStrip() {
  const ref = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [resetProgress, setResetProgress] = useState(false);
  const productCards = [
    { name: "TOWER", version: "/0.1" },
    { name: "TOWER", version: "/0.1" },
    { name: "TOWER", version: "/0.1" },
  ];
  const CAROUSEL_DURATION = 5000;
  const TOTAL_CARDS = productCards.length;

  useEffect(() => {
    const syncSize = () => setIsDesktop(window.innerWidth > 768);
    syncSize();
    window.addEventListener("resize", syncSize);
    return () => window.removeEventListener("resize", syncSize);
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector<HTMLElement>(`[data-card-index="${currentCardIndex}"]`);
    if (!firstCard) return;
    carouselRef.current.scrollTo({
      left: firstCard.offsetLeft,
      behavior: "smooth",
    });
  }, [currentCardIndex]);

  const handleProgressComplete = () => {
    setCurrentCardIndex((prev) => (prev + 1) % TOTAL_CARDS);
    setResetProgress((prev) => !prev);
  };

  return (
    <motion.section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Our software automates real-time,
          <br />
          <span>AI-driven</span> operations across critical
          <br />
          industries and enterprises,
          <br />
          from intake to execution.
        </motion.h2>
        <p className={styles.productsLabel}>Our Products</p>
        <div className={`${styles.stripWrap} ${styles.stripContainer}`.trim()}>
          <CarouselProgressBar
            duration={CAROUSEL_DURATION}
            onComplete={handleProgressComplete}
            reset={resetProgress}
          />
          <motion.div
            ref={carouselRef}
            className={styles.strip}
            initial={{ x: 80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            drag={isDesktop ? "x" : false}
            dragConstraints={isDesktop ? { left: -600, right: 0 } : undefined}
            dragElastic={isDesktop ? 0.05 : undefined}
            style={{ cursor: isDesktop ? "grab" : "auto" }}
            whileDrag={isDesktop ? { cursor: "grabbing" } : undefined}
            onDragEnd={() => setResetProgress((prev) => !prev)}
          >
            {productCards.map((card, index) => (
              <div key={`${card.name}-${index}`} data-card-index={index}>
                <ProductCard name={card.name} version={card.version} />
              </div>
            ))}
          </motion.div>
          <button className={styles.navButton}>→</button>
        </div>
      </div>
    </motion.section>
  );
}
