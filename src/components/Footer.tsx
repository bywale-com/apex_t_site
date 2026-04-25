import { ArrowButton } from "./ArrowButton";
import { Link } from "react-router-dom";

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
          <Link to="/">Home</Link>
          <Link to="/products/tower">Products</Link>
          <Link to="/products/tower">Solutions</Link>
          <Link to="/about">Case Studies</Link>
        </div>

        <div>
          <p className="footer-label">COMPANY</p>
          <Link to="/about">Company</Link>
          <Link to="/contact">Careers</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/">News</Link>
        </div>

        <div>
          <p className="footer-label">LEGAL</p>
          <Link to="/contact">Terms of Service</Link>
          <Link to="/contact">Privacy Policy</Link>
          <Link to="/contact">Responsible AI</Link>
          <Link to="/contact">Legal</Link>
        </div>
      </div>
    </footer>
  );
}
