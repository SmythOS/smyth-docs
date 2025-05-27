// src/components/mdx/Tabs.tsx
import React, { ReactNode, useState } from 'react';

type Tab = { label: string; content: ReactNode; id?: string };

interface Props {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

/** Simple Tailwind tab switcher — works great for Mac / Windows / Linux code snippets. */
export default function Tabs({ tabs, defaultIndex = 0, className }: Props) {
  const [index, setIndex] = useState(defaultIndex);

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab, i) => (
          <button
            key={tab.id ?? tab.label}
            onClick={() => setIndex(i)}
            className={`rounded-t px-3 py-1.5 text-sm ${
              i === index
                ? 'bg-slate-100 font-medium dark:bg-slate-800'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-b bg-slate-50 p-4 dark:bg-slate-900">
        {tabs[index].content}
      </div>
    </div>
  );
}
