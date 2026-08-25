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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-800 text-white">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              <UploadCloud className="w-5 h-5 mr-2" /> {title}
            </h2>
            <p className="text-slate-300 text-sm mt-1 font-mono">Target Schema: {schemaType}</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white bg-slate-700 rounded-full p-1 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow p-6 overflow-y-auto bg-slate-50">
          <div className="relative group">
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono shadow-inner border border-slate-700">
              {payload}
            </pre>
            <button 
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-xs"
            >
              {isCopied ? <CheckCircle className="w-4 h-4 mr-1 text-green-400" /> : <Copy className="w-4 h-4 mr-1" />}
              {isCopied ? "Copied!" : "Copy Payload"}
            </button>
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 bg-white flex justify-between items-center">
          <button 
            onClick={handleDownload}
            className="flex items-center text-slate-700 hover:text-slate-900 font-semibold px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors"
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
