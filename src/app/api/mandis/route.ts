import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const mandis = await prisma.mandi.findMany();
    return NextResponse.json(mandis);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch mandis' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const mandi = await prisma.mandi.create({
      data,
    });
    return NextResponse.json(mandi, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create mandi' }, { status: 500 });
  }
}
