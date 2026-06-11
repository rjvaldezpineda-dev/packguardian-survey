import { useState } from "react";

// ─────────────────────────────────────────────
// 🔧 PASTE YOUR SUPABASE VALUES HERE
// ─────────────────────────────────────────────
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
// ─────────────────────────────────────────────

const SECTIONS = [
  {
    id: "client_questions",
    label: "Questions You Always Hear",
    emoji: "🔁",
    color: "#C0392B",
    intro: "The questions clients ask that make you sigh internally — but still matter to them.",
    questions: [
      {
        id: "most_asked",
        type: "rank",
        question: "What are the questions you get asked MOST by new clients?",
        hint: "Select your top 5 and rank them",
        options: [
          "How long will this take?",
          "Is my dog too old to be trained?",
          "Am I the reason my dog is like this?",
          "Should I punish my dog when they do X?",
          "Why does my dog listen at home but not outside?",
          "How do I get the rest of my family on board?",
          "Will my dog ever be 'fully trained'?",
          "Is my dog's breed the problem?",
          "What treats should I use?",
          "How much training does my dog need each day?",
          "Is my dog dominant / trying to control me?",
          "Should I use a prong/e-collar/harness?",
          "Why does my dog do this ONLY with me?",
        ],
      },
      {
        id: "misconceptions",
        type: "multi",
        question: "What misconceptions do most clients walk in with?",
        hint: "Select all you encounter regularly",
        options: [
          "That training is a one-time fix",
          "That their dog 'knows' but is being stubborn",
          "That their dog is dominant or spiteful",
          "That small dogs don't need training",
          "That punishment is the fastest way to stop bad behavior",
          "That their breed can't be trained",
          "That the dog will 'grow out of it'",
          "That off-leash freedom is a right, not something earned",
          "That the problem only started recently (it didn't)",
          "That they just need one session",
          "That the dog loves them so it should listen",
          "That rescue dogs are permanently damaged",
        ],
      },
      {
        id: "hardest_to_explain",
        type: "multi",
        question: "Which concepts are genuinely hardest to get clients to understand?",
        hint: "Select all that apply",
        options: [
          "Consistency — everyone in the house must do the same thing",
          "Timing — correction/reward must happen within 2 seconds",
          "Management vs. training — preventing the behavior isn't fixing it",
          "Threshold — keeping the dog under their trigger threshold",
          "Relationship matters more than commands",
          "Their energy directly affects the dog",
          "What they do the other 23 hours matters more than 1 session",
          "Suppressing a behavior isn't the same as resolving it",
          "The dog isn't misbehaving to spite them",
          "Progress isn't linear",
        ],
      },
    ],
  },
  {
    id: "common_problems",
    label: "Problems You See Most",
    emoji: "📋",
    color: "#1A6B9A",
    intro: "The behavioral and household situations you encounter week after week.",
    questions: [
      {
        id: "top_behaviors",
        type: "multi",
        question: "What are the top behavioral problems clients come to you with?",
        hint: "Select your most common intake issues",
        options: [
          "Leash reactivity / lunging at dogs",
          "Leash reactivity / lunging at people",
          "Jumping on guests",
          "Pulling on leash",
          "Not coming when called (recall)",
          "Separation anxiety",
          "Resource guarding",
          "Aggression toward strangers",
          "Aggression toward other dogs in the home",
          "Barking / demand barking",
          "Destructive behavior (chewing, digging)",
          "Potty regression in adult dogs",
          "Dog won't settle / chronic over-arousal",
          "Fear / shutdown in new environments",
          "Mouthing / nipping (puppies)",
          "Door dashing",
          "Jumping on counters",
        ],
      },
      {
        id: "root_causes",
        type: "multi",
        question: "What are the most common ROOT CAUSES behind client problems?",
        hint: "Not the behavior itself, but what's driving it",
        options: [
          "Dog not getting enough physical exercise",
          "Dog not getting enough mental stimulation",
          "Inconsistency between household members",
          "Unintentional reinforcement of the problem behavior",
          "Too much freedom too soon (no boundaries established)",
          "Owner anxiety transferring to the dog",
          "Lack of clear communication / no training language",
          "Dog was never socialized properly in the critical window",
          "Underlying health / pain issue (misdiagnosed as behavioral)",
          "Owner trying to 'love away' fear or anxiety",
          "Too much off-leash time before recall is solid",
          "Over-reliance on management (crate, gates) with no training",
        ],
      },
      {
        id: "hardest_cases",
        type: "single",
        question: "What type of case do you find genuinely hardest to solve?",
        options: [
          "Severe separation anxiety",
          "Dog-to-dog aggression in a multi-dog home",
          "Human-directed aggression with unpredictable triggers",
          "Fear-based reactivity (hard to countercondition)",
          "Cases where the owner won't change their behavior",
          "Adolescent dogs with inconsistent histories",
          "Rescue dogs with unknown trauma",
          "Over-arousal / impulse control in high-drive breeds",
        ],
      },
    ],
  },
  {
    id: "owner_behavior",
    label: "The Owner Problem",
    emoji: "👤",
    color: "#7D3C98",
    intro: "Be honest. Often the dog isn't the client.",
    questions: [
      {
        id: "owner_patterns",
        type: "multi",
        question: "What owner behaviors most commonly sabotage training progress?",
        hint: "Select all you see regularly",
        options: [
          "Not practicing between sessions",
          "Feeling guilty and giving in",
          "Letting the dog 'off the hook' in emotional moments",
          "Mixed signals from different family members",
          "Repeating commands without enforcement",
          "Anthropomorphizing — projecting emotions onto the dog",
          "Too much affection during fear/anxiety (reinforcing it)",
          "Expecting fast results and giving up",
          "Comparing to another dog they've owned",
          "Watching too many conflicting YouTube/TikTok methods",
          "Sending the dog to board & train and expecting magic",
          "Not setting the dog up to succeed",
        ],
      },
      {
        id: "owner_type_hardest",
        type: "single",
        question: "Which type of owner is hardest to work with?",
        options: [
          "The one who wants results but won't put in the work",
          "The one who is overprotective and won't let the dog be corrected",
          "The one who already 'knows everything' from YouTube",
          "The one who is too emotional / inconsistent",
          "The one who gives up at the first sign of difficulty",
          "The one whose partner/family won't cooperate",
          "The one who spoils the dog and can't establish structure",
        ],
      },
      {
        id: "what_owners_need",
        type: "multi",
        question: "What do most dog owners actually need that they're not getting?",
        options: [
          "Realistic expectations about timelines",
          "Education on dog psychology / how dogs actually think",
          "A way to stay accountable between sessions",
          "Support from other household members",
          "Understanding of what their specific breed was bred for",
          "Confidence — they doubt themselves constantly",
          "Permission to set rules without feeling like a bad owner",
          "A quick reference guide for in-the-moment situations",
          "Understanding that structure = love, not punishment",
          "Reminders / habit tools to stay consistent",
        ],
      },
    ],
  },
  {
    id: "trainer_knowledge",
    label: "Your Expertise",
    emoji: "🎓",
    color: "#1E8449",
    intro: "What you know that most dog owners will never understand without a trainer.",
    questions: [
      {
        id: "wish_owners_knew",
        type: "multi",
        question: "What do you wish every dog owner knew before getting a dog?",
        hint: "Select your top answers",
        options: [
          "The first 16 weeks define more than the next 10 years",
          "Exercise is non-negotiable — a tired dog is a good dog",
          "Your dog needs a job, not just love",
          "Socialization isn't just 'exposure' — quality matters",
          "Consistency from day one is everything",
          "Rules and boundaries make dogs feel SAFER, not restricted",
          "You will have to train forever — there is no 'done'",
          "The breed you picked matters a lot — do the research",
          "No training method works if the owner doesn't change too",
          "Prevention is 10x easier than rehabilitation",
        ],
      },
      {
        id: "underrated_skills",
        type: "multi",
        question: "What skills are most underrated / overlooked by the average dog owner?",
        options: [
          "Calmly ignoring the dog (the power of non-interaction)",
          "Place / go to your mat",
          "Structured walk (heel, not just 'sniff time')",
          "Threshold awareness",
          "Impulse control exercises (wait, leave it)",
          "Name recognition under distraction",
          "Leash pressure communication",
          "Settle / long down",
          "Hand targeting",
          "Socialization with controlled exposure",
        ],
      },
      {
        id: "training_method",
        type: "single",
        question: "What's your primary training philosophy?",
        options: [
          "Purely positive / force-free (R+ only)",
          "Primarily positive with occasional no-reward markers",
          "Balanced (uses both reinforcement and aversives appropriately)",
          "LIMA — least intrusive, minimally aversive",
          "Relationship-based / communication-first",
          "Pack / instinct-based",
          "Varies by dog and situation",
        ],
      },
    ],
  },
  {
    id: "packguardian",
    label: "PackGuardian Fit",
    emoji: "🐾",
    color: "#D35400",
    intro: "Help us build something trainers would actually recommend.",
    questions: [
      {
        id: "gap_in_market",
        type: "multi",
        question: "What's missing from every dog training app or resource you've seen?",
        options: [
          "Content that respects different training philosophies",
          "Real-world scenarios, not just controlled demos",
          "Advice for the 23 hours between training sessions",
          "Tools for tracking behavior patterns over time",
          "Something trainers would actually recommend to clients",
          "Breed-specific nuance — not one-size-fits-all",
          "Emergency in-the-moment guidance",
          "Content for multi-dog or multi-person households",
          "Honest timelines — not 'fix it in 5 days' marketing",
          "Owner mindset support, not just technique",
        ],
      },
      {
        id: "recommend_likelihood",
        type: "single",
        question: "How likely would you be to recommend a well-built dog training app to your clients?",
        options: [
          "Very likely — it would extend my work between sessions",
          "Somewhat likely — depends on the content quality",
          "Unlikely — I've been burned by bad apps before",
          "Never — I prefer my clients work only with me",
        ],
      },
      {
        id: "trainer_years",
        type: "single",
        question: "How many years have you been training dogs professionally?",
        options: ["Under 2 years", "2–5 years", "5–10 years", "10–20 years", "20+ years"],
      },
    ],
  },
];

