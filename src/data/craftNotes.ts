import {
  getArrayField,
  getBodySummary,
  getDateNamedMarkdownEntries,
  getStringField,
  isPublishedEntry
} from "./markdown";
import { resolveContentAsset } from "./contentAssets";

export type CraftNote = {
  id: string;
  type: string;
  title: string;
  medium: string;
  body: string;
  image?: string;
};

const craftMarkdownFiles = import.meta.glob("../../content/craft/*.md", {
  eager: true,
  import: "default",
  query: "?raw"
}) as Record<string, string>;

export const craftNotes: CraftNote[] = getDateNamedMarkdownEntries(craftMarkdownFiles)
  .filter(isPublishedEntry)
  .map(({ id, body, frontmatter }) => {
    const materials = getArrayField(frontmatter, "materials");
    const techniques = getArrayField(frontmatter, "techniques");
    const mediumParts = [...materials, ...techniques];

    return {
      id,
      type: getStringField(frontmatter, "type") || getStringField(frontmatter, "date") || "Craft Lab",
      title: getStringField(frontmatter, "title") || id,
      medium:
        getStringField(frontmatter, "summary") ||
        (mediumParts.length > 0 ? mediumParts.join(" / ") : undefined) ||
        getBodySummary(body) ||
        "暂无手作记录。",
      body,
      image: resolveContentAsset("craft", getStringField(frontmatter, "cover"))
    };
  });
