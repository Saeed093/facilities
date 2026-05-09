# Rising Sun Sports Facilities Management System
# Frontend Prototype Build Brief

## Purpose of This Document

This document is made for building frontend-only demo prototypes for the Rising Sun Sports Facilities Management System.

The purpose is not to build the final working system at this stage. The purpose is to create a clean, professional, clickable, and presentable frontend demo that can be shown to the client.

The prototype should show how the final system will look and feel from both sides:

1. Member App Side
2. Admin Dashboard Side

There will be no real backend, no real database, no real payment gateway, and no actual booking logic in this prototype. All data will be dummy/mock data.

The prototype should be good enough to explain the complete idea to the client and help them understand the flow of the system.

---

# 1. Project Name

**Rising Sun Sports Facilities Management System**

---

# 2. Prototype Scope

The prototype will include two separate frontend interfaces:

## A. Member App Prototype

This will show the user/member side of the system. It can be built as a mobile-first web app or React/Next.js responsive frontend that looks like a mobile application.

The member app will show how a person can:

- Register
- Login
- Submit membership application
- View application status
- View digital membership ID
- View sports facilities
- Book time slots
- View bookings
- View dues
- Upload payment proof screen
- View payment history
- Receive notifications
- Submit complaint or feedback
- Manage profile

## B. Admin Dashboard Prototype

This will show the management side of the system. It should be built as a web dashboard.

The admin dashboard will show how Rising Sun staff can:

- Login to dashboard
- View main dashboard summary
- View pending member applications
- Approve/reject applications visually
- View all members
- View member details
- Manage facilities
- Manage bookings
- View payments and dues
- Verify uploaded payment proof screen
- View reports
- View complaints
- Manage notifications
- View staff roles

---

# 3. Important Instruction

This is a frontend-only prototype.

Do not build backend APIs.
Do not connect to real database.
Do not integrate real payment gateway.
Do not build real authentication.
Do not build real QR scanning.
Do not build real push notifications.
Do not build complex booking conflict logic.

Use static mock data and local frontend states only.

Example:

- When user clicks login, move to dashboard/home screen.
- When user clicks submit application, show success screen.
- When admin clicks approve, update status locally or show approved badge.
- When user clicks book slot, show booking confirmation modal.
- When admin clicks verify payment, show status changed to paid.

The goal is to show the user journey and system concept, not to complete the production system.

---

# 4. Recommended Frontend Stack

## Option 1: Best for Fast Prototype

Use:

- React.js or Next.js
- Tailwind CSS
- ShadCN UI components
- Lucide React icons
- Recharts for charts
- Static JSON/mock data

## Option 2: Mobile App Look

Use:

- React.js or Next.js
- Mobile-width layout for member app
- Desktop layout for admin dashboard

## Recommended Final Choice

Use **Next.js + Tailwind CSS + ShadCN UI + Lucide Icons + Recharts**.

This will give a modern, professional, and clean demo quickly.

---

# 5. Design Direction

The design should look professional, clean, and slightly premium because this is for a sports facility/club environment.

## Visual Style

- Clean white background
- Dark navy or deep green accents
- Gold/yellow accent for Rising Sun branding
- Rounded cards
- Clear buttons
- Soft shadows
- Modern dashboard layout
- Simple and readable typography

## Suggested Colors

| Purpose | Color Suggestion |
|---|---|
| Primary | Deep Navy `#0B1F3A` |
| Secondary | Deep Green `#0E5F4F` |
| Accent | Sunrise Gold `#F5B942` |
| Background | Off White `#F8FAFC` |
| Success | Green `#16A34A` |
| Warning | Orange `#F97316` |
| Danger | Red `#DC2626` |
| Text | Dark Gray `#111827` |

## Typography

Use a clean font such as:

- Inter
- Poppins
- Roboto

Recommended: **Inter**

---

# 6. General Prototype Requirements

The prototype should include:

- Responsive design
- Dummy data
- Clean navigation
- Clickable buttons
- Basic modals
- Status badges
- Tables
- Cards
- Calendar-style booking view
- Dashboard charts
- Placeholder QR code
- Mock member images
- Mock payment proof image area
- Empty state screens where needed
- Loading placeholder if required

---

# 7. Member App Prototype Details

The member app should be designed in a mobile-first layout. It can be displayed inside a phone-like frame on desktop or can simply be responsive.

