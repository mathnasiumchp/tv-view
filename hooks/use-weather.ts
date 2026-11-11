"use client";

import { WEATHER_REFRESH } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Weather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  time: string;
}

interface WeatherResponse {
  current: Weather;
  timezone: string;
}

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchWeather() {
      try {
        const response = await fetch("/api/weather");

        if (!response.ok) {
          throw new Error("Failed to retrieve weather.");
        }

        const data: WeatherResponse = await response.json();

        if (active) {
          setWeather(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Something went wrong.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    const timerId = setInterval(fetchWeather, WEATHER_REFRESH * 60 * 1000);

    return () => {
      active = false;
      clearInterval(timerId);
    };
  }, []);

  return {
    weather,
    loading,
    error,
  };
}
