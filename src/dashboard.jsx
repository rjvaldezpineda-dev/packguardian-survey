import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// 🔧 PASTE YOUR SUPABASE VALUES HERE
// ─────────────────────────────────────────────
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
// ─────────────────────────────────────────────

const QUESTION_LABELS = {
  most_asked: "Top Questions Trainers Always Hear",
  misconceptions: "Most Common Client Misconceptions",
  hardest_to_explain: "Hardest Concepts to Explain",
  top_behaviors: "Top Behavioral Problems",
  root_causes: "Most Common Root Causes",
  hardest_cases: "Hardest Case Types",
  owner_patterns: "Owner Behaviors That Sabotage Training",
  owner_type_hardest: "Hardest Type of Owner to Work With",
  what_owners_need: "What Owners Actually Need",
  wish_owners_knew: "What Owners Should Know Before Getting a Dog",
  underrated_skills: "Most Underrated Skills",
  training_method: "Trainer Philosophy",
  gap_in_market: "Gaps in Existing Apps/Resources",
  recommend_likelihood: "Likelihood to Recommend an App",
  trainer_years: "Years of Experience",
};

const SECTION_MAP = {
  most_asked: { label: "Questions You Always Hear", color: "#C0392B" },
  misconceptions: { label: "Questions You Always Hear", color: "#C0392B" },
  hardest_to_explain: { label: "Questions You Always Hear", color: "#C0392B" },
  top_behaviors: { label: "Problems You See Most", color: "#1A6B9A" },
  root_causes: { label: "Problems You See Most", color: "#1A6B9A" },
  hardest_cases: { label: "Problems You See Most", color: "#1A6B9A" },
  owner_patterns: { label: "The Owner Problem", color: "#7D3C98" },
  owner_type_hardest: { label: "The Owner Problem", color: "#7D3C98" },
  what_owners_need: { label: "The Owner Problem", color: "#7D3C98" },
  wish_owners_knew: { label: "Your Expertise", color: "#1E8449" },
  underrated_skills: { label: "Your Expertise", color: "#1E8449" },
  training_method: { label: "Your Expertise", color: "#1E8449" },
  gap_in_market: { label: "PackGuardian Fit", color: "#D35400" },
  recommend_likelihood: { label: "PackGuardian Fit", color: "#D35400" },
  trainer_years: { label: "PackGuardian Fit", color: "#D35400" },
};

