"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Target, 
  CalendarCheck, 
  History, 
  Users, 
  CheckSquare, 
  TrendingUp,
  Settings,
  ShieldCheck,
  Database,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

const employeeNav = [
  { name: "Overview", href: "/employee", icon: LayoutDashboard },
  { name: "My Goals", href: "/employee/goals", icon: Target },
  { name: "Check-ins", href: "/employee/check-ins", icon: CalendarCheck },
  { name: "History", href: "/employee/history", icon: History },
];

const managerNav = [
  { name: "Team Dashboard", href: "/manager", icon: LayoutDashboard },
  { name: "Goal Approvals", href: "/manager/approvals", icon: CheckSquare },
  { name: "Team Analytics", href: "/manager/analytics", icon: TrendingUp },
  { name: "Active Reviews", href: "/manager/reviews", icon: Users },
];

const adminNav = [
  { name: "System Admin", href: "/admin", icon: ShieldCheck },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Audit Logs", href: "/admin/logs", icon: Database },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser } = useStore();

  const navItems = 
    currentUser?.role === 'manager' ? managerNav :
    currentUser?.role === 'admin' ? adminNav : 
    employeeNav;

  return (
    <div className="hidden border-r bg-background md:block w-64 flex-shrink-0 min-h-screen">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl tracking-tight text-primary">
            <Layers className="h-6 w-6" />
            <span>STRATA</span>
          </Link>
        </div>
        <div className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="p-4 mt-auto border-t">
          <div className="rounded-2xl bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Workspace</p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-bold">
                Q4
              </div>
              <div>
                <p className="text-sm font-medium">Quarter 4 Review</p>
                <p className="text-xs text-muted-foreground">Nov 2023 - Jan 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
