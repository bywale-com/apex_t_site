import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CarouselProgressBar } from "../ui/CarouselProgressBar";
import { Button } from "../ui/Button";
import styles from "./SocialProof.module.css";

export function SocialProof() {
  const ref = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [resetProgress, setResetProgress] = useState(false);
  const photos = Array.from({ length: 5 });
  const CAROUSEL_DURATION = 5000;
  const TOTAL_PHOTOS = photos.length;

  useEffect(() => {
    const syncSize = () => setIsDesktop(window.innerWidth > 768);
    syncSize();
    window.addEventListener("resize", syncSize);
    return () => window.removeEventListener("resize", syncSize);
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector<HTMLElement>(`[data-photo-index="${currentPhotoIndex}"]`);
    if (!card) return;
    carouselRef.current.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
  }, [currentPhotoIndex]);

  const handleProgressComplete = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % TOTAL_PHOTOS);
    setResetProgress((prev) => !prev);
  };

  return (
    <motion.section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <motion.h2
            initial={{ y: 32, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Proven with firms that trusted us
            <br />
            in <em>guiding</em> their growth
          </motion.h2>
          <Button variant="dark" plus>Explore our cases</Button>
        </div>
        <div className={styles.divider} />
        <CarouselProgressBar
          duration={CAROUSEL_DURATION}
          onComplete={handleProgressComplete}
          reset={resetProgress}
        />
        <motion.div
          ref={carouselRef}
          className={`${styles.carousel} ${styles.carouselMask}`.trim()}
          drag={isDesktop ? "x" : false}
          dragConstraints={isDesktop ? { left: -600, right: 0 } : undefined}
          dragElastic={isDesktop ? 0.05 : undefined}
          style={{ cursor: isDesktop ? "grab" : "auto" }}
          whileDrag={isDesktop ? { cursor: "grabbing" } : undefined}
          onDragEnd={() => setResetProgress((prev) => !prev)}
        >
          {photos.map((_, idx) => (
            <motion.article
              className={styles.card}
              key={idx}
              data-photo-index={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className={styles.cardImagePlaceholder} />
              <div className={styles.labelBar}>FIRM NAME</div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
