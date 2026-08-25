"use client";

import { useState } from "react";
import { AlertOctagon, Calendar, Users, Radio } from "lucide-react";
import { BroadcastModal } from "./BroadcastModal";

export function EmergencyControlPanel() {
  const [reason, setReason] = useState("");
  const [actionType, setActionType] = useState("closure");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [affectedCount, setAffectedCount] = useState(0);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleFlagTokens = () => {
    if (!reason.trim()) {
      alert("Please enter a reason for the emergency change.");
      return;
    }
    // Simulate calculating affected tokens
    setAffectedCount(Math.floor(Math.random() * 40) + 12);
    setIsFlagged(true);
  };

  return (
    <div className="w-full bg-slate-900 border-t-4 border-t-red-600 border border-slate-800 rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <AlertOctagon className="w-6 h-6 mr-2 text-red-600" />
          Emergency Schedule Control Panel
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold text-white mb-2">Action Type</label>
          <select 
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="closure">Mark Full Closure Today</option>
            <option value="shorten">Shorten Hours (Close at 2 PM)</option>
            <option value="capacity">Reduce Capacity by 50%</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-white mb-2">Reason for Disruption</label>
          <input 
            type="text" 
            placeholder="e.g., Heavy Rainfall, Weighbridge Failure..."
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setIsFlagged(false);
            }}
            className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between border-t border-red-200 pt-6">
        <div className="flex items-center text-white font-semibold mb-4 md:mb-0">
          <Users className="w-5 h-5 mr-2" />
          {isFlagged ? (
            <span><strong className="text-red-400">{affectedCount} booked tokens</strong> flagged for disruption.</span>
          ) : (
            <span className="text-gray-400">Awaiting parameter confirmation...</span>
          )}
        </div>

        <div className="flex space-x-3 w-full md:w-auto">
          {!isFlagged ? (
            <button 
              onClick={handleFlagTokens}
              className="w-full md:w-auto bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm"
            >
              Calculate Impact
            </button>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-md flex items-center justify-center animate-in fade-in"
            >
              <Radio className="w-5 h-5 mr-2" /> Broadcast Notice
            </button>
          )}
        </div>
      </div>

      <BroadcastModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reason={reason}
        affectedCount={affectedCount}
      />
    </div>
  );
}
