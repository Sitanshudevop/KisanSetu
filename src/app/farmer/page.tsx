"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MandiFinder } from "@/components/MandiFinder";
import { RescheduleModal } from "@/components/RescheduleModal";
import Link from "next/link";
import { PlusCircle, FileText, Settings, HelpCircle, CloudRain, AlertTriangle, Calendar, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function FarmerDashboard() {
  const { t } = useLanguage();
  
  // Weather Advisory State
  const [weatherAlert, setWeatherAlert] = useState<{ isHighRisk: boolean, prob: number, condition: string } | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [emergencyState, setEmergencyState] = useState<{ reason: string, timestamp: number } | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  // Mock Active Booking data
  const [activeBooking, setActiveBooking] = useState({
    id: "cm123xyz",
    mandi: "Krishi Upaj Mandi, Durg",
    date: new Date().toISOString().split('T')[0],
    crop: "Paddy (Grade A)",
  });

  useEffect(() => {
    // Check for emergency broadcast
    const emergencyStr = localStorage.getItem("sih_emergency_state");
    if (emergencyStr) {
      try {
        setEmergencyState(JSON.parse(emergencyStr));
      } catch (e) {}
    }

    // Fetch weather advisory for the active booking
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather-advisory?location=Durg&date=${activeBooking.date}`);
        if (res.ok) {
          const data = await res.json();
          if (data.rainProbability > 60 || data.condition.includes("Rain")) {
            setWeatherAlert({ isHighRisk: true, prob: data.rainProbability, condition: data.condition });
          } else {
            setWeatherAlert(null); // No risk
          }
        }
      } catch (err) {
        console.error("Failed to check weather");
      }
    };
    fetchWeather();
  }, [activeBooking.date]);

  const handleRescheduleSuccess = () => {
    // Re-fetch or simulate update
    setActiveBooking(prev => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { ...prev, date: tomorrow.toISOString().split('T')[0] };
    });
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Welcome & Dashboard header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Welcome back, Farmer</h1>
          <p className="text-gray-400 mt-1">Manage your crop bookings and track your procurement status.</p>
        </div>
      </div>

      {emergencyState && (
        <div className="bg-red-50 border-2 border-red-500 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-1">🚨 EMERGENCY NOTICE</h3>
              <p className="text-red-800">
                Mandi timings have been adjusted due to <strong>{emergencyState.reason}</strong>.<br/>
                Your slot has been automatically shifted to tomorrow to protect your booking.
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-3 w-full md:w-auto">
            <button 
              onClick={() => {
                alert("Auto-assigned slot confirmed.");
                localStorage.removeItem("sih_emergency_state");
                setEmergencyState(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-colors w-full"
            >
              Confirm Auto-Assigned Slot
            </button>
            <button 
              onClick={() => {
                setIsRescheduleModalOpen(true);
                localStorage.removeItem("sih_emergency_state");
                setEmergencyState(null);
              }}
              className="bg-white text-red-700 border border-red-300 hover:bg-red-50 px-6 py-2 rounded-lg font-bold shadow-sm transition-colors w-full"
            >
              Pick Alternative Date
            </button>
          </div>
        </div>
      )}

      {/* Active Booking & Weather Alert Section */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-lg">
        <div className="p-5 border-b border-gray-700 bg-gray-900/50 flex justify-between items-center">
          <h2 className="font-bold text-gray-200 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-400" />
            Active Booking
          </h2>
          <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Confirmed</span>
        </div>
        
        <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-xl font-bold text-gray-100">{activeBooking.mandi}</p>
            <p className="text-gray-400">
              {activeBooking.crop} • Scheduled: {new Date(activeBooking.date).toLocaleDateString()}
            </p>
          </div>
          <Link href={`/farmer/track/${activeBooking.id}`} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition-colors w-full md:w-auto text-center">
            Track Token
          </Link>
        </div>

        {weatherAlert?.isHighRisk && (
          <div className="bg-amber-950 border-t-2 border-amber-700 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start">
              <div className="bg-amber-900 p-2 rounded-full mr-4 flex-shrink-0">
                <CloudRain className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-amber-200 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" /> Weather Advisory Alert
                </h3>
                <p className="text-amber-300 text-sm mt-1">
                  <strong>{weatherAlert.prob}% Rain Probability</strong> forecasted for your slot. 
                  Open-air crop damage risk detected.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsRescheduleModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-colors w-full md:w-auto flex-shrink-0"
            >
              1-Tap Reschedule
            </button>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/farmer/book">
          <div className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-2xl border border-gray-700 flex items-center shadow-lg group cursor-pointer">
            <div className="bg-green-500/20 p-4 rounded-xl mr-4 group-hover:scale-105 transition-transform">
              <Calendar className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-100">Book a Mandi Slot</h2>
              <p className="text-gray-400 mt-1">Schedule your crop drop-off</p>
            </div>
          </div>
        </Link>

        <Link href="/farmer/j-forms">
          <div className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-2xl border border-gray-700 flex items-center shadow-lg group cursor-pointer">
            <div className="bg-blue-500/20 p-4 rounded-xl mr-4 group-hover:scale-105 transition-transform">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-100">Digital J-Forms</h2>
              <p className="text-gray-400 mt-1">View official receipts</p>
            </div>
          </div>
        </Link>
      </div>

      <MandiFinder />

      <RescheduleModal 
        tokenId={activeBooking.id}
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onSuccess={handleRescheduleSuccess}
      />

      {/* Modern Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 shadow-2xl rounded-xl p-4 flex items-center animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-green-500/20 p-2 rounded-full mr-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-white font-medium">✅ Slot successfully rescheduled</p>
        </div>
      )}
    </div>
  );
}
