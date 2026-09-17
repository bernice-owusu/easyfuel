import React from "react";
import {
  Banknote,
  CreditCard,
  Smartphone,
  Landmark,
  IdCard,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CHANNELS: { name: string; icon: LucideIcon }[] = [
  { name: "Cash", icon: Banknote },
  { name: "POS", icon: CreditCard },
  { name: "Mobile Money", icon: Smartphone },
  { name: "Banking", icon: Landmark },
  { name: "Fuel Cards", icon: IdCard },
];

export const Payments: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6">
            <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
              Payment Management
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight mb-6">
              Every Sale. Every Payment Channel.{" "}
              <b className="text-[#E17226]">Accounted For.</b>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              EasyFuel supports station-level accountability across all the
              payment channels your stations handle every day, and connects
              payment information with sales and reconciliation processes to
              improve visibility and accountability.
            </p>
            <a
              href="#quotation"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-navy hover:bg-brand-orange text-white font-semibold text-sm rounded-full transition-colors shadow-md group"
            >
              Talk to Our Team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right: Channels */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CHANNELS.map((ch) => {
                const Icon = ch.icon;
                return (
                  <div
                    key={ch.name}
                    className="group rounded-2xl bg-[#f8f9fa] border border-gray-100 hover:bg-brand-navy hover:border-brand-navy hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center flex flex-col items-center"
                  >
                    <span className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-[#E17226] flex items-center justify-center mb-3 group-hover:bg-[#E17226] group-hover:border-[#E17226] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="text-sm font-bold text-gray-900 group-hover:text-white transition-colors">
                      {ch.name}
                    </span>
                  </div>
                );
              })}
              <div className="rounded-2xl bg-[#E17226] p-6 text-center flex flex-col items-center justify-center shadow-lg shadow-orange-900/25 hover:-translate-y-1 transition-all duration-300">
                <span className="text-2xl font-bold text-white leading-none">
                  5+
                </span>
                <span className="text-xs font-semibold text-white/85 mt-1">
                  channels, one reconciliation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};