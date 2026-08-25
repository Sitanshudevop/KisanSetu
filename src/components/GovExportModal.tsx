"use client";

import { useState } from "react";
import { X, Copy, Download, UploadCloud, CheckCircle, Loader2 } from "lucide-react";

interface GovExportModalProps {
  title: string;
  payload: string;
  schemaType: "e-NAM v2.4" | "PFMS DBT v1.1.0";
  isOpen: boolean;
  onClose: () => void;
}

export function GovExportModal({ title, payload, schemaType, isOpen, onClose }: GovExportModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${schemaType.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setSyncComplete(false);
    
    // Simulate network delay and validation
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
      
      // Reset after 3 seconds
      setTimeout(() => setSyncComplete(false), 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold flex items-center text-white">
              <UploadCloud className="w-5 h-5 mr-2" /> {title}
            </h2>
            <p className="text-slate-400 text-sm mt-1 font-mono">Target Schema: {schemaType}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-1 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow p-6 overflow-y-auto bg-slate-900">
          {schemaType === "e-NAM v2.4" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Total Lots</p>
                  <p className="text-xl font-bold text-white">3</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Total Weight</p>
                  <p className="text-xl font-bold text-white">200 Quintals</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Total Value</p>
                  <p className="text-xl font-bold text-green-400">₹4,55,000</p>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="grid grid-cols-4 p-3 bg-slate-800 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase">
                  <div>Farmer Ref</div>
                  <div>Crop</div>
                  <div>Weight</div>
                  <div className="text-right">Settlement Value</div>
                </div>
                <div className="grid grid-cols-4 p-3 border-b border-slate-700/50 text-sm text-slate-300">
                  <div>FRM-881</div>
                  <div>Paddy (Grade A)</div>
                  <div>50 Qtl</div>
                  <div className="text-right font-mono">₹1,15,000</div>
                </div>
                <div className="grid grid-cols-4 p-3 border-b border-slate-700/50 text-sm text-slate-300">
                  <div>FRM-882</div>
                  <div>Paddy (Grade A)</div>
                  <div>30 Qtl</div>
                  <div className="text-right font-mono">₹69,000</div>
                </div>
                <div className="grid grid-cols-4 p-3 text-sm text-slate-300">
                  <div>FRM-883</div>
                  <div>Paddy (Grade A)</div>
                  <div>120 Qtl</div>
                  <div className="text-right font-mono">₹2,71,000</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Treasury ID</p>
                  <p className="text-xl font-bold text-white font-mono">TR-DL-AZD-01</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Total Beneficiaries</p>
                  <p className="text-xl font-bold text-white">3</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Total Disbursal</p>
                  <p className="text-xl font-bold text-green-400">₹4,55,000</p>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="grid grid-cols-4 p-3 bg-slate-800 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase">
                  <div>Transaction Ref</div>
                  <div>Account Hash</div>
                  <div className="text-right">Amount</div>
                  <div className="text-center">Type (APBS)</div>
                </div>
                <div className="grid grid-cols-4 p-3 border-b border-slate-700/50 text-sm text-slate-300">
                  <div>TXN-001</div>
                  <div className="font-mono text-slate-500">****881</div>
                  <div className="text-right font-mono text-green-400">₹1,15,000</div>
                  <div className="text-center"><span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">APBS</span></div>
                </div>
                <div className="grid grid-cols-4 p-3 border-b border-slate-700/50 text-sm text-slate-300">
                  <div>TXN-002</div>
                  <div className="font-mono text-slate-500">****882</div>
                  <div className="text-right font-mono text-green-400">₹69,000</div>
                  <div className="text-center"><span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">APBS</span></div>
                </div>
                <div className="grid grid-cols-4 p-3 text-sm text-slate-300">
                  <div>TXN-003</div>
                  <div className="font-mono text-slate-500">****883</div>
                  <div className="text-right font-mono text-green-400">₹2,71,000</div>
                  <div className="text-center"><span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">APBS</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
          <button 
            onClick={handleDownload}
            className="flex items-center text-slate-300 hover:text-white font-semibold px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5 mr-2" /> Download .json
          </button>

          <button
            onClick={handleSync}
            disabled={isSyncing || syncComplete}
            className={`flex items-center px-6 py-2.5 rounded-lg font-bold shadow-md transition-all ${
              syncComplete 
                ? "bg-green-100 text-green-700 border border-green-300" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSyncing ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Syncing with Portal...</>
            ) : syncComplete ? (
              <><CheckCircle className="w-5 h-5 mr-2" /> Payload Validated Against {schemaType}</>
            ) : (
              <><UploadCloud className="w-5 h-5 mr-2" /> Sync with Gov Portal</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
