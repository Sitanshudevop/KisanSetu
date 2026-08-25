"use client";

import { useState } from "react";
import { User, Truck, ClipboardCheck, DollarSign, ArrowRight, Loader2, Bell, CheckCircle } from "lucide-react";

// Mock data for tokens (In a real app, this would be fetched from /api/tokens)
const initialTokens = [
  { id: "1", farmerName: "Ramesh Kumar", crop: "Paddy (Grade A)", qty: 45, status: "ARRIVED" },
  { id: "2", farmerName: "Suresh Singh", crop: "Paddy (Grade A)", qty: 30, status: "WEIGHMENT" },
  { id: "3", farmerName: "Mohan Lal", crop: "Paddy (Grade A)", qty: 20, status: "QUALITY_CHECK" },
  { id: "4", farmerName: "Rajesh", crop: "Paddy (Grade A)", qty: 50, status: "ARRIVED" },
];

const stages = [
  { id: "ARRIVED", label: "Gate Arrival", icon: Truck, next: "WEIGHMENT", color: "border-blue-500", bg: "bg-blue-50" },
  { id: "WEIGHMENT", label: "Weighment", icon: ClipboardCheck, next: "QUALITY_CHECK", color: "border-yellow-500", bg: "bg-yellow-50" },
  { id: "QUALITY_CHECK", label: "Quality Check", icon: User, next: "PURCHASE_ENTRY", color: "border-purple-500", bg: "bg-purple-50" },
  { id: "PURCHASE_ENTRY", label: "Purchase Entry", icon: DollarSign, next: "PAYMENT_INITIATED", color: "border-green-500", bg: "bg-green-50" },
];

export function QueueManager() {
  const [tokens, setTokens] = useState(initialTokens);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notifiedIds, setNotifiedIds] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<string | null>(null);

  const handleUpdateStatus = async (tokenId: string, nextStatus: string) => {
    setUpdatingId(tokenId);
    
    // Simulate API call to PATCH /api/tokens/[id]
    setTimeout(() => {
      setTokens(tokens.map(t => t.id === tokenId ? { ...t, status: nextStatus } : t));
      setUpdatingId(null);
      // Reset notification state for the new stage
      setNotifiedIds(prev => ({ ...prev, [tokenId]: false }));
    }, 800);
  };

  const handleNotify = (tokenId: string) => {
    // Simulate SMS/WhatsApp trigger
    setNotifiedIds(prev => ({ ...prev, [tokenId]: true }));
    setNotification('SMS & WhatsApp notification sent to Farmer successfully.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {stages.map((stage) => {
        const stageTokens = tokens.filter(t => t.status === stage.id);
        const Icon = stage.icon;
        
        return (
          <div key={stage.id} className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
            <div className={`p-4 border-l-4 ${stage.color} bg-slate-800/80 flex justify-between items-center`}>
              <h3 className="font-bold text-lg text-white flex items-center">
                <Icon className="w-5 h-5 mr-2 opacity-70" />
                {stage.label}
              </h3>
              <span className="bg-slate-900 px-3 py-1 rounded-full text-sm font-bold text-gray-300 shadow-sm border border-slate-700">
                {stageTokens.length} waiting
              </span>
            </div>
            
            <div className="p-4 bg-slate-800/50">
              {stageTokens.length === 0 ? (
                <p className="text-gray-500 text-center py-4 italic">No farmers in this stage.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stageTokens.map((token) => (
                    <div key={token.id} className="bg-slate-700 p-4 rounded-lg shadow-sm border border-slate-600 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-white text-lg">{token.farmerName}</p>
                        <p className="text-gray-300 text-sm">{token.qty} Quintals • {token.crop}</p>
                        <p className="text-gray-400 text-xs mt-1 font-mono">Token #{token.id}</p>
                      </div>
                      
                      
                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() => handleUpdateStatus(token.id, stage.next)}
                          disabled={updatingId === token.id}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-md font-semibold flex items-center justify-center transition-colors"
                        >
                          {updatingId === token.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              Move to {stages.find(s => s.id === stage.next)?.label || 'Next'}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleNotify(token.id)}
                          disabled={notifiedIds[token.id]}
                          className={`w-full py-2 rounded-md font-semibold flex items-center justify-center transition-colors text-sm border ${
                            notifiedIds[token.id] 
                              ? "bg-slate-800 text-green-500 border-slate-700 cursor-not-allowed" 
                              : "bg-transparent text-blue-400 border-slate-600 hover:bg-slate-600"
                          }`}
                        >
                          <Bell className={`w-4 h-4 mr-2 ${notifiedIds[token.id] ? "text-green-500" : ""}`} />
                          {notifiedIds[token.id] ? "Alert Sent" : "Send Alert"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-800 border border-emerald-500/50 text-white px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-medium">{notification}</span>
        </div>
      )}
    </div>
  );
}
