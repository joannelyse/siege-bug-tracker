import { useState } from "react";
import Dashboard from "./components/Dashboard";
import BugList from "./components/BugList";
import BugDetail from "./components/BugDetail";
import BugForm from "./components/BugForm";
import { SAMPLE_BUGS } from "./data/constants";

// Simple ID generator
let idCounter = 5;
function nextId() {
  const id = "R6S-" + String(idCounter).padStart(3, "0");
  idCounter++;
  return id;
}

export default function App() {
  const [bugs, setBugs] = useState(SAMPLE_BUGS);
  const [view, setView] = useState("dashboard");
  const [selectedBug, setSelectedBug] = useState(null);
  const [filters, setFilters] = useState({
    severity: "all",
    status: "all",
    search: "",
  });

  // Filter bugs based on current filters
  const filteredBugs = bugs.filter(function (b) {
    if (filters.severity !== "all" && b.severity !== filters.severity)
      return false;
    if (filters.status !== "all" && b.status !== filters.status) return false;
    if (
      filters.search &&
      !b.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !b.id.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  // Compute stats for the dashboard
  const stats = {
    total: bugs.length,
    open: bugs.filter(function (b) {
      return b.status === "open";
    }).length,
    critical: bugs.filter(function (b) {
      return (
        b.severity === "critical" &&
        b.status !== "closed" &&
        b.status !== "resolved"
      );
    }).length,
    resolved: bugs.filter(function (b) {
      return b.status === "resolved" || b.status === "closed";
    }).length,
  };

  // Handlers
  function openBug(bug) {
    setSelectedBug(bug);
    setView("detail");
  }

  function addBug(bugData) {
    var newBug = { ...bugData, id: nextId() };
    setBugs(function (prev) {
      return [newBug, ...prev];
    });
    setView("list");
  }

  function updateStatus(id, newStatus) {
    setBugs(function (prev) {
      return prev.map(function (b) {
        return b.id === id ? { ...b, status: newStatus } : b;
      });
    });
    setSelectedBug(function (prev) {
      return { ...prev, status: newStatus };
    });
  }

  function updateFilter(key, value) {
    setFilters(function (prev) {
      return { ...prev, [key]: value };
    });
  }

  // Styles
  var containerStyle = {
    minHeight: "100vh",
    background: "#141414",
    fontFamily: "'JetBrains Mono','SF Mono','Fira Code',monospace",
    color: "#c8d6e5",
  };

  var scanlineStyle = {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 100,
    background:
      "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)",
  };

  var navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "linear-gradient(180deg,#1c1c1c,#141414)",
    borderBottom: "1px solid #2a2a2a",
    position: "sticky",
    top: 0,
    zIndex: 50,
  };

  var logoStyle = {
    width: 32,
    height: 32,
    borderRadius: 6,
    background: "linear-gradient(135deg,#f97316,#ea580c)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 900,
    color: "#fff",
    boxShadow: "0 0 20px rgba(249,115,22,0.3)",
  };

  var contentStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px 24px 80px",
  };

  // Navigation tabs
  var tabs = [
    { key: "dashboard", label: "DASHBOARD" },
    { key: "list", label: "BUG LIST" },
    { key: "new", label: "+ NEW BUG" },
  ];

  return (
    <div style={containerStyle}>
      {/* Scanline overlay for tactical CRT feel */}
      <div style={scanlineStyle} />

      {/* Navigation bar */}
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={logoStyle}>R6</div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#e2e8f0",
              textTransform: "uppercase",
            }}
          >
            Siege Bug Tracker
          </span>
          <span
            style={{
              fontSize: 9,
              padding: "2px 8px",
              borderRadius: 4,
              background: "rgba(249,115,22,0.15)",
              color: "#fb923c",
              border: "1px solid rgba(249,115,22,0.3)",
              letterSpacing: 1,
            }}
          >
            QA TOOL v1.0
          </span>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(function (tab) {
            var isActive = view === tab.key;
            return (
              <button
                key={tab.key}
                onClick={function () {
                  setView(tab.key);
                  setSelectedBug(null);
                }}
                style={{
                  padding: "6px 16px",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  border: "1px solid",
                  borderColor: isActive ? "#f97316" : "transparent",
                  background: isActive
                    ? "rgba(249,115,22,0.1)"
                    : "transparent",
                  color: isActive ? "#fb923c" : "#64748b",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main content area */}
      <div style={contentStyle}>
        {view === "dashboard" && (
          <Dashboard
            stats={stats}
            bugs={bugs}
            onViewBug={openBug}
            onNavigate={setView}
          />
        )}

        {view === "list" && (
          <BugList
            bugs={filteredBugs}
            filters={filters}
            onFilterChange={updateFilter}
            onViewBug={openBug}
          />
        )}

        {view === "detail" && selectedBug && (
          <BugDetail
            bug={selectedBug}
            onBack={function () {
              setView("list");
            }}
            onUpdateStatus={updateStatus}
          />
        )}

        {view === "new" && (
          <BugForm
            onSubmit={addBug}
            onCancel={function () {
              setView("list");
            }}
          />
        )}
      </div>

      <style>
        {
          "@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} select option{background:#1f1f1f;color:#e2e8f0}"
        }
      </style>
    </div>
  );
}