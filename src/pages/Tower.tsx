import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowButton } from "../components/ArrowButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fadeIn, fadeUp, staggerContainer, staggerItem, viewportOnce, wordItem, wordReveal } from "../lib/motion";

const TABS = [
  {
    id: 0,
    title: "AI APP",
    number: "01",
    body: "AI reviews alerts and automatically proposes resolutions.",
  },
  {
    id: 1,
    title: "ACTION-DRIVEN LOGIC",
    number: "02",
    body: "Rules and APIs turn decisions into system-level execution.",
  },
  {
    id: 2,
    title: "AUTOMATION",
    number: "03",
    body: "Workflows run end-to-end with auditable, repeatable delivery.",
  },
] as const;

const SOLVING_WORDS = "Solving complex problems across all industries in days, not years.".split(" ");

export default function Tower() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Navbar
        pageTag={"PRODUCTS\n/TOWER"}
        ctaLabel="Try Tower"
        ctaHref="https://tower.apexsystems.ai"
      />
      <main>
        <section className="tower-entry">
          <div className="tower-entry-grid">
            <motion.div
              className="tower-left-stack"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                "YOU ARE NOW ENTERING",
                "TIME: 3 MNS / SCROLL TO EXPLORE",
                "THE OPERATING SYSTEM FOR IMMIGRATION FIRMS",
                "COPYRIGHT ©2026 APEX SYSTEMS INC.",
              ].map((line) => (
                <motion.p key={line} variants={staggerItem}>
                  {line}
                </motion.p>
              ))}
            </motion.div>
            <div className="tower-right">
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 1, letterSpacing: "-0.02em" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                TOWER
              </motion.h1>
              <div className="letter-boxes">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={i === 2 ? "letter-box striped" : "letter-box"}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="tower-beyond-chat section">
          <motion.h2
            className="tower-bc-line1"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            Go beyond chat.
          </motion.h2>
          <motion.h2
            className="gradient-title gradient-title--motion"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
          >
            Enterprise Autonomy
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.4 }}
          >
            Turn AI in your Applications into Agents and Automations
          </motion.p>
        </section>

        <section className="tower-tabs-section section">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2 variants={staggerItem}>Beyond Chat</motion.h2>
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
              <p>{TABS[activeTab].title}</p>
              <div className="tower-shot">
                <i />
                <i />
                <i />
                <span>{TABS[activeTab].body}</span>
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
            <ArrowButton variant="outlined" label="See case studies" />
          </motion.div>
        </section>

        <section className="tower-industries section">
          {/* USE EXISTING INDUSTRIES COMPONENT */}
          <p>Industries component — reuse from main site</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
