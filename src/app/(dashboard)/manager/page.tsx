"use client";

import { useStore } from "@/store/useStore";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { 
  Users, 
  Clock, 
  BarChart3, 
  CheckCircle2,
  ArrowUpRight,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ManagerDashboard() {
  const { users, goals } = useStore();
  const team = users.filter(u => u.role === 'employee');
  const pendingApprovals = goals.filter(g => g.status === 'pending').length;
  
  const teamProgress = 74; // Demo value

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">Manager Dashboard</h1>
          <p className="text-muted-foreground">Monitor your team's quarterly performance and approve objectives.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200">
            Export Report
          </Button>
          <Link href="/manager/approvals">
            <Button className="rounded-xl shadow-lg">
              Review Pending
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Team Size" 
          value={team.length}
          description="Active direct reports"
          icon={Users}
        />
        <StatsCard 
          title="Pending Reviews" 
          value={pendingApprovals}
          description="Goals awaiting action"
          icon={Clock}
          className={pendingApprovals > 0 ? "bg-blue-50/50" : ""}
        />
        <StatsCard 
          title="Team Completion" 
          value={`${teamProgress}%`}
          description="Average target achievement"
          icon={BarChart3}
          trend={{ value: 12, isUp: true }}
        />
        <StatsCard 
          title="Reviews Finished" 
          value="8/12"
          description="Quarterly appraisal status"
          icon={CheckCircle2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-md overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Employee Status</CardTitle>
              <CardDescription>Real-time progress of your direct reports</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="divide-y">
              {team.map((member) => {
                const memberGoals = goals.filter(g => g.userId === member.id);
                const approved = memberGoals.filter(g => g.status === 'approved').length;
                return (
                  <div key={member.id} className="flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                       <div className="hidden md:block text-right">
                          <p className="text-xs font-semibold uppercase text-muted-foreground">Goals</p>
                          <p className="text-sm font-medium">{approved} / {memberGoals.length} Approved</p>
                       </div>
                       <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
                       </div>
                       <Button variant="ghost" size="icon">
                         <ChevronRight className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Activity Feed</CardTitle>
            <CardDescription>Recent actions from your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { user: 'Alex Rivera', action: 'submitted goals', time: '2h ago', color: 'bg-blue-500' },
              { user: 'Maria Garcia', action: 'updated progress', time: '4h ago', color: 'bg-green-500' },
              { user: 'Jordan Smith', action: 'completed milestone', time: '1d ago', color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className={`h-2.5 w-2.5 rounded-full mt-1 ${item.color}`} />
                  {i < 2 && <div className="absolute top-4 left-1 w-0.5 h-10 bg-slate-100" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    <span className="font-bold">{item.user}</span> {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 rounded-xl">
              View Audit Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
