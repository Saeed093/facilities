"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Eye,
  XCircle,
  UserX,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { bookings, type Booking } from "@/data/bookings";

const statusStyles: Record<Booking["status"], string> = {
  Confirmed: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-orange-100 text-orange-700 border-orange-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
  "No-Show": "bg-gray-100 text-gray-600 border-gray-200",
};

const facilityOptions = [
  "All Facilities",
  "Tennis Court",
  "Gym",
  "Swimming Pool",
  "Badminton Court",
  "Fitness Studio",
];

const statusOptions: Array<"All Status" | Booking["status"]> = [
  "All Status",
  "Confirmed",
  "Pending",
  "Cancelled",
  "Completed",
  "No-Show",
];

export default function BookingsPage() {
  const [tab, setTab] = useState("all");
  const [facility, setFacility] = useState("All Facilities");
  const [status, setStatus] = useState<string>("All Status");
  const [search, setSearch] = useState("");
  const [bookingList, setBookingList] = useState<Booking[]>(bookings);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);

  const filtered = useMemo(() => {
    return bookingList.filter((b) => {
      if (facility !== "All Facilities" && b.facility !== facility) return false;
      if (status !== "All Status" && b.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !b.id.toLowerCase().includes(q) &&
          !b.memberName.toLowerCase().includes(q) &&
          !b.facility.toLowerCase().includes(q)
        )
          return false;
      }
      if (tab === "daily") {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const todayStr = `${dd} ${months[today.getMonth()]} ${today.getFullYear()}`;
        if (b.date !== todayStr) return false;
      }
      return true;
    });
  }, [bookingList, facility, status, search, tab]);

  function handleCancel() {
    if (!cancelTarget) return;
    setBookingList((prev) =>
      prev.map((b) =>
        b.id === cancelTarget.id ? { ...b, status: "Cancelled" } : b
      )
    );
    setCancelTarget(null);
  }

  function handleNoShow(id: string) {
    setBookingList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "No-Show" } : b))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Bookings</h1>
        <p className="text-sm text-muted-foreground">
          Manage facility bookings
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Select value={facility} onValueChange={(v) => v && setFacility(v)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Facility" />
            </SelectTrigger>
            <SelectContent>
              {facilityOptions.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(v) => v && setStatus(v)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, name, or facility..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8"
            />
          </div>
        </div>

        <TabsContent value="all">
          <BookingsTable
            data={filtered}
            onCancel={setCancelTarget}
            onNoShow={handleNoShow}
          />
        </TabsContent>
        <TabsContent value="daily">
          <BookingsTable
            data={filtered}
            onCancel={setCancelTarget}
            onNoShow={handleNoShow}
          />
        </TabsContent>
        <TabsContent value="weekly">
          <BookingsTable
            data={filtered}
            onCancel={setCancelTarget}
            onNoShow={handleNoShow}
          />
        </TabsContent>
      </Tabs>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={!!cancelTarget} onOpenChange={(open) => !open && setCancelTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel booking{" "}
              <span className="font-semibold text-[#0B1F3A]">
                {cancelTarget?.id}
              </span>{" "}
              for{" "}
              <span className="font-semibold text-[#0B1F3A]">
                {cancelTarget?.memberName}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelTarget(null)}
            >
              Keep Booking
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCancel}
            >
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BookingsTable({
  data,
  onCancel,
  onNoShow,
}: {
  data: Booking[];
  onCancel: (b: Booking) => void;
  onNoShow: (id: string) => void;
}) {
  return (
    <Card className="mt-4">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">
                      {b.id}
                    </TableCell>
                    <TableCell className="font-medium">{b.memberName}</TableCell>
                    <TableCell>{b.facility}</TableCell>
                    <TableCell>{b.date}</TableCell>
                    <TableCell className="text-xs">{b.timeSlot}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusStyles[b.status]}
                      >
                        {b.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                        {(b.status === "Confirmed" || b.status === "Pending") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onCancel(b)}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            Cancel
                          </Button>
                        )}
                        {(b.status === "Confirmed" || b.status === "Pending") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            onClick={() => onNoShow(b.id)}
                          >
                            <UserX className="w-3.5 h-3.5 mr-1" />
                            No-Show
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
