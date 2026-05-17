
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Target, Activity } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";

export default function TeamAnalyticsPage() {
  const data = [
    { name: 'Engineering', completed: 65, pending: 25, rework: 10 },
    { name: 'Product', completed: 80, pending: 15, rework: 5 },
    { name: 'Design', completed: 45, pending: 40, rework: 15 },
    { name: 'QA', completed: 90, pending: 5, rework: 5 },
  ];

  const COLORS = ['#2563EB', '#F1F5F9', '#EF4444'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-900">Team Analytics</h1>
        <p className="text-muted-foreground">Deep dive into department-wide performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Avg. Completion" value="74%" description="Across all direct reports" icon={Activity} />
        <StatsCard title="Alignment Score" value="92/100" description="Strategic objective fit" icon={Target} />
        <StatsCard title="Review Velocity" value="3.2 days" description="Average approval time" icon={TrendingUp} />
        <StatsCard title="Active Users" value="24" description="In your immediate tree" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle>Goal Status by Department</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle>Team Weightage Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[400px]">
             <p className="text-muted-foreground italic text-sm mb-4">Visualizing resource allocation across pillars.</p>
             <div className="w-full h-full max-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{value: 40}, {value: 30}, {value: 30}]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                       <Cell fill="#2563EB" />
                       <Cell fill="#64748b" />
                       <Cell fill="#94a3b8" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
