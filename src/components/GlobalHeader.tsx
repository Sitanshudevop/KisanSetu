"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Sprout, Home } from "lucide-react";
import { OfficerNav } from "./OfficerNav";
import { SuperAdminNav } from "./SuperAdminNav";

export function GlobalHeader() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/officer/login") {
    return null;
  }

  if (pathname.startsWith("/officer")) {
    return <OfficerNav />;
  }
  
  if (pathname.startsWith("/superadmin")) {
    return <SuperAdminNav />;
  }

  let title = "Kisan Setu";
  let Icon = null;

  if (pathname.startsWith("/farmer")) {
    title = "Farmer Portal";
    Icon = Sprout;
  }

  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 text-gray-200 sticky top-0 z-50">
      <div className="w-full px-6 md:px-12 py-4 flex justify-between items-center">
        
        {/* Left Side: Branding */}
        <div className="flex items-center space-x-4 text-gray-200">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all" title="Return Home">
            <Home className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-bold tracking-widest text-sm uppercase">HOME</span>
          </Link>
          <div className="flex items-center space-x-2">
            {Icon && <Icon className="w-5 h-5" />}
            <span className="text-xl font-bold tracking-tight">{title}</span>
          </div>
        </div>

        {/* Right Side: Navigation & Language */}
        <div className="flex space-x-4 items-center">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
