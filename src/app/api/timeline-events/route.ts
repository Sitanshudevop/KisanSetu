import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenId = searchParams.get('tokenId');

  if (!tokenId) {
    return NextResponse.json({ error: 'tokenId is required' }, { status: 400 });
  }

  try {
    const events = await prisma.timelineEvent.findMany({
      where: { tokenId },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch timeline events' }, { status: 500 });
  }
}
