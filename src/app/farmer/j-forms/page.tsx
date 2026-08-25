"use client";

import { Download, FileText, CheckCircle2, Clock } from "lucide-react";
import { BackButton } from "@/components/BackButton";

const mockJForms = [
  {
    id: "JF-CG-8829",
    date: "Nov 15, 2025",
    mandi: "Krishi Upaj Mandi, Durg",
    crop: "Paddy (Grade A)",
    qty: 45,
    value: "₹98,235",
    status: "CREDITED",
  },
  {
    id: "JF-CG-8904",
    date: "Dec 02, 2025",
    mandi: "Krishi Upaj Mandi, Durg",
    crop: "Paddy (Grade A)",
    qty: 30,
    value: "₹65,490",
    status: "PROCESSING",
  },
];

export default function JFormsPage() {
  return (
    <div className="w-full bg-black min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-start mb-6">
          <BackButton />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-blue-500" />
            Digital J-Forms & Payment Ledger
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            View your official MSP sale receipts and track PFMS direct benefit transfer statuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockJForms.map((form) => (
            <div key={form.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">{form.date}</p>
                    <h3 className="text-xl font-bold text-white mt-1">{form.id}</h3>
                  </div>
                  
                  {form.status === "CREDITED" ? (
                    <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      Payment Credited
                    </span>
                  ) : (
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold px-3 py-1 rounded-full flex items-center">
                      <Clock className="w-4 h-4 mr-1.5" />
                      PFMS Processing
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mandi Center</span>
                    <span className="text-gray-200 font-medium">{form.mandi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Crop Type</span>
                    <span className="text-gray-200 font-medium">{form.crop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Quantity</span>
                    <span className="text-gray-200 font-medium">{form.qty} Quintals</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end border-t border-slate-800 pt-4 mb-6">
                  <span className="text-gray-400 uppercase text-sm font-bold tracking-widest">Total Value</span>
                  <span className="text-3xl font-bold text-green-400">{form.value}</span>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center border border-slate-700">
                    <Download className="w-5 h-5 mr-2 text-slate-400" /> Download PDF
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg">
                    View Full Receipt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
