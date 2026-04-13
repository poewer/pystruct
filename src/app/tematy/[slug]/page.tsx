import { notFound } from "next/navigation";
import Link from "next/link";
import { topics, categories, getNextTopic, getPrevTopic } from "@/data/topics";
import CodeBlock from "@/components/CodeBlock";
import ProgressButton from "@/components/ProgressButton";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = topics.find((t) => t.slug === slug);
  if (!t) return {};
  return { title: t.title, description: t.description };
}

const levelLabel = { podstawy: "Podstawy", sredni: "Poziom Średni", zaawansowany: "Zaawansowany" };
const levelColors = {
  podstawy:     "text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-950/40 dark:border-green-800",
  sredni:       "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-300 dark:bg-yellow-950/40 dark:border-yellow-800",
  zaawansowany: "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950/40 dark:border-red-800",
};

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) notFound();

  const next = getNextTopic(slug);
  const prev = getPrevTopic(slug);
  const catLabel = categories.find((c) => c.slug === topic.category)?.label ?? topic.category;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-400">
        <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200">Strona główna</Link>
        <span>/</span>
        <Link href="/tematy" className="hover:text-zinc-700 dark:hover:text-zinc-200">Tematy</Link>
        <span>/</span>
        <span className="text-zinc-700 dark:text-zinc-300">{topic.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-0.5 text-xs font-bold ${levelColors[topic.level]}`}>
            {levelLabel[topic.level]}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {catLabel}
          </span>
          <span className="font-mono text-xs text-zinc-400">#{topic.order}</span>
        </div>
        <h1 className="mb-1 text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">{topic.title}</h1>
        <p className="mb-1 text-sm font-mono text-zinc-400">{topic.subtitle}</p>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">{topic.description}</p>
      </header>

      {/* Complexity */}
      <section className="mb-10 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-bold text-zinc-900 dark:text-zinc-50">Złożoność</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["best", "average", "worst"] as const).map((k) => (
            <div key={k} className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
              <div className="font-mono text-lg font-bold text-zinc-800 dark:text-zinc-100">
                {topic.timeComplexity[k]}
              </div>
              <div className="text-xs text-zinc-400">
                {k === "best" ? "Czas najlepszy" : k === "average" ? "Czas średni" : "Czas najgorszy"}
              </div>
            </div>
          ))}
          <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
            <div className="font-mono text-lg font-bold text-zinc-800 dark:text-zinc-100">
              {topic.spaceComplexity}
            </div>
            <div className="text-xs text-zinc-400">Pamięć</div>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-50">Jak to działa</h2>
        <p className="mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">{topic.explanation}</p>
        <ol className="space-y-2.5">
          {topic.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                {i + 1}
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Code */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">Implementacja w Pythonie</h2>
        <CodeBlock code={topic.code} />
      </section>

      {/* Mark complete + nav */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <ProgressButton slug={topic.slug} />
        <div className="flex gap-3">
          {prev && (
            <Link
              href={`/tematy/${prev.slug}`}
              className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500"
            >
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link
              href={`/tematy/${next.slug}`}
              className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {next.title} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
