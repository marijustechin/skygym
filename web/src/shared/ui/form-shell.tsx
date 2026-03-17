import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
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
    <Card size='sm' className={cn('mx-auto w-full max-w-sm', className)}>
      <CardHeader>
        <CardTitle className='font-semibold text-center'>
          {headerLabel}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
