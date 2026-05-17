"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, description, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-md bg-card hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {trend && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {trend.isUp ? "+" : "-"}{trend.value}%
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold tracking-tight">{value}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
