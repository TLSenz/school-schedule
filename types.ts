export type StudyItem = {
  id: string;
  title: string;
  effortMinutes?: number; // optional estimated minutes to study this item
};

export type Exam = {
  id: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  studyItems: StudyItem[];
};

export type ScheduleDay = {
  date: string; // ISO date
  tasks: {
    examId: string;
    studyItemId: string;
    title: string;
    minutes: number;
  }[];
};

export type GeneratedSchedule = {
  days: ScheduleDay[];
  meta?: {
    generatedAt: string;
    source: "chatgpt" | "local-mock";
  };
};