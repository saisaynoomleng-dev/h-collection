import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({
  className,
  type,
  variant = 'input',
  ...props
}: React.ComponentProps<'input'> & { variant?: 'input' | 'search' }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30  h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-brand-black',
        'focus-visible:border-ring focus-visible:ring-brand-pink/50 focus-visible:ring-2',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        variant == 'search' && 'border border-brand-black',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
