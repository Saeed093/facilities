"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, CalendarDays, Wallet, User } from "lucide-react";

const navItems = [
  { href: "/member/home", label: "Home", icon: Home },
  { href: "/member/facilities", label: "Facilities", icon: Dumbbell },
  { href: "/member/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/member/payments", label: "Payments", icon: Wallet },
  { href: "/member/profile", label: "Profile", icon: User },
];

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginOrRegister =
    pathname === "/member/login" || pathname === "/member/register";

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl flex flex-col relative">
        <main className={`flex-1 overflow-y-auto ${isLoginOrRegister ? "" : "pb-20"}`}>
          {children}
        </main>
        {!isLoginOrRegister && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-border z-50">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/member/home" &&
                    pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                      isActive
                        ? "text-[#0B1F3A]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`}
                    />
                    <span
                      className={`text-[10px] ${
                        isActive ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
