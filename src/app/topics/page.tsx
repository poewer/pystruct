import { topics, categories } from "@/data/topics";
import TopicCard from "@/components/TopicCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Topics" };

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function TopicsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const filtered = category
    ? topics.filter((t) => t.category === category)
    : topics;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">All Topics</h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        {filtered.length} topic{filtered.length !== 1 ? "s" : ""}
        {category ? ` in ${categories.find((c) => c.slug === category)?.label ?? category}` : ""}
      </p>

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/topics"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            !category
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/topics?category=${cat.slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === cat.slug
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => <TopicCard key={t.slug} topic={t} />)}
      </div>
    </div>
  );
}
