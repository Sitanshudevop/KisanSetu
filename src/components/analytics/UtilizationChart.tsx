"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function UtilizationChart() {
  // Mock data for the last 7 days of Footfall vs Capacity
  const data = [
    { day: 'Mon', Footfall: 320, Capacity: 500 },
    { day: 'Tue', Footfall: 380, Capacity: 500 },
    { day: 'Wed', Footfall: 450, Capacity: 500 },
    { day: 'Thu', Footfall: 490, Capacity: 500 }, // Bottleneck
    { day: 'Fri', Footfall: 410, Capacity: 500 },
    { day: 'Sat', Footfall: 290, Capacity: 500 },
    { day: 'Sun', Footfall: 210, Capacity: 500 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Utilization Trend</h3>
          <p className="text-xs text-slate-400">7-Day Footfall vs Max Capacity</p>
        </div>
        <div className="flex space-x-3 text-xs font-semibold">
          <div className="flex items-center text-blue-400"><div className="w-3 h-3 bg-blue-500 rounded-full mr-1 opacity-50"></div> Footfall</div>
          <div className="flex items-center text-slate-400"><div className="w-3 h-3 bg-slate-600 rounded-full mr-1"></div> Capacity</div>
        </div>
      </div>
      
      <div className="w-full h-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFootfall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="Capacity" stroke="#475569" fill="none" strokeWidth={2} strokeDasharray="5 5" />
            <Area type="monotone" dataKey="Footfall" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFootfall)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
