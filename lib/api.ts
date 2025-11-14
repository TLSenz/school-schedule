import { Exam, GeneratedSchedule } from "../types";

/**
 * Calls backend to generate schedule via ChatGPT API.
 * Endpoint (server) to implement:
 * POST /api/v1/schedule/generate
 *
 * Payload:
 * { exams: Exam[], options?: { dailyMinutes?: number } }
 *
 * Response: GeneratedSchedule
 */
export async function generateScheduleBackend(exams: Exam[], options?: { dailyMinutes?: number }): Promise<GeneratedSchedule> {
  const res = await fetch("/api/v1/schedule/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exams, options }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Backend error: ${res.status} ${txt}`);
  }
  const json = (await res.json()) as GeneratedSchedule;
  return json;
}