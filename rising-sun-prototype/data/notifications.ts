export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const notifications: Notification[] = [
  { id: "n1", title: "Booking Confirmed", message: "Your tennis court booking is confirmed for 6 PM.", date: "08 May 2026", read: false },
  { id: "n2", title: "Payment Verified", message: "Your payment of PKR 12,000 has been verified.", date: "07 May 2026", read: false },
  { id: "n3", title: "Dues Reminder", message: "Your monthly dues are due on 10 June.", date: "06 May 2026", read: true },
  { id: "n4", title: "Facility Notice", message: "Swimming pool will remain closed on Friday for maintenance.", date: "05 May 2026", read: true },
  { id: "n5", title: "New Classes Available", message: "Tennis coaching slots are now available. Book yours today!", date: "04 May 2026", read: true },
  { id: "n6", title: "Membership Renewal", message: "Your membership expires on 30 June 2026. Renew early for discount.", date: "03 May 2026", read: true },
];

export const adminNotificationTargets = [
  "All Members",
  "Active Members",
  "Members with Pending Dues",
  "Gym Members",
  "Pool Members",
  "Tennis Members",
];
