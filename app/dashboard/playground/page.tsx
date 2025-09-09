"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import FormPreview from "@/components/Form/FormPreview";

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Playground</h1>
          <p className="text-muted-foreground">
            Manage your AI-powered forms and track their performance.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {forms.map((form) => (
          <FormPreview key={form.id} form={form} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}
