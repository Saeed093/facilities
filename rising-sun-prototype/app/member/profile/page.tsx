"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Shield,
  CheckCircle2,
  Calendar,
  IdCard,
  LogOut,
  Pencil,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentMember } from "@/data/members";

export default function ProfilePage() {
  const router = useRouter();
  const initials = currentMember.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0B1F3A] text-white px-4 pt-12 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/member/home"
            className="p-1 -ml-1 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>

        {/* Profile Photo + Name */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#F5B942] flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-[#0B1F3A]">
              {initials}
            </span>
          </div>
          <h2 className="text-xl font-bold">{currentMember.name}</h2>
          <Badge className="mt-1.5 bg-white/15 text-white border-0 text-xs">
            {currentMember.membershipType}
          </Badge>
        </div>
      </div>

      <div className="flex-1 px-4 -mt-4 pb-8 space-y-4">
        {/* Personal Info */}
        <Card className="shadow-none border-0 ring-0">
          <CardContent className="p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Personal Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-[#0B1F3A]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Phone</p>
                  <p className="text-sm text-[#0B1F3A]">
                    {currentMember.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-[#0B1F3A]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Email</p>
                  <p className="text-sm text-[#0B1F3A]">
                    {currentMember.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-[#0B1F3A]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Address</p>
                  <p className="text-sm text-[#0B1F3A]">
                    {currentMember.address}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Membership */}
        <Card className="shadow-none border-0 ring-0">
          <CardContent className="p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Membership
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0E5F4F]/5 flex items-center justify-center">
                    <CreditCard className="w-3.5 h-3.5 text-[#0E5F4F]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Type</p>
                    <p className="text-sm text-[#0B1F3A]">
                      {currentMember.membershipType}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Status</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                  {currentMember.status}
                </Badge>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-2 ml-11">
                  Facility Access
                </p>
                <div className="space-y-1.5 ml-11">
                  {currentMember.facilityAccess.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-[#0B1F3A]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0E5F4F]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="shadow-none border-0 ring-0">
          <CardContent className="p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Account
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5B942]/10 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-[#F5B942]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Member Since</p>
                  <p className="text-sm text-[#0B1F3A]">
                    {currentMember.joinDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5B942]/10 flex items-center justify-center">
                  <IdCard className="w-3.5 h-3.5 text-[#F5B942]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Membership ID</p>
                  <p className="text-sm font-medium text-[#0B1F3A]">
                    {currentMember.id}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            variant="outline"
            className="w-full h-11 text-sm font-semibold rounded-xl border-[#0B1F3A]/20 text-[#0B1F3A] gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button
            className="w-full h-11 text-sm font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white gap-2"
            onClick={() => router.push("/member/login")}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
