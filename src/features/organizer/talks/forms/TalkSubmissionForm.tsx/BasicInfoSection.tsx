import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TalkSubmissionFormValues } from "../../schemas/talkSubmissionSchema";
import type { UseFormReturn } from "react-hook-form";
import { LightbulbIcon } from "lucide-react";
import { InfoBox } from "@/components/ui/info-box";

interface BasicInfoSectionProps {
  form: UseFormReturn<TalkSubmissionFormValues>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Talk title</FormLabel>
            <FormControl>
              <Input
                placeholder="E.g.: React Best Practices in 2025"
                className="text-base py-5"
                {...field}
              />
            </FormControl>
            <FormDescription>
              The title should be clear, concise, and give a good idea of the
              content
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe in detail the content of your talk and what participants will learn..."
                rows={6}
                className="resize-y text-base"
                {...field}
              />
            </FormControl>
            <FormDescription>
              20-500 characters. Include the key points you will cover.
            </FormDescription>
            <FormMessage />
            <InfoBox
              icon={LightbulbIcon}
              className="mt-4"
              title="Tips for a successful talk"
              variant="info"
            >
              Be specific in your description, target a specific audience, and
              include concrete examples. Talks with practical demonstrations are
              generally highly appreciated.
            </InfoBox>
          </FormItem>
        )}
      />
    </>
  );
}
