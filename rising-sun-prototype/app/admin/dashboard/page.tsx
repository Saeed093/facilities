"use client";

import {
  Users,
  UserCheck,
  FileText,
  UserX,
  CalendarDays,
  ScanLine,
  Wallet,
  AlertCircle,
  MessageSquare,
  Dumbbell,
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
  recentActivity,
} from "@/data/charts";

const stats = [
  { label: "Total Members", value: "500", icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "Active Members", value: "430", icon: UserCheck, color: "bg-green-100 text-green-600" },
  { label: "Pending Applications", value: "32", icon: FileText, color: "bg-orange-100 text-orange-600" },
  { label: "Expired Memberships", value: "38", icon: UserX, color: "bg-red-100 text-red-600" },
  { label: "Today's Bookings", value: "76", icon: CalendarDays, color: "bg-purple-100 text-purple-600" },
  { label: "Today's Check-ins", value: "49", icon: ScanLine, color: "bg-teal-100 text-teal-600" },
  { label: "Monthly Revenue", value: "PKR 4,850,000", icon: Wallet, color: "bg-emerald-100 text-emerald-600" },
  { label: "Pending Dues", value: "PKR 620,000", icon: AlertCircle, color: "bg-amber-100 text-amber-600" },
  { label: "Open Complaints", value: "11", icon: MessageSquare, color: "bg-rose-100 text-rose-600" },
  { label: "Most Used Facility", value: "Gym", icon: Dumbbell, color: "bg-indigo-100 text-indigo-600" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of Rising Sun Facilities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`PKR ${Number(value).toLocaleString()}`, "Revenue"]} />
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Facility Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={facilityUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="facility" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#F5B942" name="Usage" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={membershipStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Bookings by Facility</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={facilityUsage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={12} />
                <YAxis dataKey="facility" type="category" fontSize={12} width={70} />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#0B1F3A" name="Bookings" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#0E5F4F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {index === 0 ? "Just now" : index < 3 ? `${index * 5} min ago` : `${index} hrs ago`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
