import { getSheetData } from "@/lib/google-sheets";
import { InstructorSchedule, StudentSchedule } from "@/types/schedule";
import { NextResponse } from "next/server";

export async function GET() {
  function mapInstructorSchedule(rows: string[][]): InstructorSchedule[] {
    return rows.map((row) => ({
      label: row[0],
      instructor: row[1],
      start_time: row[2],
      end_time: row[3],
    }));
  }

  function mapStudentSchedule(rows: string[][]): StudentSchedule[] {
    return rows.map((row) => ({
      name: row[0],
      start_time_raw: row[1],
      end_time_raw: row[2],
      delivery_method: row[3],
      is_private_session: row[4] === "TRUE",
      start_time: new Date(row[5]),
      end_time: new Date(row[6]),
      abbreviated_name: row[7],
      session_time: row[8],
      display_name: row[9],
      instructor: row[10],
      status: row[11],
    }));
  }

  try {
    const [studentSchedule, instructorSchedule] = (await Promise.all([
      getSheetData(process.env.GOOGLE_SHEET_ID!, "'Admin View'!Q3:AB"),
      getSheetData(process.env.GOOGLE_SHEET_ID!, "'Admin View'!AD3:AG10"),
    ])) as [string[][], string[][]];

    return NextResponse.json({
      instructorSchedule: mapInstructorSchedule(instructorSchedule).filter(
        (row, i) => row.instructor && row.instructor !== "" && i < 6,
      ), // Limit to 6 instructors
      studentSchedule: mapStudentSchedule(studentSchedule),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Schedule API error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve schedule." },
      { status: 500 },
    );
  }
}
