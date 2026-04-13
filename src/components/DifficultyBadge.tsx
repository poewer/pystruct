import type { Difficulty } from "@/data/topics";

const styles: Record<Difficulty, string> = {
  podstawowy:          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  sredniozaawansowany: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  zaawansowany:        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const labels: Record<Difficulty, string> = {
  podstawowy:          "Podstawowy",
  sredniozaawansowany: "Średniozaawansowany",
  zaawansowany:        "Zaawansowany",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[difficulty]}`}>
      {labels[difficulty]}
    </span>
  );
}
