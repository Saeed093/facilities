"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const complaintTypes = [
  "Facility Issue",
  "Payment Issue",
  "Booking Issue",
  "Staff Issue",
  "General Feedback",
];

const facilityOptions = [
  "Gym",
  "Swimming Pool",
  "Tennis Court",
  "Badminton Court",
  "Fitness Studio",
  "N/A",
];

export default function ComplaintsPage() {
  const [type, setType] = useState("");
  const [facility, setFacility] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Your complaint has been submitted successfully.");
    setType("");
    setFacility("");
    setSubject("");
    setDescription("");
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
          <h1 className="text-lg font-semibold">Submit Complaint</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Complaint Type */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Complaint Type
            </label>
            <Select value={type} onValueChange={(v) => v && setType(v)}>
              <SelectTrigger className="w-full h-11 bg-white text-sm">
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
                {complaintTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Facility */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Facility
            </label>
            <Select value={facility} onValueChange={(v) => v && setFacility(v)}>
              <SelectTrigger className="w-full h-11 bg-white text-sm">
                <SelectValue placeholder="Select facility" />
              </SelectTrigger>
              <SelectContent>
                {facilityOptions.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Subject
            </label>
            <Input
              type="text"
              placeholder="Brief subject of your complaint"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-11 bg-white text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Description
            </label>
            <Textarea
              placeholder="Describe your issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white text-sm min-h-[120px] resize-none"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Upload Image (Optional)
            </label>
            <Card className="shadow-none border-2 border-dashed border-gray-300 ring-0">
              <CardContent className="p-8 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0B1F3A]/5 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#0B1F3A]/40" />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Tap to upload an image
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white text-sm font-semibold rounded-xl"
          >
            Submit Complaint
          </Button>
        </form>
      </div>
    </div>
  );
}
