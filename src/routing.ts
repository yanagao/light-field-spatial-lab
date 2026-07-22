import type { LabId } from "./types";

type HistoryMode = "push" | "replace";

const getHashSegments = () => {
  if (typeof window === "undefined") return [];

  return window.location.hash
    .replace(/^#\/?/, "")
    .replace(/\/$/, "")
    .split("/")
    .filter(Boolean);
};

export function getLabFromLocation(): LabId | null {
  const [lab] = getHashSegments();
  return lab === "ai" || lab === "craft" || lab === "life" ? lab : null;
}

export function getArticleFromLocation(labId: LabId) {
  const [lab, encodedArticleId] = getHashSegments();
  if (lab !== labId || !encodedArticleId) return null;

  try {
    return decodeURIComponent(encodedArticleId);
  } catch {
    return null;
  }
}

export function updateHashRoute(segments: string[], mode: HistoryMode = "push") {
  const route = segments.map(encodeURIComponent).join("/");
  const nextHash = `#/${route}`;

  if (window.location.hash === nextHash) return;

  const method = mode === "replace" ? "replaceState" : "pushState";
  window.history[method](null, "", nextHash);
}
