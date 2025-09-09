import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { CiPlay1 } from "react-icons/ci";

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
}

export default function FormPreview({ form }: FormCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div>
              <CardTitle className="text-md truncate">{form.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(form.created_at)}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link href={`/dashboard/playground/${form.agent_id}`}>
              <Button size="sm" variant="outline">
                <CiPlay1 className="h-3 w-3 mr-1" />
                Test
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
