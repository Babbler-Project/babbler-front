import { CalendarView } from "@/features/calendar/components/CalendarView";

export default function UserHomeDashboard() {
  return (
    <div className="space-y-4">
      <CalendarView className="max-h-[calc(100vh-8rem)]" />
    </div>
  );
}
