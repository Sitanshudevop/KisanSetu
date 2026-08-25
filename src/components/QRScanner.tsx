"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Camera, X } from "lucide-react";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

export function QRScanner({ onScanSuccess }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const startScanner = () => {
    setIsScanning(true);
    // Add a small delay to ensure the DOM element exists
    setTimeout(() => {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
          "reader",
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false
        );
        scannerRef.current.render(
          (decodedText) => {
            // Stop scanning once we get a successful read
            scannerRef.current?.clear();
            setIsScanning(false);
            onScanSuccess(decodedText);
          },
          (error) => {
            // ignore continuous scanning errors
          }
        );
      }
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  return (
    <div className="w-full">
      {!isScanning ? (
        <button
          onClick={startScanner}
          className="w-full flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors text-lg font-semibold"
        >
          <Camera className="w-6 h-6 mr-2" />
          Scan Farmer QR Code
        </button>
      ) : (
        <div className="bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white text-lg">Scanning QR Code...</h3>
            <button
              onClick={stopScanner}
              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div id="reader" className="w-full max-w-sm mx-auto overflow-hidden rounded-lg border border-dashed border-slate-500 bg-slate-800/50 p-2 [&_a]:text-blue-400 [&_a]:hover:text-blue-300 [&_a]:font-medium [&_a]:transition-colors [&_img]:invert [&_img]:opacity-80 [&_svg]:text-white [&_svg_*]:stroke-current"></div>
        </div>
      )}
    </div>
  );
}
