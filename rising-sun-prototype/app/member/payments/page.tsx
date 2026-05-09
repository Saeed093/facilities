"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Wallet,
  CalendarClock,
  Clock,
  CreditCard,
  Upload,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { payments } from "@/data/payments";

const memberPayments = payments.filter((p) => p.memberId === "RS-MEM-0245");

const summaryCards = [
  {
    label: "Current Dues",
    value: "PKR 12,000",
    icon: Wallet,
    color: "text-[#0B1F3A]",
    bg: "bg-[#0B1F3A]/5",
  },
  {
    label: "Due Date",
    value: "10 June 2026",
    icon: CalendarClock,
    color: "text-[#0E5F4F]",
    bg: "bg-[#0E5F4F]/5",
  },
  {
    label: "Payment Status",
    value: "Pending",
    icon: Clock,
    color: "text-orange-600",
    bg: "bg-orange-50",
    badge: true,
  },
  {
    label: "Last Payment",
    value: "PKR 12,000",
    icon: CreditCard,
    color: "text-[#0B1F3A]",
    bg: "bg-[#0B1F3A]/5",
  },
];

function statusBadgeClass(status: string) {
  switch (status) {
    case "Verified":
      return "bg-emerald-100 text-emerald-700";
    case "Pending Verification":
      return "bg-orange-100 text-orange-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function PaymentsPage() {
  const historyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0B1F3A] text-white px-4 pt-12 pb-5">
        <h1 className="text-lg font-semibold">Payments & Dues</h1>
        <p className="text-xs text-white/60 mt-0.5">
          View your dues, upload proofs, and track history
        </p>
      </div>

      <div className="flex-1 px-4 py-5 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          {summaryCards.map((item) => (
            <Card key={item.label} className="shadow-none border-0 ring-0">
              <CardContent className="p-3.5">
                <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center mb-2.5`}>
                  <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
                </div>
                <p className="text-[11px] text-gray-500 mb-0.5">{item.label}</p>
                {item.badge ? (
                  <Badge className="bg-orange-100 text-orange-700 border-0 text-xs font-semibold px-2 py-0.5">
                    {item.value}
                  </Badge>
                ) : (
                  <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link href="/member/payment-proof" className="flex-1">
            <Button className="w-full h-11 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white text-xs font-semibold rounded-xl gap-2">
              <Upload className="w-4 h-4" />
              Upload Payment Proof
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex-1 h-11 text-xs font-semibold rounded-xl gap-2 border-[#0B1F3A]/20 text-[#0B1F3A]"
            onClick={() =>
              historyRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ChevronDown className="w-4 h-4" />
            View Full History
          </Button>
        </div>

        {/* Payment History */}
        <div ref={historyRef}>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
            Payment History
          </h2>
          <div className="space-y-3">
            {memberPayments.map((payment) => (
              <Card key={payment.id} className="shadow-none border-0 ring-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-[#0B1F3A]">
                        {payment.amount}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {payment.date}
                      </p>
                    </div>
                    <Badge className={`border-0 text-[10px] font-semibold ${statusBadgeClass(payment.status)}`}>
                      {payment.status === "Verified" && (
                        <CheckCircle2 className="w-3 h-3 mr-0.5" />
                      )}
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      {payment.method}
                    </span>
                    <span>Ref: {payment.transactionRef}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
