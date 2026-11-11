"use client";

import useClock from "@/hooks/use-clock";
import { timeToMinutes } from "@/lib/utils";
import { StudentSchedule } from "@/types/schedule";
import { format } from "date-fns";

export default function Zone({
  backgroundColor,
  color,
  instructor,
  zoneName,
  students,
}: {
  backgroundColor: string;
  color: string;
  instructor: string;
  zoneName: string;
  students: StudentSchedule[];
}) {
  const { currHalfHour, nextHalfHour, nextNextHalfHour, time } = useClock();
  if (!currHalfHour || !nextHalfHour || !time) return;

  const formattedCurrHalfHour = format(currHalfHour, "h:mm a");
  const formattedNextHalfHour = format(nextHalfHour, "h:mm a");
  const formattedNextNextHalfHour = format(nextNextHalfHour, "h:mm a");

  const minutesUntilEndOfCurrHalfHour =
    (nextHalfHour.getTime() - time.getTime()) / (1000 * 60);
  const minutesUntilEndOfSession = 10;

  const fullHourStudents = students.filter((student) => {
    const { name, start_time_raw, end_time_raw } = student;
    return (
      name &&
      name !== "" &&
      student.instructor === instructor &&
      timeToMinutes(start_time_raw) <= timeToMinutes(formattedCurrHalfHour) &&
      timeToMinutes(end_time_raw) >= timeToMinutes(formattedNextNextHalfHour)
    );
  });
  const currHalfHourStudents = students.filter((student) => {
    const { name, end_time_raw } = student;
    return (
      name &&
      name !== "" &&
      student.instructor === instructor &&
      timeToMinutes(end_time_raw) === timeToMinutes(formattedNextHalfHour)
    );
  });
  const nextHalfHourStudents = students.filter((student) => {
    const { name, start_time_raw } = student;
    return (
      name &&
      name !== "" &&
      student.instructor === instructor &&
      timeToMinutes(start_time_raw) === timeToMinutes(formattedNextHalfHour)
    );
  });

  const className =
    "inline-block min-w-0 w-full py-2 px-3 text-xl font-semibold rounded-lg whitespace-nowrap overflow-hidden bg-gray-200 transition-all ease-in-out duration-500";

  return (
    <div className="w-full min-h-10 rounded-lg overflow-hidden border shadow-md">
      <div
        className="flex flex-col justify-center items-center pt-3 pb-2"
        style={{ backgroundColor, color }}
      >
        <span className="text-3xl font-black">
          {instructor || `${zoneName}`}
        </span>
        <span className="w-full flex">
          <span className="w-1/2 text-xl text-center font-bold">
            {formattedCurrHalfHour}
          </span>
          <span className="w-1/2 text-xl text-center font-bold">
            {formattedNextHalfHour}
          </span>
        </span>
      </div>
      <div className="min-h-[235.92px] flex flex-col gap-3 p-3 bg-background">
        {/* Students attending for the current and next half hour */}
        {fullHourStudents.map((student, i) => {
          const { display_name } = student;
          return (
            <span key={i} className={className}>
              {display_name}
            </span>
          );
        })}

        <div className="w-full flex gap-3">
          {/* Students attending for the current half hour */}
          <div className="w-1/2 flex flex-col gap-3">
            {currHalfHourStudents.map((student, i) => {
              const { display_name } = student;
              return (
                <span
                  key={i}
                  className={`${className} ${
                    minutesUntilEndOfCurrHalfHour <= minutesUntilEndOfSession
                      ? "bg-orange-300"
                      : "bg-gray-200"
                  }`}
                >
                  {display_name}
                </span>
              );
            })}
          </div>

          {/* Students attending for the next half hour */}
          <div className="w-1/2 flex flex-col gap-3">
            {nextHalfHourStudents.map((student, i) => {
              const { display_name } = student;
              return (
                <span key={i} className={className}>
                  {display_name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
