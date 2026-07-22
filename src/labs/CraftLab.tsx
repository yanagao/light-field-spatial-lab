import { motion } from "framer-motion";
import { MarkdownDetail } from "../components/MarkdownDetail";
import { craftNotes } from "../data/craftNotes";
import { resolveContentAsset } from "../data/contentAssets";
import { useArticleRoute } from "../hooks/useArticleRoute";
import { LabFrame } from "./LabFrame";

function CraftLab() {
  const { selectedId, openArticle, closeArticle } = useArticleRoute("craft");
  const selectedNote = craftNotes.find((note) => note.id === selectedId);

  return (
    <LabFrame labId="craft">
      {selectedNote ? (
        <MarkdownDetail
          accent="craft"
          eyebrow={selectedNote.type}
          title={selectedNote.title}
          summary={selectedNote.medium}
          body={selectedNote.body}
          heroImage={selectedNote.image}
          onBack={closeArticle}
          resolveAsset={(src) => resolveContentAsset("craft", src)}
        />
      ) : (
        <section className="material-field">
          {craftNotes.map((material, index) => (
            <motion.button
              key={material.id}
              className={`material-node lab-list-button ${material.image ? "" : "is-text-only"}`}
              type="button"
              onClick={() => openArticle(material.id)}
              initial={{ opacity: 0, scale: 0.94, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.72,
                delay: index * 0.06,
                ease: [0.22, 1.22, 0.36, 1]
              }}
            >
              {material.image && <img src={material.image} alt="" loading="lazy" />}
              <div className="material-copy">
                <span>{material.type}</span>
                <h2>{material.title}</h2>
                <p>{material.medium}</p>
              </div>
            </motion.button>
          ))}
        </section>
      )}
    </LabFrame>
  );
}

export default CraftLab;
