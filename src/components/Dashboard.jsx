import { SEVERITIES } from "../data/constants";
import { SeverityBadge, StatusBadge } from "./Badges";

export default function Dashboard({ stats, bugs, onViewBug, onNavigate }) {
  var recentBugs = bugs.slice(0, 5);

  // Count bugs per severity for the breakdown panel
  var severityCounts = Object.keys(SEVERITIES).map(function (key) {
    return {
      key: key,
      label: SEVERITIES[key].label,
      color: SEVERITIES[key].color,
      count: bugs.filter(function (b) {
        return b.severity === key;
      }).length,
    };
  });

  // Config for the four stat cards
  var cards = [
    {
      label: "TOTAL BUGS",
      value: stats.total,
      accent: "#f97316",
      glow: "249,115,22",
    },
    {
      label: "OPEN",
      value: stats.open,
      accent: "#3b82f6",
      glow: "59,130,246",
    },
    {
      label: "CRITICAL",
      value: stats.critical,
      accent: "#ef4444",
      glow: "239,68,68",
    },
    {
      label: "RESOLVED",
      value: stats.resolved,
      accent: "#22c55e",
      glow: "34,197,94",
    },
  ];

  var panelStyle = {
    background: "#1f1f1f",
    border: "1px solid #2e2e2e",
    borderRadius: 8,
    padding: 20,
  };

  return (
    <div>
      {/* Page title */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#e2e8f0",
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          Overview
        </h1>
        <p
          style={{
            fontSize: 12,
            color: "#475569",
            margin: "4px 0 0",
            letterSpacing: 0.5,
          }}
        >
          Rainbow Six Siege QA Overview
        </p>
      </div>

      {/* Stat cards row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {cards.map(function (card, i) {
          return (
            <div
              key={card.label}
              style={{
                background: "#1f1f1f",
                border: "1px solid #2e2e2e",
                borderRadius: 8,
                padding: "20px 20px 16px",
                position: "relative",
                overflow: "hidden",
                animation: "fadeIn 0.4s " + i * 0.08 + "s both",
              }}
            >
              {/* Colored accent line at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background:
                    "linear-gradient(90deg,transparent," +
                    card.accent +
                    ",transparent)",
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: "#64748b",
                  letterSpacing: 2,
                  marginBottom: 8,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: card.accent,
                  textShadow:
                    "0 0 30px rgba(" + card.glow + ",0.3)",
                  lineHeight: 1,
                }}
              >
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column layout: severity breakdown + recent bugs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 20,
        }}
      >
        {/* Left: Severity breakdown */}
        <div style={panelStyle}>
          <div
            style={{
              fontSize: 11,
              color: "#64748b",
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            SEVERITY BREAKDOWN
          </div>
          {severityCounts.map(function (s) {
            var percentage = bugs.length
              ? (s.count / bugs.length) * 100
              : 0;
            return (
              <div
                key={s.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                {/* Colored dot */}
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: s.color,
                    boxShadow: "0 0 8px " + s.color + "60",
                  }}
                />
                <span
                  style={{ fontSize: 12, color: "#94a3b8", flex: 1 }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.count}
                </span>
                {/* Mini progress bar */}
                <div
                  style={{
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    background: "#2e2e2e",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: percentage + "%",
                      height: "100%",
                      borderRadius: 2,
                      background: s.color,
                      transition:
                        "width 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Recent reports */}
        <div style={panelStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{ fontSize: 11, color: "#64748b", letterSpacing: 2 }}
            >
              RECENT REPORTS
            </div>
            <button
              onClick={function () {
                onNavigate("list");
              }}
              style={{
                fontSize: 10,
                color: "#f97316",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: 1,
                fontFamily: "inherit",
              }}
            >
              VIEW ALL →
            </button>
          </div>

          {recentBugs.map(function (bug) {
            return (
              <div
                key={bug.id}
                onClick={function () {
                  onViewBug(bug);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  marginBottom: 4,
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = "#2a2a2a";
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    color: SEVERITIES[bug.severity].color,
                    fontSize: 10,
                  }}
                >
                  ●
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#475569",
                    minWidth: 70,
                  }}
                >
                  {bug.id}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "#cbd5e1",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {bug.title}
                </span>
                <StatusBadge status={bug.status} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}