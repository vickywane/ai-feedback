import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";
import { Submission } from "@/app/dashboard/submissions/page";

interface SubmissionCardProps {
  submission: Submission;
}

export default function SubmissionCard({ submission }: SubmissionCardProps) {
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseAnswers = (answersJson: string) => {
    try {
      return JSON.parse(answersJson);
    } catch {
      return {};
    }
  };

  const answers = parseAnswers(submission.answers);
  const answerCount = Object.keys(answers).length;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{submission.forms.name} a</CardTitle>
            <CardDescription className="mt-1">
              {submission.forms.goal}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center" >
              <FileText className=" mr-1" />

              <span>
                {answerCount} answers
              </span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <hr />

      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-medium mb-2">Summary</h4>
            <p className="text-sm text-muted-foreground bg-muted rounded">
              {submission.summary || "No summary available"}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-medium mb-2">Answers</h4>
            <div className="space-y-2">
              <ul className="grid gap-2">
                {answers.map((item, index) => {
                  return (
                    <li key={index} className="mb-2">
                      <div>
                        <p className="text-md"> {item.question} </p>
                        <p> {item.answer} </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-muted-foreground">
              Submitted on {formatDate(submission.created_at)}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Agent: {submission.agent_id}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
