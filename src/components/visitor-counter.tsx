"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const COUNTER_NAMESPACE = "gatb-guide-live";
const COUNTER_KEY = "visitors";
const API_BASE = "https://api.counterapi.dev/v1";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function trackVisit() {
      try {
        const alreadyCounted = sessionStorage.getItem("visitor_counted");

        if (alreadyCounted) {
          const res = await fetch(
            `${API_BASE}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`,
            { cache: "no-store" }
          );
          if (res.ok) {
            const data = await res.json();
            setCount(data.count);
          } else {
            setError(true);
          }
          return;
        }

        const res = await fetch(
          `${API_BASE}/${COUNTER_NAMESPACE}/${COUNTER_KEY}/up`,
          { cache: "no-store" }
        );

        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
          sessionStorage.setItem("visitor_counted", "true");
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    }

    trackVisit();
  }, []);

  if (error || count === null) {
    if (error) return null;
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
        <Users className="h-3.5 w-3.5 animate-pulse" />
        <span className="animate-pulse">loading...</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <Users className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
      <span>
        <strong className="text-slate-800 dark:text-slate-200 font-bold tabular-nums">
          {count.toLocaleString()}
        </strong>{" "}
        Students got benefited
      </span>
    </div>
  );
}
