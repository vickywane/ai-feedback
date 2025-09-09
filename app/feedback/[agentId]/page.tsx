"use client";

import Header from "@/components/Header";
import VoiceConversation from "@/components/VoiceConversation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mic, Star, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeedbackPage() {
  const params = useParams<{ agentId: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Forms
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-2">Form Agent</h1>
            <p className="text-muted-foreground">
              Talk directly with your AI agent
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Agent ID: <code className="bg-muted px-2 py-1 rounded text-xs">{params.agentId}</code>
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <VoiceConversation agentId={params.agentId} />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How to test your agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm rounded-full flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Start Conversation</h4>
                      <p className="text-sm text-muted-foreground">
                        Click the start button and allow microphone access when prompted.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}