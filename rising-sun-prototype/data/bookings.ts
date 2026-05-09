export interface Booking {
  id: string;
  memberId: string;
  memberName: string;
  facility: string;
  date: string;
  timeSlot: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed" | "No-Show";
}

export const bookings: Booking[] = [
  { id: "RS-BKG-5001", memberId: "RS-MEM-0245", memberName: "Ali Khan", facility: "Tennis Court", date: "08 May 2026", timeSlot: "6:00 PM – 7:00 PM", status: "Confirmed" },
  { id: "RS-BKG-5002", memberId: "RS-MEM-0246", memberName: "Sara Ahmed", facility: "Gym", date: "08 May 2026", timeSlot: "9:00 AM – 10:00 AM", status: "Completed" },
  { id: "RS-BKG-5003", memberId: "RS-MEM-0248", memberName: "Ayesha Noor", facility: "Swimming Pool", date: "08 May 2026", timeSlot: "10:00 AM – 11:00 AM", status: "Confirmed" },
  { id: "RS-BKG-5004", memberId: "RS-MEM-0247", memberName: "Hamza Malik", facility: "Gym", date: "09 May 2026", timeSlot: "7:00 PM – 8:00 PM", status: "Confirmed" },
  { id: "RS-BKG-5005", memberId: "RS-MEM-0253", memberName: "Danish Ali", facility: "Badminton Court", date: "09 May 2026", timeSlot: "8:00 PM – 9:00 PM", status: "Confirmed" },
  { id: "RS-BKG-5006", memberId: "RS-MEM-0250", memberName: "Fatima Sheikh", facility: "Fitness Studio", date: "09 May 2026", timeSlot: "7:00 AM – 8:00 AM", status: "Confirmed" },
  { id: "RS-BKG-5007", memberId: "RS-MEM-0252", memberName: "Hira Iqbal", facility: "Swimming Pool", date: "10 May 2026", timeSlot: "8:00 AM – 9:00 AM", status: "Pending" },
  { id: "RS-BKG-5008", memberId: "RS-MEM-0254", memberName: "Zainab Khan", facility: "Gym", date: "07 May 2026", timeSlot: "2:00 PM – 3:00 PM", status: "Completed" },
  { id: "RS-BKG-5009", memberId: "RS-MEM-0245", memberName: "Ali Khan", facility: "Swimming Pool", date: "05 May 2026", timeSlot: "6:00 PM – 7:00 PM", status: "Completed" },
  { id: "RS-BKG-5010", memberId: "RS-MEM-0249", memberName: "Bilal Hussain", facility: "Tennis Court", date: "06 May 2026", timeSlot: "4:00 PM – 5:00 PM", status: "Cancelled" },
  { id: "RS-BKG-5011", memberId: "RS-MEM-0251", memberName: "Usman Tariq", facility: "Gym", date: "04 May 2026", timeSlot: "3:00 PM – 4:00 PM", status: "No-Show" },
  { id: "RS-BKG-5012", memberId: "RS-MEM-0248", memberName: "Ayesha Noor", facility: "Tennis Court", date: "10 May 2026", timeSlot: "5:00 PM – 6:00 PM", status: "Confirmed" },
];

export interface TimeSlot {
  time: string;
  status: "Available" | "Full" | "Selected";
}

export const timeSlots: TimeSlot[] = [
  { time: "6:00 AM – 7:00 AM", status: "Available" },
  { time: "7:00 AM – 8:00 AM", status: "Available" },
  { time: "8:00 AM – 9:00 AM", status: "Full" },
  { time: "9:00 AM – 10:00 AM", status: "Available" },
  { time: "10:00 AM – 11:00 AM", status: "Full" },
  { time: "11:00 AM – 12:00 PM", status: "Available" },
  { time: "12:00 PM – 1:00 PM", status: "Available" },
  { time: "1:00 PM – 2:00 PM", status: "Available" },
  { time: "2:00 PM – 3:00 PM", status: "Full" },
  { time: "3:00 PM – 4:00 PM", status: "Available" },
  { time: "4:00 PM – 5:00 PM", status: "Available" },
  { time: "5:00 PM – 6:00 PM", status: "Full" },
  { time: "6:00 PM – 7:00 PM", status: "Available" },
  { time: "7:00 PM – 8:00 PM", status: "Available" },
  { time: "8:00 PM – 9:00 PM", status: "Available" },
  { time: "9:00 PM – 10:00 PM", status: "Available" },
];
