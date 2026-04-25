import { ArrowButton } from "./ArrowButton";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta-grid">
        <div>
          <h2>Shockingly good AI starts here.</h2>
          <p>
            Our experts are always happy to discuss your opportunities. Reach out, and we will
            connect you with a member of our team.
          </p>
        </div>
        <div className="footer-cta-action">
          <ArrowButton label="Start the Conversation" variant="light" size="lg" href="/contact" />
        </div>
      </div>

      <hr />

      <div className="footer-links-grid">
        <div>
          <p className="footer-label">ABOUT APEX</p>
          <p className="footer-copy">
            Apex builds AI orchestration systems for enterprise workflows. We design, build, and
            operate intelligent automation for organizations across industries.
          </p>
          <p className="footer-label">EMAIL</p>
          <a href="mailto:info@apexsystems.ai">info@apexsystems.ai</a>
          <p className="footer-label">OFFICE</p>
          <p className="footer-copy">Toronto, Canada</p>
          <p className="footer-label">CONNECT</p>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>

        <div>
          <p className="footer-label">NAVIGATION</p>
          <a href="/">Home</a>
          <a href="/products/tower">Products</a>
          <a href="/">Solutions</a>
          <a href="/">Case Studies</a>
        </div>

        <div>
          <p className="footer-label">COMPANY</p>
          <a href="/about">Company</a>
          <a href="/">Careers</a>
          <a href="/contact">Contact</a>
          <a href="/">News</a>
        </div>

        <div>
          <p className="footer-label">LEGAL</p>
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Responsible AI</a>
          <a href="/">Legal</a>
        </div>
      </div>
    </footer>
  );
}
