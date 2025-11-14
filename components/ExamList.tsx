import React from "react";
import { Exam } from "../types";
import { differenceInCalendarDays, parseISO } from "date-fns";

type Props = {
  exams: Exam[];
  onDelete: (id: string) => void;
};

export default function ExamList({ exams, onDelete }: Props) {
  return (
    <div className="card column">
      <h3 style={{ margin: 0 }}>Exams</h3>
      {exams.length === 0 ? (
        <div className="muted">No exams added yet.</div>
      ) : (
        <div className="column">
          {exams.map((e) => {
            const daysLeft = differenceInCalendarDays(parseISO(e.date), new Date());
            return (
              <div key={e.id} className="exam-item">
                <div>
                  <div style={{ fontWeight: 700 }}>{e.title} <span className="muted">({e.date})</span></div>
                  <div className="muted">{e.studyItems.length} topics • {daysLeft >= 0 ? `${daysLeft} day(s) left` : "due"} </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn secondary small" onClick={() => onDelete(e.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}