"use client";

import { useEffect, useState } from "react";

export default function useClock() {
  const [hourDifference, minDifference] = [0, 0];
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time once mounted
    const initialTime = new Date();
    initialTime.setHours(initialTime.getHours() - hourDifference);
    initialTime.setMinutes(initialTime.getMinutes() - minDifference);
    setTime(initialTime);

    // Update every second
    const timerId = setInterval(() => {
      const newTime = new Date();
      newTime.setHours(newTime.getHours() - hourDifference);
      newTime.setMinutes(newTime.getMinutes() - minDifference);
      setTime(newTime);
    }, 1000);

    // Clean up on unmount
    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    return {
      time: null,
      lastHalfHour: null,
      currHalfHour: null,
      nextHalfHour: null,
      nextNextHalfHour: null,
    };
  }

  const minutes = time.getMinutes();
  const roundedMinutes = Math.floor(minutes / 30) * 30;

  const currHalfHour = new Date(time);
  currHalfHour.setMinutes(roundedMinutes, 0, 0);

  const lastHalfHour = new Date(currHalfHour);
  lastHalfHour.setMinutes(lastHalfHour.getMinutes() - 30);

  const nextHalfHour = new Date(currHalfHour);
  nextHalfHour.setMinutes(nextHalfHour.getMinutes() + 30);

  const nextNextHalfHour = new Date(currHalfHour);
  nextNextHalfHour.setMinutes(nextNextHalfHour.getMinutes() + 60);

  return {
    time,
    lastHalfHour,
    currHalfHour,
    nextHalfHour,
    nextNextHalfHour,
  };
}
