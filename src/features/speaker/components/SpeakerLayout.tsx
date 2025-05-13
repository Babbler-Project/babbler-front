import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SpeakerSidebar } from "./SpeakerSidebar";

export default function SpeakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SpeakerSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
