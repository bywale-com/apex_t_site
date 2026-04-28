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
const TEAM_IMAGES = [
  "/images/company_photos_1.jpg",
  "/images/company_photos_2.jpg",
  "/images/company_photos_3.jpg",
  "/images/company_photos_4.jpg",
  "/images/company_photos_5.jpg",
  "/images/company_photos_6.jpg",
] as const;

export default function Company() {
  return (
    <>
      <Navbar />
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
              It takes a specific kind of crew to do this work well. We are a mix of process analysts
              who understand how firms actually operate, engineers who understand how to automate without
              breaking things, and operators who have sat in the seat of the people we build for.
            </motion.p>
            <motion.p variants={fadeUp}>
              We are united by one conviction: that the firms doing the most important work should not
              be the ones drowning in the most administrative overhead.
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
            We think out loud. <em>Connect</em> with us to see what we are building, what is working,
            and what we are still figuring out.
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
            {TEAM_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                role="listitem"
                variants={staggerItem}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.04 }}
                style={{
                  minWidth: 240,
                  height: 340,
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
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
              Apex started as a question: why do the most skilled professionals spend so much of their
              time on work that does not require their skill? We started working inside professional
              service firms and the answer was always the same - the process had not been designed, it
              had just accumulated.
            </motion.p>
            <motion.p variants={staggerItem}>
              Point automations helped. But they kept breaking, kept needing maintenance, and kept
              solving yesterday's version of the problem. What firms actually needed was not a tool. It
              was an operating model - something that could absorb new complexity without requiring a
              rebuild every six months.
            </motion.p>
            <motion.p variants={staggerItem}>
              So we started building the infrastructure layer instead. Systems that do not just automate
              tasks but orchestrate entire workflows - intake to close, inquiry to decision, question to
              answer. That is what Apex is. That is what Tower is the first product of.
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
            <ArrowButton variant="blue" label="Discover our solutions" prefix="+" href="/contact" />
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
