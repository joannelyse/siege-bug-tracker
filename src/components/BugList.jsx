import { SEVERITIES, STATUSES } from "../data/constants";
import { SeverityBadge, StatusBadge } from "./Badges";

export default function BugList({
  bugs,
  filters,
  onFilterChange,
  onViewBug,
}) {
  var inputStyle = {
    padding: "8px 14px",
    fontSize: 12,
    fontFamily: "inherit",
    backgroundColor: "#1f1f1f",
    border: "1px solid #2e2e2e",
    borderRadius: 6,
    color: "#e2e8f0",
    outline: "none",
    cursor: "pointer",
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#e2e8f0",
            margin: 0,
          }}
        >
          Bug Reports
        </h1>
        <p style={{ fontSize: 12, color: "#475569", margin: "4px 0 0" }}>
          {bugs.length} results
        </p>
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search bugs..."
          value={filters.search}
          onChange={function (e) {
            onFilterChange("search", e.target.value);
          }}
          style={{ ...inputStyle, width: 220, cursor: "text" }}
        />

        {/* Severity filter */}
        <select
          value={filters.severity}
          onChange={function (e) {
            onFilterChange("severity", e.target.value);
          }}
          style={{ ...inputStyle, paddingRight: 30 }}
        >
          <option value="all">All Severities</option>
          {Object.entries(SEVERITIES).map(function ([key, val]) {
            return (
              <option key={key} value={key}>
                {val.label}
              </option>
            );
          })}
        </select>

        {/* Status filter */}
        <select
          value={filters.status}
          onChange={function (e) {
            onFilterChange("status", e.target.value);
          }}
          style={{ ...inputStyle, paddingRight: 30 }}
        >
          <option value="all">All Statuses</option>
          {Object.entries(STATUSES).map(function ([key, val]) {
            return (
              <option key={key} value={key}>
                {val.label}
              </option>
            );
          })}
        </select>
      </div>

      {/* Bug table */}
      <div
        style={{
          background: "#1f1f1f",
          border: "1px solid #2e2e2e",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 100px 110px 100px 90px",
            padding: "10px 16px",
            background: "#191919",
            borderBottom: "1px solid #2e2e2e",
          }}
        >
          {["ID", "TITLE", "SEVERITY", "STATUS", "PLATFORM", "DATE"].map(
            function (header) {
              return (
                <span
                  key={header}
                  style={{
                    fontSize: 9,
                    color: "#475569",
                    letterSpacing: 2,
                    fontWeight: 600,
                  }}
                >
                  {header}
                </span>
              );
            }
          )}
        </div>

        {/* Table rows */}
        {bugs.length === 0 ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#475569",
              fontSize: 13,
            }}
          >
            No bugs match your filters
          </div>
        ) : (
          bugs.map(function (bug, i) {
            return (
              <div
                key={bug.id}
                onClick={function () {
                  onViewBug(bug);
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "80px 1fr 100px 110px 100px 90px",
                  padding: "12px 16px",
                  cursor: "pointer",
                  alignItems: "center",
                  borderBottom:
                    i < bugs.length - 1
                      ? "1px solid #242424"
                      : "none",
                  transition: "background 0.15s",
                  animation:
                    "fadeIn 0.3s " + i * 0.03 + "s both",
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = "#2a2a2a";
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 11, color: "#64748b" }}>
                  {bug.id}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "#e2e8f0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingRight: 12,
                  }}
                >
                  {bug.title}
                </span>
                <SeverityBadge severity={bug.severity} />
                <StatusBadge status={bug.status} />
                <span style={{ fontSize: 11, color: "#94a3b8" }}>
                  {bug.platform}
                </span>
                <span style={{ fontSize: 11, color: "#64748b" }}>
                  {bug.date}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}