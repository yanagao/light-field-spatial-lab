import { motion } from "framer-motion";
import { useSpatialStore } from "../state/useSpatialStore";

const specs = [
  ["role", "frontend engineer"],
  ["system", "documentation, interface, interaction"],
  ["material", "diy objects, glass, wire, fabric"],
  ["archive", "daily fragments, memory traces"],
  ["mode", "precise structure with soft light"],
  ["signal", "building visible systems from scattered inputs"]
];

export default function AboutMe() {
  const returnHome = useSpatialStore((state) => state.returnHome);

  return (
    <div className="about-frame">
      <header className="about-header">
        <button className="field-return" onClick={returnHome} aria-label="Return to light field">
          <span />
        </button>
        <div>
          <p>ABOUT / SYSTEM SPEC</p>
          <h1>about me</h1>
        </div>
      </header>
      <motion.section
        className="about-spec"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        <p className="about-lede">
          A personal field system for front-end work, handmade experiments, and memory records.
        </p>
        <dl>
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </motion.section>
    </div>
  );
}
