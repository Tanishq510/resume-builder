"use client";

import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { corporateJokes } from "@/lib/jokes";

export function FooterJoke() {
  // Picked client-side after mount (not during render) so the server-
  // rendered HTML and the client's first render always match — a random
  // pick during render would differ between server and client and trigger
  // a hydration mismatch.
  const [joke, setJoke] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setJoke(
        corporateJokes[Math.floor(Math.random() * corporateJokes.length)]
      );
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!joke) return null;

  return (
    <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-xs text-slate-400 sm:justify-start">
      <Coffee size={13} className="mt-0.5 shrink-0" />
      <span>{joke}</span>
    </p>
  );
}
