import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 text-center px-6"
    >
      <div className="space-y-6 max-w-3xl">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight scroll-reveal opacity-0 transform translate-y-8">
          One Last Celebration with
          <span className="block text-[#dc2626]">Luminaries 26</span>
        </h2>

        <p className="text-lg text-[#991b1b] scroll-reveal opacity-0 transform translate-y-8">
          Our final rag day — a chapter of friendship, laughter, and
          unforgettable memories. Let’s make this the highlight of our school
          life.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-[#dc2626] text-white px-8 py-3 rounded-full shadow-xl hover:scale-105 transition">
            Get Ticket
          </button>
          <button className="border-2 border-[#dc2626] px-8 py-3 rounded-full text-[#7f1d1d] hover:bg-[#ffe4e6] transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
