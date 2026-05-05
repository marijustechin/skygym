import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface FormShellProps {
  children: ReactNode;
  headerLabel: string;
  footer?: ReactNode;
  className?: string;
}
export const FormShell = ({
  children,
  headerLabel,
  footer,
  className,
}: FormShellProps) => {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-sm border-2 border-slate-600 rounded-lg p-6 bg-slate-800',
        className,
      )}
    >
      <h2 className="text-center text-slate-50 font-semibold text-xl py-3">
        {headerLabel}
      </h2>
      {children}
      {footer && <footer className="mt-6">{footer}</footer>}
    </section>
  );
};
