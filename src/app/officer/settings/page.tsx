import { CsvImporter } from "@/components/CsvImporter";
import { Settings as SettingsIcon, Database, HardDriveDownload } from "lucide-react";
import { BackButton } from "@/components/BackButton";

export default function OfficerSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BackButton />

      {/* Header */}
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg border border-gray-700 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center text-gray-100">
            <SettingsIcon className="w-8 h-8 mr-3 text-blue-400" />
            Admin Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage infrastructure, bulk data operations, and database ingestion.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700">
          <div className="flex items-center mb-4">
            <Database className="w-6 h-6 text-indigo-400 mr-2" />
            <h2 className="text-xl font-bold text-gray-100">Live Database Config</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">Mandi capacity is currently capped at 500 tokens/day per regional policy.</p>
          <button className="px-4 py-2 bg-gray-900 border border-gray-700 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-semibold">
            Edit Quotas
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700">
          <div className="flex items-center mb-4">
            <HardDriveDownload className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-xl font-bold text-gray-100">System Backups</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">Last automatic backup of the ledger was performed at 00:00 UTC.</p>
          <button className="px-4 py-2 bg-gray-900 border border-gray-700 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-semibold">
            Trigger Manual Backup
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="lg:col-span-2">
        <CsvImporter />
      </div>
    </div>
  );
}
