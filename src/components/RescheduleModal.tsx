"use client";

import { useState } from "react";
import { X, Calendar, Loader2, CheckCircle } from "lucide-react";

interface RescheduleModalProps {
  tokenId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RescheduleModal({ tokenId, isOpen, onClose, onSuccess }: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate next 3 days as mocked sunny alternatives
  const today = new Date();
  const options = Array.from({ length: 3 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // Tomorrow, Day after, etc.
    return {
      date: d.toISOString().split('T')[0],
      display: d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      capacity: Math.floor(Math.random() * 50) + 10 // Mock remaining capacity
    };
  });

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!selectedDate) return;
    setIsSubmitting(true);
    
    try {
      // Mock network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900">
          <h2 className="text-xl font-semibold text-white">1-Tap Reschedule</h2>
          <button onClick={onClose} className="bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors rounded-full p-1" disabled={isSubmitting || isSuccess}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-emerald-500">
              <CheckCircle className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-bold text-white">Successfully Rescheduled!</h3>
              <p className="text-slate-400 mt-2 text-center">Your QR Code payload has been updated with the new date.</p>
            </div>
          ) : (
            <>
              <p className="text-slate-400 mb-6">
                Please select a sunny, low-risk alternative day below to avoid crop damage:
              </p>

              <div className="space-y-3">
                {options.map((opt) => (
                  <button
                    key={opt.date}
                    onClick={() => setSelectedDate(opt.date)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                      selectedDate === opt.date 
                        ? "bg-emerald-900/30 border-emerald-500" 
                        : "bg-slate-800 border-slate-700 hover:border-emerald-500/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <Calendar className={`w-5 h-5 mr-3 ${selectedDate === opt.date ? "text-emerald-400" : "text-slate-400"}`} />
                      <span className={`font-semibold ${selectedDate === opt.date ? "text-emerald-400" : "text-slate-300"}`}>{opt.display}</span>
                    </div>
                    <span className="text-sm font-medium text-emerald-500 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                      {opt.capacity} slots left
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDate || isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Updating QR...
                    </>
                  ) : (
                    "Confirm New Date"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
