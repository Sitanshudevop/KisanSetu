"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Calendar, Clock, MapPin, Truck, Wheat, CheckCircle } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";

export default function BookSlot() {
  const [step, setStep] = useState<"form" | "receipt">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ mandiId: "1", date: "", time: "", crop: "Paddy (Grade A)", quantity: "" });
  const [createdTokenId, setCreatedTokenId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setCreatedTokenId("TOK-" + Math.floor(Math.random() * 1000000));
      setStep("receipt");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      <BackButton />
      
      {step === "form" ? (
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden mt-4">
          <div className="bg-green-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Book a Mandi Slot</h2>
            <p className="text-green-100">Reserve your time to drop off crops.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-200 font-bold mb-2">Select Mandi Center</label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  value={formData.mandiId}
                  onChange={e => setFormData({...formData, mandiId: e.target.value})}
                  required
                >
                  <option value="1">Krishi Upaj Mandi, Durg</option>
                  <option value="2">Bhilai Anaj Mandi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-200 font-bold mb-2">Date</label>
                <div className="relative">
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input type="date" required className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 focus:ring-2 focus:ring-green-500 outline-none" onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-gray-200 font-bold mb-2">Time Slot</label>
                <div className="relative">
                  <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <select required className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 focus:ring-2 focus:ring-green-500 outline-none" onChange={e => setFormData({...formData, time: e.target.value})}>
                    <option>08:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 02:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-200 font-bold mb-2">Crop Type</label>
                <div className="relative">
                  <Wheat className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    value={formData.crop}
                    onChange={e => setFormData({...formData, crop: e.target.value})}
                  >
                    <option>Paddy (Grade A)</option>
                    <option>Wheat</option>
                    <option>Mustard</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-gray-200 font-bold mb-2">Est. Quantity (Quintals)</label>
                <div className="relative">
                  <Truck className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input 
                    type="number" 
                    placeholder="e.g. 50"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center mt-6 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-2xl p-10 border border-gray-700 text-center shadow-xl animate-in fade-in zoom-in-95 duration-500 mt-4">
          <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            Your slot at {formData.mandiId === "1" ? "Krishi Upaj Mandi, Durg" : "Bhilai Anaj Mandi"} for {formData.date} has been successfully reserved.
          </p>
          
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl inline-block mb-8">
            <p className="text-sm text-gray-500 mb-1">Your Token ID</p>
            <p className="text-2xl font-mono font-bold text-green-400 tracking-wider">#{createdTokenId}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href={`/farmer/track/${createdTokenId}`}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Track My Crop
            </Link>
            <Link 
              href="/farmer"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
