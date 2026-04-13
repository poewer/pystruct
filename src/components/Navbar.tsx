import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold text-zinc-900 dark:text-zinc-50">
          <span className="rounded bg-indigo-600 px-2 py-0.5 text-white">py</span>
          struct
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/topics" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            All Topics
          </Link>
          <Link href="/topics?category=sorting" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Sorting
          </Link>
          <Link href="/topics?category=searching" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Searching
          </Link>
          <Link href="/topics?category=data-structures" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Data Structures
          </Link>
          <Link href="/topics?category=graphs" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Graphs
          </Link>
          <a
            href="https://github.com/poewer/pystruct"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
