import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { levelColors, levelBorderColors } from "../mapper";
import { MapPin, Tag, Clock, User } from "lucide-react";
import type { Talk } from "../types";
import { useTalkDisplay } from "../hooks/useTalkDisplay";
import { formatEventTime, formatTimeRange } from "../utils";

interface TalkItemProps {
  talk: Talk;
  className?: string;
}

export function TalkItem({ talk, className }: TalkItemProps) {
  const { cardRef, titleRef, isCompact, needsTooltip } = useTalkDisplay();

  const levelBorderClass =
    levelBorderColors[talk.level as keyof typeof levelBorderColors] || "";

  const content = (
    <CardContent className="p-2 flex flex-col h-full">
      {/* Title area */}
      <div className="mb-1">
        <CardTitle ref={titleRef} className="text-xs font-semibold truncate">
          {talk.title}
        </CardTitle>

        {/* Only show time inline in compact mode */}
        {isCompact && (
          <div className="flex items-center gap-0.5 mt-1">
            <Clock className="h-2.5 w-2.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground truncate">
              {formatEventTime(talk.start)}
            </span>
          </div>
        )}

        {/* Only show speaker in non-compact mode */}
        {!isCompact && (
          <CardDescription className="text-xs truncate mt-1">
            {talk.speaker}
          </CardDescription>
        )}
      </div>

      {/* Badge level */}
      <Badge
        className={cn(
          "text-xs",
          isCompact ? "absolute top-1 right-1 px-1 py-0" : "mb-1",
          levelColors[talk.level as keyof typeof levelColors],
        )}
      >
        {isCompact ? talk.level.charAt(0) : talk.level}
      </Badge>

      {/* Bottom info */}
      <div className="mt-auto pt-1">
        {!isCompact ? (
          // Normal view
          <div className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{talk.room}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              <span>{talk.category}</span>
            </div>
          </div>
        ) : (
          // Compact view
          <div className="flex text-[10px] text-muted-foreground">
            <MapPin className="h-2.5 w-2.5 mr-0.5" />
            <span className="truncate">{talk.room}</span>
          </div>
        )}
      </div>
    </CardContent>
  );

  return (
    <Card
      ref={cardRef}
      className={cn(
        "p-0 overflow-hidden hover:shadow-md transition-shadow cursor-pointer",
        levelBorderClass,
        className,
      )}
    >
      {needsTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full h-full block" asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right" className="p-0 w-64">
              <div className="p-3">
                <h3 className="font-medium mb-1">{talk.title}</h3>

                <div className="text-xs mb-2">
                  {formatTimeRange(talk.start, talk.end)}
                </div>

                {talk.description && (
                  <p className="text-xs mb-3 opacity-90 line-clamp-2">
                    {talk.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3 opacity-70" />
                    <span>{talk.speaker}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 opacity-70" />
                    <span>{talk.room}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 opacity-70" />
                    <span>{talk.category}</span>
                  </div>
                  <Badge
                    className={cn(
                      "text-[10px] w-fit",
                      levelColors[talk.level as keyof typeof levelColors],
                    )}
                  >
                    {talk.level}
                  </Badge>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        // No tooltip needed (in day view with enough space)
        content
      )}
    </Card>
  );
}
