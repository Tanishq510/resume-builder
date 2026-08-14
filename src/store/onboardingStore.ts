import { create } from "zustand";

export type OnboardingStage = "overview" | "tour" | null;

interface OnboardingStore {
  stage: OnboardingStage;
  openOverview: () => void;
  openTour: () => void;
  close: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  stage: null,
  openOverview: () => set({ stage: "overview" }),
  openTour: () => set({ stage: "tour" }),
  close: () => set({ stage: null }),
}));
