"use client";

import Link from "next/link";
import { ShieldCheck, QrCode, Home, UserCircle } from "lucide-react";

export function OfficerNav() {
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 text-gray-200 sticky top-0 z-50">
      <div className="w-full px-6 md:px-10 py-4 flex justify-between items-center">
        
        {/* Left Side: Branding */}
        <div className="flex items-center space-x-4 text-gray-200">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all" title="Return Home">
            <Home className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-bold tracking-widest text-sm uppercase">HOME</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xl font-bold tracking-tight">Officer Dashboard</span>
          </div>
        </div>

        {/* Right Side: Navigation & Actions */}
        <div className="flex space-x-4 items-center">
          <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-700 hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium">
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Scan QR</span>
          </button>
          
          <button className="flex items-center justify-center p-1 rounded-full hover:bg-gray-800 transition-colors">
            <UserCircle className="w-7 h-7 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
