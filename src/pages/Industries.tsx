import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";
import specialty1Img from "../assets/stock/industries-specialty-1.jpg";
import specialty2Img from "../assets/stock/industries-specialty-2.jpg";
import specialty3Img from "../assets/stock/industries-specialty-3.jpg";
import specialty4Img from "../assets/stock/industries-specialty-4.jpg";
import specialty5Img from "../assets/stock/industries-specialty-5.jpg";

const industries = [
  {
    id: "immigration",
    name: "Immigration Law",
    body: "Immigration consulting firms run on precision and speed. Every missed call, delayed document, or slow follow-up is a client that calls the next firm. We automate the coordination layer - so your consultants spend their time on cases, not logistics.",
    bgGradient: "linear-gradient(135deg, #0a1628 0%, #1a2d1a 100%)",
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    body: "Finance firms carry high client volume against tight compliance requirements. Our workflows handle onboarding, document collection, and status communication - reducing manual overhead without changing how you advise.",
    bgGradient: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)",
  },
  {
    id: "insurance",
    name: "Insurance",
    body: "Insurance brokerages live and die by response time. We build the infrastructure that ensures every lead is contacted, every renewal is flagged, and every client feels handled - without someone having to remember to do it.",
    bgGradient: "linear-gradient(135deg, #1a0a0a 0%, #2d1a0d 100%)",
  },
  {
    id: "consulting",
    name: "Consulting",
    body: "Independent consultants are the last to get operational infrastructure - and the first to feel the cost of not having it. We give boutique practices the same automation leverage as firms ten times their size.",
    bgGradient: "linear-gradient(135deg, #0a0a1a 0%, #1a0d2d 100%)",
  },
] as const;

const specialties = [
  {
    id: 0,
    name: "Workflow Orchestration",
    num: "01",
    image: specialty1Img,
    imageBg: "#1a1a2e",
  },
  {
    id: 1,
    name: "Intake Automation",
    num: "02",
    image: specialty2Img,
    imageBg: "#0d1a0d",
  },
  {
    id: 2,
    name: "Document Management",
    num: "03",
    image: specialty3Img,
    imageBg: "#2e1a0d",
  },
  {
    id: 3,
    name: "Client Communication",
    num: "04",
    image: specialty4Img,
    imageBg: "#1a0d2e",
  },
  {
    id: 4,
    name: "Reporting & Analytics",
    num: "05",
    image: specialty5Img,
    imageBg: "#0d1a2e",
  },
] as const;

const staticBody =
  "We go into a firm's operations and find where time is being traded for tasks that shouldn't require human judgment. Then we build systems that handle those tasks automatically - so the humans can do the work only humans can do.";

gsap.registerPlugin(ScrollTrigger);

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSpecialty, setActiveSpecialty] = useState(0);
  const heroScrollWrapRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const heroScrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Scroll length = outer `minHeight`; hero is `position: fixed` in CSS (body `overflow-x: hidden` breaks `sticky`).
  // ScrollTrigger maps scroll progress → active industry.
  useLayoutEffect(() => {
    const wrap = heroScrollWrapRef.current;
    if (!wrap) return;

    ScrollTrigger.getById("industries-hero-st")?.kill();

    const ctx = gsap.context(() => {
      const totalIndustries = industries.length;

      const st = ScrollTrigger.create({
        id: "industries-hero-st",
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const newIndex = Math.min(
            Math.floor(self.progress * totalIndustries),
            totalIndustries - 1,
          );
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        },
      });
      heroScrollTriggerRef.current = st;
    }, wrap);

    const refresh = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    refresh();
    window.addEventListener("load", refresh);
    const ro = new ResizeObserver(refresh);
    ro.observe(wrap);

    return () => {
      window.removeEventListener("load", refresh);
      ro.disconnect();
      heroScrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const scrollHeroToIndustry = (index: number) => {
    const st = heroScrollTriggerRef.current;
    const total = industries.length;
    if (!st || total <= 1) {
      setActiveIndex(index);
      activeIndexRef.current = index;
      return;
    }
    const progress = (index + 0.5) / total;
    const y = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div
        ref={heroScrollWrapRef}
        className="industries-hero-sticky-outer"
        style={{ minHeight: `${industries.length * 100}vh` }}
      >
      <div
        className="industries-hero industries-hero--sticky"
        role="region"
        aria-label="Industries we serve"
      >
        {/* Solid layer + direct style (no exit/enter gap) — AnimatePresence+wait left the body visible = white flash */}
        <div
          className="industries-hero-bg"
          style={{ background: industries[activeIndex].bgGradient }}
          aria-hidden
        />
        <div className="industries-hero-dim" aria-hidden />

        <div className="industries-hero-content">
          <div className="industries-name-row">
            <div className="industries-name-active-wrap">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={industries[activeIndex].id}
                  className="industries-h2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={industries[activeIndex].id}
                className="industries-body-text"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                onClick={() => scrollHeroToIndustry(i)}
              />
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className="industries-below-hero">
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
                    background: specialties[activeSpecialty].imageBg,
                    backgroundImage: `url(${specialties[activeSpecialty].image})`,
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
      </div>
    </>
  );
}
