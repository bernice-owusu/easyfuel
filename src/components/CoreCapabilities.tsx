import React from "react";
import {
  Route,
  LayoutDashboard,
  RefreshCcw,
  ShieldCheck,
  Wallet,
  ArrowDownRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Capability {
  number: string;
  title: string;
  description: string;
  message: string;
  icon: LucideIcon;
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "End-to-End Fuel Accountability",
    description:
      "Track fuel from delivery and tank receipt through pump/nozzle movement, attendant sales, payment collection, banking and reconciliation.",
    message: "Know where every litre goes.",
    icon: Route,
  },
  {
    number: "02",
    title: "Multi-Station Command Centre",
    description:
      "Manage your entire network from one centralized platform. Monitor station performance, KPIs, trends and exceptions while drilling down into individual locations.",
    message: "One view of every station.",
    icon: LayoutDashboard,
  },
  {
    number: "03",
    title: "Automated Reconciliation",
    description:
      "Reconcile tank, pump meter, sales and payment data while identifying stock and cash variances for timely review and resolution.",
    message: "Reconcile faster. Detect variances earlier.",
    icon: RefreshCcw,
  },
  {
    number: "04",
    title: "Approvals & End-of-Day Controls",
    description:
      "Establish structured workflows for station activities, stock, variances and end-of-day submissions with complete approval history.",
    message: "Every action accountable.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Attendant & Payment Management",
    description:
      "Track attendant-level sales and shift accountability across cash, banking, POS, mobile money and fuel-card transactions.",
    message: "Know who sold, collected and submitted.",
    icon: Wallet,
  },
];

export const CoreCapabilities: React.FC = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight mb-5">
              Everything You Need to{" "}
              <b className="text-[#E17226]">Control Your Fuel Operations</b>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Five connected capabilities that turn fragmented station processes
              into one accountable, real-time control platform.
            </p>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-orange transition-colors"
            >
              See how it works
              <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Numbered list */}
          <div className="lg:col-span-8 space-y-4">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.number}
                  className="group relative rounded-3xl bg-[#f8f9fa] border border-gray-100 hover:border-[#E17226]/30 hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-6 sm:p-7 flex items-start gap-5"
                >
                  <span className="font-teko text-5xl font-bold text-gray-200 group-hover:text-[#E17226]/20 transition-colors leading-none select-none">
                    {cap.number}
                  </span>
                  <span className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-[#E17226] flex items-center justify-center shrink-0 group-hover:bg-[#E17226] group-hover:border-[#E17226] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 group-hover:text-[#E17226] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">
                      {cap.description}
                    </p>
                    <span className="inline-block text-xs font-semibold text-[#E17226] bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
                      {cap.message}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};