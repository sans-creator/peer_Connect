import { useEffect, useMemo, useState } from "react";

// Generate demo sessions relative to today
function generateSeedSessions() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const inTwoDays = new Date(now);
  inTwoDays.setDate(now.getDate() + 2);
  const inThreeDays = new Date(now);
  inThreeDays.setDate(now.getDate() + 3);

  return [
    {
      id: "s1",
      subject: "Calculus II",
      role: "student",
      start: tomorrow.toISOString(),
      end: new Date(tomorrow.getTime() + 3600000).toISOString(), // +1h
      rating: 5,
    },
    {
      id: "s2",
      subject: "World History",
      role: "student",
      start: inTwoDays.toISOString(),
      end: new Date(inTwoDays.getTime() + 3600000).toISOString(),
      rating: 5,
    },
    {
      id: "s3",
      subject: "Physics",
      role: "student",
      start: inThreeDays.toISOString(),
      end: new Date(inThreeDays.getTime() + 3600000).toISOString(),
      rating: 4,
    },
  ];
}

export function useUserData(userId = "demo-user") {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState("Free"); 

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      try {
        setSessions(generateSeedSessions());
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load sessions");
      } finally {
        setLoading(false);
      }
    }, 150);
    return () => clearTimeout(t);
  }, [userId]);

  const stats = useMemo(() => {
    const completed = sessions.length;
    const fiveStarCount = sessions.filter((s) => s.rating === 5).length;
    const subjects = Array.from(new Set(sessions.map((s) => s.subject)));

    return { completed, fiveStarCount, subjectsCount: subjects.length };
  }, [sessions]);

  const addMockSession = (session) =>
    setSessions((prev) => [session, ...prev]);

  return { loading, error, sessions, stats, addMockSession,plan, setPlan };
}
