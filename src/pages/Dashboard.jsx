// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import { Bell, Search, CalendarDays, Clock, Lock, Trophy } from "lucide-react";
import toast from "react-hot-toast";
// Optional Clerk (uncomment if you use Clerk):
// import { useUser } from "@clerk/clerk-react";

const SESSIONS = [
  {
    id: "calc-2",
    title: "Calculus II",
    tutor: "Alex",
    date: "Tomorrow",
    time: "3:00 PM - 4:00 PM",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7vYN4r47MP7rlG3ZgROdJ79Vthum-jbCvNLjNtjyPNPm3lxe8fVCh9hZ_razWOXbbsrz49LgwnyyULHM3o3Dv7BtYnPySqER5FkeJzudSZzi9bDfzoprKhvogd9tskZzZ31Mm5zv7suYNqgL06c8Qrlm23AAQNi9oFXq9aGlmG16_WphBopnX34CpZI5iiigmei7zCSGKVzbVJdCNT5JfDgVDdRJDHspDHI0p1aG9oJL17dr33L_EQx7MX2kUL_ki48gRHwYKzzZ",
  },
  {
    id: "world-history",
    title: "World History",
    tutor: "Ben",
    date: "Monday, Oct 28",
    time: "5:00 PM - 6:00 PM",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6hZ4BAVKKUGctf66aGZSwboh4jQMo_OfZYmLPbTjHiNjaF4wmvyFUTjzkVk2qrCdPRwKrIuigmfiONgKBKvJb4twwLYudGRBzHHEspQSx8es1PHCPqujpmWqCYDOFJtmr_V27YEUxKh2DCMS409rUGSqXTLOH3Zsjv3RNywtIYJh7W7C1TYZeAtqHdO0OtXq4e46mzV8Dk-sosiB714CXk5dxdm4_LuoI1GXBnlu2qOAh01IJsJR_mRhLLgut92YlC5ow2qp9x54v",
  },
];

const MESSAGES = [
  {
    id: "m1",
    name: "Alex",
    text: "Hey, are you ready for our session tomorrow?",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7vYN4r47MP7rlG3ZgROdJ79Vthum-jbCvNLjNtjyPNPm3lxe8fVCh9hZ_razWOXbbsrz49LgwnyyULHM3o3Dv7BtYnPySqER5FkeJzudSZzi9bDfzoprKhvogd9tskZzZ31Mm5zv7suYNqgL06c8Qrlm23AAQNi9oFXq9aGlmG16_WphBopnX34CpZI5iiigmei7zCSGKVzbVJdCNT5JfDgVDdRJDHspDHI0p1aG9oJL17dr33L_EQx7MX2kUL_ki48gRHwYKzzZ",
  },
  {
    id: "m2",
    name: "Ben",
    text: "Great session today! Let me know if you have any questions.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6hZ4BAVKKUGctf66aGZSwboh4jQMo_OfZYmLPbTjHiNjaF4wmvyFUTjzkVk2qrCdPRwKrIuigmfiONgKBKvJb4twwLYudGRBzHHEspQSx8es1PHCPqujpmWqCYDOFJtmr_V27YEUxKh2DCMS409rUGSqXTLOH3Zsjv3RNywtIYJh7W7C1TYZeAtqHdO0OtXq4e46mzV8Dk-sosiB714CXk5dxdm4_LuoI1GXBnlu2qOAh01IJsJR_mRhLLgut92YlC5ow2qp9x54v",
  },
  {
    id: "m3",
    name: "Jane Doe",
    text: "Just confirming our first session on Friday. Looking forward to it!",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnwAxIZfbvn-Qr8zgknMl5uoblFAWsMGsyPxCKkg-zh48LWh9tWbBHQnmJ6S_CafCxpccNI-ffQUOeEYXxsDw2j3_vOlclqklKbr9QEQCZvBjvGzgjMuiiqalFmTJ7-2g9h-X_mF7zevVsZ-y7SMB0jO9dImWJCCH_Qrn-owfDj8-A69Y42C_GyQ48Tl2OSDYN_jOjmqQmvPfWvJ2yEdx7TdRDI8toOndT8PUyS4X3pMmXUS4UBAy0oBA_ZopYshTe1u52bP-c8Ppi",
  },
];

