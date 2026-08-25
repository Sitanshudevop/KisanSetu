import Link from "next/link";
import { Sprout, ShieldCheck, Globe, Settings, ArrowRight, Activity } from "lucide-react";
import { ClearCookies } from "@/components/ClearCookies";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <ClearCookies />
      {/* Hero Header */}
      <div className="text-center max-w-3xl mb-12 animate-in fade-in zoom-in-95 duration-300">
        <h1 className="tracking-tight">
          <span className="block text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent pb-2">
            Kisan Setu
          </span>
          <span className="block text-3xl md:text-4xl font-semibold text-gray-200 mt-2">
            Mandi Gateway
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-400">
          Next-Gen AI-Powered Farmer Slot Booking, Live Token Queuing & State Procurement Oversight System.
        </p>
      </div>

      {/* Role Navigation Grid Wrapper */}
      <div className="w-full max-w-6xl bg-zinc-950 p-8 md:p-12 rounded-3xl border border-gray-800/60 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          {/* 1. Farmer Portal */}
          <Link 
            href="/farmer"
            className="group relative bg-slate-900/90 border border-slate-800 hover:border-green-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 flex flex-col h-full"
          >
            <div className="flex-grow">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
              <Sprout className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 group-hover:text-green-400 transition-colors">
              Farmer Portal
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Book mandi slots, view weather advisories, track crop timeline, and chat with AI grievance bot.
            </p>
            </div>
            <div className="mt-auto pt-8 flex items-center text-sm font-semibold text-green-400 group-hover:translate-x-1 transition-transform">
              Enter Portal <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </Link>

        {/* 2. Procurement Officer */}
        <Link 
          href="/officer"
          className="group relative bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full"
        >
          <div className="flex-grow">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
              Mandi Officer (Admin)
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Live queue manager, QR scanner, emergency broadcast controls, and e-NAM/PFMS export engine.
            </p>
            </div>
            <div className="mt-auto pt-8 flex items-center text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              Launch Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </Link>

        {/* 3. SuperAdmin Analytics */}
        <Link 
          href="/superadmin"
          className="group relative bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col h-full"
        >
          <div className="flex-grow">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
              State SuperAdmin
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              District hierarchy filters, bottleneck detection, stage latency analytics, and capacity heatmaps.
            </p>
            </div>
            <div className="mt-auto pt-8 flex items-center text-sm font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              View Analytics <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* Removed separate secondary fast links div */}
    </div>
  );
}
