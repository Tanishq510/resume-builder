"use client";

import { Plus, Trash2 } from "lucide-react";
import { TextArea } from "@/components/ui/inputs";

export function BulletListEditor({
  bullets,
  onChange,
}: {
  bullets: string[];
  onChange: (bullets: string[]) => void;
}) {
  const updateBullet = (index: number, value: string) => {
    const next = [...bullets];
    next[index] = value;
    onChange(next);
  };

  const removeBullet = (index: number) => {
    onChange(bullets.filter((_, i) => i !== index));
  };

  const addBullet = () => onChange([...bullets, ""]);

  return (
    <div className="space-y-2">
      <span className="mb-1 block text-xs font-medium text-slate-600">
        Bullet points
      </span>
      {bullets.map((bullet, index) => (
        <div key={index} className="flex items-start gap-2">
          <TextArea
            rows={2}
            value={bullet}
            placeholder="Describe an achievement, starting with an action verb (e.g. Led, Built, Reduced)"
            onChange={(e) => updateBullet(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeBullet(index)}
            className="mt-1 shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
            aria-label="Remove bullet"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addBullet}
        className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
      >
        <Plus size={14} /> Add bullet
      </button>
    </div>
  );
}
