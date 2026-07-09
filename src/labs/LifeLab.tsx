import { useState } from "react";
import { motion } from "framer-motion";
import { MarkdownDetail } from "../components/MarkdownDetail";
import { resolveContentAsset } from "../data/contentAssets";
import { lifeRecords } from "../data/lifeRecords";
import { LabFrame } from "./LabFrame";

function LifeLab() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedRecord = lifeRecords.find((record) => record.id === selectedId);

  return (
    <LabFrame labId="life">
      {selectedRecord ? (
        <MarkdownDetail
          accent="life"
          eyebrow={selectedRecord.date}
          title={selectedRecord.title}
          summary={selectedRecord.note}
          meta={[selectedRecord.time].filter(Boolean)}
          body={selectedRecord.body}
          heroImage={selectedRecord.image}
          onBack={() => setSelectedId(null)}
          resolveAsset={(src) => resolveContentAsset("life", src)}
        />
      ) : (
        <section className="memory-stream">
          <div className="timeline-thread" />
          {lifeRecords.map((memory, index) => (
            <motion.button
              key={memory.id}
              className="memory-item lab-list-button"
              type="button"
              onClick={() => setSelectedId(memory.id)}
              initial={{ opacity: 0, x: memory.drift / 2, y: 28 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.18, 0.72, 0.28, 1] }}
            >
              <time>
                <span>{memory.date}</span>
                <small>{memory.time}</small>
              </time>
              <div>
                {memory.image && <img className="memory-image" src={memory.image} alt="" loading="lazy" />}
                <h2>{memory.title}</h2>
                <p>{memory.note}</p>
              </div>
            </motion.button>
          ))}
        </section>
      )}
    </LabFrame>
  );
}

export default LifeLab;
