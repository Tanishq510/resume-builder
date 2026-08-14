"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";

export function ReorderableSection({
  index,
  count,
  onReorder,
  children,
}: {
  index: number;
  count: number;
  onReorder: (from: number, to: number) => void;
  children: (dragHandle: React.ReactNode) => React.ReactNode;
}) {
  const [canDrag, setCanDrag] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const dragHandle = (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        data-tour={index === 0 ? "drag-handle" : undefined}
        aria-label="Drag to reorder section"
        onMouseDown={() => setCanDrag(true)}
        onMouseUp={() => setCanDrag(false)}
        onTouchStart={() => setCanDrag(true)}
        onTouchEnd={() => setCanDrag(false)}
        className="mt-0.5 hidden shrink-0 cursor-grab touch-none rounded p-0.5 text-slate-300 hover:text-slate-500 active:cursor-grabbing sm:block"
      >
        <GripVertical size={16} />
      </button>
      <div className="flex sm:hidden flex-col">
        <button
          type="button"
          aria-label="Move section up"
          disabled={index === 0}
          onClick={() => onReorder(index, index - 1)}
          className="rounded p-0.5 text-slate-300 hover:text-slate-500 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronUp size={16} />
        </button>
        <button
          type="button"
          aria-label="Move section down"
          disabled={index === count - 1}
          onClick={() => onReorder(index, index + 1)}
          className="rounded p-0.5 text-slate-300 hover:text-slate-500 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div
      data-tour={index === 0 ? "sections" : undefined}
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
