// Simple mock crypto hash generator for visual completeness in the payload
const mockHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
};

/**
 * Serializes daily procurement transactions into standard e-NAM Lot format JSON
 */
export function generateEnamLotPayload(mandiCode: string, tokens: any[]) {
  const payload = {
    version: "2.4",
    timestamp: new Date().toISOString(),
    mandiCode: mandiCode,
    totalLots: tokens.length,
    lots: tokens.map((t, idx) => ({
      lotId: `L${new Date().getFullYear()}${String(idx + 1).padStart(5, '0')}`,
      farmerAadhaarHash: mockHash(`farmer-${t.id}`), // Deterministic mock hash
      commodityCode: t.crop === 'Wheat' ? 'WHT-01' : (t.crop === 'Rice' ? 'RIC-02' : 'GEN-00'),
      netWeightQuintals: t.qty || 50,
      qualityGrade: "FAQ", // Fair Average Quality
      mspSettlementValueINR: (t.qty || 50) * 2275, // Example: ₹2275 per quintal for Wheat
      transactionRef: t.id
    }))
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Serializes daily completed payments into PFMS DBT Payment Batch format
 */
export function generatePfmsDbtPayload(treasuryId: string, tokens: any[]) {
  const payload = {
    schemaVersion: "1.1.0",
    batchId: `PFMS-DBT-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`,
    treasuryId: treasuryId,
    disbursalDate: new Date().toISOString().split('T')[0],
    beneficiaries: tokens.map((t) => ({
      transactionRef: t.id,
      beneficiaryAccountIfscHash: mockHash(`ifsc-${t.id}`), 
      grossDisbursalAmount: (t.qty || 50) * 2275,
      stageReferenceHash: mockHash(`stage-${t.status}`),
      paymentType: "Aadhaar Payment Bridge System (APBS)"
    }))
  };

  return JSON.stringify(payload, null, 2);
}
