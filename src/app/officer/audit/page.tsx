import { AuditLogViewer } from "@/components/AuditLogViewer";
import { ShieldCheck } from "lucide-react";
import { BackButton } from "@/components/BackButton";

export default function OfficerAuditPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <BackButton />
      
      {/* Header */}
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg border border-gray-700 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center text-gray-100">
            <ShieldCheck className="w-8 h-8 mr-3 text-green-400" />
            Digital Audit Trail
          </h1>
          <p className="text-gray-400 mt-2">Government-compliant ledger of all overrides, forced advances, and reschedules.</p>
        </div>
      </div>

      <AuditLogViewer />
    </div>
  );
}
