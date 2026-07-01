export enum AppState {
  HOME_LIGHT_FIELD = "HOME_LIGHT_FIELD",
  ABOUT_STATE = "ABOUT_STATE",
  AI_DOCUMENT_STATE = "AI_DOCUMENT_STATE",
  CRAFT_MATERIAL_STATE = "CRAFT_MATERIAL_STATE",
  LIFE_MEMORY_STATE = "LIFE_MEMORY_STATE"
}

export type LabId = "ai" | "craft" | "life";

export type TransitionPhase =
  | "idle"
  | "light-bias"
  | "field-distortion"
  | "collapse"
  | "structure-emergence"
  | "ui-mount";

export interface LabDefinition {
  id: LabId;
  state: AppState;
  name: string;
  title: string;
  physics: string;
  color: string;
}
