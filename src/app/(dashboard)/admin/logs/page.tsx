
"use client";

import { useStore } from "@/store/useStore";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ShieldCheck, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuditLogsPage() {
  const { auditLogs } = useStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">System Audit Logs</h1>
          <p className="text-muted-foreground">Chronological record of all administrative and security events.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button variant="destructive" className="rounded-xl">
            <Trash2 className="mr-2 h-4 w-4" />
            Purge Old
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target User</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center text-muted-foreground italic">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <ShieldCheck className="h-10 w-10 opacity-20" />
                    No audit records found in the current buffer.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-sm">{log.action}</span>
                  </TableCell>
                  <TableCell className="text-sm">{log.userId}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
