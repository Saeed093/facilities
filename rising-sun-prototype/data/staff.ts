export interface Staff {
  name: string;
  email: string;
  role: string;
  access: string;
  status: "Active" | "Inactive";
  lastLogin: string;
}

export const staff: Staff[] = [
  { name: "Col. Rashid Mehmood", email: "rashid.m@risingsun.pk", role: "Super Admin", access: "Full system access", status: "Active", lastLogin: "08 May 2026, 9:00 AM" },
  { name: "Maj. Asif Iqbal", email: "asif.i@risingsun.pk", role: "Finance Admin", access: "Payments, dues, reports", status: "Active", lastLogin: "08 May 2026, 10:30 AM" },
  { name: "Naik Farhan", email: "farhan@risingsun.pk", role: "Reception Staff", access: "Check-in, member search", status: "Active", lastLogin: "08 May 2026, 6:00 AM" },
  { name: "Capt. Tariq Nawaz", email: "tariq.n@risingsun.pk", role: "Facility Manager", access: "Facilities and bookings", status: "Active", lastLogin: "07 May 2026, 4:00 PM" },
  { name: "Hav. Nadeem", email: "nadeem@risingsun.pk", role: "Support Staff", access: "Complaints and notifications", status: "Active", lastLogin: "08 May 2026, 8:00 AM" },
];
