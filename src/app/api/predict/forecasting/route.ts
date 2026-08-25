import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mandiId = searchParams.get('mandiId');

  if (!mandiId) {
    return NextResponse.json({ error: 'mandiId is required' }, { status: 400 });
  }

  try {
    const mandi = await prisma.mandi.findUnique({ where: { id: mandiId } });
    if (!mandi) return NextResponse.json({ error: 'Mandi not found' }, { status: 404 });

    // Fetch the last 7 days of token creation data (simplified simulation)
    // In a real scenario, group by date and count tokens.
    // We will simulate 7 days of historical data for the mathematical regression model.
    const historicalData = [120, 150, 160, 130, 180, 200, 210]; // e.g., token counts over last 7 days
    
    // Simple Linear Regression: y = mx + b
    const n = historicalData.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
      const x = i; // Day index (0 to 6)
      const y = historicalData[i];
      sumX += x;
      sumY += y;
      sumXY += (x * y);
      sumX2 += (x * x);
    }
    
    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;
    
    // Predict for tomorrow (x = 7)
    const predictedFootfall = Math.max(0, Math.round(m * n + b));
    
    const capacityThreshold = mandi.dailyCapacityLimit * 0.9;
    const warning = predictedFootfall > capacityThreshold;

    return NextResponse.json({
      mandiId,
      predictedFootfall,
      dailyCapacityLimit: mandi.dailyCapacityLimit,
      warning,
      message: warning 
        ? `Warning: Predicted footfall (${predictedFootfall}) exceeds 90% of capacity (${mandi.dailyCapacityLimit}).` 
        : "Footfall expected to be within manageable limits."
    });
  } catch (error) {
    console.error("Forecasting error:", error);
    return NextResponse.json({ error: 'Failed to generate forecast' }, { status: 500 });
  }
}
