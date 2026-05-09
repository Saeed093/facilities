"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const durationOptions = ["1 Month", "3 Months", "6 Months", "1 Year"];

export default function SettingsPage() {
  const [clubName, setClubName] = useState("Rising Sun Sports Club");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const [defaultDuration, setDefaultDuration] = useState("1 Month");
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [gracePeriod, setGracePeriod] = useState("7 days");

  const [maxBookings, setMaxBookings] = useState("3");
  const [advanceBooking, setAdvanceBooking] = useState("7");
  const [cancellationPeriod, setCancellationPeriod] = useState("24 hours");

  const [currency, setCurrency] = useState("PKR");
  const [dueDate, setDueDate] = useState("10th of every month");
  const [lateFee, setLateFee] = useState("PKR 500");

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [dueReminders, setDueReminders] = useState(true);

  function handleSave() {
    toast("Settings saved successfully");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Settings</h1>
        <p className="text-sm text-muted-foreground">System configuration</p>
      </div>

      {/* Club Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0B1F3A]">Club Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Club Name</label>
            <Input
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Textarea
              placeholder="Enter club address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact</label>
            <Input
              placeholder="Phone or email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Membership Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0B1F3A]">
            Membership Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Duration</label>
            <Select
              value={defaultDuration}
              onValueChange={(v) => v && setDefaultDuration(v)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="auto-renewal"
              checked={autoRenewal}
              onChange={(e) => setAutoRenewal(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0E5F4F] focus:ring-[#0E5F4F]"
            />
            <label htmlFor="auto-renewal" className="text-sm font-medium">
              Auto-Renewal
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Grace Period</label>
            <Input
              value={gracePeriod}
              onChange={(e) => setGracePeriod(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0B1F3A]">
            Booking Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Max Bookings Per Day
              </label>
              <Input
                value={maxBookings}
                onChange={(e) => setMaxBookings(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Advance Booking Days
              </label>
              <Input
                value={advanceBooking}
                onChange={(e) => setAdvanceBooking(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Cancellation Period
              </label>
              <Input
                value={cancellationPeriod}
                onChange={(e) => setCancellationPeriod(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0B1F3A]">
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Input
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Late Fee</label>
              <Input
                value={lateFee}
                onChange={(e) => setLateFee(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0B1F3A]">
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="email-notifs"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0E5F4F] focus:ring-[#0E5F4F]"
            />
            <label htmlFor="email-notifs" className="text-sm font-medium">
              Email Notifications
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="sms-notifs"
              checked={smsNotifs}
              onChange={(e) => setSmsNotifs(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0E5F4F] focus:ring-[#0E5F4F]"
            />
            <label htmlFor="sms-notifs" className="text-sm font-medium">
              SMS Notifications
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="due-reminders"
              checked={dueReminders}
              onChange={(e) => setDueReminders(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0E5F4F] focus:ring-[#0E5F4F]"
            />
            <label htmlFor="due-reminders" className="text-sm font-medium">
              Due Reminders
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#0E5F4F] hover:bg-[#0E5F4F]/90 text-white px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
