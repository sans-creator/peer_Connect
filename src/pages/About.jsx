// src/pages/About.jsx
import { ShieldCheck, Sparkles, Handshake } from "lucide-react";

const TEAM = [
  { name: "Riya Sharma", role: "Product Lead" },
  { name: "Ethan Walker", role: "Full-Stack Engineer" },
  { name: "Sofia Bennett", role: "ML Engineer" },
  { name: "Liam Harper", role: "Design" },
];

export default function About() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Our Mission</h1>
          <p className="mt-4 text-lg text-[#6B7280]">
            PeerConnect exists to make personalized learning accessible to everyone—by
            connecting peers, surfacing knowledge fast, and celebrating progress.
          </p>
        </div>

        {/* Values */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Trust</h3>
            <p className="text-sm text-[#6B7280] mt-1">
              Ratings, reviews, and verified profiles keep the community safe.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Innovation</h3>
            <p className="text-sm text-[#6B7280] mt-1">
              AI-powered matching, summaries, and badges to supercharge learning.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <Handshake className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Accessibility</h3>
            <p className="text-sm text-[#6B7280] mt-1">
              Inclusive design, mobile-first UX, and fair pricing for students.
            </p>
          </div>
        </section>

        {/* Tiny timeline */}
        <section className="mt-12 card p-6">
          <h3 className="text-lg font-semibold mb-4">How we started</h3>
          <ol className="relative border-l border-[#E5E7EB] pl-6 space-y-6">
            <li>
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-black" />
              <div className="font-medium">2023 — Idea</div>
              <p className="text-sm text-[#6B7280]">
                Noticed students struggling to find timely, affordable help.
              </p>
            </li>
            <li>
              <div className="absolute -left-[9px] top-[68px] h-4 w-4 rounded-full bg-black" />
              <div className="font-medium">2024 — Prototype</div>
              <p className="text-sm text-[#6B7280]">
                Built the first AI-assisted matching and session summaries.
              </p>
            </li>
            <li>
              <div className="absolute -left-[9px] top-[136px] h-4 w-4 rounded-full bg-black" />
              <div className="font-medium">Today — Community</div>
              <p className="text-sm text-[#6B7280]">
                Thousands of sessions, growing library of shared notes & flashcards.
              </p>
            </li>
          </ol>
        </section>

        {/* Team */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold mb-4 text-center">The Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="card p-6 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-200" />
                <div className="mt-3 font-medium">{m.name}</div>
                <div className="text-sm text-[#6B7280]">{m.role}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
