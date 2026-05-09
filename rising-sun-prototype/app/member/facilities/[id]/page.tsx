"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Users,
  ShieldCheck,
  Dumbbell,
  Waves,
  CircleDot,
  Music,
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
  gym: <Dumbbell className="w-12 h-12 text-white/80" />,
  "swimming-pool": <Waves className="w-12 h-12 text-white/80" />,
  "tennis-court": <CircleDot className="w-12 h-12 text-white/80" />,
  "badminton-court": <CircleDot className="w-12 h-12 text-white/80" />,
  "fitness-studio": <Music className="w-12 h-12 text-white/80" />,
};

const statusColors: Record<string, string> = {
  Open: "bg-emerald-100 text-emerald-700",
  Available: "bg-blue-100 text-blue-700",
  "Class Based": "bg-orange-100 text-orange-700",
  "Under Maintenance": "bg-red-100 text-red-700",
};

const sampleSlots = [
  { time: "6:00 AM – 7:00 AM", available: true },
  { time: "7:00 AM – 8:00 AM", available: true },
  { time: "8:00 AM – 9:00 AM", available: false },
  { time: "10:00 AM – 11:00 AM", available: true },
  { time: "5:00 PM – 6:00 PM", available: true },
  { time: "6:00 PM – 7:00 PM", available: false },
];

export default function FacilityDetail() {
  const params = useParams();
  const facility = facilities.find((f) => f.id === params.id);

  if (!facility) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Facility not found</p>
          <Link href="/member/facilities" className="text-[#0E5F4F] underline text-sm">
            Back to Facilities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <Link
          href="/member/facilities"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#0B1F3A]" />
        </Link>
        <h1 className="text-lg font-bold text-[#0B1F3A]">{facility.name}</h1>
      </div>

      {/* Banner */}
      <div
        className={`mx-4 rounded-2xl h-44 flex items-center justify-center ${
          facilityColors[facility.id] || "bg-gray-500"
        }`}
      >
        {facilityIcons[facility.id]}
      </div>

      <div className="px-4 mt-4 space-y-5">
        {/* Status & Quick Info */}
        <div className="flex items-center gap-3">
          <Badge
            className={`${statusColors[facility.status]} border-0 text-xs px-3 py-1`}
          >
            {facility.status}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5" />
            <span>Capacity: {facility.capacity}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-2">About</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {facility.description}
          </p>
        </div>

        {/* Rules */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0E5F4F]" />
            Rules & Guidelines
          </h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <ul className="space-y-2.5">
                {facility.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0E5F4F] mt-1.5 shrink-0" />
                    <span className="text-sm text-gray-600">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Timings */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0E5F4F]" />
            Timings
          </h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Operating Hours</span>
              <span className="text-sm font-semibold text-[#0B1F3A]">
                {facility.timing}
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Available Slots */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-2">
            Available Slots (Today)
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {sampleSlots.map((slot) => (
              <div
                key={slot.time}
                className={`rounded-xl border-2 py-3 px-3 text-center ${
                  slot.available
                    ? "border-[#0E5F4F]/20 bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`text-xs font-medium ${
                    slot.available ? "text-[#0B1F3A]" : "text-gray-400"
                  }`}
                >
                  {slot.time}
                </p>
                <p
                  className={`text-[10px] mt-0.5 ${
                    slot.available
                      ? "text-emerald-600 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {slot.available ? "Available" : "Booked"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <PoweredByKinotech variant="member" />
      </div>

      {/* Fixed Book Now Button */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-4 pt-2 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent">
        <Link href="/member/book">
          <Button className="w-full h-12 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white text-sm font-semibold rounded-xl">
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
