"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, CalendarDays, Clock, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { facilities } from "@/data/facilities";
import { timeSlots } from "@/data/bookings";

function getNext7Days() {
  const days: { label: string; dateNum: number; full: string; date: Date }[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: i === 0 ? "Today" : dayNames[d.getDay()],
      dateNum: d.getDate(),
      full: `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
      date: d,
    });
  }
  return days;
}

export default function BookFacilityPage() {
  const dates = useMemo(() => getNext7Days(), []);

  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const canConfirm = selectedFacility && selectedTimeSlot;

  const facilityName =
    facilities.find((f) => f.id === selectedFacility)?.name ?? "";

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0B1F3A] text-white px-4 pt-12 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <Link href="/member/facilities" className="p-1 -ml-1 rounded-lg hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold">Book a Facility</h1>
        </div>
        <p className="text-xs text-white/60 ml-8">
          Select a facility, date, and time slot
        </p>
      </div>

      <div className="flex-1 px-4 py-5 space-y-6 pb-28">
        {/* Facility Selector */}
        <div>
          <label className="text-sm font-medium text-[#0B1F3A] mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0E5F4F]" />
            Facility
          </label>
          <Select value={selectedFacility} onValueChange={(v) => v && setSelectedFacility(v)}>
            <SelectTrigger className="w-full h-11 bg-white text-sm">
              <SelectValue placeholder="Choose a facility" />
            </SelectTrigger>
            <SelectContent>
              {facilities.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Selector */}
        <div>
          <label className="text-sm font-medium text-[#0B1F3A] mb-2 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#0E5F4F]" />
            Date
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {dates.map((d, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedDateIdx(i);
                  setSelectedTimeSlot(null);
                }}
                className={`flex flex-col items-center min-w-[56px] py-2.5 px-2 rounded-xl border-2 transition-all text-center ${
                  selectedDateIdx === i
                    ? "border-[#F5B942] bg-[#F5B942]/10 text-[#0B1F3A]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <span className="text-[10px] font-medium uppercase tracking-wide">
                  {d.label}
                </span>
                <span className="text-lg font-bold leading-tight mt-0.5">
                  {d.dateNum}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <label className="text-sm font-medium text-[#0B1F3A] mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0E5F4F]" />
            Available Time Slots
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const isFull = slot.status === "Full";
              const isSelected = selectedTimeSlot === slot.time;

              return (
                <button
                  key={slot.time}
                  disabled={isFull}
                  onClick={() =>
                    setSelectedTimeSlot(isSelected ? null : slot.time)
                  }
                  className={`rounded-xl border-2 py-3 px-3 text-xs font-medium transition-all ${
                    isFull
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "border-[#F5B942] bg-[#F5B942]/15 text-[#0B1F3A] shadow-sm"
                      : "border-[#0E5F4F]/20 bg-white text-[#0B1F3A] hover:border-[#0E5F4F]/40"
                  }`}
                >
                  {slot.time}
                  {isFull && (
                    <span className="block text-[10px] text-gray-400 mt-0.5">
                      Full
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Confirm Button */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-4 pt-2 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent">
        <Button
          className="w-full h-12 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white text-sm font-semibold rounded-xl"
          disabled={!canConfirm}
          onClick={() => setShowConfirmation(true)}
        >
          Confirm Booking
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 rounded-full bg-[#0E5F4F]/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#0E5F4F]" />
              </div>
            </div>
            <DialogTitle className="text-center text-lg">
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your facility has been booked successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Facility</span>
              <span className="font-medium text-[#0B1F3A]">{facilityName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-[#0B1F3A]">
                {dates[selectedDateIdx]?.full}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time</span>
              <span className="font-medium text-[#0B1F3A]">
                {selectedTimeSlot}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white rounded-xl"
              onClick={() => setShowConfirmation(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