## Member App Main Navigation

Suggested bottom navigation:

| Tab | Purpose |
|---|---|
| Home | Main user overview |
| Facilities | View and book facilities |
| Bookings | Upcoming and past bookings |
| Payments | Dues and payment history |
| Profile | User profile and settings |

---

## 7.1 Splash Screen

### Purpose

Show Rising Sun branding when app opens.

### UI Elements

- Rising Sun logo placeholder
- App name: Rising Sun
- Subtitle: Sports Facilities Management
- Loading animation or simple progress indicator

### Text Example

**Rising Sun**

Sports Facilities Management System

---

## 7.2 Login Screen

### Purpose

Show how members will login.

### Fields

- Phone number or email
- Password

### Buttons

- Login
- Create Account
- Forgot Password

### Demo Behavior

Clicking Login should take the user to the Home screen.

No real authentication is required.

---

## 7.3 Registration Screen

### Purpose

Show how a new user creates an account.

### Fields

| Field | Type |
|---|---|
| Full Name | Text |
| Mobile Number | Text |
| Email | Text |
| CNIC / ID Number | Text |
| Date of Birth | Date |
| Address | Text Area |
| Password | Password |
| Confirm Password | Password |

### Buttons

- Create Account
- Already have an account? Login

### Demo Behavior

Clicking Create Account should show a success message or move to Membership Application screen.

---

## 7.4 Membership Application Screen

### Purpose

Allow a new user to apply for membership.

### Sections

1. Personal Information
2. Membership Type
3. Facility Access Required
4. Document Upload Placeholder
5. Emergency Contact
6. Terms Confirmation

### Membership Types

| Type | Description |
|---|---|
| Individual Monthly | One person monthly access |
| Individual Annual | One person yearly access |
| Family Monthly | Family-based monthly access |
| Family Annual | Family-based yearly access |
| Student | Discounted/student membership |

### Facility Access Options

Checkboxes:

- Gym
- Swimming Pool
- Tennis Court
- Badminton Court
- Fitness Classes
- Full Access

### Buttons

- Submit Application
- Save as Draft

### Demo Behavior

Clicking Submit Application should show:

> Your application has been submitted successfully. Current status: Pending Approval.

---

## 7.5 Application Status Screen

### Purpose

Show the user where their application currently stands.

### Status Card

Show one of these statuses:

| Status | Badge Color |
|---|---|
| Pending Review | Orange |
| Approved | Green |
| Rejected | Red |
| Need More Information | Yellow |

### Example UI

Application ID: RS-APP-1024  
Submitted On: 08 May 2026  
Status: Pending Review

### Timeline Component

Show steps:

1. Application Submitted
2. Under Review
3. Approved / Rejected
4. Membership Activated

---

## 7.6 Member Home Screen

### Purpose

Show the main overview after login.

### Cards to Show

| Card | Example Value |
|---|---|
| Membership Status | Active |
| Membership ID | RS-MEM-0245 |
| Dues Status | Paid |
| Next Due Date | 01 June 2026 |
| Upcoming Booking | Tennis Court, 6:00 PM |
| Facilities Available | 5 |

### Quick Actions

- Book Facility
- Pay Dues
- View ID Card
- Submit Complaint

### Announcements Section

Example:

- Swimming pool will be closed on Friday for maintenance.
- Tennis coaching slots are now available.
- Monthly dues deadline is 10th of every month.

---

## 7.7 Digital Membership ID Screen

### Purpose

Show the user’s digital membership card.

### Card Details

| Field | Example |
|---|---|
| Name | Ali Khan |
| Membership ID | RS-MEM-0245 |
| Type | Full Access Monthly |
| Status | Active |
| Valid Until | 30 June 2026 |

### UI Elements

- User profile photo placeholder
- QR code placeholder
- Active badge
- Facility access list

### Demo Behavior

QR code is only visual. No real scanning needed.

---

## 7.8 Facilities List Screen

### Purpose

Show all available facilities.

### Facility Cards

Each facility card should show:

- Facility image placeholder
- Facility name
- Opening hours
- Capacity
- Current status
- Book Now button

### Example Facilities

| Facility | Timing | Status |
|---|---|---|
| Gym | 6 AM – 11 PM | Open |
| Swimming Pool | 7 AM – 10 PM | Open |
| Tennis Court | 6 AM – 10 PM | Available |
| Badminton Court | 8 AM – 10 PM | Available |
| Fitness Studio | 7 AM – 9 PM | Class Based |

