"use client";

import { ScheduleData } from "@/types/schedule";
import { useEffect, useState } from "react";

export default function useSchedule() {
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchSchedule() {
      try {
        const res = await fetch("/api/schedule", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to retrieve schedule.");
        }

        const data: ScheduleData = await res.json();

        if (active) {
          setSchedule(data);
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
          setIsLoading(false);
        }
      }
    }

    fetchSchedule();

    // Refresh every minute
    const minutes = 1;
    const timerId = setInterval(fetchSchedule, minutes * 60 * 1000);

    return () => {
      active = false;
      clearInterval(timerId);
    };
  }, []);

  return {
    schedule,
    isLoading,
    error,
  };
}
