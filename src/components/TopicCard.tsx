import Link from "next/link";
import type { Topic } from "@/data/topics";
import DifficultyBadge from "./DifficultyBadge";

const categoryLabel: Record<Topic["category"], string> = {
  sorting:           "Sorting",
  searching:         "Searching",
  "data-structures": "Data Structures",
  graphs:            "Graphs",
};

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {categoryLabel[topic.category]}
        </span>
        <DifficultyBadge difficulty={topic.difficulty} />
      </div>

      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-50 dark:group-hover:text-indigo-400 transition-colors">
        {topic.title}
      </h3>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {topic.description}
      </p>

      <div className="mt-auto grid grid-cols-3 gap-2 pt-2 text-center text-xs">
        {(["best", "average", "worst"] as const).map((k) => (
          <div key={k} className="rounded-lg bg-zinc-50 px-2 py-1.5 dark:bg-zinc-800">
            <div className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
              {topic.timeComplexity[k]}
            </div>
            <div className="text-zinc-500 dark:text-zinc-500 capitalize">{k}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}
