// src/pages/FindTutor.jsx
import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CalendarDays, UserRoundSearch } from "lucide-react";
import toast from "react-hot-toast";
import { useUserData } from "@/lib/useUserData";

export default function FindTutor() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addMockSession } = useUserData(); // from our hook

  const [subject, setSubject] = useState(params.get("subject") || "");
  const [level, setLevel] = useState(params.get("level") || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const canSubmit = useMemo(() => subject && date && time, [subject, date, time]);

  const handleMatch = (e) => {
    e.preventDefault();
    toast.loading("Finding the best peer tutor…", { id: "match" });

    // pretend we matched “Alex”
    setTimeout(() => {
      toast.success("Matched with Alex! Session booked.", { id: "match" });

      // Push a new completed session locally to update progress (until you wire API)
      addMockSession({
        id: `s-${Date.now()}`,
        subject,
        role: "student",
        start: `${date}T${time}`,
        end: `${date}T${time}`,
        rating: undefined, // to be set after session
      });

      navigate("/dashboard");
    }, 800);
  };

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
      </form>
    </div>
  );
}
