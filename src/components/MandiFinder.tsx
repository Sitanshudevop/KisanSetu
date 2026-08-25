"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Clock, List, Map as MapIcon, ChevronRight } from "lucide-react";
import Link from "next/link";

// Dummy data for mandis
const mandis = [
  { id: "1", name: "Krishi Upaj Mandi, Durg", location: "Chhattisgarh", isOpen: true, waitTime: 45, capacity: 500, active: 300 },
  { id: "2", name: "Bhilai Anaj Mandi", location: "Bhilai", isOpen: true, waitTime: 15, capacity: 400, active: 100 },
  { id: "3", name: "Panipat Mandi", location: "Panipat", isOpen: false, waitTime: 0, capacity: 300, active: 300 },
];

export function MandiFinder() {
  const { t } = useLanguage();
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <div className="w-full mx-auto bg-slate-900 rounded-xl border border-gray-700 shadow-md overflow-hidden p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Nearby Mandi Centers
        </h2>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md ${view === "list" ? "bg-slate-700 shadow text-green-400" : "text-gray-400"}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("map")}
            className={`p-2 rounded-md ${view === "map" ? "bg-slate-700 shadow text-green-400" : "text-gray-400"}`}
          >
            <MapIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === "map" ? (
        <div className="bg-slate-800 h-64 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-slate-700">
          Interactive Map Placeholder
        </div>
      ) : (
        <div className="space-y-4">
          {mandis.map((mandi) => (
            <div key={mandi.id} className="border border-slate-700 rounded-lg p-4 flex justify-between items-center bg-slate-800/50 hover:bg-slate-800 transition-colors">
              <div>
                <h3 className="font-bold text-lg text-white">{mandi.name}</h3>
                <p className="text-gray-400 text-sm flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" /> {mandi.location}
                </p>
                <div className="flex items-center mt-2 space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${mandi.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {mandi.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className={mandi.waitTime > 30 ? "text-amber-600 font-semibold" : "text-green-600 font-semibold"}>
                    Est. Wait: {mandi.waitTime} mins
                  </span>
                </div>
              </div>
              <Link
                href={`/farmer/book?mandiId=${mandi.id}`}
                className={`p-3 rounded-full ${mandi.isOpen ? "bg-green-600 text-white hover:bg-green-700" : "bg-slate-700 text-slate-500 pointer-events-none"}`}
              >
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
