import { Exam, GeneratedSchedule } from "../types";
import { addDays, format, differenceInCalendarDays, parseISO } from "date-fns";

/**
 * Simple fallback scheduler used by the frontend when no backend is available.
 * It spreads study items evenly across available days up to each exam date.
 */
export function generateScheduleLocal(exams: Exam[], dailyMinutes = 90): GeneratedSchedule {
  // Build a map of date -> tasks
  const today = new Date();
  const daysMap: Record<string, GeneratedSchedule["days"][0]> = {};

  exams.forEach((exam) => {
    const examDate = parseISO(exam.date);
    let daysAvailable = Math.max(1, differenceInCalendarDays(examDate, today));
    // If examDate <= today, schedule for today only
    if (daysAvailable < 1) daysAvailable = 1;

    const totalMinutes = (exam.studyItems.reduce((s, it) => s + (it.effortMinutes ?? 60), 0));
    const minutesPerDay = Math.ceil(totalMinutes / daysAvailable);

    // distribute per study item across days
    let dayIdx = 0;
    exam.studyItems.forEach((it) => {
      let remaining = it.effortMinutes ?? 60;
      while (remaining > 0) {
        const date = format(addDays(today, dayIdx), "yyyy-MM-dd");
        if (!daysMap[date]) daysMap[date] = { date, tasks: [] };
        const take = Math.min(remaining, minutesPerDay, dailyMinutes);
        daysMap[date].tasks.push({
          examId: exam.id,
          studyItemId: it.id,
          title: `${exam.title}: ${it.title}`,
          minutes: take,
        });
        remaining -= take;
        dayIdx = Math.min(dayIdx + 1, daysAvailable - 1);
      }
      // rotate to next day for next item
      dayIdx = Math.min(dayIdx + 1, daysAvailable - 1);
    });
  });

  const days = Object.values(daysMap).sort((a, b) => a.date.localeCompare(b.date));
  return { days, meta: { generatedAt: new Date().toISOString(), source: "local-mock" } };
}