import { SidebarProvider } from "@/components/ui/sidebar";
import { SpeakerSidebar } from "./SpeakerSidebar";
import { SpeakerHeader } from "./SpeakerHeader";

export default function SpeakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SpeakerSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SpeakerHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
