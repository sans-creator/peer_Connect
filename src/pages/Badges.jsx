// src/pages/Badges.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Compass,
  HelpingHand,
  Star,
  BookOpen,
  Crown,
  Search,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";

// Hooks/logic
import { useUserData } from "@/lib/useUserData";
import { computeBadges } from "@/lib/badgeEngine";

/** ------------------------------
 * Icon registry so server can say icon: "Star"
 * ------------------------------ */
const ICONS = {
  Compass,
  HelpingHand,
  Star,
  BookOpen,
  Crown,
};

/** ------------------------------
 * Fallback static data (your original)
 * ------------------------------ */
const FALLBACK_BADGE_CARDS = [
  {
    id: "explorer",
    title: "Explorer",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzCiwhfUpTm-r7uUsOVjmuo4iHZqfoz57ry3049vOZNd9RWrAlzR8kE9j-uwoDwnHBURW4q1MHNxzzbeuqB5oHUiqzrMf2slP1ZXByIAugMLJVMCi5_hIcj5nkr23HtdVxu6Cx_auHEzacQKMJZsVnh1AKhJ9eOJYcZDNkep8Mo68483zYp8NPVm9RX6JBLmA_OQNBS_O6OWTe2j1cUpIqCyNrVu3WC4trH5UrPD9BlUMYwiBZ8MvcGJKw-tGK1RTK9RIaHlFBJGF8",
    desc: "Awarded for completing your first tutoring session.",
    icon: "Compass",
  },
  {
    id: "helper",
    title: "Helper",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCupZEWxAjdJ-2dWX3ilKILF0hXj5gWrCzimy2-WQjsKWzXEoQF6nBYvjd7g1jYQCZybdWuOzadqmUV7kibvrI_nO7rXcqXBtpO_EUa3v_mfctpWh2eUHM5pWbAfKHNkVKXWiX8yLbWx6Rja__tV_9qzw6jBYYnJaiGibjNeT6EI7acnuVLlZF6wWnmLu7Wa9_AS3uDbIW_G_ZdAsimbdKmCCQgNqMYQteCF_NheqxKhIZUYqmwIh_pGNBPCzz_30FcvDs6JoScWcFv",
    desc: "Awarded for completing 5 tutoring sessions.",
    icon: "HelpingHand",
  },
  {
    id: "star-mentor",
    title: "Star Mentor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdnK-3BXaDWK_E05SwpSeZq3ibVwdYxXHLs8VgfZcMrZ1njsi4mcTKsJUX2q0nC6iTYpgLq_JKkRjw1mhy1a7F3sCtiGbLla929cY0WFUpeQ7gYcXBm1M5OQdF5an7MNc5iTt_sZBEtfYStzlMiAtkEZbwxkd8NOotsrQex8A_UdUFLxDBdbo3XXwBcEKfOo38M3X_oMgirIFD6sxbuvuXpMSz6HjhD3zFsmFjy6IfAMtcktJN0eh7vXdehSQKPrP8tQnN9OcUHP4k",
    desc: "5★ rating from 10 students.",
    icon: "Star",
  },
  {
    id: "premium",
    title: "Premium Member",
    img: "https://img.icons8.com/color/96/crown.png",
    desc: "Awarded for upgrading to Premium.",
    icon: "Crown",
    requiresPlan: "Premium",
  },
];

