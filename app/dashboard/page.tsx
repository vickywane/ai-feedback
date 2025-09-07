"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import FormCard from "@/components/FormCard";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  id: string;
  name: string;
  goal: string;
  context: string;
  agent_id: string | null;
  created_at: string;
  created_by: string;
}

export default function FormsPage() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchForms = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/forms?user_id=${user.id}`);
      const data = await response.json();

      if (data.success) {
        setForms(data.forms);
      } else {
        toast.error("Failed to fetch forms");
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast.error("Error loading forms");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [user?.id]);

  const handleEdit = (formId: string) => {
    toast.success(`Editing form ${formId} (feature coming soon)`);
  };

  const handleDelete = async (formId: string) => {
    if (!window.confirm("Are you sure you want to delete this form?")) {
      return;
    }
    
    toast.success(`Deleting form ${formId} (feature coming soon)`);
  };

  const handlePreview = (formId: string) => {
    toast.success(`Previewing form ${formId} (feature coming soon)`);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Forms</h1>
              <p className="text-muted-foreground">
                Manage your AI-powered forms and track their performance.
              </p>
            </div>
            <Button asChild>
              <Link href="/new-form">
                <Plus className="h-4 w-4 mr-2" />
                Create New Form
              </Link>
            </Button>
          </div>

          {forms.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No forms yet</h3>
              <p className="text-muted-foreground mb-6">
                Get started by creating your first AI-powered form.
              </p>
              <Button asChild>
                <Link href="/new-form">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Form
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}