// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import { Bell, Search, CalendarDays, Clock, Lock, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import { useUser, UserButton } from "@clerk/clerk-react"; // Clerk
import { useUserData } from "../lib/useUserData";

const MESSAGES = [
  {
    id: "m1",
    name: "Alex",
    text: "Hey, are you ready for our session tomorrow?",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7vYN4r47...",
  },
  {
    id: "m2",
    name: "Ben",
    text: "Great session today! Let me know if you have any questions.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6hZ4BAVK...",
  },
  {
    id: "m3",
    name: "Jane Doe",
    text: "Just confirming our first session on Friday. Looking forward to it!",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnwAxIZfb...",
  },
];

export default function Dashboard() {
  const { user } = useUser();
  const displayName = user ? `Welcome back, ${user.firstName || user.username}!` : "Welcome back!";
  const { sessions, stats } = useUserData();

  const handleViewMessage = (name) =>
    toast.success(`Opening conversation with ${name}…`);
  const handleSessionClick = (title) =>
    toast(`Session: ${title}`, { icon: "📚" });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E7EB] bg-white px-6 md:px-10 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Trophy className="h-6 w-6" />
            PeerConnect
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link className="font-medium text-[#111827]" to="/dashboard">
              Dashboard
            </Link>
            <Link className="text-[#6B7280] hover:text-[#111827]" to="/ai">
              AI Features
            </Link>
            <Link className="text-[#6B7280] hover:text-[#111827]" to="/badges">
              Badges
            </Link>
            <Link className="text-[#6B7280] hover:text-[#111827]" to="/pricing">
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-[#6B7280] hover:text-[#111827]" title="Search">
            <Search className="h-5 w-5" />
          </button>
          <button className="relative text-[#6B7280] hover:text-[#111827]" title="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Clerk User Avatar */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 bg-[#F9FAFB] p-8 lg:p-12">
        <div className="mx-auto max-w-7xl">
          {/* Welcome */}
          <div className="mb-8 flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-16"
              style={{
                backgroundImage: `url("${user?.imageUrl ||
                  "https://lh3.googleusercontent.com/aida-public/default-avatar"}")`,
              }}
            />
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">
                {displayName}
              </h1>
              <p className="text-[#6B7280]">
                Here&apos;s your learning dashboard for today.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Sessions + Messages */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Sessions */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[#111827]">
                  Upcoming Sessions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sessions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSessionClick(s.subject)}
                      className="text-left bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-4 flex items-start gap-4 hover:shadow-md transition"
                    >
                      <div
                        className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
                        style={{ backgroundImage: `url("https://picsum.photos/200?${s.id}")` }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-[#111827]">{s.subject}</p>
                        <p className="text-sm text-[#6B7280]">as {s.role}</p>
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#6B7280]">
                          <CalendarDays className="h-4 w-4" />
                          <span>{new Date(s.start).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#6B7280]">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(s.start).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Messages */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[#111827]">Messages</h2>
                <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6">
                  <ul className="-my-4 divide-y divide-[#E5E7EB]" role="list">
                    {MESSAGES.map((m) => (
                      <li key={m.id} className="flex items-center gap-4 py-4">
                        <div
                          className="h-10 w-10 rounded-full bg-center bg-cover flex-shrink-0"
                          style={{ backgroundImage: `url("${m.avatar}")` }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#111827]">
                            {m.name}
                          </p>
                          <p className="truncate text-sm text-[#6B7280]">
                            {m.text}
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewMessage(m.name)}
                          className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          View
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Right: Badges */}
            <div className="lg:col-span-1 space-y-8">
              <section className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6">
                <h2 className="mb-4 text-xl font-bold text-[#111827]">
                  Badges Earned
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <p className="text-sm text-gray-500">
                    Coming soon: sync with /badges progress
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
