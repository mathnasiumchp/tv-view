"use client";

import useClock from "@/hooks/use-clock";
import { format } from "date-fns";
import { Separator } from "./ui/separator";
import useWeather from "@/hooks/use-weather";

export default function ClockAndWeather() {
  const { time } = useClock();
  const { weather } = useWeather();
  if (!time) return;
  return (
    <span className="flex gap-3 text-4xl font-black">
      {format(time, "h:mm a")}
      {weather && (
        <>
          <Separator orientation="vertical" decorative />
          {Math.round(weather.current.temperature_2m)}°
        </>
      )}
    </span>
  );
}
