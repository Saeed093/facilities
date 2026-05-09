"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  CheckCircle2,
  CalendarDays,
  UserCog,
  Ban,
  RefreshCw,
  BadgeDollarSign,
  IdCard,
  Pencil,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { members, type Member } from "@/data/members";
import { bookings } from "@/data/bookings";

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

const bookingStatusStyles: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-orange-100 text-orange-700 border-orange-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
  "No-Show": "bg-gray-100 text-gray-600 border-gray-200",
};

export default function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const member = useMemo(() => members.find((m) => m.id === id), [id]);

  const memberBookings = useMemo(
    () => bookings.filter((b) => b.memberId === id).slice(0, 3),
    [id]
  );

  const totalBookings = useMemo(
    () => bookings.filter((b) => b.memberId === id).length,
    [id]
  );

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <UserCog className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-[#0B1F3A]">
          Member not found
        </h2>
        <p className="text-muted-foreground">
          No member exists with ID: {id}
        </p>
        <Link href="/admin/members">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/members"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0B1F3A] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Members
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-[#0B1F3A] flex items-center justify-center text-white text-xl font-bold shrink-0">
          {member.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[#0B1F3A]">
              {member.name}
            </h1>
            <Badge variant="outline" className={statusBadge[member.status]}>
              {member.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {member.id} &middot; {member.membershipType}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#0B1F3A]">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Full Name" value={member.name} />
              <InfoRow
                label="Phone"
                value={member.phone}
                icon={<Phone className="w-3.5 h-3.5" />}
              />
              <InfoRow
                label="Email"
                value={member.email}
                icon={<Mail className="w-3.5 h-3.5" />}
              />
              <InfoRow
                label="CNIC"
                value={member.cnic}
                icon={<CreditCard className="w-3.5 h-3.5" />}
              />
              <div className="sm:col-span-2">
                <InfoRow
                  label="Address"
                  value={member.address}
                  icon={<MapPin className="w-3.5 h-3.5" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Membership Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#0B1F3A]">
                Membership Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Membership Type" value={member.membershipType} />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <Badge
                  variant="outline"
                  className={statusBadge[member.status]}
                >
                  {member.status}
                </Badge>
              </div>
              <InfoRow label="Start Date" value={member.joinDate} />
              <InfoRow label="Expiry Date" value={member.expiryDate} />
            </CardContent>
          </Card>

          {/* Facility Access */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#0B1F3A]">
                Facility Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.facilityAccess.map((facility) => (
                  <div
                    key={facility}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E5F4F]/20 bg-[#0E5F4F]/5 px-3 py-1.5 text-sm text-[#0E5F4F]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {facility}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payment Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#0B1F3A]">
                Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Dues Status
                </p>
                <Badge
                  variant="outline"
                  className={duesBadge[member.duesStatus]}
                >
                  {member.duesStatus}
                </Badge>
              </div>
              <InfoRow label="Last Payment" value="PKR 8,500" />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#0B1F3A]">
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  Total Bookings
                </div>
                <span className="font-semibold text-[#0B1F3A]">
                  {totalBookings}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  Check-ins this month
                </div>
                <span className="font-semibold text-[#0B1F3A]">12</span>
              </div>
            </CardContent>
          </Card>

          {/* Last Check-in */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground mb-1">
                Last Check-In
              </p>
              <p className="text-sm font-medium">{member.lastCheckIn}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking History */}
      {memberBookings.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-[#0B1F3A]">
              Recent Booking History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberBookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs">
                        {b.id}
                      </TableCell>
                      <TableCell>{b.facility}</TableCell>
                      <TableCell>{b.date}</TableCell>
                      <TableCell className="text-xs">{b.timeSlot}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={bookingStatusStyles[b.status] ?? ""}
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-[#0B1F3A] hover:bg-[#0B1F3A]/90">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Member
        </Button>
        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
          <Ban className="w-4 h-4 mr-2" />
          Suspend Member
        </Button>
        <Button variant="outline" className="text-[#0E5F4F] border-[#0E5F4F]/30 hover:bg-[#0E5F4F]/5">
          <RefreshCw className="w-4 h-4 mr-2" />
          Renew Membership
        </Button>
        <Button variant="outline" className="text-[#F5B942] border-[#F5B942]/30 hover:bg-[#F5B942]/5">
          <BadgeDollarSign className="w-4 h-4 mr-2" />
          Mark Dues Paid
        </Button>
        <Button variant="outline">
          <IdCard className="w-4 h-4 mr-2" />
          View ID Card
        </Button>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium flex items-center gap-1.5">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {value}
      </p>
    </div>
  );
}
