import {
  estimateReadTime,
  getBodySummary,
  getDateNamedMarkdownEntries,
  getStringField,
  getArrayField,
  isPublishedEntry
} from "./markdown";

type ArticleCard = {
  id: string;
  section: string;
  title: string;
  summary: string;
  tags: string[];
  readTime: string;
  body: string;
};

const aiMarkdownFiles = import.meta.glob("../../content/ai/*.md", {
  eager: true,
  import: "default",
  query: "?raw"
}) as Record<string, string>;

export const aiArticles: ArticleCard[] = getDateNamedMarkdownEntries(aiMarkdownFiles)
  .filter(isPublishedEntry)
  .map(({ id, raw, body, frontmatter }) => ({
    id,
    section: getStringField(frontmatter, "section") || getStringField(frontmatter, "date") || "AI Lab",
    title: getStringField(frontmatter, "title") || id,
    summary: getStringField(frontmatter, "summary") || getBodySummary(body) || "暂无摘要。",
    tags: getArrayField(frontmatter, "tags"),
    readTime: getStringField(frontmatter, "readTime") || estimateReadTime(raw),
    body
  }))
  .sort((a, b) => b.id.localeCompare(a.id));
