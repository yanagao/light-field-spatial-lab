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
  returnHome: () => void;
  setFocusedLab: (lab: LabId | null) => void;
}

let activeTimers: number[] = [];

const clearActiveTimers = () => {
  activeTimers.forEach((timer) => window.clearTimeout(timer));
  activeTimers = [];
};

export const useSpatialStore = create<SpatialState>((set, get) => ({
  appState: AppState.HOME_LIGHT_FIELD,
  selectedLab: null,
  transitionPhase: "idle",
  isTransitioning: false,
  focusedLab: null,
  setFocusedLab: (lab) => set({ focusedLab: lab }),
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
    set({
      appState: AppState.HOME_LIGHT_FIELD,
      selectedLab: null,
      focusedLab: null,
      transitionPhase: "idle",
      isTransitioning: false
    });
  }
}));
