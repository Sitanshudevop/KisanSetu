import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const farmerId = searchParams.get('farmerId');
  const mandiId = searchParams.get('mandiId');

  try {
    const tokens = await prisma.token.findMany({
      where: {
        ...(farmerId && { farmerId }),
        ...(mandiId && { mandiId }),
      },
      include: {
        mandi: true,
        farmer: true,
        timelineEvents: true,
      },
    });
    return NextResponse.json(tokens);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Check Mandi capacity
    const mandi = await prisma.mandi.findUnique({
      where: { id: data.mandiId },
    });

    if (!mandi) {
      return NextResponse.json({ error: 'Mandi not found' }, { status: 404 });
    }

    if (mandi.activeTokensCount >= mandi.dailyCapacityLimit) {
      return NextResponse.json({ error: 'Mandi daily capacity reached. Please select another date or mandi.' }, { status: 400 });
    }

    // Use a transaction to ensure atomicity
    const [token, updatedMandi] = await prisma.$transaction([
      prisma.token.create({
        data,
      }),
      prisma.mandi.update({
        where: { id: data.mandiId },
        data: { activeTokensCount: { increment: 1 } },
      }),
    ]);

    // Create initial timeline event
    await prisma.timelineEvent.create({
      data: {
        tokenId: token.id,
        status: token.status,
        notes: 'Token booked successfully',
      }
    });

    return NextResponse.json(token, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}