const FALLBACK_LEADERBOARD = [
  {
    rank: 1,
    name: "Sanskar",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCa5YtJ5qlUhnY742BLxj-Tm0eYsGkdWeHIkDcX_A8pLzhQgnkPPt9BGml-ho-f6ISxhrLlZuSRjWugBss2-qXiMxr4juHhbJnwk7lR3-djqSt5akrI1p-pwGrRHFIJo-XKn7fG4zCA7Uk0dfHrj3nTIbc0qJryDIXP_nGJQd5i-_JOJWPsSZFb2kabUaeK_AV2hkmfzW1nDDpAfOlgUHRoFsA7z1MsIxYe1g0w-AUEdv4CPLWX-OCwZiGz_6nkxMx8bX_z_-PxQtTr",
    badges: ["explorer", "helper"],
  },
  {
    rank: 2,
    name: "Vansh",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCp0Sxo7Sqx94fedZ8gSVI3yMeXii_84dgahfitkC0d7AdgjdTa8nBJko_GNgEFjMVe-oAe9J1cxsnQakVzWCPuFQ-cYIEw0sWswBhmXvLoynwhfZYPDNL6spF4rKgkZlwWPzFTcI6QNwWPeh43tHQIoQbfEFBKLS6qLz0WEscP-_9GHQTdTLCEsW3tpUKlUkOe4-sjyVS6Q-8ij0q_SsfTH7CWJ9i83Hf9MO6OYfEgSCQbCcLGc9Wvh14MiYYPIEfezObzhS_BpS9g",
    badges: ["explorer", "helper"],
  },
  {
    rank: 3,
    name: "Krishna",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACt1SNUT1rXKe3fddIVuvEYPAL8pGB_ZyBPHz7UdNGeeNKoSZSAXCKAhQ34nGHgUtG01HmUXQ9YESxYtr5C7uecKgzc81HPqPm_V1VKPb4iL7ITurjIQptFXNGDQ1MhRkpspsYsCEXnmufeSQ1K5B6zEy8sKfq262aRR3gEd3-sZry0gh6TYjB3gdaeLO5QbJQ4F3xWk-EZkjg_dPxrq-Q0f62Axl73dMa4eKv5eVQNA8PTH9sokyIoYO_srxY0veYh_27pcSk5M2P",
    badges: ["explorer"],
  },
];

/** ------------------------------
 * Simple data fetcher with abort + fallback
 * ------------------------------ */
async function fetchJSON(url, fallback) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    clearTimeout(t);
    return json;
  } catch {
    clearTimeout(t);
    return fallback;
  }
}

/** ------------------------------
 * Reusable Progress Bar
 * ------------------------------ */
