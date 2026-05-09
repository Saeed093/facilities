"use client";

import { useState } from "react";
import { Eye, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { complaints, type Complaint } from "@/data/complaints";

type StatusFilter = "All" | Complaint["status"];

const statusStyles: Record<Complaint["status"], string> = {
  Open: "bg-red-100 text-red-700 border-red-200",
  "In Progress": "bg-orange-100 text-orange-700 border-orange-200",
  Resolved: "bg-green-100 text-green-700 border-green-200",
  Closed: "bg-gray-100 text-gray-600 border-gray-200",
};

const filterTabs: StatusFilter[] = [
  "All",
  "Open",
  "In Progress",
  "Resolved",
  "Closed",
];

const statusOptions: Complaint["status"][] = [
  "Open",
  "In Progress",
  "Resolved",
  "Closed",
];

export default function ComplaintsPage() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");
  const [complaintList, setComplaintList] = useState(complaints);
  const [viewTarget, setViewTarget] = useState<Complaint | null>(null);

  const filtered =
    activeFilter === "All"
      ? complaintList
      : complaintList.filter((c) => c.status === activeFilter);

  function handleStatusChange(id: string, newStatus: Complaint["status"]) {
    setComplaintList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Complaints</h1>
          <p className="text-sm text-muted-foreground">
            Manage member complaints
          </p>
        </div>
        <Badge className="bg-[#0B1F3A] text-white ml-2">
          {complaintList.length}
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <Button
            key={tab}
            variant={activeFilter === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(tab)}
            className={
              activeFilter === tab
                ? "bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white"
                : ""
            }
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Complaints Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Complaint ID</TableHead>
                  <TableHead>Member Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No complaints found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">
                        {c.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {c.memberName}
                      </TableCell>
                      <TableCell className="text-xs">{c.type}</TableCell>
                      <TableCell>{c.facility}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {c.subject}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusStyles[c.status]}
                        >
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{c.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => setViewTarget(c)}
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                          <Select
                            value={c.status}
                            onValueChange={(v) =>
                              v &&
                              handleStatusChange(
                                c.id,
                                v as Complaint["status"]
                              )
                            }
                          >
                            <SelectTrigger className="h-7 text-xs w-32">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Complaint Dialog */}
      <Dialog
        open={!!viewTarget}
        onOpenChange={(open) => !open && setViewTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              {viewTarget?.id} — {viewTarget?.date}
            </DialogDescription>
          </DialogHeader>
          {viewTarget && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground">Member</p>
                  <p className="font-medium">{viewTarget.memberName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium">{viewTarget.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Facility</p>
                  <p className="font-medium">{viewTarget.facility}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge
                    variant="outline"
                    className={statusStyles[viewTarget.status]}
                  >
                    {viewTarget.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Subject</p>
                <p className="font-medium">{viewTarget.subject}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Description</p>
                <p className="text-foreground">{viewTarget.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
