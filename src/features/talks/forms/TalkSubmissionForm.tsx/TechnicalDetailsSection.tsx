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
import { Clock, Loader2, Tag, Users } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { TalkSubmissionFormValues } from "../../schemas/talkSubmissionSchema";
import { useTalkTypes } from "../../../talks/talkTypes/hooks/queries/useGetTypes";
import { LEVEL_OPTIONS } from "./constants";

interface TechnicalDetailsSectionProps {
  form: UseFormReturn<TalkSubmissionFormValues>;
}

function TypesLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
      <p className="text-sm text-muted-foreground">Loading talk types...</p>
    </div>
  );
}

export function TechnicalDetailsSection({
  form,
}: TechnicalDetailsSectionProps) {
  const { data: talkTypes, isLoading, error } = useTalkTypes();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="typeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              Type
            </FormLabel>
            <Select
              onValueChange={(value) => field.onChange(parseInt(value))}
              value={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger className="h-11">
                  <SelectValue
                    placeholder={isLoading ? "Loading..." : "Select a type"}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoading ? (
                  <TypesLoader />
                ) : error ? (
                  <div className="p-2 text-red-500 flex items-center gap-2">
                    <span className="rounded-full bg-red-100 p-1">
                      <span className="text-red-600 text-xs">!</span>
                    </span>
                    Failed to load types
                  </div>
                ) : (
                  talkTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <FormDescription>Main topic covered in your talk</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="levelId"
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
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEVEL_OPTIONS.map(({ id, label }) => (
                        <SelectItem key={id} value={id.toString()}>
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
