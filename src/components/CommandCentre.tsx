import React from "react";
import { MonitorDot, Check, ArrowRight, ChevronDown } from "lucide-react";

const MONITORS = [
  "Station performance",
  "Fuel volumes",
  "Sales",
  "Stock",
  "Payment channels",
  "Variances",
  "End-of-day status",
  "Exceptions",
  "Attendant activity",
  "Operational trends",
];

export const CommandCentre: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6">
            <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
              Multi-Station Management
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight mb-6">
              Your Entire Network.{" "}
              <b className="text-[#E17226]">One Command Centre.</b>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Managing multiple stations shouldn&apos;t require multiple
              spreadsheets, reports and disconnected systems. EasyFuel provides
              centralized visibility across your station network while allowing
              authorized teams to drill down into individual locations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {MONITORS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-gray-700 font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-50 text-[#E17226] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <a
              href="#quotation"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E17226] hover:bg-[#C65F1D] text-white font-semibold text-sm rounded-full transition-colors shadow-md group"
            >
              See EasyFuel in Action
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right: Drill-down visual */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-brand-navy-dark border border-white/10 shadow-2xl shadow-brand-navy/30 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <MonitorDot className="w-5 h-5 text-[#E17226]" />
                  <span className="text-sm font-semibold text-white">
                    Station Overview
                  </span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/assets/img/station.jpeg"
                  alt="Multi-station network overview dashboard"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
