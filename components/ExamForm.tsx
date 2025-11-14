import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Exam, StudyItem } from "../types";

type Props = {
  onAdd: (exam: Exam) => void;
};

export default function ExamForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [topicsText, setTopicsText] = useState(""); // comma-separated topics

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !date) return alert("Please enter title and date");
    const topicTitles = topicsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const studyItems: StudyItem[] = topicTitles.map((t) => ({ id: uuidv4(), title: t, effortMinutes: 60 }));
    const exam: Exam = { id: uuidv4(), title, date, studyItems };
    onAdd(exam);
    setTitle("");
    setDate("");
    setTopicsText("");
  }

  return (
    <form onSubmit={handleSubmit} className="card column">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Add Exam</h3>
        <div className="muted">Dates are YYYY-MM-DD</div>
      </div>

      <input className="input" placeholder="Exam title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <textarea className="input" placeholder="Topics / things to learn (comma separated)" value={topicsText} onChange={(e) => setTopicsText(e.target.value)} />

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn small" type="submit">Add Exam</button>
      </div>
    </form>
  );
}