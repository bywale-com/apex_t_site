import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

export interface ArrowButtonProps {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant: "dark" | "light" | "blue" | "outlined";
  size?: "sm" | "md" | "lg";
  prefix?: string;
}

const parentVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
} as const;

const iconVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: 2, y: -2 },
} as const;

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
      <motion.span
        className="arrow-btn-icon"
        aria-hidden
        variants={iconVariants}
        transition={{ duration: 0.2 }}
      >
        ↗
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        onClick={onClick}
        variants={parentVariants}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      variants={parentVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.button>
  );
}
