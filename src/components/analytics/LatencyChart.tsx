"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function LatencyChart() {
  const data = [
    { name: 'Krishi Upaj', Weighbridge: 12, QualityCheck: 18, Payment: 5 },
    { name: 'Bhilai Anaj', Weighbridge: 25, QualityCheck: 22, Payment: 8 },
    { name: 'Raipur Samiti', Weighbridge: 8, QualityCheck: 15, Payment: 4 },
    { name: 'Rajnandgaon', Weighbridge: 10, QualityCheck: 12, Payment: 3 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6">Average Stage Latency (Minutes)</h3>
      <div className="w-full h-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: '#1e293b' }}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="Weighbridge" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
            <Bar dataKey="QualityCheck" stackId="a" fill="#f59e0b" />
            <Bar dataKey="Payment" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
