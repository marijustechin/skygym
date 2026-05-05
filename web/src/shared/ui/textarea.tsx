import { cn } from '@/shared/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full p-2 bg-slate-700 border-slate-500 border rounded-md text-slate-50 focus:border-slate-400 focus:outline-none focus:ring-0',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
