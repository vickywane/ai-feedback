import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qwikfeed - AI-Powered Form Experience",
  description: "Revolutionize your form experience with AI-driven solutions.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <Banner />

      <Features />

      <CTA />

      <Footer />
    </div>
  );
}
