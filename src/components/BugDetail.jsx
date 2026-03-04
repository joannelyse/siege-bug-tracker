import { SEVERITIES, STATUSES } from "../data/constants";
import { SeverityBadge, StatusBadge } from "./Badges";

export default function BugDetail({ bug, onBack, onUpdateStatus }) {
  var sev = SEVERITIES[bug.severity];
  var metaFields = [
    ["Map", bug.map],
    ["Operator", bug.operator],
    ["Platform", bug.platform],
    ["Mode", bug.gameMode],
    ["Build", bug.build],
    ["Probability", bug.probability],
    ["Date", bug.date],
    ["Reporter", bug.reporter],
  ];

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 20,
          background: "none",
          border: "none",
          color: "#64748b",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
          padding: 0,
        }}
      >
        ← Back to Bug List
      </button>

      <div
        style={{
          background: "#1f1f1f",
          border: "1px solid #2e2e2e",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* Header section with title and metadata */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid #2e2e2e",
            background:
              "linear-gradient(135deg," +
              sev.color +
              "08,transparent)",
          }}
        >
          {/* ID + badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, color: "#64748b" }}>
              {bug.id}
            </span>
            <SeverityBadge severity={bug.severity} />
            <StatusBadge status={bug.status} />
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 18,
              color: "#e2e8f0",
              margin: 0,
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {bug.title}
          </h2>

          {/* Metadata row */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            {metaFields.map(function (pair) {
              return (
                <div key={pair[0]}>
                  <div
                    style={{
                      fontSize: 9,
                      color: "#475569",
                      letterSpacing: 1.5,
                      marginBottom: 2,
                    }}
                  >
                    {pair[0].toUpperCase()}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    {pair[1] || "\u2014"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Body sections */}
        <div style={{ padding: "24px 28px" }}>
          <DetailSection
            title="Steps to Reproduce"
            content={bug.steps}
            mono={true}
          />
          <DetailSection title="Expected Result" content={bug.expected} />
          <DetailSection
            title="Actual Result"
            content={bug.actual}
            highlight={true}
          />
          <DetailSection title="Workaround" content={bug.workaround} />

          {/* Status update buttons */}
          <div
            style={{
              marginTop: 28,
              paddingTop: 20,
              borderTop: "1px solid #2e2e2e",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#64748b",
                letterSpacing: 2,
                marginBottom: 10,
              }}
            >
              UPDATE STATUS
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.entries(STATUSES).map(function ([key, s]) {
                var isActive = bug.status === key;
                return (
                  <button
                    key={key}
                    onClick={function () {
                      onUpdateStatus(bug.id, key);
                    }}
                    style={{
                      padding: "6px 14px",
                      fontSize: 11,
                      fontFamily: "inherit",
                      border:
                        "1px solid " +
                        (isActive ? s.color : "#2e2e2e"),
                      background: isActive
                        ? s.color + "15"
                        : "transparent",
                      color: isActive ? s.color : "#64748b",
                      borderRadius: 4,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for each detail section
function DetailSection({ title, content, mono, highlight }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 10,
          color: "#64748b",
          letterSpacing: 2,
          marginBottom: 8,
        }}
      >
        {title.toUpperCase()}
      </div>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          color: highlight ? "#fbbf24" : "#c8d6e5",
          whiteSpace: "pre-wrap",
          fontFamily: mono ? "inherit" : "inherit",
          background: mono ? "#141414" : "transparent",
          padding: mono ? 16 : 0,
          borderRadius: mono ? 6 : 0,
          border: mono ? "1px solid #2e2e2e" : "none",
        }}
      >
        {content}
      </div>
    </div>
  );
}