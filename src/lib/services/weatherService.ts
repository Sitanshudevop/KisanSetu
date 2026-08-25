export interface WeatherForecast {
  date: string;
  rainProbability: number;
  condition: string;
  isHighRisk: boolean;
}

/**
 * Service to fetch weather forecast for a given location and date.
 * For hackathon purposes, if the OPENWEATHER_API_KEY is missing, 
 * this falls back to a mock response simulating a high rain risk.
 */
export async function getWeatherForecast(locationStr: string, targetDateStr: string): Promise<WeatherForecast> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  // MOCK FALLBACK for demo/hackathon purposes when API key is not configured
  if (!apiKey) {
    console.log("Weather API key not found. Using mock weather data (High Rain Risk).");
    return {
      date: targetDateStr,
      rainProbability: 75,
      condition: "Rain/Storm",
      isHighRisk: true
    };
  }

  try {
    // In a real implementation:
    // 1. Geocode the locationStr to lat/lon.
    // 2. Query openweathermap.org/data/2.5/forecast
    // 3. Find the forecast closest to targetDateStr
    // 
    // Example:
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationStr}&appid=${apiKey}`);
    // const data = await res.json();
    
    // For now, even if key exists, we'll return a simulated "Sunny" response for completeness 
    // to contrast with the missing-key "Rainy" mock.
    return {
      date: targetDateStr,
      rainProbability: 10,
      condition: "Clear/Sunny",
      isHighRisk: false
    };
  } catch (error) {
    console.error("Failed to fetch weather", error);
    // Fallback to safe assumption if API fails
    return {
      date: targetDateStr,
      rainProbability: 20,
      condition: "Unknown",
      isHighRisk: false
    };
  }
}
