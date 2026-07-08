import * as React from "react";
import { AuditLog } from "../../types";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/display/status-chip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface AuditDetailsDrawerProps {
  log: AuditLog | null;
  onClose: () => void;
}

export function AuditDetailsDrawer({ log, onClose }: AuditDetailsDrawerProps) {
  if (!log) return null;

  return (
    <Drawer open={!!log} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent side="right" size="lg" className="h-full flex flex-col bg-[hsl(var(--background))]">
        <DrawerHeader className="border-b border-[hsl(var(--border))] pb-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <DrawerTitle className="text-xl">Audit Event Details</DrawerTitle>
              <DrawerDescription>
                Event ID: {log.id} • {new Date(log.metadata.timestamp).toLocaleString()}
              </DrawerDescription>
            </div>
            <StatusChip variant={log.result === "SUCCESS" ? "success" : "error"} label={log.result} />
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[hsl(var(--muted-foreground))]">Action</span>
              <span className="font-semibold text-[hsl(var(--foreground))]">{log.action}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[hsl(var(--muted-foreground))]">Actor</span>
              <span className="font-medium text-[hsl(var(--foreground))]">{log.metadata.actor}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[hsl(var(--muted-foreground))]">Entity Type</span>
              <span className="font-medium text-[hsl(var(--foreground))]">{log.entityType}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[hsl(var(--muted-foreground))]">Entity ID</span>
              <span className="font-mono text-[hsl(var(--foreground))]">{log.entityId}</span>
            </div>
          </div>

          <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
            <Tabs defaultValue="metadata" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-[hsl(var(--border))] h-12 bg-[hsl(var(--muted)/0.3)]">
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                <TabsTrigger value="payload">Payload</TabsTrigger>
                {log.beforeSnapshot && <TabsTrigger value="diff">State Diff</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="metadata" className="p-4 m-0 space-y-4 text-sm font-mono text-[hsl(var(--muted-foreground))]">
                <div className="flex justify-between border-b border-[hsl(var(--border))] pb-2">
                  <span>Correlation ID</span><span className="text-[hsl(var(--foreground))]">{log.metadata.correlationId}</span>
                </div>
                <div className="flex justify-between border-b border-[hsl(var(--border))] pb-2">
                  <span>Request ID</span><span className="text-[hsl(var(--foreground))]">{log.metadata.requestId}</span>
                </div>
                <div className="flex justify-between border-b border-[hsl(var(--border))] pb-2">
                  <span>IP Address</span><span className="text-[hsl(var(--foreground))]">{log.metadata.ipAddress}</span>
                </div>
                <div className="flex justify-between border-b border-[hsl(var(--border))] pb-2">
                  <span>Region</span><span className="text-[hsl(var(--foreground))]">{log.metadata.region}</span>
                </div>
                <div className="flex justify-between border-b border-[hsl(var(--border))] pb-2">
                  <span>Duration</span><span className="text-[hsl(var(--foreground))]">{log.metadata.durationMs}ms</span>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <span>User Agent</span><span className="text-[hsl(var(--foreground))] break-all">{log.metadata.userAgent}</span>
                </div>
              </TabsContent>

              <TabsContent value="payload" className="p-0 m-0">
                <pre className="p-4 bg-[hsl(var(--muted)/0.5)] text-xs font-mono overflow-x-auto text-[hsl(var(--foreground))] rounded-b-lg">
                  {JSON.stringify(log.payload, null, 2)}
                </pre>
              </TabsContent>

              {log.beforeSnapshot && (
                <TabsContent value="diff" className="p-4 m-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2">Before</h4>
                      <pre className="p-3 bg-[hsl(var(--destructive)/0.05)] border border-[hsl(var(--destructive)/0.2)] text-[hsl(var(--destructive))] text-xs font-mono rounded overflow-x-auto">
                        {JSON.stringify(log.beforeSnapshot, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2">After</h4>
                      <pre className="p-3 bg-[hsl(var(--success)/0.05)] border border-[hsl(var(--success)/0.2)] text-[hsl(var(--success))] text-xs font-mono rounded overflow-x-auto">
                        {JSON.stringify(log.afterSnapshot, null, 2)}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              )}

            </Tabs>
          </div>
        </div>

        <DrawerFooter className="border-t border-[hsl(var(--border))]">
          <Button variant="outline" onClick={onClose} className="w-full">Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
