// src/pages/Badges.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  School,
  Search,
  Bell,
  Menu,
  ChevronDown,
  Compass,
  HelpingHand,
  Star,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";

// Hooks/logic you already created
import { useUserData } from "@/lib/useUserData";
import { computeBadges } from "@/lib/badgeEngine";

// ---- Static UI data ----
const BADGE_CARDS = [
  {
    id: "explorer",
    title: "Explorer",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzCiwhfUpTm-r7uUsOVjmuo4iHZqfoz57ry3049vOZNd9RWrAlzR8kE9j-uwoDwnHBURW4q1MHNxzzbeuqB5oHUiqzrMf2slP1ZXByIAugMLJVMCi5_hIcj5nkr23HtdVxu6Cx_auHEzacQKMJZsVnh1AKhJ9eOJYcZDNkep8Mo68483zYp8NPVm9RX6JBLmA_OQNBS_O6OWTe2j1cUpIqCyNrVu3WC4trH5UrPD9BlUMYwiBZ8MvcGJKw-tGK1RTK9RIaHlFBJGF8",
    desc: "Awarded for completing your first tutoring session.",
    Icon: Compass,
  },
  {
    id: "helper",
    title: "Helper",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCupZEWxAjdJ-2dWX3ilKILF0hXj5gWrCzimy2-WQjsKWzXEoQF6nBYvjd7g1jYQCZybdWuOzadqmUV7kibvrI_nO7rXcqXBtpO_EUa3v_mfctpWh2eUHM5pWbAfKHNkVKXWiX8yLbWx6Rja__tV_9qzw6jBYYnJaiGibjNeT6EI7acnuVLlZF6wWnmLu7Wa9_AS3uDbIW_G_ZdAsimbdKmCCQgNqMYQteCF_NheqxKhIZUYqmwIh_pGNBPCzz_30FcvDs6JoScWcFv",
    desc: "Awarded for completing 5 tutoring sessions.",
    Icon: HelpingHand,
  },
  {
    id: "star-mentor",
    title: "Star Mentor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdnK-3BXaDWK_E05SwpSeZq3ibVwdYxXHLs8VgfZcMrZ1njsi4mcTKsJUX2q0nC6iTYpgLq_JKkRjw1mhy1a7F3sCtiGbLla929cY0WFUpeQ7gYcXBm1M5OQdF5an7MNc5iTt_sZBEtfYStzlMiAtkEZbwxkd8NOotsrQex8A_UdUFLxDBdbo3XXwBcEKfOo38M3X_oMgirIFD6sxbuvuXpMSz6HjhD3zFsmFjy6IfAMtcktJN0eh7vXdehSQKPrP8tQnN9OcUHP4k",
    desc: "5★ rating from 10 students.",
    Icon: Star,
  },
];

