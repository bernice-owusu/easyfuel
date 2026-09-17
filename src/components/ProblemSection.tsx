import React from "react";
import { HelpCircle, ArrowRight } from "lucide-react";

const QUESTIONS = [
  "How much fuel was delivered?",
  "How much entered each tank?",
  "How much was dispensed?",
  "What was actually sold?",
  "What payments were collected?",
  "What was banked?",
  "Where did a variance occur?",
  "Who was responsible?",
  "Has the issue been reviewed and resolved?",
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-10">
      {/* Decorations */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#E17226]/10 blur-3xl" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-white/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Headline */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 mb-5">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Fuel Operations Shouldn&apos;t Be a{" "}
              <span className="text-[#E17226]">Blind Spot</span>
            </h2>
            <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
              Managing multiple fuel stations means managing thousands of
              transactions across attendants, shifts, tanks, pumps and payment
              channels.
            </p>
            <p className="text-white text-base leading-relaxed mb-8">
              When these processes depend on paper records, spreadsheets and
              disconnected systems, it becomes difficult to answer critical
              questions.
            </p>
          </div>

          {/* Right: Questions */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {QUESTIONS.map((q, i) => (
                <div
                  key={q}
                  className="group flex items-center gap-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E17226]/50 hover:bg-white/10 transition-all p-4"
                >
                  <span className="w-9 h-9 rounded-lg bg-[#E17226]/15 text-[#E17226] flex items-center justify-center shrink-0 group-hover:bg-[#E17226] group-hover:text-white transition-colors">
                    <HelpCircle className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-sm text-white font-medium leading-snug">
                    {q}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#E17226] ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
                  <span className="sr-only">#{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
