import { useState } from "react";
import { motion } from "framer-motion";
import { MarkdownDetail } from "../components/MarkdownDetail";
import { aiArticles } from "../data/aiArticles";
import { resolveContentAsset } from "../data/contentAssets";
import { LabFrame } from "./LabFrame";

function AILab() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedArticle = aiArticles.find((article) => article.id === selectedId);

  return (
    <LabFrame labId="ai">
      {selectedArticle ? (
        <MarkdownDetail
          accent="ai"
          eyebrow={selectedArticle.section}
          title={selectedArticle.title}
          summary={selectedArticle.summary}
          meta={[selectedArticle.readTime, ...selectedArticle.tags]}
          body={selectedArticle.body}
          onBack={() => setSelectedId(null)}
          resolveAsset={(src) => resolveContentAsset("ai", src)}
        />
      ) : (
        <section className="ai-layout">
          <aside className="ai-index">
            <span>FrontendNotes</span>
            <strong>Frontend engineering notes</strong>
            <p>整理日常开发里的组件设计、交互状态、页面结构和交付经验。</p>
          </aside>

          <div className="article-list">
            {aiArticles.map((article, index) => (
              <motion.button
                key={article.id}
                className="article-card lab-list-button"
                type="button"
                onClick={() => setSelectedId(article.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: index * 0.07, ease: [0.12, 0.8, 0.2, 1] }}
              >
                <div className="article-meta">
                  <span>{article.section}</span>
                  <span>{article.readTime}</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <footer>
                  {article.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </footer>
              </motion.button>
            ))}
          </div>
        </section>
      )}
    </LabFrame>
  );
}

export default AILab;
