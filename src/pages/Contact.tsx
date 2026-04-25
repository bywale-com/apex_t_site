import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowButton } from "../components/ArrowButton";

export default function Contact() {
  return (
    <>
      <Navbar pageTag="CONTACT" />
      <main>
        <section className="contact-hero">
          <h1>
            LET'S
            <br />
            TALK<span className="purple-dot">.</span>
          </h1>
          <p>
            Need a workflow audit? Want to integrate Tower into your stack? Or just want to see what
            is possible? We read every message.
          </p>

          <div className="contact-meta">
            <p className="contact-label">DIRECT CONTACT</p>
            <h3>info@apexsystems.ai</h3>
            <small>Toronto, Canada</small>
          </div>

          <div className="contact-meta">
            <p className="contact-label">SKIP THE EMAIL</p>
            <ArrowButton variant="dark" label="BOOK A STRATEGY CALL" size="lg" />
          </div>
        </section>

        <section className="contact-form-wrap">
          <h2>GOT A QUESTION?</h2>
          <hr />
          <form className="contact-form">
            <label>
              NAME
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              EMAIL
              <input type="email" placeholder="you@company.com" />
            </label>
            <label>
              MESSAGE
              <textarea placeholder="Tell us about your goals" />
            </label>
            <ArrowButton variant="dark" label="SEND MESSAGE" size="lg" />
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
