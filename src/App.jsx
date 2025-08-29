// src/App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Protected from "./components/ProtectedRoute.jsx";

const Landing   = lazy(() => import("./pages/Landing.jsx"));
const Pricing   = lazy(() => import("./pages/Pricing.jsx"));
const AIFeatures= lazy(() => import("./pages/AIFeatures.jsx"));
const About     = lazy(() => import("./pages/About.jsx"));
const Badges    = lazy(() => import("./pages/Badges.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const FindTutor = lazy(() => import("./pages/FindTutor.jsx"));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-8">Loading…</div>}>
          <Routes>
            {/* public */}
            <Route path="/" element={<Landing />} />

            {/* protected */}
            <Route path="/pricing" element={<Protected><Pricing /></Protected>} />
            <Route path="/ai" element={<Protected><AIFeatures /></Protected>} />
            <Route path="/about" element={<Protected><About /></Protected>} />
            <Route path="/badges" element={<Protected><Badges /></Protected>} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/find-tutor" element={<Protected><FindTutor /></Protected>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
