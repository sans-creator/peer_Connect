// src/pages/PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("🎉 Upgrade successful! Welcome to your new plan.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold text-[#111827] mb-4">
          Payment Successful 🎉
        </h1>
        <p className="text-[#6B7280] mb-6">
          Your plan has been upgraded successfully. You now have access to all premium features!
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#111827] text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-[#111827]/90"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
