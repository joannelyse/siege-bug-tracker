import { SEVERITIES, STATUSES } from "../data/constants";

export function SeverityBadge({ severity }) {
  var s = SEVERITIES[severity];
  if (!s) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 600,
        color: s.color,
        background: s.color + "15",
        border: "1px solid " + s.color + "30",
        letterSpacing: 0.5,
      }}
    >
      {s.label}
    </span>
  );
}

export function StatusBadge({ status }) {
  var s = STATUSES[status];
  if (!s) return null;

  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 600,
        color: s.color,
        background: s.color + "15",
        letterSpacing: 0.5,
      }}
    >
      {s.label}
    </span>
  );
}