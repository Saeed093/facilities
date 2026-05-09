"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const paymentMethods = [
  "Bank Transfer",
  "JazzCash",
  "EasyPaisa",
  "Cash at Counter",
];

export default function PaymentProofPage() {
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success(
      "Payment proof submitted. Admin will verify and update your dues status."
    );
    setMethod("");
    setAmount("");
    setReference("");
    setDate("");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0B1F3A] text-white px-4 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/member/payments"
            className="p-1 -ml-1 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold">Upload Payment Proof</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Payment Method */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Payment Method
            </label>
            <Select value={method} onValueChange={(v) => v && setMethod(v)}>
              <SelectTrigger className="w-full h-11 bg-white text-sm">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Paid */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Amount Paid (PKR)
            </label>
            <Input
              type="number"
              placeholder="e.g. 12000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-11 bg-white text-sm"
            />
          </div>

          {/* Transaction Reference */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Transaction Reference
            </label>
            <Input
              type="text"
              placeholder="e.g. TXN-20260508-001"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="h-11 bg-white text-sm"
            />
          </div>

          {/* Payment Date */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Payment Date
            </label>
            <Input
              type="text"
              placeholder="DD/MM/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 bg-white text-sm"
            />
          </div>

          {/* Upload Screenshot */}
          <div>
            <label className="text-sm font-medium text-[#0B1F3A] mb-2 block">
              Upload Screenshot
            </label>
            <Card className="shadow-none border-2 border-dashed border-gray-300 ring-0">
              <CardContent className="p-8 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0B1F3A]/5 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-[#0B1F3A]/40" />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Tap to upload payment screenshot
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white text-sm font-semibold rounded-xl"
          >
            Submit Payment Proof
          </Button>
        </form>
      </div>
    </div>
  );
}
