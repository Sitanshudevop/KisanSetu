import { HierarchyFilters } from "@/components/analytics/HierarchyFilters";
import { MandiComparisonGrid } from "@/components/analytics/MandiComparisonGrid";
import { LatencyChart } from "@/components/analytics/LatencyChart";
import { UtilizationChart } from "@/components/analytics/UtilizationChart";
import { Globe, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function SuperAdminDashboard() {
  return (
    <div className="w-full px-6 md:px-10 py-8 bg-black space-y-6">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Globe className="w-8 h-8 mr-3 text-blue-500" />
              State Analytics & Oversight
            </h1>
            <p className="text-slate-400 mt-1">SuperAdmin Portal: Monitor multi-center capacity, delays, and district performance.</p>
          </div>
          <Link href="/officer" className="mt-4 md:mt-0 px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold rounded-lg shadow-sm transition-colors">
            Exit to Mandi Admin
          </Link>
        </div>

        {/* Global Filters */}
        <HierarchyFilters />

        {/* Top Analytics Summary Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Active Centers</p>
            <p className="text-3xl font-bold text-white mt-1">12</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold uppercase">District Footfall (Today)</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">2,840</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold uppercase">Bottleneck Alerts</p>
            <p className="text-3xl font-bold text-red-500 mt-1 flex items-center">
              1 <span className="text-sm font-normal text-slate-500 ml-2">Mandi Overloaded</span>
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold uppercase">Avg Wait Time</p>
            <p className="text-3xl font-bold text-green-400 mt-1">18 min</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column: Comparison Grid */}
          <div className="lg:col-span-4 h-full">
            <MandiComparisonGrid />
          </div>

          {/* Right Column: Charts */}
          <div className="lg:col-span-8 flex flex-col gap-8 h-full">
            <div className="w-full">
              <LatencyChart />
            </div>
            <div className="w-full">
              <UtilizationChart />
            </div>
          </div>
        </div>
      </div>
  );
}