const BADGES = [
  {
    id: "b1",
    title: "Math Whiz",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaWehUr0-prtI_D5FUd8anKOilEkny0Fil0yCJC61ttcD1FYMnbkjDvRFr5a-QElIjI_Yrg7yu5Hl8lytA8fdj09tTgxrxyz3GiCAKCEyqwI10ub00tod5Y--89JTBSZ5TbL7CZXrmLZEarcCUf8rByisFyzfn4KOedZt7uRfwQqOviNoBYfstdi-5E10zyIamWGmkWqUFARyMhV-WxToDISMzNZ8k3KQiIQUal9XNcHkDHtlRowibitP0Y4_hb8UGey2tJiuOlv2B",
  },
  {
    id: "b2",
    title: "History Buff",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB1SKPP1AZSVg3riYwfYhFWEEaSrjjuIK06VrEwFWYXaewszw93URLYEGaImW1zZXhXCY5mzuz8RwhMh88Cxn7KV0f0ysfikyOjcxQ6fdjFPUoXvLMxGLxbmoX__auTALd0uUzqycM3ZKO_Cc07u9wRDbyQtuNFF6c-j3B_C8bRa3pU3F_kD74NqRoaVD4rsWcO_d29IDKKudvHCtGK1lOwMPQAELRoCgqghp0ZMyxg1MzzMstroam6bc7VbGnj_riTca3oiDWfYJJ",
  },
  {
    id: "b3",
    title: "Perfect Attendance",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9pocNsmRokUlFKu7U5j3mAffQWQ6VgANas5G3qMs9iGX6j7UJrzyq8FQt1JX1Hvdum6hJhxbQ05JH0-hFbxV1xPdeuBewbd9QQqCHeSS5dlBWZjPbutYDBtROobu-Uv9eOybzcn-2IBwWpQ7-3g7Ll6i9YWQAtfbq6mT7ZClajqOrrbFt8kwylZTHOkJFirjAs6OhVpm4Qbc2C7eneCECrXuQI7YL7_V-NSqUqzPbhE_Q_U771igcPLunuxz9hCoOjfO2nAh9Jw_z",
  },
];

