// src/pages/Pricing.jsx
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import PricingCard from "../components/PricingCard.jsx";
import toast from "react-hot-toast";
import { useUserData } from "../lib/useUserData";

export default function Pricing() {
  const { user } = useUser();
  const { setPlan } = useUserData();

  const handleUpgrade = (plan) => {
    // Demo: simulate checkout then redirect to success page
    toast.loading(`Redirecting to ${plan} checkout…`, { id: "checkout" });

    setTimeout(() => {
      toast.dismiss("checkout");
      setPlan(plan);
      toast.success(`${plan} plan activated!`);
      window.location.href = "/payment-success";
    }, 1200);

    // ⚡ In production:
    // Call your backend -> Stripe API -> get checkout session URL
    // window.location.href = checkoutUrl;
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#111827]">
          Choose your plan
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Free */}
          <PricingCard
            title="Free"
            subtitle="For casual learners"
            price="$0"
            features={[
              "Basic access to community",
              "Limited tutoring sessions",
              "Access to study groups",
            ]}
            cta={
              <button className="w-full rounded-md px-4 py-2 font-semibold text-[#111827] ring-1 ring-inset ring-[#E5E7EB] hover:bg-gray-50">
                Get Started
              </button>
            }
          />

          {/* Standard */}
          <PricingCard
            title="Standard"
            subtitle="For dedicated learners"
            price="$9.99"
            features={[
              "Unlimited tutoring sessions",
              "Priority support",
              "Access to exclusive content",
            ]}
            highlight
            cta={
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full rounded-md bg-[#111827] px-4 py-2 font-semibold text-white shadow-sm hover:bg-[#111827]/90">
                      Sign in to Upgrade
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <button
                    onClick={() => handleUpgrade("Standard")}
                    className="w-full rounded-md bg-[#111827] px-4 py-2 font-semibold text-white shadow-sm hover:bg-[#111827]/90"
                  >
                    Upgrade Now
                  </button>
                </SignedIn>
              </>
            }
          />

          {/* Premium */}
          <PricingCard
            title="Premium"
            subtitle="For high achievers"
            price="$19.99"
            features={[
              "All features of Standard",
              "Personalized learning path",
              "One-on-one mentorship",
            ]}
            cta={
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full rounded-md bg-[#111827] px-4 py-2 font-semibold text-white shadow-sm hover:bg-[#111827]/90">
                      Sign in to Upgrade
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <button
                    onClick={() => handleUpgrade("Premium")}
                    className="w-full rounded-md bg-[#111827] px-4 py-2 font-semibold text-white shadow-sm hover:bg-[#111827]/90"
                  >
                    Upgrade Now
                  </button>
                </SignedIn>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
