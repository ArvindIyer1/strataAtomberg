"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { refineGoalWithAI } from "@/ai/flows/refine-goal-with-ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Goal } from "@/types";

interface GoalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingGoal?: Goal;
}

export function GoalForm({ open, onOpenChange, editingGoal }: GoalFormProps) {
  const { currentUser, addGoal, updateGoal } = useStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);

  const [formData, setFormData] = useState({
    thrustArea: editingGoal?.thrustArea || "",
    title: editingGoal?.title || "",
    description: editingGoal?.description || "",
    unit: editingGoal?.unit || "",
    target: editingGoal?.target || "",
    weightage: editingGoal?.weightage || 10,
  });

  const handleRefine = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: "Validation Error", description: "Please enter a title and description first.", variant: "destructive" });
      return;
    }

    setRefining(true);
    try {
      const refined = await refineGoalWithAI({
        thrustArea: formData.thrustArea,
        title: formData.title,
        description: formData.description,
        unitOfMeasurement: formData.unit,
        targetValue: formData.target,
        weightage: Number(formData.weightage),
      });

      setFormData({
        thrustArea: refined.thrustArea || formData.thrustArea,
        title: refined.title,
        description: refined.description,
        unit: refined.unitOfMeasurement || formData.unit,
        target: refined.targetValue?.toString() || formData.target,
        weightage: refined.weightage,
      });

      toast({ title: "AI Refinement Complete", description: "Your goal has been updated with professional SMART criteria." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to refine goal. Please try again.", variant: "destructive" });
    } finally {
      setRefining(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (Number(formData.weightage) < 10) {
      toast({ title: "Validation Error", description: "Min weightage is 10%", variant: "destructive" });
      return;
    }

    const data = {
      ...formData,
      userId: currentUser.id,
      weightage: Number(formData.weightage),
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, data);
      toast({ title: "Goal Updated", description: "Changes have been saved." });
    } else {
      addGoal(data);
      toast({ title: "Goal Created", description: "New goal added to your draft list." });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-headline font-bold">
            {editingGoal ? "Edit Goal" : "Create New Goal"}
          </DialogTitle>
          <DialogDescription>
            Enter your performance objectives. Use AI to refine them into SMART goals.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thrustArea">Thrust Area</Label>
              <Input 
                id="thrustArea" 
                placeholder="e.g. Operations, Revenue" 
                value={formData.thrustArea}
                onChange={e => setFormData(prev => ({ ...prev, thrustArea: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weightage">Weightage (%)</Label>
              <Input 
                id="weightage" 
                type="number" 
                min="10" 
                max="100" 
                value={formData.weightage}
                onChange={e => setFormData(prev => ({ ...prev, weightage: Number(e.target.value) }))}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input 
              id="title" 
              placeholder="Enter a concise title" 
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe what success looks like..." 
              className="min-h-[100px]"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Unit of Measurement</Label>
              <Input 
                id="unit" 
                placeholder="e.g. USD, %, Tasks" 
                value={formData.unit}
                onChange={e => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target">Target Value</Label>
              <Input 
                id="target" 
                placeholder="Target number or metric" 
                value={formData.target}
                onChange={e => setFormData(prev => ({ ...prev, target: e.target.value }))}
                required
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between w-full pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleRefine}
              disabled={refining}
              className="rounded-xl border-primary/20 hover:bg-primary/5 text-primary gap-2"
            >
              {refining ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Refine with AI
            </Button>
            <Button type="submit" className="rounded-xl px-8 shadow-lg shadow-primary/20">
              <Save className="mr-2 h-4 w-4" />
              Save Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
