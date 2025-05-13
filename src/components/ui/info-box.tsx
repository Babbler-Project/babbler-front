import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type InfoBoxVariant = "info" | "success" | "warning" | "danger" | "tip";

interface InfoBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: InfoBoxVariant;
}

const variantStyles: Record<InfoBoxVariant, string> = {
  info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300",
  success:
    "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 text-green-800 dark:text-green-300",
  warning:
    "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300",
  danger:
    "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-800 dark:text-red-300",
  tip: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900 text-purple-800 dark:text-purple-300",
};

const iconStyles: Record<InfoBoxVariant, string> = {
  info: "text-blue-600 dark:text-blue-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-red-600 dark:text-red-400",
  tip: "text-purple-600 dark:text-purple-400",
};

export function InfoBox({
  title,
  children,
  icon: Icon,
  variant = "info",
  className,
  ...props
}: InfoBoxProps) {
  return (
    <div
      className={cn("rounded-lg p-4 border", variantStyles[variant], className)}
      {...props}
    >
      <div className="flex gap-3">
        {Icon && (
          <Icon
            className={cn("h-5 w-5 shrink-0 mt-0.5", iconStyles[variant])}
          />
        )}
        <div>
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cn("text-xs mt-1", !title && "pt-0.5")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