const ProgressBar = ({ label, value, total, unit = "Sessions", suffix }) => {
  const pct = Math.min(100, Math.round((value / Math.max(1, total)) * 100));
  const remaining = Math.max(0, total - value);
  return (
    <div className="max-w-3xl mx-auto bg-gray-50 border border-[#E5E7EB] rounded-lg p-6 mb-16">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">{label}</h4>
        <p className="text-sm font-medium text-[#111827]">
          {value}/{total} {unit}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-[#111827] h-2.5 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[#6B7280] text-sm mt-2">
        {remaining > 0
          ? `${remaining} ${unit.toLowerCase()} away${suffix ? ` from ${suffix}` : ""}`
          : `Completed${suffix ? ` — ${suffix}` : ""}`}
      </p>
    </div>
  );
};

/** ------------------------------
 * Page
 * ------------------------------ */
export default function Badges() {
  const navigate = useNavigate();
  const { loading, stats, error, plan } = useUserData();

  // computeBadges can keep doing your internal math
  const computed = computeBadges(stats ?? {}) ?? {};
  const progress = computed.progress ?? {};
  const earnedFromCompute = computed.earned ?? []; // if your engine already returns earned IDs

  // Server data (with fallbacks)
  const [catalog, setCatalog] = useState(FALLBACK_BADGE_CARDS);
  const [leaderboard, setLeaderboard] = useState(FALLBACK_LEADERBOARD);
  const [userEarned, setUserEarned] = useState(earnedFromCompute);

  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [isLoadingLB, setIsLoadingLB] = useState(true);
  const [isLoadingUserBadges, setIsLoadingUserBadges] = useState(true);

  // UI state
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | earned | locked
  const [q, setQ] = useState("");

  useEffect(() => {
    // Try to fetch dynamic data; use fallbacks if unavailable
    (async () => {
      setIsLoadingCatalog(true);
      const data = await fetchJSON("/api/badges", FALLBACK_BADGE_CARDS);
      // normalize: ensure icon key exists as string
      setCatalog(
        (Array.isArray(data) ? data : FALLBACK_BADGE_CARDS).map((b) => ({
          ...b,
          icon: b.icon || "Star",
        }))
      );
      setIsLoadingCatalog(false);
    })();

    (async () => {
      setIsLoadingLB(true);
      const data = await fetchJSON("/api/leaderboard", FALLBACK_LEADERBOARD);
      setLeaderboard(Array.isArray(data) ? data : FALLBACK_LEADERBOARD);
      setIsLoadingLB(false);
    })();

    (async () => {
      setIsLoadingUserBadges(true);
      const data = await fetchJSON("/api/user/badges", { earned: earnedFromCompute });
      setUserEarned(
        Array.isArray(data?.earned) ? data.earned : earnedFromCompute
      );
      setIsLoadingUserBadges(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep earned badges synced if computeBadges updates
  useEffect(() => {
    if (earnedFromCompute.length && !isLoadingUserBadges) {
      setUserEarned((prev) => (prev.length ? prev : earnedFromCompute));
    }
  }, [earnedFromCompute, isLoadingUserBadges]);

  const filteredCatalog = useMemo(() => {
    const term = q.trim().toLowerCase();
    return catalog
      .filter((b) => {
        // plan-gated badges
        if (b.requiresPlan && b.requiresPlan !== plan) return false;
        return true;
      })
      .filter((b) => {
        if (!term) return true;
        return (
          b.title?.toLowerCase().includes(term) ||
          b.desc?.toLowerCase().includes(term) ||
          b.id?.toLowerCase().includes(term)
        );
      })
      .filter((b) => {
        if (filter === "earned") return userEarned.includes(b.id);
        if (filter === "locked") return !userEarned.includes(b.id);
        return true;
      });
  }, [catalog, plan, q, filter, userEarned]);

  const accordionData = useMemo(() => {
    // Build accordion items from catalog: use b.criteria if API provides it; fallback to a generic line
    return catalog
      .filter((b) => !b.requiresPlan || b.requiresPlan === plan)
      .map((b) => ({
        id: `acc-${b.id}`,
        title: b.title,
        img: b.img,
        content:
          b.criteria ||
          b.howTo ||
          `Earn the ${b.title} badge: ${b.desc || "Complete the required actions."}`,
      }));
  }, [catalog, plan]);

  const onCTA = () => {
    navigate("/find-tutor?subject=Calculus&level=College");
    toast.success("Let’s go! We’ll match you with your first session.");
  };

  const renderBadgeCard = (b) => {
    const Icon = ICONS[b.icon] || Star;
    const earned = userEarned.includes(b.id);
    return (
      <div
        key={b.id}
        className={`border rounded-lg p-6 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow ${
          earned ? "border-[#E5E7EB]" : "border-dashed border-gray-300"
        } ${earned ? "" : "opacity-80"}`}
      >
        <div className={`w-32 h-32 mb-4 flex items-center justify-center ${earned ? "" : "grayscale"}`}>
          <img src={b.img} alt={`${b.title} badge`} className="max-w-full max-h-full" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-5 w-5" />
          <h3 className="text-xl font-bold">{b.title}</h3>
        </div>
        <p className="text-[#6B7280]">{b.desc}</p>
        <div className="mt-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
              earned ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
            }`}
          >
            {earned ? "Earned" : "Locked"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white text-[#111827] min-h-screen flex flex-col">
      {/* Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Learning is fun when rewarded
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#6B7280]">
            Earn badges and climb the leaderboard as you learn and teach on PeerConnect.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search badges…"
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="all">All badges</option>
              <option value="earned">Earned</option>
              <option value="locked">Locked</option>
            </select>
          </div>
        </div>

        {/* Badge Cards */}
        {isLoadingCatalog || isLoadingUserBadges ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-[#E5E7EB] rounded-lg p-6 animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded mx-auto mb-4" />
                <div className="h-5 w-40 bg-gray-200 rounded mx-auto mb-2" />
                <div className="h-4 w-56 bg-gray-200 rounded mx-auto" />
              </div>
            ))}
          </div>
        ) : filteredCatalog.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {filteredCatalog.map(renderBadgeCard)}
          </div>
        ) : (
          <div className="mb-16 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-600">
            No badges match your filters.
          </div>
        )}

        {/* How to earn (Accordion) */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How to Earn Badges</h2>
          <div className="space-y-4">
            {accordionData.map((a) => {
              const open = openId === a.id;
              return (
                <div key={a.id} className="border border-[#E5E7EB] rounded-lg">
                  <button
                    onClick={() => setOpenId(open ? null : a.id)}
                    className="w-full flex items-center justify-between p-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <img src={a.img} alt={`${a.title} badge`} className="max-w-full max-h-full" />
                      </div>
                      <h3 className="text-lg font-bold">{a.title}</h3>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`px-4 pb-4 overflow-hidden transition-[max-height] duration-300 ${
                      open ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="text-[#6B7280]">{a.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 text-sm text-red-600">
            Couldn’t load your progress. Please try again.
          </div>
        )}
        {loading ? (
          <div className="max-w-3xl mx-auto mb-16 animate-pulse">
            <div className="h-6 w-64 bg-gray-200 rounded mb-3" />
            <div className="h-2.5 w-full bg-gray-200 rounded" />
            <div className="h-4 w-48 bg-gray-200 rounded mt-3" />
          </div>
        ) : (
          <>
            {progress?.helper && (
              <ProgressBar
                label="Helper Badge Progress"
                value={progress.helper.value}
                total={progress.helper.total}
                unit="Sessions"
                suffix="Helper Badge"
              />
            )}
            {progress?.starMentor && (
              <ProgressBar
                label="Star Mentor Progress"
                value={progress.starMentor.value}
                total={progress.starMentor.total}
                unit="Students"
                suffix="Star Mentor"
              />
            )}
            {progress?.knowledge && (
              <ProgressBar
                label="Knowledge Seeker Progress"
                value={progress.knowledge.value}
                total={progress.knowledge.total}
                unit="Subjects"
                suffix="Knowledge Seeker"
              />
            )}
          </>
        )}

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Leaderboard</h2>
          <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg shadow-sm">
            {isLoadingLB ? (
              <div className="p-6 animate-pulse">
                <div className="h-4 w-40 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ) : (
              <table className="w-full text-sm text-left text-[#6B7280]">
                <thead className="text-xs text-[#111827] uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-bold">Rank</th>
                    <th className="px-6 py-3 font-bold">Student</th>
                    <th className="px-6 py-3 font-bold">Badges</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row) => (
                    <tr key={row.rank} className="bg-white border-b last:border-b-0">
                      <td className="px-6 py-4 font-bold text-lg text-[#111827]">{row.rank}</td>
                      <td className="px-6 py-4 font-medium text-[#111827] whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={row.avatar} alt={`${row.name} avatar`} className="w-10 h-10 rounded-full" />
                          {row.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {row.badges?.includes("explorer") && <Compass className="h-4 w-4" title="Explorer" />}
                          {row.badges?.includes("helper") && <HelpingHand className="h-4 w-4" title="Helper" />}
                          {row.badges?.includes("star-mentor") && <Star className="h-4 w-4" title="Star Mentor" />}
                          {row.badges?.includes("knowledge") && <BookOpen className="h-4 w-4" title="Knowledge Seeker" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            onClick={onCTA}
            className="bg-[#111827] text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors text-lg inline-flex items-center gap-2"
          >
            <BookOpen className="h-5 w-5" />
            Start earning your first badge today
          </button>
        </div>
      </div>
    </div>
  );
}
