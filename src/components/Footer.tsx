import { ArrowButton } from "./ArrowButton";
import { Link, useLocation } from "react-router-dom";
import { usePreloader } from "../context/PreloaderContext";

export default function Footer() {
  const location = useLocation();
  const { playPreloader } = usePreloader();
  return (
    <footer className="site-footer">
      <div className="footer-cta-grid">
        <div>
          <h2>The firms that move faster, win.</h2>
          <p>
            We work with professional service firms to identify where process friction is costing
            them - and build the infrastructure to fix it. Start with a conversation.
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
            Apex is a workflow orchestration and automation studio. We study how professional
            service firms operate, identify where friction lives, and build systems that eliminate
            it - permanently.
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
          <Link
            to="/"
            state={location.pathname === "/" ? undefined : { playPreloader: true }}
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                playPreloader();
              }
            }}
          >
            Home
          </Link>
          <Link to="/products/tower">Tower</Link>
          <Link to="/products/tower">Solutions</Link>
          <Link to="/industries">Industries</Link>
        </div>

        <div>
          <p className="footer-label">COMPANY</p>
          <Link to="/company">Company</Link>
          <Link to="/contact">Careers</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/news">News</Link>
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
