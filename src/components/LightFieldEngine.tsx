import { type PointerEvent, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { labs } from "../data/content";
import { useSpatialStore } from "../state/useSpatialStore";
import type { LabDefinition, LabId } from "../types";

const sourcePositions: Record<LabId, { x: string; y: string; className: string }> = {
  ai: { x: "36%", y: "26%", className: "source-ai" },
  craft: { x: "72%", y: "43%", className: "source-craft" },
  life: { x: "32%", y: "66%", className: "source-life" }
};

const initialBumps: Record<LabId, number> = {
  ai: 0,
  craft: 0,
  life: 0
};

const targetStateLabels: Record<LabId, string> = {
  ai: "AI_DOCUMENT_STATE",
  craft: "CRAFT_MATERIAL_STATE",
  life: "LIFE_MEMORY_STATE"
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

interface FieldPreviewProps {
  lab: LabDefinition;
  position: { x: string; y: string; className: string };
  isFocused: boolean;
  isSelected: boolean;
  bumpCount: number;
  dwellActive: boolean;
  dwellProgress: number;
  onBegin: (lab: LabId) => void;
  onClear: () => void;
  onBump: (lab: LabId, force?: boolean) => void;
  onSelect: (lab: LabId) => void;
}

function getButtonProps({
  lab,
  position,
  isFocused,
  isSelected,
  onBegin,
  onClear,
  onBump,
  onSelect
}: FieldPreviewProps) {
  return {
    "data-lab": lab.id,
    className: `light-source ${position.className} ${isFocused ? "is-focused" : ""} ${isSelected ? "is-selected" : ""}`,
    style: { left: position.x, top: position.y },
    onPointerEnter: () => {
      onBump(lab.id, true);
      onBegin(lab.id);
    },
    onPointerDown: () => onBump(lab.id, true),
    onPointerLeave: onClear,
    onFocus: () => {
      onBump(lab.id, true);
      onBegin(lab.id);
    },
    onBlur: onClear,
    onClick: () => {
      onBump(lab.id, true);
      onSelect(lab.id);
    },
    "aria-label": `${lab.name}: ${lab.title}`
  };
}

function DwellTrace({ active, progress }: { active: boolean; progress: number }) {
  if (!active) return null;
  return <motion.span className="dwell-trace" style={{ scaleX: progress, opacity: 0.2 + progress * 0.6 }} />;
}

function AIField(props: FieldPreviewProps) {
  const { lab, bumpCount, dwellActive, dwellProgress } = props;

  return (
    <motion.button {...getButtonProps(props)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
      <motion.span
        className="ai-aperture"
        initial={false}
        animate={
          bumpCount > 0
            ? {
                scaleX: [1, 1.18, 1],
                filter: ["brightness(1)", "brightness(1.36)", "brightness(1)"]
              }
            : { scaleX: 1, filter: "brightness(1)" }
        }
        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.22, 1] }}
      />
      <span className="ai-doc-preview" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <b />
        <b />
        <b />
        <b />
      </span>
      <span className="ai-calibration" aria-hidden="true" />
      <span className="field-brackets ai-brackets" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="field-kicker">AI FIELD</span>
      <span className="source-label">
        <span>{lab.name}</span>
        <small>documentation system</small>
        <em>ENTER DOCUMENT FIELD</em>
      </span>
      <DwellTrace active={dwellActive} progress={dwellProgress} />
    </motion.button>
  );
}

function CraftField(props: FieldPreviewProps) {
  const { lab, bumpCount, dwellActive, dwellProgress } = props;

  return (
    <motion.button {...getButtonProps(props)} whileHover={{ scale: 1.012 }} whileTap={{ scale: 0.98 }}>
      <motion.span
        className="craft-lightbox-glow"
        initial={false}
        animate={
          bumpCount > 0
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.38, 0.56, 0.38],
                filter: ["brightness(1)", "brightness(1.28) saturate(1.12)", "brightness(1)"]
              }
            : { scale: 1, opacity: 0.38, filter: "brightness(1)" }
        }
        transition={{ duration: 0.58, ease: [0.2, 0.9, 0.22, 1] }}
      />
      <span className="craft-table-shadow" aria-hidden="true" />
      <span className="craft-photo-cluster" aria-hidden="true">
        <i className="craft-photo-fragment glass-lamp-photo" />
        <i className="craft-photo-fragment glass-shard-photo" />
        <i className="craft-photo-fragment fabric-weave-photo" />
        <i className="craft-photo-fragment fabric-edge-photo" />
        <i className="craft-photo-fragment copper-thread-photo" />
        <i className="craft-photo-fragment thread-spool-photo" />
        <i className="craft-photo-fragment work-preview-photo primary-work" />
        <i className="craft-photo-fragment work-preview-photo secondary-work" />
        <i className="craft-photo-fragment workbench-photo" />
      </span>
      <span className="craft-caustic-wash" aria-hidden="true"><i /><i /><i /></span>
      <span className="field-brackets craft-brackets" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="field-kicker">CRAFT FIELD</span>
      <span className="source-label">
        <span>{lab.name}</span>
        <small>material field</small>
        <em>ENTER MATERIAL FIELD</em>
      </span>
      <DwellTrace active={dwellActive} progress={dwellProgress} />
    </motion.button>
  );
}

