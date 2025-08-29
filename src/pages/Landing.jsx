import toast from "react-hot-toast";
import TestimonialCard from "../components/TestimonialCard.jsx";

const AV = (id) => `https://lh3.googleusercontent.com/aida-public/${id}`;

export default function Landing() {
  const onFindTutor = () => toast.success("Opening tutor matcher…");

  return (
    <>
      {/* HERO */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <div className="h-10 w-10 bg-black rounded" />
          </div>
          <h1 className="mb-4 text-4xl md:text-6xl font-bold">Elevate your learning experience with peers</h1>
          <p className="mb-8 text-lg text-[#6B7280]">Connect with fellow students, share knowledge, and achieve success together.</p>
          <button onClick={onFindTutor} className="rounded-md bg-[#111827] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#111827]/90">
            Find a Tutor
          </button>
        </div>
      </section>

      {/* 3 FEATURES */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { t: "Earn Badges", d: "Unlock achievements and showcase your expertise." },
              { t: "Flexible Hours", d: "Learn at your own pace, anytime, anywhere." },
              { t: "Real-Time Connections", d: "Engage with peers instantly for collaborative learning." },
            ].map((f) => (
              <div key={f.t} className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <div className="h-6 w-6 bg-black rounded" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#111827]">{f.t}</h3>
                <p className="text-[#6B7280]">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#111827]">
            Join our community of passionate learners
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <TestimonialCard
              avatar={AV("AB6AXuC7KCK7pP_Au3EQoyO17V84czbmuqIUaMcAwrQuCcv2FRzBtnc9u_U8DgBCKHKKtBM4EvvK1Q1KuZwFBitWFMBASdgHaW6jtUVoMjP38_kZW_r4ra3u_DluWhXLsYlfAjZQarXq1du-cuuxyQ8vmVthjCg1AB16pi_ZkfKcwjBnsblkqvJ5m--7I7uG0281iNM3nkFysBYXi_5oHBfQrrFQJeWfXCpiptPNoPGm0X8oBhqDW_zpgidZrJcHku5FWtJYnSHpQLep8aNP")}
              name="Sarah M." quote="PeerConnect transformed my study habits." />
            <TestimonialCard
              avatar={AV("AB6AXuBEf-1Q-e9fPLViJEubZEHe6EL8fagnkD9oJxL_c7XF4IFqidl0aoARZS9Dc9YPyUpl-nDsZEZVlPFhqdB7UT2SMI0-Dq1_S2Kv3A3CAOI1IA4PzPU_0qq8rWkssbqISa7YE1QZHmWjRqEt16CmXuc-RtidT9g0gRA2kqot-Aqbo7qgdNNzXrw06I5jTjzg6zVZJ9kUzEb7fG7RGayeCiGXDk8GCC7CfEGwb8_dg0VYRavxMiYj-pYUssBa4dtOvP9aTuEPTDtIR80K")}
              name="David L." quote="Real-time interaction makes learning engaging." />
            <TestimonialCard
              avatar={AV("AB6AXuBm9iD97fnP1jZTKr3GDT3aYj6Y6CvPc8e8Th70acgGQZayWUnnXPHtra3Itrit7hudvL1RgLWm6ywztPmxxUiJA7LX2ENbmC3S3n_6VEagb5LApZMzseSY2TBJFn9lzBC-8YgH9UK_FtcNsvxrVRqL0k2bzLrGp9NdblaZLBMvbHLY70ocOmmgcilcGowlJKuqMQ0LER00N-iy7aKxqJH1SC_NK2wdtkHN-Jc7DtZegUMo5HWBG-wTHLDmszxLMqmRY85J4npVLti5")}
              name="Emily R." quote="Badges keep me motivated to learn." />
            <TestimonialCard
              avatar={AV("AB6AXuCL0aUxbPiFcAS4EoOLc87PxYRVqmAZUgr4QD_QKKG8dk82ow3_62wNNuDgJMY-tWeVnclMBe_cMhlbQqtqXjlfkECDbLvwc70HSnI0cv3D0VwsvyUOe9ZA6g6h5D5So0yS7zOCy98NT0EMTH1Og2NMHnraaq3h0lVxb86_WcVs-GZCZcCiqOt-Qee24nOJNBt0tymOcjiMQ7NWywwz0ACV2ZvrS4DSo5vi4nHTOwZQJ9xXUT8pSb9Qa7uoXmeGkdKfVAveN6sxA0at")}
              name="Michael K." quote="Built a strong peer network." />
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW MOVED TO /pricing PAGE */}
    </>
  );
}
