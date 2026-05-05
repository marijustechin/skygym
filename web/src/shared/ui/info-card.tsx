import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface CardLine {
  text: string;
  important: boolean;
  href?: string;
}

export interface InfoCardData {
  title: string;
  icon: ReactNode;
  lines: CardLine[];
}

export function InfoCard({ card }: { card: InfoCardData }) {
  return (
    <article className="flex flex-col gap-6 rounded-xl border-2 border-slate-600 text-slate-950 transition-colors duration-300 hover:border-slate-600/50">
      <div className="p-6 last:pb-6">
        <div className="flex items-start space-x-4">
          <div
            className="shrink-0 rounded-lg bg-slate-300 p-3"
            aria-hidden="true"
          >
            {card.icon}
          </div>
          <div>
            <h3 className="mb-2 font-bold text-slate-950">{card.title}</h3>
            {card.lines.map((line) =>
              line.href ? (
                <Link
                  key={line.text}
                  href={line.href}
                  className={cn(
                    'block hover:underline',
                    line.important ? 'text-red-600 font-semibold' : 'text-slate-950',
                  )}
                >
                  {line.text}
                </Link>
              ) : (
                <p
                  className={cn(line.important && 'text-red-600')}
                  key={line.text}
                >
                  {line.text}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
