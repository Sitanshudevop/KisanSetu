import prisma from "@/lib/prisma";

interface AuditLogData {
  officerId: string;
  officerName: string;
  actionType: string;
  tokenRef?: string;
  previousValue?: string;
  newValue?: string;
  ipAddress?: string;
}

export async function logAuditAction(data: AuditLogData) {
  try {
    // Attempt to write to the DB. If Prisma client or DB is not fully configured locally,
    // we catch the error to prevent it from breaking the application flow.
    const log = await prisma.auditLog.create({
      data: {
        officerId: data.officerId,
        officerName: data.officerName,
        actionType: data.actionType,
        tokenRef: data.tokenRef,
        previousValue: data.previousValue,
        newValue: data.newValue,
        ipAddress: data.ipAddress,
      }
    });
    console.log("[AUDIT LOGGER] Successfully logged action:", log.id);
    return log;
  } catch (error) {
    console.error("[AUDIT LOGGER] Failed to log action. Ensure database schema is pushed.", error);
    return null;
  }
}
