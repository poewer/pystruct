import type { Difficulty } from "@/data/topics";

const styles: Record<Difficulty, string> = {
  beginner:     "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced:     "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
