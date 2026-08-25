import Papa from "papaparse";

export interface ParsedRow {
  data: any;
  isValid: boolean;
  errors: string[];
}

export interface ValidationConfig {
  mappings: Record<string, string>; // e.g. { "Farmer Name": "name", "Contact": "phone" }
}

export const validateCsvData = (file: File, config: ValidationConfig): Promise<ParsedRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validatedRows: ParsedRow[] = results.data.map((row: any, index: number) => {
          const errors: string[] = [];
          
          // Map to internal schema using config.mappings
          const mappedData: any = {};
          for (const [csvHeader, internalField] of Object.entries(config.mappings)) {
            mappedData[internalField] = row[csvHeader];
          }

          // Validation Rules
          
          // 1. Phone number (must be 10 digits)
          if (!mappedData.phone || !/^\d{10}$/.test(String(mappedData.phone).trim())) {
            errors.push("Invalid or missing 10-digit Phone Number");
          }

          // 2. Name
          if (!mappedData.name || String(mappedData.name).trim().length < 2) {
            errors.push("Missing or invalid Farmer Name");
          }

          // 3. Aadhaar Hash (simulated check for 16-char hex)
          if (mappedData.aadhaarHash && String(mappedData.aadhaarHash).length !== 16) {
            errors.push("Invalid Aadhaar Hash format");
          }

          // 4. Acreage / Quota Range
          if (mappedData.acreage) {
            const num = parseFloat(mappedData.acreage);
            if (isNaN(num) || num < 0.1 || num > 100) {
              errors.push("Acreage must be a number between 0.1 and 100");
            }
          }

          return {
            data: mappedData,
            isValid: errors.length === 0,
            errors
          };
        });

        resolve(validatedRows);
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
};
