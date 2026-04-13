"use client";
import { useProgress } from "@/hooks/useProgress";
import Link from "next/link";

export default function NavProgress() {
  const { completedCount, totalCount, mounted } = useProgress();
  if (!mounted) return null;
  const pct = Math.round((completedCount / totalCount) * 100);
  return (
    <Link
      href="/sciezka"
      className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors"
    >
      <span className="tabular-nums">{completedCount}/{totalCount}</span>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-300 dark:bg-zinc-600">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  );
}