export default function Dashboard() {
  // Optional Clerk:
  // const { user } = useUser();
  // const displayName = user?.firstName ? `Welcome back, ${user.firstName}!` : "Welcome back!";

  const displayName = "Welcome back, Sarah!"; // remove if using Clerk above

  const handleViewMessage = (name) =>
    toast.success(`Opening conversation with ${name}…`);
  const handleSessionClick = (title) =>
    toast(`Session: ${title}`, { icon: "📚" });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top bar (use your global Navbar if preferred) */}
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

          {/* Replace with <UserButton /> from Clerk if using Clerk */}
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZRTKM3VojEHJkt1e1ObvdhLho_hWP3Tra1kpy0XqdGebHCqx1boROP1lpLpqASA4us0aXm2If-KgW3nQPn6JP2BJLysCq3of1bSa6P5ghstgGqtaIuhcsNFTrkjqal6XyS1cRtKBzyc7f-a3_NAH1xU3uMPdc2zfF1LYjDu6DYCsVfgsFJPY9K9mLzUS-_GHntrbzCCPPRqBX6rmwPyQou6cDqrQt-E_K2LjE3E8KOJP6TV9rUOHvBRJpImmCOQdM4CtTht1nzWSs")',
            }}
          />
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
                backgroundImage:
                  
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBZRTKM3VojEHJkt1e1ObvdhLho_hWP3Tra1kpy0XqdGebHCqx1boROP1lpLpqASA4us0aXm2If-KgW3nQPn6JP2BJLysCq3of1bSa6P5ghstgGqtaIuhcsNFTrkjqal6XyS1cRtKBzyc7f-a3_NAH1xU3uMPdc2zfF1LYjDu6DYCsVfgsFJPY9K9mLzUS-_GHntrbzCCPPRqBX6rmwPyQou6cDqrQt-E_K2LjE3E8KOJP6TV9rUOHvBRJpImmCOQdM4CtTht1nzWSs"
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
                  {SESSIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSessionClick(s.title)}
                      className="text-left bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-4 flex items-start gap-4 hover:shadow-md transition"
                    >
                      <div
                        className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
                        style={{ backgroundImage: `url("${s.img}")` }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-[#111827]">{s.title}</p>
                        <p className="text-sm text-[#6B7280]">with {s.tutor}</p>
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#6B7280]">
                          <CalendarDays className="h-4 w-4" />
                          <span>{s.date}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#6B7280]">
                          <Clock className="h-4 w-4" />
                          <span>{s.time}</span>
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

                  <div className="mt-6">
                    <Link
                      to="/messages"
                      className="block w-full text-center rounded-lg border border-black px-4 py-2 font-semibold hover:bg-gray-50"
                    >
                      View All Messages
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: Badges + Recent Activity */}
            <div className="lg:col-span-1 space-y-8">
              {/* Badges Earned */}
              <section className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6">
                <h2 className="mb-4 text-xl font-bold text-[#111827]">
                  Badges Earned
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {BADGES.map((b) => (
                    <div key={b.id} className="flex flex-col items-center text-center">
                      <div
                        className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-lg"
                        style={{ backgroundImage: `url("${b.img}")` }}
                      />
                      <p className="mt-2 text-xs font-medium text-[#111827]">
                        {b.title}
                      </p>
                    </div>
                  ))}

                  {/* Locked examples */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`locked-${i}`} className="flex flex-col items-center text-center">
                      <div className="w-full aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="mt-2 text-xs font-medium text-gray-400">
                        Locked
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6">
                <h2 className="mb-4 text-xl font-bold text-[#111827]">
                  Recent Activity
                </h2>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="size-12 rounded-lg bg-center bg-no-repeat bg-cover"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBsXckqhfuDEAfGI7N9Zb66K9cpWydy9hJUgsF1Lz5_ENPZdabs5r43_4CnLEy5Emj-vLKSNIimh0LFyN5cj25rTrNAtSJR6klOueBRzSlCMCuVvGcKkHVyrpuhUwDR4EHrYBH9H-rY4BFJRkMBdm1YOEm-6Fjflf5WIIPfqD9k_wEh2oy4kFRlOP4I4ZjR_ujxK4ANX4a6_hKx3DjSC7RPrjJtWHmBmqvcodria3ldOvc-8yv-6lOKUoaRjMwsP-e0jTskRJa9o1y")',
                        }}
                      />
                      <div>
                        <p className="font-semibold text-[#111827]">Session with Alex</p>
                        <p className="text-sm text-[#6B7280]">Calculus II — Completed</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B7280]">Yesterday</p>
                  </div>

                  <div className="border-t border-[#E5E7EB]" />

                  {/* Item 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="size-12 rounded-lg bg-center bg-no-repeat bg-cover"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDNvEY58mwwtxDThJ3UwKgTE-LEl8UkIG2hAXSk1HNpD5l_vN2v7yGVd6xqkwckZoq9vBB2Q4vPDDd9YZvN98OEuNvTk3wGQ1rK5DoWa5TDdQ3RcyWbmg9Rhftnwf1czBWFPfF-bh7CLY1vyQdLLp7P38n3yTA3lo8Qv3anackTjClTfwmP37eZHBYDqrEXbml-boY_DgS8hpJnhI62Q85q8FBFpt7D-l1PZmoxTzY_UiUCRsB1oKHsJzF7yvzkmTfGz3LYvi963hR")',
                        }}
                      />
                      <div>
                        <p className="font-semibold text-[#111827]">Session with Ben</p>
                        <p className="text-sm text-[#6B7280]">World History — Completed</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B7280]">2 days ago</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
