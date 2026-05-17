
"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Send, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Lock, 
  CheckCircle2,
  AlertTriangle,
  Target
} from "lucide-react";
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
import { GoalForm } from "@/components/dashboard/GoalForm";
import { useToast } from "@/hooks/use-toast";
import { Goal } from "@/types";
import { cn } from "@/lib/utils";

export default function MyGoalsPage() {
  const { currentUser, goals, deleteGoal, submitGoals } = useStore();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>();

  const userGoals = goals.filter(g => g.userId === currentUser?.id);
  const totalWeight = userGoals.reduce((sum, g) => sum + g.weightage, 0);
  const isSubmitDisabled = totalWeight !== 100 || userGoals.length === 0;

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormOpen(true);
  };

  const handleCreate = () => {
    if (userGoals.length >= 8) {
      toast({ title: "Limit Reached", description: "You can have a maximum of 8 goals.", variant: "destructive" });
      return;
    }
    setEditingGoal(undefined);
    setFormOpen(true);
  };

  const handleSubmit = () => {
    if (currentUser) {
      submitGoals(currentUser.id);
      toast({ title: "Success", description: "Your goals have been submitted for manager approval." });
    }
  };

  const getStatusBadge = (status: Goal['status']) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle2 className="mr-1 h-3 w-3" /> Approved</Badge>;
      case 'pending': return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100"><Send className="mr-1 h-3 w-3" /> Pending</Badge>;
      case 'rework': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100"><AlertTriangle className="mr-1 h-3 w-3" /> Rework</Badge>;
      default: return <Badge variant="outline" className="border-slate-300">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">My Quarterly Goals</h1>
          <p className="text-muted-foreground">Manage your performance objectives for Q4 2023.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitDisabled} 
            className="rounded-xl shadow-lg bg-accent hover:bg-accent/90"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit for Approval
          </Button>
          <Button onClick={handleCreate} className="rounded-xl shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Total Weightage</p>
              <p className={cn(
                "text-2xl font-bold",
                totalWeight === 100 ? "text-green-600" : "text-amber-600"
              )}>{totalWeight}%</p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Goal Count</p>
              <p className="text-2xl font-bold text-slate-700">{userGoals.length} <span className="text-sm font-normal text-slate-400">/ 8</span></p>
            </div>
          </div>
          {totalWeight !== 100 && (
            <div className="flex items-center gap-2 text-amber-600 text-sm font-medium animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              Weightage must equal exactly 100%
            </div>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">Area</TableHead>
              <TableHead>Goal Description</TableHead>
              <TableHead className="text-center">Weight</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userGoals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 opacity-50">
                    <Target className="h-12 w-12" />
                    <p>No goals defined yet. Start by adding a goal.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              userGoals.map((goal) => (
                <TableRow key={goal.id} className="group transition-colors">
                  <TableCell className="font-medium text-slate-500">{goal.thrustArea}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">{goal.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{goal.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
                          Target: {goal.target} {goal.unit}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold">{goal.weightage}%</TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(goal.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    {goal.status === 'approved' ? (
                      <Lock className="h-4 w-4 text-muted-foreground ml-auto" />
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem onClick={() => handleEdit(goal)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteGoal(goal.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <GoalForm 
        open={formOpen} 
        onOpenChange={setFormOpen} 
        editingGoal={editingGoal} 
      />
    </div>
  );
}
