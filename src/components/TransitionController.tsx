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
    "light-bias": "flame bias",
    "field-distortion": "heat shimmer",
    collapse: "flame lock",
    "structure-emergence": "glass trace",
    "ui-mount": "mounting field"
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
            scaleX: phase === "collapse" || phase === "structure-emergence" ? 0.72 : 0.42,
            scaleY: phase === "field-distortion" ? 1.22 : 1,
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
            <div className="collapse-flame" aria-hidden="true">
              <span className="collapse-flame-glow" />
              <span className="collapse-flame-core" />
              <span className="collapse-flame-glass" />
              <svg className="collapse-flame-traces" viewBox="0 0 280 220" preserveAspectRatio="none">
                <path d="M64 134 C112 82 158 103 216 59" />
                <path d="M79 157 C132 186 171 135 227 134" />
              </svg>
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
