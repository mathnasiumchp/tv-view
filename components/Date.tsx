"use client";

import useClock from "@/hooks/use-clock";
import { format } from "date-fns";

export default function Date() {
  const { time } = useClock();
  if (!time) return;
  return (
    <span className="text-4xl font-black">
      {format(time, "eee, MMM d, yyyy")}
    </span>
  );
}
