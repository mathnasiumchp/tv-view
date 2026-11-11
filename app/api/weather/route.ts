import { WEATHER_REFRESH } from "@/lib/utils";
import { NextResponse } from "next/server";

const [LATITUDE, LONGITUDE] = [41.799353, -87.592434];

export async function GET() {
  try {
    const params = new URLSearchParams({
      latitude: LATITUDE.toString(),
      longitude: LONGITUDE.toString(),
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
      ].join(","),
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      precipitation_unit: "inch",
      timezone: "auto",
    });

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
      { next: { revalidate: WEATHER_REFRESH * 60 } },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const weather = await response.json();

    return NextResponse.json(weather);
  } catch (error) {
    console.error("Weather API error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve weather." },
      { status: 500 },
    );
  }
}
