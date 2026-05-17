"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  RotateCcw, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Target
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Goal } from "@/types";

export default function ApprovalsPage() {
  const { goals, users, approveGoal, reworkGoal } = useStore();
  const { toast } = useToast();
  const pendingGoals = goals.filter(g => g.status === 'pending');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleApprove = (id: string) => {
    approveGoal(id, comments[id]);
    toast({ title: "Approved", description: "The goal has been approved successfully." });
  };

  const handleRework = (id: string) => {
    if (!comments[id]) {
      toast({ title: "Comment Required", description: "Please provide feedback for rework.", variant: "destructive" });
      return;
    }
    reworkGoal(id, comments[id]);
    toast({ title: "Returned", description: "The goal has been sent back for rework." });
  };

  const getUserName = (userId: string) => users.find(u => u.id === userId)?.name || "Unknown";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-900">Goal Approvals</h1>
        <p className="text-muted-foreground">Review and finalize team objectives for the current quarter.</p>
      </div>

      {pendingGoals.length === 0 ? (
        <Card className="border-dashed border-2 bg-transparent">
          <CardContent className="h-64 flex flex-col items-center justify-center space-y-4 opacity-50">
            <CheckCircle2 className="h-12 w-12" />
            <p className="text-lg">No pending goal approvals found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingGoals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden border-none shadow-md bg-white transition-all">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50"
                onClick={() => setExpandedId(expandedId === goal.id ? null : goal.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{goal.title}</h3>
                    <p className="text-xs text-muted-foreground">Submitted by {getUserName(goal.userId)} • {goal.thrustArea}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Weight</p>
                    <p className="font-bold">{goal.weightage}%</p>
                  </div>
                  {expandedId === goal.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>
              
              {expandedId === goal.id && (
                <CardContent className="px-6 pb-6 pt-0 space-y-6 border-t animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Description</h4>
                        <p className="text-sm leading-relaxed text-slate-700">{goal.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-slate-50">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Target</p>
                          <p className="text-sm font-bold">{goal.target}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Unit</p>
                          <p className="text-sm font-bold">{goal.unit}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Feedback & Action</h4>
                        <Textarea 
                          placeholder="Add feedback or reasons for rework..."
                          className="min-h-[100px] rounded-xl"
                          value={comments[goal.id] || ""}
                          onChange={(e) => setComments(prev => ({ ...prev, [goal.id]: e.target.value }))}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleRework(goal.id)} 
                          variant="outline" 
                          className="flex-1 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Rework
                        </Button>
                        <Button 
                          onClick={() => handleApprove(goal.id)} 
                          className="flex-1 rounded-xl shadow-lg bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
