import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const industries = [
  {
    id: "immigration",
    name: "Immigration Law",
    body: "Immigration consulting firms run on precision and speed. Every missed call, delayed document, or slow follow-up is a client lost to the next firm. We automate the coordination layer so your consultants focus on cases, not logistics.",
    bgGradient: "linear-gradient(135deg, #0a1628 0%, #1a2d1a 100%)",
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    body: "Finance firms carry high client volume with tight compliance requirements. Our workflows handle client onboarding, document collection, and status communication — reducing manual overhead without touching your core advisory work.",
    bgGradient: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)",
  },
  {
    id: "insurance",
    name: "Insurance",
    body: "Insurance brokerages live and die by response time. We build the intake and follow-up infrastructure that ensures every lead is contacted, every renewal is flagged, and every client feels handled — automatically.",
    bgGradient: "linear-gradient(135deg, #1a0a0a 0%, #2d1a0d 100%)",
  },
  {
    id: "consulting",
    name: "Consulting",
    body: "Independent consultants and small consulting firms are often the last to adopt operational infrastructure. We change that — giving boutique consulting practices the same automation leverage as firms ten times their size.",
    bgGradient: "linear-gradient(135deg, #0a0a1a 0%, #1a0d2d 100%)",
  },
] as const;

const specialties = [
  {
    id: 0,
    name: "Workflow Orchestration",
    num: "01",
    image: null,
    imageBg: "#1a1a2e",
  },
  {
    id: 1,
    name: "Intake Automation",
    num: "02",
    image: null,
    imageBg: "#0d1a0d",
  },
  {
    id: 2,
    name: "Document Management",
    num: "03",
    image: null,
    imageBg: "#2e1a0d",
  },
  {
    id: 3,
    name: "Client Communication",
    num: "04",
    image: null,
    imageBg: "#1a0d2e",
  },
  {
    id: 4,
    name: "Reporting & Analytics",
    num: "05",
    image: null,
    imageBg: "#0d1a2e",
  },
] as const;

const staticBody =
  "We build the operational infrastructure that professional service firms rely on. From the first client inquiry to case close, every touchpoint is handled, logged, and optimized — without adding headcount.";

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSpecialty, setActiveSpecialty] = useState(0);
  const industriesHeroRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const touchStartX = useRef(0);

  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const el = industriesHeroRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const p = activeIndexRef.current;
      if (e.deltaY > 0 && p < industries.length - 1) {
        e.preventDefault();
        setActiveIndex(p + 1);
      } else if (e.deltaY < 0 && p > 0) {
        e.preventDefault();
        setActiveIndex(p - 1);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50 && activeIndex < industries.length - 1) {
      setActiveIndex((p) => p + 1);
    }
    if (delta < -50 && activeIndex > 0) {
      setActiveIndex((p) => p - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div
        ref={industriesHeroRef}
        className="industries-hero"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Industries we serve"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="industries-hero-bg"
            style={{ background: industries[activeIndex].bgGradient }}
          />
        </AnimatePresence>
        <div className="industries-hero-dim" aria-hidden />

        <div className="industries-hero-content">
          <div className="industries-name-row">
            <div className="industries-name-active-wrap">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={industries[activeIndex].id}
                  className="industries-h2"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {industries[activeIndex].name}
                </motion.h2>
              </AnimatePresence>
            </div>
            {industries.slice(activeIndex + 1, activeIndex + 3).map((ind) => (
              <span key={ind.id} className="industries-name-ghost">
                {ind.name}
              </span>
            ))}
          </div>

          <div className="industries-body-wrap">
            <AnimatePresence mode="wait">
              <motion.p
                key={industries[activeIndex].id}
                className="industries-body-text"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {industries[activeIndex].body}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="industries-dots" role="tablist" aria-label="Industry">
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                type="button"
                role="tab"
                aria-label={ind.name}
                aria-selected={i === activeIndex}
                className={`industries-dot${i === activeIndex ? " industries-dot--active" : ""}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.section
        className="industries-specialties"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div
          className="industries-specialty-inner"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            className="industries-specialty-names"
            variants={staggerItem}
            style={{ lineHeight: 1.2 }}
          >
            {specialties.map((s, i) => (
              <span key={s.id}>
                <motion.span
                  onHoverStart={() => setActiveSpecialty(s.id)}
                  onClick={() => setActiveSpecialty(s.id)}
                  animate={{ color: activeSpecialty === s.id ? "#000000" : "#CCCCCC" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline",
                  }}
                >
                  {s.name}
                  <sup
                    style={{
                      fontSize: "0.4em",
                      fontWeight: 400,
                      verticalAlign: "super",
                      color: activeSpecialty === s.id ? "#000000" : "#CCCCCC",
                    }}
                  >
                    ({s.num})
                  </sup>
                </motion.span>
                {i < specialties.length - 1 ? (
                  <span
                    style={{
                      color: "#CCCCCC",
                      fontSize: "clamp(28px, 4vw, 52px)",
                      fontWeight: 700,
                    }}
                  >
                    {" "}
                    /{" "}
                  </span>
                ) : null}
              </span>
            ))}
          </motion.div>

          <motion.div className="industries-specialty-image-wrap" variants={staggerItem}>
            <div className="industries-specialty-image-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpecialty}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="industries-specialty-image-placeholder"
                  style={{
                    // TODO: replace with real image
                    background: specialties[activeSpecialty].imageBg,
                  }}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            className="industries-specialty-static"
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: 16,
              color: "#555555",
              lineHeight: 1.7,
              maxWidth: 520,
              paddingTop: 24,
            }}
          >
            {staticBody}
          </motion.p>
        </motion.div>
      </motion.section>
      <Footer />
    </>
  );
}
