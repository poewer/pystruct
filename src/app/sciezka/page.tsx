import type { Metadata } from "next";
import LearningPathView from "./LearningPathView";

export const metadata: Metadata = {
  title: "Ścieżka nauki",
  description: "Pełna ścieżka nauki algorytmów i struktur danych w Pythonie.",
};

export default function SciezkaPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Ścieżka nauki</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Przejdź przez tematy w kolejności — od podstaw do zaawansowanych struktur.
          Kliknij kółko aby oznaczyć temat jako ukończony.
        </p>
      </div>
      <LearningPathView />
    </div>
  );
}
