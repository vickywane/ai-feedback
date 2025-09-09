"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Questions from "@/components/questions";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FetchClient } from "@/lib/fetch";

export interface FormData {
  name: string;
  questions: string;
  goal: string;
  context: string;
}

const FORM_CREATION_STAGE = {
  0: "GENERATE_QUESTIONS",
  1: "CREATE_FORM",
};

export default function Dashboard() {
  const [questions, setQuestions] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      goal: "",
      context: "",
    },
  });

  const onSubmit = async (inputValues: FormData) => {
    setIsLoading(true);

    try {
      if (formCreationStage === FORM_CREATION_STAGE[0]) {
        const { name, goal, context } = getValues();

        const { data, error } = await FetchClient({
          url: "/api/generate-questions",
          method: "POST",
          data: {
            formName: name,
            goal,
            context,
            user_id: auth?.user?.id,
          },
        });

        if (error) {
          return toast.error("Failed to generate questions. Please try again.");
        }

        setQuestions(data?.questions);
        setValue("questions", data?.questions.join("\n"));
        setFormCreationStage(FORM_CREATION_STAGE[1]);

        return;
      }

      const { name, goal, context, questions } = getValues();

      const { error } = await FetchClient({
        url: "/api/create-agent",
        method: "POST",
        data: {
          formName: name,
          goal,
          context,
          questions,
          user_id: auth?.user?.id,
        },
      });

      if (error) {
        toast.error("Failed to create form. Please try again.");
        throw new Error("Failed to create agent:");
      }

      router.push("/dashboard");
      toast.success("Form created successfully");
    } catch (error) {
      console.error("Error create agent:", error);
      toast.error("Failed to create form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const [formCreationStage, setFormCreationStage] = useState(
    FORM_CREATION_STAGE[0]
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl m-auto gap-8">
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Create New Form</h1>
            <p className="text-muted-foreground">
              Build an intelligent form with AI-powered features and
              optimizations.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="name">Name</label>
                <input
                  className={
                    "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  }
                  id="name"
                  placeholder="Name"
                  disabled={isLoading}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Goal</label>
              <textarea
                className={
                  "border-input h-[120px] bg-transparent focus-visible:border-ring w-full rounded-md border px-6 py-4 text-base shadow-xs outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                }
                id="form"
                placeholder="What is the goal of this form?"
                disabled={isLoading}
                {...register("goal", {
                  required: "Goal is required",
                })}
              />
              {errors.goal && (
                <p className="text-sm text-destructive">
                  {errors.goal.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="context">Context</label>
              <textarea
                className={
                  "border-input h-[300px] bg-transparent focus-visible:border-ring w-full rounded-md border  px-6 py-4 text-base shadow-xs outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                }
                id="context"
                placeholder="What is the context of this form?"
                disabled={isLoading}
                {...register("context", {
                  required: "Context is required",
                })}
              />
              {errors.context && (
                <p className="text-sm text-destructive">
                  {errors.context.message}
                </p>
              )}
            </div>

            <div>
              {formCreationStage === FORM_CREATION_STAGE[1] && questions && (
                <Questions
                  suggestions={questions}
                  {...{ register, errors, isRevealed: false }}
                />
              )}

              <div className="mt-4 flex justify-end space-x-4">
                <Button disabled type="button" variant="outline">
                  Save as Draft
                </Button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {formCreationStage === FORM_CREATION_STAGE[0]
                        ? "Generating Questions..."
                        : "Creating Form..."}
                    </>
                  ) : formCreationStage === FORM_CREATION_STAGE[0] ? (
                    "Generate Questions"
                  ) : (
                    "Create Form"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
