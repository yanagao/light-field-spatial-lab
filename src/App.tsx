import { Suspense, lazy, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LightFieldEngine } from "./components/LightFieldEngine";
import { TransitionController } from "./components/TransitionController";
import { useSpatialStore } from "./state/useSpatialStore";
import { AppState } from "./types";

const AboutMe = lazy(() => import("./labs/AboutMe"));
const AILab = lazy(() => import("./labs/AILab"));
const CraftLab = lazy(() => import("./labs/CraftLab"));
const LifeLab = lazy(() => import("./labs/LifeLab"));

function App() {
  const appState = useSpatialStore((state) => state.appState);
  const syncFromLocation = useSpatialStore((state) => state.syncFromLocation);

  useEffect(() => {
    const handleLocationChange = () => syncFromLocation();

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [syncFromLocation]);

  return (
    <main className="app-shell">
      <TransitionController />
      <AnimatePresence mode="wait">
        {appState === AppState.HOME_LIGHT_FIELD && (
          <motion.section
            key="home"
            className="state-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(18px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <LightFieldEngine />
          </motion.section>
        )}

        {appState !== AppState.HOME_LIGHT_FIELD && (
          <motion.section
            key={appState}
            className="state-layer"
            initial={{ opacity: 0, y: 24, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(16px)" }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<div className="lab-loading">resolving field</div>}>
              {appState === AppState.ABOUT_STATE && <AboutMe />}
              {appState === AppState.AI_DOCUMENT_STATE && <AILab />}
              {appState === AppState.CRAFT_MATERIAL_STATE && <CraftLab />}
              {appState === AppState.LIFE_MEMORY_STATE && <LifeLab />}
            </Suspense>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
