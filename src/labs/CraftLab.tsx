import { motion } from "framer-motion";
import { materials } from "../data/content";
import { LabFrame } from "./LabFrame";

function CraftLab() {
  return (
    <LabFrame labId="craft">
      <section className="material-field">
        {materials.map((material, index) => (
          <motion.article
            key={material.id}
            className="material-node"
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.72,
              delay: index * 0.06,
              ease: [0.22, 1.22, 0.36, 1]
            }}
          >
            <img src={material.image} alt="" loading="lazy" />
            <div className="material-copy">
              <span>{material.type}</span>
              <h2>{material.title}</h2>
              <p>{material.medium}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </LabFrame>
  );
}

export default CraftLab;
