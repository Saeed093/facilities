"use client";

import { useState } from "react";
import { UserPlus, Pencil, UserX } from "lucide-react";
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
import { toast } from "sonner";
import { staff } from "@/data/staff";

const roleStyles: Record<string, string> = {
  "Super Admin": "bg-[#0B1F3A] text-white border-[#0B1F3A]",
  "Finance Admin": "bg-[#0E5F4F] text-white border-[#0E5F4F]",
  "Reception Staff": "bg-blue-100 text-blue-700 border-blue-200",
  "Facility Manager": "bg-orange-100 text-orange-700 border-orange-200",
  "Support Staff": "bg-purple-100 text-purple-700 border-purple-200",
};

const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700 border-green-200",
  Inactive: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function StaffPage() {
  const [staffList, setStaffList] = useState(staff);

  function handleDeactivate(email: string) {
    setStaffList((prev) =>
      prev.map((s) => (s.email === email ? { ...s, status: "Inactive" as const } : s))
    );
    toast("Staff member deactivated");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Staff & Roles</h1>
          <p className="text-sm text-muted-foreground">Manage admin access</p>
        </div>
        <Button className="bg-[#0E5F4F] hover:bg-[#0E5F4F]/90 text-white">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffList.map((s) => (
                  <TableRow key={s.email}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {s.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={roleStyles[s.role] || ""}
                      >
                        {s.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs max-w-[180px] truncate">
                      {s.access}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusStyles[s.status]}
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{s.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeactivate(s.email)}
                        >
                          <UserX className="w-3.5 h-3.5 mr-1" />
                          Deactivate
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
