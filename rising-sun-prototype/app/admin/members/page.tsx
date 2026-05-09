"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Eye, UserX, UserCheck, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { members, type Member } from "@/data/members";
import Link from "next/link";

type StatusFilter = "all" | "Active" | "Expired" | "Suspended" | "Dues Pending";

const statusBadge: Record<Member["status"], string> = {
  Active: "bg-green-100 text-green-700 border-green-200",
  Expired: "bg-red-100 text-red-700 border-red-200",
  Suspended: "bg-gray-100 text-gray-700 border-gray-200",
  Pending: "bg-orange-100 text-orange-700 border-orange-200",
};

const duesBadge: Record<Member["duesStatus"], string> = {
  Paid: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-orange-100 text-orange-700 border-orange-200",
  Overdue: "bg-red-100 text-red-700 border-red-200",
};

const filterOptions: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Expired", value: "Expired" },
  { label: "Suspended", value: "Suspended" },
  { label: "Dues Pending", value: "Dues Pending" },
];

export default function MembersPage() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter((m) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "Dues Pending"
        ? m.duesStatus === "Pending" || m.duesStatus === "Overdue"
        : m.status === activeFilter);

    const matchesSearch =
      !search || m.name.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Members</h1>
          <p className="text-sm text-muted-foreground">
            All registered members
          </p>
        </div>
        <Badge variant="outline" className="bg-[#0B1F3A] text-white border-none h-6">
          {members.length}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={activeFilter === opt.value ? "default" : "outline"}
              size="sm"
              className={
                activeFilter === opt.value
                  ? "bg-[#0B1F3A] hover:bg-[#0B1F3A]/90"
                  : ""
              }
              onClick={() => setActiveFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-64 sm:ml-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Membership Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dues Status</TableHead>
              <TableHead>Last Check-In</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.membershipType}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusBadge[member.status]}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={duesBadge[member.duesStatus]}>
                    {member.duesStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {member.lastCheckIn}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => window.location.href = `/admin/members/${member.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserX className="mr-2 h-4 w-4" />
                        Suspend
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