const ACCORDION = [
  {
    id: "a1",
    title: "Explorer",
    img: BADGE_CARDS[0].img,
    content:
      "Sign up and complete your first session. This marks the beginning of your PeerConnect journey.",
  },
  {
    id: "a2",
    title: "Helper",
    img: BADGE_CARDS[1].img,
    content:
      "Complete 5 sessions (as a tutor or student). Shows consistency and willingness to help.",
  },
  {
    id: "a3",
    title: "Star Mentor",
    img: BADGE_CARDS[2].img,
    content:
      "Receive a perfect 5-star rating from at least 10 students. A mark of excellence.",
  },
  {
    id: "a4",
    title: "Knowledge Seeker",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAv62aVPrGGcg5I6uAxeeSduiPPNo-bVBOlkasR_IgbkqwztLBf5FZrLy8qXwvAPt6Iylk2BOktWoygZo-0qO2SudQb17VijY3K6jzg0R2VppCv4XJxI0ptKYRAiy7zQN5MQV_5kTHkqPubhbZScZqvsaVmrflOy74VHIJSJEdJLXToMabsdRuWNHs2oDOVLJEJdhkXJaY9khayBlKzdSjmloiDaQSxGurh42ysnyf2GUSD7blBrg08sj3hL6dE5jYfSqSTM-fFGOw",
    content:
      "Complete sessions in 3 different subjects. Celebrate your curiosity and range.",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "Sophia Clark",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCa5YtJ5qlUhnY742BLxj-Tm0eYsGkdWeHIkDcX_A8pLzhQgnkPPt9BGml-ho-f6ISxhrLlZuSRjWugBss2-qXiMxr4juHhbJnwk7lR3-djqSt5akrI1p-pwGrRHFIJo-XKn7fG4zCA7Uk0dfHrj3nTIbc0qJryDIXP_nGJQd5i-_JOJWPsSZFb2kabUaeK_AV2hkmfzW1nDDpAfOlgUHRoFsA7z1MsIxYe1g0w-AUEdv4CPLWX-OCwZiGz_6nkxMx8bX_z_-PxQtTr",
    badges: ["explorer", "helper"],
  },
  {
    rank: 2,
    name: "Ethan Miller",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCp0Sxo7Sqx94fedZ8gSVI3yMeXii_84dgahfitkC0d7AdgjdTa8nBJko_GNgEFjMVe-oAe9J1cxsnQakVzWCPuFQ-cYIEw0sWswBhmXvLoynwhfZYPDNL6spF4rKgkZlwWPzFTcI6QNwWPeh43tHQIoQbfEFBKLS6qLz0WEscP-_9GHQTdTLCEsW3tpUKlUkOe4-sjyVS6Q-8ij0q_SsfTH7CWJ9i83Hf9MO6OYfEgSCQbCcLGc9Wvh14MiYYPIEfezObzhS_BpS9g",
    badges: ["explorer", "helper"],
  },
  {
    rank: 3,
    name: "Olivia Davis",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACt1SNUT1rXKe3fddIVuvEYPAL8pGB_ZyBPHz7UdNGeeNKoSZSAXCKAhQ34nGHgUtG01HmUXQ9YESxYtr5C7uecKgzc81HPqPm_V1VKPb4iL7ITurjIQptFXNGDQ1MhRkpspsYsCEXnmufeSQ1K5B6zEy8sKfq262aRR3gEd3-sZry0gh6TYjB3gdaeLO5QbJQ4F3xWk-EZkjg_dPxrq-Q0f62Axl73dMa4eKv5eVQNA8PTH9sokyIoYO_srxY0veYh_27pcSk5M2P",
    badges: ["explorer"],
  },
  {
    rank: 4,
    name: "Noah Wilson",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBHy8SKQhDKr3KCGxBcxDH1x7FRkl8h5PSOJd89DZOyXWpQ_5YZhCrzTjUvJ7WOlnb6z30MVRTBnGP9T-YyHDrxfviFr3tzjThVxLMy2ttjfxIDdxOr0FiWMW-1dSx7JBUHAx_VUtm6gIeuDFp8xKtW18ZzQt-942R10AqkF53U2ZjYW0T66goIJL0NbK4pHxnC-luxXb1vrentaGIx-VbHAc5Zao_7yb1H_Gdo3RTHX7Lioq8qVTpCC4oM7tMSToxj5i2in4KgnQf",
    badges: ["explorer"],
  },
  {
    rank: 5,
    name: "Ava Martinez",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzAhf8hOQ5FPmCxHMDoXgYSd7tqYhuLTH76VmZI1UV_7lvt-CAVPAz7NYOgp2_q-0i7lcGYPWqMqn4bEak6is7_zWaZp2YHD9ZZBLlBJjccDbYSVW6BQnaVRovlT8CWpNGKGkKESTfqfrN9Ropqp5GW77FcyV8X1T4QumoQtzwcq4na-mJ6t5pXla0ew6FeS6upFO4lCmVcb2fJrqpiJ_h1zCrnjAfF_tdPxi3vvNeb4N7-tH0uUh6ykmS-yEAafXusOnCxWF1C-vM",
    badges: ["explorer"],
  },
];

// ---- Reusable Progress Bar ----
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

