"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  CreditCard,
  Dumbbell,
  MessageSquare,
  IdCard,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { currentMember } from "@/data/members";

export default function MemberHome() {
  const greeting = "Good Evening";

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <div className="bg-[#0B1F3A] px-5 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#F5B942] text-sm font-medium">{greeting},</p>
            <h1 className="text-white text-xl font-bold">
              {currentMember.name.split(" ")[0]}
            </h1>
          </div>
          <Link
            href="/member/notifications"
            className="relative p-2 bg-white/10 rounded-full"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5B942] rounded-full" />
          </Link>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 mb-1">Membership Status</p>
              <Badge className="bg-emerald-100 text-emerald-700 border-0">
                {currentMember.status}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 mb-1">Membership ID</p>
              <p className="text-sm font-semibold text-[#0B1F3A]">
                {currentMember.id}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 mb-1">Dues Status</p>
              <Badge className="bg-emerald-100 text-emerald-700 border-0">
                {currentMember.duesStatus}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 mb-1">Next Due Date</p>
              <p className="text-sm font-semibold text-[#0B1F3A]">
                01 June 2026
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 mb-1">Upcoming Booking</p>
              <p className="text-sm font-semibold text-[#0B1F3A]">
                Tennis Court
              </p>
              <p className="text-xs text-gray-400">6:00 PM</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 mb-1">Facilities Available</p>
              <p className="text-2xl font-bold text-[#0E5F4F]">5</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/member/book">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/10 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-[#0B1F3A]" />
                  </div>
                  <span className="text-xs font-medium text-[#0B1F3A]">
                    Book Facility
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/member/payments">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#0E5F4F]/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#0E5F4F]" />
                  </div>
                  <span className="text-xs font-medium text-[#0B1F3A]">
                    Pay Dues
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/member/id-card">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#F5B942]/10 flex items-center justify-center">
                    <IdCard className="w-5 h-5 text-[#F5B942]" />
                  </div>
                  <span className="text-xs font-medium text-[#0B1F3A]">
                    View ID Card
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/member/complaints">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-xs font-medium text-[#0B1F3A]">
                    Submit Complaint
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Announcements */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#F5B942]" />
            Announcements
          </h2>
          <div className="space-y-2">
            {[
              "Swimming pool will be closed on Friday for maintenance",
              "Tennis coaching slots are now available",
              "Monthly dues deadline is 10th of every month",
            ].map((announcement, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-3 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0E5F4F] mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {announcement}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
