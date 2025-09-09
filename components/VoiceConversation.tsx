"use client";

import { useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from "lucide-react";
import toast from "react-hot-toast";

interface VoiceConversationProps {
  agentId: string;
  userId?: string;
}

export default function VoiceConversation({ agentId, userId }: VoiceConversationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to agent');
      setIsConnected(true);
      setIsLoading(false);
      toast.success("Connected to AI agent");
      setMessages(prev => [...prev, "Connected to AI agent"]);
    },
    onDisconnect: () => {
      console.log('Disconnected from agent');
      setIsConnected(false);
      setIsLoading(false);
      toast.success("Disconnected from AI agent");
      setMessages(prev => [...prev, "Disconnected from AI agent"]);
    },
    onMessage: (message) => {
      // setMessages(prev => [...prev, `Agent: ${message.message || 'Audio message received'}`]);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      setIsLoading(false);
      toast.error("Connection error occurred");
      setMessages(prev => [...prev, `Error: ${error}`]);
    }
  });

  const startConversation = async () => {
    setIsLoading(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      await conversation.startSession({
        agentId,
        userId: "",
        connectionType: "websocket"
      });
      
      setMessages(prev => [...prev, "Starting conversation..."]);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setIsLoading(false);
      toast.error("Failed to start conversation. Please check microphone permissions.");
      setMessages(prev => [...prev, "Failed to start conversation"]);
    }
  };

  const endConversation = async () => {
    setIsLoading(true);
    try {
      await conversation.endSession();
      setMessages(prev => [...prev, "Ending conversation..."]);
    } catch (error) {
      console.error('Failed to end conversation:', error);
      toast.error("Failed to end conversation");
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="h-5 w-5" />
            <span>Voice Conversation</span>
          </CardTitle>
          <CardDescription>
            Talk with our AI agent to provide feedback about your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            {!isConnected ? (
              <Button
                onClick={startConversation}
                disabled={isLoading}
                size="lg"
                className="min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-2" />
                    Start Conversation
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={endConversation}
                disabled={isLoading}
                variant="destructive"
                size="lg"
                className="min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Ending...
                  </>
                ) : (
                  <>
                    <PhoneOff className="h-4 w-4 mr-2" />
                    End Conversation
                  </>
                )}
              </Button>
            )}
          </div>

          {isConnected && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Mic className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Listening...</span>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            {!isConnected 
              ? "Click 'Start Conversation' and allow microphone access to begin talking with our AI agent."
              : "You can now speak naturally. The agent will respond through your speakers."
            }
          </div>
        </CardContent>
      </Card>

      {/* Conversation Log */}
      {messages.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversation Log</CardTitle>
              <Button variant="outline" size="sm" onClick={clearMessages}>
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className="text-sm p-2 rounded bg-muted">
                  {message}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}