import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowButton } from "../components/ArrowButton";
import Footer from "../components/Footer";
import IndustriesHomeCarousel from "../components/IndustriesHomeCarousel";
import Navbar from "../components/Navbar";
import SectionLabel from "../components/SectionLabel";
import insightFeaturedImg from "../assets/stock/home-insights-featured.jpg";
import insightTwoImg from "../assets/stock/home-insights-2.jpg";
import insightThreeImg from "../assets/stock/home-insights-3.jpg";
import { fetchPosts, getSanityImageUrl, getSanityPostUrl, type SanityPost } from "../lib/blog";
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const CAROUSEL_MS = 4000;
const CARD_COUNT = 3;

const HERO_SUBTEXT = "We build the infrastructure. You run the firm.";
const PAIN_HEADLINE_TEXT =
  "Every firm we talk to is losing time in the same three places.";

export default function Home() {
  const [activeCard, setActiveCard] = useState(0);
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const painSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveCard((i) => (i + 1) % CARD_COUNT);
    }, CAROUSEL_MS);
    return () => window.clearInterval(id);
  }, []);

  const goToCard = (index: number) => {
    setActiveCard(index);
  };

  useEffect(() => {
    const section = painSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "180%",
          scrub: 0.6,
          pin: true,
        },
      });

      const glitchIn = (target: string, startTime: number) => {
        const chipTl = gsap.timeline();
        chipTl
          .set(target, { opacity: 1 })
          .to(target, { opacity: 0, duration: 0.04, ease: "none" })
          .to(target, { opacity: 1, duration: 0.03, ease: "none" })
          .to(target, { opacity: 0.3, duration: 0.04, ease: "none" })
          .to(target, { opacity: 1, duration: 0.03, ease: "none" })
          .to(target, { opacity: 0.6, duration: 0.03, ease: "none" })
          .to(target, { opacity: 0, duration: 0.02, ease: "none" })
          .to(target, { opacity: 1, duration: 0.05, ease: "none" })
          .to(target, { opacity: 0.8, duration: 0.03, ease: "none" })
          .to(target, { opacity: 1, duration: 0.04, ease: "none" });
        tl.add(chipTl, startTime);
      };

      tl.to(
        ".pain-headline-char",
        {
          opacity: 1,
          stagger: 0.012,
          duration: 0.01,
          ease: "none",
        },
        0,
      );

      tl.to(
        section,
        {
          backgroundColor: "#0A0A0A",
          duration: 0.8,
        },
        0,
      );

      tl.to(
        ".pain-headline",
        {
          color: "#FFFFFF",
          duration: 0.8,
        },
        0,
      );

      glitchIn(".pain-chip-1", 0.35);
      glitchIn(".pain-chip-2", 0.7);
      glitchIn(".pain-chip-3", 1.05);
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((items) => {
        if (!mounted || !items.length) return;
        setPosts(items.slice(0, 3));
      })
      .catch((error) => {
        console.error("Failed to load Sanity posts for Home insights:", error);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const fallbackInsights = [
    {
      featured: true,
      d1: "/MAR 31, 2026",
      t: "Why orchestration beats automation every time",
      s: "Point automation solves one problem. Orchestration removes a category of problems. Here is the difference and why it matters for your firm.",
      image: insightFeaturedImg,
      href: "#",
    },
    {
      d1: "/APR 02, 2026",
      t: "The intake audit: where most firms are losing 40% of their time",
      s: "We mapped the intake-to-close workflow for 50 professional service firms. The same three bottlenecks appeared in almost every one.",
      image: insightTwoImg,
      href: "#",
    },
    {
      d1: "/APR 05, 2026",
      t: "What it actually costs to follow up manually",
      s: "Most firms track billable hours. Almost none track the hours spent on reminders, callbacks, and status updates. The number is larger than expected.",
      image: insightThreeImg,
      href: "#",
    },
  ];

  const sanityInsights = posts.map((post, index) => ({
    featured: index === 0,
    d1: `/${new Date(post.publishedAt || Date.now())
      .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
      .toUpperCase()}`,
    t: post.title,
    s: post.excerpt,
    image: getSanityImageUrl(post.image, 1200, 800) ?? fallbackInsights[index % fallbackInsights.length].image,
    href: getSanityPostUrl(post),
  }));

  const insightItems = sanityInsights.length ? sanityInsights : fallbackInsights;

  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="home-hero" aria-label="Home hero">
          <video
            className="hero-bg-video hero-bg-video--desktop"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          >
            <source src="/video/hero-desktop.mp4" type="video/mp4" />
          </video>
          <video
            className="hero-bg-video hero-bg-video--mobile"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          >
            <source src="/video/hero-mobile.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content">
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{ marginTop: 20, textTransform: "none", letterSpacing: "0.01em", fontSize: 19 }}
            >
              {HERO_SUBTEXT}
            </motion.p>
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

        <div
          ref={painSectionRef}
          className="pain-points"
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            backgroundColor: "#F0F0F0",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            className="pain-headline"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(24px, 3.5vw, 48px)",
              fontWeight: 700,
              color: "#000000",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.2,
              zIndex: 1,
              width: "90%",
            }}
          >
            {PAIN_HEADLINE_TEXT.split("").map((char, i) => (
              <span
                key={i}
                className="pain-headline-char"
                style={{
                  opacity: 0,
                  display: char === " " ? "inline" : "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </h2>

          <div
            className="pain-chip-1"
            style={{
              position: "absolute",
              top: "14%",
              right: "8%",
              opacity: 0,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxWidth: "280px",
            }}
          >
            <span style={{ color: "#F5A623", fontSize: "16px", flexShrink: 0 }} aria-hidden>
              ⚠
            </span>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "14px",
                color: "#FFFFFF",
                lineHeight: 1.4,
              }}
            >
              Slow response costing you clients
            </span>
          </div>

          <div
            className="pain-chip-2"
            style={{
              position: "absolute",
              top: "48%",
              left: "6%",
              opacity: 0,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxWidth: "260px",
            }}
          >
            <span style={{ color: "#F5A623", fontSize: "16px", flexShrink: 0 }} aria-hidden>
              ⚠
            </span>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "14px",
                color: "#FFFFFF",
                lineHeight: 1.4,
              }}
            >
              Scaling by hiring instead of building
            </span>
          </div>

          <div
            className="pain-chip-3"
            style={{
              position: "absolute",
              bottom: "16%",
              right: "12%",
              opacity: 0,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxWidth: "280px",
            }}
          >
            <span style={{ color: "#F5A623", fontSize: "16px", flexShrink: 0 }} aria-hidden>
              ⚠
            </span>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "14px",
                color: "#FFFFFF",
                lineHeight: 1.4,
              }}
            >
              Tools that add complexity, not capacity
            </span>
          </div>
        </div>

        <section className="our-software section">
          <motion.div
            className="software-top"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p>
              Our systems power real-time, AI-driven operations across professional service firms -
              from the intake desk to the close.
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
            Our Products
          </motion.span>
          <div className="software-strip-block">
            <div
              style={{ width: "100%", overflow: "hidden", position: "relative" }}
              role="presentation"
            >
              <motion.div
                role="list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                style={{
                  display: "flex",
                  width: `${CARD_COUNT * 100}%`,
                }}
                animate={{ x: `${-(activeCard / CARD_COUNT) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  role="listitem"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: `${100 / CARD_COUNT}%`, flexShrink: 0 }}
                >
                  <article
                    className="software-card"
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
                  >
                    <aside>
                      <p>Market intelligence and demand signal engine for service firms.</p>
                      <span>/0.1</span>
                    </aside>
                    <div className="software-shot" />
                    <h3>TOWER</h3>
                    <button type="button" aria-label="Open product">
                      →
                    </button>
                  </article>
                </motion.div>
                <motion.div
                  role="listitem"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: `${100 / CARD_COUNT}%`, flexShrink: 0 }}
                >
                  <article
                    className="software-card"
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
                  >
                    <aside>
                      <p>Automated outreach, follow-up, and pipeline execution.</p>
                      <span>/0.2</span>
                    </aside>
                    <div className="software-shot software-shot--runner" />
                    <h3>RUNNER</h3>
                    <button type="button" aria-label="Open product">
                      →
                    </button>
                  </article>
                </motion.div>
                <motion.div
                  role="listitem"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: `${100 / CARD_COUNT}%`, flexShrink: 0 }}
                >
                  <article
                    className="software-card"
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
                  >
                    <aside>
                      <p>Intelligent intake, lead screening, and client routing.</p>
                      <span>/0.3</span>
                    </aside>
                    <div className="software-shot software-shot--frontdesk" />
                    <h3 className="software-card-title--compact">FRONT DESK</h3>
                    <button type="button" aria-label="Open product">
                      →
                    </button>
                  </article>
                </motion.div>
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

        <IndustriesHomeCarousel />

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
            <ArrowButton variant="outlined" label="Discover more" href="/news" />
          </div>
          <motion.div
            className="insights-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {insightItems.map((item) => (
              <motion.article
                key={item.t}
                className={item.featured ? "featured-article" : ""}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="article-image"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <p>
                  <span>■ INSIGHTS</span>
                  <span>{item.d1}</span>
                </p>
                <h3>{item.t}</h3>
                <small>{item.s}</small>
                <a className="page-news-read" href={item.href} style={{ marginTop: 10 }}>
                  <span>↳ Read Here</span>
                  <span className="page-news-read-line" aria-hidden />
                </a>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
