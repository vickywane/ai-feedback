"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import SubmissionCard from "@/components/SubmissionCard";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export interface Submission {
  id: string;
  agent_id: string;
  form_id: string;
  duration: number;
  summary: string;
  answers: string;
  transcript: string;
  created_at: string;
  forms: {
    name: string;
    goal: string;
  };
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/submissions");
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.submissions);
      } else {
        toast.error("Failed to fetch submissions");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2"> Submissions</h1>
          <p className="text-muted-foreground">
            View all submissions collected from your AI feedback forms.
          </p>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Once users start interacting with your AI feedback forms, their
                submissions will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
