import type { ActivityMeta } from "../../types";

interface Props {
  activity: ActivityMeta;
  onClick: () => void;
}

export default function DashboardCard({ activity, onClick }: Props) {
  return (
    <button
      className="dashboard-card"
      style={{ "--card-accent": activity.color } as React.CSSProperties}
      onClick={onClick}
    >
      <span className="dashboard-card-emoji">{activity.emoji}</span>
      <div className="dashboard-card-content">
        <h3 className="dashboard-card-title">{activity.title}</h3>
        <p className="dashboard-card-title-he" dir="rtl">{activity.titleHe}</p>
        <p className="dashboard-card-desc">{activity.description}</p>
      </div>
      <span className="dashboard-card-arrow">→</span>
    </button>
  );
}
