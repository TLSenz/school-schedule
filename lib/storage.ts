import { Exam } from "../types";
const STORAGE_KEY = "school_scheduler_exams_v1";

export function loadExams(): Exam[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Exam[];
  } catch {
    return [];
  }
}

export function saveExams(exams: Exam[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
}