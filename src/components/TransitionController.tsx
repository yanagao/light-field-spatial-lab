import { AnimatePresence, motion } from "framer-motion";
import { labs } from "../data/content";
import { useSpatialStore } from "../state/useSpatialStore";
import type { LabId, TransitionPhase } from "../types";

const phaseLabels: Record<LabId, Partial<Record<TransitionPhase, string>>> = {
  ai: {
    "light-bias": "cold light bias",
    "field-distortion": "vertical alignment",
    collapse: "structure lock",
    "structure-emergence": "article grid",
    "ui-mount": "mounting index"
  },
  craft: {
    "light-bias": "warm diffusion",
    "field-distortion": "glass refraction",
    collapse: "material fracture",
    "structure-emergence": "field assembly",
    "ui-mount": "mounting media"
  },
  life: {
    "light-bias": "soft field bias",
    "field-distortion": "temporal stretch",
    collapse: "memory stream",
    "structure-emergence": "archive trace",
    "ui-mount": "mounting time"
  }
};

const structureLines = Array.from({ length: 9 }, (_, index) => index);
const materialFragments = [
  { key: "glass-a", kind: "glass", className: "fragment-glass glass-a" },
  { key: "glass-b", kind: "glass", className: "fragment-glass glass-b" },
  { key: "glass-lamp", kind: "glass", className: "fragment-glass glass-lamp" },
  { key: "fabric-a", kind: "fabric", className: "fragment-fabric fabric-a" },
  { key: "fabric-b", kind: "fabric", className: "fragment-fabric fabric-b" },
  { key: "wire-a", kind: "wire", className: "fragment-wire wire-a" },
  { key: "wire-b", kind: "wire", className: "fragment-wire wire-b" },
  { key: "media-a", kind: "media", className: "fragment-media media-a" },
  { key: "media-b", kind: "media", className: "fragment-media media-b" },
  { key: "process-note", kind: "process", className: "fragment-process process-note" }
];
const timeStreams = Array.from({ length: 7 }, (_, index) => index);

export function TransitionController() {
  const phase = useSpatialStore((state) => state.transitionPhase);
  const selectedLab = useSpatialStore((state) => state.selectedLab);
  const lab = labs.find((item) => item.id === selectedLab);
  const axisAnimate = lab
    ? lab.id === "ai"
      ? {
          scaleX: phase === "collapse" || phase === "structure-emergence" ? 0.24 : 0.14,
          scaleY: phase === "field-distortion" ? 1.24 : 1.04,
          opacity: phase === "ui-mount" ? 0.14 : 0.88
        }
      : lab.id === "craft"
        ? {
            scaleX: phase === "collapse" || phase === "structure-emergence" ? 4.8 : 1.7,
            scaleY: phase === "field-distortion" ? 1.7 : 1,
            opacity: phase === "ui-mount" ? 0.16 : 0.9
          }
        : {
            scaleX: phase === "collapse" || phase === "structure-emergence" ? 0.72 : 0.42,
            scaleY: phase === "field-distortion" ? 1.8 : 1.18,
            opacity: phase === "ui-mount" ? 0.16 : 0.78
          }
    : { scaleX: 1, scaleY: 1, opacity: 0 };

  return (
    <AnimatePresence>
      {phase !== "idle" && lab && (
        <motion.div
          className={"collapse-layer collapse-" + lab.id + " phase-" + phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <motion.div
            className="collapse-axis"
            initial={{ scaleX: 0.1, scaleY: 0.7, opacity: 0 }}
            animate={axisAnimate}
            transition={{ duration: 0.62, ease: [0.2, 0.84, 0.24, 1] }}
          />

          {lab.id === "ai" && (
            <div className="collapse-structure" aria-hidden="true">
              {structureLines.map((line) => (
                <span key={line} />
              ))}
            </div>
          )}

          {lab.id === "craft" && (
            <div className="collapse-material" aria-hidden="true">
              {materialFragments.map((fragment) =>
                fragment.kind === "wire" ? (
                  <svg
                    key={fragment.key}
                    className={`material-fragment ${fragment.className}`}
                    viewBox="0 0 180 92"
                    preserveAspectRatio="none"
                  >
                    <path d="M8 68 C 42 18, 72 86, 104 42 S 146 18, 172 54" />
                    <path className="wire-shadow" d="M10 73 C 44 27, 76 84, 106 48 S 146 26, 170 58" />
                  </svg>
                ) : (
                  <span key={fragment.key} className={`material-fragment ${fragment.className}`}>
                    <i />
                  </span>
                )
              )}
            </div>
          )}

          {lab.id === "life" && (
            <div className="collapse-time" aria-hidden="true">
              {timeStreams.map((stream) => (
                <span key={stream} />
              ))}
            </div>
          )}

          <div className="collapse-readout">
            <span>{lab.name}</span>
            <strong>{phaseLabels[lab.id][phase] ?? "collapse"}</strong>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
