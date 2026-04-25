import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowButton } from "../components/ArrowButton";

export default function About() {
  return (
    <>
      <Navbar pageTag="ABOUT" />
      <main className="about-page">
        <section className="about-block bordered-block">
          <h1>
            The <em>people</em> behind the engine
          </h1>
          <p>
            It takes a diverse crew to build a system this robust. We are a mix of Automation
            Architects who understand workflow, AI Engineers who understand models, and Go-to-Market
            operators who understand the field.
          </p>
          <p>
            We are united by a shared curiosity — always building, always testing, and always trying
            to find a better way to solve the problem.
          </p>
          <p className="bold-line">
            We believe in open-source thinking. <em>Connect</em> with us to see what we are building
            and learning in real-time.
          </p>
          <div className="team-strip">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} />
            ))}
          </div>
        </section>

        <section className="about-block bordered-block">
          <h1>
            How we got <em>here</em>
          </h1>
          <p>
            When we launched Apex, we began as an automation consultancy. We loved the craft. We saw
            firsthand how powerful workflow automation was for firms trying to scale without
            headcount.
          </p>
          <p>
            But we also saw the gap. We realized that one-off automations were a game of hope. They
            solve today's problem but do not build a foundation. Our clients needed more than point
            solutions; they needed an operating system.
          </p>
          <p>
            So we went into the lab. We spent years studying how the best firms in the world use AI
            — not as a chatbot, but as infrastructure. That became Apex. That became Tower.
          </p>
        </section>

        <section className="orbital-section">
          <ArrowButton variant="blue" label="Discover our solutions" prefix="+" />
          {/* TODO: Replace with final brand SVG */}
          <svg viewBox="0 0 900 600" className="orbital-svg" role="img" aria-label="Orbital diagram">
            <g transform="translate(450,300) rotate(-20)">
              <ellipse rx="340" ry="160" className="orbit-line" />
              <ellipse rx="260" ry="120" className="orbit-line" />
              <ellipse rx="180" ry="80" className="orbit-line" />
              <path d="M0 -24 L10 -10 L24 0 L10 10 L0 24 L-10 10 L-24 0 L-10 -10 Z" fill="#F5E6C8" />
              <circle cx="330" cy="0" r="6" fill="#fff" />
              <text x="345" y="5">Capture</text>
              <circle cx="220" cy="95" r="6" fill="#fff" />
              <text x="235" y="100">Amplify</text>
              <circle cx="135" cy="72" r="6" fill="#fff" />
              <text x="150" y="77">Create</text>
            </g>
          </svg>
        </section>
      </main>
      <Footer />
    </>
  );
}
