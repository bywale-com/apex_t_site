import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionLabel from "../components/SectionLabel";
import WarningChip from "../components/WarningChip";
import { ArrowButton } from "../components/ArrowButton";

export default function Home() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="home-hero">
          {/* TODO: Replace hero gradient with final server-room image */}
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>AI-Powered Automation for Every Decision</h1>
            <span className="hero-arrow">↓</span>
            <p>Scroll to Explore</p>
          </div>
        </section>

        <section className="pain-points">
          <div className="pain-layout">
            <div className="pain-chip chip-1">
              <WarningChip text="Slow decisions hurting customer experience" />
            </div>
            <h2>
              We recognize the challenges you face. That is why your path to impact with AI starts
              here.
            </h2>
            <div className="pain-chip chip-2">
              <WarningChip text="Scaling by adding extra headcount" />
            </div>
            <div className="pain-chip chip-3">
              <WarningChip text="Technology spend without measurable ROI" />
            </div>
          </div>
        </section>

        <section className="our-software">
          <div className="software-top">
            <p>
              Our software powers real-time, <em>AI-driven</em> decisions in professional services
              firms.
            </p>
          </div>
          <p className="software-label">Our Software</p>
          <div className="software-strip">
            <article className="software-card">
              <aside>
                <p>AI orchestration system for high-volume operational workflows.</p>
                <span>/0.1</span>
              </aside>
              <div className="software-shot" />
              <h3>TOWER</h3>
              <button aria-label="Open product">→</button>
            </article>
          </div>
        </section>

        <section className="social-proof-home">
          <div className="social-top">
            <h2>
              Proven with firms that trusted us in <em>guiding</em> their operations
            </h2>
            <ArrowButton variant="dark" label="Explore our cases" prefix="+" />
          </div>
          <div className="social-strip">
            {Array.from({ length: 5 }).map((_, index) => (
              <article key={index}>
                <div />
                <p>FIRM NAME</p>
              </article>
            ))}
          </div>
        </section>

        <section className="insights-home">
          <div className="insights-top">
            <div>
              <SectionLabel label="/NEWS" />
              <h2>Latest insights</h2>
            </div>
            <ArrowButton variant="outlined" label="Discover more" />
          </div>
          <div className="insights-grid">
            <article className="featured-article">
              <div className="article-image" />
              <p>
                <span>■ INSIGHTS</span>
                <span>/MAR 31, 2026</span>
              </p>
              <h3>Apex builds the infrastructure. Firms make the decisions.</h3>
              <small>
                How orchestration systems are replacing point automation and creating durable AI
                operating models.
              </small>
            </article>
            <article>
              <div className="article-image" />
              <p>
                <span>■ INSIGHTS</span>
                <span>/APR 02, 2026</span>
              </p>
              <h3>How top firms deploy agentic workflows responsibly</h3>
              <small>Practical patterns used to implement automation with governance.</small>
            </article>
            <article>
              <div className="article-image" />
              <p>
                <span>■ INSIGHTS</span>
                <span>/APR 05, 2026</span>
              </p>
              <h3>From intake to case file: where AI matters most</h3>
              <small>Mapping the highest leverage decision points in service operations.</small>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
