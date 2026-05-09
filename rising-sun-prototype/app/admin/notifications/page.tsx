"use client";

import { useState } from "react";
import { Send, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { notifications, adminNotificationTargets } from "@/data/notifications";

const facilityOptions = [
  "All Facilities",
  "Gym",
  "Swimming Pool",
  "Tennis Court",
  "Badminton Court",
  "Fitness Studio",
];

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");
  const [facility, setFacility] = useState("");
  const [sendDate, setSendDate] = useState("");

  function handleSend() {
    toast("Notification sent successfully");
    setTitle("");
    setMessage("");
    setTarget("");
    setFacility("");
    setSendDate("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Notifications</h1>
        <p className="text-sm text-muted-foreground">
          Send notices to members
        </p>
      </div>

      {/* Send Notification Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0B1F3A]">
            Send Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Notification Title</label>
            <Input
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience</label>
              <Select value={target} onValueChange={(v) => v && setTarget(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  {adminNotificationTargets.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Facility (optional)
              </label>
              <Select
                value={facility}
                onValueChange={(v) => v && setFacility(v)}
              >
                <SelectTrigger className="w-full">
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Send Date</label>
            <Input
              placeholder="e.g. 10 May 2026"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
            />
          </div>

          <Button
            onClick={handleSend}
            className="w-full sm:w-auto bg-[#0E5F4F] hover:bg-[#0E5F4F]/90 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Notification
          </Button>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0B1F3A]">
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 p-3 rounded-lg border"
            >
              <div className="w-8 h-8 rounded-full bg-[#F5B942]/20 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-[#F5B942]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[#0B1F3A]">
                    {n.title}
                  </p>
                  {!n.read && (
                    <Badge className="bg-[#F5B942] text-[#0B1F3A] text-[10px] px-1.5">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {n.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
