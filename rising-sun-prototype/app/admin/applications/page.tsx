"use client";

import { useState } from "react";
import { Eye, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { applications, type Application } from "@/data/applications";

type ApplicationStatus = Application["status"];

const statusBadgeVariant: Record<ApplicationStatus, string> = {
  "Pending Review": "bg-orange-100 text-orange-700 border-orange-200",
  Approved: "bg-green-100 text-green-700 border-green-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  "Need More Information": "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [appStatuses, setAppStatuses] = useState<Record<string, ApplicationStatus>>(
    () => Object.fromEntries(applications.map((a) => [a.id, a.status]))
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"approve" | "reject">("approve");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return appStatuses[app.id] === "Pending Review";
    if (activeTab === "approved") return appStatuses[app.id] === "Approved";
    if (activeTab === "rejected") return appStatuses[app.id] === "Rejected";
    return true;
  });

  function handleApprove(app: Application) {
    setSelectedApp(app);
    setDialogType("approve");
    setDialogOpen(true);
    setAppStatuses((prev) => ({ ...prev, [app.id]: "Approved" }));
  }

  function handleReject(app: Application) {
    setSelectedApp(app);
    setDialogType("reject");
    setDialogOpen(true);
    setAppStatuses((prev) => ({ ...prev, [app.id]: "Rejected" }));
  }

  const generatedMemberId = selectedApp
    ? `RS-MEM-0${parseInt(selectedApp.id.split("-")[2]) + 200}`
    : "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Applications</h1>
        <p className="text-sm text-muted-foreground">
          Manage membership applications
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => v && setActiveTab(v)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Application ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Membership Type</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.id}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.phone}</TableCell>
                <TableCell>{app.membershipType}</TableCell>
                <TableCell>{app.submittedDate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusBadgeVariant[appStatuses[app.id]]}
                  >
                    {appStatuses[app.id]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleApprove(app)}
                      disabled={appStatuses[app.id] === "Approved"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleReject(app)}
                      disabled={appStatuses[app.id] === "Rejected"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredApps.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "approve"
                ? "Application Approved"
                : "Application Rejected"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "approve" ? (
                <>
                  Application approved successfully. Member ID generated:{" "}
                  <span className="font-semibold text-[#0E5F4F]">
                    {generatedMemberId}
                  </span>
                </>
              ) : (
                <>
                  Application <span className="font-semibold">{selectedApp?.id}</span>{" "}
                  for {selectedApp?.name} has been rejected.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
