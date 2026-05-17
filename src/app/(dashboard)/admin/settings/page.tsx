
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save, Shield, Bell, Database, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-900">System Settings</h1>
        <p className="text-muted-foreground">Global configuration for the Strata environment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary">
                <Shield className="h-5 w-5" />
                <CardTitle className="text-lg">Security & Privacy</CardTitle>
              </div>
              <CardDescription>Authentication and access control policies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SSO Mandatory</Label>
                  <p className="text-xs text-muted-foreground">Force users to log in via enterprise provider.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Multi-factor Auth</Label>
                  <p className="text-xs text-muted-foreground">Enforce 2FA for all administrator accounts.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent">
                <Bell className="h-5 w-5" />
                <CardTitle className="text-lg">Notifications</CardTitle>
              </div>
              <CardDescription>System-wide alert configurations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Goal Submission Alerts</Label>
                  <p className="text-xs text-muted-foreground">Notify managers when goals are submitted.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Summary</Label>
                  <p className="text-xs text-muted-foreground">Send weekly progress digests to all users.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-600">
                <Database className="h-5 w-5" />
                <CardTitle className="text-lg">Data Management</CardTitle>
              </div>
              <CardDescription>Retention and archival settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="p-4 rounded-xl bg-slate-50 border space-y-3">
                  <p className="text-sm font-medium">Auto-Archive Completed Quarters</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Moving data older than 180 days to long-term storage reduces active database costs and improves system latency.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">Configure Archival Policy</Button>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600">
                <Globe className="h-5 w-5" />
                <CardTitle className="text-lg">Localization</CardTitle>
              </div>
              <CardDescription>Timezone and regional settings.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Workspace Language</Label>
                    <div className="h-10 px-3 flex items-center bg-slate-100 rounded-md text-sm">English (US)</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Corporate Timezone</Label>
                    <div className="h-10 px-3 flex items-center bg-slate-100 rounded-md text-sm">UTC -08:00 (Pacific Time)</div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-8 border-t">
        <Button variant="ghost">Reset Defaults</Button>
        <Button className="rounded-xl px-12 shadow-lg shadow-primary/20">
          <Save className="mr-2 h-4 w-4" />
          Save Global Config
        </Button>
      </div>
    </div>
  );
}