---

## 7.9 Facility Detail Screen

### Purpose

Show details of a selected facility.

### Sections

- Facility name
- Image/banner
- Description
- Rules
- Timings
- Available slots
- Booking button

### Example Rules

For Swimming Pool:

- Swimming cap is required.
- Shower before entering the pool.
- Children must be accompanied by guardian.
- Booking is required before entry.

---

## 7.10 Booking Screen

### Purpose

Allow user to select a date and time slot.

### UI Elements

- Date selector
- Facility selector
- Time slot grid
- Available/unavailable badges
- Confirm booking button

### Time Slot Example

| Time | Status |
|---|---|
| 6:00 PM – 7:00 PM | Available |
| 7:00 PM – 8:00 PM | Full |
| 8:00 PM – 9:00 PM | Available |

### Demo Behavior

Clicking an available slot should select it.
Clicking Confirm Booking should show a booking confirmation modal.

### Confirmation Modal Text

Booking Confirmed

Facility: Tennis Court  
Date: 08 May 2026  
Time: 6:00 PM – 7:00 PM

---

## 7.11 My Bookings Screen

### Purpose

Show upcoming and previous bookings.

### Tabs

- Upcoming
- Completed
- Cancelled

### Booking Card Details

| Field | Example |
|---|---|
| Facility | Tennis Court |
| Date | 08 May 2026 |
| Time | 6:00 PM – 7:00 PM |
| Status | Confirmed |

### Actions

- Cancel Booking
- Reschedule
- View Details

### Demo Behavior

Cancel and reschedule can show modal only.

---

## 7.12 Payments / Dues Screen

### Purpose

Show user payment dues and payment history.

### Summary Cards

| Card | Example |
|---|---|
| Current Dues | PKR 12,000 |
| Due Date | 10 June 2026 |
| Payment Status | Pending |
| Last Payment | PKR 12,000 |

### Buttons

- Upload Payment Proof
- View Payment History

---

## 7.13 Upload Payment Proof Screen

### Purpose

Show how manual payment proof will be uploaded.

### Fields

| Field | Type |
|---|---|
| Payment Method | Dropdown |
| Amount Paid | Number |
| Transaction Reference | Text |
| Payment Date | Date |
| Upload Screenshot | File upload placeholder |

### Payment Methods

- Bank Transfer
- JazzCash
- EasyPaisa
- Cash at Counter

### Demo Behavior

Clicking Submit should show:

> Payment proof submitted. Admin will verify and update your dues status.

---

## 7.14 Payment History Screen

### Purpose

Show previous payments.

### Table/List

| Date | Amount | Method | Status |
|---|---:|---|---|
| 01 May 2026 | PKR 12,000 | Bank Transfer | Verified |
| 01 April 2026 | PKR 12,000 | Cash | Verified |
| 01 March 2026 | PKR 12,000 | EasyPaisa | Verified |

---

## 7.15 Notifications Screen

### Purpose

Show system alerts.

### Notification Examples

| Title | Message |
|---|---|
| Booking Confirmed | Your tennis court booking is confirmed for 6 PM. |
| Payment Verified | Your payment of PKR 12,000 has been verified. |
| Dues Reminder | Your monthly dues are due on 10 June. |
| Facility Notice | Swimming pool will remain closed on Friday. |

---

## 7.16 Complaint / Feedback Screen

### Purpose

Allow users to submit complaints or feedback.

### Fields

| Field | Type |
|---|---|
| Complaint Type | Dropdown |
| Facility | Dropdown |
| Subject | Text |
| Description | Text Area |
| Upload Image | Optional placeholder |

### Complaint Types

- Facility Issue
- Payment Issue
- Booking Issue
- Staff Issue
- General Feedback

### Demo Behavior

Clicking Submit should show complaint submitted message.

---

## 7.17 Profile Screen

### Purpose

Show user account and membership details.

### Sections

- Profile photo
- Name
- Mobile number
- Email
- Address
- Membership type
- Membership status
- Facility access
- Logout button

---

# 8. Admin Dashboard Prototype Details

The admin dashboard should be designed for desktop/laptop use.

## Dashboard Layout

Use a modern sidebar layout.

### Sidebar Menu

