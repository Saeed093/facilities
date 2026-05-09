"use client";

import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/data/notifications";

export default function NotificationsPage() {
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
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h1 className="text-lg font-semibold">Notifications</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`shadow-none border-0 ring-0 ${!n.read ? "bg-blue-50/50" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Unread indicator */}
                <div className="pt-1.5 shrink-0">
                  {!n.read ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-transparent" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      className={`text-sm ${!n.read ? "font-bold text-[#0B1F3A]" : "font-semibold text-[#0B1F3A]/80"}`}
                    >
                      {n.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-gray-400">{n.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
