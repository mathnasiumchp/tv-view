export interface ScheduleData {
  studentSchedule: StudentSchedule[];
  instructorSchedule: InstructorSchedule[];
  updatedAt: string;
}

export interface StudentSchedule {
  name: string;
  start_time_raw: string;
  end_time_raw: string;
  delivery_method: string;
  is_private_session: boolean;
  start_time: Date;
  end_time: Date;
  abbreviated_name: string;
  session_time: string;
  display_name: string;
  instructor: string;
  status: string;
}

export interface InstructorSchedule {
  label: string;
  instructor: string;
  start_time: string;
  end_time: string;
}
