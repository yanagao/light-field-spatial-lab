import { motion } from "framer-motion";
import { memories } from "../data/content";
import { LabFrame } from "./LabFrame";

function LifeLab() {
  return (
    <LabFrame labId="life">
      <section className="memory-stream">
        <div className="timeline-thread" />
        {memories.map((memory, index) => (
          <motion.article
            key={memory.id}
            className="memory-item"
            initial={{ opacity: 0, x: memory.drift / 2, y: 28 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: index * 0.12, ease: [0.18, 0.72, 0.28, 1] }}
          >
            <time>
              <span>{memory.date}</span>
              <small>{memory.time}</small>
            </time>
            <div>
              <h2>{memory.title}</h2>
              <p>{memory.note}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </LabFrame>
  );
}

export default LifeLab;
