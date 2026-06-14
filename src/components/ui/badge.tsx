import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
        high: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
        good: "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
        ambitious: "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        premier: "border-transparent bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
        outline: "text-slate-600 border-slate-300 dark:text-slate-300 dark:border-slate-500",
        fallback: "border-transparent bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
