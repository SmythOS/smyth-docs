import { ReactNode } from 'react';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';

interface Props {
  type?: 'info' | 'warn' | 'tip';
  children: ReactNode;
}

/** Shared callout wrapper – used by InfoCallout, WarningCallout, Tip */
export default function BaseCallout({ type = 'info', children }: Props) {
  const styles = {
    info: [
      'border-blue-500',
      'bg-blue-50',
      'text-blue-800',
      'dark:bg-blue-900/10',
      'dark:text-blue-300',
      <Info className="w-5 h-5 mt-1 shrink-0" />
    ],
    warn: [
      'border-yellow-500',
      'bg-yellow-50',
      'text-yellow-800',
      'dark:bg-yellow-900/10',
      'dark:text-yellow-300',
      <AlertTriangle className="w-5 h-5 mt-1 shrink-0" />
    ],
    tip: [
      'border-green-500',
      'bg-green-50',
      'text-green-800',
      'dark:bg-green-900/10',
      'dark:text-green-300',
      <Lightbulb className="w-5 h-5 mt-1 shrink-0" />
    ],
  }[type];

  const [border, bg, text, darkBg, darkText, icon] = styles;

  return (
    <div
      className={`
        my-4 flex items-start gap-3 rounded-md border-l-4 px-4 py-3 shadow-sm
        ${border} ${bg} ${text} ${darkBg} ${darkText}
      `}
    >
      <div>{icon}</div>
      <div className="min-w-0 leading-relaxed">{children}</div>
    </div>
  );
}
