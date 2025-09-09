import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import { CiPlay1 } from "react-icons/ci";
import toast from "react-hot-toast";

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

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/feedback/${form.agent_id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Form link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link to clipboard");
    }
  };

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              {form.agent_id && (
                <Badge variant="secondary" className="text-xs">
                  AI Enabled
                </Badge>
              )}
            </div>

            <div>
              <CardTitle className="text-md truncate">{form.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(form.created_at)}
              </div>
            </div>
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

            <Link href={`/dashboard/playground/${form.agent_id}`}>
              <Button size="sm" variant="outline">
                <CiPlay1 className="h-3 w-3 mr-1" />
                Test
              </Button>
            </Link>

            {form.agent_id && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleShare}
              >
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            )}
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
