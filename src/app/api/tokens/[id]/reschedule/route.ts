import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { newDate } = body;

    if (!newDate) {
      return NextResponse.json({ error: 'newDate is required' }, { status: 400 });
    }

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
        data: { 
          scheduledDate: new Date(newDate)
        },
      }),
      prisma.timelineEvent.create({
        data: {
          tokenId: id,
          status: existingToken.status, // Keep current status
          notes: `Rescheduled due to Weather Advisory to ${new Date(newDate).toLocaleDateString()}`,
        },
      }),
    ]);

    return NextResponse.json(updatedToken);
  } catch (error) {
    console.error("Failed to reschedule token:", error);
    return NextResponse.json({ error: 'Failed to reschedule token' }, { status: 500 });
  }
}
