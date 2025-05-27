/* src/components/mdx/PromptCard.tsx */
import React, { useCallback, useState } from 'react';
import { Clipboard, Edit3, Check } from 'lucide-react';

export type PromptCardProps = { prompt: string; className?: string };

const PromptCard: React.FC<PromptCardProps> = ({ prompt, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1_000);
  }, [prompt]);

  const handleEdit = useCallback(() => {
    window.open(`/studio?prompt=${encodeURIComponent(prompt)}`, '_blank', 'noopener');
  }, [prompt]);

  return (
    <section
      className={`overflow-hidden rounded-md border border-slate-200 shadow-sm dark:border-slate-700 ${className ?? ''}`}
    >
      {}
      <div className="flex items-center justify-end gap-3 bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
        <ToolbarBtn onClick={handleCopy} label="Copy">
          {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
        </ToolbarBtn>
        <ToolbarBtn onClick={handleEdit} label="Edit">
          <Edit3 className="h-4 w-4" />
        </ToolbarBtn>
      </div>

      {}
      <pre className="whitespace-pre-wrap break-words bg-slate-50 px-5 py-4 font-mono text-sm leading-relaxed text-slate-800 dark:bg-slate-900 dark:text-slate-100">
        {prompt.split(/(\{\{.*?\}\})/g).map((chunk, i) =>
          /\{\{.*\}\}/.test(chunk) ? (
            <span key={i} className="text-emerald-600 dark:text-emerald-400">
              {chunk}
            </span>
          ) : (
            chunk
          ),
        )}
      </pre>
    </section>
  );
};

export default PromptCard;

type BtnProps = React.PropsWithChildren<{ onClick: () => void; label: string }>;

const ToolbarBtn: React.FC<BtnProps> = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium
               text-slate-600 hover:bg-slate-200 hover:text-slate-900
               dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
  >
    {children}
    {}
    <span className="hidden select-none sm:inline">{label}</span>
  </button>
);
