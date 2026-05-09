"use client";

import { useState } from "react";
import { Search, QrCode, LogIn, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { currentMember } from "@/data/members";

export default function CheckInPage() {
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleSearch() {
    setShowResult(true);
  }

  function handleCheckIn() {
    toast("Member checked in successfully");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Member Check-In</h1>
        <p className="text-sm text-muted-foreground">
          Verify and check-in members
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search Section */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or member ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-11 h-12 text-base"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="w-full h-10 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Member
            </Button>
          </CardContent>
        </Card>

        {/* QR Scan Placeholder */}
        <Card>
          <CardContent className="p-6 flex items-center justify-center">
            <div className="w-full h-48 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-3">
              <QrCode className="w-12 h-12 text-muted-foreground/50" />
              <p className="text-muted-foreground font-medium">Scan QR Code</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Check-In Card */}
      {showResult && (
        <Card className="border-[#0E5F4F]/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Photo Placeholder */}
              <div className="w-16 h-16 rounded-full bg-[#0B1F3A] flex items-center justify-center text-white text-xl font-bold shrink-0">
                {currentMember.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Member Info */}
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1F3A]">
                    {currentMember.name}
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono">
                    {currentMember.id}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200"
                  >
                    {currentMember.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200"
                  >
                    Dues: {currentMember.duesStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-[#0B1F3A]">
                    Today&apos;s Booking:
                  </span>{" "}
                  Tennis Court, 6 PM
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 shrink-0">
                <Button
                  onClick={handleCheckIn}
                  className="h-11 px-6 bg-[#0E5F4F] hover:bg-[#0E5F4F]/90 text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Check In
                </Button>
                <Button variant="outline" className="h-11 px-6">
                  <LogOut className="w-4 h-4 mr-2" />
                  Check Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
