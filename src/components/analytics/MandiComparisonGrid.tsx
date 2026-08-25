"use client";

import { CheckCircle, AlertTriangle, AlertOctagon, TrendingUp, TrendingDown } from "lucide-react";

export function MandiComparisonGrid() {
  const mandis = [
    { name: "Krishi Upaj Mandi, Durg", load: 92, capacity: 500, trend: "up", status: "critical" },
    { name: "Bhilai Anaj Mandi", load: 78, capacity: 400, trend: "down", status: "warning" },
    { name: "Raipur Mandi Samiti", load: 45, capacity: 300, trend: "stable", status: "normal" },
    { name: "Rajnandgaon Mandi", load: 60, capacity: 250, trend: "up", status: "normal" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6">Mandi Load Comparison (Durg District)</h3>
      
      <div className="space-y-4 flex-grow overflow-y-auto pr-2">
        {mandis.map((mandi) => (
          <div key={mandi.name} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-200">{mandi.name}</p>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-slate-400">Cap: {mandi.capacity}</span>
                <span className="mx-2 text-slate-600">|</span>
                {mandi.trend === "up" && <TrendingUp className="w-4 h-4 text-red-400 mr-1" />}
                {mandi.trend === "down" && <TrendingDown className="w-4 h-4 text-green-400 mr-1" />}
                {mandi.trend === "stable" && <span className="text-slate-500 mr-1">—</span>}
                <span className="text-slate-400">Trend</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-right mr-4">
                <p className="text-2xl font-bold text-white">{mandi.load}%</p>
                <p className="text-xs text-slate-500">Utilization</p>
              </div>
              
              <div className={`p-3 rounded-full ${
                mandi.status === 'critical' ? 'bg-red-500/20 text-red-500' :
                mandi.status === 'warning' ? 'bg-amber-500/20 text-amber-500' :
                'bg-green-500/20 text-green-500'
              }`}>
                {mandi.status === 'critical' && <AlertOctagon className="w-6 h-6" />}
                {mandi.status === 'warning' && <AlertTriangle className="w-6 h-6" />}
                {mandi.status === 'normal' && <CheckCircle className="w-6 h-6" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
