"use client";
import Link from "next/link";
import { topics, levels, getTopicsByLevel, categories } from "@/data/topics";
import { useProgress } from "@/hooks/useProgress";

const levelColors = {
  podstawy:     { ring: "ring-green-200 dark:ring-green-800",  dot: "bg-green-500", bar: "bg-green-500", badge: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" },
  sredni:       { ring: "ring-yellow-200 dark:ring-yellow-800", dot: "bg-yellow-500", bar: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300" },
  zaawansowany: { ring: "ring-red-200 dark:ring-red-800",       dot: "bg-red-500",   bar: "bg-red-500",   badge: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300" },
};

export default function LearningPathView() {
  const { isCompleted, toggle, completedCount, totalCount, mounted } = useProgress();

  const nextIncomplete = mounted
    ? topics.sort((a, b) => a.order - b.order).find((t) => !isCompleted(t.slug))
    : undefined;

  return (
    <div>
      {/* Overall progress */}
      <div className="mb-10 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Twój postęp</span>
          <span className="font-mono text-zinc-500">{mounted ? completedCount : 0} / {totalCount} ukończonych</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: mounted ? `${(completedCount / totalCount) * 100}%` : "0%" }}
          />
        </div>
        {nextIncomplete && mounted && (
          <div className="mt-4">
            <Link
              href={`/tematy/${nextIncomplete.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Kontynuuj naukę: {nextIncomplete.title} →
            </Link>
          </div>
        )}
      </div>

      {/* Levels */}
      <div className="space-y-14">
        {levels.map((level) => {
          const levelTopics = getTopicsByLevel(level.slug);
          const doneInLevel = mounted ? levelTopics.filter((t) => isCompleted(t.slug)).length : 0;
          const colors = levelColors[level.slug];

          return (
            <section key={level.slug}>
              <div className="mb-5 flex items-center gap-4">
                <div className={`h-3 w-3 rounded-full ${colors.dot}`} />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{level.label}</h2>
                <span className="text-sm text-zinc-400">{doneInLevel}/{levelTopics.length}</span>
                <div className="flex-1 max-w-[120px]">
                  <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all ${colors.bar}`}
                      style={{ width: `${(doneInLevel / levelTopics.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">{level.description}</p>

              <div className="space-y-2">
                {levelTopics.map((topic) => {
                  const done = mounted && isCompleted(topic.slug);
                  const catLabel = categories.find((c) => c.slug === topic.category)?.label ?? topic.category;
                  return (
                    <div
                      key={topic.slug}
                      className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                        done
                          ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
                          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => toggle(topic.slug)}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          done
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-zinc-300 bg-white hover:border-indigo-400 dark:border-zinc-600 dark:bg-zinc-800"
                        }`}
                        aria-label={done ? "Oznacz jako nieukończone" : "Oznacz jako ukończone"}
                      >
                        {done && (
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {/* Order number */}
                      <span className="w-6 shrink-0 text-center font-mono text-xs text-zinc-300 dark:text-zinc-600">
                        {topic.order}
                      </span>

                      {/* Content */}
                      <Link href={`/tematy/${topic.slug}`} className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-semibold text-zinc-900 dark:text-zinc-50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${done ? "line-through opacity-60" : ""}`}>
                            {topic.title}
                          </span>
                          <span className="font-mono text-xs text-zinc-400">{topic.subtitle}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 truncate">
                          {topic.description}
                        </p>
                      </Link>

                      {/* Category + complexity */}
                      <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                        <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800">
                          {catLabel}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">{topic.timeComplexity.average}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
