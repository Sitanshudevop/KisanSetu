"use client";

import { useState } from "react";
import { X, Smartphone, Mic, Send, CheckCircle, Loader2 } from "lucide-react";

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: string;
  affectedCount: number;
}

export function BroadcastModal({ isOpen, onClose, reason, affectedCount }: BroadcastModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleBroadcast = () => {
    setIsSending(true);
    // Simulate setting the global emergency state for the demo
    localStorage.setItem("sih_emergency_state", JSON.stringify({ reason, timestamp: Date.now() }));
    
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-red-700 bg-red-900 text-white">
          <h2 className="text-xl font-bold">Emergency Broadcast Simulation</h2>
          <button onClick={onClose} disabled={isSending} className="text-red-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-800">Broadcast Deployed Successfully</h3>
            <p className="text-slate-500 mt-2">All {affectedCount} farmers have been notified via SMS and IVR.<br/>Their tokens are marked for forced reschedule.</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-red-900/20 text-red-400 p-4 rounded-lg mb-6 text-sm border border-red-900/50 font-semibold">
              You are about to trigger an emergency cascade for {affectedCount} affected tokens due to: "{reason}".
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SMS Preview */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                <div className="p-3 border-b border-slate-700 flex items-center">
                  <Smartphone className="w-5 h-5 text-slate-400 mr-2" />
                  <span className="font-bold text-slate-300">SMS / WhatsApp Preview</span>
                </div>
                <div className="p-4 h-48 overflow-y-auto">
                  <div className="bg-emerald-900/30 border border-emerald-800/50 text-slate-200 p-4 rounded-xl shadow-sm text-sm mb-2 inline-block max-w-[90%]">
                    🚨 <strong>Important Notice:</strong><br/>
                    Krishi Upaj Mandi, Durg timings adjusted today due to <strong>{reason}</strong>. Your slot has been protected but shifted.<br/><br/>
                    Reply <strong>1</strong> to confirm the auto-assigned slot, or <strong>2</strong> to pick a free alternative date.
                  </div>
                </div>
              </div>

              {/* IVR Preview */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                <div className="p-3 border-b border-slate-700 flex items-center">
                  <Mic className="w-5 h-5 text-slate-400 mr-2" />
                  <span className="font-bold text-slate-300">Broadcast Summary</span>
                </div>
                <div className="p-4 h-48 overflow-y-auto flex flex-col justify-center space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400">Target Audience</span>
                    <span className="text-slate-200 font-semibold">{affectedCount} Farmers</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400">Channels</span>
                    <span className="text-slate-200 font-semibold">SMS, WhatsApp & Automated Voice</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Status</span>
                    <span className="text-emerald-400 font-semibold">Ready for Dispatch</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={onClose} disabled={isSending} className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 font-bold rounded-lg mr-3 transition-colors">Cancel</button>
              <button 
                onClick={handleBroadcast}
                disabled={isSending}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-colors flex items-center"
              >
                {isSending ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Deploying...</>
                ) : (
                  <><Send className="w-5 h-5 mr-2" /> Execute Multi-Channel Broadcast</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
