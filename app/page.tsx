import ClockAndWeather from "@/components/ClockAndWeather";
import Date from "@/components/Date";
import Schedule from "@/components/Schedule";
import Zone from "@/components/Zone";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col flex-1 gap-5 p-10">
      {/* Background */}
      <Image
        src="/background.png"
        alt=""
        fill
        priority
        className="object-cover -z-10"
      />
      <span className="w-full flex justify-between">
        <Date />
        <ClockAndWeather />
      </span>
      <Schedule />
    </main>
  );
}
