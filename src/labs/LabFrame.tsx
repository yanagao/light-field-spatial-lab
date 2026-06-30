import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { labs } from "../data/content";
import { useSpatialStore } from "../state/useSpatialStore";
import type { LabId } from "../types";

interface LabFrameProps {
  labId: LabId;
  children: ReactNode;
}

export function LabFrame({ labId, children }: LabFrameProps) {
  const returnHome = useSpatialStore((state) => state.returnHome);
  const lab = labs.find((item) => item.id === labId)!;

  return (
    <div className={`lab-frame lab-${labId}`}>
      <header className="lab-header">
        <button className="field-return" onClick={returnHome} aria-label="Return to light field">
          <span />
        </button>
        <div>
          <p>{lab.physics}</p>
          <h1>{lab.name}</h1>
        </div>
      </header>
      <motion.div
        className="lab-body"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
