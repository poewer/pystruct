"use client";
import { useState, useEffect, useCallback } from "react";
import { topics } from "@/data/topics";

const STORAGE_KEY = "pystruct-progress-v1";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompleted(new Set(JSON.parse(stored) as string[]));
    } catch {}
    setMounted(true);
  }, []);

  const toggle = useCallback((slug: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  const isCompleted = useCallback((slug: string) => completed.has(slug), [completed]);

  return {
    completed,
    toggle,
    isCompleted,
    completedCount: completed.size,
    totalCount: topics.length,
    mounted,
  };
}
