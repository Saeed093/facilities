export interface Application {
  id: string;
  name: string;
  phone: string;
  email: string;
  cnic: string;
  membershipType: string;
  facilityAccess: string[];
  submittedDate: string;
  status: "Pending Review" | "Approved" | "Rejected" | "Need More Information";
  emergencyContact: string;
  address: string;
}

export const applications: Application[] = [
  { id: "RS-APP-1001", name: "Ahmed Raza", phone: "+92 300 1112233", email: "ahmed.raza@email.com", cnic: "35210-1234567-1", membershipType: "Individual Monthly", facilityAccess: ["Gym", "Swimming Pool"], submittedDate: "06 May 2026", status: "Pending Review", emergencyContact: "+92 312 9998877", address: "House 5, G-10, Islamabad" },
  { id: "RS-APP-1002", name: "Sana Tariq", phone: "+92 321 4445566", email: "sana.tariq@email.com", cnic: "35211-7654321-2", membershipType: "Full Access Monthly", facilityAccess: ["Gym", "Swimming Pool", "Tennis Court", "Badminton Court", "Fitness Studio"], submittedDate: "07 May 2026", status: "Pending Review", emergencyContact: "+92 333 1122334", address: "Flat 12, F-6, Islamabad" },
  { id: "RS-APP-1003", name: "Faisal Mehmood", phone: "+92 345 6667788", email: "faisal.m@email.com", cnic: "35212-9988776-5", membershipType: "Family Monthly", facilityAccess: ["Gym", "Swimming Pool", "Fitness Studio"], submittedDate: "07 May 2026", status: "Pending Review", emergencyContact: "+92 300 5544332", address: "House 89, DHA Phase 1, Rawalpindi" },
  { id: "RS-APP-1004", name: "Nadia Ashraf", phone: "+92 312 7778899", email: "nadia.a@email.com", cnic: "35213-5566778-8", membershipType: "Student", facilityAccess: ["Gym"], submittedDate: "05 May 2026", status: "Approved", emergencyContact: "+92 321 6677889", address: "Hostel 3, NUST, Islamabad" },
  { id: "RS-APP-1005", name: "Kamran Shah", phone: "+92 333 8889900", email: "kamran.shah@email.com", cnic: "35214-4433221-1", membershipType: "Individual Annual", facilityAccess: ["Gym", "Tennis Court"], submittedDate: "04 May 2026", status: "Rejected", emergencyContact: "+92 345 3322110", address: "House 67, Chaklala Scheme, Rawalpindi" },
  { id: "RS-APP-1006", name: "Rabia Nawaz", phone: "+92 300 2223344", email: "rabia.n@email.com", cnic: "35215-7788990-0", membershipType: "Individual Monthly", facilityAccess: ["Gym", "Fitness Studio"], submittedDate: "08 May 2026", status: "Pending Review", emergencyContact: "+92 312 4455667", address: "Flat 7, Blue Area, Islamabad" },
  { id: "RS-APP-1007", name: "Imran Siddiqui", phone: "+92 321 5556677", email: "imran.s@email.com", cnic: "35216-6655443-3", membershipType: "Full Access Monthly", facilityAccess: ["Gym", "Swimming Pool", "Tennis Court", "Badminton Court", "Fitness Studio"], submittedDate: "08 May 2026", status: "Need More Information", emergencyContact: "+92 333 7788990", address: "House 23, I-10, Islamabad" },
];
