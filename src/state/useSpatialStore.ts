import { create } from "zustand";
import { AppState, type LabId, type TransitionPhase } from "../types";
import { labs } from "../data/content";

const phaseDurations: Array<{ phase: TransitionPhase; duration: number }> = [
  { phase: "light-bias", duration: 520 },
  { phase: "field-distortion", duration: 620 },
  { phase: "collapse", duration: 520 },
  { phase: "structure-emergence", duration: 620 },
  { phase: "ui-mount", duration: 220 }
];

interface SpatialState {
  appState: AppState;
  selectedLab: LabId | null;
  transitionPhase: TransitionPhase;
  isTransitioning: boolean;
  focusedLab: LabId | null;
  navigateTo: (lab: LabId) => void;
  openAbout: () => void;
  returnHome: () => void;
  syncFromLocation: () => void;
  setFocusedLab: (lab: LabId | null) => void;
}

let activeTimers: number[] = [];

const labRouteStates: Record<LabId, AppState> = {
  ai: AppState.AI_DOCUMENT_STATE,
  craft: AppState.CRAFT_MATERIAL_STATE,
  life: AppState.LIFE_MEMORY_STATE
};

const getLocationState = (): Pick<SpatialState, "appState" | "selectedLab"> => {
  if (typeof window === "undefined") {
    return { appState: AppState.HOME_LIGHT_FIELD, selectedLab: null };
  }

  const route = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (route === "about") {
    return { appState: AppState.ABOUT_STATE, selectedLab: null };
  }

  if (route === "ai" || route === "craft" || route === "life") {
    return { appState: labRouteStates[route], selectedLab: route };
  }

  return { appState: AppState.HOME_LIGHT_FIELD, selectedLab: null };
};

const pushRoute = (route: string) => {
  const nextHash = `#/${route}`;
  if (window.location.hash !== nextHash) {
    window.history.pushState(null, "", nextHash);
  }
};

const clearActiveTimers = () => {
  activeTimers.forEach((timer) => window.clearTimeout(timer));
  activeTimers = [];
};

const initialLocationState = getLocationState();

export const useSpatialStore = create<SpatialState>((set, get) => ({
  ...initialLocationState,
  transitionPhase: "idle",
  isTransitioning: false,
  focusedLab: initialLocationState.selectedLab,
  setFocusedLab: (lab) => set({ focusedLab: lab }),
  openAbout: () => {
    const current = get();
    if (current.isTransitioning || current.appState !== AppState.HOME_LIGHT_FIELD) {
      return;
    }

    clearActiveTimers();
    pushRoute("about");
    set({
      appState: AppState.ABOUT_STATE,
      selectedLab: null,
      focusedLab: null,
      transitionPhase: "idle",
      isTransitioning: false
    });
  },
  navigateTo: (lab) => {
    const current = get();
    if (current.isTransitioning || current.appState !== AppState.HOME_LIGHT_FIELD) {
      return;
    }

    const target = labs.find((definition) => definition.id === lab);
    if (!target) {
      return;
    }

    clearActiveTimers();
    pushRoute(lab);
    set({
      selectedLab: lab,
      focusedLab: lab,
      isTransitioning: true,
      transitionPhase: "light-bias"
    });

    let elapsed = 0;
    phaseDurations.slice(1).forEach(({ phase, duration }) => {
      elapsed += duration;
      activeTimers.push(
        window.setTimeout(() => {
          set({ transitionPhase: phase });
        }, elapsed)
      );
    });

    activeTimers.push(
      window.setTimeout(() => {
        set({
          appState: target.state,
          transitionPhase: "idle",
          isTransitioning: false
        });
      }, 2500)
    );
  },
  returnHome: () => {
    clearActiveTimers();
    pushRoute("");
    set({
      appState: AppState.HOME_LIGHT_FIELD,
      selectedLab: null,
      focusedLab: null,
      transitionPhase: "idle",
      isTransitioning: false
    });
  },
  syncFromLocation: () => {
    clearActiveTimers();
    const locationState = getLocationState();
    set({
      ...locationState,
      focusedLab: locationState.selectedLab,
      transitionPhase: "idle",
      isTransitioning: false
    });
  }
}));
