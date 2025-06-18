import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleCheckedChange = (checked: boolean) => {
    setIsClicked(checked);
    console.log('Checkbox checked:', checked);
  };

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        isClicked ? 'bg-brand-yellow text-white' : 'border-slate-500',
        className,
      )}
      checked={isClicked}
      onCheckedChange={handleCheckedChange}
      {...props}
    />
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