| Menu Item | Purpose |
|---|---|
| Dashboard | Main summary |
| Applications | Pending membership applications |
| Members | All members |
| Facilities | Manage facilities |
| Bookings | Manage bookings |
| Payments | Dues and verification |
| Check-In | Member entry/check-in |
| Reports | Financial and usage reports |
| Complaints | User complaints |
| Notifications | Send notices |
| Staff | Admin/staff roles |
| Settings | System settings |

---

## 8.1 Admin Login Screen

### Purpose

Show admin login page.

### Fields

- Email
- Password

### Button

- Login

### Demo Behavior

Clicking Login should go to Admin Dashboard Home.

---

## 8.2 Dashboard Home Screen

### Purpose

Show high-level view of the whole system.

### Summary Cards

| Card | Value |
|---|---:|
| Total Members | 500 |
| Active Members | 430 |
| Pending Applications | 32 |
| Expired Memberships | 38 |
| Today’s Bookings | 76 |
| Today’s Check-ins | 49 |
| Monthly Revenue | PKR 4,850,000 |
| Pending Dues | PKR 620,000 |
| Open Complaints | 11 |
| Most Used Facility | Gym |

### Charts

Include simple visual charts using mock data:

1. Monthly Revenue Chart
2. Facility Usage Chart
3. Membership Status Pie Chart
4. Bookings by Facility Bar Chart

### Recent Activity Feed

Example:

- Ali Khan booked Tennis Court for 6 PM.
- Sara Ahmed payment verified by admin.
- New membership application received from Hamza Malik.
- Swimming Pool marked under maintenance for Friday.

---

## 8.3 Applications Management Screen

### Purpose

Show pending membership applications.

### Table Columns

| Column |
|---|
| Application ID |
| Name |
| Phone |
| Membership Type |
| Submitted Date |
| Status |
| Action |

### Actions

- View
- Approve
- Reject
- Request More Info

### Demo Behavior

Actions can open modal only.

---

## 8.4 Application Detail Screen / Modal

### Purpose

Allow admin to review a membership application.

### Sections

1. Personal Information
2. Contact Details
3. Membership Type
4. Facility Access Requested
5. Uploaded Documents Placeholder
6. Emergency Contact
7. Admin Decision

### Admin Decision Buttons

- Approve Application
- Reject Application
- Request More Information

### Demo Behavior

Clicking approve should show:

> Application approved successfully. Member ID generated: RS-MEM-0245.

---

## 8.5 Members Management Screen

### Purpose

Show all members in one table.

### Table Columns

| Column |
|---|
| Member ID |
| Name |
| Phone |
| Membership Type |
| Status |
| Dues Status |
| Last Check-In |
| Action |

### Filters

- Active
- Expired
- Suspended
- Dues Pending
- Full Access
- Gym Only
- Pool Only

### Actions

- View Profile
- Suspend
- Activate
- Edit

---

## 8.6 Member Detail Screen

### Purpose

Show complete profile of a member.

### Sections

| Section | Details |
|---|---|
| Personal Info | Name, phone, email, CNIC, address |
| Membership Info | Type, status, start date, expiry date |
| Facility Access | Gym, pool, tennis, etc. |
| Payment Info | Paid/pending dues |
| Booking History | Past and upcoming bookings |
| Check-In History | Facility usage records |
| Complaints | Complaints submitted by member |
| Admin Notes | Internal notes |

### Action Buttons

- Edit Member
- Suspend Member
- Renew Membership
- Mark Dues Paid
- View ID Card

---

## 8.7 Facility Management Screen

### Purpose

Allow admin to manage facilities.

### Facility Cards/Table

| Facility | Timing | Capacity | Status | Action |
|---|---|---:|---|---|
| Gym | 6 AM – 11 PM | 80 | Open | Manage |
| Swimming Pool | 7 AM – 10 PM | 40 | Open | Manage |
| Tennis Court | 6 AM – 10 PM | 4 | Available | Manage |
| Badminton Court | 8 AM – 10 PM | 8 | Available | Manage |
| Fitness Studio | 7 AM – 9 PM | 25 | Class Based | Manage |

### Actions

- Add Facility
- Edit Facility
- Mark Under Maintenance
- Change Timings
- Manage Capacity

---

## 8.8 Facility Detail / Edit Screen

### Fields

