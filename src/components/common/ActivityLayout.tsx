import React from "react";

interface Props {
  title: string;
  titleHe: string;
  emoji: string;
  onBack: () => void;
  children: React.ReactNode;
}

export default function ActivityLayout({ title, titleHe, emoji, onBack, children }: Props) {
  return (
    <div className="activity-layout">
      <header className="activity-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <div className="activity-title-group">
          <span className="activity-emoji">{emoji}</span>
          <div>
            <h1 className="activity-title">{title}</h1>
            <p className="activity-title-he" dir="rtl">{titleHe}</p>
          </div>
        </div>
      </header>
      <main className="activity-main">{children}</main>
    </div>
  );
}
