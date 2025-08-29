import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  Trophy,
  UsersRound,
  BookOpen,
  Atom,
  Clock,
  ShieldCheck,
  ArrowRight,
  Play,
} from "lucide-react";
import TestimonialCard from "../components/TestimonialCard.jsx";

const AV = (id) => `https://lh3.googleusercontent.com/aida-public/${id}`;

/* ---------- Tiny splash while the page boots ---------- */
function LoadingSplash() {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="size-16 rounded-2xl bg-black" />
          <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-yellow-400 animate-bounce" />
        </div>
        <p className="mt-4 text-sm text-gray-500">Starting your PeerConnect day…</p>
        <div className="mt-3 flex gap-2">
          <span className="size-2 animate-pulse rounded-full bg-gray-900" />
          <span className="size-2 animate-pulse rounded-full bg-gray-900 delay-150" />
          <span className="size-2 animate-pulse rounded-full bg-gray-900 delay-300" />
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 900); // short + snappy
    return () => clearTimeout(t);
  }, []);

  const onFindTutor = () =>
    navigate("/find-tutor?subject=Calculus&level=College");

  return (
    <>
      {showSplash && <LoadingSplash />}

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* soft gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-white" />
        {/* spotlight glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(17,24,39,0.12),_transparent_60%)] blur-3xl" />

        <div className="container mx-auto px-6 pt-20 pb-14 md:pt-28 md:pb-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              New: AI-powered tutor matching
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Elevate your learning with{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                peers and AI
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-gray-600">
              Connect with students, book sessions in seconds, and stay
              motivated with a gentle gamified path.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onFindTutor}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 font-semibold text-white shadow-sm ring-1 ring-black/10 transition hover:scale-[1.02] hover:bg-black/90"
              >
                Find a Tutor <ArrowRight className="h-4 w-4" />
              </button>

              <Link
                to="/ai"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Watch Demo <Play className="h-4 w-4" />
              </Link>
            </div>

            {/* quick stats strip */}
            <div className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <UsersRound className="h-4 w-4" />
                12k+ learners
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Instant booking</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Safe & verified
              </div>
            </div>
          </div>
        </div>

        {/* moving brand marquee */}
        <div className="border-y border-gray-200 bg-gray-50/60 py-4">
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex min-w-full items-center gap-10 opacity-70 [--speed:28s]">
              {[
                "Harvard", "MIT", "Cambridge", "IIT", "Stanford", "Oxford",
                "Waterloo", "NUS", "UCLA", "ETH",
              ].map((brand, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-1 text-xs font-semibold text-gray-700 shadow-sm"
                >
                  {brand} students on PeerConnect
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <UsersRound className="h-6 w-6" />,
                title: "Smart Match",
                desc: "Get paired with peers who’ve aced your exact topic.",
              },
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Study Tools",
                desc: "Notes ➜ flashcards in one click. Keep momentum.",
              },
              {
                icon: <Trophy className="h-6 w-6" />,
                title: "Earn Badges",
                desc: "Motivating milestones for helpful sessions & reviews.",
              },
              {
                icon: <Atom className="h-6 w-6" />,
                title: "AI Assist",
                desc: "24/7 AI explains steps and gives practice prompts.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-gray-600">{f.desc}</p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-gray-900/0 via-gray-900/10 to-gray-900/0 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
            Join our community of passionate learners
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <TestimonialCard
              avatar={AV(
                "AB6AXuC7KCK7pP_Au3EQoyO17V84czbmuqIUaMcAwrQuCcv2FRzBtnc9u_U8DgBCKHKKtBM4EvvK1Q1KuZwFBitWFMBASdgHaW6jtUVoMjP38_kZW_r4ra3u_DluWhXLsYlfAjZQarXq1du-cuuxyQ8vmVthjCg1AB16pi_ZkfKcwjBnsblkqvJ5m--7I7uG0281iNM3nkFysBYXi_5oHBfQrrFQJeWfXCpiptPNoPGm0X8oBhqDW_zpgidZrJcHku5FWtJYnSHpQLep8aNP"
              )}
              name="Sanskar"
              quote="PeerConnect transformed my study habits."
            />
            <TestimonialCard
              avatar={AV(
                "AB6AXuBEf-1Q-e9fPLViJEubZEHe6EL8fagnkD9oJxL_c7XF4IFqidl0aoARZS9Dc9YPyUpl-nDsZEZVlPFhqdB7UT2SMI0-Dq1_S2Kv3A3CAOI1IA4PzPU_0qq8rWkssbqISa7YE1QZHmWjRqEt16CmXuc-RtidT9g0gRA2kqot-Aqbo7qgdNNzXrw06I5jTjzg6zVZJ9kUzEb7fG7RGayeCiGXDk8GCC7CfEGwb8_dg0VYRavxMiYj-pYUssBa4dtOvP9aTuEPTDtIR80K"
              )}
              name="Vansh."
              quote="Real-time interaction makes learning engaging."
            />
            <TestimonialCard
              avatar={AV(
                "AB6AXuBm9iD97fnP1jZTKr3GDT3aYj6Y6CvPc8e8Th70acgGQZayWUnnXPHtra3Itrit7hudvL1RgLWm6ywztPmxxUiJA7LX2ENbmC3S3n_6VEagb5LApZMzseSY2TBJFn9lzBC-8YgH9UK_FtcNsvxrVRqL0k2bzLrGp9NdblaZLBMvbHLY70ocOmmgcilcGowlJKuqMQ0LER00N-iy7aKxqJH1SC_NK2wdtkHN-Jc7DtZegUMo5HWBG-wTHLDmszxLMqmRY85J4npVLti5"
              )}
              name="Krishna T."
              quote="Badges keep me motivated to learn."
            />
            <TestimonialCard
              avatar={AV(
                "AB6AXuCL0aUxbPiFcAS4EoOLc87PxYRVqmAZUgr4QD_QKKG8dk82ow3_62wNNuDgJMY-tWeVnclMBe_cMhlbQqtqXjlfkECDbLvwc70HSnI0cv3D0VwsvyUOe9ZA6g6h5D5So0yS7zOCy98NT0EMTH1Og2NMHnraaq3h0lVxb86_WcVs-GZCZcCiqOt-Qee24nOJNBt0tymOcjiMQ7NWywwz0ACV2ZvrS4DSo5vi4nHTOwZQJ9xXUT8pSb9Qa7uoXmeGkdKfVAveN6sxA0at"
              )}
              name="Yash"
              quote="Built a strong peer network."
            />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden bg-gray-900 py-16 md:py-20">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-300">
            Join PeerConnect today and experience a smarter way to learn.
          </p>
          <div className="mt-7">
            <button
              onClick={onFindTutor}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 shadow-sm transition hover:scale-[1.02]"
            >
              Start Matching <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
