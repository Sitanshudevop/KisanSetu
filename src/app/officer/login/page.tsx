"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock } from "lucide-react";

export default function OfficerLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = "officer_auth_token=demo-token; path=/; max-age=86400";
    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl") || "/officer";
    window.location.href = callbackUrl;
  };

  const handleDemoMode = () => {
    document.cookie = "officer_auth_token=demo-token; path=/; max-age=86400";
    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl") || "/officer";
    window.location.href = callbackUrl;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-950">
      {/* Mock background of the dashboard */}
      <div className="absolute inset-0 z-0 opacity-30 select-none pointer-events-none">
        <div className="max-w-6xl mx-auto p-8 space-y-8">
          <div className="h-32 bg-gray-800 rounded-2xl w-full border border-gray-700"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-800 rounded-2xl border border-gray-700"></div>
            <div className="col-span-2 h-64 bg-gray-800 rounded-2xl border border-gray-700"></div>
          </div>
        </div>
      </div>
      
      {/* Dark overlay & blur */}
      <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        
        {/* Modal Container */}
        <div className="bg-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-500/10 p-4 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Shield className="w-10 h-10 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-xl font-bold text-center text-white mb-8 tracking-wide">
              Restricted Access:<br/>Mandi Operations Command
            </h1>

            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Officer ID / Admin Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-800 text-gray-200 border border-gray-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <input 
                  type="password" 
                  placeholder="Passcode" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 text-gray-200 border border-gray-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 transition-all"
                  required
                />
              </div>

              <div className="pt-4 space-y-3">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg"
                >
                  Authenticate
                </button>
                
                <button 
                  type="button"
                  onClick={handleDemoMode}
                  className="w-full bg-transparent border border-gray-600 hover:border-gray-400 hover:bg-gray-800 text-gray-300 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Enter Demo Mode
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-950 p-4 text-center border-t border-gray-800">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <Lock className="w-3 h-3 mr-1" /> Secure Government Portal
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
