import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  Zap,
  Shield,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";

const featureCards = [
  {
    icon: Bot,
    title: "AI Agent Builder",
    description:
      "Create intelligent agents that guide users through complex forms with natural language processing.",
  },
  {
    icon: Zap,
    title: "Smart Validation",
    description:
      "Real-time validation powered by AI that understands context and provides helpful suggestions.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Deep analytics on form performance with AI-generated insights for optimization.",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Enterprise-grade security with AI-powered fraud detection and data protection.",
  },
  {
    icon: Users,
    title: "User Experience",
    description:
      "Adaptive interfaces that learn from user behavior to reduce friction and increase completion rates.",
  },
  {
    icon: Sparkles,
    title: "Auto-Optimization",
    description:
      "Forms that continuously improve themselves based on user interactions and conversion data.",
  },
];

export default function Features() {
  return (
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
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}