"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaWpforms } from "react-icons/fa";

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out");
      router.push("/");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">FormAI Dashboard</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">
                    <FaWpforms className="w-4 h-4 mr-2" />
                    My Forms
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
