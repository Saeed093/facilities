"use client";

import Image from "next/image";
import Link from "next/link";
import { Smartphone, Monitor } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1F3A] px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Rising Sun Logo"
            width={120}
            height={120}
            className="rounded-full border-4 border-[#F5B942] shadow-2xl"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Rising Sun
        </h1>
        <p className="text-lg text-[#F5B942] font-medium mb-2">
          Sports Facilities Management System
        </p>
        <p className="text-sm text-slate-400">Frontend Demo Prototype</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        <Link
          href="/member/login"
          className="flex-1 group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-8 text-center hover:bg-white/20 transition-all duration-300"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#F5B942] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone className="w-8 h-8 text-[#0B1F3A]" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Member App</h2>
          <p className="text-sm text-slate-300">
            Mobile-first member experience
          </p>
        </Link>

        <Link
          href="/admin/login"
          className="flex-1 group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-8 text-center hover:bg-white/20 transition-all duration-300"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#0E5F4F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Monitor className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Admin Dashboard
          </h2>
          <p className="text-sm text-slate-300">Management control panel</p>
        </Link>
      </div>

      <p className="mt-12 text-xs text-slate-500">
        &copy; 2026 Rising Sun. All rights reserved.
      </p>
    </div>
  );
}
