import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import PricingCard from "../components/PricingCard.jsx";

export default function Pricing() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#111827]">Choose your plan</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            title="Free"
            subtitle="For casual learners"
            price="$0"
            features={["Basic access to community","Limited tutoring sessions","Access to study groups"]}
            cta={<button className="w-full rounded-md px-4 py-2 font-semibold text-[#111827] ring-1 ring-inset ring-[#E5E7EB] hover:bg-gray-50">Get Started</button>}
          />

          <PricingCard
            title="Standard"
            subtitle="For dedicated learners"
            price="$9.99"
            features={["Unlimited tutoring sessions","Priority support","Access to exclusive content"]}
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
                  <button className="w-full rounded-md bg-[#111827] px-4 py-2 font-semibold text-white shadow-sm hover:bg-[#111827]/90">
                    Upgrade Now
                  </button>
                </SignedIn>
              </>
            }
          />

          <PricingCard
            title="Premium"
            subtitle="For high achievers"
            price="$19.99"
            features={["All features of Standard","Personalized learning path","One-on-one mentorship"]}
            cta={<button className="w-full rounded-md px-4 py-2 font-semibold text-[#111827] ring-1 ring-inset ring-[#E5E7EB] hover:bg-gray-50">Upgrade Now</button>}
          />
        </div>
      </div>
    </section>
  );
}