function LifeField(props: FieldPreviewProps) {
  const { lab, bumpCount, dwellActive, dwellProgress } = props;

  return (
    <motion.button {...getButtonProps(props)} whileHover={{ scale: 1.006 }} whileTap={{ scale: 0.99 }}>
      <motion.span
        className="memory-mist-field"
        initial={false}
        animate={
          bumpCount > 0
            ? {
                scale: [1, 1.05, 1],
                opacity: [0.72, 0.96, 0.72],
                filter: ["brightness(1)", "brightness(1.38)", "brightness(1)"]
              }
            : { scale: 1, opacity: 0.72, filter: "brightness(1)" }
        }
        transition={{ duration: 0.7, ease: [0.2, 0.9, 0.22, 1] }}
      />
      <span className="memory-time-fragments" aria-hidden="true">
        <i>06.29&nbsp;&nbsp;22:10</i>
        <i>06.27</i>
        <i>a quiet note</i>
      </span>
      <span className="memory-broken-traces" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <span className="memory-drift-dots" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <span className="memory-diary-residue" aria-hidden="true">
        <i>2026.06.29&nbsp;&nbsp; light on the table</i>
        <i>2026.06.27&nbsp;&nbsp; a quiet note</i>
        <i>2026.06.21&nbsp;&nbsp; something remembered</i>
      </span>
      <span className="field-brackets life-brackets" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="field-kicker">LIFE FIELD</span>
      <span className="source-label">
        <span>{lab.name}</span>
        <small>memory archive</small>
        <em>ENTER MEMORY ARCHIVE</em>
      </span>
      <DwellTrace active={dwellActive} progress={dwellProgress} />
    </motion.button>
  );
}

export function LightFieldEngine() {
  const navigateTo = useSpatialStore((state) => state.navigateTo);
  const openAbout = useSpatialStore((state) => state.openAbout);
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
    radial-gradient(circle at ${springX}% ${springY}%, rgba(255,255,255,0.035), transparent 20rem),
    radial-gradient(circle at 36% 26%, rgba(164,210,255,0.22), transparent 21rem),
    radial-gradient(circle at 72% 43%, rgba(255,184,104,0.18), transparent 24rem),
    radial-gradient(circle at 32% 66%, rgba(170,198,178,0.14), transparent 22rem),
    linear-gradient(135deg, #101214 0%, #151617 48%, #0d0f10 100%)
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

  const aiLab = labs.find((lab) => lab.id === "ai")!;
  const craftLab = labs.find((lab) => lab.id === "craft")!;
  const lifeLab = labs.find((lab) => lab.id === "life")!;
  const getFieldProps = (lab: LabDefinition): FieldPreviewProps => ({
    lab,
    position: sourcePositions[lab.id],
    isFocused: focusedLab === lab.id,
    isSelected: selectedLab === lab.id,
    bumpCount: sourceBumps[lab.id],
    dwellActive: dwellLab === lab.id,
    dwellProgress,
    onBegin: beginDwell,
    onClear: clearDwell,
    onBump: bumpSource,
    onSelect: navigateTo
  });

  return (
    <motion.div
      className={`light-field ${focusedLab ? `has-focus focus-${focusedLab}` : ""}`}
      style={{ background: fieldBackground }}
      onPointerMove={handleFieldPointerMove}
    >
      <div className="field-aurora" />
      <div className="field-grid" />
      <svg className="field-optics" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g className="optic-trace trace-ai">
          <path className="axis-line" d="M8 24 H62" />
          <path className="axis-line" d="M8 30 H62" />
          <path className="axis-line" d="M8 36 H62" />
          <path className="grid-line" d="M25 18 V42" />
          <path className="grid-line" d="M43 19 V43" />
          <path className="measure-line" d="M18 21 V26" />
          <path className="measure-line" d="M34 21 V26" />
          <path className="measure-line" d="M50 21 V26" />
          <path className="measure-line" d="M58 30 H66" />
        </g>
        <g className="optic-trace trace-craft">
          <path className="refract-line" d="M55 25 L64 35 L74 30 L86 40 L99 36" />
          <path className="refract-line" d="M57 45 L67 39 L77 48 L89 44 L100 52" />
          <path className="caustic-line" d="M61 31 C68 39 77 40 86 33 C91 30 96 31 100 35" />
          <path className="caustic-line" d="M58 52 C66 47 73 49 80 56 C86 61 93 59 99 53" />
          <path className="facet-line" d="M66 23 L75 35 L70 49 L60 37 Z" />
          <path className="facet-line" d="M82 32 L93 39 L88 50 L78 43 Z" />
        </g>
        <g className="optic-trace trace-life">
          <path className="memory-line" d="M10 65 C18 62 26 64 33 67" />
          <path className="memory-line" d="M38 70 C47 73 55 73 64 69" />
          <path className="memory-line" d="M17 77 C28 75 35 78 43 81" />
          <path className="timeline-line" d="M12 72 H82" />
          <path className="timeline-line" d="M24 84 H68" />
          <path className="drift-line" d="M52 61 L58 63" />
          <path className="drift-line" d="M70 76 L76 74" />
          <path className="drift-line" d="M31 58 L36 60" />
        </g>
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
      <button className="system-entry" onClick={openAbout} aria-label="Open about system spec">
        <span>ABOUT / SYSTEM SPEC</span>
      </button>
      <div className="home-caption">
        <span>{focusedLab ? `target field: ${targetStateLabels[focusedLab]}` : "three fields are active"}</span>
      </div>

      <AIField {...getFieldProps(aiLab)} />
      <CraftField {...getFieldProps(craftLab)} />
      <LifeField {...getFieldProps(lifeLab)} />
    </motion.div>
  );
}
