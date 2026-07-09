export type Frontmatter = Record<string, string | string[] | undefined>;

export type MarkdownEntry = {
  id: string;
  raw: string;
  body: string;
  frontmatter: Frontmatter;
};

export function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, body: raw };
  }

  const [, frontmatterBlock, body] = match;
  const frontmatter: Frontmatter = {};

  frontmatterBlock.split("\n").forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (/^\[.*\]$/.test(rawValue)) {
      frontmatter[key] = rawValue
        .replace(/^\[/, "")
        .replace(/\]$/, "")
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      return;
    }

    frontmatter[key] = rawValue.replace(/^["']|["']$/g, "");
  });

  return { frontmatter, body };
}

export function getSlug(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? path;
}

export function getStringField(frontmatter: Frontmatter, key: string) {
  const value = frontmatter[key];
  return typeof value === "string" ? value : undefined;
}

export function getArrayField(frontmatter: Frontmatter, key: string) {
  const value = frontmatter[key];
  return Array.isArray(value) ? value : [];
}

export function getContentStatus(frontmatter: Frontmatter) {
  return (getStringField(frontmatter, "status") || "draft").toLowerCase();
}

export function isPublishedEntry(entry: MarkdownEntry) {
  return getContentStatus(entry.frontmatter) === "published";
}

export function getBodySummary(body: string) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#"))
    ?.replace(/^[-*]\s+/, "");
}

export function estimateReadTime(raw: string) {
  const words = raw
    .replace(/^---\n[\s\S]*?\n---/, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} 分钟`;
}

export function getDateNamedMarkdownEntries(files: Record<string, string>): MarkdownEntry[] {
  return Object.entries(files)
    .filter(([path]) => /^\d{4}-\d{2}-\d{2}-/.test(getSlug(path)))
    .map(([path, raw]) => {
      const { frontmatter, body } = parseFrontmatter(raw);
      return {
        id: getSlug(path),
        raw,
        body,
        frontmatter
      };
    })
    .sort((a, b) => b.id.localeCompare(a.id));
}
