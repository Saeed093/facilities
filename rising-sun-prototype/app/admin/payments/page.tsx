"use client";

import { useState } from "react";
import {
  Wallet,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  Eye,
  Check,
  X,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { payments, paymentSummary, type Payment } from "@/data/payments";

const statusStyles: Record<Payment["status"], string> = {
  Verified: "bg-green-100 text-green-700 border-green-200",
  "Pending Verification": "bg-orange-100 text-orange-700 border-orange-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

const summaryCards = [
  {
    label: "Total Monthly Revenue",
    key: "totalMonthlyRevenue" as const,
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Verified Payments",
    key: "verifiedPayments" as const,
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Pending Dues",
    key: "pendingDues" as const,
    icon: Clock,
    color: "bg-orange-100 text-orange-600",
  },
  {
    label: "Awaiting Verification",
    key: "awaitingVerification" as const,
    icon: AlertTriangle,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Members With Pending Dues",
    key: "membersWithPendingDues" as const,
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
];

export default function PaymentsPage() {
  const [paymentList, setPaymentList] = useState<Payment[]>(payments);
  const [proofTarget, setProofTarget] = useState<Payment | null>(null);

  function handleVerify(id: string) {
    setPaymentList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Verified" } : p))
    );
    if (proofTarget?.id === id) setProofTarget(null);
  }

  function handleReject(id: string) {
    setPaymentList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
    );
    if (proofTarget?.id === id) setProofTarget(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Payments</h1>
        <p className="text-sm text-muted-foreground">Financial management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {summaryCards.map((card) => (
          <Card key={card.key} className="shadow-sm">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${card.color}`}
              >
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-lg font-bold text-[#0B1F3A] leading-tight">
                {paymentSummary[card.key]}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {card.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Member Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentList.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell className="font-medium">
                      {p.memberName}
                    </TableCell>
                    <TableCell>{p.amount}</TableCell>
                    <TableCell>{p.method}</TableCell>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusStyles[p.status]}
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => setProofTarget(p)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View Proof
                        </Button>
                        {p.status === "Pending Verification" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleVerify(p.id)}
                            >
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Verify
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleReject(p.id)}
                            >
                              <X className="w-3.5 h-3.5 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Proof Dialog */}
      <Dialog
        open={!!proofTarget}
        onOpenChange={(open) => !open && setProofTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <DialogDescription>
              Review the payment details and proof submitted by the member.
            </DialogDescription>
          </DialogHeader>

          {proofTarget && (
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Name</span>
                  <span className="font-medium text-[#0B1F3A]">
                    {proofTarget.memberName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium text-[#0B1F3A]">
                    {proofTarget.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium text-[#0B1F3A]">
                    {proofTarget.method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction Ref</span>
                  <span className="font-mono font-medium text-[#0B1F3A]">
                    {proofTarget.transactionRef}
                  </span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl h-48 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-sm">Payment Proof Image</span>
              </div>

              {proofTarget.status === "Pending Verification" && (
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleReject(proofTarget.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    className="bg-[#0E5F4F] hover:bg-[#0E5F4F]/90 text-white"
                    onClick={() => handleVerify(proofTarget.id)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Verify
                  </Button>
                </DialogFooter>
              )}

              {proofTarget.status !== "Pending Verification" && (
                <DialogFooter>
                  <Badge
                    variant="outline"
                    className={`text-sm px-3 py-1 ${statusStyles[proofTarget.status]}`}
                  >
                    {proofTarget.status}
                  </Badge>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
