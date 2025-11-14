import React from "react";
import { GeneratedSchedule } from "../types";

type Props = {
  schedule: GeneratedSchedule | null;
};

export default function ScheduleView({ schedule }: Props) {
  if (!schedule) return null;
  return (
    <div className="card column">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Generated Schedule</h3>
        <div className="muted">Source: {schedule.meta?.source ?? "unknown"}</div>
      </div>

      {schedule.days.length === 0 ? (
        <div className="muted">No tasks scheduled.</div>
      ) : (
        <div className="column">
          {schedule.days.map((d) => (
            <div key={d.date} style={{ borderTop: "1px solid #f1f5f9", paddingTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 700 }}>{d.date}</div>
                <div className="muted">{d.tasks.reduce((s, t) => s + t.minutes, 0)} min</div>
              </div>
              <div style={{ marginTop: 8 }}>
                {d.tasks.map((t, i) => (
                  <div key={i} style={{ padding: 6, borderRadius: 8, background: "#f8fafc", marginBottom: 6 }}>
                    <div style={{ fontWeight: 600 }}>{t.title}</div>
                    <div className="muted">{t.minutes} minutes</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}