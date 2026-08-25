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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">1-Tap Reschedule</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 bg-slate-200 rounded-full p-1" disabled={isSubmitting || isSuccess}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-green-600">
              <CheckCircle className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">Successfully Rescheduled!</h3>
              <p className="text-slate-500 mt-2 text-center">Your QR Code payload has been updated with the new date.</p>
            </div>
          ) : (
            <>
              <p className="text-slate-600 mb-6">
                Please select a sunny, low-risk alternative day below to avoid crop damage:
              </p>

              <div className="space-y-3">
                {options.map((opt) => (
                  <button
                    key={opt.date}
                    onClick={() => setSelectedDate(opt.date)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      selectedDate === opt.date 
                        ? "border-green-500 bg-green-50" 
                        : "border-slate-200 hover:border-green-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <Calendar className={`w-5 h-5 mr-3 ${selectedDate === opt.date ? "text-green-600" : "text-slate-400"}`} />
                      <span className="font-semibold text-slate-800">{opt.display}</span>
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-white px-2 py-1 rounded shadow-sm">
                      {opt.capacity} slots left
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDate || isSubmitting}
                  className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-300 text-white py-3 rounded-lg font-bold shadow-md transition-colors flex items-center justify-center"
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
