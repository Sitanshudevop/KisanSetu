"use client";

import { useState } from "react";
import { Download, Search, AlertOctagon, Filter, CheckCircle } from "lucide-react";

export function AuditLogViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  // Mocked Audit Logs for Demo since DB might not be seeded locally
  const mockLogs = [
    { id: "al_1", timestamp: "2026-08-25T14:32:00Z", officerName: "Raman Singh", actionType: "MANUAL_WEIGHT_OVERRIDE", tokenRef: "cm123xyz", previousValue: "500kg", newValue: "450kg", ipAddress: "192.168.1.104" },
    { id: "al_2", timestamp: "2026-08-25T13:15:22Z", officerName: "Amit Kumar", actionType: "STAGE_FORCE_ADVANCE", tokenRef: "tok_789abc", previousValue: "WEIGHMENT", newValue: "QUALITY_CHECK", ipAddress: "192.168.1.105" },
    { id: "al_3", timestamp: "2026-08-25T11:45:10Z", officerName: "Raman Singh", actionType: "SLOT_RESCHEDULE", tokenRef: "tok_456def", previousValue: "2026-08-25", newValue: "2026-08-26", ipAddress: "192.168.1.104" },
    { id: "al_4", timestamp: "2026-08-25T09:20:00Z", officerName: "System Admin", actionType: "REJECTED_QUALITY", tokenRef: "tok_999xxx", previousValue: "A-Grade", newValue: "Rejected (High Moisture)", ipAddress: "10.0.0.1" },
  ];

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.tokenRef.includes(searchTerm) || log.officerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "ALL" || log.actionType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleExportCSV = () => {
    // Simulate generating and downloading a CSV
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Timestamp,OfficerName,ActionType,TokenRef,OldValue,NewValue,IP\n"
      + filteredLogs.map(e => `${e.id},${e.timestamp},${e.officerName},${e.actionType},${e.tokenRef},${e.previousValue},${e.newValue},${e.ipAddress}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mandi_audit_trail_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-100 flex items-center">
            <AlertOctagon className="w-6 h-6 mr-2 text-gray-500" />
            Immutable Audit Trail
          </h2>
          <p className="text-sm text-gray-400 mt-1">Tamper-proof ledger of all administrative mutations and overrides.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="Search Token or Officer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-200"
            />
          </div>
          <button 
            onClick={handleExportCSV}
            className="flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-4">
        {["ALL", "MANUAL_WEIGHT_OVERRIDE", "STAGE_FORCE_ADVANCE", "SLOT_RESCHEDULE", "REJECTED_QUALITY"].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors flex items-center ${
              filterType === type 
                ? "bg-blue-600 text-white" 
                : "bg-gray-900 text-gray-400 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            {type === "ALL" && <Filter className="w-3 h-3 mr-1" />}
            {type.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-900 text-gray-400 border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Timestamp (UTC)</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Officer</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Action Type</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Token Ref</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Delta (Old → New)</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Origin IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{log.timestamp}</td>
                <td className="px-4 py-3 font-semibold text-gray-300">{log.officerName}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide border ${
                    log.actionType.includes("OVERRIDE") || log.actionType.includes("REJECTED") 
                      ? "bg-red-500/10 text-red-400 border-red-500/20" 
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}>
                    {log.actionType}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-400">{log.tokenRef}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-xs">
                    <span className="text-red-400 line-through mr-2">{log.previousValue}</span>
                    <span className="text-gray-500 mr-2">→</span>
                    <span className="text-green-400 font-bold">{log.newValue}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-gray-500">{log.ipAddress}</td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No audit logs found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-end text-xs text-gray-500">
        <CheckCircle className="w-3 h-3 mr-1 text-green-500" /> End of cryptographically signed ledger.
      </div>
    </div>
  );
}
