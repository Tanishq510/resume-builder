"use client";

import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { BulletListEditor } from "@/components/editor/BulletListEditor";
import { EditableHeading } from "@/components/EditableHeading";
import { useSectionHeading } from "@/hooks/useSectionHeading";

export function AchievementsForm({
  dragHandle,
}: {
  dragHandle?: React.ReactNode;
}) {
  const achievements = useResumeStore((s) => s.resume.achievements);
  const setAchievements = useResumeStore((s) => s.setAchievements);
  const headingValue = useSectionHeading("achievements");

  return (
    <SectionCard
      title="Achievements"
      titleContent={
        <EditableHeading
          section="achievements"
          value={headingValue}
          className="text-sm font-semibold text-slate-900"
        />
      }
      description="Optional. Awards, honors, publications, or other notable accomplishments."
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
