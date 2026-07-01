import { motion } from "framer-motion";
import { articles } from "../data/content";
import { LabFrame } from "./LabFrame";

function AILab() {
  return (
    <LabFrame labId="ai">
      <section className="ai-layout">
        <aside className="ai-index">
          <span>FrontendNotes</span>
          <strong>Frontend engineering notes</strong>
          <p>整理日常开发里的组件设计、交互状态、页面结构和交付经验。</p>
        </aside>

        <div className="article-list">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="article-card"
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
            </motion.article>
          ))}
        </div>
      </section>
    </LabFrame>
  );
}

export default AILab;
