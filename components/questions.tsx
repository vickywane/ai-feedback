"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/app/dashboard/new-form/page";

interface QuestionsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  suggestions: string[] | null;
}

export default function Questions({
  register,
  errors,
  suggestions,
}: QuestionsProps) {
  const questionString = suggestions ? suggestions.join('\n') : '';

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span>Form Questions</span>
            </div>
            <div className="mt-2 text-sm">Configure the questions for your form</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative">
        {!suggestions && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <p className="text-muted-foreground">
              Complete the basic information to unlock questions
            </p>
          </div>
        )}

        <div className={`space-y-3 ${!suggestions ? "opacity-20" : ""}`}>
          <div className="space-y-2">
            <textarea
              id="questions"
              placeholder={questionString}
              className={
                "border-input h-[350px] bg-transparent focus-visible:border-ring w-full rounded-md border  px-6 py-4 text-base shadow-xs outline-none"
              }

              {...register("questions")}
              disabled={!suggestions}
            />
            {errors.questions && (
              <p className="text-sm text-destructive">
                {errors.questions.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
