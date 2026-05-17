"use client";

import { useStore } from "@/store/useStore";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { 
  ShieldCheck, 
  Users, 
  Database, 
  FileDown, 
  Unlock,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { users, goals, auditLogs, unlockGoals } = useStore();
  const { toast } = useToast();

  const totalUsers = users.length;
  const approvedGoals = goals.filter(g => g.status === 'approved').length;
  const pendingGoals = goals.filter(g => g.status === 'pending').length;

  const handleUnlock = (userId: string) => {
    unlockGoals(userId, "HR administrative request for goal modification.");
    toast({ title: "Goals Unlocked", description: "The employee can now edit their goals again." });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900 text-center md:text-left">System Administration</h1>
          <p className="text-muted-foreground">Global performance oversight and security management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <FileDown className="mr-2 h-4 w-4" />
            System Export
          </Button>
          <Button className="rounded-xl shadow-lg bg-slate-900">
            Manage Permissions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Users" 
          value={totalUsers}
          description="Across all departments"
          icon={Users}
        />
        <StatsCard 
          title="Submission Rate" 
          value="88%"
          description="Target achievement cycle"
          icon={ShieldCheck}
          trend={{ value: 2, isUp: true }}
        />
        <StatsCard 
          title="System Logs" 
          value={auditLogs.length}
          description="Security events this week"
          icon={Database}
        />
        <StatsCard 
          title="Approval Queue" 
          value={pendingGoals}
          description="Awaiting manager sign-off"
          icon={AlertCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Employee Lifecycle Status</CardTitle>
            <CardDescription>Goal locking and unlocking oversight</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.filter(u => u.role === 'employee').map((user) => {
                  const hasApproved = goals.some(g => g.userId === user.id && g.status === 'approved');
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        {hasApproved ? (
                          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">Locked</Badge>
                        ) : (
                          <Badge variant="outline" className="text-primary border-primary/20">Active Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem onClick={() => handleUnlock(user.id)}>
                              <Unlock className="mr-2 h-4 w-4" /> Unlock Goals
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Suspend Access</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Audit Logs</CardTitle>
            <CardDescription>Security and administrative activity stream</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
             <div className="space-y-0">
               {auditLogs.length === 0 ? (
                 <div className="py-12 text-center text-muted-foreground italic text-sm">
                   No recent administrative actions recorded.
                 </div>
               ) : (
                 auditLogs.slice(0, 5).map((log) => (
                   <div key={log.id} className="flex items-start gap-4 p-4 px-6 hover:bg-slate-50 border-b last:border-0">
                     <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                       <ShieldCheck className="h-4 w-4" />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-bold text-slate-900">{log.action}</p>
                          <span className="text-[10px] text-muted-foreground uppercase">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{log.details}</p>
                     </div>
                   </div>
                 ))
               )}
             </div>
             <div className="p-4 pt-6">
                <Button variant="outline" className="w-full rounded-xl">View All Logs</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