async function fetchResponses() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/survey_responses?select=answers,submitted_at&order=submitted_at.desc`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function tally(responses, questionId) {
  const counts = {};
  for (const r of responses) {
    const a = r.answers?.[questionId];
    if (!a) continue;
    const items = Array.isArray(a) ? a : [a];
    for (const item of items) {
      counts[item] = (counts[item] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count, pct: Math.round((count / responses.length) * 100) }));
}

function BarChart({ data, color, total }) {
  const max = data[0]?.count || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.slice(0, 8).map(({ label, count, pct }) => (
        <div key={label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 12, color: "#ccc", flex: 1, paddingRight: 12, lineHeight: 1.4 }}>{label}</span>
            <span style={{ fontSize: 12, color: "#666", whiteSpace: "nowrap" }}>{count} · {pct}%</span>
          </div>
          <div style={{ height: 6, background: "#222", borderRadius: 3 }}>
            <div style={{
              height: "100%", borderRadius: 3,
              width: `${(count / max) * 100}%`,
              background: color,
              transition: "width 0.6s ease",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ background: "#1A1A1A", borderRadius: 12, padding: "20px 24px", border: "1px solid #222", flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: color || "#fff", letterSpacing: "-1px" }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#aaa", margin: "4px 0 2px" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#555" }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQ, setActiveQ] = useState("top_behaviors");
  const [lastRefresh, setLastRefresh] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchResponses();
      setResponses(data);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const allQuestionIds = Object.keys(QUESTION_LABELS);
  const activeData = tally(responses, activeQ);
  const activeColor = SECTION_MAP[activeQ]?.color || "#888";

  // Group questions by section
  const sections = {};
  for (const [qid, meta] of Object.entries(SECTION_MAP)) {
    if (!sections[meta.label]) sections[meta.label] = { color: meta.color, questions: [] };
    sections[meta.label].questions.push(qid);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "#141414", borderBottom: "1px solid #1e1e1e", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px" }}>🐾 PackGuardian</span>
          <span style={{ color: "#444", fontSize: 13, marginLeft: 12 }}>Trainer Survey Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {lastRefresh && <span style={{ color: "#444", fontSize: 11 }}>Refreshed {lastRefresh.toLocaleTimeString()}</span>}
          <button onClick={load} disabled={loading}
            style={{ background: "#222", border: "1px solid #333", borderRadius: 8, padding: "8px 16px", color: "#aaa", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
            {loading ? "Loading…" : "↻ Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "#1a0a0a", border: "1px solid #C0392B", borderRadius: 10, margin: "24px 32px", padding: "16px 20px", color: "#e88", fontSize: 13 }}>
          ⚠️ Could not load data: {error}. Check your Supabase URL and key.
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        {/* Top stats */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <StatCard label="Total Responses" value={responses.length} sub="trainers surveyed" color="#D35400" />
          <StatCard label="Most Common Problem" value={tally(responses, "top_behaviors")[0]?.label?.split(" ")[0] + "…" || "—"} sub={tally(responses, "top_behaviors")[0] ? `${tally(responses, "top_behaviors")[0].pct}% of trainers` : ""} color="#1A6B9A" />
          <StatCard label="Biggest Misconception" value={tally(responses, "misconceptions")[0]?.pct + "%" || "—"} sub={tally(responses, "misconceptions")[0]?.label?.slice(0, 30) + "…" || ""} color="#C0392B" />
          <StatCard label="Top Gap in Market" value={tally(responses, "gap_in_market")[0]?.pct + "%" || "—"} sub={tally(responses, "gap_in_market")[0]?.label?.slice(0, 30) + "…" || ""} color="#1E8449" />
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {/* Sidebar question picker */}
          <div style={{ width: 240, flexShrink: 0 }}>
            <p style={{ color: "#444", fontSize: 11, textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px", fontWeight: 700 }}>Questions</p>
            {Object.entries(sections).map(([sectionLabel, { color, questions }]) => (
              <div key={sectionLabel} style={{ marginBottom: 20 }}>
                <p style={{ color, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 800, margin: "0 0 6px" }}>{sectionLabel}</p>
                {questions.map((qid) => (
                  <button key={qid} onClick={() => setActiveQ(qid)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "7px 10px", borderRadius: 6,
                      background: activeQ === qid ? color + "22" : "transparent",
                      border: `1px solid ${activeQ === qid ? color : "transparent"}`,
                      color: activeQ === qid ? "#fff" : "#555",
                      fontSize: 12, cursor: "pointer", marginBottom: 2,
                      lineHeight: 1.4, transition: "all 0.15s",
                    }}>
                    {QUESTION_LABELS[qid]}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Main chart area */}
          <div style={{ flex: 1 }}>
            <div style={{ background: "#1A1A1A", borderRadius: 14, padding: "28px", border: "1px solid #222" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <span style={{ background: activeColor, color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 800, display: "inline-block", marginBottom: 8 }}>
                    {SECTION_MAP[activeQ]?.label}
                  </span>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: "-0.5px", lineHeight: 1.3 }}>
                    {QUESTION_LABELS[activeQ]}
                  </h2>
                </div>
                <span style={{ color: "#444", fontSize: 12, flexShrink: 0, marginLeft: 16 }}>{responses.length} responses</span>
              </div>

              {loading ? (
                <div style={{ color: "#444", fontSize: 14, textAlign: "center", padding: "40px 0" }}>Loading responses…</div>
              ) : responses.length === 0 ? (
                <div style={{ color: "#444", fontSize: 14, textAlign: "center", padding: "40px 0" }}>
                  No responses yet. Share the survey link with trainers to get started.
                </div>
              ) : activeData.length === 0 ? (
                <div style={{ color: "#444", fontSize: 14, textAlign: "center", padding: "40px 0" }}>
                  No answers for this question yet.
                </div>
              ) : (
                <BarChart data={activeData} color={activeColor} total={responses.length} />
              )}
            </div>

            {/* Raw response log */}
            {responses.length > 0 && (
              <div style={{ marginTop: 20, background: "#1A1A1A", borderRadius: 14, padding: "20px 24px", border: "1px solid #222" }}>
                <p style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700, margin: "0 0 14px" }}>
                  Recent Submissions
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {responses.slice(0, 5).map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "#111", borderRadius: 8, fontSize: 12 }}>
                      <span style={{ color: "#666" }}>Trainer #{responses.length - i}</span>
                      <span style={{ color: "#444" }}>
                        {Object.keys(r.answers || {}).length} questions answered
                      </span>
                      <span style={{ color: "#333" }}>
                        {new Date(r.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
