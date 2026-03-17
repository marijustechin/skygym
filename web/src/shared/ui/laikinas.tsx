'use client';

import { toast } from 'sonner';
import { Button } from './button';

export const Laikinas = () => {
  return (
    <Button onClick={() => toast.success('Teksts teksts')}>Toast testas</Button>
  );
};
