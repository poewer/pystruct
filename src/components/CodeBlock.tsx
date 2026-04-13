"use client";

import { useEffect, useState } from "react";

interface Props {
  code: string;
}

export default function CodeBlock({ code }: Props) {
  const [html, setHtml]         = useState<string>("");
  const [copied, setCopied]     = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { codeToHtml } = await import("shiki");
      const result = await codeToHtml(code, {
        lang: "python",
        themes: { light: "github-light", dark: "github-dark" },
      });
      if (!cancelled) setHtml(result);
    })();
    return () => { cancelled = true; };
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {html ? (
        <div
          className="[&>pre]:overflow-x-auto [&>pre]:p-5 [&>pre]:text-sm [&>pre]:leading-6 [&>pre]:font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto bg-zinc-50 p-5 text-sm leading-6 font-mono text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
