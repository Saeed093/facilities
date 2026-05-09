"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Dumbbell,
  Waves,
  CircleDot,
  Music,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { facilities } from "@/data/facilities";
import { PoweredByKinotech } from "@/components/branding/PoweredByKinotech";

const facilityColors: Record<string, string> = {
  gym: "bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c]",
  "swimming-pool": "bg-gradient-to-br from-[#0E5F4F] to-[#147a65]",
  "tennis-court": "bg-gradient-to-br from-[#F5B942] to-[#e6a52e]",
  "badminton-court": "bg-gradient-to-br from-[#6366f1] to-[#4f46e5]",
  "fitness-studio": "bg-gradient-to-br from-[#ec4899] to-[#d946a8]",
};

const facilityIcons: Record<string, React.ReactNode> = {
  gym: <Dumbbell className="w-8 h-8 text-white" />,
  "swimming-pool": <Waves className="w-8 h-8 text-white" />,
  "tennis-court": <CircleDot className="w-8 h-8 text-white" />,
  "badminton-court": <CircleDot className="w-8 h-8 text-white" />,
  "fitness-studio": <Music className="w-8 h-8 text-white" />,
};

const statusColors: Record<string, string> = {
  Open: "bg-emerald-100 text-emerald-700",
  Available: "bg-blue-100 text-blue-700",
  "Class Based": "bg-orange-100 text-orange-700",
  "Under Maintenance": "bg-red-100 text-red-700",
};

export default function MemberFacilities() {
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
        <h1 className="text-lg font-bold text-[#0B1F3A]">Facilities</h1>
      </div>

      <div className="px-4 space-y-3">
        {facilities.map((facility) => (
          <Card key={facility.id} className="border-0 shadow-sm overflow-hidden">
            {/* Colored header area */}
            <div
              className={`${facilityColors[facility.id] || "bg-gray-500"} h-28 flex items-center justify-center`}
            >
              {facilityIcons[facility.id]}
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-[#0B1F3A]">
                  {facility.name}
                </h3>
                <Badge
                  className={`${statusColors[facility.status]} border-0 text-[10px]`}
                >
                  {facility.status}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{facility.timing}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>Cap: {facility.capacity}</span>
                </div>
              </div>

              <Link href="/member/book">
                <Button className="w-full bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white text-sm h-9">
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        <PoweredByKinotech variant="member" />
      </div>
    </div>
  );
}
