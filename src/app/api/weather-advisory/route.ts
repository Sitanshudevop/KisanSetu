import { NextResponse } from 'next/server';
import { getWeatherForecast } from '@/lib/services/weatherService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const date = searchParams.get('date');

  if (!location || !date) {
    return NextResponse.json({ error: 'Location and date are required' }, { status: 400 });
  }

  try {
    const forecast = await getWeatherForecast(location, date);
    return NextResponse.json(forecast);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json({ error: 'Failed to fetch weather advisory' }, { status: 500 });
  }
}
