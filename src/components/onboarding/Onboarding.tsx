"use client";

import { useEffect } from "react";
import { useOnboardingStore } from "@/store/onboardingStore";
import { OverviewModal } from "@/components/onboarding/OverviewModal";
import { WalkthroughTour } from "@/components/onboarding/WalkthroughTour";

const SEEN_KEY = "ats-resume-builder-onboarding-seen";

export function Onboarding() {
  const stage = useOnboardingStore((s) => s.stage);
  const openOverview = useOnboardingStore((s) => s.openOverview);
  const openTour = useOnboardingStore((s) => s.openTour);
  const close = useOnboardingStore((s) => s.close);

  useEffect(() => {
    if (!window.localStorage.getItem(SEEN_KEY)) {
      window.localStorage.setItem(SEEN_KEY, "1");
      openOverview();
    }
    // Runs once on mount to check first-visit state only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === "overview") {
    return <OverviewModal onClose={close} onStartTour={openTour} />;
  }
  if (stage === "tour") {
    return <WalkthroughTour onClose={close} />;
  }
  return null;
}
