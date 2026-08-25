"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className="flex items-center text-slate-400 hover:text-white transition-colors mb-6 group bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-slate-600 w-fit"
    >
      <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
      <span className="font-semibold">Go Back</span>
    </button>
  );
}
