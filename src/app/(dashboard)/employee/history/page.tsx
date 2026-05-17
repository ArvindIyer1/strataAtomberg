
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History, TrendingUp, Award, Clock } from "lucide-react";

export default function HistoryPage() {
  const events = [
    { id: 1, title: "Goal Approved", description: "Reducing bug density goal was approved by Sarah Chen.", time: "2 days ago", icon: Award, color: "text-green-600" },
    { id: 2, title: "Milestone Reached", description: "Reached 50% target for Enterprise Beta features.", time: "1 week ago", icon: TrendingUp, color: "text-blue-600" },
    { id: 3, title: "Check-in Completed", description: "Bi-weekly sync with Sarah Chen regarding Q4 alignment.", time: "2 weeks ago", icon: Clock, color: "text-slate-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-900">Performance History</h1>
        <p className="text-muted-foreground">A timeline of your achievements and milestones.</p>
      </div>

      <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {events.map((event) => (
          <div key={event.id} className="relative">
            <div className={`absolute -left-8 p-1.5 rounded-full bg-white border shadow-sm ${event.color}`}>
              <event.icon className="h-4 w-4" />
            </div>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{event.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">{event.time}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
