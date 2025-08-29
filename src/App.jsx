// src/App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Lazy-load pages (only import lazy/Suspense once!)
const Landing = lazy(() => import("./pages/Landing.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const AIFeatures = lazy(() => import("./pages/AIFeatures.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Badges = lazy(() => import("./pages/Badges.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const FindTutor = lazy(() => import("./pages/FindTutor.jsx"));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<div className="p-8">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/ai" element={<AIFeatures />} />
            <Route path="/about" element={<About />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/find-tutor" element={<FindTutor />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
