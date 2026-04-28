import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type ChipData = {
  id: number;
  text: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startXm: number;
  startYm: number;
  endXm: number;
  endYm: number;
  labelShort: string;
};

const CHIPS: ChipData[] = [
  {
    id: 0,
    text: "Slow decisions hurting customer experience",
    startX: 62,
    startY: 12,
    endX: 78,
    endY: 28,
    startXm: 10,
    startYm: 18,
    endXm: 58,
    endYm: 64,
    labelShort: "Slow decisions",
  },
  {
    id: 1,
    text: "Scaling by adding extra headcount",
    startX: 8,
    startY: 44,
    endX: 68,
    endY: 52,
    startXm: 8,
    startYm: 32,
    endXm: 38,
    endYm: 70,
    labelShort: "Extra headcount",
  },
  {
    id: 2,
    text: "Technology spend without measurable ROI",
    startX: 58,
    startY: 72,
    endX: 72,
    endY: 62,
    startXm: 52,
    startYm: 32,
    endXm: 72,
    endYm: 70,
    labelShort: "Unmeasured spend",
  },
];

const HEADLINE =
  "We recognize the challenges you face. That is why your path to impact with AI starts here.";

function useNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches,
  );
  const onResize = useCallback(() => {
    setNarrow(window.matchMedia("(max-width: 768px)").matches);
  }, []);
  useEffect(() => {
    onResize();
    const mq = window.matchMedia("(max-width: 768px)");
    mq.addEventListener("change", onResize);
    return () => mq.removeEventListener("change", onResize);
  }, [onResize]);
  return narrow;
}

type SolarChipProps = {
  chip: ChipData;
  chipOpacity: MotionValue<number>;
  chipMigrationProgress: MotionValue<number>;
  labelOpacity: MotionValue<number>;
  narrow: boolean;
};

function SolarChip({
  chip,
  chipOpacity,
  chipMigrationProgress,
  labelOpacity,
  narrow,
}: SolarChipProps) {
  const sx = narrow ? chip.startXm : chip.startX;
  const sy = narrow ? chip.startYm : chip.startY;
  const ex = narrow ? chip.endXm : chip.endX;
  const ey = narrow ? chip.endYm : chip.endY;

  const chipXn = useTransform(chipMigrationProgress, [0, 1], [sx, ex], { clamp: true });
  const chipYn = useTransform(chipMigrationProgress, [0, 1], [sy, ey], { clamp: true });
  const chipLeft = useTransform(chipXn, (v) => `${v}%`);
  const chipTop = useTransform(chipYn, (v) => `${v}%`);
  const chipScale = useTransform(chipMigrationProgress, [0, 0.6], [1, 0], { clamp: true });
  const dotScale = useTransform(chipMigrationProgress, [0.4, 1], [0, 1], { clamp: true });

  return (
    <motion.div
      className="pain-solar-chip-wrap"
      style={{
        position: "absolute",
        left: chipLeft,
        top: chipTop,
        x: "-50%",
        y: "-50%",
        opacity: chipOpacity,
        zIndex: 4,
        pointerEvents: "none",
      }}
    >
      <motion.div
        className="pain-solar-chip"
        style={{
          scale: chipScale,
          transformOrigin: "center center",
          background: "#F5F5F5",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "280px",
          maxWidth: "min(280px, 86vw)",
          whiteSpace: "normal" as const,
        }}
      >
        <span style={{ color: "#F5A623", fontSize: "16px", flexShrink: 0 }} aria-hidden>
          ⚠
        </span>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "14px",
            color: "#333333",
            lineHeight: 1.4,
          }}
        >
          {chip.text}
        </span>
      </motion.div>

      <motion.div
        className="pain-solar-node-dot"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          scale: dotScale,
          width: 8,
          height: 8,
          background: "#FFFFFF",
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.4)",
          transformOrigin: "center center",
        }}
      />
      <motion.span
        className="pain-solar-node-label"
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          y: "-50%",
          opacity: labelOpacity,
          fontFamily: "var(--font-primary)",
          fontSize: "11px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.7)",
          marginLeft: 12,
          whiteSpace: "nowrap",
        }}
      >
        {chip.labelShort}
      </motion.span>
    </motion.div>
  );
}

