export const SEVERITIES = {
  critical: { label: "Critical", color: "#ef4444" },
  major:    { label: "Major",    color: "#f97316" },
  minor:    { label: "Minor",    color: "#eab308" },
  trivial:  { label: "Trivial",  color: "#22c55e" },
};

export const STATUSES = {
  open:        { label: "Open",        color: "#3b82f6" },
  in_progress: { label: "In Progress", color: "#a855f7" },
  resolved:    { label: "Resolved",    color: "#22c55e" },
  closed:      { label: "Closed",      color: "#6b7280" },
};

export const PLATFORMS = ["PC", "PS5", "Xbox Series X|S", "All"];
export const GAME_MODES = ["Ranked", "Quick Match", "Unranked", "Custom", "Training Grounds"];
export const PROBABILITIES = ["Always", "Often", "Sometimes", "Rarely"];
export const SAMPLE_BUGS = [
  {
    id: "R6S-001",
    title: "Game crashes when deploying Fenrir gadget near reinforced hatch",
    severity: "critical",
    status: "open",
    probability: "Often",
    platform: "PC",
    gameMode: "Ranked",
    map: "Coastline",
    operator: "Fenrir",
    build: "Y9S1.2",
    date: "2026-02-28",
    reporter: "QA Tester",
    steps:
      "1. Select Fenrir on defense\n" +
      "2. Navigate to 2F Hookah Lounge\n" +
      "3. Place Dread Mine directly adjacent to reinforced hatch\n" +
      "4. Game freezes and crashes to desktop",
    expected: "Dread Mine deploys normally near reinforced surfaces",
    actual:
      "Application crash with no error code. Event Viewer shows access violation.",
    workaround: "Place gadget at least 1m away from reinforced hatches",
  },
  {
    id: "R6S-002",
    title: "Drone clipping through closed barricade on Villa balcony",
    severity: "major",
    status: "in_progress",
    probability: "Sometimes",
    platform: "All",
    gameMode: "Quick Match",
    map: "Villa",
    operator: "Twitch",
    build: "Y9S1.2",
    date: "2026-02-27",
    reporter: "QA Tester",
    steps:
      "1. Start Prep Phase as Twitch\n" +
      "2. Drive Shock Drone to 2F Aviator balcony door\n" +
      "3. Approach barricade at roughly 30 degree angle from the left\n" +
      "4. Drone clips through without breaking barricade",
    expected: "Drone should be blocked by intact barricade",
    actual: "Drone passes through barricade mesh without destroying it",
    workaround: "None",
  },
  {
    id: "R6S-003",
    title: "Kill feed shows wrong operator icon after mid-round switch",
    severity: "minor",
    status: "open",
    probability: "Rarely",
    platform: "PC",
    gameMode: "Quick Match",
    map: "Oregon",
    operator: "Sledge",
    build: "Y9S1.2",
    date: "2026-03-01",
    reporter: "QA Tester",
    steps:
      "1. Pick Sledge during operator select\n" +
      "2. Another player leaves and you get re-pick opportunity\n" +
      "3. Switch to Thatcher\n" +
      "4. Get a kill during the round",
    expected: "Kill feed displays Thatcher icon",
    actual:
      "Kill feed displays Sledge icon despite playing as Thatcher",
    workaround: "Visual only - no gameplay impact",
  },
  {
    id: "R6S-004",
    title: "Typo in Kafe Dostoyevsky loading screen tip #14",
    severity: "trivial",
    status: "closed",
    probability: "Always",
    platform: "All",
    gameMode: "Ranked",
    map: "Kafe Dostoyevsky",
    operator: "N/A",
    build: "Y9S1.1",
    date: "2026-02-20",
    reporter: "QA Tester",
    steps:
      "1. Queue for a match on Kafe Dostoyevsky\n" +
      "2. Observe loading screen tips\n" +
      "3. Tip #14 reads 'Rienforce hatches' instead of 'Reinforce'",
    expected:
      "Correct spelling: Reinforce hatches to slow the enemy advance",
    actual:
      "Misspelled as: Rienforce hatches to slow the enemy advance",
    workaround: "N/A - cosmetic only",
  },
];