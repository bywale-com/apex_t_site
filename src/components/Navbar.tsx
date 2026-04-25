import { ArrowButton } from "./ArrowButton";

export interface NavbarProps {
  pageTag?: string;
  ctaLabel?: string;
  ctaHref?: string;
  theme?: "dark" | "light";
}

export default function Navbar({
  pageTag,
  ctaLabel = "Get in Touch",
  ctaHref = "/contact",
  theme = "dark",
}: NavbarProps) {
  const navClass = theme === "light" ? "navbar navbar-light" : "navbar";

  return (
    <header className={navClass}>
      {/* TODO: Replace navbar background gradient with final dark atmospheric image */}
      <div className="navbar-bg" />
      <div className="navbar-inner">
        <a href="/" className="navbar-brand">
          <span className="logo-grid" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>Apex</span>
        </a>
        <div className="navbar-actions">
          <ArrowButton label={ctaLabel} href={ctaHref} variant="dark" size="sm" />
          <button className="nav-icon" aria-label="Search">
            ⌕
          </button>
          <button className="nav-icon" aria-label="Menu">
            ≡
          </button>
        </div>
      </div>

      {pageTag ? (
        <div className="page-tag" aria-label="Page context tag">
          {pageTag.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      ) : null}

      <div className="mobile-bottom-nav">
        <button className="mobile-menu-btn" aria-label="Menu">
          ≡
        </button>
        <div className="mobile-cta-wrap">
          <ArrowButton label={ctaLabel} href={ctaHref} variant="dark" size="md" />
        </div>
      </div>
    </header>
  );
}
