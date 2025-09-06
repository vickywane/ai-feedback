"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormData {
  formName: string
  description: string
  category: string
  aiAgent: string
  fields: {
    name: string
    email: string
    company: string
    message: string
  },
  goal: string;
  context: string
  questions?: string
}

interface QuestionsProps {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  isRevealed: boolean
}

export default function Questions({ register, errors, isRevealed }: QuestionsProps) {
  return (
    <Card className="relative">
      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Questions</span>
            </CardTitle>
            <CardDescription>
              Configure the questions for your form
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        {!isRevealed && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <p className="text-muted-foreground">Complete the basic information to unlock questions</p>
          </div>
        )}
        
        <div className={`space-y-4 ${!isRevealed ? 'opacity-20' : ''}`}>
          <div className="space-y-2">
            <Label htmlFor="questions">Form Questions</Label>
            <Textarea
              id="questions"
              placeholder="What questions would you like to include in your form?"
              className="min-h-[120px]"
              {...register("questions")}
              disabled={!isRevealed}
            />
            {errors.questions && <p className="text-sm text-destructive">{errors.questions.message}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
