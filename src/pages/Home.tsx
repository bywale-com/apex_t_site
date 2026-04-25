import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowButton } from "../components/ArrowButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionLabel from "../components/SectionLabel";
import WarningChip from "../components/WarningChip";
import {
  fadeIn,
  fadeUp,
  scaleIn,
  slideInRight,
  staggerContainer,
  staggerItem,
  viewportOnce,
  wordItem,
  wordReveal,
} from "../lib/motion";

const HERO_WORDS = "AI-Powered Automation for Every Decision".split(" ");
const CAROUSEL_MS = 4000;
const CARD_COUNT = 5;

export default function Home() {
  const [activeCard, setActiveCard] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCardRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      cardRefs.current[i] = el;
    },
    [],
  );

  const scrollToActive = useCallback((index: number) => {
    const el = cardRefs.current[index];
    const strip = stripRef.current;
    if (!el || !strip) return;

    const targetLeft = el.offsetLeft - (strip.clientWidth - el.clientWidth) / 2;
    strip.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToActive(activeCard);
  }, [activeCard, scrollToActive]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveCard((i) => (i + 1) % CARD_COUNT);
    }, CAROUSEL_MS);
    return () => window.clearInterval(id);
  }, []);

  const goToCard = (index: number) => {
    setActiveCard(index);
  };

  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="home-hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              variants={wordReveal}
              initial="hidden"
              animate="visible"
            >
              {HERO_WORDS.map((word) => (
                <span
                  key={word}
                  className="hero-word-outer"
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  <motion.span
                    className="hero-word-inner"
                    style={{ display: "inline-block" }}
                    variants={wordItem}
                  >
                    {word}
                  </motion.span>{" "}
                </span>
              ))}
            </motion.h1>
            <motion.div
              className="hero-arrow"
              aria-hidden
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              ↓
            </motion.div>
            <motion.p
              className="hero-scroll"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            >
              Scroll to Explore
            </motion.p>
          </div>
        </section>

        <section className="pain-points section">
          <div className="pain-layout">
            <div className="pain-chip chip-1">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={0}
                transition={{ delay: 0 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              >
                <WarningChip text="Slow decisions hurting customer experience" />
              </motion.div>
            </div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              We recognize the challenges you face. That is why your path to impact with AI starts
              here.
            </motion.h2>
            <div className="pain-chip chip-2">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              >
                <WarningChip text="Scaling by adding extra headcount" />
              </motion.div>
            </div>
            <div className="pain-chip chip-3">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              >
                <WarningChip text="Technology spend without measurable ROI" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="our-software section">
          <motion.div
            className="software-top"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p>
              Our software powers real-time, <em>AI-driven</em> decisions in professional services
              firms.
            </p>
          </motion.div>
          <motion.span
            className="software-label"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            Our Software
          </motion.span>
          <div className="software-strip-block">
            <div ref={stripRef} className="software-strip" role="list">
              <motion.div
                className="software-strip-inner"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                style={{ display: "flex", gap: 0 }}
              >
                <motion.div
                  ref={(el) => setCardRef(el, 0)}
                  role="listitem"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <article className="software-card">
                    <aside>
                      <p>AI orchestration system for high-volume operational workflows.</p>
                      <span>/0.1</span>
                    </aside>
                    <div className="software-shot" />
                    <h3>TOWER</h3>
                    <button type="button" aria-label="Open product">
                      →
                    </button>
                  </article>
                </motion.div>
                {([2, 3, 4, 5] as const).map((n, i) => (
                  <motion.div
                    key={n}
                    ref={(el) => setCardRef(el, i + 1)}
                    role="listitem"
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="product-card product-card--placeholder">
                      <div className="card-label">
                        <span className="card-desc">Coming soon</span>
                        <span className="card-index">{`/0.${n}`}</span>
                      </div>
                      <div className="card-visual card-visual--empty" />
                      <div className="card-name card-name--placeholder" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="product-progress-row" role="tablist" aria-label="Product carousel position">
              {Array.from({ length: CARD_COUNT }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`product-progress-segment${activeCard === i ? " active" : ""}`}
                  onClick={() => goToCard(i)}
                  aria-label={`Show product card ${i + 1}`}
                >
                  {activeCard === i ? (
                    <motion.div
                      key={i}
                      className="product-progress-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CAROUSEL_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="social-proof-home section">
          <div className="social-top">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Proven with firms that trusted us in <em>guiding</em> their operations
            </motion.h2>
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: 0.2 }}
            >
              <ArrowButton variant="dark" label="Explore our cases" prefix="+" />
            </motion.div>
          </div>
          <motion.div
            className="social-strip"
            role="list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: "flex" }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.article
                key={index}
                role="listitem"
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
              >
                <div />
                <p>FIRM NAME</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="insights-home section">
          <div className="insights-top">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel label="/NEWS" />
              </motion.div>
              <motion.h2 variants={fadeUp}>Latest insights</motion.h2>
            </motion.div>
            <ArrowButton variant="outlined" label="Discover more" />
          </div>
          <motion.div
            className="insights-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              {
                featured: true,
                d1: "/MAR 31, 2026",
                t: "Apex builds the infrastructure. Firms make the decisions.",
                s: "How orchestration systems are replacing point automation and creating durable AI operating models.",
              },
              {
                d1: "/APR 02, 2026",
                t: "How top firms deploy agentic workflows responsibly",
                s: "Practical patterns used to implement automation with governance.",
              },
              {
                d1: "/APR 05, 2026",
                t: "From intake to case file: where AI matters most",
                s: "Mapping the highest leverage decision points in service operations.",
              },
            ].map((item) => (
              <motion.article
                key={item.t}
                className={item.featured ? "featured-article" : ""}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="article-image" />
                <p>
                  <span>■ INSIGHTS</span>
                  <span>{item.d1}</span>
                </p>
                <h3>{item.t}</h3>
                <small>{item.s}</small>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
