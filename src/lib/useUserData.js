// src/lib/useUserData.js
import { useEffect, useMemo, useState } from "react";

/**
 * Replace these with your API calls later.
 * sessions: [{ id, subject, role: "student"|"tutor", start, end, rating? }]
 */
const SEED_SESSIONS = [
  { id: "s1", subject: "Calculus II", role: "student", start: "2025-10-10T15:00:00", end: "2025-10-10T16:00:00", rating: 5 },
  { id: "s2", subject: "World History", role: "student", start: "2025-10-11T17:00:00", end: "2025-10-11T18:00:00", rating: 5 },
  { id: "s3", subject: "Physics", role: "student", start: "2025-10-12T10:00:00", end: "2025-10-12T11:00:00", rating: 4 },
];

export function useUserData(userId = "demo-user") {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  // simulate fetch
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setSessions(SEED_SESSIONS);
      setLoading(false);
    }, 150);
    return () => clearTimeout(t);
  }, [userId]);

  const stats = useMemo(() => {
    const completed = sessions.length;
    const fiveStarCount = sessions.filter((s) => s.rating === 5).length;

    // distinct subjects attended/tutored
    const subjects = Array.from(new Set(sessions.map((s) => s.subject)));

    return { completed, fiveStarCount, subjectsCount: subjects.length };
  }, [sessions]);

  // call this after booking a session to push progress locally (until you wire API)
  const addMockSession = (session) => setSessions((prev) => [session, ...prev]);

  return { loading, error, sessions, stats, addMockSession };
}
