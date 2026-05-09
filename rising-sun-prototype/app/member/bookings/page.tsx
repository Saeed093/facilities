"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Dumbbell,
  Waves,
  CircleDot,
  Music,
  Calendar,
  Clock,
  XCircle,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { bookings } from "@/data/bookings";

const memberBookings = bookings.filter((b) => b.memberId === "RS-MEM-0245");

const facilityIcons: Record<string, React.ReactNode> = {
  Gym: <Dumbbell className="w-4 h-4" />,
  "Swimming Pool": <Waves className="w-4 h-4" />,
  "Tennis Court": <CircleDot className="w-4 h-4" />,
  "Badminton Court": <CircleDot className="w-4 h-4" />,
  "Fitness Studio": <Music className="w-4 h-4" />,
};

const statusStyles: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-orange-100 text-orange-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
  "No-Show": "bg-gray-100 text-gray-600",
};

export default function MyBookingsPage() {
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [detailTarget, setDetailTarget] = useState<string | null>(null);
  const [cancelledIds, setCancelledIds] = useState<string[]>([]);

  const getStatus = (b: (typeof memberBookings)[0]) =>
    cancelledIds.includes(b.id) ? "Cancelled" : b.status;

  const upcoming = memberBookings.filter((b) => {
    const s = getStatus(b);
    return s === "Confirmed" || s === "Pending";
  });
  const completed = memberBookings.filter(
    (b) => getStatus(b) === "Completed"
  );
  const cancelled = memberBookings.filter(
    (b) => getStatus(b) === "Cancelled"
  );

  const cancelBooking = cancelTarget
    ? memberBookings.find((b) => b.id === cancelTarget)
    : null;
  const detailBooking = detailTarget
    ? memberBookings.find((b) => b.id === detailTarget)
    : null;

  function handleConfirmCancel() {
    if (cancelTarget) {
      setCancelledIds((prev) => [...prev, cancelTarget]);
      setCancelTarget(null);
    }
  }

  function renderBookingCard(
    booking: (typeof memberBookings)[0],
    showCancel: boolean
  ) {
    const status = getStatus(booking);
    return (
      <Card key={booking.id} className="shadow-none border-0 ring-0">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center text-[#0B1F3A]">
                {facilityIcons[booking.facility] || (
                  <CircleDot className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B1F3A]">
                  {booking.facility}
                </p>
                <p className="text-[11px] text-gray-400">{booking.id}</p>
              </div>
            </div>
            <Badge
              className={`border-0 text-[10px] font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}
            >
              {status}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {booking.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {booking.timeSlot}
            </span>
          </div>

          <div className="flex gap-2">
            {showCancel && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs text-red-600 border-red-200 hover:bg-red-50 rounded-lg gap-1"
                onClick={() => setCancelTarget(booking.id)}
              >
                <XCircle className="w-3.5 h-3.5" />
                Cancel
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs text-[#0B1F3A] border-[#0B1F3A]/20 hover:bg-[#0B1F3A]/5 rounded-lg gap-1"
              onClick={() => setDetailTarget(booking.id)}
            >
              <Eye className="w-3.5 h-3.5" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderEmpty(message: string) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-400">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0B1F3A] text-white px-4 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/member/home"
            className="p-1 -ml-1 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold">My Bookings</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">
        <Tabs defaultValue="upcoming">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="upcoming" className="flex-1 text-xs">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 text-xs">
              Completed
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex-1 text-xs">
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="space-y-3">
              {upcoming.length > 0
                ? upcoming.map((b) => renderBookingCard(b, true))
                : renderEmpty("No upcoming bookings")}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-3">
              {completed.length > 0
                ? completed.map((b) => renderBookingCard(b, false))
                : renderEmpty("No completed bookings")}
            </div>
          </TabsContent>

          <TabsContent value="cancelled">
            <div className="space-y-3">
              {cancelled.length > 0
                ? cancelled.map((b) => renderBookingCard(b, false))
                : renderEmpty("No cancelled bookings")}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelTarget !== null}
        onOpenChange={(open) => !open && setCancelTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your{" "}
              <span className="font-medium text-[#0B1F3A]">
                {cancelBooking?.facility}
              </span>{" "}
              booking on{" "}
              <span className="font-medium text-[#0B1F3A]">
                {cancelBooking?.date}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setCancelTarget(null)}
            >
              Keep Booking
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
              onClick={handleConfirmCancel}
            >
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog
        open={detailTarget !== null}
        onOpenChange={(open) => !open && setDetailTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {detailBooking && (
            <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-medium text-[#0B1F3A]">
                  {detailBooking.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Facility</span>
                <span className="font-medium text-[#0B1F3A]">
                  {detailBooking.facility}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-[#0B1F3A]">
                  {detailBooking.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time Slot</span>
                <span className="font-medium text-[#0B1F3A]">
                  {detailBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <Badge
                  className={`border-0 text-[10px] font-semibold ${statusStyles[getStatus(detailBooking)] || "bg-gray-100 text-gray-600"}`}
                >
                  {getStatus(detailBooking)}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="w-full bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white rounded-xl"
              onClick={() => setDetailTarget(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
