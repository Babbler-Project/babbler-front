import { LUNCH_BREAK_LABEL } from "../utils";
import { cn } from "@/lib/utils";

interface LunchBreakSlotProps {
  showLabel?: boolean;
  className?: string;
}

export function LunchBreakSlot({
  showLabel = true,
  className,
}: LunchBreakSlotProps) {
  return (
    <div
      className={cn("relative border-b h-30 w-full", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px)",
      }}
    >
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-background/80 rounded shadow-sm">
            {LUNCH_BREAK_LABEL}
          </span>
        </div>
      )}
    </div>
  );
}