export default function Badges() {
  const navigate = useNavigate();
  const { loading, stats, error } = useUserData(); // assumes your hook returns {loading, stats, error}

  // Compute derived progress safely
  const safeStats = stats ?? {};
  const { progress = {} } = computeBadges(safeStats) ?? {};

  const [openId, setOpenId] = useState(null);

  const onCTA = () => {
    navigate("/find-tutor?subject=Calculus&level=College");
    toast.success("Let’s go! We’ll match you with your first session.");
  };

  return (
    <div className="bg-white text-[#111827] min-h-screen flex flex-col">
      {/* Header (replace with your global Navbar if you have one) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <School className="h-7 w-7" />
              PeerConnect
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link className="text-sm text-[#6B7280] hover:text-[#111827]" to="/ai">
                AI Features
              </Link>
              <Link className="text-sm text-[#6B7280] hover:text-[#111827]" to="/pricing">
                Pricing
              </Link>
              <Link className="text-sm text-[#6B7280] hover:text-[#111827]" to="/about">
                Resources
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full text-[#6B7280] hover:text-[#111827] hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full text-[#6B7280] hover:text-[#111827] hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUZFxMkdTd0zlggBo4yIgvOOp2MB8-FCUoh62MAVQgC1ryfXPLslIk6wrXFMLhWMCBpdjGwIRvY-Akheu8mf3vYGRv-E-CAgt3W6PisPOWNIJhJjA141C-0tBMUl3TtKua3Q2tWDRkidHuaCx4YYIJxFcPqdY5Q-A-t3OEBcDfxhMGieh3JQsAa1ok3ggjCV3eAfnOJGLnagxyM0o_-V5CiNVPm8YV3LS7Efc7W06MJrGVof0HxOANQGpzJ7Wz4qUr_aEm01yrtuBg")',
              }}
            />
            <button className="md:hidden p-2 rounded-full text-[#6B7280] hover:text-[#111827] hover:bg-gray-100">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Learning is fun when rewarded
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-[#6B7280]">
              Earn badges and climb the leaderboard as you learn and teach on PeerConnect.
            </p>
          </div>

          {/* Badge Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {BADGE_CARDS.map(({ id, title, img, desc, Icon }) => (
              <div
                key={id}
                className="border border-[#E5E7EB] rounded-lg p-6 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-32 h-32 mb-4 flex items-center justify-center">
                  <img src={img} alt={`${title} badge`} className="max-w-full max-h-full" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-5 w-5" />
                  <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <p className="text-[#6B7280]">{desc}</p>
              </div>
            ))}
          </div>

          {/* How to earn (Accordion) */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">How to Earn Badges</h2>
            <div className="space-y-4">
              {ACCORDION.map((a) => {
                const open = openId === a.id;
                return (
                  <div key={a.id} className="border border-[#E5E7EB] rounded-lg">
                    <button
                      onClick={() => setOpenId(open ? null : a.id)}
                      className="w-full flex items-center justify-between p-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-16 h-16 flex items-center justify-center">
                          <img
                            src={a.img}
                            alt={`${a.title} badge`}
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <h3 className="text-lg font-bold">{a.title}</h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                      />
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

          {/* Progress (dynamic) */}
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
              <table className="w-full text-sm text-left text-[#6B7280]">
                <thead className="text-xs text-[#111827] uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-bold">Rank</th>
                    <th className="px-6 py-3 font-bold">Student</th>
                    <th className="px-6 py-3 font-bold">Badges</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD.map((row) => (
                    <tr key={row.rank} className="bg-white border-b last:border-b-0">
                      <td className="px-6 py-4 font-bold text-lg text-[#111827]">{row.rank}</td>
                      <td className="px-6 py-4 font-medium text-[#111827] whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={row.avatar}
                            alt={`${row.name} avatar`}
                            className="w-10 h-10 rounded-full"
                          />
                          {row.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {row.badges.includes("explorer") && (
                            <Compass className="h-4 w-4" title="Explorer" />
                          )}
                          {row.badges.includes("helper") && (
                            <HelpingHand className="h-4 w-4" title="Helper" />
                          )}
                          {row.badges.includes("star-mentor") && (
                            <Star className="h-4 w-4" title="Star Mentor" />
                          )}
                          {/* Example: if you add 'knowledge' to any row */}
                          {row.badges.includes("knowledge") && (
                            <BookOpen className="h-4 w-4" title="Knowledge Seeker" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      </main>
    </div>
  );
}
