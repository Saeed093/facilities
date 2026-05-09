"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MemberRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    cnic: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-[#0B1F3A] to-[#122B4D]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Image
              src="/logo.png"
              alt="Rising Sun"
              width={64}
              height={64}
              className="rounded-full border-2 border-[#F5B942]"
            />
          </div>
          <h1 className="text-xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-[#F5B942]">
            Sports Facilities Management
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-center mb-5">
            Member Registration
          </h2>

          <div className="space-y-3.5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Mobile Number
              </label>
              <Input
                placeholder="+92 300 1234567"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                CNIC / ID Number
              </label>
              <Input
                placeholder="35201-1234567-1"
                value={form.cnic}
                onChange={(e) => update("cnic", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Date of Birth
              </label>
              <Input
                placeholder="DD/MM/YYYY"
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Address
              </label>
              <Textarea
                placeholder="Enter your full address"
                rows={2}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white mt-2"
              onClick={() => router.push("/member/application")}
            >
              Create Account
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/member/login"
              className="text-sm text-[#0B1F3A] font-medium hover:underline"
            >
              Already have an account?{" "}
              <span className="text-[#0E5F4F]">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
