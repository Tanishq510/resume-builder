"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-3 space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="rounded-md border border-slate-200 bg-slate-50"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 p-4 text-left"
            >
              <h4 className="font-semibold text-slate-900">
                {item.question}
              </h4>
              <ChevronDown
                size={18}
                className={`shrink-0 text-slate-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Kept in the DOM (just visually hidden) rather than
                conditionally unmounted, so the answer text stays crawlable
                even when the accordion item is collapsed. */}
            <p
              className={`px-4 pb-4 text-slate-700 leading-relaxed ${
                isOpen ? "block" : "hidden"
              }`}
            >
              {item.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
}