export default function PainPointsSolarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const narrow = useNarrow();

  // Raw 0→1 tracks the full section. Remap to `scene` so Phases 1–3 finish in the first ~45%
  // of the section’s scroll; the rest of the section scroll = Phase 3 hold (avoids “nothing happens
  // until I’m halfway down the text”).
  const { scrollYProgress: rawScroll } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end start"],
  });

  const scene = useTransform(rawScroll, [0, 0.45], [0, 1], { clamp: true });

  const chip1Opacity = useTransform(scene, [0, 0.12], [0, 1], { clamp: true });
  const chip2Opacity = useTransform(scene, [0.12, 0.24], [0, 1], { clamp: true });
  const chip3Opacity = useTransform(scene, [0.24, 0.36], [0, 1], { clamp: true });
  const headlineOpacity = useTransform(scene, [0.08, 0.28], [0, 1], { clamp: true });
  const headlineY = useTransform(scene, [0.08, 0.28], [40, 0], { clamp: true });
  const orbitalProgress = useTransform(scene, [0.4, 0.72], [0, 1], { clamp: true });
  const chipMigrationProgress = useTransform(
    scene,
    [0.45, 0.75],
    [0, 1],
    { clamp: true },
  );
  const orbitalPanelOpacity = useTransform(orbitalProgress, [0, 0.2], [0, 1], { clamp: true });
  const labelOpacity = useTransform(chipMigrationProgress, [0.85, 1], [0, 1], { clamp: true });
  const orbitalGroupOpacity = useTransform(orbitalProgress, [0, 0.1], [0, 1], { clamp: true });

  const outerPath = useTransform(orbitalProgress, [0, 0.4], [0, 1], { clamp: true });
  const midPath = useTransform(orbitalProgress, [0.15, 0.8], [0, 1], { clamp: true });
  const innerPath = useTransform(orbitalProgress, [0.3, 1.0], [0, 1], { clamp: true });
  const outerStOpacity = useTransform(orbitalProgress, [0, 0.15], [0, 1], { clamp: true });
  const midStOpacity = useTransform(orbitalProgress, [0.15, 0.3], [0, 1], { clamp: true });
  const innerStOpacity = useTransform(orbitalProgress, [0.3, 0.45], [0, 1], { clamp: true });
  const starOpacity = useTransform(orbitalProgress, [0.6, 0.85], [0, 1], { clamp: true });
  const starScale = useTransform(orbitalProgress, [0.6, 0.85], [0.4, 1], { clamp: true });

  return (
    <section
      ref={sectionRef}
      className="pain-solar"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "220vh",
        background: "#FFFFFF",
      }}
    >
      <div
        className="pain-solar__sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <motion.div
          className={narrow ? "pain-solar__dark pain-solar__dark--mobile" : "pain-solar__dark"}
          style={{ opacity: orbitalPanelOpacity }}
        />

        <motion.div
          className={
            narrow ? "pain-solar__orbital pain-solar__orbital--mobile" : "pain-solar__orbital"
          }
          style={{ opacity: orbitalGroupOpacity }}
        >
          <svg
            viewBox="0 0 600 500"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", display: "block", overflow: "visible" as const }}
            aria-hidden
          >
            <motion.ellipse
              cx="300"
              cy="250"
              rx="260"
              ry="110"
              transform="rotate(-22 300 250)"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              style={{
                pathLength: outerPath,
                opacity: outerStOpacity,
              }}
            />
            <motion.ellipse
              cx="300"
              cy="250"
              rx="190"
              ry="78"
              transform="rotate(-22 300 250)"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1"
              style={{
                pathLength: midPath,
                opacity: midStOpacity,
              }}
            />
            <motion.ellipse
              cx="300"
              cy="250"
              rx="120"
              ry="48"
              transform="rotate(-22 300 250)"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              style={{
                pathLength: innerPath,
                opacity: innerStOpacity,
              }}
            />
            <motion.g
              style={{
                opacity: starOpacity,
                scale: starScale,
                transformOrigin: "300px 250px",
              }}
            >
              <path
                d="M300,230 C300,230 306,243 320,250 C306,257 300,270 300,270 C300,270 294,257 280,250 C294,243 300,230 300,230 Z"
                fill="#F5E6C8"
              />
            </motion.g>
          </svg>
        </motion.div>

        <motion.div
          className={
            narrow ? "pain-solar__headline pain-solar__headline--mobile" : "pain-solar__headline"
          }
          style={
            narrow
              ? { opacity: headlineOpacity }
              : { opacity: headlineOpacity, y: headlineY }
          }
        >
          <h2
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.2,
            }}
          >
            {HEADLINE}
          </h2>
        </motion.div>

        <SolarChip
          chip={CHIPS[0]!}
          chipOpacity={chip1Opacity}
          chipMigrationProgress={chipMigrationProgress}
          labelOpacity={labelOpacity}
          narrow={narrow}
        />
        <SolarChip
          chip={CHIPS[1]!}
          chipOpacity={chip2Opacity}
          chipMigrationProgress={chipMigrationProgress}
          labelOpacity={labelOpacity}
          narrow={narrow}
        />
        <SolarChip
          chip={CHIPS[2]!}
          chipOpacity={chip3Opacity}
          chipMigrationProgress={chipMigrationProgress}
          labelOpacity={labelOpacity}
          narrow={narrow}
        />
      </div>
    </section>
  );
}
