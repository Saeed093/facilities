"use client";

import Link from "next/link";
import { ArrowLeft, QrCode, CheckCircle2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { currentMember } from "@/data/members";

export default function MemberIdCard() {
  const initials = currentMember.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <Link
          href="/member/home"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#0B1F3A]" />
        </Link>
        <h1 className="text-lg font-bold text-[#0B1F3A]">
          Digital Membership ID
        </h1>
      </div>

      <div className="px-4 space-y-5">
        {/* ID Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          {/* Navy gradient top */}
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#163A5F] px-5 pt-6 pb-8 relative">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#F5B942]" />
              <span className="text-white font-bold text-sm tracking-wide">
                RISING SUN
              </span>
            </div>
            <p className="text-[#F5B942] text-xs tracking-widest uppercase">
              Sports Facilities Management
            </p>

            {/* Profile circle */}
            <div className="absolute -bottom-10 left-5">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-[#0B1F3A]">
                  {initials}
                </span>
              </div>
            </div>
          </div>

          {/* Card body */}
          <CardContent className="pt-14 pb-5 px-5">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  {currentMember.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentMember.membershipType}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Member ID
                  </p>
                  <p className="text-sm font-semibold text-[#0B1F3A]">
                    {currentMember.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Status
                  </p>
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 mt-0.5">
                    {currentMember.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Type
                  </p>
                  <p className="text-sm font-medium text-[#0B1F3A]">
                    {currentMember.membershipType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Valid Until
                  </p>
                  <p className="text-sm font-medium text-[#0B1F3A]">
                    {currentMember.expiryDate}
                  </p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center pt-2">
                <div className="w-32 h-32 bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300">
                  <QrCode className="w-10 h-10 text-gray-400" />
                  <span className="text-xs text-gray-400 font-medium">
                    QR Code
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facility Access List */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
            Facility Access
          </h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-3">
                {currentMember.facilityAccess.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0E5F4F]" />
                    <span className="text-sm text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
