import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logAuditAction } from '@/lib/auditLogger';
import { TokenStatus } from '@prisma/client';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    if (!status || !Object.values(TokenStatus).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Verify token exists
    const existingToken = await prisma.token.findUnique({
      where: { id },
    });

    if (!existingToken) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    // Use transaction to ensure token update and timeline event creation happen together
    const [updatedToken, _] = await prisma.$transaction([
      prisma.token.update({
        where: { id },
        data: { status },
      }),
      prisma.timelineEvent.create({
        data: {
          tokenId: id,
          status,
          notes: notes || `Token status updated to ${status}`,
        },
      }),
    ]);

    // Log the immutable audit action
    await logAuditAction({
      officerId: "system", 
      officerName: "System Admin",
      actionType: "TOKEN_STATUS_UPDATE",
      tokenRef: id,
      previousValue: existingToken.status,
      newValue: status,
      ipAddress: "0.0.0.0",
    });

    return NextResponse.json(updatedToken);
  } catch (error) {
    console.error("Failed to update token:", error);
    return NextResponse.json({ error: 'Failed to update token status' }, { status: 500 });
  }
}
