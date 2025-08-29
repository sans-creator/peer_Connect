export default function PricingCard({ title, subtitle, price, features = [], highlight, cta }) {
  return (
    <div className={`flex flex-col p-8 ${highlight ? "relative border-2 border-black shadow-lg rounded-lg bg-white" : "rounded-lg border border-[#E5E7EB] shadow-sm bg-white"}`}>
      {highlight && (
        <span className="absolute top-0 -translate-y-1/2 rounded-full bg-black px-3 py-1 text-sm font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="mb-2 text-xl font-semibold text-[#111827]">{title}</h3>
      <p className="mb-6 text-[#6B7280]">{subtitle}</p>
      <p className="mb-6">
        <span className="text-4xl font-bold text-[#111827]">{price}</span>
        <span className="text-[#6B7280]">/month</span>
      </p>
      <ul className="mb-8 space-y-3 text-[#6B7280]">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
            {f}
          </li>
        ))}
      </ul>
      {cta}
    </div>
  );
}
