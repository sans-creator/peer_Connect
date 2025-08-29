// src/pages/AIFeatures.jsx
import { UsersRound, FileText, Bot, Medal } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Optional mini-demo that calls Gemini when VITE_GEMINI_API_KEY is set */
function FlashcardDemo() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const generate = async () => {
    if (!apiKey) {
      toast.error("Missing VITE_GEMINI_API_KEY");
      return;
    }
    if (!text.trim()) {
      toast("Paste some notes first!");
      return;
    }
    try {
      setLoading(true);
      const resp = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          apiKey,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      'From the following tutoring notes, generate 5 concise Q&A flashcards ' +
                      'as JSON: [{"q":"...","a":"..."}]. Notes:\n\n' +
                      text,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await resp.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const match = raw.match(/\[[\s\S]*\]/);
      const parsed = match ? JSON.parse(match[0]) : [];
      setCards(parsed.slice(0, 5));
      toast.success("Flashcards ready!");
    } catch (e) {
      console.error(e);
      toast.error("Couldn’t generate right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-[#111827]">Try: Summarize → Flashcards</h3>
      <p className="muted mb-3 text-sm">
        Paste a short session summary. 
      </p>
      <textarea
        className="w-full rounded-md border border-[#E5E7EB] p-3 text-sm outline-none focus:ring-2 focus:ring-black"
        rows={5}
        placeholder="Paste a few bullet points about what you studied…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-3 flex items-center gap-3">
        <button onClick={generate} className="btn-primary" disabled={loading}>
          {loading ? "Generating…" : "Generate Flashcards"}
        </button>
        {!import.meta.env.VITE_GEMINI_API_KEY && (
          <span className="text-xs text-[#6B7280]">
            Tip: set <code>VITE_GEMINI_API_KEY</code> in <code>.env.local</code>
          </span>
        )}
      </div>

      {!!cards.length && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {cards.map((c, i) => (
            <div key={i} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
              <div className="text-sm font-semibold">Q{i + 1}. {c.q}</div>
              <div className="mt-1 text-sm text-[#6B7280]">A. {c.a}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AIFeatures() {
  const navigate = useNavigate();

  // Navigate to FindTutor with auto match. You can prefill subject/level here.
  const goToAutoMatch = () => {
    navigate(
      `/find-tutor?subject=Calculus&level=College&auto=1`
      // date/time omitted on purpose — FindTutor will default to next full hour in auto mode
    );
  };

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="py-20 text-center md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl md:text-6xl">
            Smarter Learning with AI
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6B7280]">
            Harnessing the power of AI to make tutoring more effective and accessible than ever before.
          </p>
        </div>
      </section>

      {/* FOUR AI FEATURES */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-black text-white">
                <UsersRound className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">Tutor Matching AI</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                Best peer match by subject, availability, and reviews.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-black text-white">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">Session Summaries &amp; Flashcards</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                Auto-generate notes and flashcards after sessions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-black text-white">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">AI Chat Assistant</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                24/7 fallback tutor for instant answers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-black text-white">
                <Medal className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">Gamified AI Badges</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                AI awards badges dynamically based on activity &amp; reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEE AI IN ACTION */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-[#111827]">
            See AI in Action
          </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            <FlashcardDemo />

            <div className="card p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-bold text-[#111827]">Try AI-Powered Tutoring</h3>
              <p className="muted mt-2 max-w-sm">
                Click the button to jump straight into the auto-match flow with a prefilled subject.
              </p>
              <button onClick={goToAutoMatch} className="mt-4 btn-primary">
                Try AI-Powered Tutoring
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
            Join PeerConnect today and experience a smarter way to learn.
          </p>
          <div className="mt-8">
            <button
              onClick={goToAutoMatch}
              className="inline-block rounded-md bg-black px-8 py-3 text-base font-medium text-white shadow-lg transition-transform hover:scale-105"
            >
              Try AI-Powered Tutoring
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
