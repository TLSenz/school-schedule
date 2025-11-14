"use client";
import React, { useEffect, useState } from "react";
import ExamForm from "../components/ExamForm";
import ExamList from "../components/ExamList";
import ScheduleView from "../components/ScheduleView";
import { loadExams, saveExams } from "../lib/storage";
import { Exam } from "../types";
import { generateScheduleBackend } from "../lib/api";
import { generateScheduleLocal } from "../lib/mockScheduler";

export default function Page() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [schedule, setSchedule] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [useMockWhenFail] = useState(true);

  useEffect(() => {
    setExams(loadExams());
  }, []);

  useEffect(() => {
    saveExams(exams);
  }, [exams]);

  function handleAdd(exam: Exam) {
    setExams((s) => [...s, exam]);
  }

  function handleDelete(id: string) {
    setExams((s) => s.filter((e) => e.id !== id));
  }

  async function handleGenerate() {
    if (exams.length === 0) return alert("Add at least one exam");
    setLoading(true);
    try {
      const res = await generateScheduleBackend(exams, { dailyMinutes: 120 });
      setSchedule(res);
    } catch (err) {
      console.error("Backend schedule generation failed:", err);
      if (useMockWhenFail) {
        const res = generateScheduleLocal(exams, 90);
        setSchedule(res);
      } else {
        alert("Failed to generate schedule from backend. See console.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 16 }}>
        <h1>School Scheduler</h1>
        <div className="muted">Generate study plan with ChatGPT API</div>
      </div>

      <div className="row" style={{ gap: 16 }}>
        <div style={{ flex: 1 }}>
          <ExamForm onAdd={handleAdd} />
          <div style={{ height: 16 }} />
          <ExamList exams={exams} onDelete={handleDelete} />
          <div style={{ height: 12 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate schedule (uses /api/v1/schedule/generate)"}
            </button>
            <button
              className="btn secondary"
              onClick={() => {
                setExams([]);
                setSchedule(null);
                localStorage.removeItem("school_scheduler_exams_v1");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div style={{ width: 520 }}>
          <ScheduleView schedule={schedule} />
        </div>
      </div>

      <div style={{ height: 32 }} />

      <div className="card muted">
        Note: This frontend expects an API that follows the included openapi.yaml. If the backend is not implemented yet the app uses a local mock scheduler so you can try the UI.
      </div>
    </div>
  );
}