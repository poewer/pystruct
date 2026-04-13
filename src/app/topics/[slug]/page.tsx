import { notFound } from "next/navigation";
import Link from "next/link";
import { topics } from "@/data/topics";
import DifficultyBadge from "@/components/DifficultyBadge";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return {};
  return { title: topic.title, description: topic.description };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) notFound();

  const related = topics
    .filter((t) => t.category === topic.category && t.slug !== topic.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-800 dark:hover:text-zinc-200">Home</Link>
        {" / "}
        <Link href="/topics" className="hover:text-zinc-800 dark:hover:text-zinc-200">Topics</Link>
        {" / "}
        <span className="text-zinc-800 dark:text-zinc-200">{topic.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {topic.category.replace("-", " ")}
          </span>
          <DifficultyBadge difficulty={topic.difficulty} />
        </div>
        <h1 className="mb-3 text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">{topic.title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{topic.description}</p>
      </header>

      {/* Complexity table */}
      <section className="mb-10 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">Complexity</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["best", "average", "worst"] as const).map((k) => (
            <div key={k} className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
              <div className="font-mono text-lg font-bold text-zinc-800 dark:text-zinc-100">
                {topic.timeComplexity[k]}
              </div>
              <div className="text-xs text-zinc-500 capitalize">{k} time</div>
            </div>
          ))}
          <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
            <div className="font-mono text-lg font-bold text-zinc-800 dark:text-zinc-100">
              {topic.spaceComplexity}
            </div>
            <div className="text-xs text-zinc-500">space</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">How it works</h2>
        <p className="mb-6 text-zinc-600 leading-relaxed dark:text-zinc-400">{topic.explanation}</p>

        <ol className="space-y-2">
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
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">Python Implementation</h2>
        <CodeBlock code={topic.code} />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">Related Topics</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
              >
                {t.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
