import { AnimatePresence, motion } from "framer-motion";
import { labs } from "../data/content";
import { useSpatialStore } from "../state/useSpatialStore";

const phaseLabels = {
  "light-bias": "light bias",
  "field-distortion": "field distortion",
  collapse: "collapse",
  "structure-emergence": "structure emergence",
  "ui-mount": "ui mount",
  idle: ""
};

export function TransitionController() {
  const phase = useSpatialStore((state) => state.transitionPhase);
  const selectedLab = useSpatialStore((state) => state.selectedLab);
  const lab = labs.find((item) => item.id === selectedLab);

  return (
    <AnimatePresence>
      {phase !== "idle" && lab && (
        <motion.div
          className={`collapse-layer collapse-${lab.id} phase-${phase}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <motion.div
            className="collapse-axis"
            initial={{ scaleX: 0.1, scaleY: 0.7, opacity: 0 }}
            animate={{
              scaleX: phase === "collapse" || phase === "structure-emergence" ? 5.4 : 1.8,
              scaleY: phase === "field-distortion" ? 1.5 : 1,
              opacity: phase === "ui-mount" ? 0.18 : 0.88
            }}
            transition={{ duration: 0.62, ease: [0.2, 0.84, 0.24, 1] }}
          />
          <div className="collapse-readout">
            <span>{lab.name}</span>
            <strong>{phaseLabels[phase]}</strong>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
