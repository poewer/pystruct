"use client";
import Link from "next/link";
import type { Topic } from "@/data/topics";
import { useProgress } from "@/hooks/useProgress";
import { categories } from "@/data/topics";

const levelColors = {
  podstawy:     "text-green-600 dark:text-green-400",
  sredni:       "text-yellow-600 dark:text-yellow-400",
  zaawansowany: "text-red-600 dark:text-red-400",
};

export default function TopicCard({ topic }: { topic: Topic }) {
  const { isCompleted, mounted } = useProgress();
  const done = mounted && isCompleted(topic.slug);
  const catLabel = categories.find((c) => c.slug === topic.category)?.label ?? topic.category;

  return (
    <Link
      href={`/tematy/${topic.slug}`}
      className={`group relative flex flex-col gap-3 rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-zinc-900 ${
        done
          ? "border-green-300 dark:border-green-700"
          : "border-zinc-200 hover:border-indigo-400 dark:border-zinc-800 dark:hover:border-indigo-500"
      }`}
    >
      {done && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}

      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold uppercase tracking-wider ${levelColors[topic.level]}`}>
          {catLabel}
        </span>
      </div>

      <h3 className="text-base font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-50 dark:group-hover:text-indigo-400 transition-colors leading-snug">
        {topic.title}
      </h3>

      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
        {topic.description}
      </p>

      <div className="mt-auto grid grid-cols-3 gap-1.5 pt-2 text-center text-xs">
        {(["best", "average", "worst"] as const).map((k) => (
          <div key={k} className="rounded-lg bg-zinc-50 px-2 py-1.5 dark:bg-zinc-800">
            <div className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
              {topic.timeComplexity[k]}
            </div>
            <div className="text-zinc-400 dark:text-zinc-500">
              {k === "best" ? "Najlepszy" : k === "average" ? "Średni" : "Najgorszy"}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
