"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";

export function ReorderableSection({
  index,
  onReorder,
  children,
}: {
  index: number;
  onReorder: (from: number, to: number) => void;
  children: (dragHandle: React.ReactNode) => React.ReactNode;
}) {
  const [canDrag, setCanDrag] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const dragHandle = (
    <button
      type="button"
      aria-label="Drag to reorder section"
      onMouseDown={() => setCanDrag(true)}
      onMouseUp={() => setCanDrag(false)}
      onTouchStart={() => setCanDrag(true)}
      onTouchEnd={() => setCanDrag(false)}
      className="mt-0.5 shrink-0 cursor-grab touch-none rounded p-0.5 text-slate-300 hover:text-slate-500 active:cursor-grabbing"
    >
      <GripVertical size={16} />
    </button>
  );

  return (
    <div
      draggable={canDrag}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(index));
      }}
      onDragEnd={() => {
        setCanDrag(false);
        setIsDragOver(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const from = Number(e.dataTransfer.getData("text/plain"));
        if (!Number.isNaN(from) && from !== index) {
          onReorder(from, index);
        }
      }}
      className={`rounded-lg transition-shadow ${
        isDragOver ? "ring-2 ring-slate-400 ring-offset-2" : ""
      }`}
    >
      {children(dragHandle)}
    </div>
  );
}