| Field | Type |
|---|---|
| Facility Name | Text |
| Description | Text Area |
| Opening Time | Time |
| Closing Time | Time |
| Capacity | Number |
| Booking Required | Toggle |
| Status | Dropdown |
| Rules | Text Area |

### Demo Behavior

Save button should show success toast.

---

## 8.9 Booking Management Screen

### Purpose

Show all facility bookings.

### Views

- Daily View
- Weekly View
- Monthly View
- Facility Wise View

### Table Columns

| Column |
|---|
| Booking ID |
| Member Name |
| Facility |
| Date |
| Time Slot |
| Status |
| Action |

### Actions

- View Booking
- Cancel Booking
- Reschedule Booking
- Mark No-Show

### Filters

- Facility
- Date
- Status
- Member

---

## 8.10 Booking Calendar Screen

### Purpose

Show bookings visually.

### UI Requirements

- Calendar layout
- Facility filter
- Colored booking blocks
- Today button
- Week/day toggle

### Example Colors

| Status | Color |
|---|---|
| Confirmed | Green |
| Pending | Orange |
| Cancelled | Red |
| Completed | Blue |

No real calendar functionality is required, but it should look realistic.

---

## 8.11 Payment Management Screen

### Purpose

Allow finance/admin staff to view dues and payments.

### Summary Cards

| Card | Value |
|---|---:|
| Total Monthly Revenue | PKR 4,850,000 |
| Verified Payments | PKR 4,230,000 |
| Pending Dues | PKR 620,000 |
| Payments Awaiting Verification | 27 |
| Members With Pending Dues | 52 |

### Table Columns

| Column |
|---|
| Payment ID |
| Member Name |
| Amount |
| Method |
| Date |
| Status |
| Action |

### Actions

- View Proof
- Verify Payment
- Reject Payment
- Mark as Paid

---

## 8.12 Payment Proof Verification Modal

### Purpose

Show how admin verifies uploaded payment proof.

### Modal Sections

| Section | Example |
|---|---|
| Member Name | Ali Khan |
| Amount | PKR 12,000 |
| Method | Bank Transfer |
| Transaction Ref | TXN-99821 |
| Uploaded Proof | Image placeholder |
| Status | Pending Verification |

### Buttons

- Verify Payment
- Reject Payment
- Close

---

## 8.13 Check-In Screen

### Purpose

Show how reception staff checks members in.

### UI Elements

- Search by name/phone/member ID
- QR scan placeholder box
- Member detail card
- Today’s booking status
- Check-In button
- Check-Out button

### Member Check-In Card

| Field | Example |
|---|---|
| Member Name | Ali Khan |
| Membership ID | RS-MEM-0245 |
| Status | Active |
| Dues | Paid |
| Booking | Tennis Court, 6 PM |

### Demo Behavior

Clicking Check-In should show:

> Member checked in successfully.

---

## 8.14 Reports Screen

### Purpose

Show management reports.

### Report Sections

1. Member Reports
2. Booking Reports
3. Financial Reports
4. Facility Usage Reports
5. Dues Reports
6. Complaint Reports

### Cards

| Report Card | Example |
|---|---:|
| New Members This Month | 48 |
| Active Members | 430 |
| Expired Members | 38 |
| Total Bookings This Month | 1,240 |
| Cancelled Bookings | 86 |
| No-Shows | 41 |
| Monthly Revenue | PKR 4,850,000 |
| Pending Dues | PKR 620,000 |

### Charts

- Revenue trend line chart
- Facility usage bar chart
- Membership type pie chart
- Booking status chart

---

## 8.15 Complaints Management Screen

### Purpose

Allow admin to manage complaints.

### Table Columns

| Column |
|---|
| Complaint ID |
| Member Name |
| Type |
| Facility |
| Subject |
| Status |
| Date |
| Action |

### Statuses

- Open
- In Progress
- Resolved
- Closed

### Actions

- View Complaint
- Update Status
- Add Admin Reply

---

## 8.16 Notifications Management Screen

### Purpose

Allow admin to create/send notices.

### Fields

| Field | Type |
|---|---|
| Notification Title | Text |
| Message | Text Area |
| Target Audience | Dropdown |
| Facility | Optional Dropdown |
| Send Date | Date |

### Target Audience Options

- All Members
- Active Members
- Members with Pending Dues
- Gym Members
- Pool Members
- Tennis Members

### Demo Behavior

Clicking Send should show success toast.

---

## 8.17 Staff / Roles Screen

