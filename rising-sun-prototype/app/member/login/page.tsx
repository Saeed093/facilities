"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MemberLogin() {
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
          <p className="text-sm text-[#F5B942]">
            Sports Facilities Management
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-center mb-5">
            Member Login
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone or Email
              </label>
              <Input placeholder="+92 300 1234567" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <Input type="password" placeholder="Enter password" />
            </div>
            <Button
              className="w-full bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white"
              onClick={() => router.push("/member/home")}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center space-y-2">
            <button className="text-sm text-[#0E5F4F] hover:underline">
              Forgot Password?
            </button>
            <div>
              <Link
                href="/member/register"
                className="text-sm text-[#0B1F3A] font-medium hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
