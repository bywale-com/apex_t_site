import { useEffect, useState } from "react";

export default function TorontoClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const toronto = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(toronto);
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "20px 0",
        borderTop: "1px solid #E8E8E8",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "12px",
          color: "#888888",
          letterSpacing: "0.08em",
        }}
      >
        TORONTO
      </span>
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "13px",
          fontWeight: 500,
          color: "#333333",
          letterSpacing: "0.06em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}
      </span>
    </div>
  );
}
