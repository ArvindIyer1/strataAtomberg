"use client";

import { useStore } from "@/store/useStore";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function EmployeeDashboard() {
  const { currentUser, goals } = useStore();
  const userGoals = goals.filter(g => g.userId === currentUser?.id);
  
  const totalWeight = userGoals.reduce((sum, g) => sum + g.weightage, 0);
  const approvedCount = userGoals.filter(g => g.status === 'approved').length;
  const pendingCount = userGoals.filter(g => g.status === 'pending').length;
  
  const completionPercentage = userGoals.length > 0 
    ? Math.round((userGoals.reduce((sum, g) => {
        const progress = (Number(g.currentValue) / Number(g.target)) * 100;
        return sum + (Math.min(100, progress) * (g.weightage / 100));
      }, 0))) 
    : 0;

  const chartData = [
    { name: 'Week 1', progress: 12 },
    { name: 'Week 2', progress: 24 },
    { name: 'Week 3', progress: 22 },
    { name: 'Week 4', progress: 38 },
    { name: 'Week 5', progress: 45 },
    { name: 'Week 6', progress: 58 },
  ];

  const pieData = [
    { name: 'Completed', value: completionPercentage },
    { name: 'Remaining', value: 100 - completionPercentage },
  ];

  const COLORS = ['#2563EB', '#F1F5F9'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-900">Good morning, {currentUser?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">You have {pendingCount} goals pending approval and your quarterly score is on track.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Goal Completion" 
          value={`${completionPercentage}%`}
          description="Weighted average progress"
          icon={Target}
          trend={{ value: 4, isUp: true }}
        />
        <StatsCard 
          title="Active Goals" 
          value={userGoals.length}
          description={`${approvedCount} approved, ${pendingCount} pending`}
          icon={CheckCircle2}
        />
        <StatsCard 
          title="Total Weightage" 
          value={`${totalWeight}%`}
          description="Target is exactly 100%"
          icon={TrendingUp}
          className={totalWeight !== 100 ? "border-amber-200 bg-amber-50" : ""}
        />
        <StatsCard 
          title="Pending Tasks" 
          value={3}
          description="Check-ins due this week"
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-md overflow-hidden bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Progress Timeline</CardTitle>
            <CardDescription>Visualizing your weighted achievement over the last 6 weeks</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#2563EB" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#2563EB', strokeWidth: 3, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Quarterly Target</CardTitle>
            <CardDescription>Total weight distribution</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px]">
             <div className="relative h-48 w-48">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{completionPercentage}%</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Achieved</span>
               </div>
             </div>
             <div className="mt-8 space-y-2 w-full">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span>On Track</span>
                  </div>
                  <span className="font-medium">{completionPercentage}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-100" />
                    <span>Remaining</span>
                  </div>
                  <span className="font-medium">{100 - completionPercentage}%</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {totalWeight !== 100 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Your total goal weightage is {totalWeight}%. It must be exactly 100% to submit for approval.</p>
        </div>
      )}
    </div>
  );
}
