import RoomSettings from "./room/RoomSettings";
import TalkTypeSettings from "./talktype/TalkTypeSettings";

export default function OrganizerSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Organizer Settings</h1>
        <p className="text-muted-foreground">
          Configure talk types and other settings for your event.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TalkTypeSettings />
        <RoomSettings />
      </div>
    </div>
  );
}
