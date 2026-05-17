
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Plus, Video, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CheckInsPage() {
  const checkins = [
    { id: 1, type: "Bi-Weekly Sync", manager: "Sarah Chen", date: "Tomorrow, 2:00 PM", status: "scheduled" },
    { id: 2, type: "Quarterly Review", manager: "Sarah Chen", date: "Oct 15, 2023", status: "completed" },
    { id: 3, type: "Project Handoff", manager: "Sarah Chen", date: "Sep 28, 2023", status: "completed" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">Check-ins</h1>
          <p className="text-muted-foreground">Manage your 1:1 meetings and performance discussions.</p>
        </div>
        <Button className="rounded-xl shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Sync
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {checkins.map((item) => (
          <Card key={item.id} className="border-none shadow-md overflow-hidden bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.type}</h3>
                    <p className="text-sm text-muted-foreground">with {item.manager} • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {item.status === 'scheduled' ? (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Scheduled</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">Completed</Badge>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-lg h-9 w-9">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-lg h-9 w-9">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
