"use client";

import VoiceConversation from "@/components/VoiceConversation";
import { useParams } from "next/navigation";

export default function FeedbackPage() {
  const params = useParams<{ agentId: string }>();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Playground</h1>
            <p className="text-muted-foreground">
              Talk directly with your AI agent
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Agent ID:{" "}
              <code className="bg-muted px-2 py-1 rounded text-xs">
                {params.agentId}
              </code>
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <VoiceConversation agentId={params.agentId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
