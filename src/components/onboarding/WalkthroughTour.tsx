"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

type Placement = "top" | "bottom" | "left" | "right";

interface TourStep {
  target: string;
  title: string;
  body: string;
  placement: Placement;
}

const steps: TourStep[] = [
  {
    target: "personal-info",
    title: "Start with your details",
    body: "Fill in your contact info here — keep it plain text so it stays ATS-parseable.",
    placement: "bottom",
  },
  {
    target: "sections",
    title: "Add your experience",
    body: "Add work history, education, skills, projects, and certificates below. Everything here is optional.",
    placement: "top",
  },
  {
    target: "drag-handle",
    title: "Reorder sections",
    body: "Drag this handle to move a section — put what matters most for the job near the top.",
    placement: "right",
  },
  {
    target: "template-selector",
    title: "Try a template",
    body: "Switch between ATS-safe templates from up here without breaking parsing.",
    placement: "bottom",
  },
  {
    target: "preview",
    title: "Watch it update live",
    body: "This panel mirrors exactly what a recruiter — and an ATS — will see, as you type.",
    placement: "left",
  },
  {
    target: "import",
    title: "Import an existing resume",
    body: "Already have one? Upload a PDF, DOCX, or TXT and this tool will prefill the form for you.",
    placement: "bottom",
  },
  {
    target: "download",
    title: "Download when ready",
    body: "Export a polished PDF or a plain Markdown file any time you're happy with it.",
    placement: "bottom",
  },
];

const SPOTLIGHT_PADDING = 6;
const TOOLTIP_GAP = 14;
const MARGIN = 12;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function findVisibleRect(target: string): Rect | null {
  const el = document.querySelector(`[data-tour="${target}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return null;
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

export function WalkthroughTour({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const reposition = useCallback(() => {
    setRect(findVisibleRect(current.target));
  }, [current.target]);

  useEffect(() => {
    const el = document.querySelector(`[data-tour="${current.target}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = window.setTimeout(reposition, 320);
    return () => window.clearTimeout(t);
  }, [current.target, reposition]);

  useEffect(() => {
    let raf = 0;
    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(reposition);
    };
    window.addEventListener("scroll", onScrollOrResize, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      cancelAnimationFrame(raf);
    };
  }, [reposition]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && !isLast) setStep((s) => s + 1);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, isLast, step]);

  const tooltipWidth = Math.min(300, window.innerWidth - MARGIN * 2);

  function tooltipStyle(): CSSProperties {
    if (!rect) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        width: tooltipWidth,
        transform: "translate(-50%, -50%)",
      };
    }
    const centeredLeft = clamp(
      rect.left + rect.width / 2 - tooltipWidth / 2,
      MARGIN,
      Math.max(MARGIN, window.innerWidth - tooltipWidth - MARGIN)
    );
    switch (current.placement) {
      case "bottom":
        return {
          position: "fixed",
          top: rect.top + rect.height + TOOLTIP_GAP,
          left: centeredLeft,
          width: tooltipWidth,
        };
      case "top":
        return {
          position: "fixed",
          top: rect.top - TOOLTIP_GAP,
          left: centeredLeft,
          width: tooltipWidth,
          transform: "translateY(-100%)",
        };
      case "left":
        return {
          position: "fixed",
          top: clamp(rect.top + rect.height / 2, MARGIN, window.innerHeight - MARGIN),
          left: rect.left - TOOLTIP_GAP,
          width: tooltipWidth,
          transform: "translate(-100%, -50%)",
        };
      case "right":
        return {
          position: "fixed",
          top: clamp(rect.top + rect.height / 2, MARGIN, window.innerHeight - MARGIN),
          left: rect.left + rect.width + TOOLTIP_GAP,
          width: tooltipWidth,
          transform: "translateY(-50%)",
        };
    }
  }

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-title"
    >
      {rect ? (
        <div
          className="pointer-events-none fixed rounded-lg transition-all duration-300 ease-out"
          style={{
            top: rect.top - SPOTLIGHT_PADDING,
            left: rect.left - SPOTLIGHT_PADDING,
            width: rect.width + SPOTLIGHT_PADDING * 2,
            height: rect.height + SPOTLIGHT_PADDING * 2,
            boxShadow:
              "0 0 0 3px rgba(255,255,255,0.95), 0 0 0 9999px rgba(15,23,42,0.6)",
          }}
        />
      ) : (
        <div className="pointer-events-none fixed inset-0 bg-slate-900/60" />
      )}

      <div
        className="pointer-events-auto rounded-lg bg-white p-4 shadow-xl transition-all duration-300 ease-out"
        style={tooltipStyle()}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Step {step + 1} of {steps.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-xs font-medium text-slate-400 hover:text-slate-600"
          >
            Skip tutorial
          </button>
        </div>
        <h2 id="tour-title" className="mt-2 text-sm font-semibold text-slate-900">
          {current.title}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
          {current.body}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === step ? "bg-slate-900" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => (isLast ? onClose() : setStep((s) => s + 1))}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
            >
              {isLast ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
