import Link from "next/link";
import NavProgress from "./NavProgress";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold text-zinc-900 dark:text-zinc-50">
          <span className="rounded bg-indigo-600 px-2 py-0.5 text-white">py</span>
          struct
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/tematy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Tematy
          </Link>
          <Link href="/sciezka" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Ścieżka nauki
          </Link>
          <a
            href="https://github.com/poewer/pystruct"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
          <NavProgress />
        </div>
      </div>
    </nav>
  );
}
