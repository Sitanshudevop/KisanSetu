"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileType, CheckCircle, AlertCircle, ArrowRight, Save, Play, XCircle, AlertTriangle, FileSpreadsheet } from "lucide-react";
import { validateCsvData, ParsedRow } from "@/lib/csvImporter";

export function CsvImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [validatedData, setValidatedData] = useState<ParsedRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [importSummary, setImportSummary] = useState<{success: number, errors: number} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock standard mappings for the hackathon demo
  const mockMappings = {
    "FarmerName": "name",
    "ContactNumber": "phone",
    "Crop": "crop",
    "LandAcreage": "acreage",
    "AadhaarHash": "aadhaarHash"
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setStep(2);
      generatePreview(e.dataTransfer.files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setStep(2);
      generatePreview(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStep(2);
      generatePreview(e.target.files[0]);
    }
  };

  const generatePreview = (selectedFile: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim() !== '');
      if (lines.length > 0) {
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          let obj: any = {};
          headers.forEach((h, i) => obj[h] = values[i]?.trim());
          return obj;
        });
        setPreviewData(data);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleRunValidation = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const results = await validateCsvData(file, { mappings: mockMappings });
      setValidatedData(results);
      setStep(3);
    } catch (err) {
      alert("Failed to parse CSV file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommitBatch = () => {
    setIsProcessing(true);
    // Simulate network latency for bulk insert
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
    }, 2500);
  };

  const simulateImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setImportSummary({ success: validCount, errors: invalidCount });
    }, 2000);
  };

  const resetFlow = () => {
    setFile(null);
    setValidatedData([]);
    setStep(1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validCount = validatedData.filter(r => r.isValid).length;
  const invalidCount = validatedData.filter(r => !r.isValid).length;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 lg:p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 flex items-center">
            <UploadCloud className="w-6 h-6 mr-2 text-blue-400" />
            Bulk CSV Ingestion Module
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Import legacy farmer registries and offline tokens into the live Postgres database.
          </p>
        </div>
      </div>

      {!importSummary ? (
        <>
          {step === 1 && (
            <div
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all ${
                isDragging ? "border-blue-400 bg-blue-500/10" : "border-gray-600 hover:border-gray-500 bg-gray-900/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FileSpreadsheet className={`w-12 h-12 mb-4 ${isDragging ? "text-blue-400" : "text-gray-500"}`} />
              <p className="text-gray-300 font-semibold mb-2">Drag and drop your CSV file here</p>
              <p className="text-gray-500 text-sm mb-4">Must contain: Aadhaar Hash, Name, Phone, Crop, Quantity</p>
              <input type="file" accept=".csv" className="hidden" id="file-upload" ref={fileInputRef} onChange={handleFileSelect} />
              <label htmlFor="file-upload" className="cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm">Browse Files</label>
            </div>
          )}

          {step === 2 && file && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <FileType className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-100">{file.name}</h4>
                    <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button onClick={resetFlow} className="text-blue-400 hover:text-blue-300 text-sm">Change File</button>
              </div>

              <div className="bg-gray-900/50 p-5 border border-gray-700 rounded-lg">
                <h4 className="font-bold text-gray-200 mb-4">Schema Mapping (Auto-Detected)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(mockMappings).map(([csv, internal]) => (
                    <div key={csv} className="flex items-center justify-between bg-gray-800 p-3 border border-gray-700 rounded shadow-sm">
                      <span className="font-mono text-gray-400">{csv}</span>
                      <ArrowRight className="w-4 h-4 text-gray-600 mx-2" />
                      <span className="font-bold text-green-400">{internal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleRunValidation}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold shadow-md transition-colors flex items-center justify-center"
              >
                {isProcessing ? "Validating..." : <><Play className="w-5 h-5 mr-2" /> Run Dry-Run Validation</>}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-800 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-green-400 uppercase">Valid Records</p>
                    <p className="text-3xl font-bold text-green-100 mt-1">{validCount}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-red-400 uppercase">Invalid Records</p>
                    <p className="text-3xl font-bold text-red-100 mt-1">{invalidCount}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>

              {previewData.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-200">Data Preview & Validation</h3>
                    <span className="text-sm font-semibold px-3 py-1 bg-gray-900 text-gray-400 rounded-full border border-gray-700">
                      {previewData.length} records parsed
                    </span>
                  </div>
                  <div className="overflow-x-auto border border-gray-700 rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-900 text-gray-400 border-b border-gray-700">
                        <tr>
                          {Object.keys(previewData[0]).map((header) => (
                            <th key={header} className="px-4 py-3 font-semibold">{header}</th>
                          ))}
                          <th className="px-4 py-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {previewData.slice(0, 5).map((row, idx) => {
                          const isValid = validatedData[idx].isValid;
                          return (
                            <tr key={idx} className="hover:bg-gray-700/30 transition-colors">
                              {Object.values(row).map((val: any, i) => (
                                <td key={i} className="px-4 py-2 text-gray-300">{val}</td>
                              ))}
                              <td className="px-4 py-2">
                                {isValid ? (
                                  <span className="flex items-center text-green-400 text-xs font-bold">
                                    <CheckCircle className="w-3 h-3 mr-1" /> Valid
                                  </span>
                                ) : (
                                  <span className="flex items-center text-red-400 text-xs font-bold">
                                    <AlertTriangle className="w-3 h-3 mr-1" /> Error
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={resetFlow} className="px-4 py-2 bg-gray-900 border border-gray-700 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">Cancel</button>
                <button 
                  onClick={simulateImport}
                  disabled={isProcessing || validCount === 0}
                  className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  {isProcessing ? "Importing Data..." : "Commit Batch Import"}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">Import Successful</h2>
          <p className="text-gray-400 mb-6">The database has been updated with the new records.</p>
          <div className="inline-flex gap-4 p-4 bg-gray-900 border border-gray-700 rounded-xl mb-8">
            <div className="text-center px-4 border-r border-gray-700">
              <p className="text-3xl font-bold text-green-400">{importSummary.success}</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Imported</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl font-bold text-red-400">{importSummary.errors}</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Skipped</p>
            </div>
          </div>
          <div>
            <button 
              onClick={resetFlow}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm"
            >
              Import Another File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
