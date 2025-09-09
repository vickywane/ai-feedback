"use client";

import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import VoiceConversation from "@/components/VoiceConversation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mic, Star } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function FeedbackPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="m-6 text-center"> Feedback not found </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
