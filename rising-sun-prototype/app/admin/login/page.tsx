"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#0B1F3A] to-[#122B4D]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Rising Sun"
              width={80}
              height={80}
              className="rounded-full border-3 border-[#F5B942]"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Rising Sun</h1>
          <p className="text-sm text-[#F5B942]">Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-center mb-5">
            Admin Login
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <Input type="email" placeholder="admin@risingsun.pk" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <Input type="password" placeholder="Enter password" />
            </div>
            <Button
              className="w-full bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white"
              onClick={() => router.push("/admin/dashboard")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
