import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Eye, Edit, Trash2, Calendar } from "lucide-react";
import { LuLink } from "react-icons/lu";

interface FormData {
  id: string;
  name: string;
  goal: string;
  context: string;
  agent_id: string | null;
  created_at: string;
  created_by: string;
}

interface FormCardProps {
  form: FormData;
  onEdit?: (formId: string) => void;
  onDelete?: (formId: string) => void;
  onPreview?: (formId: string) => void;
}

export default function FormCard({ form, onEdit, onDelete }: FormCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-accent" />
            <div>
              <CardTitle className="text-lg">{form.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(form.created_at)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {form.agent_id && (
              <Badge variant="secondary" className="text-xs">
                AI Enabled
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Goal</h4>
            <p className="text-sm">{truncateText(form.goal)}</p>
          </div>
          {form.context && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Context
              </h4>
              <p className="text-sm">{truncateText(form.context)}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                size="sm"
                disabled
                variant="outline"
                onClick={() => onEdit(form.id)}
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            )}

            <a href={`https://elevenlabs.io/app/talk-to?agent_id=${form.agent_id}`} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">
                <LuLink className="h-3 w-3 mr-1" />
                Share
              </Button>
            </a>
          </div>
          {onDelete && (
            <Button
              size="sm"
              variant="outline"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onDelete(form.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
