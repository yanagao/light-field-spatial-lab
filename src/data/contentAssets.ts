const contentAssetFiles = import.meta.glob("../../content/*/assets/*", {
  eager: true,
  import: "default",
  query: "?url"
}) as Record<string, string>;

export function resolveContentAsset(labId: string, src: string): string;
export function resolveContentAsset(labId: string, src?: string): string | undefined;
export function resolveContentAsset(labId: string, src?: string) {
  if (!src) return undefined;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;

  const normalized = src.replace(/^\.\//, "");
  const candidates = [
    `../../content/${labId}/${normalized}`,
    `../../content/${labId}/assets/${normalized}`
  ];

  return candidates.map((path) => contentAssetFiles[path]).find(Boolean) || src;
}
