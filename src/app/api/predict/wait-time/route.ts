import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TokenStatus } from '@prisma/client';

const AVG_PROCESSING_TIME_MINUTES = 15; // Assume 15 minutes per farmer on average

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mandiId = searchParams.get('mandiId');

  if (!mandiId) {
    return NextResponse.json({ error: 'mandiId is required' }, { status: 400 });
  }

  try {
    // Count how many farmers are currently in the queue (Arrived or Weighment)
    const queueCount = await prisma.token.count({
      where: {
        mandiId,
        status: {
          in: [TokenStatus.ARRIVED, TokenStatus.WEIGHMENT],
        },
      },
    });

    // Simple wait time prediction model
    const estimatedWaitTimeMinutes = queueCount * AVG_PROCESSING_TIME_MINUTES;

    return NextResponse.json({
      mandiId,
      queueCount,
      estimatedWaitTimeMinutes,
      message: `Estimated wait time is ${estimatedWaitTimeMinutes} minutes with ${queueCount} farmers ahead.`,
    });
  } catch (error) {
    console.error("Wait time prediction error:", error);
    return NextResponse.json({ error: 'Failed to calculate wait time' }, { status: 500 });
  }
}
