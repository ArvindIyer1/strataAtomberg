"use client";

import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Layers, ArrowRight, User, UserCog, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/types";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("employee");

  const handleContinue = () => {
    login(selectedRole);
    router.push(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 mb-6">
            <Layers className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-headline font-bold tracking-tight text-slate-900">Strata Performance</h1>
          <p className="text-slate-500">Access the demo environment</p>
        </div>

        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="pt-8 px-8 pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Select a workspace role to enter the portal</CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Role Access</label>
              <Select value={selectedRole} onValueChange={(val: UserRole) => setSelectedRole(val)}>
                <SelectTrigger className="h-14 rounded-xl border-slate-200 focus:ring-primary/20">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="employee">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4" />
                      <span>Employee View</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="manager">
                    <div className="flex items-center gap-3">
                      <UserCog className="h-4 w-4" />
                      <span>Manager View</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-4 w-4" />
                      <span>HR Admin View</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {selectedRole === 'employee' && "Test goal creation, weightage validation, and AI refinement features."}
                {selectedRole === 'manager' && "Review team goals, provide feedback, and manage performance scores."}
                {selectedRole === 'admin' && "Full system oversight, audit logging, and global user management."}
              </p>
            </div>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button 
              onClick={handleContinue} 
              className="w-full h-14 rounded-xl text-base bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              Enter Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
