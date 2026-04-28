import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowButton } from "../components/ArrowButton";
import Footer from "../components/Footer";
import IndustriesHomeCarousel from "../components/IndustriesHomeCarousel";
import Navbar from "../components/Navbar";
import towerHeroBg from "../assets/tower/tower-hero-bg.png";
import towerLogo from "../assets/tower/tower-logo.png";
import { fadeIn, fadeUp, staggerContainer, staggerItem, viewportOnce, wordItem, wordReveal } from "../lib/motion";

const TABS = [
  {
    id: 0,
    title: "SIGNAL FEED",
    number: "01",
    bodyTitle: "SIGNAL FEED",
    intro: "Real questions. Real people. Right now.",
    body:
      "Tower monitors public social content in your market and surfaces every comment where a real person is asking for help, expressing confusion, or signaling intent. Each signal is scored for urgency, labeled by type, and flagged if it went unanswered.",
    listTitle: "What you see in the feed:",
    bullets: [
      "The question, verbatim, from the original post",
      "Urgency score (0-100)",
      "Whether it was answered by the creator",
      "The post it came from and the surface that generated it",
      "Tower's Read: a sharp analyst note on what the audience needs",
    ],
    outro:
      "The feed is ranked. Highest urgency, most recent, most unanswered - at the top.",
  },
  {
    id: 1,
    title: "MARKET DISCOVERY",
    number: "02",
    bodyTitle: "MARKET DISCOVERY",
    intro: "Find the market. Map the demand.",
    body:
      "Start with a keyword. Tower identifies the authoritative sources in that market - the accounts attracting the highest volume of questions from real people. It evaluates each one for relevance, clusters them into a coherent market space, and begins monitoring automatically.",
    listTitle: "What happens when you enter a keyword:",
    bullets: [
      "Tower finds relevant Instagram surfaces in that market",
      "Each surface is scored for authority and relevance",
      "Surfaces are grouped into a canonical market space",
      "Posts begin ingesting with inline comment data",
      "Signal analysis starts within minutes",
    ],
    outro: "No manual setup. No list-building. A keyword becomes an intelligence operation.",
  },
  {
    id: 2,
    title: "INTELLIGENCE LAYER",
    number: "03",
    bodyTitle: "INTELLIGENCE LAYER",
    intro: "Every post. Every signal. Prioritized.",
    body:
      "Tower doesn't process data in the order it arrives. It scores every post across every surface using a composite priority model - post recency, comment density, surface authority, and urgency signal concentration - and processes the highest value content first.",
    listTitle: "What the intelligence layer produces:",
    bullets: [
      "Tier classification for every post (how fresh, how active)",
      "Composite priority score across all surfaces simultaneously",
      "Post enrichment: average urgency, signal count, engagement rate",
      "Tower's Read: AI-generated analyst note per post",
      "Full signal chain from keyword to scored demand",
    ],
    outro:
      "The result is a ranked view of what your market urgently needs help with - right now, not last week.",
  },
] as const;

const SOLVING_WORDS = "Surface demand your competitors haven't found yet.".split(" ");

export default function Tower() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Navbar
        ctaLabel="Try Tower"
        ctaHref="#"
      />
      <main>
        <section className="tower-entry tower-entry--hero-only" aria-label="Tower">
          <div
            className="tower-hero-bg"
            style={{ backgroundImage: `url(${towerHeroBg})` }}
            aria-hidden
          />
          <div
            style={{
              position: "absolute",
              top: "max(74px, calc(var(--navbar-height) + 14px))",
              left: "var(--page-gutter-x)",
              zIndex: 1,
              display: "grid",
              gap: 10,
              color: "rgba(255,255,255,0.88)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <p style={{ margin: 0 }}>YOU ARE NOW ENTERING</p>
            <p style={{ margin: 0 }}>TIME: 3 MNS / SCROLL TO EXPLORE</p>
            <p style={{ margin: 0, maxWidth: 360 }}>MARKET INTELLIGENCE FOR PROFESSIONAL SERVICE FIRMS</p>
            <p style={{ margin: 0 }}>COPYRIGHT ©2026 APEX SYSTEMS INC.</p>
          </div>
          <div className="tower-hero-logo-wrap">
            <motion.img
              src={towerLogo}
              alt="Tower"
              className="tower-hero-logo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            <motion.p
              className="tower-hero-tagline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            >
              Find people already searching for help
            </motion.p>
          </div>
        </section>

        <section className="tower-overview" aria-labelledby="tower-overview-heading">
          <div className="tower-overview-inner">
            <motion.h2
              id="tower-overview-heading"
              className="tower-overview__title"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Go beyond referrals.
            </motion.h2>
            <motion.div
              className="tower-overview__body"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: 0.12 }}
            >
              <p>
                Demand Intelligence.
              </p>
              <p>
                Tower finds real people asking real questions in your market - before anyone else
                answers them.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="tower-tabs-section section">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2 variants={staggerItem}>What Tower Does</motion.h2>
            <motion.h3 variants={staggerItem}>Explore Tower</motion.h3>
          </motion.div>
          <motion.div
            className="tower-tabs-row"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: "flex" }}
          >
            {TABS.map((tab, idx) => (
              <motion.button
                key={tab.id}
                type="button"
                className={activeTab === idx ? "tower-tab active" : "tower-tab"}
                onClick={() => setActiveTab(idx)}
                variants={staggerItem}
                whileHover={{ borderColor: "rgba(255,255,255,0.6)" }}
                transition={{ delay: idx * 0.08 }}
              >
                <span>{tab.title}</span>
                <small>{tab.number}</small>
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="tower-tab-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4 }}
            >
              <p>{TABS[activeTab].bodyTitle}</p>
              <div className="tower-shot">
                <div className="tower-tab-copy">
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {TABS[activeTab].bodyTitle}
                  </p>
                  <p className="tower-tab-copy__intro">{TABS[activeTab].intro}</p>
                  <p className="tower-tab-copy__body">{TABS[activeTab].body}</p>
                  <p className="tower-tab-copy__list-title">{TABS[activeTab].listTitle}</p>
                  {TABS[activeTab].bullets.map((item) => (
                    <p key={item} className="tower-tab-copy__bullet">
                      — {item}
                    </p>
                  ))}
                  <p className="tower-tab-copy__outro">{TABS[activeTab].outro}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="tower-solving section">
          <motion.h2
            className="tower-solving-title"
            variants={wordReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: "block" }}
          >
            {SOLVING_WORDS.map((w) => (
              <span
                key={w}
                style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}
              >
                <motion.span
                  className="tower-solving-word"
                  style={{ display: "inline-block" }}
                  variants={wordItem}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 16 }}
          >
            <ArrowButton variant="outlined" label="See how it works" href="/contact" />
          </motion.div>
        </section>

        <IndustriesHomeCarousel />
      </main>
      <Footer />
    </>
  );
}
