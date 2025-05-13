import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, Tag, Users } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { CATEGORIES, EXPERIENCE_LEVELS } from "./constants";
import type { TalkSubmissionFormValues } from "../../schemas/talkSubmissionSchema";

interface TechnicalDetailsSectionProps {
  form: UseFormReturn<TalkSubmissionFormValues>;
}

export function TechnicalDetailsSection({
  form,
}: TechnicalDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              Category
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Main topic covered in your talk</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              Level
            </FormLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="font-medium">Required level:</p>
                  <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                    <li>Beginner: No prior knowledge required</li>
                    <li>Intermediate: Basic knowledge needed</li>
                    <li>Advanced: For experienced audience</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Duration (minutes)
            </FormLabel>
            <FormControl>
              <div className="relative max-w-xs">
                <Input
                  type="number"
                  min={15}
                  max={180}
                  step={15}
                  className="h-11 pl-10"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  min
                </div>
              </div>
            </FormControl>
            <FormDescription>
              Between 15 and 180 minutes (recommended: 30-60 minutes)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
