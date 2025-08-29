// src/pages/FindTutor.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CalendarDays, UserRoundSearch } from "lucide-react";
import toast from "react-hot-toast";
import { useUserData } from "@/lib/useUserData";

export default function FindTutor() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addMockSession } = useUserData();

  // Query params (prefill + automation)
  const qpSubject = params.get("subject") || "";
  const qpLevel = params.get("level") || "";
  const qpDate = params.get("date") || "";
  const qpTime = params.get("time") || "";
  const auto = params.get("auto") === "1";

  const [subject, setSubject] = useState(qpSubject);
  const [level, setLevel] = useState(qpLevel);
  const [date, setDate] = useState(qpDate);
  const [time, setTime] = useState(qpTime);

  const canSubmit = useMemo(() => subject && date && time, [subject, date, time]);

  // Default to next full hour if auto and missing date/time
  useEffect(() => {
    if (!auto) return;
    if (date && time) return;

    const t = new Date();
    t.setMinutes(0, 0, 0);
    t.setHours(t.getHours() + 1);

    if (!date) setDate(t.toISOString().slice(0, 10));
    if (!time) setTime(t.toTimeString().slice(0, 5));
  }, [auto, date, time]);

  // --- Gemini integration ---
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // safely parse first JSON object in a string
  const parseFirstJson = (txt = "") => {
    // ```json ... ```
    const block = txt.match(/```json([\s\S]*?)```/i)?.[1]
      || txt.match(/```([\s\S]*?)```/i)?.[1];
    const candidate = block || txt;
    // first {...} or [...]
    const obj = candidate.match(/\{[\s\S]*\}/) || candidate.match(/\[[\s\S]*\]/);
    if (!obj) return null;
    try {
      return JSON.parse(obj[0]);
    } catch {
      return null;
    }
  };

  const askGeminiForTutor = async ({ subject, level, date, time }) => {
    if (!apiKey) {
      // fall back if no key
      return { tutor: "Alex", reason: "No API key set; using default." };
    }

    const prompt = `
You are a peer-tutor matcher for a student platform.
Given the request below, pick ONE human-sounding tutor name and return STRICT JSON.

Constraints:
- Output JSON ONLY, no prose, no markdown fences.
- Shape: {"tutor":"<name>","reason":"<short why>"}.

Request:
subject: ${subject || "General tutoring"}
level: ${level || "N/A"}
date: ${date}
time: ${time}
Consider a friendly, credible name appropriate for a peer tutor.
Keep reason ≤ 16 words.
    `.trim();

    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4 },
        }),
      }
    );

    const data = await resp.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const parsed =
      parseFirstJson(raw) ||
      // sometimes the API already returns an object via safety pipeline
      (typeof raw === "object" ? raw : null);

    if (parsed && typeof parsed.tutor === "string" && parsed.tutor.trim()) {
      return { tutor: parsed.tutor.trim(), reason: parsed.reason || "Matched by AI." };
    }
    // fallback
    return { tutor: "Alex", reason: "Fallback match." };
  };

  // Shared booking logic (button + auto)
  const doMatch = async () => {
    const toastId = "match";
    toast.loading("Asking AI for the best peer tutor…", { id: toastId });

    try {
      const { tutor, reason } = await askGeminiForTutor({ subject, level, date, time });

      // Book the session locally
      addMockSession({
        id: `s-${Date.now()}`,
        subject: subject || "General Tutoring",
        role: "student",
        start: `${date}T${time}`,
        end: `${date}T${time}`,
        rating: undefined,
      });

      toast.success(`Matched with ${tutor}! ${reason}`, { id: toastId });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Couldn’t match right now. Please try again.", { id: toastId });
    }
  };

  const handleMatch = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    await doMatch();
  };

  // Auto-submit once when form is complete
  const fired = useRef(false);
  useEffect(() => {
    if (auto && canSubmit && !fired.current) {
      fired.current = true;
      (async () => {
        await doMatch();
      })();
    }
  }, [auto, canSubmit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">Find a Tutor</h1>
      <p className="text-[#6B7280] mt-1">
        Tell us what you need help with — we’ll match you in seconds.
      </p>

      <form onSubmit={handleMatch} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="e.g., Calculus II"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Level (optional)</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="e.g., College"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> Date
            </label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <button
          disabled={!canSubmit}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          <UserRoundSearch className="h-4 w-4" />
          Match me with a tutor
        </button>

        {!apiKey && (
          <p className="text-xs text-[#6B7280]">
            Tip: set <code>VITE_GEMINI_API_KEY</code> in <code>.env.local</code> to enable AI matching.
          </p>
        )}
      </form>
    </div>
  );
}
