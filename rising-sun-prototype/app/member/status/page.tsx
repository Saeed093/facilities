"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, CircleDot, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timelineSteps = [
  {
    title: "Application Submitted",
    description: "Your application has been received",
    date: "08 May 2026, 10:30 AM",
    status: "completed" as const,
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    lineColor: "bg-emerald-400",
  },
  {
    title: "Under Review",
    description: "Application is being reviewed by admin",
    date: "In progress",
    status: "current" as const,
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    lineColor: "bg-orange-400",
  },
  {
    title: "Approved / Rejected",
    description: "Awaiting decision",
    date: "",
    status: "pending" as const,
    icon: CircleDot,
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    lineColor: "bg-gray-200",
  },
  {
    title: "Membership Activated",
    description: "Your membership will be activated",
    date: "",
    status: "pending" as const,
    icon: Lock,
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    lineColor: "bg-gray-200",
  },
];

export default function ApplicationStatus() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <Link
          href="/member/home"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#0B1F3A]" />
        </Link>
        <h1 className="text-lg font-bold text-[#0B1F3A]">
          Application Status
        </h1>
      </div>

      <div className="px-4 space-y-5">
        {/* Status Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Application ID</p>
                <p className="text-sm font-bold text-[#0B1F3A]">
                  RS-APP-1024
                </p>
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-0 text-xs px-3 py-1">
                Pending Review
              </Badge>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Submitted On</p>
                <p className="text-sm font-medium text-[#0B1F3A]">
                  08 May 2026
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Type</p>
                <p className="text-sm font-medium text-[#0B1F3A]">
                  Individual Monthly
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-4">
            Application Progress
          </h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="space-y-0">
                {timelineSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === timelineSteps.length - 1;

                  return (
                    <div key={step.title} className="flex gap-4">
                      {/* Dot & Line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full ${step.bgColor} flex items-center justify-center shrink-0`}
                        >
                          <Icon className={`w-4.5 h-4.5 ${step.color}`} />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 flex-1 min-h-[40px] ${step.lineColor}`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                        <p
                          className={`text-sm font-semibold ${
                            step.status === "pending"
                              ? "text-gray-400"
                              : "text-[#0B1F3A]"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {step.description}
                        </p>
                        {step.date && (
                          <p
                            className={`text-[11px] mt-1 ${
                              step.status === "current"
                                ? "text-orange-600 font-medium"
                                : "text-gray-400"
                            }`}
                          >
                            {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Note */}
        <Card className="border-0 shadow-sm bg-[#0B1F3A]/5">
          <CardContent className="p-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              Applications are typically reviewed within 2-3 business days. You
              will receive a notification once your application status is
              updated.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
