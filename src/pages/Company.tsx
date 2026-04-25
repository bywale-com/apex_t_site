import { motion } from "framer-motion";
import { ArrowButton } from "../components/ArrowButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  fadeUp,
  scaleIn,
  slideInLeft,
  staggerContainer,
  staggerItem,
  viewportOnce,
  wordItem,
  wordReveal,
} from "../lib/motion";

const PEOPLE_TITLE = ["The", "people", "behind", "the", "engine"];

export default function Company() {
  return (
    <>
      <Navbar pageTag="COMPANY" />
      <main className="about-page">
        <section className="about-block bordered-block page-first-section section">
          <motion.h1
            className="about-hero-title"
            variants={wordReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: "inline" }}
          >
            {PEOPLE_TITLE.map((word) => (
              <span
                key={word}
                style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}
              >
                {word === "people" ? (
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={wordItem}
                    className="about-people-word"
                    animate={{ color: ["#ffffff", "rgba(255,255,255,0.7)"] }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <em>{word}</em>
                  </motion.span>
                ) : (
                  <motion.span style={{ display: "inline-block" }} variants={wordItem}>
                    {word}
                  </motion.span>
                )}
              </span>
            ))}
          </motion.h1>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p variants={fadeUp}>
              It takes a diverse crew to build a system this robust. We are a mix of Automation
              Architects who understand workflow, AI Engineers who understand models, and Go-to-Market
              operators who understand the field.
            </motion.p>
            <motion.p variants={fadeUp}>
              We are united by a shared curiosity — always building, always testing, and always trying
              to find a better way to solve the problem.
            </motion.p>
          </motion.div>
          <motion.p
            className="bold-line"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            We believe in open-source thinking. <em>Connect</em> with us to see what we are building
            and learning in real-time.
          </motion.p>
          <motion.div
            className="team-strip"
            role="list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: "flex" }}
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <motion.div
                key={idx}
                role="listitem"
                variants={staggerItem}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.04 }}
                style={{ minWidth: 240, height: 340, background: "#222" }}
              />
            ))}
          </motion.div>
        </section>

        <section className="about-block bordered-block section">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            How we got <em>here</em>
          </motion.h1>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p variants={staggerItem}>
              When we launched Apex, we began as an automation consultancy. We loved the craft. We saw
              firsthand how powerful workflow automation was for firms trying to scale without headcount.
            </motion.p>
            <motion.p variants={staggerItem}>
              But we also saw the gap. We realized that one-off automations were a game of hope. They
              solve today's problem but do not build a foundation. Our clients needed more than point
              solutions; they needed an operating system.
            </motion.p>
            <motion.p variants={staggerItem}>
              So we went into the lab. We spent years studying how the best firms in the world use AI —
              not as a chatbot, but as infrastructure. That became Apex. That became Tower.
            </motion.p>
          </motion.div>
        </section>

        <section className="orbital-section section">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="orbital-cta-wrap"
          >
            <ArrowButton variant="blue" label="Discover our solutions" prefix="+" />
          </motion.div>
          {/* TODO: Replace with final brand SVG */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="orbital-svg-wrap"
          >
            <svg viewBox="0 0 900 600" className="orbital-svg" role="img" aria-label="Orbital diagram">
              <g transform="translate(450,300) rotate(-20)">
                <motion.ellipse
                  cx={0}
                  cy={0}
                  rx={340}
                  ry={160}
                  className="orbit-line"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                  viewport={viewportOnce}
                />
                <motion.ellipse
                  cx={0}
                  cy={0}
                  rx={260}
                  ry={120}
                  className="orbit-line"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
                  viewport={viewportOnce}
                />
                <motion.ellipse
                  cx={0}
                  cy={0}
                  rx={180}
                  ry={80}
                  className="orbit-line"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.8 }}
                  viewport={viewportOnce}
                />
                <motion.path
                  d="M0 -24 L10 -10 L24 0 L10 10 L0 24 L-10 10 L-24 0 L-10 -10 Z"
                  fill="#F5E6C8"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                  viewport={viewportOnce}
                />
                <motion.circle
                  cx={330}
                  cy={0}
                  r={6}
                  fill="#fff"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  viewport={viewportOnce}
                />
                <motion.text x={345} y={5} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.4 }} viewport={viewportOnce}>Capture</motion.text>
                <motion.circle cx={220} cy={95} r={6} fill="#fff" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.6 }} viewport={viewportOnce} />
                <motion.text x={235} y={100} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.6 }} viewport={viewportOnce}>Amplify</motion.text>
                <motion.circle cx={135} cy={72} r={6} fill="#fff" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.8 }} viewport={viewportOnce} />
                <motion.text x={150} y={77} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.8 }} viewport={viewportOnce}>Create</motion.text>
              </g>
            </svg>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
