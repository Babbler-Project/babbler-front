import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Talk } from "@/features/talks/types";
import { Check, X } from "lucide-react";

interface PendingTalkListProps {
  talks: Talk[];
  onAccept: (talk: Talk) => void;
  onReject: (talkId: string) => void;
  className?: string;
}

const PendingTalkList = ({
  talks,
  onAccept,
  onReject,
  className,
}: PendingTalkListProps) => {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold">Talks to validate</h2>
      <div className="flex flex-col gap-3 overflow-y-auto pr-1 mt-4">
        {talks.length === 0 ? (
          <p className="text-gray-500">No talks pending validation</p>
        ) : (
          talks.map((talk) => (
            <Card
              key={talk.id}
              className="p-3 shadow-sm border-l-4 border-l-amber-400"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-medium line-clamp-1" title={talk.title}>
                  {talk.title}
                </h3>
                <p
                  className="text-sm text-gray-600 line-clamp-2"
                  title={talk.description}
                >
                  {talk.description}
                </p>
                <div className="text-xs text-gray-500 flex flex-col gap-1">
                  <div>
                    <span className="font-medium">Speaker:</span> {talk.speaker}
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Duration:</span>{" "}
                    {talk.durationDisplay}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                      {talk.level}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                      {talk.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                    onClick={() => onAccept(talk)}
                  >
                    <Check size={16} className="mr-1" /> Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                    onClick={() => onReject(talk.id)}
                  >
                    <X size={16} className="mr-1" /> Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingTalkList;