### Purpose

Show role-based admin access.

### Staff Table Columns

| Column |
|---|
| Staff Name |
| Email |
| Role |
| Status |
| Last Login |
| Action |

### Example Roles

| Role | Access |
|---|---|
| Super Admin | Full system access |
| Finance Admin | Payments, dues, reports |
| Reception Staff | Check-in, member search |
| Facility Manager | Facilities and bookings |
| Support Staff | Complaints and notifications |

---

## 8.18 Settings Screen

### Purpose

Show basic system settings.

### Settings Sections

- Club profile
- Membership settings
- Booking rules
- Payment settings
- Notification settings
- Admin preferences

No real saving is required. It should only look functional.

---

# 9. Mock Data Requirements

Use realistic dummy data.

## Member Names

Use Pakistani/common names such as:

- Ali Khan
- Sara Ahmed
- Hamza Malik
- Ayesha Noor
- Bilal Hussain
- Fatima Sheikh
- Usman Tariq
- Hira Iqbal
- Danish Ali
- Zainab Khan

## Facilities

Use:

- Gym
- Swimming Pool
- Tennis Court
- Badminton Court
- Fitness Studio

## Membership IDs

Format:

- RS-MEM-0001
- RS-MEM-0002
- RS-MEM-0003

## Application IDs

Format:

- RS-APP-1001
- RS-APP-1002
- RS-APP-1003

## Booking IDs

Format:

- RS-BKG-5001
- RS-BKG-5002
- RS-BKG-5003

## Payment IDs

Format:

- RS-PAY-7001
- RS-PAY-7002
- RS-PAY-7003

---

# 10. Suggested Folder Structure

```text
rising-sun-prototype/
│
├── app/
│   ├── member/
│   │   ├── login/
│   │   ├── register/
│   │   ├── home/
│   │   ├── application/
│   │   ├── facilities/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── notifications/
│   │   ├── complaints/
│   │   └── profile/
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── applications/
│   │   ├── members/
│   │   ├── facilities/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── check-in/
│   │   ├── reports/
│   │   ├── complaints/
│   │   ├── notifications/
│   │   ├── staff/
│   │   └── settings/
│
├── components/
│   ├── common/
│   ├── member/
│   ├── admin/
│   ├── cards/
│   ├── tables/
│   ├── modals/
│   └── charts/
│
├── data/
│   ├── members.ts
│   ├── applications.ts
│   ├── facilities.ts
│   ├── bookings.ts
│   ├── payments.ts
│   ├── complaints.ts
│   └── notifications.ts
│
├── styles/
│
└── README.md
```

---

# 11. Prototype Routes

## Member App Routes

| Route | Screen |
|---|---|
| `/member/login` | Member Login |
| `/member/register` | Member Registration |
| `/member/application` | Membership Application |
| `/member/status` | Application Status |
| `/member/home` | Member Home |
| `/member/id-card` | Digital Membership ID |
| `/member/facilities` | Facilities List |
| `/member/facilities/[id]` | Facility Detail |
| `/member/book` | Booking Screen |
| `/member/bookings` | My Bookings |
| `/member/payments` | Payments/Dues |
| `/member/payment-proof` | Upload Payment Proof |
| `/member/notifications` | Notifications |
| `/member/complaints` | Complaint Form |
| `/member/profile` | Profile |

## Admin Dashboard Routes

| Route | Screen |
|---|---|
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Admin Dashboard Home |
| `/admin/applications` | Applications Management |
| `/admin/members` | Members List |
| `/admin/members/[id]` | Member Detail |
| `/admin/facilities` | Facility Management |
| `/admin/bookings` | Booking Management |
| `/admin/calendar` | Booking Calendar |
| `/admin/payments` | Payment Management |
| `/admin/check-in` | Check-In Screen |
| `/admin/reports` | Reports |
| `/admin/complaints` | Complaints Management |
| `/admin/notifications` | Notifications Management |
| `/admin/staff` | Staff/Roles |
| `/admin/settings` | Settings |

---

# 12. Component Requirements

## Common Components

Build reusable components:

- Button
- Input
- Select
- Textarea
- Status Badge
- Modal
- Toast
- Card
- Table
- Date selector
- Time slot picker
- User avatar
- Empty state
- Page header
- Sidebar
- Bottom navigation

## Member Components

