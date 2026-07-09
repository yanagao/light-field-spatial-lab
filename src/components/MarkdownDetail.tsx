import { Fragment } from "react";
import { motion } from "framer-motion";

type MarkdownDetailProps = {
  accent: "ai" | "craft" | "life";
  eyebrow: string;
  title: string;
  summary?: string;
  meta?: string[];
  body: string;
  heroImage?: string;
  onBack: () => void;
  resolveAsset?: (src: string) => string;
};

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language?: string }
  | { type: "quote"; text: string }
  | { type: "image"; alt: string; src: string };

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const codeMatch = line.match(/^```(\w+)?/);
    if (codeMatch) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", code: code.join("\n"), language: codeMatch[1] });
      index += 1;
      continue;
    }

    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      blocks.push({ type: "image", alt: imageMatch[1], src: imageMatch[2] });
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({ type: "heading", level: headingMatch[1].length, text: headingMatch[2] });
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,3})\s+/.test(lines[index].trim()) &&
      !/^[-*]\s+/.test(lines[index].trim()) &&
      !/^```/.test(lines[index].trim()) &&
      !/^!\[(.*?)\]\((.*?)\)$/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith(">")
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} target="_blank" rel="noreferrer">
          {linkMatch[1]}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function MarkdownBody({ body, resolveAsset }: { body: string; resolveAsset?: (src: string) => string }) {
  return (
    <div className="markdown-body">
      {parseBlocks(body).map((block, index) => {
        if (block.type === "heading") {
          const Heading = `h${Math.min(block.level + 1, 4)}` as "h2" | "h3" | "h4";
          return <Heading key={index}>{renderInline(block.text)}</Heading>;
        }
        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>{block.code}</code>
            </pre>
          );
        }
        if (block.type === "quote") {
          return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
        }
        if (block.type === "image") {
          return (
            <figure key={index}>
              <img src={resolveAsset ? resolveAsset(block.src) : block.src} alt={block.alt} loading="lazy" />
              {block.alt && <figcaption>{block.alt}</figcaption>}
            </figure>
          );
        }
        return <p key={index}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}

export function MarkdownDetail({
  accent,
  eyebrow,
  title,
  summary,
  meta = [],
  body,
  heroImage,
  onBack,
  resolveAsset
}: MarkdownDetailProps) {
  return (
    <motion.article
      className={`lab-detail lab-detail-${accent}`}
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="detail-back" onClick={onBack} type="button">
        返回列表
      </button>
      <header className="detail-header">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        {summary && <p>{summary}</p>}
        {meta.length > 0 && (
          <div className="detail-meta">
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}
      </header>
      {heroImage && (
        <figure className="detail-hero-image">
          <img src={heroImage} alt="" loading="lazy" />
        </figure>
      )}
      <MarkdownBody body={body} resolveAsset={resolveAsset} />
    </motion.article>
  );
}
