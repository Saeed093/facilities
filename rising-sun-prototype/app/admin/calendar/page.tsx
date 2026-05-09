"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookings } from "@/data/bookings";

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const statusColors: Record<string, string> = {
  Confirmed: "bg-green-500",
  Pending: "bg-orange-400",
  Cancelled: "bg-red-400",
  Completed: "bg-blue-400",
};

const statusLegend = [
  { label: "Confirmed", color: "bg-green-500" },
  { label: "Pending", color: "bg-orange-400" },
  { label: "Cancelled", color: "bg-red-400" },
  { label: "Completed", color: "bg-blue-400" },
];

const facilityFilter = [
  "All Facilities",
  "Tennis Court",
  "Gym",
  "Swimming Pool",
  "Badminton Court",
  "Fitness Studio",
];

interface CalendarBlock {
  day: number;
  hour: number;
  facility: string;
  memberName: string;
  status: string;
  timeSlot: string;
}

function getWeekDates(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function parseHourFromSlot(timeSlot: string): number {
  const match = timeSlot.match(/^(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return -1;
  let hour = parseInt(match[1], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return hour;
}

function parseDateStr(dateStr: string): Date | null {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = dateStr.split(" ");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = months[parts[1]];
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || month === undefined || isNaN(year)) return null;
  return new Date(year, month, day);
}

function formatDate(d: Date): string {
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
}

function formatHour(h: number): string {
  if (h === 0 || h === 12) return `${h === 0 ? 12 : 12} ${h < 12 ? "AM" : "PM"}`;
  return `${h > 12 ? h - 12 : h} ${h >= 12 ? "PM" : "AM"}`;
}

export default function CalendarPage() {
  const [facility, setFacility] = useState("All Facilities");
  const [view, setView] = useState<"week" | "day">("week");

  const weekDates = useMemo(() => getWeekDates(), []);

  const calendarBlocks = useMemo(() => {
    const results: CalendarBlock[] = [];
    for (const b of bookings) {
      if (facility !== "All Facilities" && b.facility !== facility) continue;
      if (b.status === "No-Show") continue;
      const bookingDate = parseDateStr(b.date);
      if (!bookingDate) continue;
      const dayIndex = weekDates.findIndex(
        (wd) =>
          wd.getFullYear() === bookingDate.getFullYear() &&
          wd.getMonth() === bookingDate.getMonth() &&
          wd.getDate() === bookingDate.getDate()
      );
      if (dayIndex === -1) continue;
      const hour = parseHourFromSlot(b.timeSlot);
      if (hour < 6 || hour > 22) continue;
      results.push({ day: dayIndex, hour, facility: b.facility, memberName: b.memberName, status: b.status, timeSlot: b.timeSlot });
    }
    return results;
  }, [facility, weekDates]);

  const sampleBlocks: CalendarBlock[] = [
    { day: 0, hour: 7, facility: "Gym", memberName: "Sample: Morning Gym", status: "Confirmed", timeSlot: "7:00 AM – 8:00 AM" },
    { day: 1, hour: 10, facility: "Swimming Pool", memberName: "Sample: Pool Session", status: "Pending", timeSlot: "10:00 AM – 11:00 AM" },
    { day: 2, hour: 17, facility: "Tennis Court", memberName: "Sample: Tennis Match", status: "Confirmed", timeSlot: "5:00 PM – 6:00 PM" },
    { day: 3, hour: 9, facility: "Fitness Studio", memberName: "Sample: Yoga Class", status: "Completed", timeSlot: "9:00 AM – 10:00 AM" },
    { day: 4, hour: 19, facility: "Badminton Court", memberName: "Sample: Badminton", status: "Confirmed", timeSlot: "7:00 PM – 8:00 PM" },
    { day: 5, hour: 8, facility: "Gym", memberName: "Sample: Weekend Workout", status: "Pending", timeSlot: "8:00 AM – 9:00 AM" },
    { day: 6, hour: 15, facility: "Swimming Pool", memberName: "Sample: Family Swim", status: "Cancelled", timeSlot: "3:00 PM – 4:00 PM" },
    { day: 0, hour: 18, facility: "Tennis Court", memberName: "Sample: Evening Tennis", status: "Confirmed", timeSlot: "6:00 PM – 7:00 PM" },
    { day: 2, hour: 7, facility: "Fitness Studio", memberName: "Sample: HIIT Class", status: "Completed", timeSlot: "7:00 AM – 8:00 AM" },
    { day: 4, hour: 14, facility: "Gym", memberName: "Sample: Afternoon Session", status: "Pending", timeSlot: "2:00 PM – 3:00 PM" },
  ];

  const filteredSamples = sampleBlocks.filter(
    (b) => facility === "All Facilities" || b.facility === facility
  );

  const allBlocks = [...calendarBlocks, ...filteredSamples];

  function getBlocksForCell(dayIdx: number, hour: number) {
    return allBlocks.filter((b) => b.day === dayIdx && b.hour === hour);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">
            Booking Calendar
          </h1>
          <p className="text-sm text-muted-foreground">
            Visual booking overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
              variant={view === "week" ? "default" : "ghost"}
              size="sm"
              className={
                view === "week"
                  ? "bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 rounded-none"
                  : "rounded-none"
              }
              onClick={() => setView("week")}
            >
              Week
            </Button>
            <Button
              variant={view === "day" ? "default" : "ghost"}
              size="sm"
              className={
                view === "day"
                  ? "bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 rounded-none"
                  : "rounded-none"
              }
              onClick={() => setView("day")}
            >
              Day
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Select value={facility} onValueChange={(v) => v && setFacility(v)}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Filter by facility" />
          </SelectTrigger>
          <SelectContent>
            {facilityFilter.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 sm:ml-auto">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#F5B942]/10 border-[#F5B942]/30 text-[#0B1F3A] hover:bg-[#F5B942]/20"
          >
            <CalendarDays className="w-4 h-4 mr-1" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Week Header */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Day Headers */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b bg-muted/30">
              <div className="p-3 text-xs font-medium text-muted-foreground border-r">
                Time
              </div>
              {DAYS.map((day, i) => {
                const d = weekDates[i];
                const isToday =
                  d && new Date().toDateString() === d.toDateString();
                return (
                  <div
                    key={day}
                    className={`p-3 text-center border-r last:border-r-0 ${
                      isToday ? "bg-[#F5B942]/10" : ""
                    }`}
                  >
                    <p
                      className={`text-xs font-medium ${
                        isToday ? "text-[#0B1F3A]" : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isToday ? "text-[#0B1F3A]" : ""
                      }`}
                    >
                      {d ? formatDate(d) : ""}
                    </p>
                    {isToday && (
                      <Badge className="mt-1 bg-[#F5B942] text-[#0B1F3A] text-[10px] px-1.5 py-0 hover:bg-[#F5B942]">
                        Today
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time Grid */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-[80px_repeat(7,1fr)] border-b last:border-b-0 min-h-[48px]"
              >
                <div className="p-2 text-xs text-muted-foreground border-r flex items-start justify-end pr-3 pt-1">
                  {formatHour(hour)}
                </div>
                {DAYS.map((_, dayIdx) => {
                  const blocks = getBlocksForCell(dayIdx, hour);
                  const isToday =
                    weekDates[dayIdx] &&
                    new Date().toDateString() ===
                      weekDates[dayIdx].toDateString();
                  return (
                    <div
                      key={dayIdx}
                      className={`border-r last:border-r-0 p-0.5 relative ${
                        isToday ? "bg-[#F5B942]/[0.03]" : ""
                      }`}
                    >
                      {blocks.map((block, bIdx) => (
                        <div
                          key={bIdx}
                          className={`${
                            statusColors[block.status] ?? "bg-gray-400"
                          } text-white rounded px-1.5 py-1 text-[10px] leading-tight mb-0.5 truncate cursor-default`}
                          title={`${block.facility} - ${block.memberName}\n${block.timeSlot} (${block.status})`}
                        >
                          <span className="font-medium">{block.facility}</span>
                          <br />
                          <span className="opacity-80">
                            {block.memberName.replace("Sample: ", "")}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">
          Legend:
        </span>
        {statusLegend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
