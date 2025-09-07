import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

const featureCards = [
  {
    icon: Bot,
    title: "AI Agent Builder",
    description: "Create intelligent agents that guide users through complex forms with natural language processing."
  },
  {
    icon: Zap,
    title: "Smart Validation",
    description: "Real-time validation powered by AI that understands context and provides helpful suggestions."
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Deep analytics on form performance with AI-generated insights for optimization."
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security with AI-powered fraud detection and data protection."
  },
  {
    icon: Users,
    title: "User Experience",
    description: "Adaptive interfaces that learn from user behavior to reduce friction and increase completion rates."
  },
  {
    icon: Sparkles,
    title: "Auto-Optimization",
    description: "Forms that continuously improve themselves based on user interactions and conversion data."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Form Experience
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold leading-[65px] text-balance mb-6">
              Text Forms are Boring! <br /> Add Voice or Text{" "}
              <span className="text-accent"> AI Agents</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
              Build intelligent forms that adapt, learn, and optimize data
              collection automatically. Enhance user experience with AI-driven
              form interactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Start Building <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Intelligent Form Building
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leverage AI to create forms that understand context, adapt to
              users, and optimize conversion rates.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <li key={index}>
                  <Card className="border-border">
                    <CardHeader>
                      <IconComponent className="h-12 w-12 text-accent mb-4" />
                      <CardTitle>{card.title}</CardTitle>
                      <CardDescription>
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 lg:p-16 text-center border border-border">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Build Smarter Forms?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using AI to transform their data
              collection experience.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold">FormAI</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
