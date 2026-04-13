"use client";
import { useProgress } from "@/hooks/useProgress";

export default function ProgressButton({ slug }: { slug: string }) {
  const { isCompleted, toggle, mounted } = useProgress();
  if (!mounted) return null;
  const done = isCompleted(slug);
  return (
    <button
      onClick={() => toggle(slug)}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
        done
          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60"
          : "bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500"
      }`}
    >
      {done ? (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Ukończony
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Oznacz jako ukończony
        </>
      )}
    </button>
  );
}
