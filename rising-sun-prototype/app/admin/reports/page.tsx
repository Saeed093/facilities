"use client";

import {
  UserPlus,
  UserCheck,
  UserX,
  CalendarDays,
  XCircle,
  AlertTriangle,
  Wallet,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  monthlyRevenue,
  facilityUsage,
  membershipStatus,
} from "@/data/charts";

const bookingStatusData = [
  { name: "Confirmed", value: 980 },
  { name: "Cancelled", value: 86 },
  { name: "No-Show", value: 41 },
  { name: "Completed", value: 133 },
];

const bookingStatusColors = ["#16A34A", "#DC2626", "#64748B", "#2563EB"];

const stats = [
  {
    label: "New Members This Month",
    value: "48",
    icon: UserPlus,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Active Members",
    value: "430",
    icon: UserCheck,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Expired Members",
    value: "38",
    icon: UserX,
    color: "bg-red-100 text-red-600",
  },
  {
    label: "Total Bookings This Month",
    value: "1,240",
    icon: CalendarDays,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Cancelled Bookings",
    value: "86",
    icon: XCircle,
    color: "bg-rose-100 text-rose-600",
  },
  {
    label: "No-Shows",
    value: "41",
    icon: AlertTriangle,
    color: "bg-gray-100 text-gray-600",
  },
  {
    label: "Monthly Revenue",
    value: "PKR 4,850,000",
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Pending Dues",
    value: "PKR 620,000",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Reports</h1>
        <p className="text-sm text-muted-foreground">Analytics and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-lg font-bold text-[#0B1F3A] leading-tight">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis
                  fontSize={12}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value) => [
                    `PKR ${Number(value).toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0E5F4F"
                  strokeWidth={2}
                  dot={{ fill: "#0E5F4F" }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Facility Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Facility Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={facilityUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="facility" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="usage"
                  fill="#F5B942"
                  name="Bookings"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Membership Type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Membership Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={membershipStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={95}
                  dataKey="value"
                  nameKey="name"
                  label={({
                    name,
                    percent,
                  }: {
                    name?: string;
                    percent?: number;
                  }) =>
                    `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {membershipStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Booking Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={bookingStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Bookings" radius={[4, 4, 0, 0]}>
                  {bookingStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={bookingStatusColors[index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
