"use client";

import useSchedule from "@/hooks/use-schedule";
import Zone from "./Zone";
import { Spinner } from "./ui/spinner";

export default function Schedule() {
  const { schedule, isLoading, error } = useSchedule();

  const zones = [
    { index: 1, name: "Red", backgroundColor: "#ef3e33", color: "#ffffff" },
    { index: 2, name: "Yellow", backgroundColor: "#ebe70f", color: "#000000" },
    { index: 3, name: "Blue", backgroundColor: "#7a84a0", color: "#ffffff" },
    { index: 4, name: "Black", backgroundColor: "#000000", color: "#ffffff" },
    { index: 5, name: "Gray", backgroundColor: "#c8c8c8", color: "#000000" },
    { index: 6, name: "White", backgroundColor: "#ffffff", color: "#000000" },
  ];

  if (!schedule) return null;

  const { instructorSchedule, studentSchedule } = schedule;
  const filteredStudentSchedule = studentSchedule.filter(
    (student) => student.status !== "No Show" && student.status !== "Cancelled",
  );

  return (
    <div
      className={`h-[calc(100vh-140px)] ${isLoading ? "flex justify-center items-center" : "grid grid-cols-3 gap-10"}`}
    >
      {isLoading ? (
        <Spinner className="size-20" />
      ) : error ? (
        <span>{error}</span>
      ) : (
        instructorSchedule
          .filter((item) => {
            const hasStudents =
              studentSchedule.filter(
                (student) => student.instructor === item.instructor,
              ).length > 0;
            return hasStudents;
          })
          .map((item, i) => {
            const { instructor } = item;
            const zone = zones[i];
            return (
              <Zone
                key={i}
                backgroundColor={zone.backgroundColor}
                color={zone.color}
                instructor={instructor}
                zoneName={`${zone.name} Zone`}
                students={filteredStudentSchedule}
              />
            );
          })
      )}
    </div>
  );
}
