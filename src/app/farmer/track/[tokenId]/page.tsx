"use client";

import { use, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, QrCode, Clock, Truck, ShieldCheck, CreditCard, Loader2 } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import QRCode from "react-qr-code";

const STAGES = [
  { id: "BOOKED", label: "Booked", desc: "Your slot has been reserved", icon: Clock },
  { id: "ARRIVED", label: "Arrived", desc: "Vehicle reached the mandi gate", icon: Truck },
  { id: "WEIGHMENT", label: "Weighment", desc: "Crop being weighed", icon: Loader2 },
  { id: "QUALITY_CHECK", label: "Quality Check", desc: "Inspecting crop standards", icon: ShieldCheck },
  { id: "PURCHASE_ENTRY", label: "Purchase Entry", desc: "Official purchase recorded", icon: CheckCircle2 },
  { id: "PAYMENT_INITIATED", label: "Payment", desc: "Funds transferred to account", icon: CreditCard },
];

export default function TrackCropPage({ params }: { params: Promise<{ tokenId: string }> }) {
  const { t } = useLanguage();
  const { tokenId } = use(params);

  // Mocking the current status
  const currentStatusId = "WEIGHMENT";
  const currentIndex = STAGES.findIndex(s => s.id === currentStatusId);

  // Search Flow State
  const [searchInput, setSearchInput] = useState(tokenId);
  const [isTracked, setIsTracked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    
    setIsLoading(true);
    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsTracked(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      {/* Top Left Back Button */}
      <div className="flex justify-start mb-6">
        <BackButton />
      </div>

      {!isTracked ? (
        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto mt-20 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95">
          <QrCode className="w-12 h-12 text-green-500 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Track Your Procurement Status</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">Enter your Mandi Token ID to view live tracking details.</p>
          
          <form onSubmit={handleSearch} className="w-full space-y-4">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter your Token ID (e.g., cm123xyz)"
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-gray-500 p-4 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-center text-lg tracking-widest"
              required
            />
            <button 
              type="submit"
              disabled={isLoading || !searchInput}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Track Token"}
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6 w-full animate-in slide-in-from-bottom-8 fade-in duration-500">
          
          {/* Left Column: QR & Details (4 Columns) */}
          <div className="col-span-1 md:col-span-4 bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
            <div className="sticky top-28">
              <h2 className="text-xl font-bold text-gray-100 flex items-center justify-center mb-6 border-b border-gray-800 pb-4">
                <QrCode className="mr-3 text-green-400 w-6 h-6" />
                Token ID: {searchInput}
              </h2>

              <div className="flex justify-center mb-8">
                <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-200">
                  <QRCode value={searchInput} size={180} />
                </div>
              </div>

            <div className="space-y-4 text-sm bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="flex justify-between border-b border-slate-800 pb-3">
                <span className="text-gray-400">Scheduled Date</span>
                <span className="text-gray-100 font-medium">Aug 25, 2026</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-3">
                <span className="text-gray-400">Mandi Name</span>
                <span className="text-gray-100 font-medium text-right">Krishi Upaj Mandi, Durg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Crop Type</span>
                <span className="text-gray-100 font-medium">Paddy (Grade A)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline (8 Columns) */}
        <div className="col-span-1 md:col-span-8 bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-8 border-b border-gray-800 pb-4">
              Live Procurement Status
            </h2>
            
            <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-500/50 before:via-gray-700 before:to-gray-800">
              {STAGES.map((stage, idx) => {
                const isCompleted = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                  <div key={stage.id} className="relative flex items-start group">
                    {/* Timeline Node */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shadow shrink-0 z-10 transition-colors duration-300
                      ${isCompleted ? "bg-green-500 border-green-200 text-white" : "bg-slate-800 border-slate-700 text-gray-500"}
                    `}>
                      {isCompleted && !isCurrent ? <CheckCircle2 className="w-6 h-6" /> : isCurrent ? <Loader2 className="w-6 h-6 animate-spin" /> : <stage.icon className="w-5 h-5" />}
                    </div>
                    
                    {/* Timeline Content */}
                    <div className={`ml-8 w-full p-6 rounded-xl border shadow-sm transition-all duration-300
                      ${isCurrent ? "border-green-500/50 bg-green-500/10 shadow-green-500/10 scale-[1.02]" : "border-slate-800 bg-slate-950"}
                    `}>
                      <div className="flex flex-col">
                        <div className={`text-xl font-bold tracking-tight mb-2 ${isCurrent ? "text-green-400" : isCompleted ? "text-gray-200" : "text-gray-500"}`}>
                          {stage.label}
                        </div>
                        <div className="text-gray-400 text-base leading-relaxed">
                          {stage.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        </div>
      )}
    </div>
  );
}
