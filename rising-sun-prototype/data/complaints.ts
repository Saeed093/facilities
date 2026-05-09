export interface Complaint {
  id: string;
  memberId: string;
  memberName: string;
  type: string;
  facility: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  date: string;
}

export const complaints: Complaint[] = [
  { id: "RS-CMP-001", memberId: "RS-MEM-0245", memberName: "Ali Khan", type: "Facility Issue", facility: "Gym", subject: "Broken Treadmill", description: "The treadmill #5 has been out of order for two weeks. Please fix it.", status: "Open", date: "06 May 2026" },
  { id: "RS-CMP-002", memberId: "RS-MEM-0246", memberName: "Sara Ahmed", type: "Booking Issue", facility: "Tennis Court", subject: "Double Booking", description: "My booking for Tennis Court at 4 PM was given to someone else.", status: "In Progress", date: "05 May 2026" },
  { id: "RS-CMP-003", memberId: "RS-MEM-0248", memberName: "Ayesha Noor", type: "Staff Issue", facility: "Swimming Pool", subject: "Staff Behavior", description: "The pool attendant was very rude when asked about timing changes.", status: "Open", date: "07 May 2026" },
  { id: "RS-CMP-004", memberId: "RS-MEM-0253", memberName: "Danish Ali", type: "Payment Issue", facility: "N/A", subject: "Payment Not Reflected", description: "I paid my dues on 1st May but the system still shows pending.", status: "Resolved", date: "03 May 2026" },
  { id: "RS-CMP-005", memberId: "RS-MEM-0250", memberName: "Fatima Sheikh", type: "General Feedback", facility: "Fitness Studio", subject: "Need More Yoga Classes", description: "Please add more yoga class timings, especially in the evening.", status: "Closed", date: "01 May 2026" },
  { id: "RS-CMP-006", memberId: "RS-MEM-0252", memberName: "Hira Iqbal", type: "Facility Issue", facility: "Swimming Pool", subject: "Water Temperature", description: "Pool water was too cold this morning. Please check the heating system.", status: "Open", date: "08 May 2026" },
];
