import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { formatDate } from "../utils";
import type { CalendarViewType } from "../types";

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  onNavigate: (direction: "prev" | "next") => void;
  onToday: () => void;
}

export function CalendarHeader({
  currentDate,
  viewType,
  onViewChange,
  onNavigate,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={onToday}
          variant="outline"
          size="sm"
          className="hidden sm:flex"
        >
          Today
        </Button>
        <Button
          onClick={() => onNavigate("prev")}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onNavigate("next")}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold flex items-center ml-2">
          <CalendarIcon className="mr-2 h-5 w-5" />
          <span>{formatDate(currentDate)}</span>
        </h2>
      </div>

      <Select
        value={viewType}
        onValueChange={(value) => onViewChange(value as CalendarViewType)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="View" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
