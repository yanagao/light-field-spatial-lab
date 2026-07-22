import { useCallback, useEffect, useState } from "react";
import { getArticleFromLocation, updateHashRoute } from "../routing";
import type { LabId } from "../types";

export function useArticleRoute(labId: LabId) {
  const [selectedId, setSelectedId] = useState<string | null>(() => getArticleFromLocation(labId));

  useEffect(() => {
    const syncArticle = () => setSelectedId(getArticleFromLocation(labId));

    syncArticle();
    window.addEventListener("popstate", syncArticle);
    window.addEventListener("hashchange", syncArticle);

    return () => {
      window.removeEventListener("popstate", syncArticle);
      window.removeEventListener("hashchange", syncArticle);
    };
  }, [labId]);

  const openArticle = useCallback(
    (articleId: string) => {
      updateHashRoute([labId, articleId]);
      setSelectedId(articleId);
    },
    [labId]
  );

  const closeArticle = useCallback(() => {
    updateHashRoute([labId], "replace");
    setSelectedId(null);
  }, [labId]);

  return { selectedId, openArticle, closeArticle };
}
