
"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Calendar } from "lucide-react";

export default function ActiveReviewsPage() {
  const { users } = useStore();
  const team = users.filter(u => u.role === 'employee');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-900">Active Reviews</h1>
        <p className="text-muted-foreground">Manage ongoing performance cycles for your team.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {team.map((member) => (
          <Card key={member.id} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.department} • Senior Engineer</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Cycle</p>
                    <p className="text-sm font-medium">Q4 2023</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Status</p>
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">In Progress</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <FileText className="mr-2 h-4 w-4" />
                      Draft Notes
                    </Button>
                    <Button size="sm" className="rounded-xl">
                      Open Review
                      <ChevronRight className="ml-1 h-4 w-4" />
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
