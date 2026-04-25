import { MouseEventHandler } from "react";

export interface ArrowButtonProps {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant: "dark" | "light" | "blue" | "outlined";
  size?: "sm" | "md" | "lg";
  prefix?: string;
}

export function ArrowButton({
  label,
  href,
  onClick,
  variant,
  size = "md",
  prefix,
}: ArrowButtonProps) {
  const className = `arrow-btn arrow-btn-${variant} arrow-btn-${size}`;
  const content = (
    <>
      <span className="arrow-btn-text">
        {prefix ? `${prefix} ` : ""}
        {label}
      </span>
      <span className="arrow-btn-icon" aria-hidden="true">
        ↗
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}
