export default function TestimonialCard({ avatar, name, quote }) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <img src={avatar} alt={name} className="h-12 w-12 rounded-full" />
        <h4 className="font-semibold">{name}</h4>
      </div>
      <p className="mt-4 text-[#6B7280]">“{quote}”</p>
    </div>
  );
}
