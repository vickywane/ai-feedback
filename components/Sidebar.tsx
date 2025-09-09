"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BugPlay, 
  FileText, 
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "New Form",
    href: "/dashboard/new-form",
    icon: Plus,
  },
  {
    name: "Submissions",
    href: "/dashboard/submissions",
    icon: FileText,
  },
  {
    name: "Playground",
    href: "/dashboard/playground",
    icon: BugPlay,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-accent-foreground" : "text-muted-foreground"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}