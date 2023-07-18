import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export const paragraphVariants = cva('max-w-prose text-stone-700 dark:text-stone-100 mb-2 text-center', {
  variants: {
    size: {
      default: 'text-base sm:text-lg',
      sm: 'text-sm sm:text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({ size, className, children, ...props }, ref) => {
  return (
    <p ref={ref} {...props} className={cn(paragraphVariants({ size, className }))}>
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

export default Paragraph;