async function submitToSupabase(answers) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/survey_responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({
      answers,
      submitted_at: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }
}

function RankQuestion({ options, value = [], onChange }) {
  const [selected, setSelected] = useState(value);
  function toggle(opt) {
    let updated;
    if (selected.includes(opt)) {
      updated = selected.filter((o) => o !== opt);
    } else if (selected.length < 5) {
      updated = [...selected, opt];
    } else return;
    setSelected(updated);
    onChange(updated);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt) => {
        const rank = selected.indexOf(opt);
        const isSel = rank !== -1;
        const maxed = selected.length >= 5 && !isSel;
        return (
          <button key={opt} onClick={() => toggle(opt)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", borderRadius: 8, border: "1.5px solid",
              borderColor: isSel ? "currentColor" : "#2a2a2a",
              background: isSel ? "rgba(255,255,255,0.08)" : "#111",
              cursor: maxed ? "not-allowed" : "pointer",
              opacity: maxed ? 0.35 : 1,
              textAlign: "left", transition: "all 0.15s",
              fontFamily: "system-ui, sans-serif", fontSize: 13,
              color: isSel ? "#fff" : "#aaa",
            }}>
            <span style={{
              width: 22, height: 22, borderRadius: "50%",
              background: isSel ? "rgba(255,255,255,0.2)" : "#222",
              border: `2px solid ${isSel ? "#fff" : "#444"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 800, flexShrink: 0, color: "#fff",
            }}>
              {isSel ? rank + 1 : ""}
            </span>
            {opt}
          </button>
        );
      })}
      <p style={{ fontSize: 11, color: "#555", margin: "4px 0 0", fontFamily: "system-ui, sans-serif" }}>
        {selected.length}/5 selected
      </p>
    </div>
  );
}

export default function PackGuardianSurvey() {
  const [answers, setAnswers] = useState({});
  const [sectionIdx, setSectionIdx] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const section = SECTIONS[sectionIdx];
  const isLast = sectionIdx === SECTIONS.length - 1;
  const totalQ = SECTIONS.flatMap((s) => s.questions).length;
  const answered = SECTIONS.flatMap((s) => s.questions).filter((q) => {
    const a = answers[q.id];
    return a && (Array.isArray(a) ? a.length > 0 : a !== "");
  }).length;
  const progress = Math.round((answered / totalQ) * 100);

  function setAnswer(id, val) { setAnswers((p) => ({ ...p, [id]: val })); }
  function toggleMulti(id, val) {
    setAnswers((p) => {
      const cur = p[id] || [];
      return { ...p, [id]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] };
    });
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      await submitToSupabase(answers);
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0F0F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "#1A1A1A", borderRadius: 20, padding: "56px 48px", textAlign: "center", maxWidth: 480, border: "1px solid #2a2a2a" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🐾</div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-1px" }}>Saved. Thank you.</h1>
          <p style={{ color: "#888", fontSize: 15, lineHeight: 1.7, margin: "0 0 32px" }}>
            Your expertise is directly shaping what PackGuardian becomes. Every answer helps us build something trainers actually stand behind.
          </p>
          <div style={{ display: "flex", background: "#111", borderRadius: 12, overflow: "hidden", marginBottom: 32 }}>
            {[["Answered", answered], ["Sections", SECTIONS.length], ["Done", `${progress}%`]].map(([label, val], i) => (
              <div key={label} style={{ flex: 1, padding: "16px 8px", borderRight: i < 2 ? "1px solid #2a2a2a" : "none", textAlign: "center" }}>
                <div style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>{val}</div>
                <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => { setAnswers({}); setStatus("idle"); setSectionIdx(0); }}
            style={{ background: "#fff", color: "#000", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0F0F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "#1A1A1A", borderRadius: 20, padding: "48px", textAlign: "center", maxWidth: 420, border: "1px solid #C0392B" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: "#fff", margin: "0 0 12px" }}>Submission failed</h2>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Check that your Supabase URL and key are set correctly in the code.</p>
          <button onClick={() => setStatus("idle")}
            style={{ background: "#C0392B", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>
            Go Back & Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "#141414", borderBottom: "1px solid #222", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.5px", color: section.color }}>🐾 PackGuardian</span>
              <span style={{ color: "#444", fontSize: 13, marginLeft: 12 }}>Trainer Research Survey</span>
            </div>
            <span style={{ color: "#555", fontSize: 12 }}>{answered}/{totalQ} answered</span>
          </div>
          <div style={{ height: 3, background: "#222", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: section.color, borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 12, overflowX: "auto", paddingBottom: 2 }}>
            {SECTIONS.map((s, i) => (
              <button key={s.id} onClick={() => setSectionIdx(i)}
                style={{
                  background: i === sectionIdx ? s.color : "transparent",
                  border: `1px solid ${i === sectionIdx ? s.color : "#2a2a2a"}`,
                  borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600,
                  cursor: "pointer", color: i === sectionIdx ? "#fff" : "#555",
                  whiteSpace: "nowrap", transition: "all 0.2s",
                }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ borderLeft: `3px solid ${section.color}`, paddingLeft: 20, marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.8px" }}>
            {section.emoji} {section.label}
          </h1>
          <p style={{ color: "#777", fontSize: 14, margin: 0, fontStyle: "italic" }}>{section.intro}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {section.questions.map((q, qi) => {
            const answer = answers[q.id];
            return (
              <div key={q.id} style={{ background: "#1A1A1A", borderRadius: 14, padding: "24px", border: "1px solid #222" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ background: section.color, color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>
                    {sectionIdx + 1}.{qi + 1}
                  </span>
                  <p style={{ fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.5, letterSpacing: "-0.3px" }}>{q.question}</p>
                </div>
                {q.hint && <p style={{ color: "#555", fontSize: 12, margin: "0 0 14px", fontStyle: "italic" }}>{q.hint}</p>}
                <div>
                  {q.type === "rank" && <RankQuestion options={q.options} value={answer} onChange={(v) => setAnswer(q.id, v)} />}
                  {(q.type === "multi" || q.type === "single") && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {q.options.map((opt) => {
                        const sel = q.type === "multi" ? (answer || []).includes(opt) : answer === opt;
                        return (
                          <button key={opt}
                            onClick={() => q.type === "multi" ? toggleMulti(q.id, opt) : setAnswer(q.id, opt)}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "10px 14px", borderRadius: 8, border: "1.5px solid",
                              borderColor: sel ? section.color : "#2a2a2a",
                              background: sel ? section.color + "22" : "#111",
                              cursor: "pointer", textAlign: "left", transition: "all 0.15s", fontSize: 13,
                              color: sel ? "#fff" : "#aaa",
                            }}>
                            <span style={{
                              width: 14, height: 14,
                              borderRadius: q.type === "multi" ? 4 : "50%",
                              border: `2px solid ${sel ? section.color : "#444"}`,
                              background: sel ? section.color : "transparent", flexShrink: 0,
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              {sel && q.type === "multi" && <span style={{ color: "#fff", fontSize: 9, fontWeight: 900 }}>✓</span>}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingBottom: 48 }}>
          {sectionIdx > 0
            ? <button onClick={() => setSectionIdx((i) => i - 1)}
                style={{ background: "transparent", border: "1px solid #333", borderRadius: 8, padding: "12px 24px", color: "#666", fontSize: 14, cursor: "pointer" }}>
                ← Back
              </button>
            : <div />}
          <button
            onClick={isLast ? handleSubmit : () => setSectionIdx((i) => i + 1)}
            disabled={status === "submitting"}
            style={{
              background: status === "submitting" ? "#444" : section.color,
              border: "none", borderRadius: 8, padding: "12px 28px",
              color: "#fff", fontSize: 14, fontWeight: 700,
              cursor: status === "submitting" ? "not-allowed" : "pointer",
              letterSpacing: "-0.3px", transition: "background 0.2s",
            }}>
            {status === "submitting" ? "Saving…" : isLast ? "Submit Survey ✓" : `Next: ${SECTIONS[sectionIdx + 1].label} →`}
          </button>
        </div>
      </div>
    </div>
  );
}
