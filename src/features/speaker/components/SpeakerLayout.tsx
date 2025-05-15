import { AppLayout } from "@/components/shared/navigation/app-layout";
import { SPEAKER_NAV_ITEMS } from "../constants/navigation";
import SpeakerQuickAction from "./SpeakerQuickAction";

export default function SpeakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout
      navItems={SPEAKER_NAV_ITEMS}
      basePath="/speaker"
      quickAction={<SpeakerQuickAction />}
    >
      {children}
    </AppLayout>
  );
}
