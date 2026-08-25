"use client";

import { useState } from "react";
import { QueueManager } from "@/components/QueueManager";
import { QRScanner } from "@/components/QRScanner";
import { GovExportModal } from "@/components/GovExportModal";
import { EmergencyControlPanel } from "@/components/EmergencyControlPanel";
import { generateEnamLotPayload, generatePfmsDbtPayload } from "@/lib/govExportFormatter";
import { Users, Clock, Warehouse, FileJson, Building, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function OfficerDashboard() {
  const [scannedToken, setScannedToken] = useState<string | null>(null);
  
  // Gov Export Modal State
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; payload: string; schemaType: "e-NAM v2.4" | "PFMS DBT v1.1.0" }>({
    isOpen: false,
    title: "",
    payload: "",
    schemaType: "e-NAM v2.4"
  });

  const handleScanSuccess = (decodedText: string) => {
    setScannedToken(decodedText);
    // Here we would typically fetch the token details using the hash
    alert(`Token Scanned: ${decodedText}`);
  };

  // Mock completed tokens for daily closure
  const mockCompletedTokens = [
    { id: "tk_981", crop: "Paddy (Grade A)", qty: 50, status: "PAYMENT_INITIATED" },
    { id: "tk_982", crop: "Paddy (Grade A)", qty: 30, status: "PAYMENT_INITIATED" },
    { id: "tk_983", crop: "Paddy (Grade A)", qty: 120, status: "PAYMENT_INITIATED" }
  ];

  const handleExportEnam = () => {
    const payload = generateEnamLotPayload("MND-AZD-01", mockCompletedTokens);
    setExportModal({ isOpen: true, title: "National Market (e-NAM) Data Sync", payload, schemaType: "e-NAM v2.4" });
  };

  const handleExportPfms = () => {
    const payload = generatePfmsDbtPayload("TR-DL-AZD-01", mockCompletedTokens);
    setExportModal({ isOpen: true, title: "Direct Benefit Transfer (PFMS) Payments", payload, schemaType: "PFMS DBT v1.1.0" });
  };

  return (
    <div className="w-full px-6 md:px-10 py-8 space-y-8">
      {/* Dashboard Header with Links */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold text-white">Officer Dashboard</h1>
        <div className="flex space-x-3">
          <Link href="/officer/audit" className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-green-600 hover:border-green-300 hover:shadow-sm transition-all font-semibold">
            <ShieldCheck className="w-5 h-5 mr-2" /> Audit Trail
          </Link>
          <Link href="/officer/settings" className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all font-semibold">
            <Settings className="w-5 h-5 mr-2" /> Admin Settings
          </Link>
        </div>
      </div>

      <EmergencyControlPanel />

      {/* Analytics & Actions Dashboard (4-Column Top Row) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl shadow-md border-t-4 border-t-blue-500 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">Today's Footfall</p>
              <p className="text-3xl font-bold text-white mt-2">142</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full"><Users className="w-8 h-8 text-blue-600" /></div>
          </div>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-xl shadow-md border-t-4 border-t-orange-500 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">Avg Wait Time</p>
              <p className="text-3xl font-bold text-white mt-2">24 <span className="text-lg text-gray-400 font-normal">mins</span></p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full"><Clock className="w-8 h-8 text-orange-600" /></div>
          </div>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-xl shadow-md border-t-4 border-t-green-500 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">Remaining Capacity</p>
              <p className="text-3xl font-bold text-white mt-2">358 <span className="text-lg text-gray-400 font-normal">/ 500</span></p>
            </div>
            <div className="bg-green-100 p-3 rounded-full"><Warehouse className="w-8 h-8 text-green-600" /></div>
          </div>
        </div>

        {/* Fast Entry (QR Scanner) */}
        <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800 flex flex-col justify-between">
          <h2 className="text-xl font-bold text-white mb-4">Fast Entry</h2>
          <div className="flex-grow flex items-center justify-center">
            <QRScanner onScanSuccess={handleScanSuccess} />
          </div>
          {scannedToken && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm break-all">
              <strong>Last Scanned:</strong> {scannedToken}
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        {/* Full-Width Queue Manager */}
        <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Live Queue Manager</h2>
            <span className="bg-slate-800 text-gray-300 px-3 py-1 rounded-full text-sm font-bold shadow-inner">
              Krishi Upaj Mandi, Durg
            </span>
          </div>
          <QueueManager />
        </div>
      </div>

      {/* Daily Closure & Gov Sync */}
      <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 overflow-hidden text-white mt-12">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold flex items-center">
            <Building className="w-6 h-6 mr-3 text-blue-400" /> 
            Daily Closure & Government Portals Sync
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Generate standardized JSON payloads for automated syncing with the National Agriculture Market (e-NAM) and the Public Financial Management System (PFMS).
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800">
          <div className="bg-slate-700 p-5 rounded-lg border border-slate-600 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-100 flex items-center">
                <FileJson className="w-5 h-5 mr-2 text-green-400" /> e-NAM Lot Integration
              </h3>
              <p className="text-slate-300 text-sm mt-2 mb-4">
                Serialize all completed weighing lots into e-NAM v2.4 Lot format containing Farmer Aadhaar hashes, quality grades, and MSP settlement values.
              </p>
            </div>
            <button 
              onClick={handleExportEnam}
              className="w-full bg-slate-800 hover:bg-slate-900 border border-slate-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Sync Market Data (e-NAM)
            </button>
          </div>

          <div className="bg-slate-700 p-5 rounded-lg border border-slate-600 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-100 flex items-center">
                <FileJson className="w-5 h-5 mr-2 text-purple-400" /> PFMS DBT Disbursal
              </h3>
              <p className="text-slate-300 text-sm mt-2 mb-4">
                Generate the Public Financial Management System Direct Benefit Transfer (DBT) payment batch for automated farmer account settlements.
              </p>
            </div>
            <button 
              onClick={handleExportPfms}
              className="w-full bg-slate-800 hover:bg-slate-900 border border-slate-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Process Farmer Payments (PFMS)
            </button>
          </div>
        </div>
      </div>

      {exportModal.isOpen && (
        <GovExportModal 
          title={exportModal.title}
          payload={exportModal.payload}
          schemaType={exportModal.schemaType}
          isOpen={exportModal.isOpen}
          onClose={() => setExportModal(prev => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
}
