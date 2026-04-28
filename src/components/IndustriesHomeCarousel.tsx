import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowButton } from "./ArrowButton";
import { fadeUp, slideInRight, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const INDUSTRIES_CAROUSEL_MS = 5000;

const INDUSTRY_CARDS = [
  {
    name: "IMMIGRATION LAW",
    quote:
      "The intake process used to be a bottleneck. Now it runs itself. New inquiries are handled, qualified, and followed up before we even look at our phones.",
  },
  {
    name: "FINANCE & ACCOUNTING",
    quote:
      "Client onboarding went from a three-day email chain to a same-day handoff. We didn't hire anyone. We just stopped doing it manually.",
  },
  {
    name: "INSURANCE",
    quote:
      "Renewal season used to mean three weeks of chasing. Now it's a workflow. Our retention numbers went up and nobody had to remember to follow up.",
  },
  {
    name: "CONSULTING",
    quote:
      "Clients now arrive to the first consultation having already submitted everything we need. The preparation work happens automatically. We just show up ready.",
  },
  {
    name: "PROFESSIONAL SERVICES",
    quote:
      "Speed is the differentiator nobody talks about. Apex gave us the infrastructure to move faster than firms twice our size.",
  },
] as const;

export type IndustriesHomeCarouselProps = {
  /** Main heading (default matches the home page). */
  heading?: string;
  /** CTA after the strip (default: “Explore Industries” → /industries). */
  exploreCtaLabel?: string;
  exploreCtaTo?: string;
  /** `aria-label` for the whole section. */
  ariaLabel?: string;
};

export default function IndustriesHomeCarousel({
  heading = "Built for the firms that can't afford to slow down.",
  exploreCtaLabel = "Explore Industries",
  exploreCtaTo = "/industries",
  ariaLabel = "Industries testimonials",
}: IndustriesHomeCarouselProps) {
  const navigate = useNavigate();
  const [activeIndustry, setActiveIndustry] = useState(0);
  const industryStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndustry((i) => (i + 1) % INDUSTRY_CARDS.length);
    }, INDUSTRIES_CAROUSEL_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const strip = industryStripRef.current;
    if (!strip) return;
    const card = strip.children[activeIndustry] as HTMLElement | undefined;
    if (!card) return;
    strip.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, [activeIndustry]);

  const goToIndustry = (index: number) => {
    setActiveIndustry(index);
  };

  return (
    <section className="industries-home-carousel" aria-label={ariaLabel}>
      <div className="industries-home-top">
        <motion.h2
          className="industries-home-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {heading}
        </motion.h2>
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
        >
          <ArrowButton
            variant="dark"
            label={exploreCtaLabel}
            prefix="+"
            onClick={() => navigate(exploreCtaTo)}
          />
        </motion.div>
      </div>
      <motion.div
        ref={industryStripRef}
        className="industries-home-strip"
        role="list"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {INDUSTRY_CARDS.map((ind) => (
          <motion.article
            key={ind.name}
            role="listitem"
            variants={staggerItem}
            className="industry-card-home"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <p className="industry-card-home__name">{ind.name}</p>
            <p className="industry-card-home__quote">{ind.quote}</p>
          </motion.article>
        ))}
      </motion.div>
      <div
        className="industries-home-progress"
        role="tablist"
        aria-label="Industries carousel position"
      >
        {INDUSTRY_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`product-progress-segment${activeIndustry === i ? " active" : ""}`}
            onClick={() => goToIndustry(i)}
            aria-label={`Show industry card ${i + 1}`}
          >
            {activeIndustry === i ? (
              <motion.div
                key={i}
                className="product-progress-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INDUSTRIES_CAROUSEL_MS / 1000, ease: "linear" }}
              />
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
