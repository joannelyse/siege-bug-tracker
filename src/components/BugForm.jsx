import { useState } from "react";
import {
  SEVERITIES,
  PLATFORMS,
  GAME_MODES,
  PROBABILITIES,
} from "../data/constants";

export default function BugForm({ onSubmit, onCancel }) {
  var [form, setForm] = useState({
    title: "",
    severity: "major",
    status: "open",
    probability: "Sometimes",
    platform: "PC",
    gameMode: "Ranked",
    map: "",
    operator: "",
    build: "",
    steps: "",
    expected: "",
    actual: "",
    workaround: "",
    date: new Date().toISOString().split("T")[0],
    reporter: "",
  });

  // Generic change handler
  function handleChange(fieldName) {
    return function (e) {
      setForm(function (prev) {
        return { ...prev, [fieldName]: e.target.value };
      });
    };
  }

  function handleSubmit() {
    // Basic validation
    if (!form.title.trim()) {
      alert("Please enter a bug title");
      return;
    }
    onSubmit(form);
  }

  var inputStyle = {
    width: "100%",
    padding: "8px 12px",
    fontSize: 12,
    fontFamily: "inherit",
    backgroundColor: "#141414",
    border: "1px solid #2e2e2e",
    borderRadius: 6,
    color: "#e2e8f0",
    outline: "none",
    boxSizing: "border-box",
  };

  var labelStyle = {
    fontSize: 10,
    color: "#64748b",
    letterSpacing: 1.5,
    marginBottom: 6,
    display: "block",
  };

  // Configuration for the dropdown fields
  var dropdowns = [
    {
      key: "severity",
      label: "SEVERITY",
      options: Object.entries(SEVERITIES).map(function ([k, v]) {
        return { value: k, label: v.label };
      }),
    },
    {
      key: "probability",
      label: "PROBABILITY",
      options: PROBABILITIES.map(function (p) {
        return { value: p, label: p };
      }),
    },
    {
      key: "platform",
      label: "PLATFORM",
      options: PLATFORMS.map(function (p) {
        return { value: p, label: p };
      }),
    },
    {
      key: "gameMode",
      label: "GAME MODE",
      options: GAME_MODES.map(function (m) {
        return { value: m, label: m };
      }),
    },
  ];

  // Configuration for the text input fields
  var textInputs = [
    { key: "map", label: "MAP", placeholder: "e.g., Coastline" },
    { key: "operator", label: "OPERATOR", placeholder: "e.g., Fenrir" },
    { key: "build", label: "BUILD VERSION", placeholder: "e.g., Y9S1.2" },
  ];

  // Configuration for the textarea fields
  var textareas = [
    {
      key: "steps",
      label: "STEPS TO REPRODUCE *",
      placeholder: "1. First step\n2. Second step\n3. ...",
      rows: 5,
    },
    {
      key: "expected",
      label: "EXPECTED RESULT",
      placeholder: "What should happen",
      rows: 2,
    },
    {
      key: "actual",
      label: "ACTUAL RESULT",
      placeholder: "What actually happens",
      rows: 2,
    },
    {
      key: "workaround",
      label: "WORKAROUND",
      placeholder: "Any temporary fix, or 'None'",
      rows: 2,
    },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#e2e8f0",
          margin: "0 0 24px",
        }}
      >
        Report New Bug
      </h1>

      <div
        style={{
          background: "#1f1f1f",
          border: "1px solid #2e2e2e",
          borderRadius: 8,
          padding: 28,
        }}
      >
        {/* Bug title - full width */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>BUG TITLE *</label>
          <input
            value={form.title}
            onChange={handleChange("title")}
            placeholder="Short, descriptive summary..."
            style={inputStyle}
          />
        </div>

        {/* Grid of dropdowns and text inputs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {/* Dropdown selects */}
          {dropdowns.map(function (field) {
            return (
              <div key={field.key}>
                <label style={labelStyle}>{field.label}</label>
                <select
                  value={form[field.key]}
                  onChange={handleChange(field.key)}
                  style={{ ...inputStyle, cursor: "pointer", paddingRight: 30 }}
                >
                  {field.options.map(function (opt) {
                    return (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}

          {/* Text inputs */}
          {textInputs.map(function (field) {
            return (
              <div key={field.key}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  value={form[field.key]}
                  onChange={handleChange(field.key)}
                  placeholder={field.placeholder}
                  style={inputStyle}
                />
              </div>
            );
          })}

          {/* Date input */}
          <div>
            <label style={labelStyle}>DATE</label>
            <input
              type="date"
              value={form.date}
              onChange={handleChange("date")}
              style={inputStyle}
            />
          </div>

          {/* Reporter input */}
          <div>
            <label style={labelStyle}>REPORTER</label>
            <input
              value={form.reporter}
              onChange={handleChange("reporter")}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Textarea fields */}
        {textareas.map(function (field) {
          return (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{field.label}</label>
              <textarea
                value={form[field.key]}
                onChange={handleChange(field.key)}
                placeholder={field.placeholder}
                rows={field.rows}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
              />
            </div>
          );
        })}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 28px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "inherit",
              background:
                "linear-gradient(135deg, #f97316, #ea580c)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              letterSpacing: 1,
              boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
            }}
          >
            SUBMIT BUG REPORT
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 28px",
              fontSize: 12,
              fontFamily: "inherit",
              background: "transparent",
              color: "#64748b",
              border: "1px solid #2e2e2e",
              borderRadius: 6,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}