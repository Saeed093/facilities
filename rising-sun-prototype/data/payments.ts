export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: string;
  method: string;
  date: string;
  transactionRef: string;
  status: "Verified" | "Pending Verification" | "Rejected";
}

export const payments: Payment[] = [
  { id: "RS-PAY-7001", memberId: "RS-MEM-0245", memberName: "Ali Khan", amount: "PKR 12,000", method: "Bank Transfer", date: "01 May 2026", transactionRef: "TXN-99821", status: "Verified" },
  { id: "RS-PAY-7002", memberId: "RS-MEM-0245", memberName: "Ali Khan", amount: "PKR 12,000", method: "Cash", date: "01 Apr 2026", transactionRef: "TXN-98734", status: "Verified" },
  { id: "RS-PAY-7003", memberId: "RS-MEM-0245", memberName: "Ali Khan", amount: "PKR 12,000", method: "EasyPaisa", date: "01 Mar 2026", transactionRef: "TXN-97650", status: "Verified" },
  { id: "RS-PAY-7004", memberId: "RS-MEM-0246", memberName: "Sara Ahmed", amount: "PKR 8,000", method: "JazzCash", date: "01 May 2026", transactionRef: "TXN-99822", status: "Verified" },
  { id: "RS-PAY-7005", memberId: "RS-MEM-0247", memberName: "Hamza Malik", amount: "PKR 15,000", method: "Bank Transfer", date: "01 May 2026", transactionRef: "TXN-99823", status: "Pending Verification" },
  { id: "RS-PAY-7006", memberId: "RS-MEM-0248", memberName: "Ayesha Noor", amount: "PKR 18,000", method: "Bank Transfer", date: "30 Apr 2026", transactionRef: "TXN-99500", status: "Verified" },
  { id: "RS-PAY-7007", memberId: "RS-MEM-0250", memberName: "Fatima Sheikh", amount: "PKR 12,000", method: "EasyPaisa", date: "02 May 2026", transactionRef: "TXN-99830", status: "Pending Verification" },
  { id: "RS-PAY-7008", memberId: "RS-MEM-0252", memberName: "Hira Iqbal", amount: "PKR 25,000", method: "Bank Transfer", date: "15 Apr 2026", transactionRef: "TXN-99100", status: "Verified" },
  { id: "RS-PAY-7009", memberId: "RS-MEM-0253", memberName: "Danish Ali", amount: "PKR 8,000", method: "Cash at Counter", date: "01 May 2026", transactionRef: "TXN-99840", status: "Pending Verification" },
  { id: "RS-PAY-7010", memberId: "RS-MEM-0254", memberName: "Zainab Khan", amount: "PKR 5,000", method: "JazzCash", date: "03 May 2026", transactionRef: "TXN-99850", status: "Verified" },
];

export const paymentSummary = {
  totalMonthlyRevenue: "PKR 4,850,000",
  verifiedPayments: "PKR 4,230,000",
  pendingDues: "PKR 620,000",
  awaitingVerification: 27,
  membersWithPendingDues: 52,
};
