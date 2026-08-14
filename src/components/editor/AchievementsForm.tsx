"use client";

import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { BulletListEditor } from "@/components/editor/BulletListEditor";

export function AchievementsForm({
  dragHandle,
}: {
  dragHandle?: React.ReactNode;
}) {
  const achievements = useResumeStore((s) => s.resume.achievements);
  const setAchievements = useResumeStore((s) => s.setAchievements);

  return (
    <SectionCard
      title="Achievements"
      description="Optional. Awards, honors, publications, certifications, or other notable accomplishments."
      dragHandle={dragHandle}
    >
      {achievements.length === 0 && (
        <p className="mb-2 text-sm text-slate-400">
          No achievements added yet.
        </p>
      )}
      <BulletListEditor bullets={achievements} onChange={setAchievements} />
    </SectionCard>
  );
}
