import {
  getBodySummary,
  getDateNamedMarkdownEntries,
  getStringField,
  isPublishedEntry
} from "./markdown";
import { resolveContentAsset } from "./contentAssets";

export type LifeRecord = {
  id: string;
  date: string;
  time: string;
  title: string;
  note: string;
  body: string;
  image?: string;
  drift: number;
};

const lifeMarkdownFiles = import.meta.glob("../../content/life/*.md", {
  eager: true,
  import: "default",
  query: "?raw"
}) as Record<string, string>;

export const lifeRecords: LifeRecord[] = getDateNamedMarkdownEntries(lifeMarkdownFiles)
  .filter(isPublishedEntry)
  .map(({ id, body, frontmatter }, index) => ({
    id,
    date: getStringField(frontmatter, "date") || id.slice(0, 10),
    time: getStringField(frontmatter, "time") || "",
    title: getStringField(frontmatter, "title") || id,
    note: getStringField(frontmatter, "summary") || getBodySummary(body) || "暂无生活记录。",
    body,
    image: resolveContentAsset(
      "life",
      getStringField(frontmatter, "image") || getStringField(frontmatter, "cover")
    ),
    drift: index % 2 === 0 ? 24 : -24
  }));
