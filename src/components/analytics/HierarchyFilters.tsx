"use client";

import { MapPin, Building, ChevronDown, CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

export function HierarchyFilters() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-full flex flex-wrap items-center gap-4 mb-8 shadow-lg">
      <div className="flex items-center text-slate-300 font-semibold bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 w-full md:w-auto cursor-not-allowed opacity-80">
        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
        State: Chhattisgarh
      </div>

      <div className="flex items-center w-full md:w-auto relative">
        <Building className="w-4 h-4 text-blue-400 absolute left-3" />
        <select className="w-full md:w-48 appearance-none bg-slate-800 border border-slate-600 text-white pl-10 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
          <option>Durg District</option>
          <option>Raipur District</option>
          <option>Bilaspur District</option>
          <option>Bastar District</option>
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
      </div>

      <div className="flex items-center w-full md:w-auto relative">
        <MapPin className="w-4 h-4 text-purple-400 absolute left-3" />
        <select className="w-full md:w-56 appearance-none bg-slate-800 border border-slate-600 text-white pl-10 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
          <option>All Mandi Centers (Aggregated)</option>
          <option>Krishi Upaj Mandi, Durg</option>
          <option>Bhilai Anaj Mandi</option>
          <option>Raipur Mandi Samiti</option>
          <option>Rajnandgaon Mandi</option>
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
}
