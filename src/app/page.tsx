import Link from "next/link";
import { topics, levels, getTopicsByLevel } from "@/data/topics";
import TopicCard from "@/components/TopicCard";

const levelColorMap = {
  podstawy:     { bg: "bg-green-50 dark:bg-green-950/30",  border: "border-green-200 dark:border-green-800",  badge: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" },
  sredni:       { bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-200 dark:border-yellow-800", badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300" },
  zaawansowany: { bg: "bg-red-50 dark:bg-red-950/30",       border: "border-red-200 dark:border-red-800",       badge: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300" },
};

export default function Home() {
  const featured = getTopicsByLevel("podstawy").slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="mb-20 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
          Open-source · Python · Bezpłatnie
        </div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Opanuj algorytmy
          <br />
          <span className="text-indigo-600">i struktury danych</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Jasne wyjaśnienia po polsku, analiza złożoności i kod w Pythonie.
          Od list i słowników po drzewa przedziałowe — wszystko w jednym miejscu.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/sciezka"
            className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-indigo-700"
          >
            Zacznij ścieżkę nauki →
          </Link>
          <Link
            href="/tematy"
            className="rounded-full border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-700 shadow transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Przeglądaj tematy
          </Link>
        </div>
      </section>

      {/* Levels overview */}
      <section className="mb-20">
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Poziomy nauki</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {levels.map((level) => {
            const levelTopics = getTopicsByLevel(level.slug);
            const colors = levelColorMap[level.slug];
            return (
              <Link
                key={level.slug}
                href={`/tematy?poziom=${level.slug}`}
                className={`group rounded-xl border p-6 transition hover:shadow-md ${colors.bg} ${colors.border}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors.badge}`}>
                    {level.label}
                  </span>
                  <span className="text-sm text-zinc-500">{levelTopics.length} tematów</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{level.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {levelTopics.slice(0, 4).map((t) => (
                    <span key={t.slug} className="rounded bg-white/70 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900/70 dark:text-zinc-400">
                      {t.subtitle}
                    </span>
                  ))}
                  {levelTopics.length > 4 && (
                    <span className="rounded bg-white/70 px-2 py-0.5 text-xs text-zinc-400 dark:bg-zinc-900/70">
                      +{levelTopics.length - 4} więcej
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: topics.length, label: "Tematów" },
          { value: "25+", label: "Przykładów kodu" },
          { value: "3", label: "Poziomy trudności" },
          { value: "100%", label: "Bezpłatnie" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-3xl font-extrabold text-indigo-600">{s.value}</div>
            <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Featured topics */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Zacznij tutaj</h2>
          <Link href="/tematy" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Wszystkie tematy →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => <TopicCard key={t.slug} topic={t} />)}
        </div>
      </section>
    </div>
  );
}
