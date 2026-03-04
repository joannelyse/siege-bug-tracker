# Siege Bug Tracker

A QA bug tracking tool designed for Rainbow Six Siege testing
workflows. Built to practice and demonstrate the skills used by
development testers in AAA game studios such as bug identification,
reproduction, severity classification, and structured reporting.

<img width="800" height="450" alt="Page1" src="https://github.com/user-attachments/assets/649f4b4b-9ef2-4324-bfcb-bc28e0f53eb0" />
<img width="800" height="450" alt="Page2" src="https://github.com/user-attachments/assets/1f7e3152-34c0-4127-aa3b-bf0024a8c46e" />
<img width="800" height="450" alt="Page3" src="https://github.com/user-attachments/assets/430a731d-c8e6-46af-9c34-4d487e57ee19" />


## Why I Built This

I'm pursuing a career in game QA testing and wanted a hands-on way to
practice professional testing workflows. This tool imitates the
processes dev test teams use like logging bugs with structured
reproduction steps, classifying severity using industry-standard
scales, tracking bug lifecycle from Open through Resolved, and
communicating findings to a development team.

## Features

- **Dashboard** — An overview of bug statistics with severity
  breakdown and recent reports
- **Bug List** — Searchable and filterable by severity and status
- **Bug Detail View** — Full report with reproduction steps,
  expected vs actual behavior, and metadata
- **Status Management** — Track bugs through Open, In Progress,
  Resolved, and Closed
- **New Bug Form** — Submit reports with severity, probability,
  platform, map, operator, build version, date, and reporter
- **R6S Themed UI** — Dark interface inspired by the Siege
  in-game aesthetic

## QA Methodology

Each bug report follows the format used in professional game
development:

- **Severity** (Critical / Major / Minor / Trivial)
- **Probability** (Always / Often / Sometimes / Rarely)
- **Platform** (PC / PS5 / Xbox Series / All)
- **Game mode** (Ranked / Quick Match / Unranked / Customs / Training Grounds)
- **Map, Operator, Build Version & Reporter**
- **Numbered reproduction steps**
- **Expected vs actual behavior**
- **Workaround documentation**

## Running Locally
```bash
git clone https://github.com/joannelyse/siege-bug-tracker.git
cd siege-bug-tracker
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

## Built With

- React
- Custom components

## Author

**Joanna McCormack** — [GitHub](https://github.com/joannelyse)