- Mobile app shell
- Bottom navigation
- Facility card
- Booking card
- Payment card
- Membership ID card
- Application status timeline
- Notification item
- Complaint form

## Admin Components

- Dashboard sidebar
- Header/navbar
- Stats card
- Data table
- Filter bar
- Chart card
- Application review modal
- Payment proof modal
- Member profile card
- Booking calendar block
- Staff role badge

---

# 13. UI Behavior for Demo

Since this is frontend-only, use simple local state.

## Examples

### Login

When user clicks Login:

- Navigate to member home or admin dashboard.

### Submit Application

When user clicks Submit Application:

- Show success toast.
- Navigate to application status screen.

### Book Facility

When user selects a time slot and clicks Confirm:

- Show booking confirmed modal.
- Add visual mock booking card if using local state.

### Approve Application

When admin clicks Approve:

- Show success modal.
- Change status badge from Pending to Approved in UI.

### Verify Payment

When admin clicks Verify:

- Show success toast.
- Change status badge from Pending to Verified in UI.

### Check-In

When admin clicks Check-In:

- Show message: Member checked in successfully.

---

# 14. Dashboard Mock Numbers

Use these numbers for the demo dashboard.

| Metric | Value |
|---|---:|
| Total Members | 500 |
| Active Members | 430 |
| Pending Applications | 32 |
| Expired Memberships | 38 |
| Suspended Members | 6 |
| Today’s Bookings | 76 |
| Today’s Check-ins | 49 |
| Monthly Revenue | PKR 4,850,000 |
| Pending Dues | PKR 620,000 |
| Open Complaints | 11 |
| Most Used Facility | Gym |

---

# 15. Chart Mock Data

## Monthly Revenue

| Month | Revenue |
|---|---:|
| Jan | 3,200,000 |
| Feb | 3,650,000 |
| Mar | 4,100,000 |
| Apr | 4,400,000 |
| May | 4,850,000 |

## Facility Usage

| Facility | Usage |
|---|---:|
| Gym | 420 |
| Swimming Pool | 310 |
| Tennis Court | 180 |
| Badminton Court | 150 |
| Fitness Studio | 95 |

## Membership Status

| Status | Count |
|---|---:|
| Active | 430 |
| Pending | 32 |
| Expired | 38 |
| Suspended | 6 |

---

# 16. Pages That Must Look Most Polished

For demo purposes, these screens should look the best:

## Member Side

1. Member Home
2. Digital Membership ID
3. Facilities List
4. Booking Screen
5. Payments Screen

## Admin Side

1. Admin Dashboard Home
2. Applications Management
3. Members Management
4. Booking Management
5. Payment Management
6. Reports Screen

These are the main screens the client will judge first.

---

# 17. Prototype Completion Criteria

The prototype will be considered complete when:

- Member app screens are designed and clickable.
- Admin dashboard screens are designed and clickable.
- Mock data is shown properly.
- Main user journey can be demonstrated.
- Main admin journey can be demonstrated.
- Dashboard cards/charts/tables look professional.
- Buttons and actions show modals/toasts.
- No backend is required.
- No database is required.
- Demo can be run locally or deployed on Vercel/Netlify.

---

# 18. Demo User Journey

## Member Demo Flow

```text
Open app
→ Login
→ View home dashboard
→ View membership ID
→ Open facilities
→ Select Tennis Court
→ Select date and time slot
→ Confirm booking
→ View booking in My Bookings
→ Open Payments
→ Upload payment proof
→ View notification
```

## Admin Demo Flow

```text
Open admin dashboard
→ Login
→ View dashboard summary
→ Open pending applications
→ View application detail
→ Approve application
→ Open members list
→ View member detail
→ Open bookings
→ View booking calendar
→ Open payments
→ Verify payment proof
→ Open reports
```

---

# 19. Deployment for Demo

The prototype can be deployed on:

- Vercel
- Netlify
- Local machine
- Internal demo server

Recommended: **Vercel** because it is fast for frontend demos.

---

# 20. Final Note for Developer

Build this as a strong visual prototype for client presentation. The client should feel that the product is real and almost ready, even though the backend is not connected.

Focus on:

- Clean UI
- Professional layout
- Good spacing
- Realistic dummy data
- Smooth navigation
- Clear member journey
- Clear admin journey
- Strong dashboard presentation

Do not spend time on real backend functionality at this stage. The purpose is demo, approval, and requirement finalization.

