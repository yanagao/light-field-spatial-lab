import { type PointerEvent, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { labs } from "../data/content";
import { useSpatialStore } from "../state/useSpatialStore";
import type { LabId } from "../types";

const sourcePositions: Record<LabId, { x: string; y: string; className: string }> = {
  ai: { x: "24%", y: "28%", className: "source-ai" },
  craft: { x: "72%", y: "38%", className: "source-craft" },
  life: { x: "48%", y: "72%", className: "source-life" }
};

const initialBumps: Record<LabId, number> = {
  ai: 0,
  craft: 0,
  life: 0
};

const fieldSparks = [
  { x: "12%", y: "18%", size: "3px", delay: "0s", color: "rgba(143, 199, 255, 0.92)" },
  { x: "18%", y: "62%", size: "2px", delay: "-1.8s", color: "rgba(255, 193, 107, 0.86)" },
  { x: "29%", y: "48%", size: "4px", delay: "-3.1s", color: "rgba(247, 240, 223, 0.78)" },
  { x: "36%", y: "16%", size: "2px", delay: "-2.4s", color: "rgba(184, 214, 195, 0.86)" },
  { x: "43%", y: "83%", size: "3px", delay: "-4.2s", color: "rgba(143, 199, 255, 0.72)" },
  { x: "55%", y: "24%", size: "2px", delay: "-0.7s", color: "rgba(247, 240, 223, 0.7)" },
  { x: "61%", y: "58%", size: "4px", delay: "-3.7s", color: "rgba(255, 193, 107, 0.82)" },
  { x: "68%", y: "14%", size: "3px", delay: "-1.2s", color: "rgba(143, 199, 255, 0.82)" },
  { x: "78%", y: "68%", size: "2px", delay: "-4.8s", color: "rgba(184, 214, 195, 0.78)" },
  { x: "86%", y: "31%", size: "4px", delay: "-2.9s", color: "rgba(247, 240, 223, 0.74)" },
  { x: "91%", y: "78%", size: "2px", delay: "-5.5s", color: "rgba(143, 199, 255, 0.78)" }
];

export function LightFieldEngine() {
  const navigateTo = useSpatialStore((state) => state.navigateTo);
  const focusedLab = useSpatialStore((state) => state.focusedLab);
  const setFocusedLab = useSpatialStore((state) => state.setFocusedLab);
  const isTransitioning = useSpatialStore((state) => state.isTransitioning);
  const selectedLab = useSpatialStore((state) => state.selectedLab);
  const [dwellLab, setDwellLab] = useState<LabId | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);
  const [sourceBumps, setSourceBumps] = useState<Record<LabId, number>>(initialBumps);
  const dwellTimer = useRef<number | null>(null);
  const progressTimer = useRef<number | null>(null);
  const lastBumpedAt = useRef<Record<LabId, number>>(initialBumps);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const springX = useSpring(pointerX, { stiffness: 72, damping: 24, mass: 0.3 });
  const springY = useSpring(pointerY, { stiffness: 72, damping: 24, mass: 0.3 });
  const lensLeft = useMotionTemplate`${springX}%`;
  const lensTop = useMotionTemplate`${springY}%`;
  const fieldBackground = useMotionTemplate`
    radial-gradient(circle at ${springX}% ${springY}%, rgba(255,255,255,0.09), transparent 18rem),
    radial-gradient(circle at 24% 28%, rgba(127,190,255,0.42), transparent 19rem),
    radial-gradient(circle at 72% 38%, rgba(255,174,89,0.36), transparent 22rem),
    radial-gradient(circle at 48% 72%, rgba(171,215,187,0.30), transparent 20rem),
    linear-gradient(135deg, #050608 0%, #111113 48%, #070809 100%)
  `;

  useEffect(() => {
    return () => {
      if (dwellTimer.current) window.clearTimeout(dwellTimer.current);
      if (progressTimer.current) window.clearInterval(progressTimer.current);
    };
  }, []);

  const clearDwell = () => {
    if (dwellTimer.current) window.clearTimeout(dwellTimer.current);
    if (progressTimer.current) window.clearInterval(progressTimer.current);
    dwellTimer.current = null;
    progressTimer.current = null;
    setDwellProgress(0);
    setDwellLab(null);
    setFocusedLab(null);
  };

  const beginDwell = (lab: LabId) => {
    if (isTransitioning) return;
    clearDwell();
    setDwellLab(lab);
    setFocusedLab(lab);
    const startedAt = performance.now();
    progressTimer.current = window.setInterval(() => {
      const progress = Math.min((performance.now() - startedAt) / 1450, 1);
      setDwellProgress(progress);
    }, 24);
    dwellTimer.current = window.setTimeout(() => {
      navigateTo(lab);
    }, 1450);
  };

  const bumpSource = (lab: LabId, force = false) => {
    const now = performance.now();
    if (!force && now - lastBumpedAt.current[lab] < 650) return;
    lastBumpedAt.current = {
      ...lastBumpedAt.current,
      [lab]: now
    };
    setSourceBumps((bumps) => ({
      ...bumps,
      [lab]: bumps[lab] + 1
    }));
  };

  const handleFieldPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);

    event.currentTarget.querySelectorAll<HTMLButtonElement>(".light-source").forEach((source) => {
      const lab = source.dataset.lab as LabId | undefined;
      if (!lab) return;
      const sourceRect = source.getBoundingClientRect();
      const centerX = sourceRect.left + sourceRect.width / 2;
      const centerY = sourceRect.top + sourceRect.height / 2;
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
      const hitRadius = sourceRect.width * 0.34;
      if (distance <= hitRadius) bumpSource(lab);
    });
  };

  return (
    <motion.div
      className="light-field"
      style={{ background: fieldBackground }}
      onPointerMove={handleFieldPointerMove}
    >
      <div className="field-aurora" />
      <div className="field-grid" />
      <svg className="field-constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="constellation-line line-ai-craft" d="M24 28 L72 38" />
        <path className="constellation-line line-craft-life" d="M72 38 L48 72" />
        <path className="constellation-line line-life-ai" d="M48 72 L24 28" />
      </svg>
      <div className="field-sparks" aria-hidden="true">
        {fieldSparks.map((spark, index) => (
          <span
            key={index}
            style={{
              left: spark.x,
              top: spark.y,
              width: spark.size,
              background: spark.color,
              boxShadow: `0 0 22px ${spark.color}`,
              animationDelay: spark.delay
            }}
          />
        ))}
      </div>
      <motion.div className="field-cursor-lens" style={{ left: lensLeft, top: lensTop }} />
      <div className="field-noise" />
      <div className="field-vignette" />
      <div className="home-caption">
        <span>light-field-spatial-lab</span>
        <strong>hold near a light source to collapse the field</strong>
      </div>

      {labs.map((lab) => {
        const position = sourcePositions[lab.id];
        const isFocused = focusedLab === lab.id;
        const isSelected = selectedLab === lab.id;

        return (
          <motion.button
            key={lab.id}
            data-lab={lab.id}
            className={`light-source ${position.className} ${isFocused ? "is-focused" : ""} ${
              isSelected ? "is-selected" : ""
            }`}
            style={{ left: position.x, top: position.y }}
            onPointerEnter={() => {
              bumpSource(lab.id, true);
              beginDwell(lab.id);
            }}
            onPointerDown={() => bumpSource(lab.id, true)}
            onPointerLeave={clearDwell}
            onFocus={() => {
              bumpSource(lab.id, true);
              beginDwell(lab.id);
            }}
            onBlur={clearDwell}
            onClick={() => {
              bumpSource(lab.id, true);
              navigateTo(lab.id);
            }}
            aria-label={`${lab.name}: ${lab.title}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="source-core"
              initial={false}
              animate={
                sourceBumps[lab.id] > 0
                  ? {
                      scale: [1, 1.34, 0.96, 1],
                      filter: [
                        "brightness(1) saturate(1)",
                        "brightness(1.34) saturate(1.22)",
                        "brightness(1.08) saturate(1.1)",
                        "brightness(1) saturate(1)"
                      ]
                    }
                  : { scale: 1, filter: "brightness(1) saturate(1)" }
              }
              transition={{ duration: 0.42, ease: [0.2, 0.9, 0.22, 1] }}
            />
            <motion.span
              className="source-halo"
              initial={false}
              animate={
                sourceBumps[lab.id] > 0
                  ? { scale: [1, 1.22, 1.06, 1], opacity: [0.75, 1, 0.82, 0.75] }
                  : { scale: 1, opacity: 0.75 }
              }
              transition={{ duration: 0.48, ease: [0.2, 0.9, 0.22, 1] }}
            />
            <span className="source-label">
              <span>{lab.name}</span>
              <small>{lab.title}</small>
            </span>
            {dwellLab === lab.id && (
              <motion.span
                className="dwell-ring"
                style={{ scale: 0.72 + dwellProgress * 0.42, opacity: 0.22 + dwellProgress * 0.68 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
