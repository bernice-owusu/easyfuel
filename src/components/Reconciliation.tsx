import React from "react";
import {
  Target,
  SearchCheck,
  Wrench,
  ShieldCheck,
  Lock,
  ArrowDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const VARIANCES = [
  "Stock Variances",
  "Cash Variances",
  "Payment Differences",
  "Sales Exceptions",
  "End-of-Day Exceptions",
];

const WORKFLOW: { label: string; icon: LucideIcon; note: string }[] = [
  { label: "Review", icon: SearchCheck, note: "Flagged & triaged" },
  { label: "Investigation", icon: Target, note: "Root cause traced" },
  { label: "Correction", icon: Wrench, note: "Records adjusted" },
  { label: "Approval", icon: ShieldCheck, note: "Controlled sign-off" },
  { label: "Closure", icon: Lock, note: "Audited & archived" },
];

export const Reconciliation: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 lg:py-28">
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#E17226]/10 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 mb-5">
              Reconciliation &amp; Variance Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Turn Discrepancies Into{" "}
              <span className="text-[#E17226]">Actionable Intelligence</span>
            </h2>
            <p className="text-white text-base sm:text-lg leading-relaxed mb-8">
              Fuel reconciliation can become complex when tank, pump, sales and
              payment data live in different places. EasyFuel brings these
              records together to identify the issues that matter.
            </p>

            <div className="flex flex-wrap gap-3 mb-9">
              {VARIANCES.map((v) => (
                <span
                  key={v}
                  className="text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-[#E17226] hover:text-[#E17226] transition-colors"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Workflow */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white shadow-2xl shadow-black/40 p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-7">
                <span className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 text-[#E17226] flex items-center justify-center">
                  <SearchCheck className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-gray-900 font-bold text-base leading-tight">
                    Resolution Workflow
                  </div>
                  <div className="text-xs text-gray-400">
                    Flagged → Investigated → Approved → Closed
                  </div>
                </div>
              </div>

              {/* Steps */}
              <ol className="space-y-2.5">
                {WORKFLOW.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.label} className="relative">
                      <div className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#E17226]/50 hover:shadow-lg hover:shadow-orange-500/10">
                        <span className="w-11 h-11 rounded-2xl bg-gray-100 text-gray-500 group-hover:bg-[#E17226] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30 flex items-center justify-center transition-all">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="flex-1">
                          <div className="text-gray-900 font-bold text-sm sm:text-base">
                            {step.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {step.note}
                          </div>
                        </div>
                        <span className="text-xs font-bold tabular-nums text-gray-300 group-hover:text-[#E17226] transition-colors">
                          0{i + 1}
                        </span>
                      </div>
                      {i < WORKFLOW.length - 1 && (
                        <ArrowDown className="w-4 h-4 text-gray-300 mx-auto relative z-10" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
