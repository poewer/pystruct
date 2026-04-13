import Link from "next/link";
import { topics, categories } from "@/data/topics";
import TopicCard from "@/components/TopicCard";

export default function Home() {
  const featured = topics.filter((t) => t.difficulty === "beginner").slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="mb-20 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
          Open-source · Python · Free forever
        </div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Learn Algorithms &amp; <br />
          <span className="text-indigo-600">Data Structures</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Clear explanations, complexity analysis, and runnable Python code for every topic.
          From bubble sort to graph traversals — all in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/topics"
            className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-indigo-700"
          >
            Browse All Topics
          </Link>
          <a
            href="https://github.com/poewer/pystruct"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-700 shadow transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-20">
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const count = topics.filter((t) => t.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/topics?category=${cat.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {count} topics
                </div>
                <h3 className="mb-1 font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-50 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{cat.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured (beginner) */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Start Here</h2>
          <Link href="/topics" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => <TopicCard key={t.slug} topic={t} />)}
        </div>
      </section>
    </div>
  );
}
