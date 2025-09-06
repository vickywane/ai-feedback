"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  BarChart3,
  FileText,
  Users,
  Zap,
  Save,
  Eye,
} from "lucide-react"
import Questions from "@/components/questions"

interface FormData {
  formName: string
  description: string
  category: string
  aiAgent: string
  fields: {
    name: string
    email: string
    company: string
    message: string
  },

  goal: string;
  context: string
}

export default function Dashboard() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    fields: false,
    ai: false,
    settings: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      formName: "",
      description: "",
      category: "",
      aiAgent: "",
      fields: {
        name: "",
        email: "",
        company: "",
        message: "",
      },

      goal: "",
      context: "",
    },
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">FormAI Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Form
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Active Forms</span>
                  </div>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Submissions</span>
                  </div>
                  <Badge variant="secondary">1,247</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Conversion</span>
                  </div>
                  <Badge variant="secondary">87%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">AI Optimizations</span>
                  </div>
                  <Badge variant="secondary">34</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Create New Form</h1>
              <p className="text-muted-foreground">
                Build an intelligent form with AI-powered features and optimizations.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="formName">Name</Label>
                  <Input
                    id="formName"
                    placeholder="Contact Form"
                    {...register("formName", { required: "Form name is required" })}
                  />
                  {errors.formName && <p className="text-sm text-destructive">{errors.formName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Goal</Label>
                <Textarea
                  id="form"
                  placeholder="What is the goal of this form?"
                  {...register("goal")}
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="context">Context</Label>
                <Textarea
                  id="context"
                  placeholder="What is the context of this form?"
                  {...register("context")}
                />
              </div>

              <Questions {...{ register, errors, isRevealed: false }} />

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit">Create Form</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
