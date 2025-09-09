import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Form Experience
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold leading-[65px] text-balance mb-6">
            Text Forms are Boring! <br /> Add Voice
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
  );
}