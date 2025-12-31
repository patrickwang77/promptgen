export interface PromptOption {
  id: string;
  label: string;
  description: string; // The user-friendly description
  promptValue: string; // The actual text injected into the prompt
  icon?: string;
  previewColor?: string;
}

export interface PromptState {
  style: PromptOption | null;
  structure: PromptOption | null;
  elements: PromptOption | null;
  color: PromptOption | null;
  layout: PromptOption | null;
}

export type CategoryKey = keyof PromptState;

export interface CategoryDefinition {
  key: CategoryKey;
  title: string;
  description: string;
  options: PromptOption[];
}

export interface Preset {
  name: string;
  description: string;
  data: PromptState;
}