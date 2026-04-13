import { topics, levels, categories, getTopicsByLevel, type Level, type Category } from "@/data/topics";
import TopicCard from "@/components/TopicCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tematy" };

interface Props {
  searchParams: Promise<{ poziom?: string; kategoria?: string }>;
}

export default async function TematyPage({ searchParams }: Props) {
  const { poziom, kategoria } = await searchParams;

  const filtered = topics
    .filter((t) => !poziom   || t.level    === poziom)
    .filter((t) => !kategoria || t.category === kategoria)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Wszystkie tematy</h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        {filtered.length} {filtered.length === 1 ? "temat" : filtered.length < 5 ? "tematy" : "tematów"}
        {poziom && ` · ${levels.find((l) => l.slug === poziom)?.label}`}
        {kategoria && ` · ${categories.find((c) => c.slug === kategoria)?.label}`}
      </p>

      {/* Level filter */}
      <div className="mb-3 flex flex-wrap gap-2">
        <Link
          href="/tematy"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            !poziom && !kategoria
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          Wszystkie
        </Link>
        {levels.map((l) => (
          <Link
            key={l.slug}
            href={`/tematy?poziom=${l.slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              poziom === l.slug
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const count = topics.filter((t) => t.category === c.slug && (!poziom || t.level === poziom)).length;
          if (!count) return null;
          return (
            <Link
              key={c.slug}
              href={`/tematy?${poziom ? `poziom=${poziom}&` : ""}kategoria=${c.slug}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                kategoria === c.slug
                  ? "bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {c.label} <span className="opacity-60">({count})</span>
            </Link>
          );
        })}
      </div>

      {/* Show by level if no filter */}
      {!poziom && !kategoria ? (
        <div className="space-y-14">
          {levels.map((level) => {
            const levelTopics = getTopicsByLevel(level.slug);
            return (
              <div key={level.slug}>
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{level.label}</h2>
                  <span className="text-sm text-zinc-400">{levelTopics.length} tematów</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {levelTopics.map((t) => <TopicCard key={t.slug} topic={t} />)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => <TopicCard key={t.slug} topic={t} />)}
        </div>
      )}
    </div>
  );
}
